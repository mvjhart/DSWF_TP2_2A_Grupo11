import { useState, useId } from 'react';
import './InfoTabs.css';

const iconosSeccion = {
  1: (
    <svg className="icon-svg" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  ),
  2: (
    <svg className="icon-svg" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path>
      <path d="M6 6h12"></path>
      <path d="M6 10h12"></path>
    </svg>
  ),
  3: (
    <svg className="icon-svg" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  ),
};

export function InfoTabs({ secciones = [] }) {
  const [activoId, setActivoId] = useState(secciones[0]?.id);
  const baseId = useId();

  if (!secciones.length) return null;

  const tabActiva = secciones.find((tab) => tab.id === activoId) || secciones[0];

  return (
    <section className="info-tabs" aria-labelledby={`${baseId}-heading`}>
      <h2 id={`${baseId}-heading`} className="sr-only">
        Información y detalles
      </h2>

      <div className="info-tabs__nav" role="tablist" aria-label="Secciones de información">
        {secciones.map((tab) => {
          const tabId = `${baseId}-tab-${tab.id}`;
          const panelId = `${baseId}-panel-${tab.id}`;
          const estaActivo = activoId === tab.id;

          return (
            <button
              key={tab.id}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={estaActivo}
              aria-controls={panelId}
              tabIndex={estaActivo ? 0 : -1}
              data-sec={tab.seccion}
              className="info-tabs__btn"
              onClick={() => setActivoId(tab.id)}
            >
              {iconosSeccion[tab.id]}
              <span>{tab.nombre}</span>
            </button>
          );
        })}
      </div>

      <h2 className="info-tabs__title">{tabActiva.titulo}</h2>

      <div className="info-tabs__content">
        {secciones.map((tab) => {
          const tabId = `${baseId}-tab-${tab.id}`;
          const panelId = `${baseId}-panel-${tab.id}`;
          const estaActivo = activoId === tab.id;

          return (
            <div
              key={tab.id}
              id={panelId}
              role="tabpanel"
              aria-labelledby={tabId}
              className="info-tabs__panel"
              hidden={!estaActivo}
            >
              <p>{tab.texto}</p>

              {/* Renderizado dinámico del adjunto si existe */}
              {tab.adjunto && (
                <p>
                  <a href={tab.adjunto.url} target="_blank" rel="noopener noreferrer">
                    {tab.adjunto.nombre}
                  </a>
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}