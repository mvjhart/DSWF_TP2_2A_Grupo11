# Identidad visual

## 1. Concepto visual

La identidad visual del proyecto combina una base **neutra, moderna y tecnológica**, con tonos azul pizarra y un acento turquesa que aporta contraste y personalidad.

La interfaz utiliza variables CSS para centralizar los colores y facilitar su mantenimiento. Se contemplan dos temas, claro y oscuro, que comparten la misma identidad visual, pero adaptan sus superficies, textos y bordes para mantener la legibilidad.

## 2. Paleta de colores

### Colores principales

<table>
  <thead>
    <tr>
      <th>Color</th>
      <th>Muestra</th>
      <th>HEX</th>
      <th>Uso</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Fondo claro</td>
      <td bgcolor="#f9fafb">　</td>
      <td><code>#F3F4F6</code></td>
      <td>Fondo general</td>
    </tr>
    <tr>
      <td>Superficie</td>
      <td bgcolor="#FFFFFF">　</td>
      <td><code>#FFFFFF</code></td>
      <td>Tarjetas y superficies</td>
    </tr>
    <tr>
      <td>Azul pizarra</td>
      <td bgcolor="#334155">　</td>
      <td><code>#334155</code></td>
      <td>Sidebar en tema claro</td>
    </tr>
    <tr>
      <td>Azul pizarra oscuro</td>
      <td bgcolor="#1E293B">　</td>
      <td><code>#1E293B</code></td>
      <td>Footer en tema claro</td>
    </tr>
    <tr>
      <td>Turquesa</td>
      <td bgcolor="#00ADB5">　</td>
      <td><code>#00ADB5</code></td>
      <td>Acentos e interacciones</td>
    </tr>
    <tr>
      <td>Texto principal</td>
      <td bgcolor="#1F2937">　</td>
      <td><code>#1F2937</code></td>
      <td>Texto en tema claro</td>
    </tr>
    <tr>
      <td>Texto claro</td>
      <td bgcolor="#F3F4F6">　</td>
      <td><code>#F3F4F6</code></td>
      <td>Texto en superficies oscuras</td>
    </tr>
  </tbody>
</table>

### Tema oscuro

El tema oscuro conserva una base de grises azulados para reducir el contraste de las superficies sin perder legibilidad.

<table>
  <thead>
    <tr>
      <th>Color</th>
      <th>Muestra</th>
      <th>HEX</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Fondo general</td>
      <td bgcolor="#111827">　</td>
      <td><code>#111827</code></td>
    </tr>
    <tr>
      <td>Superficie</td>
      <td bgcolor="#1F2937">　</td>
      <td><code>#1F2937</code></td>
    </tr>
    <tr>
      <td>Bordes y separadores</td>
      <td bgcolor="#374151">　</td>
      <td><code>#374151</code></td>
    </tr>
    <tr>
      <td>Elementos activos</td>
      <td bgcolor="#4B5563">　</td>
      <td><code>#4B5563</code></td>
    </tr>
    <tr>
      <td>Acento</td>
      <td bgcolor="#00ADB5">　</td>
      <td><code>#00ADB5</code></td>
    </tr>
  </tbody>
</table>

## 3. Justificación de las decisiones

- **Azul pizarra:** aporta una apariencia sobria y tecnológica. Se utiliza en la barra lateral para diferenciar la navegación del contenido principal.
- **Footer más oscuro:** establece una separación visual con la Sidebar y el resto de la página, sin introducir una nueva familia de colores.
- **Turquesa como acento:** se conserva `#00ADB5` porque contrasta con los tonos azulados y aporta personalidad. Se utiliza para destacar interacciones y elementos relevantes, sin reemplazar los colores estructurales.
- **Neutros claros y oscuros:** permiten diferenciar fondos, superficies, textos y estados de navegación sin recargar la interfaz.
- **Colores de etiquetas:** se emplean variantes de celeste, violeta, ámbar, coral, verde, rosa y neutro para distinguir categorías mediante fondos suaves y textos contrastantes.

La paleta busca un equilibrio entre consistencia, legibilidad y diferenciación. No todos los componentes necesitan destacar: el acento se reserva para los elementos que se benefician de una mayor atención visual.

## 4. Organización de los tokens CSS

Los colores se centralizan en las variables personalizadas definidas en los estilos globales.

| Grupo                                         | Responsabilidad                     |
| --------------------------------------------- | ----------------------------------- |
| `--color-fondo`, `--color-superficie`         | Fondos generales y superficies      |
| `--color-texto`, `--color-borde`              | Textos y separadores                |
| `--color-hover`, `--color-activo`             | Estados de interacción              |
| `--color-acento`                              | Color de énfasis                    |
| `--color-sidebar-*`                           | Apariencia de la navegación lateral |
| `--color-footer-*`                            | Apariencia del pie de página        |
| `--color-theme-toggle-*`                      | Apariencia del selector de tema     |
| `--color-github-link-*`                       | Apariencia del enlace de GitHub     |
| `--color-tag-*-fondo` y `--color-tag-*-texto` | Colores de las etiquetas            |

Los tokens específicos permiten personalizar un componente sin modificar innecesariamente los estilos del resto de la aplicación.
