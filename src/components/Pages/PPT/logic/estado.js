export const crearEstadoInicial = () => {
  return {
    puntuacion: { ganadas: 0, perdidas: 0, empates: 0 },
    gameOver: false,
  };
};