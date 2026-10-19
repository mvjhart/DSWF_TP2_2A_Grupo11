# B.4 · Catálogo de componentes compartidos

Este catálogo es un _guia_ distingue entre componentes que responden a necesidades ya identificadas, familias de elementos que podrían compartir una implementación y abstracciones que requieren validación durante el desarrollo.

Los nombres y las `props` son provisionales. Su inclusión no implica que todos los candidatos deban implementarse como componentes independientes ni que deban compartir una única implementación.

Puede ir agregandose información comforme avanza el desarrollo.

## 1. Navegación e identidad visual

### 1.1. `Sidebar`

- **Evidencia:** requisito explícito de TP2; en TP1 existen navegación y encabezados repetidos en `index.html`, `bitacora.html` y los perfiles.
- **Repetición identificada:** la identidad del equipo y los enlaces de navegación deben estar disponibles en las distintas páginas de la aplicación.
- **Responsabilidad:** centralizar la navegación compartida, identificar la sección activa y ofrecer una estructura de navegación consistente.
- **Posibles `props`:** `items`, `activePath` o información equivalente para determinar la sección activa; `team` o datos de identidad si resultan necesarios.
- **Variantes:** sección activa, estado expandido o contraído, comportamiento en escritorio y móvil.
- **Pendientes:** definir cómo se adapta a pantallas pequeñas; decidir dónde se ubican el logo y el control de tema; determinar cómo se representa el estado activo con React Router. Debe persistir entre las páginas navegadas.

### 1.2. `TeamLogo` o `Logo`

- **Evidencia:** identidad «Equipo 11» repetida en los encabezados de TP1; TP2 exige identidad del equipo en la navegación compartida.
- **Repetición identificada:** nombre y posible recurso gráfico de identidad, con un destino de navegación.
- **Responsabilidad:** presentar la identidad visual del equipo de forma consistente y facilitar el acceso a la portada cuando corresponda.
- **Posibles `props`:** `name`, `image`, `to`, `alt` y, si hace falta, `variant`.
- **Variantes:** versión con imagen y texto, solo texto o presentación compacta para espacios reducidos.
- **Pendientes:** comprobar si se mantiene el logo actual, si se necesita un recurso gráfico nuevo y qué presentación funciona mejor dentro de la sidebar.

### 1.3. `ThemeToggle`

- **Evidencia:** `main.js` y los documentos HTML de TP1 incluyen cambio entre tema claro y oscuro.
- **Repetición identificada:** un mismo control permite cambiar el tema visual de la aplicación.
- **Responsabilidad:** ofrecer una interacción accesible para alternar el tema y reflejar el estado actual.
- **Posibles `props`:** eventualmente `theme`, `onToggle` o `onChange`, según dónde se gestione el estado.
- **Variantes:** presentación con icono, texto o ambos; adaptación al espacio disponible.
- **Pendientes:** decidir si el estado se gestiona globalmente y cómo se conserva la preferencia. Definir si el control será un componente independiente dentro de la `Sidebar` o si se ubicará en otro sector. La ubicación todavía no está decidida.

### 1.4. `Footer`

- **Evidencia:** los HTML de TP1 repiten el pie con información del equipo, GitHub, año, comisión e institución.
- **Repetición identificada:** información institucional compartida en distintas páginas.
- **Responsabilidad:** mantener consistente el pie de la aplicación y evitar repetir su estructura.
- **Posibles `props`:** `teamName`, `githubUrl`, `year`, `commission` e `institution`, si esos datos necesitan configurarse.
- **Variantes:** presentación adaptada a diferentes anchos de pantalla; eventualmente, ocultar información secundaria en contextos concretos.
- **Pendientes:** decidir si todos los perfiles conservarán el mismo pie y si hay información que deba variar según la página. Evitar convertir en `props` datos que siempre serán iguales y no necesitan configuración.

### 1.5. `Header`

- **Evidencia:** `index.html`, `bitacora.html` y los perfiles de TP1 incluyen un encabezado con identidad del equipo, navegación superior y controles de interfaz.
- **Repetición identificada:** las páginas comparten una estructura superior que reúne elementos de identidad y controles globales. Parte de su contenido actual, como la navegación, deberá reorganizarse para cumplir el requisito de la `Sidebar` en TP2.
- **Responsabilidad:** si se conserva en la nueva aplicación, proporcionar un espacio compartido para la identidad del equipo y los controles globales que se decida mantener fuera de la `Sidebar`.
- **Posibles `props`:** por definir según su responsabilidad definitiva. Podría no necesitar props propias si se limita a organizar componentes compartidos como `TeamLogo` y `ThemeToggle`.
- **Variantes:** por determinar según las necesidades de las páginas y el diseño adaptable. No se presupone que deba tener variantes antes de definir su función.
- **Pendientes:** decidir si el `Header` seguirá existiendo como componente compartido en TP2 o si sus responsabilidades se distribuirán entre otros componentes. Evaluar si contendrá el logo, el control de tema u otros elementos globales; la navegación principal corresponderá a la `Sidebar`, por lo que no debe duplicarse en el encabezado. Definir también su ubicación y comportamiento en relación con la `Sidebar` y el contenido de las páginas.

## 2. Estructura de las páginas

### 2.1. `PageHero` o `PageBanner`

- **Evidencia:** `index.html` presenta «Somos el Grupo 11» y `bitacora.html` presenta «Bitácora del Proyecto», ambos con título y texto introductorio.
- **Repetición identificada:** una cabecera destacada introduce el propósito de una página mediante título, descripción y tratamiento visual.
- **Responsabilidad:** reutilizar la estructura de presentación inicial sin obligar a que todas las páginas tengan el mismo contenido.
- **Posibles `props`:** `title`, `description`, `image`, `variant` o contenido adicional, según las necesidades reales.
- **Variantes:** portada del equipo, presentación de una sección o banner más compacto.
- **Pendientes:** comparar los perfiles y las futuras páginas de TP2 para determinar si comparten esta estructura o si algunos encabezados necesitan un diseño diferente. No asumir que todas las páginas requieren un hero grande.

### 2.2. `SectionHeading` o `SectionContainer`

- **Evidencia:** en TP1 aparecen secciones como «¿Quiénes somos?», habilidades, películas, música y discos favoritos.
- **Repetición identificada:** distintas secciones organizan contenido bajo un título y, en algunos casos, una descripción.
- **Responsabilidad:** si se justifica su reutilización, mantener una jerarquía consistente entre el título de una sección y su contenido.
- **Posibles `props`:** `title`, `description`, `id`, `children` y, eventualmente, `variant`.
- **Variantes:** sección con o sin descripción; contenido en grilla, lista o disposición libre.
- **Pendientes:** comprobar si se repite suficiente estructura como para necesitar un componente React.

## 3. Integrantes y perfiles

### 3.1. `MemberCard`

- **Evidencia:** `index.html` presenta tarjetas de integrantes con imagen, nombre, rol o descripción y enlace al perfil.
- **Repetición identificada:** cada integrante se representa mediante una estructura común, con datos diferentes.
- **Responsabilidad:** presentar a cada integrante de manera consistente y facilitar el acceso a su perfil.
- **Posibles `props`:** `name`, `image`, `role`, `description` y `to`.
- **Variantes:** diferencias de contenido o presentación que se justifiquen por el diseño; estados de interacción accesibles.
- **Pendientes:** definir los campos definitivos de los datos de integrantes y verificar qué información debe mostrarse en la portada.

### 3.2. `ProfileIdentity` o `ProfileHeader`

- **Evidencia:** Muestra imagen, nombre y datos personales.
- **Repetición identificada:** todos los perfiles deben identificar claramente a su integrante, aunque los datos y el diseño particular puedan variar.
- **Responsabilidad:** presentar la identidad del integrante sin duplicar toda la estructura del perfil.
- **Posibles `props`:** `name`, `image`, `location`, `age` y otros datos que se decida conservar.
- **Variantes:** distribución, tamaño de imagen y datos opcionales según el diseño de cada perfil.
- **Pendientes:** confirmar los datos y campos definitivos de todos los integrantes; decidir cuánto del diseño se comparte y cuánto permanece específico de cada perfil.

### 3.3. `SkillsList` y `SkillChip`

- **Repetición identificada:** los perfiles muestran habilidades como un conjunto de elementos breves, pero las categorías, la disposición y las interacciones pueden variar.
- **Responsabilidad:** `SkillsList` organizaría un conjunto de habilidades; `SkillChip` representaría cada habilidad individual con una presentación consistente.
- **Posibles `props`:**
  - `SkillsList`: `skills`, `groups` o datos equivalentes para separar habilidades por categoría.
  - `SkillChip`: `label`, `variant` y, si se justifica, `interactive` o un manejador de interacción.
- **Variantes:** habilidades agrupadas o sin agrupar; distribución adaptable; diferencias de estilo; interacción opcional, como la que existe en el perfil de Victoria.
- **Pendientes:** decidir cómo se modelan las categorías y si las habilidades interactivas necesitan un comportamiento separado. Evitar que todas las habilidades sean interactivas si solo un perfil necesita esa funcionalidad.

## 4. Elementos de contenido y presentación visual

### 4.1. `FavoriteItemCard`

- **Evidencia:** los perfiles muestran películas, música o discos mediante imágenes o portadas, títulos y contenido adicional.
- **Repetición identificada:** los elementos favoritos presentan información sobre un objeto cultural mediante una estructura visual reconocible. Los campos concretos y las interacciones varían.
- **Responsabilidad:** presentar un elemento favorito con los datos disponibles, permitiendo reutilizar una estructura común cuando resulte adecuada.
- **Posibles `props`:** `title`, `image`, `creator`, `description`, `year`, `link`, `action` o `children`, según el tipo de elemento.
- **Variantes:** película, álbum, canción u otro tipo de favorito; con o sin descripción; con enlace externo; con una acción o interacción opcional.
- **Pendientes:** comparar los elementos de cada perfil para identificar qué estructura puede compartirse. Determinar si conviene un solo componente configurable o componentes específicos que compartan piezas más pequeñas. Las interacciones complejas no deberían incorporarse indiscriminadamente a una tarjeta genérica.

### 4.2. `Card` o pieza visual compartida — pendiente de validación

- **Evidencia:** la portada y los perfiles contienen agrupaciones visuales, como las tarjetas de integrantes y los elementos favoritos.
- **Responsabilidad:** si existe una estructura común significativa, ofrecer una base visual para evitar duplicar estilos o marcado.
- **Posibles `props`:** Podrían considerarse `variant`, `children` u opciones de presentación si la comparación de los casos reales las justifica.
- **Variantes:** por ahora, se reconocen como posibles diferencias las tarjetas de integrantes y los elementos favoritos, pero no se da por sentado que deban derivar de una misma tarjeta base.
- **Pendientes:** comparar las estructuras y los estilos de `MemberCard` y `FavoriteItemCard`. Si solo comparten propiedades CSS, reutilizar estilos puede ser suficiente; si comparten estructura y responsabilidad visual, evaluar un componente. No implementar una tarjeta universal solo porque varios elementos tengan forma de caja.

## 5. Datos locales y consulta de información adicional

### 5.1. `RecordList` o lista de registros

- **Evidencia:** requisito de TP2: JSON local con al menos 20 registros relacionados con la propuesta, mostrados dinámicamente.
- **Repetición identificada:** una colección de registros se representa a partir de datos, en lugar de escribir cada elemento manualmente en el JSX.
- **Responsabilidad:** recorrer los registros y presentar cada uno mediante un componente de elemento reutilizable.
- **Posibles `props`:** `items`, `renderItem` o una combinación de datos y componente de presentación, según la arquitectura que se adopte.
- **Variantes:** resultados completos, filtrados o de búsqueda; presentación de estados vacíos.
- **Pendientes:** definir la estructura del JSON y la presentación adecuada para el dominio elegido. Confirmar cómo se combinan búsqueda, filtro y resultados. La lista no debería contener toda la lógica de presentación de cada registro.

### 5.2. `RecordItem`

> Hay que chequear si se puede unificar con 4.1 FavoriteItemCard

- **Evidencia:** requisito de TP2 de mostrar dinámicamente los registros del JSON y permitir consultar información adicional de cada uno.
- **Repetición identificada:** cada registro necesita una presentación inicial y una forma de acceder a información complementaria.
- **Responsabilidad:** mostrar los datos principales de un registro y ofrecer una interacción para consultar sus detalles.
- **Posibles `props`:** `item`, `title` o los campos principales que se definan; también podría recibir un `onToggle` o gestionar el estado de expansión internamente.
- **Variantes:** información complementaria desplegable en línea o acceso a una vista de detalle, según la experiencia elegida.
- **Pendientes:** decidir qué campos aparecen inicialmente y cuáles se muestran como información adicional; elegir entre desplegar detalles en el mismo elemento o navegar a una vista específica. Asegurar que la solución permita consultar los detalles de cada registro, no solo los de algunos.

### 5.3. `RecordDetails` o vista de detalle

- **Evidencia:** criterio de nivel 3 de TP2 para el JSON local: cada registro debe permitir desplegar o consultar información adicional.
- **Repetición identificada:** todos los registros deben ofrecer un mecanismo de consulta de datos complementarios, aunque el formato de presentación pueda variar.
- **Responsabilidad:** presentar los datos adicionales de un registro de forma clara y accesible.
- **Posibles `props`:** `item` o `details`, según la estructura definitiva del JSON.
- **Variantes:** panel desplegable, bloque expandible o vista dedicada al registro.
- **Pendientes:** determinar si será un componente independiente o parte de `RecordItem`; elegir una interacción que permita consultar los detalles de cada elemento y verificar el comportamiento con teclado y tecnologías de asistencia.

### 5.4. `SearchInput`

- **Evidencia:** requisito de TP2 de buscar registros del JSON por texto.
- **Repetición identificada:** el usuario introduce una consulta textual que modifica los resultados presentados.
- **Responsabilidad:** recoger el texto de búsqueda y comunicar el cambio al componente que gestiona los resultados.
- **Posibles `props`:** `value`, `onChange`, `placeholder` y, si hace falta, `label`.
- **Variantes:** texto de ayuda o etiqueta según el contexto.
- **Pendientes:** definir los campos del registro sobre los que se buscará y cómo se combinará la búsqueda con el filtro. El componente no necesita conocer la estructura completa del conjunto de datos.

### 5.5. `FilterSelect`

- **Evidencia:** requisito de TP2 de filtrar los registros por una propiedad.
- **Repetición identificada:** una selección de criterio modifica los registros visibles.
- **Responsabilidad:** permitir seleccionar un valor de filtro y comunicarlo al componente que calcula los resultados.
- **Posibles `props`:** `value`, `options`, `onChange` y `label`.
- **Variantes:** diferentes propiedades o conjuntos de opciones, según el JSON elegido.
- **Pendientes:** definir la propiedad que se filtrará y cómo se representan la opción inicial y la ausencia de resultados. No duplicar el filtrado dentro de cada elemento.

## 6. Bitácora e interacciones

### 6.1. `AccordionItem`

- **Evidencia:** `bitacora.html` contiene `section#contenedor-bitacora`; `bitacora.js` genera entradas con fecha, categoría, título y contenido, y gestiona la expansión con atributos ARIA.
- **Repetición identificada:** cada entrada de la bitácora tiene una estructura repetida y un estado abierto o cerrado.
- **Responsabilidad:** encapsular la presentación y la interacción de una entrada expandible.
- **Posibles `props`:** `date`, `category`, `title`, `children` o `content`, `defaultOpen` y, si se requiere, `onToggle`.
- **Variantes:** categorías como «Bug detectado» y «Bug resuelto», estilos según categoría y estado abierto/cerrado.
- **Pendientes:** definir cómo se gestionará el estado con React y comprobar que la expansión conserve la accesibilidad del comportamiento original.

### 6.2. `StatusMessage`

- **Evidencia:** TP2 requiere gestionar estados de carga y error al consultar la API pública.
- **Repetición identificada:** distintas operaciones pueden necesitar comunicar un resultado, un error, una carga o la ausencia de datos.
- **Responsabilidad:** presentar mensajes de estado con un formato consistente cuando la estructura y la semántica sean realmente compartidas.
- **Posibles `props`:** `type`, `message` y, si corresponde, `onClose`.
- **Variantes:** éxito, error, carga, aviso o ausencia de resultados, sin confundir estados con significados diferentes.
- **Pendientes:** determinar cuáles de estos estados necesitan un componente común y cuáles requieren presentaciones específicas.

### 6.3. Interacciones particulares de los perfiles

- **Evidencia:** `victoria_perfil.js` gestiona pestañas móviles, interacciones táctiles y puntos decorativos; `cande_perfil.js` gestiona tarjetas reversibles y un recomendador aleatorio; `fede_perfil.js` gestiona interacciones con películas y una mini terminal.
- **Repetición identificada:** existen comportamientos interactivos, pero no todos tienen la misma finalidad ni la misma lógica.
- **Responsabilidad:** encapsular cada comportamiento en el componente o módulo que lo necesita, reutilizando piezas compartidas cuando se identifique un patrón real.
- **Posibles `props`:** dependerán del comportamiento concreto; por ejemplo, un elemento interactivo podría recibir contenido, un estado o un manejador de acción.
- **Variantes:** tarjetas con información adicional, recomendación aleatoria, reproducción multimedia, terminal simulada y otras interacciones específicas.
- **Pendientes:** revisar cada comportamiento durante la migración para decidir si pertenece al componente visual, a un componente complementario o a una función reutilizable. No unificar comportamientos solo porque todos respondan a clics o pulsaciones.

La reproducción de audio local de Fede está en revisión por el tamaño que agrega al repositorio. No se considera una decisión definitiva de eliminación ni un requisito para el catálogo.

## 7. Criterios generales para validar los candidatos

Durante la implementación se comprobará:

- Si existe una estructura, un comportamiento o una responsabilidad que se repite realmente.
- Si las diferencias se pueden expresar mediante datos, `props`, composición o variantes sin acumular condiciones difíciles de mantener.
- Si conviene compartir un componente React, reutilizar estilos o mantener componentes específicos.
- Si las interacciones son accesibles y si los componentes reciben únicamente los datos y comportamientos que necesitan.
- Si los componentes previstos cubren los requisitos obligatorios de TP2, especialmente la navegación compartida, los perfiles funcionales, los datos dinámicos y la consulta de información adicional de cada registro.
