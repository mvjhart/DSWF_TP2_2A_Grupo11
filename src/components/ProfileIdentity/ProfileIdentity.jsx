import MemberAvatar from "../MemberAvatar/MemberAvatar";
import { esPendiente } from "../../utils/esPendiente";
import "./ProfileIdentity.css";

function ProfileIdentity({ integrante }) {
  const { nombre, ciudad, edad, imagen, tono, tag, rol, descripcion, github } =
    integrante;

  const mostrarCiudad = !esPendiente(ciudad);
  const mostrarEdad = Number.isInteger(edad);

  return (
    <header className="profile-identity">
      <MemberAvatar
        nombre={nombre}
        imagen={imagen}
        tono={tono ?? "neutro"}
        tamano="l"
      />

      <div className="profile-identity__info">
        <h1 className="profile-identity__nombre">{nombre}</h1>

        {(mostrarCiudad || mostrarEdad) && (
          <p className="profile-identity__datos">
            {mostrarCiudad && <span>{ciudad}</span>}
            {mostrarCiudad && mostrarEdad && (
              <span aria-hidden="true"> · </span>
            )}
            {mostrarEdad && <span>{edad} años</span>}
          </p>
        )}

        <div className="profile-identity__tags">
          {esPendiente(tag) ? (
            <span className="profile-identity__tag profile-identity__tag--pendiente">
              Etiqueta en construcción
            </span>
          ) : (
            <span className="profile-identity__tag">{tag}</span>
          )}
        </div>

        <p className="profile-identity__rol">
          {esPendiente(rol) ? (
            <span className="profile-identity__pendiente">
              Responsabilidad en construcción
            </span>
          ) : (
            rol
          )}
        </p>

        <p className="profile-identity__descripcion">
          {esPendiente(descripcion) ? (
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
            aria-label={`Ver el perfil de GitHub de ${nombre} (se abre en una pestaña nueva)`}
          >
            Ver perfil en GitHub
          </a>
        )}
      </div>
    </header>
  );
}

export default ProfileIdentity;