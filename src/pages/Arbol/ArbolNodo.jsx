import { obtenerHijos, normalizarTipo, raiz } from "./arbolUtils.js";
import "./ArbolNodo.css";

function ArbolNodo({
  nodo,
  path,
  parentName,
  expandedIds,
  selectedPath,
  todosAbiertos,
  esModal,
  onSelect,
  onToggle,
}) {
  const children = obtenerHijos(nodo);
  const tieneHijos = children.length > 0;
  const esRaiz = path === raiz.id;
  const estaExpandido = esRaiz || expandedIds.has(path);
  const seleccionado = selectedPath === path;
  const tipo = nodo.type ?? "Sin tipo";
  const claseTipo = normalizarTipo(tipo);

  return (
    <li className="arbol-nodo">
      <div
        className={`arbol-nodo__fila${seleccionado ? " arbol-nodo__fila--seleccionada" : ""}`}
      >
        {tieneHijos ? (
          <button
            className="arbol-nodo__expansor"
            type="button"
            aria-label={
              esRaiz
                ? todosAbiertos
                  ? "Contraer todo el árbol"
                  : "Expandir todo el árbol"
                : estaExpandido
                  ? `Contraer ${nodo.name}`
                  : `Expandir ${nodo.name}`
            }
            aria-expanded={esRaiz ? todosAbiertos : estaExpandido}
            onClick={() => onToggle(path, esRaiz)}
          >
            {esRaiz ? (todosAbiertos ? "−" : "+") : estaExpandido ? "−" : "+"}
          </button>
        ) : (
          <span className="arbol-nodo__espaciador" aria-hidden="true" />
        )}

        <span
          className={`arbol-nodo__punto arbol-nodo__punto--${claseTipo}`}
          aria-hidden="true"
        />

        {/* Con detalles en modal, el botón abre una ventana, no alterna un
            estado: por eso no usa aria-pressed. */}
        <button
          className="arbol-nodo__nombre"
          type="button"
          aria-pressed={esModal ? undefined : seleccionado}
          aria-haspopup={esModal ? "dialog" : undefined}
          aria-current={esModal && seleccionado ? "true" : undefined}
          onClick={() => onSelect({ nodo, path, parentName })}
        >
          {nodo.name ?? "Sin nombre"}
        </button>

        <span className={`arbol-nodo__tipo arbol-nodo__tipo--${claseTipo}`}>
          {tipo}
        </span>
      </div>

      {tieneHijos && estaExpandido && (
        <ul className="arbol-nodo__hijos">
          {children.map((hijo) => {
            const childPath = `${path}/${hijo.id ?? hijo.name}`;

            return (
              <ArbolNodo
                key={childPath}
                nodo={hijo}
                path={childPath}
                parentName={nodo.name}
                expandedIds={expandedIds}
                selectedPath={selectedPath}
                todosAbiertos={todosAbiertos}
                esModal={esModal}
                onSelect={onSelect}
                onToggle={onToggle}
              />
            );
          })}
        </ul>
      )}
    </li>
  );
}

export default ArbolNodo;
