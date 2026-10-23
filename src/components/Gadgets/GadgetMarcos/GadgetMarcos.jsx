import { useState } from "react";
import "./GadgetMarcos.css";

export default function GadgetMarcos() {
  const [diagnostico, setDiagnostico] = useState(false);

  return (
    <section className="gadget">
      <h2>Pruebas de QA</h2>
      <p>Comprobación de las funcionalidades del perfil.</p>
      <button onClick={() => setDiagnostico(true)}>Ejecutar diagnóstico</button>
      {diagnostico && (
        <ul className="gadget__resultado" style={{ listStyle: "none", padding: "1rem" }}>
          <li>✓ Responsive</li>
          <li>✓ Multimedia</li>
          <li>✓ Navegación</li>
          <li>✓ JavaScript</li>
          <li style={{ marginTop: "0.5rem" }}><strong>Diagnóstico finalizado: 5/5 pruebas.</strong></li>
        </ul>
      )}
    </section>
  );
}