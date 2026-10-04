# Contribuir al proyecto

Estas son las pautas generales para contribuir al proyecto y mantener un código y un historial de cambios ordenados.

## Pull Requests

- Todo cambio debe integrarse mediante un Pull Request hacia `main`.
- Asociar el PR con el Issue correspondiente cuando aplique.
- Mantener el PR enfocado en el objetivo de la rama.
- Describir brevemente los cambios realizados y cualquier aspecto relevante para la revisión.

## Verificaciones

Antes de abrir un Pull Request:

- Confirmar que la rama está actualizada con `main`.
- Confirmar que el proyecto compila correctamente.
- Ejecutar ESLint y corregir los errores encontrados.
- Ejecutar Prettier y revisar los cambios de formato.
- Verificar que los cambios no afecten funcionalidades existentes.

Prettier no es un check bloqueante, pero se recomienda ejecutarlo antes de abrir el PR para mantener un formato consistente.

## Conflictos

Los conflictos deben resolverse preferentemente de forma local utilizando VS Code, ya que permite trabajar con mayor contexto y flexibilidad que el editor web de GitHub.

Después de resolver un conflicto, volver a ejecutar las verificaciones correspondientes antes de actualizar el PR.

## Merge

Utilizamos **Squash and merge** como estrategia general para integrar los Pull Requests.

Esto permite mantener `main` con un historial limpio y significativo, donde cada PR integrado representa un cambio del proyecto.
