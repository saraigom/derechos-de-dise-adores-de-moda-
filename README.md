# ⚖️🤖 Proyecto Final — Derecho e Inteligencia Artificial

**Pontificia Universidad Javeriana · 2026-II · Docente: Pedro Ardila**

> **Estudiante:** Sarai Gómez y Samantha Arias
> **Nombre del proyecto:** Derechos de diseñadores de moda 
> **Fecha de inicio:** [2026-08-25]

---

## 📋 Parte 1 — Descripción del proyecto
### 1.1 El problema jurídico
En Colombia los diseñadores pueden tener dificultades para poder identificar qué derechos protegen sus creaciones cuando estas mismas son copiadas o reproducidas por otras personas o empresas. Se desconocen los mecanismos jurídicos que pueden aplicar, como el derecho de autor o la protección de diseños industriales.

Hoy en día, deben buscar información en diferentes fuentes o acudir a profesionales especializados, lo cual puede resultar difícil para los diseñadores independientes, estudiantes y los pequeños emprendimientos.

Nuestra herramienta ofrecerá una orientación jurídica académica sobre los posibles mecanismos de protección de una creación de moda, con base en un corpus jurídico previamente seleccionado. No se determinará de manera definitiva si existe una infracción ni reemplazará la asesoría de un abogado.
### 1.2 Usuarios
Nuestro usuario ideal sería un diseñador de moda colombiano, estudiante de diseño o emprendedor independiente que creó una prenda, accesorio o elemento visual y quiere conocer qué mecanismos jurídicos podrían proteger su creación frente a una posible copia.

La herramienta también puede ser ayudar a los emprendimientos que hasta ahora están empezando de moda que quieren entender, en términos sencillos, qué derechos podrían tener sobre sus diseños.

Al final del proyecto, al menos un diseñador, estudiante de diseño o persona relacionada con el sector de la moda probará la herramienta utilizando una situación ficticia

### 1.3 Qué hace y qué NO hace (alcance)
✅ Sí hace 

Explicar qué mecanismos de protección jurídica pueden ser relevantes para una creación de moda.

Orientar al usuarios sobre la diferencia entre derecho de autor y protección de diseños industriales.

Identifica, con base en la descripción del usuario, qué normas del corpus podrían ser aplicables.

Además de explicar los límites generales de la protección jurídica.

Finalmente puede advertir cuando esta información del corpus no es suficiente para responder estas dudas. 

❌ No hace 

No va a prestar asesoría legal personalizada.

No va a determinar definitivamente si existe una infracción.

No va a inventar derechos ni normas cuando no encuentra una fuente.

No va a representar al usuario ante jueces, la SIC u otras autoridades.

No va a garantizar que una creación pueda ser registrada o protegida.

### 1.4 Marco jurídico y fuentes
Las principales fuentes serán:

Decisión 351 de 1993 de la Comunidad Andina — Régimen Común sobre Derecho de Autor y Derechos Conexos.
Decisión 486 de 2000 de la Comunidad Andina — Régimen Común sobre Propiedad Industrial, especialmente las disposiciones relacionadas con diseños industriales.
Ley 23 de 1982 — Sobre derechos de autor en Colombia.
Ley 44 de 1993 — Modificación y adición a la legislación sobre derecho de autor.
Fuentes públicas oficiales de la Dirección Nacional de Derecho de Autor y de la Superintendencia de Industria y Comercio, únicamente cuando sean necesarias para explicar los mecanismos jurídicos incluidos en el corpus.

### 1.5 Nombre y lema
Nombre de la herramienta: Moda Protege
Lema: Conocer que derechos pueden proteger tus diseños de moda en Colombia

## 🗺️ Parte 2 — Plan de desarrollo

Marca cada hito cuando lo termines. Los hitos siguen las sesiones del curso.

- [ ] **M0 — Descripción y plan** *(con Sesión 1)*: Partes 1 y 2 de este README completas.
- [ ] **M1 — Asistente con instrucciones v1** *(Sesión 1–2)*: redactaste las instrucciones (prompt de sistema) de tu asistente y funcionan en una herramienta gratuita de chat.
- [ ] **M2 — Casos de prueba documentados** *(Sesión 2)*: tienes al menos 5 casos de prueba (donde antes fallaba) con resultados guardados en `docs/casos-de-prueba.md`.
- [ ] **M3 — Corpus conectado (RAG)** *(Sesión 3)*: tu asistente **cita la fuente** normativa que usa y no inventa. Corpus cargado en `corpus/`.
- [ ] **M4 — Interfaz web desplegada** *(Sesión 4)*: tu herramienta tiene **URL pública** (ver Parte 4) y tu primer usuario real la probó con evidencia.
- [ ] **M5 — Análisis crítico y demo** *(Sesión 5)*: Parte 7 completada + presentación de 5 minutos.

### Bitácora de avance semanal
Semana 1: Delimitamos el problema jurídico y definimos el alcance de la herramienta. Seleccionamos como tema los derechos de los diseñadores de moda en Colombia.
Enlace: Pendiente
Dudas: ¿Qué tan amplio debe ser nuestro corpus jurídico?

Semana 2: Crearemos las instrucciones iniciales del asistente y diseñaremos casos de prueba.
Enlace: Pendiente
Dudas: ¿Cómo evitar que el modelo dé respuestas fuera del corpus?

Semana 3: Conectaremos las fuentes jurídicas mediante un sistema RAG y verificaremos las citas.
Enlace:Pendiente
Dudas: ¿Cómo mejorar la precisión de las citas normativas?

Semana 4: Diseñaremos la interfaz web y realizaremos el despliegue público.
Enlace:Pendiente
Dudas: ¿Cómo proteger correctamente las variables de entorno?

Semana 5: Realizaremos pruebas con un usuario externo y prepararemos el análisis crítico y la sustentación.
Enlace: Pendiente
Dudas: ¿Cómo presentar claramente las limitaciones de la herramienta?

## 🛠️ Parte 3 — Stack técnico recomendado

[Diseñador o usuario]
          ↓
[Interfaz web de ModaProtege]
          ↓
[LangChain / LangGraph]
          ↓
[Búsqueda en corpus jurídico]
          ↓
[Normas sobre derecho de autor y propiedad industrial]
          ↓
[Modelo de IA mediante OpenRouter]
          ↓
[Respuesta con citas y advertencia académica]

Función de cada componente
Interfaz web: permitirá al usuario describir una creación de moda o plantear una pregunta.
LangChain o LangGraph: organizará la consulta y buscará información relevante dentro del corpus jurídico.
RAG: permitirá que el asistente consulte las normas seleccionadas antes de responder.
OpenRouter: proporcionará el modelo de inteligencia artificial encargado de redactar la respuesta.
Corpus jurídico: contendrá exclusivamente fuentes públicas previamente seleccionadas.
Sistema de citas: cada respuesta jurídica deberá indicar la norma utilizada.

La clave de API utilizada para conectar el modelo se almacenará exclusivamente como variable de entorno y nunca será publicada en el repositorio.

---

## 🚀 Parte 4 — Ruta de despliegue

El proyecto será desplegado en una plataforma gratuita que permita obtener una URL pública.

La ruta inicial propuesta es:

Desarrollar la herramienta en el repositorio de GitHub.
Construir una interfaz web sencilla.
Guardar las variables sensibles, como la API key, como variables de entorno.
Conectar el repositorio con Vercel.
Realizar el despliegue público.
Probar la URL desde otro dispositivo o con un usuario externo.
Registrar la evidencia de la prueba.
URL pública

URL: [Pendiente de despliegue]

Checklist
 La URL pública funciona.
 La herramienta muestra claramente su advertencia académica.
 No existen claves API ni secretos publicados en GitHub.
 La herramienta cita las fuentes jurídicas utilizadas.
 Un usuario externo al curso probó la herramienta.
 La evidencia de la prueba fue guardada en docs/evidencia-usuario.md.

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

El desarrollo se realizará mediante vibe coding, utilizando inteligencia artificial como apoyo técnico.
Nuestro papel como estudiantes de derecho será:

Delimitar correctamente el problema jurídico.
Seleccionar las fuentes jurídicas que integrarán el corpus.
Diseñar las instrucciones del asistente.
Crear casos de prueba.
Revisar jurídicamente las respuestas generadas.
Identificar errores, limitaciones y posibles alucinaciones.
Mantener el alcance de la herramienta limitado.
Principio principal del asistente

El asistente deberá responder únicamente con información respaldada por las fuentes incorporadas en el corpus.

Cuando no encuentre una fuente suficiente, deberá responder de forma clara que no cuenta con información suficiente dentro de su corpus para resolver la pregunta.

## ⚖️ Parte 6 — Ética, datos y responsabilidad

Advertencia obligatoria

La interfaz mostrará de forma visible:
"Esta herramienta es un ejercicio académico que no constituye asesoría legal ni sustituye la consulta con un abogado."
Protección de datos
La herramienta no solicitará ni almacenará datos personales reales de los usuarios de prueba.
Los casos utilizados durante el desarrollo y las pruebas serán ficticios o anonimizados.
El proyecto tendrá en cuenta los principios de protección de datos personales establecidos en la legislación colombiana.
Corpus público
El corpus estará compuesto únicamente por:

Normas públicas.
Decisiones o fuentes jurídicas públicas.
Información institucional publicada por autoridades competentes.
Prevención de alucinaciones

El asistente deberá:
Citar la fuente jurídica utilizada.
Evitar inventar artículos, leyes o sentencias.
Reconocer cuando el corpus no contiene información suficiente.
Diferenciar entre una orientación académica y una conclusión jurídica definitiva.

## 🔍 Parte 7 — Análisis crítico (insumo de tu sustentación final)

1. ¿Dónde falla nuestra herramienta?
La primera limitación de nuestra herramienta es que no puede determinar  si una prenda o diseño específico está jurídicamente protegido. La protección de una creación puede depender de características concretas y de un análisis detallado que una descripción breve del usuario no siempre permite realizar.
La segunda limitación es que la herramienta trabaja solamente con un corpus jurídico delimitado. Por esto, podría no considerar normas, decisiones judiciales o circunstancias particulares que sean relevantes para un caso real pero que no hayan sido incorporadas al sistema.

Por último se puede considerar el riesgo de que el usuario interprete una orientación académica como una conclusión jurídica definitiva. Por esta razón, la advertencia sobre la naturaleza académica de la herramienta debe permanecer visible.

2. ¿Qué datos procesa?
La herramienta procesa el texto que el usuario escribe para formular una pregunta o describir una situación ficticia relacionada con una creación de moda.
Durante las pruebas del proyecto no se pediran nombres completos, documentos de identidad, direcciones ni otros datos personales reales.
El sistema usa la consulta del usuario para buscar información relevante dentro del corpus jurídico y generar una respuesta.
La salida consiste en una explicación académica acompañada de las fuentes jurídicas utilizadas y de una advertencia sobre la limitación de la herramienta.

3. ¿Por qué no reemplaza a un abogado?
Nuestra herramienta no reemplaza a un abogado ya que no realiza un análisis jurídico integral de cada caso concreto.
Un abogado puede estudiar pruebas, documentos, contratos, antecedentes y circunstancias particulares que una herramienta basada en inteligencia artificial no necesariamente conoce. Además, la determinación de si existe una infracción o de qué mecanismo jurídico debe utilizarse puede requerir una valoración especializada. La herramienta trabaja únicamente con un corpus previamente seleccionado, por lo que puede carecer de información relevante para un caso real. También puede tener dificultades para interpretar correctamente descripciones incompletas o ambiguas proporcionadas por los usuarios. Por esta razón, ModaProtege tiene únicamente una finalidad académica y orientativa. Sus respuestas no constituyen asesoría jurídica profesional. Cuando una persona enfrente un conflicto real, deberá consultar a un abogado especializado o acudir a la autoridad competente.

---

## ✅ Parte 8 — Entregables finales (Definition of Done)

Requisitos de entrega del curso — todos deben estar ✅:

 Solución funcionando: Moda Protege responde consultas sobre la posible protección jurídica de creaciones de moda.
 
 URL pública: La herramienta está disponible para ser utilizada desde un navegador.
 
 Usuario real: Una persona externa al curso probó la herramienta.
 
 Evidencia: La prueba fue documentada en docs/evidencia-usuario.md.
 
 Repositorio actualizado: El repositorio contiene commits que muestran el desarrollo del proyecto.
 
 Corpus jurídico conectado: Las respuestas citan las fuentes utilizadas.
 
 Casos de prueba: Existen al menos cinco casos documentados.
 
 Análisis crítico: La Parte 7 está completa.
 
 Advertencia visible: La interfaz aclara que es un ejercicio académico y no asesoría legal.
 
Enfoque que les recomiendo mantener.


