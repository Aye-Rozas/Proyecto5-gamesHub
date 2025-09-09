import './PPT.css';
import piedraImg from './assets/piedra.png';
import papelImg from './assets/papel.png';
import tijerasImg from './assets/tijeras.png';

const opciones = [
  { nombre: 'piedra', img: piedraImg },
  { nombre: 'papel', img: papelImg },
  { nombre: 'tijeras', img: tijerasImg },
];
let puntuacionPPT = JSON.parse(localStorage.getItem('puntuacionPPT')) || {
  ganadas: 0,
  perdidas: 0,
  empates: 0,
};
let gameoverPPT = false;
export const initPPT = () => {
  const divContent = document.querySelector('.content');
  divContent.innerHTML = '';

  const puntuacionDiv = document.createElement('div');
  puntuacionDiv.className = 'puntuacionPPT';
  puntuacionDiv.innerHTML = `
<p>Ganadas: <span id="ganadas">0</span></p>
<p>Perdidas:<span id="perdidas">0</span></p>
<p>Empates: <span id="empates">0</span></p>
  `;
  divContent.append(puntuacionDiv);

  const eleccionPcDiv = document.createElement('div');
  eleccionPcDiv.className = 'eleccionPc';
  divContent.append(eleccionPcDiv);

  const pipati = document.createElement('div');
  pipati.className = 'pipati';

  for (const opcion of opciones) {
    const { nombre, img } = opcion;
    const button = document.createElement('button');
    button.className = 'buttonT';
    button.dataset.eleccion = nombre;

    const imagen = document.createElement('img');
    imagen.className = 'imgT';
    imagen.src = img;

    button.append(imagen);
    button.addEventListener('click', jugador);
    pipati.append(button);
  }

  divContent.append(pipati);
  actualizarPuntuacion();
};

const jugador = (event) => {
  const eleccionJugador = event.currentTarget.dataset.eleccion;
  const eleccionPc = juegaPC(opciones);
  const divContent = document.querySelector('.content');
  const eleccionPcDiv = divContent.querySelector('.eleccionPc');
  eleccionPcDiv.innerHTML = '';

  const imgPc = document.createElement('img');
  imgPc.src = eleccionPc.img;
  imgPc.className = 'imgPc';
  eleccionPcDiv.append(imgPc);
  const texto = document.createElement('p');
  texto.textContent = `La máquina eligió: ${eleccionPc.nombre}`;
  eleccionPcDiv.append(texto);

  if (
    (eleccionJugador === 'piedra' && eleccionPc.nombre === 'tijeras') ||
    (eleccionJugador === 'papel' && eleccionPc.nombre === 'piedra') ||
    (eleccionJugador === 'tijeras' && eleccionPc.nombre === 'papel')
  ) {
    gameoverPPT = true;
    mostrarMsj(`Ganaste! ${eleccionJugador} vence a ${eleccionPc.nombre} 🥳`);
    puntuacionPPT.ganadas++;
    localStorage.setItem('puntuacionPPT', JSON.stringify(puntuacionPPT));
    actualizarPuntuacion();
    setTimeout(initPPT, 2000);
    return;
  }
  if (eleccionJugador === eleccionPc.nombre) {
    gameoverPPT = true;
    mostrarMsj(`Empate! Ambos eligieron ${eleccionJugador} 😅`);
    puntuacionPPT.empates++;
    localStorage.setItem('puntuacionPPT', JSON.stringify(puntuacionPPT));
    actualizarPuntuacion();
    setTimeout(initPPT, 2000);
    return;
  }

  gameoverPPT = false;
  mostrarMsj(`Perdiste! ${eleccionPc.nombre} vence a ${eleccionJugador} 😥`);
  puntuacionPPT.perdidas++;
  localStorage.setItem('puntuacionPPT', JSON.stringify(puntuacionPPT));
  actualizarPuntuacion();
  setTimeout(initPPT, 2000);
};
const juegaPC = (opciones) => {
  const eleccionPc = opciones[Math.floor(Math.random() * opciones.length)];
  return eleccionPc;
};

const mostrarMsj = (texto) => {
  const divContent = document.querySelector('.content');
  const msj = document.createElement('p');
  msj.className = 'msj';
  msj.textContent = texto;
  divContent.prepend(msj);
};

const actualizarPuntuacion = () => {
  document.getElementById('ganadas').textContent = puntuacionPPT.ganadas;
  document.getElementById('perdidas').textContent = puntuacionPPT.perdidas;
  document.getElementById('empates').textContent = puntuacionPPT.empates;
};
