
export const obtenerEstadisticas = (nombreJuego) => {
  const guardado = localStorage.getItem(`puntuacion_${nombreJuego}`);
  return guardado ? JSON.parse(guardado) : { ganadas: 0, perdidas: 0, empates: 0 };
};

export const guardarEstadisticas = (nombreJuego, puntuacion) => {
  localStorage.setItem(`puntuacion_${nombreJuego}`, JSON.stringify(puntuacion));
};
