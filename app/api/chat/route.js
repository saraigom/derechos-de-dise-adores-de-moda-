import { SYSTEM_PROMPT } from "../../../lib/prompt";
import { retrieve } from "../../../lib/retrieve";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

function modelChain() {
  const preferred = (process.env.OPENROUTER_MODEL || "").trim();
  if (!preferred) return FREE_MODELS;
  return [preferred, ...FREE_MODELS.filter((model) => model !== preferred)];
}

const MAX_QUESTION_LENGTH = 2000;

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

  try {
    let answer = "";

    for (const model of modelChain()) {
      const upstream = await fetch(OPENROUTER_URL, {
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
        }),
      });

      if (!upstream.ok) {
        const detail = await upstream.text();
        console.error(
          "OpenRouter respondió con error:",
          model,
          upstream.status,
          detail.slice(0, 500),
        );
        continue;
      }

      const data = await upstream.json();
      answer = data?.choices?.[0]?.message?.content?.trim() || "";

      if (answer) break;

      console.error("Modelo sin contenido, se prueba el siguiente:", model);
    }

    if (!answer) {
      return Response.json(
        {
          error:
            "Ningún modelo gratuito respondió en este momento. Espera un minuto y vuelve a intentar.",
        },
        { status: 502 },
      );
    }

    const sources = [];
    const seen = new Set();

    for (const fragment of fragments) {
      const key = `${fragment.source}|${fragment.heading}`;
      if (seen.has(key)) continue;
      seen.add(key);
      sources.push({
        title: fragment.source,
        heading: fragment.heading,
      });
    }

    return Response.json({ answer, sources });
  } catch (error) {
    console.error("Error llamando a OpenRouter:", error);

    return Response.json(
      { error: "No se pudo contactar al modelo. Intenta de nuevo en un momento." },
      { status: 500 },
    );
  }
}
