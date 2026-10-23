import { PageHeader } from "../../components/PageHeader/PageHeader";
import { Button } from "../../components/Button/Button";
import "./NotFound.css";

export function NotFound({
  badge = "Error 404",
  title = "Página no encontrada",
  description = "Lo sentimos, la ruta que estás buscando no existe o ha sido movida.",
  buttonText = "Volver al inicio",
  buttonTo = "/",
  code = "404"
}) {
  return (
    <main className="not-found">
      <div className="not-found__bg-code" aria-hidden="true">
        {code}
      </div>

      <div className="not-found__content">
        <span className="not-found__badge">{badge}</span>
        
        <PageHeader 
          title={title} 
          description={description}
          className="not-found__header"
        />

        <div className="not-found__actions">
          <Button to={buttonTo}>
            {buttonText}
          </Button>
        </div>
      </div>
    </main>
  );
}

export default NotFound;