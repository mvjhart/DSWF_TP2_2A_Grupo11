import "./ControlesFil.css";
// Piezas compartidas por Bitácora, Recursos y Api.

// Contenedor de filtros: recibe los controles como `children` y agrega el
// botón "Restablecer" y el contador de resultados.
export function FilterBar({
  ariaLabel,
  children,
  onReset,
  hayCambios,
  contador,
}) {
  return (
    <section className="filter-bar" aria-label={ariaLabel}>
      {children}

      <button
        type="button"
        className="filter-bar__restablecer"
        onClick={onReset}
        disabled={!hayCambios}
      >
        Restablecer
      </button>

      <p className="filter-bar__contador" aria-live="polite">
        {contador}
      </p>
    </section>
  );
}

// options: [{ value, label }]
// todos: opción inicial opcional, ej. { value: "Todos", label: "Todos" }
// onChange recibe directamente el valor elegido (no el evento).
export function FilterSelect({ label, value, onChange, options, todos }) {
  return (
    <label className="filter-select">
      <span className="filter-select__label">{label}</span>
      <select
        value={value}
        onChange={(evento) => onChange(evento.target.value)}
      >
        {todos && <option value={todos.value}>{todos.label}</option>}
        {options.map((opcion) => (
          <option key={opcion.value} value={opcion.value}>
            {opcion.label}
          </option>
        ))}
      </select>
    </label>
  );
}

// onChange recibe directamente el texto (no el evento).
export function SearchInput({
  label = "Buscar",
  value,
  onChange,
  placeholder,
}) {
  return (
    <label className="search-input">
      <span className="search-input__label">{label}</span>
      <input
        type="search"
        value={value}
        onChange={(evento) => onChange(evento.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

// Carga, error, vacío. Reemplaza a `Estado` (Api) y a las secciones
// "vacía" de Bitácora y Recursos.
// accion: { etiqueta, onClick } (opcional), ej. Reintentar o Ver todos.
export function StatusMessage({
  children,
  error = false,
  compacto = false,
  accion,
}) {
  const clases = ["status-message"];
  if (error) clases.push("status-message--error");
  if (compacto) clases.push("status-message--compacto");

  return (
    <div className={clases.join(" ")} role={error ? "alert" : "status"}>
      <p>{children}</p>
      {accion && (
        <button type="button" onClick={accion.onClick}>
          {accion.etiqueta}
        </button>
      )}
    </div>
  );
}
