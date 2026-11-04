import { SYSTEM_PROMPT } from "../../../lib/prompt";
import { retrieve } from "../../../lib/retrieve";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_MODEL = "google/gemma-4-31b-it:free";
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

  const model = process.env.OPENROUTER_MODEL || DEFAULT_MODEL;

  try {
    const upstream = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer":
          process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
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
        upstream.status,
        detail.slice(0, 800),
      );

      return Response.json(
        {
          error:
            "El modelo no respondió correctamente. Verifica que OPENROUTER_API_KEY sea válida y que el modelo configurado esté disponible y sea gratuito.",
        },
        { status: 502 },
      );
    }

    const data = await upstream.json();
    const answer = data?.choices?.[0]?.message?.content?.trim();

    if (!answer) {
      return Response.json(
        { error: "El modelo devolvió una respuesta vacía. Intenta de nuevo." },
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
