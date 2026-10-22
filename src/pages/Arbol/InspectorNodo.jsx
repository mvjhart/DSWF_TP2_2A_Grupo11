import { obtenerDatosInspector, normalizarTipo } from "./arbolUtils.js";
import "./InspectorNodo.css";

function InspectorNodo({ seleccion }) {
  const { nodo, parentName } = seleccion;
  const datos = obtenerDatosInspector(nodo);
  const claseTipo = normalizarTipo(datos.type);

  return (
    <aside className="arbol-inspector" aria-labelledby="arbol-inspector-titulo">
      <div className="arbol-inspector__superior">
        <div className="arbol-inspector__identidad">
          <div className="arbol-inspector__encabezado">
            <span
              className={`arbol-inspector__punto arbol-inspector__punto--${claseTipo}`}
              aria-hidden="true"
            />

            <h2 id="arbol-inspector-titulo">{datos.name}</h2>

            <span
              className={`arbol-inspector__tipo arbol-inspector__tipo--${claseTipo}`}
            >
              {datos.type}
            </span>
          </div>

          {datos.file && (
            <code className="arbol-inspector__archivo">{datos.file}</code>
          )}

          <p className="arbol-inspector__descripcion">
            {datos.description || "Sin descripción."}
          </p>
        </div>

        <dl className="arbol-inspector__resumen">
          <div>
            <dt>Padre</dt>
            <dd>{parentName ?? "Ninguno"}</dd>
          </div>

          <div>
            <dt>Hijos</dt>
            <dd>{datos.children.length}</dd>
          </div>
        </dl>
      </div>

      <div className="arbol-inspector__inferior">
        <section
          className="arbol-inspector__seccion"
          aria-labelledby="arbol-inspector-props"
        >
          <h3 id="arbol-inspector-props">Props aceptadas</h3>

          {datos.props.length > 0 ? (
            <ul className="arbol-inspector__lista">
              {datos.props.map((prop, indice) => (
                <li key={typeof prop === "string" ? prop : indice}>
                  <code>
                    {typeof prop === "string"
                      ? prop
                      : (prop.name ?? JSON.stringify(prop))}
                  </code>
                </li>
              ))}
            </ul>
          ) : (
            <p className="arbol-inspector__vacio">Sin props.</p>
          )}
        </section>

        <section
          className="arbol-inspector__seccion"
          aria-labelledby="arbol-inspector-hijos"
        >
          <h3 id="arbol-inspector-hijos">Hijos directos</h3>

          {datos.children.length > 0 ? (
            <ul className="arbol-inspector__lista">
              {datos.children.map((hijo, indice) => (
                <li key={hijo.id ?? `${hijo.name}-${indice}`}>
                  {hijo.name ?? "Sin nombre"}
                </li>
              ))}
            </ul>
          ) : (
            <p className="arbol-inspector__vacio">Sin hijos directos.</p>
          )}
        </section>
      </div>
    </aside>
  );
}

export default InspectorNodo;
