import { useState } from "react";
import "./MemberAvatar.css";

// Las imágenes de las personas viven en src/assets/images/<integrante>/.
// El JSON guarda la ruta ("src/assets/images/candelaria/avatar.webp"); acá se
// la traduce a la URL que genera Vite. Si la ruta no existe todavía (por
// ejemplo, mientras dice "PENDIENTE: ..."), no hay coincidencia y se muestran
// las iniciales.
const imagenes = import.meta.glob(
  "/src/assets/images/**/*.{png,jpg,jpeg,webp,avif,svg}",
  { eager: true, query: "?url", import: "default" },
);

function iniciales(nombre) {
  const texto = typeof nombre === "string" ? nombre.trim() : "";
  const palabras = texto.split(/\s+/).filter(Boolean);

  if (palabras.length === 0 || texto.startsWith("PENDIENTE")) return "?";
  if (palabras.length === 1) return palabras[0].charAt(0).toUpperCase();

  return (
    palabras[0].charAt(0) + palabras[palabras.length - 1].charAt(0)
  ).toUpperCase();
}

// Es decorativo: el nombre de la persona siempre se muestra al lado.
function MemberAvatar({
  nombre,
  imagen,
  alt = "",
  tono = "neutro",
  tamano = "m",
}) {
  const [fallo, setFallo] = useState(false);

  const url = typeof imagen === "string" ? imagenes[`/${imagen}`] : undefined;

  return (
    <span className={`member-avatar member-avatar--${tamano}`} data-tono={tono}>
      {url && !fallo ? (
        <img src={url} alt={alt} onError={() => setFallo(true)} />
      ) : (
        <span aria-hidden="true">{iniciales(nombre)}</span>
      )}
    </span>
  );
}

export default MemberAvatar;
