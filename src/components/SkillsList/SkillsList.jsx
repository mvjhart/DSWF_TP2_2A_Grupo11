import { esPendiente } from "../../utils/esPendiente";
import "./SkillsList.css";

// Devuelve solo las categorías con al menos un item válido.
function agrupar(habilidades = []) {
  return habilidades
    .map(({ categoria, items }) => ({
      categoria,
      items: (items ?? []).filter((item) => !esPendiente(item)),
    }))
    .filter(
      ({ categoria, items }) => !esPendiente(categoria) && items.length > 0,
    );
}

function SkillsList({ habilidades }) {
  const grupos = agrupar(habilidades);

  return (
    <section className="skills-list" aria-labelledby="skills-list-titulo">
      <h2 id="skills-list-titulo" className="skills-list__titulo">
        Habilidades
      </h2>

      {grupos.length === 0 ? (
        <p className="skills-list__pendiente">Habilidades en construcción.</p>
      ) : (
        <div className="skills-list__grupos">
          {grupos.map(({ categoria, items }) => (
            <div key={categoria} className="skills-list__grupo">
              <h3 className="skills-list__categoria">{categoria}</h3>
              <ul className="skills-list__chips">
                {items.map((item) => (
                  <li key={item} className="skills-list__chip">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default SkillsList;
