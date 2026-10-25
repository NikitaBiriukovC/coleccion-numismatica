'use client';
import { paises, COMPARTIDAS } from '@/lib/paises';
import { useI18n } from './I18n';

export default function Historial({ marcados, onPais }) {
  const { idioma, tr, nombrePais, nombreDivisa } = useI18n();
  const todos = [];
  let sinFecha = 0;
  paises.forEach(p => p.items.forEach(i => {
    const v = marcados[i.k];
    if (v > 1) todos.push({ p, i, v }); else if (v) sinFecha++;
  }));
  todos.sort((a, b) => b.v - a.v);

  // Una pieza compartida (euro) marcada a la vez en varios países cuenta una sola vez
  const vistos = new Set();
  const unicos = todos.filter(({ p, i, v }) => {
    if (!COMPARTIDAS.includes(p.cur)) return true;
    const c = `${p.cur}|${i.t}|${i.d}|${v}`;
    if (vistos.has(c)) return false;
    vistos.add(c);
    return true;
  });
  const fmt = v => new Date(v).toLocaleDateString(idioma, { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div id="hist">
      {unicos.length === 0 && <div className="nota">{tr('h_vacio')}</div>}
      {unicos.slice(0, 20).map(({ p, i, v }) => (
        <div className="hrow" key={i.k} onClick={() => onPais(p)}>
          <span>
            {i.t === 'M' ? '🪙 ' + tr('h_mon', { d: i.d }) : '💶 ' + tr('h_bil', { d: i.d })}
            {' · '}<b>{COMPARTIDAS.includes(p.cur) ? nombreDivisa(p) : nombrePais(p)}</b>
          </span>
          <small>{fmt(v)}</small>
        </div>
      ))}
      {sinFecha > 0 && <div className="nota">{tr('h_sinfecha', { n: sinFecha })}</div>}
    </div>
  );
}
