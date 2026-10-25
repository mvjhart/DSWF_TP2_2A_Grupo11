import { useMemo, useState } from "react";
import ArbolNodo from "./ArbolNodo.jsx";
import InspectorNodo from "./InspectorNodo.jsx";
import {
  aplanarArbol,
  normalizarTipo,
  obtenerDatosInspector,
  raiz,
} from "./arbolUtils.js";
import { PageHeader } from "../../components/PageHeader/PageHeader.jsx";
import useMediaQuery from "../../hooks/useMediaQuery.js";
import "./Arbol.css";

// La tarjeta de detalles se convierte en modal solo cuando falta espacio:
// poco ancho (celular vertical) o poco alto (celular horizontal).
// La coma funciona como "o".
const MEDIA_MODAL = "(max-width: 768px), (max-height: 520px)";

// Descripción de cada tipo para la leyenda. Solo se muestran los tipos
// que realmente aparecen en el árbol.
const DESCRIPCION_TIPOS = [
  ["Aplicación", "componente raíz de la aplicación."],
  ["Layout", "componentes que organizan la estructura visual."],
  ["Página", "componentes que representan páginas o vistas."],
  ["Componentes", "componentes reutilizables."],
  ["UI", "elementos de interfaz de usuario."],
  ["Router", "elementos relacionados con el enrutamiento."],
];

function Arbol() {
  const esModal = useMediaQuery(MEDIA_MODAL);
  const [modalAbierto, setModalAbierto] = useState(false);

  // Si cambia el espacio disponible (por ejemplo, al girar el celular),
  // el modal se cierra para no quedar abierto fuera de contexto.
  const [esModalPrevio, setEsModalPrevio] = useState(esModal);

  if (esModalPrevio !== esModal) {
    setEsModalPrevio(esModal);
    setModalAbierto(false);
  }

  const nodos = useMemo(() => aplanarArbol(raiz), []);

  const idsExpandibles = useMemo(
    () =>
      nodos
        .filter(({ children }) => children.length > 0)
        .map(({ path }) => path),
    [nodos],
  );

  const tiposEnUso = useMemo(
    () => new Set(nodos.map(({ nodo }) => obtenerDatosInspector(nodo).type)),
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

  // Selecciona un nodo. Cuando los detalles van en modal, también lo abre
  // (incluso si el nodo ya estaba seleccionado).
  function seleccionar(nuevaSeleccion) {
    setSeleccion(nuevaSeleccion);

    if (esModal) {
      setModalAbierto(true);
    }
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
            {DESCRIPCION_TIPOS.filter(([tipo]) => tiposEnUso.has(tipo)).map(
              ([tipo, descripcion]) => (
                <li key={tipo}>
                  <span
                    className={`arbol-leyenda__item arbol-leyenda__item--${normalizarTipo(tipo)}`}
                  >
                    {tipo}
                  </span>
                  : {descripcion}
                </li>
              ),
            )}
          </ul>

          <section
            className="arbol-visor__estructura"
            aria-labelledby="arbol-estructura-titulo"
            aria-describedby="arbol-arbol-ayuda"
          >
            <h2 id="arbol-estructura-titulo" className="sr-only">
              Estructura
            </h2>

            <p id="arbol-arbol-ayuda" className="arbol-visor__ayuda sr-only">
              Árbol jerárquico de componentes. Seleccioná el nombre de un nodo
              para consultar sus detalles
              {esModal ? ", que se abren en una ventana" : ""}. Los botones más
              y menos permiten expandir o contraer sus ramas. En el nodo raíz,
              App, el botón permite expandir o contraer todas las ramas del
              árbol.
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
                  esModal={esModal}
                  onSelect={seleccionar}
                  onToggle={alternarExpansion}
                />
              </ul>
            </div>
          </section>
        </div>

        <InspectorNodo
          seleccion={seleccion}
          modal={esModal}
          abierto={modalAbierto}
          onCerrar={() => setModalAbierto(false)}
        />
      </div>
    </main>
  );
}

export default Arbol;
