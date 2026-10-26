import { useState } from "react";
import "./GadgetFederico.css";

export default function GadgetFederico() {
  const [texto, setTexto] = useState("");
  const comando =
    "federico acosta maneiro\n~ estructuración de datos ~\nbuenos aires, argentina";

  const ejecutar = () => {
    setTexto("");
    let i = 0;
    const intervalo = setInterval(() => {
      setTexto(comando.slice(0, i));
      i++;
      if (i > comando.length) clearInterval(intervalo);
    }, 25);
  };

  return (
    <section className="gadget">
      <h2>Terminal</h2>
      <p>Ejecutá un comando y mirá qué responde.</p>
      <button onClick={ejecutar}>Ejecutar whoami</button>
      {texto && (
        <pre
          className="gadget__resultado"
          style={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}
        >
          {texto}
        </pre>
      )}
    </section>
  );
}
