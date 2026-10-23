// src/components/PageHeader/PageHeader.jsx
import "./PageHeader.css";

export function PageHeader({
  title,
  description,
  className = "",
  baseClass = "page-header", // Permite redefinir la clase base
  children,
  ...props // Permite pasar id, data-attributes, onClick, etc.
}) {
  // Limpiamos y combinamos las clases del contenedor principal de forma prolija
  const headerClassName = `${baseClass} ${className}`.trim();

  return (
    <header className={headerClassName} {...props}>
      {title && <h1>{title}</h1>}
      {description && <p>{description}</p>}
      {children}
    </header>
  );
}
