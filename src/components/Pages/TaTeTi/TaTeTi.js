import './TaTeTi.css';
import xImg from '../../../assets/x.png';
import oImg from '../../../assets/o.png';
import {
  crearPuntuacion,
  actualizarPuntuacion,
} from '../../puntuacion/puntuacion';
import { mostrarMensaje } from './components/mensaje';
import { crearTablero } from './components/tablero';
import {
  obtenerEstadisticas,
  guardarEstadisticas,
} from '../../../utils/estadisticasJuego';

import { crearEstadoInicial } from './logic/estado';
import {
  checkResultado,
  esEmpate,
  celdasLibres,
  encontrarJugada,
} from './logic/gamelogic';

let puntuacion = obtenerEstadisticas('tateti');
let { tabla, jugador, gameOver } = crearEstadoInicial();

export const initTaTeTi = () => {
  ({ tabla, jugador, gameOver } = crearEstadoInicial());

  const mensajeAnterior = document.querySelector('.mensaje');
  if (mensajeAnterior) mensajeAnterior.remove();

  const divContent = document.querySelector('.content');
  divContent.innerHTML = '';

  divContent.append(crearPuntuacion(puntuacion));
  divContent.append(crearTablero(jugadorVspc));

  actualizarPuntuacion(puntuacion);
};

const jugadorVspc = (index) => {
  if (gameOver) return;
  if (tabla[index] !== null) return;
  if (jugador !== 'X') return;

  tabla[index] = 'X';
  const celda = document.querySelector(`[data-index="${index}"]`);
  const imgX = document.createElement('img');
  imgX.src = xImg;
  celda.append(imgX);

  const resultado = checkResultado(tabla, 'X');
  if (resultado.win) {
    puntuacion.ganadas++;
    guardarEstadisticas('tateti', puntuacion);
    actualizarPuntuacion(puntuacion);
    mostrarMensaje('Ganaste!🥳');
    gameOver = true;
    setTimeout(initTaTeTi, 2000);
    return;
  }
  if (esEmpate(tabla)) {
    puntuacion.empates++;
    guardarEstadisticas('tateti', puntuacion);
    actualizarPuntuacion(puntuacion);
    mostrarMensaje('Empate!😅');
    gameOver = true;
    setTimeout(initTaTeTi, 2000);
    return;
  }
  jugador = 'O';
  setTimeout(turnoPc, 500);
};

const turnoPc = () => {
  if (gameOver || jugador !== 'O') return;

  let index = encontrarJugada(tabla, 'O') ?? encontrarJugada(tabla, 'X');
  if (index === null) {
    const libres = celdasLibres(tabla);
    index = libres[Math.floor(Math.random() * libres.length)];
  }
  tabla[index] = 'O';
  const celda = document.querySelector(`[data-index="${index}"]`);
  const imgO = document.createElement('img');
  imgO.src = oImg;
  celda.append(imgO);

  const resultado = checkResultado(tabla, 'O');
  if (resultado.win) {
    puntuacion.perdidas++;
    guardarEstadisticas('tateti', puntuacion);
    actualizarPuntuacion(puntuacion);
    mostrarMensaje('Perdiste!😥');
    gameOver = true;
    setTimeout(initTaTeTi, 2000);
    return;
  }
  if (esEmpate(tabla)) {
    gameOver = true;
    return;
  }
  jugador = 'X';
};
