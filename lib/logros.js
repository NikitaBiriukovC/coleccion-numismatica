import { paises, CONTINENTES, stats } from './paises';

// f recibe el resumen y devuelve [progreso actual, objetivo]
export const LOGROS = [
  { ico: '🌱', n: 'Primera pieza',    d: 'Marca tu primera pieza',             f: r => [r.piezas, 1] },
  { ico: '🥉', n: 'Aficionado',       d: 'Consigue 10 piezas',                 f: r => [r.piezas, 10] },
  { ico: '🥈', n: 'Coleccionista',    d: 'Consigue 100 piezas',                f: r => [r.piezas, 100] },
  { ico: '🥇', n: 'Experto',          d: 'Consigue 500 piezas',                f: r => [r.piezas, 500] },
  { ico: '💎', n: 'Maestro',          d: 'Consigue 1.000 piezas',              f: r => [r.piezas, 1000] },
  { ico: '🏳️', n: 'Primer país',      d: 'Completa un país',                   f: r => [r.completos, 1] },
  { ico: '🌍', n: 'Viajero',          d: 'Completa 10 países',                 f: r => [r.completos, 10] },
  { ico: '🗺️', n: 'Medio continente', d: 'Llega al 50 % en un continente',     f: r => [r.mejorCont, 50] },
  { ico: '💶', n: 'Eurozona',         d: 'Completa todos los países del euro', f: r => [r.euro, r.euroT] },
  { ico: '🧾', n: 'Papel moneda',     d: 'Consigue 50 billetes',               f: r => [r.billetes, 50] },
  { ico: '📅', n: 'Constante',        d: 'Añade piezas en 7 días distintos',   f: r => [r.dias, 7] },
];

// Función pura: recibe "marcados" y devuelve cada logro con su progreso
export function evaluarLogros(marcados) {
  const r = { piezas: 0, billetes: 0, completos: 0, euro: 0, euroT: 0, mejorCont: 0, dias: 0 };
  paises.forEach(p => {
    const s = stats(p, marcados);
    const comp = s.t > 0 && s.g === s.t;
    r.piezas += s.g;
    r.billetes += p.items.filter(i => i.t === 'B' && marcados[i.k]).length;
    if (comp) r.completos++;
    if (p.cur === 'EUR') { r.euroT++; if (comp) r.euro++; }
  });
  CONTINENTES.forEach(c => {
    const ps = paises.filter(p => p.cont === c);
    const g = ps.reduce((a, p) => a + stats(p, marcados).g, 0);
    const t = ps.reduce((a, p) => a + p.items.length, 0);
    r.mejorCont = Math.max(r.mejorCont, t ? (g / t) * 100 : 0);
  });
  const dias = new Set();
  Object.values(marcados).forEach(v => v > 1 && dias.add(new Date(v).toDateString()));
  r.dias = dias.size;
  return LOGROS.map(l => { const [a, b] = l.f(r); return { ...l, a, b, ok: a >= b }; });
}
