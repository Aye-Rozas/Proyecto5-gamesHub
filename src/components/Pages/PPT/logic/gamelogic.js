export const juegaPC = (opciones) => {
  return opciones[Math.floor(Math.random() * opciones.length)];
};

export const determinarResultado = (jugador, pc) => {
  if (
    (jugador === 'piedra' && pc === 'tijeras') ||
    (jugador === 'papel' && pc === 'piedra') ||
    (jugador === 'tijeras' && pc === 'papel')
  ) return 'win';

  if (jugador === pc) return 'draw';

  return 'lose';
};