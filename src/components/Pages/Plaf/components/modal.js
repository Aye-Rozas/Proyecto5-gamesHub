import './modal.css';
export const crearModal =(mensaje) =>{
const container= document.createElement('div');
container.className='containerModal';

const modal=document.createElement('div');
modal.className='modal';

const texto =document.createElement('p');
texto.textContent=mensaje;

const btnCerrar=document.createElement('button');
btnCerrar.textContent='Cerrar';
btnCerrar.className='btnModal';

btnCerrar.addEventListener('click', ()=>{
  container.remove();
})
modal.appendChild(texto);
modal.appendChild(btnCerrar);
container.appendChild(modal);

document.body.appendChild(container);

}
