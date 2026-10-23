import { Link } from "react-router";
import "./Button.css";

export function Button({
  children,
  to,
  href,
  variant = "primary", // 'primary' | 'secondary' | 'outline'
  className = "",
  baseClass = "btn",
  type = "button",
  ...props
}) {
  const buttonClassName = `${baseClass} ${baseClass}--${variant} ${className}`.trim();

  // Si tiene la prop 'to', renderiza un Link de React Router
  if (to) {
    return (
      <Link to={to} className={buttonClassName} {...props}>
        {children}
      </Link>
    );
  }

  // Si tiene la prop 'href', renderiza una etiqueta <a> clásica
  if (href) {
    return (
      <a href={href} className={buttonClassName} {...props}>
        {children}
      </a>
    );
  }

  // Por defecto renderiza un <button> HTML estándar
  return (
    <button type={type} className={buttonClassName} {...props}>
      {children}
    </button>
  );
}