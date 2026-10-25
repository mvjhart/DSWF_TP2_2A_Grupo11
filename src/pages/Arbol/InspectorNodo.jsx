import { useEffect, useRef } from "react";
import { obtenerDatosInspector, normalizarTipo } from "./arbolUtils.js";
import "./InspectorNodo.css";

// Contenido de los detalles. Se comparte entre la tarjeta (escritorio)
// y el modal (poco ancho o poco alto).
function DetalleNodo({ datos, parentName, detallado }) {
  const claseTipo = normalizarTipo(datos.type);

  const hayExtras =
    detallado &&
    (datos.route ||
      datos.hooks.length > 0 ||
      datos.conditional.length > 0 ||
      datos.repeat.length > 0);

  return (
    <>
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

        {hayExtras && (
          <>
            {datos.route && (
              <section
                className="arbol-inspector__seccion"
                aria-labelledby="arbol-inspector-ruta"
              >
                <h3 id="arbol-inspector-ruta">Ruta</h3>
                <ul className="arbol-inspector__lista">
                  <li>
                    <code>{datos.route}</code>
                  </li>
                </ul>
              </section>
            )}

            {datos.hooks.length > 0 && (
              <section
                className="arbol-inspector__seccion"
                aria-labelledby="arbol-inspector-hooks"
              >
                <h3 id="arbol-inspector-hooks">Hooks</h3>
                <ul className="arbol-inspector__detalles">
                  {datos.hooks.map((hook) => (
                    <li key={hook.name}>
                      <code>{hook.name}</code>
                      {hook.description && <span> — {hook.description}</span>}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {datos.conditional.length > 0 && (
              <section
                className="arbol-inspector__seccion"
                aria-labelledby="arbol-inspector-condicion"
              >
                <h3 id="arbol-inspector-condicion">Se muestra si</h3>
                <ul className="arbol-inspector__lista">
                  {datos.conditional.map((condicion) => (
                    <li key={condicion}>
                      <code>{condicion}</code>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {datos.repeat.length > 0 && (
              <section
                className="arbol-inspector__seccion"
                aria-labelledby="arbol-inspector-repeticion"
              >
                <h3 id="arbol-inspector-repeticion">Se repite con</h3>
                <ul className="arbol-inspector__lista">
                  {datos.repeat.map((repeticion) => (
                    <li key={repeticion}>
                      <code>{repeticion}</code>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}
      </div>
    </>
  );
}

function InspectorNodo({ seleccion, modal = false, abierto = false, onCerrar }) {
  const { nodo, parentName } = seleccion;
  const datos = obtenerDatosInspector(nodo);
  const dialogRef = useRef(null);

  // Sincroniza el diálogo nativo con el estado: el navegador se ocupa del
  // foco, de la tecla Escape y de devolver el foco al botón que lo abrió.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (abierto) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [abierto, modal]);

  if (modal) {
    return (
      <dialog
        ref={dialogRef}
        className="arbol-modal"
        aria-labelledby="arbol-inspector-titulo"
        onClose={onCerrar}
        onClick={(evento) => {
          // Un clic sobre el fondo oscuro cierra el modal.
          if (evento.target === dialogRef.current) onCerrar();
        }}
      >
        <div className="arbol-modal__contenido">
          <div className="arbol-modal__barra">
            <span className="arbol-modal__etiqueta">Detalles del nodo</span>
            <button
              type="button"
              className="arbol-modal__cerrar"
              onClick={onCerrar}
              aria-label="Cerrar detalles del nodo"
            >
              <span aria-hidden="true">✕</span>
            </button>
          </div>

          <div className="arbol-modal__cuerpo">
            <DetalleNodo datos={datos} parentName={parentName} detallado />
          </div>
        </div>
      </dialog>
    );
  }

  return (
    <aside className="arbol-inspector" aria-labelledby="arbol-inspector-titulo">
      <DetalleNodo datos={datos} parentName={parentName} />
    </aside>
  );
}

export default InspectorNodo;
