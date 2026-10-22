// Los datos que todavía no se cargaron en los JSON empiezan con "PENDIENTE".
// Se usa desde ProfileIdentity, SkillsList, FavoriteItemCard y Perfil para
// decidir si un campo se muestra con su valor real o con un aviso de
// "en construcción".

export function esPendiente(valor) {
  if (typeof valor !== "string") return true;
  const limpio = valor.trim();
  return limpio === "" || limpio.startsWith("PENDIENTE");
}