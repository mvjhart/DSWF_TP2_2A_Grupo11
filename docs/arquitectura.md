Este documento describe la estructura base de la aplicación y las principales decisiones de organización adoptadas por el equipo.

La estructura definida actualmente es un punto de partida para el desarrollo. A medida que la aplicación incorpore nuevas funcionalidades y responsabilidades, podrá ampliarse cuando sea necesario.

El objetivo es mantener una organización clara y predecible, evitando crear carpetas o capas que todavía no tengan una responsabilidad concreta.

## Estructura base

```text
src/
├── assets/
│   ├── images/
│   ├── svg/
│   └── data/
├── components/
│   ├── Header/
│   │   ├── Header.jsx
│   │   └── Header.css
│   └── ...
├── pages/
│   ├── Home/
│   │   ├── Home.jsx
│   │   └── Home.css
│   └── ...
├── hooks/
│   └── useMediaQuery.js
├── App.jsx
├── router.jsx
├── main.jsx
└── index.css
```

## Organización de `src/`

### `components/`

Contiene los componentes reutilizables de la interfaz.

**Criterios de creación y reutilización:**

- **Necesidad real:** crear componentes cuando permitan resolver una necesidad concreta del proyecto, evitando abstraer elementos que no lo justifiquen.
- **Reutilización:** como criterio inicial, evaluar la extracción de bloques visuales que aparezcan dos o más veces con una estructura o un comportamiento común. La cantidad de apariciones orienta la decisión, pero no es el único criterio.
- **Responsabilidad clara:** cada componente debe tener un propósito definido y limitarse a las responsabilidades que le corresponden.
- **Flexibilidad:** los componentes deben admitir las variaciones necesarias mediante `props`, sin acumular condiciones o configuraciones innecesarias para cubrir casos que no comparten una necesidad real.
- **Evolución compartida:** los componentes pueden modificarse a medida que surjan nuevas necesidades. Antes de cambiar su estructura, comportamiento o `props`, se deben considerar sus usos existentes y evitar romper el contrato del que dependen otras partes de la aplicación. Si un cambio incompatible es necesario, deberán revisarse y adaptarse también esos usos.
- **Colaboración:** antes de duplicar un componente o modificar uno existente para un nuevo caso de uso, conviene revisar si puede ampliarse de forma coherente con su responsabilidad y con las necesidades de quienes ya lo utilizan.

Cada componente se organiza en su propia carpeta y mantiene sus archivos relacionados juntos.

Ejemplo:

```text
components/
└── Header/
    ├── Header.jsx
    └── Header.css
```

Los componentes pueden reutilizarse desde distintas páginas o desde otros componentes cuando corresponda.

### `pages/`

Contiene las páginas asociadas a las rutas de la aplicación.

Cada página se organiza en su propia carpeta junto con sus estilos específicos.

Ejemplo:

```text
pages/
└── Bitacora/
    ├── Bitacora.jsx
    └── Bitacora.css
```

Las páginas representan el contenido principal de una ruta y utilizan componentes para construir su interfaz cuando sea conveniente.

### `assets/`

Contiene recursos estáticos utilizados por la aplicación.

Se organiza inicialmente en:

- `images/` — imágenes rasterizadas y otros recursos gráficos.
- `svg/` — archivos SVG utilizados como recursos.
- `data/` — datos estáticos utilizados por la aplicación.

Si un SVG necesita comportamiento, propiedades o interacción propia de React, puede convertirse en un componente en lugar de mantenerse como un recurso estático.

## Archivos principales de `src/`

### `main.jsx`

Es el punto de entrada de la aplicación.

Se encarga de montar React y configurar los elementos globales necesarios para iniciar la aplicación.

### `router.jsx`

Define las rutas de la aplicación y relaciona cada ruta con su página correspondiente.

### `App.jsx`

Contiene la estructura persistente de la aplicación que se mantiene entre las distintas rutas, como el encabezado, la navegación y el pie de página.

Las páginas se renderizan dentro del `Outlet` correspondiente al sistema de routing.

### `index.css`

Contiene los estilos globales de la aplicación.

Aquí deben mantenerse únicamente reglas que tengan un alcance realmente global, como estilos base, variables, reset o configuración general del documento.

Los estilos específicos de componentes y páginas deben permanecer junto a ellos.

## Organización de estilos

Los estilos específicos se mantienen junto al componente o página al que pertenecen:

```text
components/
└── Header/
    ├── Header.jsx
    └── Header.css
```

```text
pages/
└── Home/
    ├── Home.jsx
    └── Home.css
```

Para evitar conflictos entre estilos, se utilizará una clase raíz identificatoria para componentes y páginas cuando resulte necesario, y los estilos específicos podrán anidarse dentro de ella.

Los estilos globales se mantienen en `index.css`.

## Routing

La aplicación utiliza React Router para gestionar la navegación.

La estructura general es:

```text
main.jsx
    ↓
RouterProvider
    ↓
router.jsx
    ↓
App
    ├── Header / navegación
    ├── Outlet
    │    └── página correspondiente a la ruta
    └── Footer
```

Cada página es responsable de su propio elemento `<main>`, mientras que `App` mantiene la estructura compartida entre rutas.

## Hooks

Contiene hooks personalizados: funciones que reúnen lógica de React reutilizable y no dibujan interfaz.

Cada hook es un archivo suelto (`useNombre.js`), sin carpeta.

La carpeta se incorpora junto con el primer hook que pase alguna de estas pruebas:

1. Lo usan 2 o más componentes con la misma lógica.
2. Es lógica con efectos y limpieza delicados (suscripciones, cancelación)
   que ensuciaría el componente.


## Criterio para ampliar la arquitectura

No se crearán carpetas o capas únicamente como preparación para posibles necesidades futuras.

Por ejemplo, carpetas como `hooks/`, `services/`, `utils/`, `context/` u otras responsabilidades podrán incorporarse cuando el proyecto realmente las necesite.

Cuando aparezca una nueva responsabilidad que no encaje claramente en la estructura existente, se evaluará si corresponde:

1. incorporarla a una estructura existente;
2. crear una nueva carpeta o capa;
3. documentar la decisión si tiene un impacto relevante en la arquitectura.

La arquitectura se considera evolutiva: este documento se actualizará a medida que el proyecto crezca y se adopten nuevas decisiones estructurales.
