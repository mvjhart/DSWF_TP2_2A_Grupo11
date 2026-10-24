import { useMemo, useState } from "react";
import bitacora from "../../assets/data/bitacora.json";
import AccordionItem from "../../components/AccordionItem/AccordionItem";
import {
  FilterBar,
  FilterSelect,
  StatusMessage,
} from "../../components/ControlesFil/ControlesFil";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import "./Bitacora.css";

const coloresPorCategoria = {
  Estructura: "celeste",
  Organización: "celeste",
  Diseño: "violeta",
  Bitácora: "violeta",
  Navegación: "ambar",
  Documentación: "ambar",
  "Bug detectado": "coral",
  Dificultades: "coral",
  "Bug resuelto": "verde",
  Soluciones: "verde",
  Accesibilidad: "rosa",
  Migración: "rosa",
  Mantenimiento: "neutro",
};

function colorDeCategoria(categoria) {
  return coloresPorCategoria[categoria] ?? "neutro";
}

const formateadorFecha = new Intl.DateTimeFormat("es-AR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function formatearFecha(fechaISO) {
  const fecha = new Date(`${fechaISO}T00:00:00`);
  return formateadorFecha.format(fecha);
}

const TP_TODOS = "Todos";
const CATEGORIA_TODAS = "Todas";
const ORDEN_ASC = "asc";
const ORDEN_DESC = "desc";

const OPCIONES_TP = [
  { value: "TP1", label: "TP1" },
  { value: "TP2", label: "TP2" },
];

const OPCIONES_ORDEN = [
  { value: ORDEN_ASC, label: "Más antiguos primero" },
  { value: ORDEN_DESC, label: "Más recientes primero" },
];

function Bitacora() {
  const [tpSeleccionado, setTpSeleccionado] = useState(TP_TODOS);
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState(CATEGORIA_TODAS);
  const [ordenFecha, setOrdenFecha] = useState(ORDEN_ASC);

  const categoriasDisponibles = useMemo(() => {
    const unicas = [...new Set(bitacora.map((entrada) => entrada.categoria))];
    return unicas.sort((a, b) => a.localeCompare(b, "es"));
  }, []);

  const opcionesCategoria = useMemo(
    () =>
      categoriasDisponibles.map((categoria) => ({
        value: categoria,
        label: categoria,
      })),
    [categoriasDisponibles],
  );

  const entradasFiltradas = useMemo(() => {
    return bitacora
      .filter((entrada) => {
        const coincideTp =
          tpSeleccionado === TP_TODOS || entrada.tp === tpSeleccionado;
        const coincideCategoria =
          categoriaSeleccionada === CATEGORIA_TODAS ||
          entrada.categoria === categoriaSeleccionada;
        return coincideTp && coincideCategoria;
      })
      .sort((a, b) => {
        const comparacion = a.fecha.localeCompare(b.fecha);
        return ordenFecha === ORDEN_ASC ? comparacion : -comparacion;
      });
  }, [tpSeleccionado, categoriaSeleccionada, ordenFecha]);

  function restablecerTodo() {
    setTpSeleccionado(TP_TODOS);
    setCategoriaSeleccionada(CATEGORIA_TODAS);
    setOrdenFecha(ORDEN_ASC);
  }

  const hayCambios =
    tpSeleccionado !== TP_TODOS ||
    categoriaSeleccionada !== CATEGORIA_TODAS ||
    ordenFecha !== ORDEN_ASC;

  return (
    <main className="bitacora" aria-labelledby="bitacora-titulo">
      <PageHeader
        title="Bitácora"
        description="Registro del proceso de trabajo del equipo: decisiones, dificultades y
        soluciones, desde TP1 hasta la migración a React en TP2."
      />

      <FilterBar
        ariaLabel="Filtros y orden de la bitácora"
        onReset={restablecerTodo}
        hayCambios={hayCambios}
        contador={`${entradasFiltradas.length} de ${bitacora.length} registro${bitacora.length === 1 ? "" : "s"}`}
      >
        <FilterSelect
          label="TP"
          value={tpSeleccionado}
          onChange={setTpSeleccionado}
          todos={{ value: TP_TODOS, label: "Todos" }}
          options={OPCIONES_TP}
        />
        <FilterSelect
          label="Categoría"
          value={categoriaSeleccionada}
          onChange={setCategoriaSeleccionada}
          todos={{ value: CATEGORIA_TODAS, label: "Todas" }}
          options={opcionesCategoria}
        />
        <FilterSelect
          label="Orden"
          value={ordenFecha}
          onChange={setOrdenFecha}
          options={OPCIONES_ORDEN}
        />
      </FilterBar>

      {entradasFiltradas.length === 0 ? (
        <StatusMessage
          accion={{
            etiqueta: "Ver todos los registros",
            onClick: restablecerTodo,
          }}
        >
          No hay registros que coincidan con los filtros seleccionados.
        </StatusMessage>
      ) : (
        <div className="bitacora__lista">
          {entradasFiltradas.map((entrada) => (
            <AccordionItem
              key={entrada.id}
              title={entrada.titulo}
              headerContent={
                <>
                  <span className="bitacora__fecha">
                    {formatearFecha(entrada.fecha)}
                  </span>
                  <span
                    className={`bitacora__tag bitacora__tag--${colorDeCategoria(entrada.categoria)}`}
                  >
                    {entrada.categoria}
                  </span>
                  <span className="bitacora__tp">{entrada.tp}</span>
                </>
              }
            >
              <p className="bitacora__texto">{entrada.texto}</p>
            </AccordionItem>
          ))}
        </div>
      )}
    </main>
  );
}

export default Bitacora;
