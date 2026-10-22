import MemberAvatar from "../MemberAvatar/MemberAvatar";
import { esPendiente } from "../../utils/esPendiente";
import "./ProfileIdentity.css";

function ProfileIdentity({ integrante }) {
  const { nombre, ciudad, edad, imagen, tono, tag, rol, descripcion, github } =
    integrante;

  const tagPendiente = esPendiente(tag);
  const rolPendiente = esPendiente(rol);
  const descripcionPendiente = esPendiente(descripcion);

  return (
    <header className="profile-identity">
      <MemberAvatar
        nombre={nombre}
        imagen={imagen}
        tono={tono ?? "neutro"}
        tamano="l"
      />

      <h1 className="profile-identity__nombre">{nombre}</h1>

      <p className="profile-identity__datos">
        {!esPendiente(ciudad) && <span>{ciudad}</span>}
        {!esPendiente(ciudad) && edad && <span aria-hidden="true"> · </span>}
        {edad && <span>{edad} años</span>}
      </p>

      <div className="profile-identity__tags">
        {tagPendiente ? (
          <span className="profile-identity__tag profile-identity__tag--pendiente">
            Etiqueta en construcción
          </span>
        ) : (
          <span className="profile-identity__tag">{tag}</span>
        )}
      </div>

      <p className="profile-identity__rol">
        {rolPendiente ? (
          <span className="profile-identity__pendiente">
            Responsabilidad en construcción
          </span>
        ) : (
          rol
        )}
      </p>

      <p className="profile-identity__descripcion">
        {descripcionPendiente ? (
          <span className="profile-identity__pendiente">
            Presentación en construcción.
          </span>
        ) : (
          descripcion
        )}
      </p>

      {!esPendiente(github) && (
        <a
          className="profile-identity__github"
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ver el perfil de GitHub de ${nombre}`}
        >
          Ver perfil en GitHub
        </a>
      )}
    </header>
  );
}

export default ProfileIdentity;