export const crearPuntuacion = (puntuacion) => {
  const puntuacionDiv = document.createElement('div');
  puntuacionDiv.className = 'puntuacion';
  puntuacionDiv.innerHTML = `
<p>Ganadas: <span id="ganadas">${puntuacion.ganadas}</span></p>
<p>Perdidas: <span id="perdidas">${puntuacion.perdidas}</span></p>
<p>Empates: <span id="empates">${puntuacion.empates}</span></p>
  `;
  
  return puntuacionDiv;
};

export const actualizarPuntuacion = (puntuacion) => {
  document.getElementById('ganadas').textContent = puntuacion.ganadas;
  document.getElementById('perdidas').textContent = puntuacion.perdidas;
  document.getElementById('empates').textContent = puntuacion.empates;
};