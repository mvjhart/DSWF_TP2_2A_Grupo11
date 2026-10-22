import { useMemo, useState } from "react";
import ArbolNodo from "./ArbolNodo.jsx";
import InspectorNodo from "./InspectorNodo.jsx";
import { aplanarArbol, raiz } from "./arbolUtils.js";
import { PageHeader } from "../../components/PageHeader/PageHeader.jsx";
import "./Arbol.css";

function Arbol() {
  const nodos = useMemo(() => aplanarArbol(raiz), []);

  const idsExpandibles = useMemo(
    () =>
      nodos
        .filter(({ children }) => children.length > 0)
        .map(({ path }) => path),
    [nodos],
  );

  // Al cargar la página, todas las ramas comienzan cerradas.
  const [expandedIds, setExpandedIds] = useState(() => new Set([raiz.id]));

  const [seleccion, setSeleccion] = useState({
    nodo: raiz,
    path: raiz.id,
    parentName: null,
  });

  // App no se cuenta para determinar si todas las ramas internas están abiertas.
  const idsExpandiblesInternos = idsExpandibles.filter((id) => id !== raiz.id);

  const todosAbiertos =
    idsExpandiblesInternos.length > 0 &&
    idsExpandiblesInternos.every((id) => expandedIds.has(id));

  function alternarExpansion(path, esRaiz) {
    if (esRaiz) {
      setExpandedIds(
        todosAbiertos ? new Set([raiz.id]) : new Set(idsExpandibles),
      );
      return;
    }

    setExpandedIds((actuales) => {
      const siguientes = new Set(actuales);

      if (siguientes.has(path)) {
        siguientes.delete(path);
      } else {
        siguientes.add(path);
      }

      return siguientes;
    });
  }

  return (
    <main className="arbol-pagina">
      <div className="arbol-visor">
        <div className="arbol-visor__contenido">
          <PageHeader
            title="Árbol de renderizado"
            description="Explorá la estructura de componentes de React y seleccioná un nodo
              para consultar sus detalles."
          />
          <ul
            className="arbol-leyenda sr-only"
            aria-label="Leyenda de tipos de nodos"
          >
            <li>
              <span className="arbol-leyenda__item arbol-leyenda__item--aplicacion">
                Aplicación
              </span>
              : componente raíz de la aplicación.
            </li>
            <li>
              <span className="arbol-leyenda__item arbol-leyenda__item--componentes">
                Componentes
              </span>
              : componentes reutilizables.
            </li>
            <li>
              <span className="arbol-leyenda__item arbol-leyenda__item--pagina">
                Página
              </span>
              : componentes que representan páginas o vistas.
            </li>
            <li>
              <span className="arbol-leyenda__item arbol-leyenda__item--layout">
                Layout
              </span>
              : componentes que organizan la estructura visual.
            </li>
            <li>
              <span className="arbol-leyenda__item arbol-leyenda__item--ui">
                UI
              </span>
              : elementos de interfaz de usuario.
            </li>
            <li>
              <span className="arbol-leyenda__item arbol-leyenda--router">
                Router
              </span>
              : elementos relacionados con el enrutamiento.
            </li>
          </ul>

          <section
            className="arbol-visor__estructura"
            aria-labelledby="arbol-estructura-titulo"
            aria-describedby="arbol-arbol-ayuda"
          >
            <h2 id="arbol-estructura-titulo" className="sr-only">
              Estructura
            </h2>

            <p className="arbol-visor__ayuda sr-only">
              Árbol jerárquico de componentes. Seleccioná el nombre de un nodo
              para consultar sus detalles. Los botones más y menos permiten
              expandir o contraer sus ramas. En el nodo raíz, App, el botón
              permite expandir o contraer todas las ramas del árbol.
            </p>

            <div className="arbol-visor__desplazamiento">
              <ul className="arbol-lista">
                <ArbolNodo
                  nodo={raiz}
                  path={raiz.id}
                  parentName={null}
                  expandedIds={expandedIds}
                  selectedPath={seleccion.path}
                  todosAbiertos={todosAbiertos}
                  onSelect={setSeleccion}
                  onToggle={alternarExpansion}
                />
              </ul>
            </div>
          </section>
        </div>

        <InspectorNodo seleccion={seleccion} />
      </div>
    </main>
  );
}

export default Arbol;
