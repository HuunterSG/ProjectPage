// Aquí tú decides quién entra y quién no.
// Formato: { usuario: 'lo que sea', pass: 'lo que sea' }

export const ALLOWED_USERS = [
  { user: 'ea_admin', pass: 'matrix2026' },       // Tu acceso maestro
  { user: 'taller_juan', pass: 'juan123' },       // Cliente 1
  { user: 'pintureria_sur', pass: 'color55' },    // Cliente 2
  { user: 'detailer_pro', pass: 'espejo' },       // Cliente 3
];

export function checkCredentials(u: string, p: string) {
  // Buscamos si existe alguien con ese usuario Y esa contraseña
  const found = ALLOWED_USERS.find(
    (account) => account.user.toLowerCase() === u.toLowerCase() && account.pass === p
  );
  return !!found; // Devuelve true si lo encontró, false si no
}