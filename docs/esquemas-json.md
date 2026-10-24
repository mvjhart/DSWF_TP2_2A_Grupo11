# Esquemas de datos JSON

| Archivo                            | Contenido                                   | Se usa en                                                        |
| ---------------------------------- | ------------------------------------------- | ---------------------------------------------------------------- |
| `src/assets/data/integrantes.json` | Un registro por integrante (4)              | Portada (`/`), perfiles (`/integrantes/:slug`) y enlace a GitHub |
| `src/assets/data/favoritos.json`   | Películas y álbumes de cada integrante (40) | Perfiles (destacados) y colección (`/recursos`)                  |

Los dos archivos se relacionan mediante el `slug` del integrante: cada favorito lo referencia en `memberSlug`. Así la información se escribe una sola vez y se reutiliza en la portada, los perfiles y la colección completa.

---

## `integrantes.json`

Un array de objetos, uno por integrante.

| Propiedad     | Tipo                              | Obligatoria | Responsabilidad                                                                                                                                                   |
| ------------- | --------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `slug`        | `string`                          | Sí          | Identificador único y estable. Se usa como segmento de la ruta (`/integrantes/victoria`) y como referencia desde `favoritos.json`.                                |
| `nombre`      | `string`                          | Sí          | Nombre y apellido. Se muestra en la tarjeta de portada y en el encabezado del perfil.                                                                             |
| `tag`         | `string`                          | Sí          | Etiqueta **corta** de la tarjeta de portada (por ejemplo, "Bitácora & Navegación").                                                                               |
| `descripcion` | `string`                          | Sí          | Presentación breve del integrante para la portada.                                                                                                                |
| `rol`         | `string`                          | Sí          | Área de la que es responsable (coordina y revisa el trabajo del área; no implica hacerlo todo). Se muestra en el perfil y alimenta el README.                     |
| `github`      | `string`                          | Sí          | URL completa del perfil de GitHub del integrante. Se usa en el enlace a GitHub de cada perfil y alimenta el README.                                               |
| `ciudad`      | `string`                          | No          | Ubicación para el encabezado del perfil.                                                                                                                          |
| `edad`        | `number`                          | No          | Dato personal que cambia con el tiempo; incluirlo solo si el integrante quiere mostrarlo.                                                                         |
| `tono`        | `string`                          | No          | Color del integrante en el componente `MemberAvatar` (avatar y panel de la portada). Valores: `celeste`, `violeta`, `ambar`, `coral`, `verde`, `rosa` o `neutro`. |
| `imagen`      | `string`                          | No          | Ruta de la imagen del integrante dentro de `src/assets/images/<integrante>/`. Sin valor, el avatar muestra las iniciales sobre el color de `tono`.                |
| `alt`         | `string`                          | No          | Texto alternativo de `imagen`, para lectores de pantalla y para cuando la imagen no carga. Solo aplica si hay `imagen`.                                           |
| `habilidades` | `array` de `{ categoria, items }` | No          | Habilidades agrupadas por categoría. `items` es un array de `string`. Una sola fila de habilidades es un único objeto en el array.                                |

### Reglas del `slug`

- Único dentro del archivo.
- En minúsculas, sin espacios, tildes ni caracteres especiales.
- Estable: no cambia aunque cambie el nombre que se muestra, porque rompería la ruta del perfil y la relación con los favoritos.
- Valores definidos: `victoria`, `candelaria`, `federico`, `marcos`.

### `tag` y `rol`

Ambos describen la responsabilidad, pero con distinta extensión: `tag` es la versión corta para la tarjeta de portada y `rol` es la versión completa para el perfil.

### Ejemplo

```json
{
  "slug": "candelaria",
  "tono": "rosa",
  "nombre": "Candelaria Chazarreta",
  "ciudad": "Santiago del Estero, Argentina",
  "edad": 27,
  "imagen": "../images/candelaria/avatar-candelaria.webp",
  "alt": "Imagen de Candelaria, integrante del equipo de desarrollo del proyecto",
  "habilidades": [
    {
      "categoria": "Lenguajes",
      "items": [
        "HTML5",
        "CSS3",
        "JavaScript",
        "TypeScript",
        "React",
        "Node.js",
        "C#",
        "MySql"
      ]
    },
    {
      "categoria": "Herramientas",
      "items": ["Figma", "Git", "GitHub"]
    }
  ],
  "rol": "Maquetación de la bitácora, enlaces y recorrido entre secciones",
  "tag": "Bitácora & Navegación",
  "descripcion": "PENDIENTE: presentación breve para la portada",
  "github": "https://github.com/kndxt"
}
```

---

## `favoritos.json` (D.2)

Un array de objetos. Cada integrante aporta 5 películas y 5 álbumes (40 registros en total). Cada registro tiene las propiedades comunes y, según su `tipo`, las específicas.

### Propiedades comunes

| Propiedad    | Tipo       | Obligatoria | Responsabilidad                                                                                                           |
| ------------ | ---------- | ----------- | ------------------------------------------------------------------------------------------------------------------------- |
| `id`         | `string`   | Sí          | Identificador único del registro (`fav-001`, `fav-002`, …). Se usa como `key` al renderizar.                              |
| `memberSlug` | `string`   | Sí          | `slug` del integrante dueño del favorito. Debe existir en `integrantes.json`.                                             |
| `tipo`       | `string`   | Sí          | Determina qué campos específicos tiene el registro y alimenta el filtro. Valores actuales: `album`, `pelicula`.           |
| `titulo`     | `string`   | Sí          | Título del favorito. Se muestra y se usa en la búsqueda.                                                                  |
| `anio`       | `number`   | No          | Año de lanzamiento.                                                                                                       |
| `comentario` | `string`   | No          | Comentario personal. Es parte de la información adicional que se despliega y entra en la búsqueda.                        |
| `generos`    | `string[]` | No          | Géneros del favorito. Sirve como propiedad de filtro.                                                                     |
| `portada`    | `string`   | No          | Ruta de la portada o póster dentro de `src/assets/images/<integrante>/`.                                                  |
| `alt`        | `string`   | No          | Texto alternativo de `portada`, para lectores de pantalla y para cuando la imagen no carga. Solo aplica si hay `portada`. |
| `featured`   | `boolean`  | No          | `true` si el integrante quiere destacarlo en su perfil. Si falta, se considera `false`.                                   |
| `order`      | `number`   | No          | Posición entre los destacados del perfil (1 a 3). Solo tiene sentido con `featured: true`.                                |

### Propiedades específicas por tipo

| Tipo       | Propiedad  | Tipo     | Obligatoria | Responsabilidad                                               |
| ---------- | ---------- | -------- | ----------- | ------------------------------------------------------------- |
| `album`    | `artista`  | `string` | Sí          | Artista o banda. Se muestra y entra en la búsqueda.           |
| `pelicula` | `sinopsis` | `string` | No          | Resumen de la película. Es información adicional desplegable. |

Un registro de un tipo no incluye los campos del otro. Para agregar un tipo nuevo (por ejemplo `serie`) se define su `tipo` y sus propiedades específicas sin modificar los registros existentes.

### Cómo se usan los datos

- **Mostrar:** `titulo`, `tipo`, `anio`, `portada` (con su `alt`), y `artista` en los álbumes.
- **Buscar:** por texto sobre `titulo`, `artista`, `comentario` y `sinopsis`.
- **Filtrar:** por `tipo`, `generos` o `memberSlug`.
- **Consultar información adicional:** `comentario`, `sinopsis` y `generos` en el detalle de cada registro.
- **Perfil:** los registros del integrante con `featured: true`, ordenados por `order` (tres por perfil). Los demás aparecen solo en la colección completa de `/recursos`.

### Ejemplo

```json
[
  {
    "id": "fav-001",
    "memberSlug": "victoria",
    "tipo": "album",
    "titulo": "You Never Walk Alone",
    "artista": "BTS",
    "anio": 2017,
    "comentario": "Un viaje lírico hacia el interior de siete artistas.",
    "generos": [
      "Alt Hip-hop",
      "Electro Pop",
      "Tropical House",
      "Pop Ballad",
      "Alt R&B"
    ],
    "portada": "../images/victoria/you-never-walk-alone.webp",
    "alt": "Portada del álbum 'You Never Walk Alone' de BTS",
    "featured": true,
    "order": 1
  },
  {
    "id": "fav-002",
    "memberSlug": "victoria",
    "tipo": "album",
    "titulo": "The Story of Light: Epilogue",
    "artista": "SHINee",
    "anio": 2018,
    "comentario": "Un homenaje a un artista increíble que nos dejó demasiado pronto.",
    "generos": ["Dance Pop", "R&B", "Pop Ballad", "Retro Funk"],
    "portada": "../images/victoria/the-story-of-light-epilogue.webp",
    "alt": "Portada del álbum 'The Story of Light: Epilogue' de SHINee",
    "featured": true,
    "order": 2
  }
]
```

---

## Reglas de integridad

- Los `slug` de `integrantes.json` son únicos.
- Todo integrante tiene `github` con la URL completa de su perfil.
- Los `id` de `favoritos.json` son únicos.
- Todo `memberSlug` coincide con un `slug` existente en `integrantes.json`.
- Cada integrante puede tener hasta tres álbumes y tres películas con `featured: true`, con `order` del 1 al 3 sin repetirse dentro de cada tipo.
- Todo registro de tipo `album` tiene `artista`.
- Si un registro tiene `imagen` (integrantes) o `portada` (favoritos), conviene que tenga también `alt`.
- `tono` solo toma uno de los valores definidos: `celeste`, `violeta`, `ambar`, `coral`, `verde`, `rosa` o `neutro`.
