// Tarifario base (Esto luego podría venir de la DB)
const COSTO_ENVIO_NACIONAL = 8500; // Ejemplo Andreani promedio
const COSTO_ENVIO_LOCAL = 0;       // Gratis en MDQ

export function calcularEnvio(cp: string) {
  // Limpiamos el CP de espacios
  const codigoPostal = cp.trim();

  // Lógica Mar del Plata (CP comienza con 7600 o es 7600)
  // A veces los CP tienen letras (B7600), así que buscamos "7600"
  if (codigoPostal.includes('7600')) {
    return {
      costo: COSTO_ENVIO_LOCAL,
      tipo: 'local',
      mensaje: 'Envío Local (Moto/Flete) - Entrega en 24hs o Retiro.',
      demora: 1 // días
    };
  }

  // Lógica Resto del País
  return {
    costo: COSTO_ENVIO_NACIONAL,
    tipo: 'nacional',
    mensaje: 'Envío Nacional (Correo/Expreso) - Embalaje Reforzado.',
    demora: 5 // días
  };
}