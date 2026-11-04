import { CORPUS } from "./corpus";

const STOPWORDS = new Set([
  "que", "como", "para", "por", "con", "sin", "los", "las", "una", "uno", "unos",
  "unas", "del", "de", "la", "el", "en", "y", "o", "a", "al", "se", "su", "sus",
  "es", "son", "ser", "esta", "este", "esto", "estos", "estas", "mi", "mis", "me",
  "te", "tu", "tus", "le", "les", "lo", "nos", "si", "no", "ya", "mas", "muy",
  "pero", "porque", "cuando", "donde", "cual", "cuales", "quien", "quienes",
  "hay", "ha", "han", "he", "fue", "era", "soy", "eres", "somos", "tengo",
  "tiene", "tienen", "puedo", "puede", "pueden", "hacer", "hago", "sobre",
  "entre", "desde", "hasta", "tambien", "solo", "todo", "toda", "todos",
  "todas", "otro", "otra", "otros", "otras", "mismo", "misma", "cosa", "cosas",
  "caso", "casos", "pregunta", "quiero", "quisiera", "necesito", "saber",
  "dime", "explicame", "favor", "gracias", "hola", "buenas", "tardes",
]);

function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function stem(word) {
  return word.length > 4 && word.endsWith("s") ? word.slice(0, -1) : word;
}

// Sinónimos prácticos para conectar las palabras del usuario con el corpus.
const ALIASES = {
  molderia: ["molde", "patron", "idea", "expresion", "funcional", "tecnica"],
  molde: ["patron", "idea", "expresion", "funcional", "tecnica"],
  patron: ["molde", "idea", "expresion", "funcional", "tecnica"],
  upcycling: ["agotamiento", "reventa"],
  revender: ["reventa", "agotamiento"],
  vender: ["reventa", "agotamiento", "comercializar"],
  intervenir: ["modificacion", "agotamiento", "reventa"],
  print: ["estampado"],
  estampado: [
    "obra",
    "arte",
    "aplicado",
    "reproduccion",
    "transformacion",
    "ilustracion",
    "dibujo",
  ],
  logo: ["marca", "signo"],
  plagio: ["imitacion", "copia"],
  copiar: ["copia", "imitacion"],
  registrar: ["registro"],
  cartera: ["diseno", "industrial"],
  bolso: ["diseno", "industrial"],
  joya: ["arte", "aplicado"],
  tejido: ["textil"],
  tela: ["textil"],
};

function tokenize(text) {
  const words = normalize(text)
    .split(/[^a-z0-9ñ]+/)
    .filter((word) => word.length > 2 && !STOPWORDS.has(word))
    .map(stem);

  for (const word of [...words]) {
    const aliases = ALIASES[word];
    if (aliases) words.push(...aliases);
  }

  return words;
}

/** Divide cada fuente en fragmentos por encabezados de markdown. */
function buildChunks() {
  const chunks = [];

  for (const source of CORPUS) {
    const sections = source.text.split(/\n(?=#{2,3}\s)/);

    for (const section of sections) {
      const trimmed = section.trim();
      if (!trimmed) continue;

      const firstLine = trimmed.split("\n")[0].replace(/^#+\s*/, "").trim();
      chunks.push({
        source: source.title,
        file: source.file,
        heading: firstLine,
        text: trimmed,
      });
    }
  }

  return chunks;
}

const CHUNKS = buildChunks().map((chunk) => ({
  ...chunk,
  tokens: new Set(tokenize(`${chunk.heading} ${chunk.text}`)),
}));

/**
 * Recuperación léxica simple (sin embeddings): puntúa cada fragmento según
 * cuántos términos de la consulta aparecen en él y devuelve los mejores.
 */
export function retrieve(question, limit = 6) {
  const queryTokens = [...new Set(tokenize(question))];
  if (queryTokens.length === 0) return [];

  const scored = CHUNKS.map((chunk) => {
    let score = 0;
    let matches = 0;

    for (const token of queryTokens) {
      if (chunk.tokens.has(token)) {
        score += 1;
        matches += 1;
      }
      if (normalize(chunk.heading).includes(token)) score += 2;
      if (normalize(chunk.source).includes(token)) score += 1;
    }

    return {
      chunk,
      score,
      coverage: matches / queryTokens.length,
    };
  });

  // La mejor coincidencia debe cubrir al menos el 20 % de la consulta.
  // Así una pregunta fuera del corpus (p. ej. tasas de interés) no recibe
  // contexto normativo solo por compartir una palabra genérica.
  const bestCoverage = scored.reduce(
    (max, item) => Math.max(max, item.coverage),
    0,
  );

  if (bestCoverage < 0.2) return [];

  const minCoverage = Math.max(0.1, bestCoverage * 0.25);

  const best = scored
    .filter((item) => item.score > 0 && item.coverage >= minCoverage)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.chunk);

  return best;
}

