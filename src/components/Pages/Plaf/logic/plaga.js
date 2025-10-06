import ratonImg from '../../../../assets/raton.png';
import { actualizarAtrapa } from '../components/barra';
import { actualizarPuntuacion } from '../../../puntuacion/puntuacion';
import { guardarEstadisticas } from '../../../../utils/estadisticasJuego';
import jaulallenaImg from '../../../../assets/jaulallena.jpeg';
import { crearModal } from '../components/modal';

export const crearPlaga = (state) => {
  const divCity = document.querySelector('.city');
  const width = divCity.offsetWidth;
  const height = divCity.offsetHeight;

  const areaSeguraX = width - 150;
  const areaSeguraY= height - 150;

  const raton = document.createElement('img');
  raton.className = 'raton atrapar';
  raton.style.left = `${Math.random() * (areaSeguraX - 50)}px`;
  raton.style.top = `${Math.random() * (areaSeguraY - 50)}px`;
  raton.style.transform = `rotate(${Math.random() * 360}deg)`;
  raton.src = ratonImg;

  raton.addEventListener('click', (e) => atrapaRaton(e, state));

  divCity.append(raton);
  inspeccion(state);
};

export const atrapaRaton = (e, state) => {
  if (state.stop) return;
  
  const divCity = document.querySelector('.city');
  state.countAtrapados++;
  actualizarAtrapa(state.countAtrapados);

   const offsetX = Math.random() * 60 - 10;
   const offsetY = Math.random() * 60 - 10;

  e.target.classList.remove('atrapar');
  e.target.style.left = `${divCity.offsetWidth - 115 + offsetX}px`;
  e.target.style.top = `${divCity.offsetHeight - 65+ offsetY}px`;
  e.target.style.transform = `scale(0.3) rotate(${Math.random() * 360}deg)`;
  e.target.style.opacity = '0.8';

  if (state.countAtrapados >= 50) {
    crearModal('Ganaste! Has atrapado 50 ratones 🐭🎉');
    if (state.intervalo) clearInterval(state.intervalo);
    state.stop = true;
    state.puntuacion.ganadas++;
    guardarEstadisticas('plaf', state.puntuacion);
    actualizarPuntuacion(state.puntuacion);
    
    const jaula = document.querySelector('.jaula');
    if (jaula) jaula.src = jaulallenaImg;

    setTimeout(() => window.initPlaf(), 1500);
  }
};

const inspeccion = (state) => {
  const poblacionRaton = document.querySelectorAll('.atrapar');
  if (poblacionRaton.length > 50) {
    crearModal('¡La plaga ha ganado!');
    if (state.intervalo) clearInterval(state.intervalo);
    state.stop = true;

    state.puntuacion.perdidas++;
    guardarEstadisticas('plaf', state.puntuacion);
    actualizarPuntuacion(state.puntuacion);

    setTimeout(() => window.initPlaf(), 1500);
  }
};

export const iniciarPlaga = (state) => {
  state.intervalo = setInterval(() => crearPlaga(state), 700);
  setTimeout(() => {
    clearInterval(state.intervalo);
    if (!state.stop) {
      state.intervalo = setInterval(() => crearPlaga(state), 500);
    }
  }, 8000);
};
