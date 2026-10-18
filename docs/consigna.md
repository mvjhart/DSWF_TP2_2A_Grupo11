# TP2 Grupal: Proyecto React en equipo

**Materia:** Desarrollo de Sistemas Web · Front End · 2026 · 2.º cuatrimestre 
**↪ [Enlace a consigna](https://ifts29-portada.vercel.app/trayecto/tp2/)**

## Objetivo

Continuar el proyecto del equipo iniciado en el TP1 y llevarlo a **React**. El TP2 apunta a tres cosas:

1. **Organizar** el trabajo del equipo.
2. **Construir** una aplicación navegable.
3. **Apropiarse** del proyecto: tomar decisiones propias sobre contenido y diseño y desarrollar una identidad de equipo.

La **sidebar** es la estructura compartida que permanece como referencia mientras cambia el contenido de cada sección. Obliga a trabajar con componentes reutilizables y a organizar la navegación.

La **IA forma parte del proceso**: puede usarse para programar, revisar y corregir errores, explorar diseños, generar y editar imágenes y personalizar contenidos. El equipo decide qué incorporar, lo adapta a su propuesta y comprueba que funcione.

La relación con el TP1 debe verse **dentro de la nueva aplicación y en la bitácora**. No se pide informe comparativo ni capturas de antes y después.

## Etapas

1. **Organizar:** repositorio, todo el equipo incorporado, información básica del README.
2. **Construir:** estructura React, sidebar y secciones solicitadas.
3. **Personalizar y probar:** perfiles, contenidos, imágenes, navegación y datos.
4. **Publicar y entregar:** comprobar enlaces y recorrer los 15 criterios.

## Requisitos (misma numeración que la rúbrica)

1. **Repositorio y publicación:** repositorio público e independiente para TP2. Publicado en Vercel. Repositorio y sitio abiertos sin iniciar sesión.
2. **README obligatorio** en la raíz: descripción, enlace al deploy, nombres de todos los integrantes, enlaces a sus perfiles de GitHub y declaración de uso de IA.
3. **Integrantes con acceso:** todos los integrantes registrados invitados y con la invitación aceptada. Quien creó el repo cuenta como integrante con acceso.
4. **Proyecto en React:** pantallas construidas con componentes, navegación con React Router. Continúa el trabajo del TP1 trasladado a la nueva app.
5. **Sidebar compartida:** permanece disponible al navegar, muestra la identidad del equipo, da acceso a las secciones, indica la sección activa. Es un componente reutilizable.
6. **Navegación completa:** todas las pantallas permiten continuar o volver con controles de la propia app (sidebar, enlaces, botones, etc.). Ninguna sección depende del botón Atrás del navegador.
7. **Portada del equipo:** nombre, descripción, acceso a integrantes y presentación visual propia. Debe ser más que tarjetas o enlaces a perfiles: es la presentación inicial del proyecto.
8. **Perfiles dentro de React:** un perfil por integrante que lo identifique, presente su contenido y forme parte de la navegación. Los enlaces a las páginas del TP1 no reemplazan los perfiles.
9. **Apropiación y propuesta estética:** identidad visual propia (colores, tipografías, composición, imágenes, ilustraciones, avatares, fondos, otros recursos). Se puede usar IA para explorar estilos y generar o editar recursos, que deben ser revisados y personalizados. No son obligatorias las fotos personales.
10. **Datos locales JSON:** archivo local con al menos 20 registros relacionados con la propuesta (proyectos, recursos, herramientas, recomendaciones, etc.). Se muestran dinámicamente (tarjetas, listado u otra representación). La información proviene del JSON, no de contenido repetido a mano en componentes.
11. **Búsqueda y filtro** sobre el listado del JSON: búsqueda por texto y filtro por una propiedad. Ambos actualizan los resultados dinámicamente.
12. **API pública y estados:** elegir una API pública y mostrar sus resultados. La sección indica qué API se usa, qué información proporciona y cuál se muestra. Contempla estado de **carga** y de **error**. La API se consulta desde el navegador sin exponer claves privadas.
13. **Árbol de renderizado:** sección con el árbol de componentes (componente principal y sus hijos) que corresponda a la estructura real del código. No es una lista de carpetas o archivos.
14. **Bitácora:** sección con registros breves del proceso (qué se hizo, decisiones, problemas, dificultades resueltas). Se puede continuar la bitácora del TP1 dentro de la nueva app.
15. **Declaración de uso de IA** en el README: herramientas y modelos usados, diferenciando **aplicación** (desde dónde) y **modelo** (cuál). Se puede ampliar con qué usó cada integrante, en qué tarea, para qué contenido y qué parte fue generada, revisada o modificada con IA.

## Una aplicación conectada

Todo forma parte de **una única aplicación navegable**. Desde la navegación interna se accede a portada, perfiles, datos locales, sección de API, árbol de renderizado y bitácora. El proyecto se presenta y recorre completo dentro de React.

## Entrega

- Un único enlace al repositorio público de TP2, cargado en la pestaña **TP 2** de la planilla única de entregas, en la fila del grupo.
- El enlace a Vercel va dentro del README.
- README breve pero completo. Una plantilla con campos vacíos no cuenta como documentación completa.
- Para niveles superiores el README puede sumar índice, capturas, responsabilidades por integrante, detalle de IA por integrante y otra documentación relevante.
