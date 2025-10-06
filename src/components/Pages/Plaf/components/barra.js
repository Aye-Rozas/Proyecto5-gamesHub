import { iniciarPlaga } from '../logic/plaga';

export const crearBarra = (state) => {
  const barra = document.createElement('div');
  barra.className = 'barra';

  const play = document.createElement('button');
  const pause = document.createElement('button');
  play.textContent = 'PLAY';
  pause.textContent = 'PAUSE';
  play.className = 'btnP';
  pause.className = 'btnP';

  play.addEventListener('click', () => {
    state.stop = false;
    flipBtn(play, pause, state);
    iniciarPlaga(state);
  });

  pause.addEventListener('click', () => {
    state.stop = true;
    flipBtn(play, pause,state);
    if (state.intervalo) {
      clearInterval(state.intervalo);
      state.intervalo=null;
  }});

  flipBtn(play, pause,state);
  barra.append(play, pause);

  return barra;
};

export const actualizarAtrapa = (atrapa) => {
  const texto = document.querySelector('.atrapados');
  if (texto) texto.textContent = `Atrapados: ${atrapa}`;
};

const flipBtn = (play, pause, state) => {
  if (play && pause) {
    if (state.stop) {
      play.classList.add('show');
      pause.classList.remove('show');
    } else {
      pause.classList.add('show');
      play.classList.remove('show');
    }
  }
};
