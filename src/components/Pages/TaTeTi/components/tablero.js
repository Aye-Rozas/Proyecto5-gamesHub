export  const crearTablero= (onClickCelda)=>{
const tablero = document.createElement('div');
  tablero.className = 'tablero';

  for (let i = 0; i < 9; i++) {
    const celda = document.createElement('div');
    celda.className = 'celda';
    celda.dataset.index = i;
    tablero.append(celda);

    celda.addEventListener('click', () => onClickCelda(i));
  }
return tablero;};
