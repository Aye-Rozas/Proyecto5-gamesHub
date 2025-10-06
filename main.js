import { Header } from "./src/components/Header/Header.js";
import { footer } from "./src/components/footer/footer.js";
import portadaImg from "./src/assets/portada.jpeg";


const divApp = document.querySelector("#app");

Header(divApp);
const divContent = document.createElement("div");
divContent.className = "content";
const imgPortada=document.createElement('img');
imgPortada.className="portada";
imgPortada.src=portadaImg; 
divContent.append(imgPortada);
divApp.append(divContent);
divApp.insertAdjacentHTML('beforeend', footer());
