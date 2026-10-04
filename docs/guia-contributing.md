# Flujo de trabajo con Git

Guía práctica para trabajar con ramas, Pull Requests y merges en el proyecto.

## Índice

1. [Ramas](#ramas)
   - [Convención de nombres](#convención-de-nombres)
2. [Crear una rama](#crear-una-rama)
3. [Trabajar en la rama](#trabajar-en-la-rama)
4. [Mantener la rama actualizada](#mantener-la-rama-actualizada)
5. [Pull Request y merge](#pull-request-y-merge)
6. [Eliminar la rama](#eliminar-la-rama)
7. [¿Por qué eliminamos las ramas?](#por-qué-eliminamos-las-ramas)

## Ramas

Trabajamos con una rama `main` como rama principal y creamos una rama independiente para cada funcionalidad, corrección o tarea.

Una vez integrado un cambio, la rama se elimina.

### Convención de nombres

Utilizamos una convención basada en los mismos tipos definidos para los commits:

```text
tipo/nombre-del-cambio
```

Tipos principales:

- `feat/` — nueva funcionalidad.
- `fix/` — corrección de un error.
- `docs/` — documentación.
- `chore/` — tareas de mantenimiento, configuración u organización.
- `refactor/` — reestructuración del código sin modificar su comportamiento.

Ejemplos:

```text
feat/configurar-react-router
chore/estructura-base
docs/agregar-convenciones
fix/error-navegacion-mobile
refactor/organizar-componentes
```

Los nombres deben ser breves, descriptivos y escritos en minúsculas utilizando guiones.

## Crear una rama

Antes de crear una rama nueva, actualizar `main`:

```bash
git switch main
git pull
```

Crear la rama a partir del estado actualizado:

```bash
git switch -c feat/nombre-de-la-funcionalidad
```

## Trabajar en la rama

Realizar los cambios y crear commits siguiendo la convención del proyecto:

```bash
git add .
git commit -m "feat: agregar nueva funcionalidad"
```

Publicar la rama en GitHub:

```bash
git push -u origin feat/nombre-de-la-funcionalidad
```

Para los siguientes cambios:

```bash
git add .
git commit -m "feat: continuar implementacion"
git push
```

## Mantener la rama actualizada

Si `main` recibió cambios mientras se trabaja en la rama, actualizarla antes de abrir el Pull Request.

Desde la rama de trabajo:

```bash
git fetch origin
git merge origin/main
```

`git fetch` obtiene la información más reciente del repositorio remoto sin modificar la rama actual. Luego, `git merge origin/main` incorpora los cambios de `main` a la rama de trabajo.

Si aparecen conflictos, resolverlos localmente desde VS Code.

Después de resolverlos:

```bash
git add .
git commit
git push
```

La rama queda así actualizada con el estado más reciente de `main`, sin necesidad de cambiar temporalmente a la rama `main`.

## Pull Request y merge

Una vez terminada la tarea:

1. Confirmar que la rama está actualizada con `main`.
2. Ejecutar las verificaciones indicadas en [`CONTRIBUTING.md`](../CONTRIBUTING.md).
3. Hacer `push` de los últimos cambios.
4. Crear el Pull Request hacia `main`.
5. Asociar el Pull Request con su Issue cuando corresponda.
6. Esperar los checks automáticos.
7. Integrar el PR mediante **Squash and merge**.

El flujo esperado es:

```text
main
  │
  └── feat/nueva-funcionalidad
          │
          ├── cambios
          ├── commits
          │
          └── Pull Request
                    │
                    ├── revisión
                    ├── checks
                    │
                    └── Squash and merge → main
```

## Eliminar la rama

Una vez integrado el Pull Request, si la rama ya no es necesaria.

Primero actualizar `main`:

```bash
git switch main
git pull
```

Eliminar la rama local:

```bash
git branch -d feat/nombre-de-la-funcionalidad
```

La rama remota puede eliminarse desde GitHub después del merge o manualmente:

```bash
git push origin --delete feat/nombre-de-la-funcionalidad
```

## ¿Por qué eliminamos las ramas?

Eliminar una rama una vez integrado su cambio permite:

- mantener el repositorio limpio;
- evitar ramas obsoletas;
- reducir confusiones sobre qué ramas siguen activas;
- facilitar la identificación de cambios actualmente en desarrollo.

El historial del desarrollo permanece disponible en el Pull Request y el cambio integrado queda registrado en `main`.
