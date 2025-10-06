import jaulaImg from '../../../../assets/jaula.png';

export const crearJaula = () => {
  const divJaula = document.createElement('div');
  divJaula.className = 'Djaula';

  const jaula = document.createElement('img');
  jaula.className = 'jaula';
  jaula.src = jaulaImg;

  divJaula.append(jaula);
  return divJaula;
};
