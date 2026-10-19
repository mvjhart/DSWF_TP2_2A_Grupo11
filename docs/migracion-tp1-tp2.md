# Mapa de migración TP1 → TP2

## 1. Archivos de la raíz

| Archivo TP1 | Destino en TP2 | Estrategia |
|---|---|---|
| `.gitignore` | `.gitignore` de TP2 | Mantener la configuración de Node/Vite y ajustarla si es necesario. |
| `README.md` | `README.md` de TP2 | Reescribir para documentar el nuevo proyecto. |
| `index.html` | `src/pages/Home/` y componentes compartidos | Migrar el contenido propio a la portada y separar las estructuras compartidas para reutilizarlas en React. |
| `bitacora.html` | `src/pages/Bitacora/` | Migrar el contenido a la página de bitácora. |

## 2. Páginas de integrantes

Los cuatro perfiles activos compartirán una única página de React, identificada por la ruta y los datos de cada integrante. Se conservarán sus contenidos y particularidades sin duplicar la estructura.

| Archivo TP1 | Destino en TP2 | Estrategia |
|---|---|---|
| `perfil_fede.html` | `src/pages/Perfil/`, slug `federico` | Conservar el contenido de Fede en sus datos. |
| `perfil_victoria.html` | `src/pages/Perfil/`, slug `victoria` | Conservar el contenido de Victoria en sus datos. |
| `perfil_cande.html` | `src/pages/Perfil/`, slug `candelaria` | Conservar el contenido de Cande en sus datos. |
| `perfil_marcos.html` | `src/pages/Perfil/`, slug `marcos` | Conservar el contenido de Marcos en sus datos. |
| `perfil_adrian.html` | Descartado | Adrián abandonó el equipo. |

Los datos se separarán de la estructura de la página y la ruta determinará qué perfil mostrar. Las particularidades se revisarán durante el desarrollo.

## 3. Hojas de estilo

| Archivo TP1 | Destino en TP2 | Estrategia |
|---|---|---|
| `css/styles.css` | `src/index.css` y estilos específicos | Separar los estilos globales de los correspondientes a páginas y componentes. Usar temporalmente `src/resto.css` para las reglas aún pendientes de migración y eliminarlo cuando quede vacío. |
| `css/styles_fede.css` | `src/pages/Perfil/Perfil.css` | Integrar los estilos en una hoja compartida por los perfiles. |
| `css/styles_knd.css` | `src/pages/Perfil/Perfil.css` | Integrar los estilos en la hoja compartida. |
| `css/styles_marcos.css` | `src/pages/Perfil/Perfil.css` | Integrar los estilos en la hoja compartida. |
| `css/styles_ria.css` | `src/pages/Perfil/Perfil.css` | Integrar los estilos en la hoja compartida. |

Se conservarán las diferencias visuales necesarias mediante estilos y datos específicos, sin mantener una hoja independiente por perfil.

## 4. Scripts JavaScript

Las funcionalidades se adaptarán a React; no se trasladarán automáticamente los scripts originales.

| Archivo TP1 | Destino en TP2 | Estrategia |
|---|---|---|
| `js/main.js` | Aplicación y componentes compartidos | Adaptar las funcionalidades generales. |
| `js/bitacora.js` | `src/pages/Bitacora/` | Migrar las interacciones de la bitácora. |
| `js/bitacoraData.js` | `src/assets/data/` | Convertir los datos al formato JSON. |
| `js/fede_perfil.js` | Perfil de Fede | Adaptar sus interacciones particulares. |
| `js/victoria_perfil.js` | Perfil de Victoria | Adaptar sus interacciones particulares. |
| `js/cande_perfil.js` | Perfil de Cande | Adaptar sus interacciones particulares. |
| `js/marcos_perfil.js` | Perfil de Marcos | Adaptar sus interacciones particulares. |
| Script inline de `perfil_adrian.html` | Descartado | Corresponde al perfil de un integrante que abandonó el equipo. |

La asignación de cada funcionalidad a componentes concretos se definirá durante el desarrollo.

## 5. Imágenes y recursos visuales

Las imágenes que se conserven se organizarán en `src/assets/images/`, por integrante. Se normalizarán los nombres de archivo siguiendo una convención común y se actualizarán sus referencias.

| Directorio TP1 | Destino en TP2 | Estrategia |
|---|---|---|
| `img/fede/` | `src/assets/images/fede/` | Conservar las imágenes del perfil de Fede. |
| `img/ria/` | `src/assets/images/victoria/` | Conservar las imágenes de Victoria y normalizar el directorio. |
| `img/knd/` | `src/assets/images/cande/` | Conservar las imágenes de Cande y normalizar los nombres. |
| `img/itos/` | `src/assets/images/marcos/` | Conservar las imágenes de Marcos y normalizar el directorio. |
| `img/adrian/` | Descartado | Corresponde al perfil de un integrante que abandonó el equipo. |
| `img/screenshots/` | Descartado | Son capturas de TP1; la consigna no exige comparativas del proyecto anterior. |

Se verificará que todas las imágenes conservadas tengan un destino y referencias actualizadas.

## 6. Documentación de TP1

| Archivo TP1 | Destino en TP2 | Estrategia |
|---|---|---|
| `docs/AI.md` | `docs/AI.md` | Actualizar el registro de uso de IA para TP2 y utilizarlo como referencia para el README. |
| `docs/bitacora-funcionalidades.md` | `docs/tp1/` | Conservar como referencia histórica. |
| `docs/index-funcionalidades.md` | `docs/tp1/` | Conservar como referencia histórica. |
| `docs/documentacion_js_fede.md` | `docs/tp1/` | Conservar como referencia histórica. |
| `docs/documentacion_js_ria.md` | `docs/tp1/` | Conservar como referencia histórica. |
| `docs/documentacion_js_cande.md` | `docs/tp1/` | Conservar como referencia histórica. |
| `docs/documentacion_js_marcos.md` | `docs/tp1/` | Conservar como referencia histórica. |

La documentación histórica podrá consultarse durante la migración, sin necesidad de trasladar todo su contenido a la aplicación.

## 7. Criterios generales de migración

- Integrar el contenido conservado en una única aplicación navegable con React.
- Resolver los cuatro perfiles mediante una estructura compartida y datos específicos.
- Adaptar las funcionalidades y los recursos relevantes a la nueva arquitectura.
- Documentar el motivo de cada descarte.
- Registrar los cambios relevantes respecto de los destinos previstos.

