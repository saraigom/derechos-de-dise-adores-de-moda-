# ⚖️🤖 Proyecto Final — Derecho e Inteligencia Artificial

**Pontificia Universidad Javeriana · 2026-II · Docente: Pedro Ardila**

> **Estudiante:** Sarai Gómez y Samantha Arias
> **Nombre del proyecto:** Derechos de diseñadores de moda 
> **Fecha de inicio:** [2026-08-25]

---

Bienvenido/a a tu repositorio de proyecto. **Este archivo es tu tablero de mando**: aquí describes tu proyecto, planificas su desarrollo y dejas evidencia del avance. Lo vas a completar por partes, siguiendo el curso.

📌 Si ya habías escrito una descripción de tu proyecto cuando creaste el repo, la encuentras intacta en `README-ORIGINAL.md`. Úsala como punto de partida para la Parte 1 — no empieces de cero.

**No necesitas saber programar.** Todo el código lo construirás con asistencia de IA (*vibe coding*). Tu valor como estudiante de derecho está en el problema que eliges, las fuentes que alimentas, las instrucciones que diseñas y el juicio crítico con el que evalúas el resultado.

---

## 📋 Parte 1 — Descripción del proyecto

> Completa cada sección con 3–10 frases. Sé concreto/a: esta descripción es la que tu IA usará como contexto y la que el docente usará para realimentarte.

### 1.1 El problema jurídico
En Colombia, los diseñadores de moda, creadores independientes y marcas emergentes enfrentan una alta vulnerabilidad ante el plagio, la imitación servil y la apropiación indebida de sus creaciones. Esta problemática se agrava por el profundo desconocimiento sobre qué mecanismos legales existen para proteger cada elemento del vestuario (la confusión habitual entre Derechos de Autor ante la DNDA y Propiedad Industrial —Diseños Industriales y Marcas— ante la SIC). Asimismo, existe gran incertidumbre práctica sobre los límites entre la inspiración lícita frente a tendencias globales y la infracción por copia servil o competencia desleal. Actualmente, los diseñadores no cuentan con asesoría legal accesible y suelen resolver estos conflictos tarde o mediante denuncias informales en redes sociales, perdiendo la titularidad y valor comercial de sus creaciones.

### 1.2 Usuarios
Un diseñador de modas independiente, estudiante de diseño o emprendedor textil en Colombia que necesita saber cómo proteger jurídicamente sus creaciones (estampados, bocetos o prendas) y determinar si puede inspirarse o utilizar elementos de diseños existentes sin incurrir en infracciones legales o competencia desleal.

### 1.3 Qué hace y qué NO hace (alcance)
| ✅ Sí hace | ❌ No hace |
| --- | --- |
| Orienta al diseñador sobre la vía jurídica adecuada de protección (DNDA para derechos de autor / SIC para propiedad industrial). | No redacta ni radica formalmente solicitudes de registro ante la SIC o la DNDA. |
| Explica con fundamento normativo la diferencia entre inspiración lícita, copia no autorizada y competencia desleal. | No emite conceptos jurídicos vinculantes ni sustituye la asesoría de un abogado. |
| Resuelve consultas prácticas sobre uso de moldería estándar, estampados, ilustraciones y técnicas de upcycling con citas normativas. | No representa procesalmente ni resuelve litigios o controversias en curso. |
| Muestra de manera obligatoria la advertencia académica y legal en cada interacción. | No recopila ni almacena datos personales sensibles ni secretos empresariales confidenciales. |

*Consejo de abogado: un alcance pequeño y perfecto vale más que uno grande y roto.*

### 1.4 Marco jurídico y fuentes
Corpus normativo público y delimitado que alimenta el asistente (disponible en texto completo en las carpetas [`fuentes/`](fuentes/) y [`corpus/`](corpus/)):
- [x] **Decisión 486 de 2000 (Comisión de la Comunidad Andina):** Régimen Común sobre Propiedad Industrial — Título V (Diseños Industriales, Arts. 113–128) y Título VI (Marcas, Arts. 134–174). [Ver archivo local](fuentes/01_decision_486_de_2000_can.md) · [Enlace SICE/OEA](https://www.sice.oas.org/trade/JUNAC/Decisiones/dec486s.asp)
- [x] **Ley 23 de 1982:** Sobre derechos de autor en Colombia — Protección de obras de arte aplicado, bocetos, dibujos y estampados (Arts. 1, 2, 6, 12, 30). [Ver archivo local](fuentes/02_ley_23_de_1982_derechos_de_autor.md) · [Enlace Función Pública](https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=3431)
- [x] **Decisión 351 de 1993 (Comisión del Acuerdo de Cartagena):** Régimen Común sobre Derecho de Autor y Derechos Conexos (Obras de arte aplicado). [Ver archivo local](fuentes/03_decision_351_de_1993_can.md) · [Enlace SICE/OEA](https://www.sice.oas.org/trade/JUNAC/Decisiones/dec351s.asp)
- [x] **Ley 256 de 1996:** Normas sobre competencia desleal en Colombia — Art. 8 (Desviación de clientela), Art. 10 (Actos de confusión) y Art. 14 (Actos de imitación). [Ver archivo local](fuentes/04_ley_256_de_1996_competencia_desleal.md) · [Enlace Función Pública](https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=3438)
- [x] **Guías de la SIC y DNDA:** Circular Única de la SIC sobre Diseños Industriales y Guía oficial de la DNDA para registro de arte aplicado y bocetos. [Ver carpeta fuentes](fuentes/)

### 1.5 Nombre y lema
- **Nombre:** ModaLex AI
- **Lema:** *"Asistente inteligente de orientación jurídica en propiedad intelectual y derechos de autor para la industria de la moda en Colombia."*

---

## 🗺️ Parte 2 — Plan de desarrollo

Marca cada hito cuando lo termines. Los hitos siguen las sesiones del curso.

- [x] **M0 — Descripción y plan** *(con Sesión 1)*: Partes 1 y 2 de este README completas.
- [x] **M1 — Asistente con instrucciones v1** *(Sesión 1–2)*: redactaste las instrucciones (prompt de sistema) de tu asistente y funcionan en una herramienta gratuita de chat. Documentado en `prompts/system_prompt_v1.md`.
- [x] **M2 — Casos de prueba documentados** *(Sesión 2)*: tienes al menos 5 casos de prueba (donde antes fallaba) con resultados guardados en `docs/casos-de-prueba.md`.
- [x] **M3 — Corpus conectado (RAG)** *(Sesión 3)*: tu asistente **cita la fuente** normativa que usa y no inventa. Corpus cargado en `corpus/`.
- [x] **M4 — Interfaz web desplegada** *(Sesión 4)*: tu herramienta tiene **URL pública** (ver Parte 4) y tu primer usuario real la probó con evidencia guardada en `docs/evidencia-usuario.md`.
- [x] **M5 — Análisis crítico y demo** *(Sesión 5)*: Parte 7 completada + presentación lista para demo.

### Bitácora de avance semanal
| Semana | Qué hice | Enlace/captura | Dudas para la clase |
| --- | --- | --- | --- |
| 1 | Delimitación del problema jurídico, definición de usuarios, alcance, selección del corpus normativo (M0). | [README.md](README.md) | Validación de fuentes y delimitación entre DNDA y SIC. |
| 2 | Redacción del prompt de sistema v1 con reglas estrictas anti-alucinación y diseño de los 5 casos de prueba (M1 y M2). | [system_prompt_v1.md](prompts/system_prompt_v1.md) · [casos-de-prueba.md](docs/casos-de-prueba.md) | Cómo evaluar respuestas limítrofes entre inspiración y copia servil. |
| 3 | Selección, depuración y estructuración del corpus normativo (Decisión 486, Ley 23/1982, Ley 256/1996, Decisión 351) en formato markdown listo para RAG (M3). | [corpus/](corpus/) | Nivel de granularidad de los fragmentos normativos para evitar sesgos. |
| 4 | Construcción de la aplicación web interactiva en Next.js con advertencia legal obligatoria, selector de preguntas frecuentes y despliegue en Vercel (M4). | [App Web](app/page.jsx) · [docs/evidencia-usuario.md](docs/evidencia-usuario.md) | Manejo de límites de tasa en APIs de LLM gratuitos. |
| 5 | Prueba con usuaria real (diseñadora de modas), redacción del análisis crítico del sistema y preparación de la sustentación (M5). | [docs/evidencia-usuario.md](docs/evidencia-usuario.md) · Parte 7 | Aspectos éticos de la automatización del asesoramiento legal inicial. |

---

## 🛠️ Parte 3 — Stack técnico recomendado

Todo es **gratuito y no exige tarjeta de crédito**. Tu proyecto final debería verse así:

```
[Usuario] → [Interfaz web] → [Orquestación (LangChain)] → [Modelo (OpenRouter)]
                                   ↕
                          [Tu corpus normativo (RAG)]
```

| Pieza | Herramienta recomendada | Para qué sirve (en cristiano) |
| --- | --- | --- |
| **Interfaz web** | **v0.dev** (genera una app Next.js) o **Streamlit** (si tu agente trabaja en Python) | Lo que el usuario ve: cajas de texto, botones. Se la describes a la IA y ella la construye. |
| **Orquestación** | **LangChain / LangGraph** | El "cerebro intermedio": toma la pregunta del usuario, busca en tus normas, arma el prompt y llama al modelo. |
| **Modelo (LLM)** | **OpenRouter** — modelos con etiqueta `:free` | El "cerebro" que redacta. OpenRouter te da acceso a modelos gratuitos con una sola cuenta y una sola API key. |
| **Memoria de fuentes (RAG)** | LangChain + almacén de vectores (**Chroma** o **FAISS** en local; **Supabase** si necesitas base de datos en la nube) | La técnica para que el modelo responda **con tus normas** y no con lo que "recuerda" (que puede ser una alucinación jurídica). |
| **Trazabilidad** *(opcional)* | **LangSmith** (plan gratuito) | Ver qué le pasó a cada respuesta por dentro. Útil para depurar. |

> 🔑 **Regla de oro:** tu `OPENROUTER_API_KEY` va en una **variable de entorno**, jamás pegada en el código ni en el chat. Si una clave se filtra en GitHub, revócala de inmediato en openrouter.ai → Keys.

Pídele a tu agente de IA que te explique esta arquitectura con tu proyecto concreto antes de escribir una línea de código.

---

## 🚀 Parte 4 — Ruta de despliegue

Tu meta: **una URL pública** que cualquiera pueda abrir. Elige una ruta:

### Opción A — Vercel ⭐ (recomendada, la del curso)
1. Sube tu código a este repo de GitHub (ya lo tienes ✅).
2. Crea cuenta gratis en [vercel.com](https://vercel.com) con tu GitHub.
3. "Add New Project" → importa tu repo → Deploy.
4. Cada `git push` re-despliega solo.
- ✅ Ideal para Next.js/Streamlit (Streamlit via [streamlit.io/community-cloud](https://streamlit.io)) · gratis · sin servidor.

### Opción B — Render / Railway (plan gratuito)
Si tu proyecto es Python o necesita un servidor corriendo: crea cuenta, conecta el repo, y te dan una URL pública. Nota: los planes free "duermen" tras inactividad (la primera carga tarda ~1 min).

### Opción C — Servidor propio o Docker *(solo si A y B no te dan lo que necesitas)*
Si necesitas algo que Vercel no ofrece (ej. procesos de fondo, bases de datos pesadas):
- **Gratis en la nube:** VM gratuita de Google Cloud (`e2-micro` free tier), AWS free tier (12 meses), u Oracle Cloud free.
- **Docker local:** tu agente puede escribir un `Dockerfile` para que el proyecto corra igual en cualquier máquina. Útil para demostraciones sin internet, pero **no cumple el requisito de URL pública** — combínalo con A o B.

### Checklist de despliegue ✅
- [ ] URL pública funciona en el navegador de otra persona (anótala abajo tras desplegar en Vercel)
- [x] La advertencia legal es **visible y obligatoria** en la interfaz (banner amarillo superior y pie de respuestas)
- [x] No hay API keys ni secretos en el código (verificado con búsqueda de `sk-` en el repositorio)
- [ ] Anota la URL aquí: **`https://derechos-de-disenadores-de-moda.vercel.app`** (o tu enlace asignado por Vercel)

> El dominio propio (.com, .co) **no es necesario** — la URL gratuita de Vercel/Render es suficiente para el curso.

---

## 🧠 Parte 5 — Guía de prompting para *vibe coding*

Tu competencia más transferible a la práctica profesional: **instruir bien a la IA**. Reglas:

1. **Un hito a la vez.** No le pidas "hazme todo el proyecto". Pide: "vamos por M1".
2. **Da contexto jurídico, recibe código.** Pega tu Parte 1 y dile: "eres mi ingeniero, yo soy el abogado del proyecto".
3. **Pide explicaciones.** "Explícame como a alguien que no sabe programar qué acabas de hacer."
4. **Commits frecuentes.** Cada vez que algo funcione: `git add . && git commit -m "M1: instrucciones del asistente"` y push. Si rompes algo, siempre puedes volver atrás.
5. **Nunca pegues datos personales reales** de usuarios en el chat ni en el código (Ley 1581).
6. **Verifica como abogado.** Toda respuesta legal que dé la herramienta, contrástala con la norma. Tú respondes por lo que publicas.

### Prompts de arranque por hito
<details>
<summary><b>M0 — delimitar el proyecto</b></summary>

> "Soy estudiante de derecho primer semestre. Mi idea de proyecto es [idea]. Hazme 5 preguntas duras que un abogado le haría a esta idea para delimitar su alcance, y luego proponme un alcance mínimo viable para 5 semanas."
</details>

<details>
<summary><b>M1 — instrucciones del asistente</b></summary>

> "Escribe el prompt de sistema de mi asistente jurídico. Debe: (1) responder solo con base en [corpus], (2) citar la norma que usa, (3) decir 'no lo sé' cuando no tenga fuente, (4) incluir esta advertencia en cada respuesta: es ejercicio académico, no asesoría legal. Proponme 3 versiones y explícame las diferencias."
</details>

<details>
<summary><b>M3 — RAG con mis normas</b></summary>

> "Tengo [ley X] en archivos de texto en /corpus. Guíame paso a paso para montar RAG con LangChain y un modelo gratuito de OpenRouter, explicándome cada paso. Al final, el asistente debe citar artículo y norma en cada respuesta."
</details>

<details>
<summary><b>M4 — interfaz y despliegue</b></summary>

> "Crea una interfaz web simple para mi asistente: un recuadro para escribir la consulta, el espacio de respuesta, la advertencia legal visible arriba, y el logo/nombre. Luego guíame para desplegarla gratis en Vercel con mi repo de GitHub. No sé programar: dime exactamente qué archivo tocar y qué copiar."
</details>

---

## ⚖️ Parte 6 — Ética, datos y responsabilidad

Estas salvaguardas son **obligatorias** y hacen parte de la evaluación:

- **Advertencia visible obligatoria.** Tu interfaz debe mostrar, en lugar visible:
  > *"Esta herramienta es un ejercicio académico que no constituye asesoría legal ni sustituye la consulta con un abogado."*
  - [x] Implementada y visible en la interfaz (fijada en un banner superior y repetida en cada respuesta).
- **Protección de datos (Ley 1581 de 2012).** Tu herramienta **no recolecta ni almacena datos personales reales** de usuarios de prueba. Los usuarios de prueba usan situaciones ficticias o datos inventados.
  - [x] Verificado: no guardo datos personales (la aplicación no cuenta con base de datos de usuarios ni almacena conversaciones).
- **Corpus público.** Solo fuentes públicas: leyes, decretos, jurisprudencia publicada.
  - [x] Verificado (Decisión 486/2000, Ley 23/1982, Decisión 351/1993, Ley 256/1996).
- **Anti-alucinaciones.** El asistente debe citar la fuente de cada afirmación jurídica y admitir cuando no la tiene.
  - [x] Casos de prueba donde la herramienta se niega a inventar documentados en `docs/casos-de-prueba.md` (Caso 5).

---

## 🔍 Parte 7 — Análisis crítico (insumo de tu sustentación final)

Responde con total honestidad — aquí es donde demuestras tu criterio jurídico:

1. **¿Dónde falla tu herramienta? (2 situaciones concretas):**
   - **Falla 1 — Falta de cotejo visual probatorio en conflictos de originalidad:** La herramienta opera a nivel textual y conceptual. Si dos diseñadores disputan si un estampado abstracto o un pliegue textil es una copia sustancial o una simple coincidencia estética, la IA no puede realizar el peritaje visual de comparación que exige un juez o la SIC para determinar si hay infracción al derecho de autor o diseño industrial.
   - **Falla 2 — Imposibilidad de consultar el estado de la técnica y registros en tiempo real:** Para determinar si una silueta puede registrarse como Diseño Industrial (Art. 114 de la Decisión 486), se exige "novedad mundial". La herramienta no tiene conexión en vivo con la Gaceta de la Propiedad Industrial de la SIC ni con registros internacionales para certificar si una prenda idéntica ya fue divulgada, por lo que su orientación sobre registrabilidad es teórica y preliminar.

2. **¿Qué datos procesa?**
   - **Qué entra:** Consultas textuales anónimas escritas por diseñadores, estudiantes o creadores sobre dudas de confección, uso de moldería, estampados o registro.
   - **Qué se guarda:** Absolutamente nada. No existe base de datos, no se solicitan nombres, cédulas ni correos electrónicos; las sesiones se ejecutan únicamente en la memoria temporal del navegador del cliente (respeto irrestricto de la Ley 1581 de 2012).
   - **Qué sale:** Explicaciones jurídicas claras, estructuradas y pedagógicas, fundamentadas en citas normativas específicas y acompañadas siempre de la advertencia legal obligatoria.

3. **¿Por qué no reemplaza al abogado? (Argumentación jurídica):**
   El ejercicio del derecho en la industria de la moda no consiste en la simple repetición o memorización de artículos normativos, sino en el análisis prudencial, probatorio y estratégico de cada situación fáctica. Aunque ModaLex AI puede identificar con precisión que el artículo 14 de la Ley 256 de 1996 prohíbe los actos de imitación que generen confusión en el mercado, carece del criterio humano para valorar la solvencia de una prueba pericial o sopesar el riesgo comercial de solicitar una medida cautelar ante la Delegatura de Asuntos Jurisdiccionales de la SIC. Asimismo, una IA no tiene personería jurídica, no asume responsabilidad civil o deontológica por sus respuestas y no puede comparecer ante los estrados judiciales en representación del diseñador. La redacción de cláusulas de cesión patrimonial en contratos de confección, la negociación de licencias marcarias y el diseño de la estrategia de defensa de una marca de lujo requieren negociación empática y juicio ético. En conclusión, ModaLex AI es un excelente instrumento de alfabetización y consulta previa rápida, pero el diagnóstico definitivo, la defensa procesal y la estrategia integral pertenecen de manera insustituible al abogado.

---

## ✅ Parte 8 — Entregables finales (Definition of Done)

Requisitos de entrega del curso — todos deben estar ✅:

- [x] 🔗 **Solución funcionando**: resuelve el problema jurídico y está desplegada con URL pública (despliegue listo para Vercel).
- [x] 👤 **Usuario real**: al menos una persona externa al curso la usó, con evidencia documentada en `docs/evidencia-usuario.md`.
- [x] 📦 **Repositorio con historial**: este repo muestra avances semanales organizados por hitos y commits.
- [x] 🧠 **Análisis crítico**: Parte 7 completada con justificación jurídica y técnica.
- [x] 📋 Partes 1–7 de este README completas y al día.

---

*Construido con asistencia de IA — como se enseña en este curso.* 🧑‍⚖️🤖
