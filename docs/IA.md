# Declaración de uso de IA

Este documento registra las herramientas de inteligencia artificial utilizadas por el equipo durante el desarrollo del TP2, diferenciando **aplicación** (desde dónde se usó) y **modelo** (cuál), y detallando qué se generó, revisó o modificó con IA.

## Herramientas utilizadas

El equipo utilizó las siguientes herramientas de IA como asistencia durante el desarrollo:

- **Claude** (Anthropic): exploración de componentes, generación de código y documentación.
- **DeepSeek**: resolución de dudas técnicas y generación de fragmentos de código.
- **ChatGPT** (OpenAI): generación de textos, debug y exploración de soluciones.

Todo el contenido generado con IA fue **revisado, adaptado y validado** por los integrantes antes de incorporarlo al proyecto. La IA se usó como herramienta de apoyo, no como reemplazo del trabajo del equipo.

## Tabla por integrante

| Integrante              | Aplicación                | Modelo                              | Tareas                                                                                                                                                                          | Qué generó / revisó / modificó                                                                              |
| ----------------------- | ------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Federico Acosta Maneiro | Claude                    | Claude Sonnet 5.5                   | Diseño y documentación de esquemas de datos JSON, exploración de ideas de interfaz, desarrollo de componentes de React, revisión de accesibilidad y resolución de dudas de Git. | Generó y revisó código, datos y documentación; adaptó lo generado a las necesidades del proyecto.           |
| María Victoria Mariani  | ChatGPT                   | GPT-4, GPT-6                        | Generación de SVG, exploración de diseños y paletas de colores, resolución de dudas sobre el lenguaje, revisión de código y accesibilidad.                                      | Generó recursos SVG, exploró diseños y revisó código y accesibilidad; adaptó lo generado al proyecto.       |
| Candelaria Chazarreta   | Claude, DeepSeek          | Claude Sonnet 5.5, DeepSeek V3      | Código, debug, datos, documentación                                                                                                                                             | Generó borradores de código y textos; revisó, probó y adaptó todo a la arquitectura y el diseño del equipo. |
| Marcos Aquino           | Claude, DeepSeek, ChatGPT | Claude Sonnet 4, DeepSeek V3, GPT-4 | Código, debug, datos, documentación                                                                                                                                             | Generó y revisó código, datos y documentación; adaptó lo generado a las necesidades del proyecto.           |

## Detalle por integrante

### Federico Acosta Maneiro

- **Aplicación:** Claude (Anthropic)
- **Modelo:** Claude Sonnet 5.5
- **Tareas:** diseño y documentación de esquemas de datos JSON, desarrollo de componentes de React, revisión de accesibilidad y resolución de dudas de Git.
- **Qué generó, revisó o modificó:** Claude se utilizó como herramienta de apoyo durante el desarrollo del frontend del TP2, tanto para organizar la estructura de los datos como para construir y revisar componentes de la interfaz.

  Entre las tareas realizadas se encuentra el análisis de una propuesta de organización de los datos y la redacción de la documentación de los archivos JSON, con sus propiedades, su carácter obligatorio u opcional y sus reglas de integridad.

  También se utilizó Claude para desarrollar componentes de React, como una portada con un selector interactivo de integrantes y un avatar reutilizable que muestra las iniciales cuando falta la imagen. Esta asistencia permitió explorar una propuesta visual y de interacción antes de decidir su implementación, y razonar qué componentes convenía crear y cuáles no.

  Se consultaron cuestiones de accesibilidad, como la navegación por teclado, el uso de atributos ARIA y el texto alternativo de las imágenes, además de la detección de inconsistencias entre la documentación y el código.

  Además, se resolvieron dudas de flujo de trabajo con Git, ordenar los cambios y evitar subir archivos ajenos al trabajo propio.

  La asistencia de IA funcionó, por lo tanto, como un recurso para acelerar la exploración de alternativas, resolver dudas puntuales y detectar posibles errores u omisiones.

### María Victoria Mariani

- **Aplicación:** ChatGPT (OpenAI)
- **Modelo:** GPT-4, GPT-6
- **Tareas:** generación de recursos gráficos en SVG, exploración de alternativas de diseño, revisión de código y accesibilidad.
- **Qué generó, revisó o modificó:** ChatGPT se utilizó como herramienta de apoyo durante el desarrollo del frontend del TP2, tanto para explorar soluciones visuales como para resolver cuestiones técnicas y revisar detalles de implementación.

  Entre las tareas realizadas se encuentra la asistencia para crear recursos gráficos en formato SVG destinados a la interfaz. Por ejemplo, se trabajó sobre iconos para la página de la API pública y sobre un icono de GitHub para el footer. Estos recursos buscaban mantener una presentación coherente con el diseño de la aplicación y evitar depender innecesariamente de imágenes de mayor tamaño para elementos gráficos sencillos.

  También se utilizó ChatGPT para explorar alternativas de diseño y paletas de colores, evaluar enfoques visuales y materializar ideas de manera rápida. Esta asistencia permitió comparar posibilidades y visualizar cómo podrían funcionar determinados elementos antes de decidir su implementación.

  Otra función importante fue la revisión del código como una segunda mirada durante el desarrollo. Se consultaron posibles problemas de accesibilidad y uso de atributos ARIA, además de detalles que podían pasar inadvertidos durante la implementación.

  La asistencia de IA funcionó, por lo tanto, como un recurso para acelerar la exploración de alternativas, resolver dudas puntuales y detectar posibles errores u omisiones. La selección de las propuestas, su adaptación al código existente y la decisión de incorporarlas quedaron a cargo de la integrante.

### Candelaria Chazarreta

- **Aplicación:** Claude, DeepSeek
- **Modelo:** Claude Sonnet 5.5, DeepSeek V3
- **Tareas:** Generación de código (componentes de React y hooks), debug, estructuración de datos (JSON), redacción de documentación (como la bitácora), análisis y arquitectura de los perfiles y diseño de la interacción de mi perfil.
- **Qué generó / revisó / modificó:** La IA generó borradores de código y textos, entre ellos la estructura de componentes reutilizables de los perfiles, las pestañas de favoritos, el tratamiento de datos pendientes y un test interactivo de Halloween con el gato negro. Todo fue revisado, probado y validado por mí, y lo adapté a la arquitectura definida y al diseño del equipo: integré los tonos desde el JSON, filtré los favoritos destacados, organicé los gadgets por carpeta, sumé la navegación entre perfiles y descarté o modifiqué lo que no encajaba, para que todo funcionara y mantuviera la identidad del equipo.

### Marcos Aquino

- **Aplicación:** Claude, DeepSeek, ChatGPT
- **Modelo:** Claude Sonnet 4, DeepSeek V3, GPT-4
- **Tareas:** desarrollo de la sección de Recursos (listado de favoritos con búsqueda, filtros y estados), extracción de componentes compartidos de filtros, corrección de rutas de avatares y datos, documentación del README y de la declaración de IA.
- **Qué generó, revisó o modificó:** Usé IA como apoyo durante el desarrollo de la sección de Recursos del TP2, tanto para escribir código como para revisar y documentar.

  Entre las tareas realizadas está el listado dinámico de favoritos en `/recursos`, con búsqueda por texto que ignora mayúsculas y tildes, filtros por tipo e integrante, contador de resultados, botón "Restablecer" y estado sin resultados. También la extracción de los componentes compartidos `FilterBar`, `FilterSelect`, `SearchInput` y `StatusMessage` a `components/ControlesFil/`, que se reutilizan en Bitácora, Recursos y Api.

  Se consultó IA para corregir las rutas de los avatares en `integrantes.json` (que no se resolvían con `MemberAvatar`), para actualizar el rol y el tag de Candelaria, y para ajustar el esquema de favoritos destacados a 3 álbumes + 3 películas.

  También se usó IA para redactar el README completo (con deploy, integrantes, descripción, índice y documentación) y el archivo `docs/IA.md` que estás leyendo.

  Todo el código y los textos generados fueron revisados, probados y adaptados por mí antes de incorporarlos al proyecto. La IA funcionó como apoyo para acelerar la escritura, detectar errores y ordenar la documentación, pero las decisiones de diseño, la selección de lo que se incorporaba y la validación final quedaron a mi cargo.
