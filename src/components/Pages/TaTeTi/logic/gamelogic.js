import { WinConditions } from "../constants/winConditions";

export const checkResultado = (tabla, jugador) => {
  for (const [a, b, c] of WinConditions) {
    if (tabla[a] === jugador && tabla[b] === jugador && tabla[c] === jugador) {
      return { win: true, linea: [a, b, c] };
    }
  }
  return { win: false, linea: [] };
};

export const esEmpate = (tabla) => tabla.every((celda) => celda !== null);

export const celdasLibres = (tabla) =>
  tabla.reduce((libres, valor, i) => {
    if (valor === null) libres.push(i);
    return libres;
  }, []);

export const encontrarJugada = (tabla, jugadorActual) => {
  for (const [a, b, c] of WinConditions) {
    const trio = [tabla[a], tabla[b], tabla[c]];
    const celdaI = [a, b, c];

    const cantidadJugador = trio.filter((v) => v === jugadorActual).length;
    const cantidadVacios = trio.filter((v) => v === null).length;

    if (cantidadJugador === 2 && cantidadVacios === 1) {
      return celdaI[trio.findIndex((v) => v === null)];
    }
  }
  return null;
};
