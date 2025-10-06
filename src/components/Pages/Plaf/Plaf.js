import './Plaf.css';
import { crearEstadoInicial } from './logic/estado';
import { crearBarra, actualizarAtrapa } from './components/barra';
import { crearCiudad } from './components/ciudad';
import {crearPuntuacion,actualizarPuntuacion,} from '../../puntuacion/puntuacion';


let state;
export const initPlaf = () => {
  state = crearEstadoInicial();
  window.initPlaf = initPlaf;

  const divContent = document.querySelector('.content');
  divContent.innerHTML = '';

  divContent.append(crearPuntuacion(state.puntuacion));
  actualizarPuntuacion(state.puntuacion);
  
const barraSet=document.createElement('div'); 
barraSet.className="barraSet";

  const textoAtrapados = document.createElement('h2');
  textoAtrapados.className = 'atrapados';
  textoAtrapados.textContent = `Atrapados: ${state.countAtrapados}`;

  barraSet.append(textoAtrapados, crearBarra(state));
  divContent.append(barraSet, crearCiudad());
  actualizarAtrapa(state.countAtrapados);
};
