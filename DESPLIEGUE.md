# 🚀 Cómo desplegar ModaLex AI en Vercel

Esta guía cubre lo que **no** estaba en el repositorio y que era necesario para
que la app funcione: la aplicación Next.js, la llamada al modelo y la variable
de entorno con la API key.

---

## 1. Qué se agregó

| Archivo | Para qué sirve |
| --- | --- |
| `app/layout.jsx` | Estructura base y metadatos de la página. |
| `app/page.jsx` | Interfaz del chat (banner legal, preguntas sugeridas, estados de carga y error). |
| `app/globals.css` | Estilos de la interfaz. |
| `app/icon.svg` | Favicon. |
| `app/api/chat/route.js` | Endpoint del servidor que busca en el corpus y llama a OpenRouter. La API key nunca llega al navegador. |
| `lib/prompt.js` | Prompt de sistema (reglas anti-alucinación y cita obligatoria). |
| `lib/retrieve.js` | Recuperación de fragmentos del corpus por coincidencia de términos. |
| `lib/corpus.js` | Corpus normativo empaquetado a partir de los archivos `0*.md`. |
| `lib/constants.js` | Advertencia legal, saludo y preguntas sugeridas. |
| `.env.example` | Plantilla de variables de entorno. |
| `.gitignore` | Evita subir `node_modules`, `.next` y `.env.local`. |

---

## 2. Crear la API key de OpenRouter (gratis)

1. Entra a <https://openrouter.ai> y crea una cuenta.
2. Ve a <https://openrouter.ai/keys> → **Create Key**.
3. Copia la clave (`sk-or-v1-...`). No la pegues en GitHub ni en el chat.

> Los modelos gratuitos tienen límites de uso. Si uno falla, cambia
> `OPENROUTER_MODEL` por otro modelo con etiqueta `:free` disponible en
> <https://openrouter.ai/models?max_price=0>.

---

## 3. Desplegar en Vercel

1. Entra a <https://vercel.com> e inicia sesión con GitHub.
2. **Add New… → Project** → importa el repositorio
   `saraigom/derechos-de-dise-adores-de-moda-`.
3. Deja la configuración que Vercel detecta:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Root Directory:** `./`
4. Abre **Environment Variables** y agrega:

   | Nombre | Valor |
   | --- | --- |
   | `OPENROUTER_API_KEY` | tu clave `sk-or-v1-...` |
   | `OPENROUTER_MODEL` | `google/gemma-4-31b-it:free` *(opcional)* |
   | `NEXT_PUBLIC_SITE_URL` | `https://tu-proyecto.vercel.app` *(opcional, puedes agregarla después)* |

5. Pulsa **Deploy**. El primer build tarda 1–3 minutos.
6. Cuando termine, abre la URL `*.vercel.app`. Cada `git push` a `main`
   vuelve a desplegar automáticamente.

> Si cambias una variable de entorno, entra a **Deployments → … →
> Redeploy** para que la app la tome.

---

## 4. Probar en local (opcional)

Requiere Node.js 18.17 o superior (<https://nodejs.org>).

```bash
cp .env.example .env.local
# edita .env.local y pega tu OPENROUTER_API_KEY
npm install
npm run dev
```

Abre <http://localhost:3000>.

---

## 5. Checklist final

- [ ] `npm run build` termina sin errores (Vercel lo ejecuta igual).
- [ ] La app abre con el banner amarillo de aviso legal visible.
- [ ] Una pregunta sugerida devuelve respuesta con citas normativas.
- [ ] La respuesta incluye la advertencia legal al final.
- [ ] Una pregunta fuera del corpus (por ejemplo, tasas de interés) se niega
      a inventar información.
- [ ] No hay claves en el repositorio (`git grep "sk-or-v1"` no devuelve nada).
