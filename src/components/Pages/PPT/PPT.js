import './PPT.css';
import { opciones } from './constants/opciones';
import { crearEstadoInicial } from './logic/estado';
import { juegaPC, determinarResultado } from './logic/gamelogic';
import { crearPuntuacion, actualizarPuntuacion } from '../../puntuacion/puntuacion';
import { mostrarMensaje } from './components/mensaje';
import { crearBotones} from './components/botones';
import { guardarEstadisticas, obtenerEstadisticas } from '../../../utils/estadisticasJuego';

let { puntuacion, gameOver } = crearEstadoInicial();
puntuacion = obtenerEstadisticas('ppt');

export const initPPT = () => {
  puntuacion = obtenerEstadisticas('ppt'); 
  gameOver=false;

  const divContent = document.querySelector('.content');
  divContent.innerHTML = '';
divContent.append(crearPuntuacion(puntuacion));

  const eleccionPcDiv = document.createElement('div');
  eleccionPcDiv.className = 'eleccionPc';
  divContent.append(eleccionPcDiv);

  divContent.append(crearBotones(opciones,jugador));

  actualizarPuntuacion(puntuacion);
};

const jugador = (event) => {
  if(gameOver) return;

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

    const resultado = determinarResultado(eleccionJugador, eleccionPc.nombre);

  if (resultado==='win') {
    mostrarMensaje(`Ganaste! ${eleccionJugador} vence a ${eleccionPc.nombre} 🥳`);
    puntuacion.ganadas++;
  }
else  if (resultado=== 'draw') {
    mostrarMensaje(`Empate! Ambos eligieron ${eleccionJugador} 😅`);
    puntuacion.empates++;
  }

else{
  mostrarMensaje(`Perdiste! ${eleccionPc.nombre} vence a ${eleccionJugador} 😥`);
  puntuacion.perdidas++;}

  guardarEstadisticas('ppt',puntuacion);
  actualizarPuntuacion(puntuacion);
  gameOver=true;
  
  setTimeout(initPPT, 2000);
};



