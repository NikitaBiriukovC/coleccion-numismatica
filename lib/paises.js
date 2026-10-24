import { PAISES, DIVISAS } from './data';

export const COMPARTIDAS = ['EUR'];
export const CONTINENTES = Object.keys(PAISES);

export const paises = [];
Object.entries(PAISES).forEach(([cont, str]) => str.split(';').forEach(s => {
  const [iso, nombre, cur] = s.split('|');
  const [dn, mon, bil] = DIVISAS[cur].split('|');
  const items = [
    ...mon.split(' ').filter(Boolean).map(d => ({ t: 'M', d })),
    ...bil.split(' ').filter(Boolean).map(d => ({ t: 'B', d }))
  ];
  items.forEach(i => (i.k = `${nombre}|${i.t}|${i.d}`));
  paises.push({ iso: +iso, nombre, cont, cur, dn, items, id: 'p' + paises.length });
}));

export const porIso = {};
export const porNombre = {};
paises.forEach(p => { if (p.iso) porIso[p.iso] = p; porNombre[p.nombre] = p; });

export const claveDup = (p, i) =>
  COMPARTIDAS.includes(p.cur) ? `${p.cur}|${i.t}|${i.d}` : `${p.nombre}|${i.t}|${i.d}`;

export function stats(p, marcados) {
  const t = p.items.length;
  const g = p.items.filter(i => marcados[i.k]).length;
  const falta = tipo => p.items.filter(i => i.t === tipo && !marcados[i.k]).map(i => i.d);
  return { t, g, pct: t ? g / t : 0, fm: falta('M'), fb: falta('B') };
}