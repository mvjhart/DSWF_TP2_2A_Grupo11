# Trabajo Práctico Grupal 2

**Desarrollo de Sistemas Web · Front End · 2026 · 2.º Cuatrimestre**

> Proyecto React en equipo

## Índice

- [1. Objetivo](#1-objetivo)
  - [Organizar, construir y apropiarse](#organizar-construir-y-apropiarse)
- [2. Qué tenemos que construir](#2-qué-tenemos-que-construir)
  - [1. Repositorio y publicación](#1-repositorio-y-publicación)
  - [2. README obligatorio](#2-readme-obligatorio)
  - [3. Integrantes con acceso al repositorio](#3-integrantes-con-acceso-al-repositorio)
  - [4. Proyecto desarrollado en React](#4-proyecto-desarrollado-en-react)
  - [5. Sidebar compartida](#5-sidebar-compartida)
  - [6. Navegación completa](#6-navegación-completa)
  - [7. Portada del equipo](#7-portada-del-equipo)
  - [8. Perfiles dentro de React](#8-perfiles-dentro-de-react)
  - [9. Apropiación y propuesta estética](#9-apropiación-y-propuesta-estética)
  - [10. Datos locales JSON](#10-datos-locales-json)
  - [11. Búsqueda y filtro](#11-búsqueda-y-filtro)
  - [12. API pública y estados](#12-api-pública-y-estados)
  - [13. Árbol de renderizado](#13-árbol-de-renderizado)
  - [14. Bitácora](#14-bitácora)
  - [15. Declaración de uso de IA](#15-declaración-de-uso-de-ia)
  - [Una aplicación conectada](#una-aplicación-conectada)
- [3. README y entrega](#3-readme-y-entrega)
  - [README obligatorio](#readme-obligatorio-1)
  - [Contenido adicional recomendado](#contenido-adicional-recomendado)
  - [Entrega](#entrega)
  - [Revisión antes de entregar](#revisión-antes-de-entregar)

---

## 1. Objetivo

### Organizar, construir y apropiarse

El TP2 continúa el proyecto del equipo iniciado en TP1 y lo lleva a **React**.

El objetivo es organizar el trabajo, construir una aplicación navegable y tomar decisiones sobre su contenido y diseño, desarrollando una identidad propia para el equipo.

La **sidebar** será una estructura compartida que permanecerá como referencia mientras cambia el contenido de cada sección. Su implementación permite trabajar con componentes reutilizables y organizar la navegación de la aplicación.

La **inteligencia artificial forma parte del proceso de desarrollo**. Puede utilizarse para:

- programar;
- revisar y corregir errores;
- explorar diseños;
- generar imágenes;
- editar imágenes;
- personalizar contenidos.

El equipo debe decidir qué incorporar, adaptarlo a su propuesta y comprobar que funcione correctamente.

La relación con TP1 debe mostrarse dentro de la nueva aplicación y en su bitácora. **No se solicita un informe comparativo ni capturas de antes y después.**

### Etapas propuestas

1. **Organizar.** Crear el repositorio, incorporar a todo el equipo y completar la información básica del README.
2. **Construir.** Armar la estructura React, la sidebar y las secciones solicitadas.
3. **Personalizar y probar.** Revisar perfiles, contenidos, imágenes, navegación y datos.
4. **Publicar y entregar.** Comprobar los enlaces y recorrer los 15 criterios antes de realizar la entrega.

---

# 2. Qué tenemos que construir

Los requisitos y la rúbrica utilizan la misma numeración. Cada punto indica qué debe estar presente en el proyecto; la rúbrica establece los distintos niveles de logro.

## 1. Repositorio y publicación

Crear un **repositorio público e independiente para TP2**.

La aplicación debe estar publicada en **Vercel**.

Tanto el repositorio como el sitio publicado deben poder abrirse **sin iniciar sesión**.

---

## 2. README obligatorio

Completar el `README.md` ubicado en la raíz del repositorio.

Debe incluir:

- descripción del proyecto;
- enlace al deploy;
- nombres de todos los integrantes;
- enlaces a los perfiles de GitHub de todos los integrantes.

El README también debe contener la **declaración de uso de IA**, correspondiente al criterio 15.

---

## 3. Integrantes con acceso al repositorio

Incorporar al repositorio a **todos los integrantes registrados del grupo**.

Cada integrante invitado debe haber aceptado la invitación.

La persona que creó el repositorio ya cuenta como integrante con acceso.

---

## 4. Proyecto desarrollado en React

La aplicación debe estar desarrollada utilizando **React**.

Las pantallas deben construirse mediante componentes y la navegación debe implementarse mediante **React Router**.

El proyecto debe continuar el trabajo realizado por el equipo en TP1, trasladándolo a la nueva aplicación React.

---

## 5. Sidebar compartida

La aplicación debe organizarse mediante una **sidebar compartida**.

La sidebar debe:

- permanecer disponible mientras se navega entre las distintas secciones;
- mostrar la identidad del equipo;
- permitir acceder a las diferentes secciones;
- indicar cuál es la sección actualmente activa.

La sidebar debe implementarse como un componente reutilizable dentro de la estructura de la aplicación.

---

## 6. Navegación completa

Todas las pantallas deben permitir continuar o volver utilizando los mecanismos de navegación de la propia aplicación.

La navegación puede realizarse mediante:

- la sidebar;
- enlaces;
- botones;
- otros controles apropiados de la interfaz.

Ninguna sección debe depender del botón **Atrás** del navegador para poder continuar utilizando la aplicación.

---

## 7. Portada del equipo

Crear una portada que presente al equipo.

Debe incluir:

- nombre del equipo;
- descripción;
- acceso a sus integrantes;
- una presentación visual propia.

La portada debe ser algo más que un conjunto de tarjetas o enlaces a perfiles: debe funcionar como la presentación inicial del proyecto.

---

## 8. Perfiles dentro de React

Construir **un perfil por cada integrante** dentro de la aplicación React.

Cada perfil debe:

- identificar a la persona;
- presentar su contenido;
- formar parte de la navegación de la aplicación.

Los enlaces a las páginas desarrolladas durante TP1 **no reemplazan** los perfiles que deben construirse dentro del TP2.

---

## 9. Apropiación y propuesta estética

El equipo debe definir una **identidad visual propia**.

La propuesta puede incluir decisiones sobre:

- colores;
- tipografías;
- composición;
- imágenes;
- ilustraciones;
- avatares;
- fondos;
- otros recursos visuales.

Se puede utilizar IA para explorar estilos y generar o editar recursos gráficos.

Los resultados generados deben ser **revisados y personalizados** para adaptarlos a la propuesta del proyecto.

No es obligatorio utilizar fotografías personales.

---

## 10. Datos locales JSON

Incluir un **archivo JSON local** con al menos **20 registros** relacionados con la propuesta del equipo.

Los datos deben mostrarse dinámicamente en la aplicación mediante:

- tarjetas;
- un listado;
- u otra representación adecuada.

Algunos ejemplos posibles son:

- proyectos;
- recursos;
- herramientas;
- recomendaciones;
- otros datos relacionados con la propuesta del equipo.

La información debe provenir del JSON y no estar escrita manualmente como contenido repetido dentro de cada componente.

---

## 11. Búsqueda y filtro

Sobre el listado generado a partir del JSON se deben implementar:

- una **búsqueda por texto**;
- un **filtro por una propiedad de los datos**.

Ambos mecanismos deben actualizar dinámicamente los resultados mostrados en la aplicación.

---

## 12. API pública y estados

Elegir una **API pública** y mostrar sus resultados dentro de la aplicación.

La sección correspondiente debe indicar:

- qué API se utiliza;
- qué información proporciona;
- qué información se muestra en el proyecto.

La aplicación debe contemplar al menos los siguientes estados:

- **carga:** mostrar un mensaje o indicador mientras se espera la respuesta;
- **error:** mostrar un mensaje cuando la consulta falle.

La API elegida debe poder consultarse directamente desde el navegador **sin exponer claves privadas**.

---

## 13. Árbol de renderizado

Incluir una sección que muestre el **árbol de componentes de la aplicación**.

Debe representar la relación entre el componente principal y sus hijos, por ejemplo:

```text
App
├── Layout
│   ├── Sidebar
│   └── ...
├── Página
│   ├── Componente
│   └── Tarjeta
└── ...
```

El árbol debe corresponder a la estructura real del código entregado.

**No es simplemente una lista de carpetas o archivos del proyecto.**

---

## 14. Bitácora

Incluir una sección con registros breves del proceso de trabajo.

La bitácora puede registrar:

- qué se hizo;
- qué decisiones se tomaron;
- qué problemas aparecieron;
- qué dificultades se resolvieron;
- otros aspectos relevantes del proceso.

Se puede continuar y actualizar la bitácora desarrollada durante TP1 dentro de la nueva aplicación.

---

## 15. Declaración de uso de IA

Registrar en el README las herramientas y modelos de IA utilizados durante el desarrollo.

Es importante diferenciar:

- **aplicación:** desde dónde se utilizó la IA;
- **modelo:** qué modelo se utilizó.

Para ampliar la declaración, se puede indicar:

- qué utilizó cada integrante;
- en qué tarea;
- para qué contenido;
- qué parte fue generada, revisada o modificada con IA.

La declaración de uso de IA forma parte de los requisitos obligatorios del proyecto.

---

## Una aplicación conectada

Todos los elementos principales del proyecto deben formar parte de **una única aplicación navegable**.

Desde la navegación interna deben poder accederse a:

- portada;
- perfiles;
- datos locales;
- sección de API;
- árbol de renderizado;
- bitácora.

El proyecto debe poder presentarse y recorrerse completamente dentro de React.

---

# 3. README y entrega

## README obligatorio

El README debe ser **breve pero completo** e incluir como mínimo:

### Descripción

Explicar qué propone el proyecto y qué contiene la aplicación.

### Deploy

Incluir un enlace funcional al sitio publicado en Vercel.

### Integrantes

Indicar:

- nombre y apellido de cada integrante;
- enlace al perfil de GitHub correspondiente.

### Uso de IA

Indicar las aplicaciones y modelos de IA utilizados.

Este apartado corresponde al **criterio 15**.

---

## Contenido adicional recomendado

Para alcanzar niveles de logro superiores, el README puede incluir además:

- índice;
- capturas de la aplicación;
- responsabilidades de cada integrante;
- detalle del uso de IA por integrante;
- otra documentación relevante del proyecto.

Una plantilla con campos vacíos **no cuenta como documentación completa**.

---

## Entrega

La entrega consiste en **un único enlace al repositorio público de TP2**.

El enlace debe cargarse en la pestaña **TP 2** de la [planilla única de entregas](https://docs.google.com/spreadsheets/d/1jVA0xZfZ15kuW09JjlMVRPTYvd4gzL1KBOO42XFsECg/edit), en la fila correspondiente al grupo.

El enlace a Vercel debe encontrarse dentro del README.

---

## Revisión antes de entregar

Antes de realizar la entrega, comprobar:

- [ ] El repositorio es público.
- [ ] El sitio de Vercel es accesible sin iniciar sesión.
- [ ] El enlace al repositorio funciona.
- [ ] El enlace al deploy funciona.
- [ ] Todos los integrantes están incorporados al repositorio.
- [ ] Todas las invitaciones fueron aceptadas.
- [ ] El README contiene todos los datos obligatorios.
- [ ] La portada funciona correctamente.
- [ ] Todos los perfiles están disponibles dentro de React.
- [ ] La sidebar permite navegar por toda la aplicación.
- [ ] Ninguna sección depende del botón Atrás del navegador.
- [ ] El JSON contiene al menos 20 registros.
- [ ] La búsqueda funciona.
- [ ] El filtro funciona.
- [ ] La API funciona correctamente.
- [ ] Se muestra un estado de carga.
- [ ] Se muestra un estado de error.
- [ ] El árbol de renderizado corresponde al código.
- [ ] La bitácora está incluida.
- [ ] La declaración de uso de IA está incluida en el README.
- [ ] Se recorrieron los 15 criterios antes de entregar.

---

## Referencia original

[Consigna oficial del TP2](https://ifts29-portada.vercel.app/trayecto/tp2/)
