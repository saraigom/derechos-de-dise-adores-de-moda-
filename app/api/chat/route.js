import { SYSTEM_PROMPT } from "../../../lib/prompt";
import { retrieve } from "../../../lib/retrieve";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

// Modelos gratuitos de OpenRouter, en orden de preferencia. Los modelos :free
// comparten cupo y a veces devuelven 429 (saturado) o quedan sin texto, así que
// se intentan uno por uno hasta obtener una respuesta válida.
const FREE_MODELS = [
  "dots-studio/dots-3-note-preview:free",
  "google/gemma-4-31b-it:free",
  "google/gemma-4-26b-a4b-it:free",
  "xingchen-agi/xing4.0-29b-a4b:free",
  "liquid/lfm-2.5-2.6b:free",
];

const MAX_QUESTION_LENGTH = 2000;

function modelChain() {
  const preferred = (process.env.OPENROUTER_MODEL || "").trim();
  if (!preferred) return FREE_MODELS;
  return [preferred, ...FREE_MODELS.filter((model) => model !== preferred)];
}

function uniqueSources(fragments) {
  const sources = [];
  const seen = new Set();

  for (const fragment of fragments) {
    const key = `${fragment.source}|${fragment.heading}`;
    if (seen.has(key)) continue;
    seen.add(key);
    sources.push({ title: fragment.source, heading: fragment.heading });
  }

  return sources;
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "La solicitud no es válida." },
      { status: 400 },
    );
  }

  const question =
    typeof body?.question === "string" ? body.question.trim() : "";

  if (!question) {
    return Response.json(
      { error: "Escribe una consulta antes de enviarla." },
      { status: 400 },
    );
  }

  if (question.length > MAX_QUESTION_LENGTH) {
    return Response.json(
      {
        error: `La consulta es demasiado larga. Usa máximo ${MAX_QUESTION_LENGTH} caracteres.`,
      },
      { status: 400 },
    );
  }

  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return Response.json(
      {
        error:
          "El servidor no tiene configurada la variable de entorno OPENROUTER_API_KEY. En Vercel: Project Settings → Environment Variables.",
      },
      { status: 500 },
    );
  }

  const fragments = retrieve(question, 6);
  const context =
    fragments.length > 0
      ? fragments
          .map(
            (fragment) =>
              `### ${fragment.source} — ${fragment.heading}\n${fragment.text}`,
          )
          .join("\n\n---\n\n")
      : "(No se encontraron fragmentos del corpus relacionados con esta consulta.)";

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    {
      role: "system",
      content: `Fragmentos del corpus normativo recuperados para esta consulta. Usa solo esta información y cita la norma y el artículo:\n\n${context}`,
    },
    { role: "user", content: question },
  ];

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      let closed = false;

      const send = (payload) => {
        if (closed) return;
        controller.enqueue(encoder.encode(`${JSON.stringify(payload)}\n`));
      };

      const finish = () => {
        if (closed) return;
        closed = true;
        try {
          controller.close();
        } catch {
          // El cliente ya cerró la conexión.
        }
      };

      // Las fuentes no dependen del modelo: se envían de inmediato.
      send({ type: "sources", sources: uniqueSources(fragments) });

      let answered = false;
      let authFailed = false;

      try {
        for (const model of modelChain()) {
          let upstream;

          try {
            upstream = await fetch(OPENROUTER_URL, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer":
                  process.env.NEXT_PUBLIC_SITE_URL ||
                  "https://derechos-de-dise-adores-de-moda-eml.vercel.app",
                "X-Title": "ModaLex AI",
              },
              body: JSON.stringify({
                model,
                messages,
                temperature: 0.2,
                max_tokens: 1200,
                stream: true,
              }),
            });
          } catch (error) {
            console.error("Fallo al contactar OpenRouter:", model, error);
            continue;
          }

          if (!upstream.ok || !upstream.body) {
            const detail = await upstream.text().catch(() => "");
            console.error(
              "OpenRouter respondió con error:",
              model,
              upstream.status,
              detail.slice(0, 400),
            );
            if (upstream.status === 401 || upstream.status === 403) {
              authFailed = true;
            }
            continue;
          }

          const reader = upstream.body.getReader();
          const decoder = new TextDecoder();
          let buffer = "";
          let gotText = false;

          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              buffer += decoder.decode(value, { stream: true });
              const lines = buffer.split("\n");
              buffer = lines.pop() ?? "";

              for (const line of lines) {
                const trimmed = line.trim();
                if (!trimmed.startsWith("data:")) continue;

                const data = trimmed.slice(5).trim();
                if (!data || data === "[DONE]") continue;

                let event;
                try {
                  event = JSON.parse(data);
                } catch {
                  continue;
                }

                if (event?.error) {
                  console.error(
                    "Error del modelo en streaming:",
                    model,
                    JSON.stringify(event.error).slice(0, 300),
                  );
                  continue;
                }

                const delta = event?.choices?.[0]?.delta?.content;
                if (typeof delta === "string" && delta.length > 0) {
                  gotText = true;
                  send({ type: "delta", text: delta });
                }
              }
            }
          } catch (error) {
            console.error("Se cortó el streaming:", model, error);
          }

          if (gotText) {
            answered = true;
            break;
          }

          console.error("Modelo sin contenido, se prueba el siguiente:", model);
        }

        if (!answered) {
          send({
            type: "error",
            message: authFailed
              ? "La clave de OpenRouter expiró o no es válida. Actualiza la variable OPENROUTER_API_KEY en Vercel y vuelve a desplegar."
              : "Ningún modelo gratuito respondió en este momento. Espera un minuto y vuelve a intentar.",
          });
        }
      } catch (error) {
        console.error("Error inesperado en el streaming:", error);
        send({
          type: "error",
          message: "No se pudo contactar al modelo. Intenta de nuevo en un momento.",
        });
      }

      send({ type: "done" });
      finish();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
      Connection: "keep-alive",
    },
  });
}
