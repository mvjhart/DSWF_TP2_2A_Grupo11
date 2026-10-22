import { Link, useParams } from "react-router";
import integrantes from "../../assets/data/integrantes.json";
import ProfileIdentity from "../../components/ProfileIdentity/ProfileIdentity";
import SkillsList from "../../components/SkillsList/SkillsList";
import "./Perfil.css";

function Perfil() {
  const { slug } = useParams();

  const integrante = integrantes.find((i) => i.slug === slug);

  if (!integrante) {
    return (
      <main className="perfil perfil--no-encontrado">
        <h1>Integrante no encontrado</h1>
        <p>
          No encontramos un perfil para &quot;{slug}&quot;. Verificá la
          dirección o volvé a la lista de integrantes.
        </p>

        <Link to="/" className="perfil__volver">
          ← Volver al inicio
        </Link>
      </main>
    );
  }

  return (
    <main className="perfil" data-tono={integrante.tono ?? "neutro"}>
      <Link to="/" className="perfil__volver">
        ← Volver al inicio
      </Link>

      <ProfileIdentity integrante={integrante} />
      
      <SkillsList habilidades={integrante.habilidades} />
    </main>
  );
}

export default Perfil;
