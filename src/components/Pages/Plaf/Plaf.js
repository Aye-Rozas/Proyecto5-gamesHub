import './Plaf.css';
import fondo from './assets/fondo.jpg';
import ratonImg from './assets/raton.png';
import jaulaImg from './assets/jaula.png';
import jaulallenaImg from './assets/jaulallena.jpeg';

let puntuacionPlaf = JSON.parse(localStorage.getItem('puntuacionPlaf')) || {
  ganadas: 0,
  perdidas: 0,
};
let countAtrapados = 0;
let stop = true;
let intervalo;

export const initPlaf = () => {
  countAtrapados = 0;
  const divContent = document.querySelector('.content');
  divContent.innerHTML = '';

  const barraSet=document.createElement('div');
  barraSet.className="barra";

  const puntosDiv = document.createElement('div');
  puntosDiv.className = 'puntuacionPlaf';
  puntosDiv.innerHTML = `
  <p>Ganadas: <span id="ganadas">0</span></p>
  <p>Perdidas:<span id="perdidas">0</span></p>
  `;

  const divCity = document.createElement('div');
  divCity.style.backgroundImage = `url(${fondo})`;
  divCity.style.backgroundSize = 'cover';
  divCity.style.backgroundPosition = 'center';
  divCity.className = 'city';

  const jaula = document.createElement('img');
  const textoAtrapados = document.createElement('h2');
  const play = document.createElement('button');
  const pause = document.createElement('button');

  textoAtrapados.className = 'atrapados';
  textoAtrapados.textContent = `Atrapados: ${countAtrapados}`;
  jaula.className = 'jaula';
  jaula.src = jaulaImg;
  play.textContent = 'PLAY';
  pause.textContent = 'PAUSE';
  play.className = 'btnP';
  pause.className = 'btnP';

  play.addEventListener('click', () => {
    stop = !stop;
    flipBtn(play, pause);
    if (!stop) iniciarPlaga();
  });
  pause.addEventListener('click', () => {
    stop = !stop;
    flipBtn(play, pause);
    if (intervalo) clearInterval(intervalo);
  });
  flipBtn(play, pause);
  //divContent.append(play);
  //divContent.append(pause);
  barraSet.append(puntosDiv);
  barraSet.append(play);
  barraSet.append(pause);
  divContent.append(barraSet);
  divCity.append(jaula);
  divContent.append(textoAtrapados);
  divContent.append(divCity);
};

const crearPlaga = () => {
  const divCity = document.querySelector('.city');
  const width = divCity.offsetWidth;
  const height = divCity.offsetHeight;

  const raton = document.createElement('img');
  raton.className = 'raton';
  raton.style.left = `${Math.random() * (width - 50)}px`;
  raton.style.top = `${Math.random() * (height - 50)}px`;
  raton.style.transform = `rotate(${Math.random() * 360}deg)`;
  raton.classList.add('atrapar');

  raton.addEventListener('click', (e) => atrapaRaton(e));

  raton.src = ratonImg;

  divCity.append(raton);
  inspeccion();
};

const atrapaRaton = (e) => {
  const divCity = document.querySelector('.city');
  countAtrapados++;
  actualizarAtrapa(countAtrapados);
  e.target.classList.remove('atrapar');
  const offsetX = Math.random() * 40;
  const offsetY = Math.random() * 40;

  const targetX = divCity.offsetWidth - 115 + offsetX;
  const targetY = divCity.offsetHeight - 65 + offsetY; 

  e.target.style.left = `${targetX}px`;
  e.target.style.top = `${targetY}px`;
  e.target.style.transform = 'scale(0.7)';
  e.target.style.opacity = '0.8';
  
  if (countAtrapados >= 50) {
  alert('Ganaste! Has atrapado 50 ratones 🐭🎉');
  if (intervalo) clearInterval(intervalo);
  stop = true;
  puntuacionPlaf.ganadas++;
  localStorage.setItem('puntuacionPlaf', JSON.stringify(puntuacionPlaf));
  actualizarPuntuacion();
  flipBtn(
    document.querySelector('.btnP:nth-of-type(1)'),
    document.querySelector('.btnP:nth-of-type(2)')
  );
 const jaula = document.querySelector('.jaula');
  jaula.src =jaulallenaImg;

  setTimeout(() => {
    initPlaf();
  }, 1500); 

};}

const actualizarAtrapa = (atrapa) => {
  const texto = document.querySelector('.atrapados');
  texto.textContent = `Atrapados: ${atrapa}`;
};

const inspeccion = () => {
  const poblacionRaton = document.querySelectorAll('.atrapar');

  if (poblacionRaton.length > 50) {
    alert('LA PLAGA DE RATONES HA GANADO!');
    if (intervalo) clearInterval(intervalo);
    stop = true;
    puntuacionPlaf.perdidas++;
    localStorage.setItem('puntuacionPlaf', JSON.stringify(puntuacionPlaf));
    actualizarPuntuacion();
    flipBtn(
      document.querySelector('.btnP:nth-of-type(1)'),
      document.querySelector('.btnP:nth-of-type(2)'),
    );
    setTimeout(() => {
  initPlaf();
}, 1500);
  }
};

const iniciarPlaga = () => {
  intervalo = setInterval(() => {
    crearPlaga();
  },700);

  setTimeout(() => {
    clearInterval(intervalo);
    if (!stop) {
      intervalo = setInterval(() => {
        crearPlaga();
      }, 500);
    }
  }, 8000);
};

const actualizarPuntuacion = () => {
  document.getElementById('ganadas').textContent = puntuacionPlaf.ganadas;
  document.getElementById('perdidas').textContent = puntuacionPlaf.perdidas;
};
const flipBtn = (play, pause) => {
  if (stop) {
    play.classList.add('show');
    pause.classList.remove('show');
  } else {
    pause.classList.add('show');
    play.classList.remove('show');
  }
};
