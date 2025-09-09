import { Header } from "./src/components/Header/Header.js";
import { footer } from "./src/components/footer/footer.js";


const divApp = document.querySelector("#app");
/*const h1=document.createElement("h1");
h1.textContent=" h1 conecta main";
divApp.append(h1);*/
Header(divApp);
const divContent = document.createElement("div");
divContent.className = "content";
divApp.append(divContent);
divApp.insertAdjacentHTML('beforeend', footer());
