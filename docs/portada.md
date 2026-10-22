# Portada del equipo (Issue E)

Decisiones de diseño y de componentes de la portada (`/`), según los pasos de E.1 y E.2. Cubre el criterio 7 de la rúbrica (portada del equipo) y aporta al 4 (un mismo componente con distintos datos mediante props).

## Qué incluye

1. **Presentación**: nombre del equipo, comisión, descripción y un acceso directo al equipo.
2. **Qué vas a encontrar**: un índice con las secciones del sitio (favoritos, API pública, árbol de renderizado y bitácora), cada una con su enlace.
3. **Conocé al equipo**: un selector de integrantes. Al elegir una persona se muestra su presentación, su responsabilidad y sus habilidades, con un `Link` a su perfil (`/integrantes/:slug`).

## Componentes evaluados

Se revisó `docs/catalogo-componentes.md` aplicando los criterios de `docs/arquitectura.md` (necesidad real, reutilización y responsabilidad clara).

| Candidato                    | Decisión                                | Justificación                                                                                                                              |
| ---------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `PageHero` (2.1)             | No se crea; el hero vive en `Inicio`    | Solo lo usa la portada. Se reevaluará si otra página repite la misma estructura.                                                           |
| `SectionHeading` (2.2)       | No se crea                              | Es un `<h2>` con un párrafo, con dos usos en la portada resueltos con estilos. No justifica un componente.                                 |
| `MemberCard` (3.1)           | No se crea                              | La portada presenta a las personas con el selector de E.2, no con tarjetas. Si los perfiles o la colección lo necesitan, se evalúa allí.   |
| `MemberAvatar` (nuevo)       | Se crea en `components/MemberAvatar/`   | Se usa dos veces en la portada (selector y panel) con tamaños y tonos distintos, y lo necesitarán los perfiles. Resuelve la imagen faltante con las iniciales. |
| `EquipoSelector` (nuevo)     | Se crea en `pages/Inicio/`              | Es específico de la portada: recibe la lista de integrantes y no se reutiliza fuera de ella.                                               |
| Accesos a las secciones      | Se resuelve con datos, sin componente   | Una lista que se recorre con `map` a partir de `equipo.json`.                                                                              |

## Datos

- Los textos del equipo (nombre, comisión, descripción y secciones) están en `src/assets/data/equipo.json`, como pide E.1. No se reutiliza el arreglo de enlaces de la `Sidebar` para no tocar ese componente.
- Las personas salen de `src/assets/data/integrantes.json` (issue D).
- Los valores que empiezan con `PENDIENTE` no se muestran: sin `descripcion` se ve un texto neutro, y sin `imagen` se ven las iniciales. Al completar el JSON, la portada se actualiza sola.
- La ruta de `imagen` en el JSON (por ejemplo `src/assets/images/candelaria/avatar.webp`) se resuelve en `MemberAvatar`.

## Accesibilidad

- El selector sigue el patrón de pestañas de WAI-ARIA: `tablist`, `tab` y `tabpanel`, con navegación por teclado (flechas, `Inicio` y `Fin`).
- El foco es visible en todos los controles y la animación del panel respeta `prefers-reduced-motion` (regla global de `index.css`).
- El selector pasa de una columna lateral (escritorio) a una fila de cuatro avatares (móvil).

## Correcciones a los enunciados

- E.1 menciona `pages/Home/`, pero el proyecto usa `pages/Inicio/`.
- E.2 menciona "F.1" como fuente de los datos; la fuente es D (`integrantes.json`).
