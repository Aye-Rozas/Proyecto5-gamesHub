export const crearBotones = (opciones, onClick) => {
  const pipati = document.createElement('div');
  pipati.className = 'pipati';

  for (const { nombre, img } of opciones) {
    const button = document.createElement('button');
    button.className = 'buttonT';
    button.dataset.eleccion = nombre;

    const imagen = document.createElement('img');
    imagen.className = 'imgT';
    imagen.src = img;

    button.append(imagen);
    button.addEventListener('click', onClick);
    pipati.append(button);
  }

  return pipati;
};
