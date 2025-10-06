import { crearJaula } from './jaula';
import fondoImg from '../../../../assets/fondo.jpg';
export const crearCiudad = () => {
  const divCity = document.createElement('div');
  divCity.className = 'city';
  divCity.style.backgroundImage = `url(${fondoImg})`;
  divCity.style.backgroundSize = 'cover';
  divCity.style.backgroundPosition = 'center';
  divCity.append(crearJaula());
  return divCity;
};
