# Esquemas de datos JSON

| Archivo                            | Contenido                                   | Se usa en                                                        |
| ---------------------------------- | ------------------------------------------- | ---------------------------------------------------------------- |
| `src/assets/data/integrantes.json` | Un registro por integrante (4)              | Portada (`/`), perfiles (`/integrantes/:slug`) y enlace a GitHub |
| `src/assets/data/favoritos.json`   | Películas y álbumes de cada integrante (40) | Perfiles (destacados) y colección (`/recursos`)                  |

Los dos archivos se relacionan mediante el `slug` del integrante: cada favorito lo referencia en `memberSlug`. Así la información se escribe una sola vez y se reutiliza en la portada, los perfiles y la colección completa.

---

## `integrantes.json`

Un array de objetos, uno por integrante.

| Propiedad     | Tipo                              | Obligatoria | Responsabilidad                                                                                                                               |
| ------------- | --------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `slug`        | `string`                          | Sí          | Identificador único y estable. Se usa como segmento de la ruta (`/integrantes/victoria`) y como referencia desde `favoritos.json`.            |
| `nombre`      | `string`                          | Sí          | Nombre y apellido. Se muestra en la tarjeta de portada y en el encabezado del perfil.                                                         |
| `tag`         | `string`                          | Sí          | Etiqueta **corta** de la tarjeta de portada (por ejemplo, "Bitácora & Navegación").                                                           |
| `descripcion` | `string`                          | Sí          | Presentación breve del integrante para la portada.                                                                                            |
| `rol`         | `string`                          | Sí          | Área de la que es responsable (coordina y revisa el trabajo del área; no implica hacerlo todo). Se muestra en el perfil y alimenta el README. |
| `github`      | `string`                          | Sí          | URL completa del perfil de GitHub del integrante. Se usa en el enlace a GitHub de cada perfil y alimenta el README.                           |
| `ciudad`      | `string`                          | No          | Ubicación para el encabezado del perfil.                                                                                                      |
| `edad`        | `number`                          | No          | Dato personal que cambia con el tiempo; incluirlo solo si el integrante quiere mostrarlo.                                                     |
| `imagen`      | `string`                          | No          | Ruta de la imagen del integrante dentro de `src/assets/images/<integrante>/`. Sin valor, la interfaz usa una imagen por defecto.              |
| `habilidades` | `array` de `{ categoria, items }` | No          | Habilidades agrupadas por categoría. `items` es un array de `string`. Una sola fila de habilidades es un único objeto en el array.            |

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
  "nombre": "Candelaria Chazarreta",
  "ciudad": "Santiago del Estero",
  "edad": 27,
  "imagen": "src/assets/images/candelaria/avatar.webp",
  "habilidades": [
    { "categoria": "Lenguajes", "items": ["JavaScript", "TypeScript", "C#"] },
    { "categoria": "Herramientas", "items": ["Figma", "Git", "GitHub"] }
  ],
  "rol": "Maquetación de la bitácora, enlaces y recorrido entre secciones",
  "tag": "Bitácora & Navegación",
  "descripcion": "Presentación breve para la portada.",
  "github": "https://github.com/kndxt"
}
```

---

## `favoritos.json` (D.2)

Un array de objetos. Cada integrante aporta 5 películas y 5 álbumes (40 registros en total). Cada registro tiene las propiedades comunes y, según su `tipo`, las específicas.

### Propiedades comunes

| Propiedad    | Tipo       | Obligatoria | Responsabilidad                                                                                                 |
| ------------ | ---------- | ----------- | --------------------------------------------------------------------------------------------------------------- |
| `id`         | `string`   | Sí          | Identificador único del registro (`fav-001`, `fav-002`, …). Se usa como `key` al renderizar.                    |
| `memberSlug` | `string`   | Sí          | `slug` del integrante dueño del favorito. Debe existir en `integrantes.json`.                                   |
| `tipo`       | `string`   | Sí          | Determina qué campos específicos tiene el registro y alimenta el filtro. Valores actuales: `album`, `pelicula`. |
| `titulo`     | `string`   | Sí          | Título del favorito. Se muestra y se usa en la búsqueda.                                                        |
| `anio`       | `number`   | No          | Año de lanzamiento.                                                                                             |
| `comentario` | `string`   | No          | Comentario personal. Es parte de la información adicional que se despliega y entra en la búsqueda.              |
| `generos`    | `string[]` | No          | Géneros del favorito. Sirve como propiedad de filtro.                                                           |
| `imagen`     | `string`   | No          | Ruta de la portada o póster dentro de `src/assets/images/<integrante>/`.                                        |
| `featured`   | `boolean`  | No          | `true` si el integrante quiere destacarlo en su perfil. Si falta, se considera `false`.                         |
| `order`      | `number`   | No          | Posición entre los destacados del perfil (1 a 3). Solo tiene sentido con `featured: true`.                      |

### Propiedades específicas por tipo

| Tipo       | Propiedad  | Tipo     | Obligatoria | Responsabilidad                                               |
| ---------- | ---------- | -------- | ----------- | ------------------------------------------------------------- |
| `album`    | `artista`  | `string` | Sí          | Artista o banda. Se muestra y entra en la búsqueda.           |
| `pelicula` | `sinopsis` | `string` | No          | Resumen de la película. Es información adicional desplegable. |

Un registro de un tipo no incluye los campos del otro. Para agregar un tipo nuevo (por ejemplo `serie`) se define su `tipo` y sus propiedades específicas sin modificar los registros existentes.

### Cómo se usan los datos

- **Mostrar:** `titulo`, `tipo`, `anio`, `imagen`, y `artista` en los álbumes.
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
    "comentario": "Uno de mis álbumes favoritos.",
    "generos": ["K-pop"],
    "featured": true,
    "order": 1
  },
  {
    "id": "fav-002",
    "memberSlug": "victoria",
    "tipo": "pelicula",
    "titulo": "Dungeons & Dragons: Honor Among Thieves",
    "anio": 2023,
    "comentario": "Una de mis películas favoritas.",
    "sinopsis": "Una aventura de fantasía basada en el universo de Dungeons & Dragons.",
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

## Datos pendientes

Los textos sin completar se marcan con `PENDIENTE` y los años sin cargar valen `null`. Hasta que se reemplacen, no deben mostrarse en la interfaz.

Para encontrar lo que falta completar, desde la raíz del proyecto en PowerShell:

```powershell
Select-String -Path src/assets/data/*.json -Pattern "PENDIENTE|null"
```

Las propiedades opcionales que un integrante no quiera mostrar (por ejemplo `edad` o `ciudad`) se eliminan del registro en lugar de dejarlas vacías.
