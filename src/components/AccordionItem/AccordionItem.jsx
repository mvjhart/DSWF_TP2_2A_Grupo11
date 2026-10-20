import { useId, useState } from "react";
import "./AccordionItem.css";

function AccordionItem({
  title,
  headerContent,
  children,
  defaultOpen = false,
}) {
  const [abierto, setAbierto] = useState(defaultOpen);

  const idBase = useId();
  const idHeader = `${idBase}-header`;
  const idPanel = `${idBase}-panel`;

  return (
    <article
      className={`accordion-item${abierto ? " accordion-item--abierto" : ""}`}
    >
      <h2 className="accordion-item__titulo-wrapper">
        <button
          type="button"
          className="accordion-item__header"
          id={idHeader}
          aria-expanded={abierto}
          aria-controls={idPanel}
          onClick={() => setAbierto((valor) => !valor)}
        >
          {headerContent && (
            <span className="accordion-item__meta">{headerContent}</span>
          )}
          <span className="accordion-item__titulo">{title}</span>
          <span className="accordion-item__icono" aria-hidden="true">
            {abierto ? "\u2212" : "+"}
          </span>
        </button>
      </h2>
      <div
        className="accordion-item__content"
        id={idPanel}
        role="region"
        aria-labelledby={idHeader}
        aria-hidden={!abierto}
      >
        <div className="accordion-item__inner">{children}</div>
      </div>
    </article>
  );
}

export default AccordionItem;
