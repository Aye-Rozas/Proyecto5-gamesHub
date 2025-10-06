import { obtenerEstadisticas } from "../../../../utils/estadisticasJuego";


export const crearEstadoInicial = () => ({
  puntuacion: obtenerEstadisticas('plaf') || { ganadas: 0, perdidas: 0 },
  countAtrapados: 0,
  stop: true,
  intervalo: null,
});