import datosArbol from "../../assets/data/arbol.json";

const { components: definiciones, tree: raiz } = datosArbol;

// Convierte un valor opcional (texto o lista de textos) en una lista.
function aLista(valor) {
  if (valor === undefined || valor === null || valor === "") return [];
  return Array.isArray(valor) ? valor : [valor];
}

// Resuelve los hijos de un nodo, incluidas las definiciones reutilizables.
export function obtenerHijos(nodo) {
  if (nodo.children?.length > 0) {
    return nodo.children;
  }

  if (nodo.componentRef) {
    return definiciones[nodo.componentRef]?.children ?? [];
  }

  return nodo.children ?? [];
}

// Obtiene los datos que se mostrarán en el inspector.
export function obtenerDatosInspector(nodo) {
  const definicion = nodo.componentRef ? definiciones[nodo.componentRef] : null;

  return {
    name: nodo.name ?? definicion?.name ?? "Sin nombre",
    type: nodo.type ?? definicion?.type ?? "Sin tipo",
    file: nodo.file ?? definicion?.file ?? "",
    description: nodo.description ?? definicion?.description ?? "",
    props: nodo.props ?? definicion?.props ?? [],
    children: obtenerHijos(nodo),
    // Datos extra que solo muestra el modal.
    hooks: nodo.hooks ?? definicion?.hooks ?? [],
    route: nodo.route ?? "",
    conditional: aLista(nodo.conditional),
    repeat: aLista(nodo.repeat),
  };
}

// Genera identificadores únicos por recorrido, incluso para componentes
// reutilizados en distintas partes del árbol.
export function aplanarArbol(nodo, parentName = null, path = nodo.id) {
  const children = obtenerHijos(nodo);

  const actual = {
    nodo,
    path,
    parentName,
    children,
  };

  return [
    actual,
    ...children.flatMap((hijo) =>
      aplanarArbol(hijo, nodo.name, `${path}/${hijo.id ?? hijo.name}`),
    ),
  ];
}

// Normaliza el tipo para utilizarlo en las clases CSS.
export function normalizarTipo(tipo) {
  return tipo
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-");
}

export { raiz };
