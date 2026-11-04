"use client";

import { useEffect, useRef, useState } from "react";
import {
  GREETING,
  LEGAL_WARNING,
  SUGGESTED_QUESTIONS,
} from "../lib/constants";

function RichText({ text }) {
  return text.split("\n").map((line, lineIndex) => (
    <p key={lineIndex} className={line.trim() === "" ? "blank-line" : undefined}>
      {line.split("**").map((part, partIndex) =>
        partIndex % 2 === 1 ? <strong key={partIndex}>{part}</strong> : part,
      )}
    </p>
  ));
}

function Message({ message }) {
  const isUser = message.role === "user";

  return (
    <article className={`message ${isUser ? "message-user" : "message-assistant"}`}>
      <div className="avatar" aria-hidden="true">
        {isUser ? "Tú" : "ML"}
      </div>
      <div className="message-body">
        <div className="bubble">
          <RichText text={message.content} />
        </div>

        {message.sources?.length > 0 && (
          <details className="sources">
            <summary>Fuentes del corpus consultadas ({message.sources.length})</summary>
            <ul>
              {message.sources.map((source) => (
                <li key={`${source.title}-${source.heading}`}>
                  <strong>{source.title}</strong> — {source.heading}
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>
    </article>
  );
}

export default function Home() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: GREETING, sources: [] },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  useEffect(() => {
    if (!loading) inputRef.current?.focus();
  }, [loading]);

  async function sendQuestion(rawQuestion) {
    const question = (rawQuestion ?? input).trim();
    if (!question || loading) return;

    setError("");
    setInput("");
    setMessages((current) => [
      ...current,
      { role: "user", content: question, sources: [] },
    ]);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "No se pudo obtener una respuesta.");
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.answer,
          sources: data.sources || [],
        },
      ]);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendQuestion();
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendQuestion();
    }
  }

  function resetChat() {
    setMessages([{ role: "assistant", content: GREETING, sources: [] }]);
    setError("");
    setInput("");
    inputRef.current?.focus();
  }

  const showSuggestions = messages.length === 1;

  return (
    <div className="page">
      <div className="legal-banner" role="note">
        <span aria-hidden="true">⚖️</span>
        <p>
          <strong>Aviso legal:</strong> {LEGAL_WARNING}
        </p>
      </div>

      <header className="site-header">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">ML</span>
          <div>
            <h1>ModaLex AI</h1>
            <p>Derecho de la moda · Colombia</p>
          </div>
        </div>
        <button type="button" className="ghost-button" onClick={resetChat}>
          Nueva consulta
        </button>
      </header>

      <main className="chat-shell">
        <section className="chat" aria-live="polite" aria-label="Conversación">
          {messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}

          {loading && (
            <article className="message message-assistant">
              <div className="avatar" aria-hidden="true">ML</div>
              <div className="message-body">
                <div className="bubble typing">
                  <span></span><span></span><span></span>
                  <em>Consultando el corpus normativo…</em>
                </div>
              </div>
            </article>
          )}

          {error && (
            <div className="error-box" role="alert">
              <strong>No pudimos responder.</strong> {error}
            </div>
          )}

          <div ref={endRef} />
        </section>

        {showSuggestions && (
          <section className="suggestions" aria-label="Preguntas sugeridas">
            <h2>Casos de prueba</h2>
            <div className="chips">
              {SUGGESTED_QUESTIONS.map((question) => (
                <button
                  key={question}
                  type="button"
                  className="chip"
                  onClick={() => sendQuestion(question)}
                  disabled={loading}
                >
                  {question}
                </button>
              ))}
            </div>
          </section>
        )}

        <form className="composer" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="consulta">
            Escribe tu consulta
          </label>
          <textarea
            id="consulta"
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe tu caso: qué creaste, qué prenda quieres usar y para qué…"
            rows={3}
            maxLength={2000}
            disabled={loading}
          />
          <div className="composer-footer">
            <span className="hint">Enter envía · Shift + Enter salta de línea</span>
            <button
              type="submit"
              className="send-button"
              disabled={loading || input.trim() === ""}
            >
              {loading ? "Enviando…" : "Consultar"}
            </button>
          </div>
        </form>

        <footer className="site-footer">
          <p>
            No se solicitan ni almacenan datos personales. Las consultas viven
            solo en esta pestaña (Ley 1581 de 2012).
          </p>
          <p>
            Corpus: Decisión 486 de 2000 · Ley 23 de 1982 · Decisión 351 de 1993
            · Ley 256 de 1996 · guías SIC y DNDA.
          </p>
        </footer>
      </main>
    </div>
  );
}
