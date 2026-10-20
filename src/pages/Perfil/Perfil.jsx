import { Link, useParams } from "react-router";


// MOMENTANEO- BORRAR LUEGO Y CONECTAR CON JSON
const integrantes = [
  {
    slug: "victoria",
    nombre: "Victoria",
  },
  {
    slug: "candelaria",
    nombre: "Candelaria",
  },
  {
    slug: "federico",
    nombre: "Federico",
  },
  {
    slug: "federico",
    nombre: "Federico",
  }
];

function Perfil() {
  const { slug } = useParams();
  
  const integrante = integrantes.find(
    (integrante) => integrante.slug === slug,
  );

  if (!integrante) {
    return (
      <main>
        <h1>Integrante no encontrado</h1>
        <p>
          No encontramos un perfil para "{slug}".
          Verificá la dirección o volvé a la lista de integrantes.
        </p>

        <Link to="/">Volver al inicio</Link>
      </main>
    );
  }

  return (
    <main>
      <h1>{integrante.nombre}</h1>
      <p>Perfil del integrante seleccionado.</p>

      <Link to="/">Volver al inicio</Link>
    </main>
  );
}

export default Perfil;
