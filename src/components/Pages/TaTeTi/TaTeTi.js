import './TaTeTi.css';
import xImg from './assets/x.png';
import oImg from './assets/o.png';

let puntuacion = JSON.parse(localStorage.getItem('puntuacion')) || {
  ganadas: 0,
  perdidas: 0,
  empates: 0,
};

export const initTaTeTi = () => {
  tabla = Array(9).fill(null);
  jugador = 'X';
  gameOver = false;

  const mensajeAnterior = document.querySelector('.mensaje');
  if (mensajeAnterior) mensajeAnterior.remove();

  const divContent = document.querySelector('.content');
  divContent.innerHTML = '';

  const puntuacionDiv = document.createElement('div');
  puntuacionDiv.className = 'puntuacion';
  puntuacionDiv.innerHTML = `
<p>Ganadas: <span id="ganadas">0</span></p>
<p>Perdidas:<span id="perdidas">0</span></p>
<p>Empates: <span id="empates">0</span></p>
  `;
  divContent.append(puntuacionDiv);

  const tablero = document.createElement('div');
  tablero.className = 'tablero';

  for (let i = 0; i < 9; i++) {
    const celda = document.createElement('div');
    celda.className = 'celda';
    celda.dataset.index = i;
    tablero.append(celda);

    celda.addEventListener('click', () => jugadorVspc(i));
  }
  divContent.append(tablero);
  actualizarPuntuacion();
};

const Win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let tabla = Array(9).fill(null);
let jugador = 'X';
let gameOver = false;
const jugadorVspc = (index) => {
  if (tabla[index] === null && jugador === 'X' && gameOver === false) {
    tabla[index] = 'X';
    const celda = document.querySelector(`[data-index="${index}"]`);
    const imgX = document.createElement('img');
    imgX.src = xImg;
    celda.append(imgX);
  }
  const resultado = checkResultado('X');
  if (resultado.win) {
    puntuacion.ganadas++;
    localStorage.setItem('puntuacion', JSON.stringify(puntuacion));
    actualizarPuntuacion();
    mostrarMensaje('Ganaste!🥳');
    gameOver = true;
    setTimeout(initTaTeTi, 2000);
    return;
  }
  if (esEmpate()) {
    puntuacion.empates++;
    localStorage.setItem('puntuacion', JSON.stringify(puntuacion));
    actualizarPuntuacion();
    mostrarMensaje('Empate!😅');
    gameOver = true;
    setTimeout(initTaTeTi, 2000);
    return;
  }
  jugador = 'O';
  setTimeout(turnoPc, 500);
};
const checkResultado = (jugador) => {
  for (const [a, b, c] of Win) {
    if (tabla[a] === jugador && tabla[b] === jugador && tabla[c] === jugador) {
      return { win: true, linea: [a, b, c] };
    }
  }
  return { win: false, linea: [] };
};

const esEmpate = () => {
  return tabla.every((celda) => celda !== null);
};

const celdasLibres = () => {
  return tabla.reduce((libres, valor, i) => {
    if (valor === null) libres.push(i);
    return libres;
  }, []);
};

const turnoPc = () => {
  if (gameOver || jugador !== 'O') return;
  let index = encontrarJugada('O');
  if (index === null) {
    index = encontrarJugada('X');
  }
  if (index === null) {
    const libres = celdasLibres();
    index = libres[Math.floor(Math.random() * libres.length)];
  }
  tabla[index] = 'O';
  const celda = document.querySelector(`[data-index="${index}"]`);
  const imgO = document.createElement('img');
  imgO.src = oImg;
  celda.append(imgO);
  const resultado = checkResultado('O');
  if (resultado.win) {
    puntuacion.perdidas++;
    localStorage.setItem('puntuacion', JSON.stringify(puntuacion));
    actualizarPuntuacion();
    mostrarMensaje('Perdiste!😥');
    gameOver = true;
    setTimeout(initTaTeTi, 2000);
    return;
  }
  if (esEmpate()) {
    gameOver = true;
    return;
  }
  jugador = 'X';
};

const mostrarMensaje = (texto) => {
  const divContent = document.querySelector('.content');
  const mensaje = document.createElement('p');
  mensaje.className = 'mensaje';
  mensaje.textContent = texto;
  divContent.prepend(mensaje);
};

const actualizarPuntuacion = () => {
  document.getElementById('ganadas').textContent = puntuacion.ganadas;
  document.getElementById('perdidas').textContent = puntuacion.perdidas;
  document.getElementById('empates').textContent = puntuacion.empates;
};

//cambio logica de turnoPc, le agrego que trate de ganar cumpliendo alguna condicion, que evite que yo gane
const encontrarJugada = (jugadorActual) => {
  for (const [a, b, c] of Win) {
    const trio = [tabla[a], tabla[b], tabla[c]];
    const celdaI = [a, b, c];

    const cantidadJugador = trio.filter((v) => v === jugadorActual).length;
    const cantidadVacios = trio.filter((v) => v === null).length;

    if (cantidadJugador === 2 && cantidadVacios === 1) {
      const indexLibre = celdaI[trio.findIndex((v) => v === null)];
      return indexLibre;
    }
  }
  return null;
};
