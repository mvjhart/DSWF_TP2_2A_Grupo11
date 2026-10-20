import { useMemo, useState } from "react";
import bitacora from "../../assets/data/bitacora.json";
import AccordionItem from "../../components/AccordionItem/AccordionItem";
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

function Bitacora() {
  const [tpSeleccionado, setTpSeleccionado] = useState(TP_TODOS);
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState(CATEGORIA_TODAS);
  const [ordenFecha, setOrdenFecha] = useState(ORDEN_ASC);

  const categoriasDisponibles = useMemo(() => {
    const unicas = [...new Set(bitacora.map((entrada) => entrada.categoria))];
    return unicas.sort((a, b) => a.localeCompare(b, "es"));
  }, []);

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
      <h1 id="bitacora-titulo">Bitácora</h1>
      <p className="bitacora__intro">
        Registro del proceso de trabajo del equipo: decisiones, dificultades y
        soluciones, desde TP1 hasta la migración a React en TP2.
      </p>

      <section
        className="bitacora__filtros"
        aria-label="Filtros y orden de la bitácora"
      >
        <label className="bitacora__filtro">
          <span className="bitacora__filtro-label">TP</span>
          <select
            value={tpSeleccionado}
            onChange={(evento) => setTpSeleccionado(evento.target.value)}
          >
            <option value={TP_TODOS}>Todos</option>
            <option value="TP1">TP1</option>
            <option value="TP2">TP2</option>
          </select>
        </label>

        <label className="bitacora__filtro">
          <span className="bitacora__filtro-label">Categoría</span>
          <select
            value={categoriaSeleccionada}
            onChange={(evento) => setCategoriaSeleccionada(evento.target.value)}
          >
            <option value={CATEGORIA_TODAS}>Todas</option>
            {categoriasDisponibles.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </label>

        <label className="bitacora__filtro">
          <span className="bitacora__filtro-label">Orden</span>
          <select
            value={ordenFecha}
            onChange={(evento) => setOrdenFecha(evento.target.value)}
          >
            <option value={ORDEN_ASC}>Más antiguos primero</option>
            <option value={ORDEN_DESC}>Más recientes primero</option>
          </select>
        </label>

        <button
          type="button"
          className="bitacora__restablecer"
          onClick={restablecerTodo}
          disabled={!hayCambios}
        >
          Restablecer
        </button>

        <p className="bitacora__contador" aria-live="polite">
          {entradasFiltradas.length} de {bitacora.length} registro
          {bitacora.length === 1 ? "" : "s"}
        </p>
      </section>

      {entradasFiltradas.length === 0 ? (
        <section className="bitacora__vacia" role="status">
          <p>No hay registros que coincidan con los filtros seleccionados.</p>
          <button type="button" onClick={restablecerTodo}>
            Ver todos los registros
          </button>
        </section>
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
