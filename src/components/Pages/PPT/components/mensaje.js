export const mostrarMensaje = (texto) => {
  const divContent = document.querySelector('.content');
  const msj = document.createElement('p');
  msj.className = 'msj';
  msj.textContent = texto;
  divContent.prepend(msj);
};