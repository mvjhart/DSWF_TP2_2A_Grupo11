import "./Footer.css";
import GithubLink from "../GithubLink/GithubLink";
import equipo from "../../assets/data/equipo.json";

function Footer() {
  return (
    <footer className="footer">
      {/* Elemento fantasma a la izquierda para balancear el centro exacto */}
      <div className="footer__spacer"></div>

      {/* Centro: Copyright + GithubLink */}
      <div className="footer__center">
        <span>&copy; 2026 · {equipo.nombre}</span>
        <GithubLink />
      </div>

      {/* Derecha: Institución */}
      <div className="footer__right">
        <span className="institution">{equipo.comision}</span>
      </div>
    </footer>
  );
}

export default Footer;
