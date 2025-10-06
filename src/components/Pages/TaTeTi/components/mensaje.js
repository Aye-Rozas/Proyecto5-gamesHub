export const mostrarMensaje = (texto) => {
  const divContent = document.querySelector('.content');
  const mensaje = document.createElement('p');
  mensaje.className = 'mensaje';
  mensaje.textContent = texto;
  divContent.prepend(mensaje);
};
