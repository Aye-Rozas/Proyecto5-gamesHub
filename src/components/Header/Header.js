import "./Header.css";
import { initTaTeTi } from "../Pages/TaTeTi/TaTeTi";
import { initPPT } from "../Pages/PPT/PPT";
import { initPlaf } from "../Pages/Plaf/Plaf";
export const Header =(divApp)=>{
  const header=document.createElement("header");
  const buttonTaTeTi=document.createElement("button");
  const buttonPPT=document.createElement("button");
  const buttonPlaf=document.createElement("button");

  buttonTaTeTi.textContent="Ta-Te-Ti";
  buttonPPT.textContent="Piedra Papel o Tijera";
  buttonPlaf.textContent="Plaf";

  buttonTaTeTi.addEventListener("click", initTaTeTi);
  buttonPPT.addEventListener("click", initPPT);
  buttonPlaf.addEventListener("click", initPlaf);

  header.append(buttonTaTeTi);
  header.append(buttonPPT);
  header.append(buttonPlaf);
  divApp.append(header);
}