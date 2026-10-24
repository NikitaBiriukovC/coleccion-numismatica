import { paises } from './paises';

// Mismo país durante todo el día: la fecha (20261024) es la semilla, no hay azar
export function paisDelDia() {
  const d = new Date();
  const semilla = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  return paises[Math.abs(Math.imul(semilla, 2654435761)) % paises.length];
}
