'use client';
import { paises, COMPARTIDAS, claveDup } from '@/lib/paises';
import { useI18n } from './I18n';

export default function Duplicados({ marcados, extra, onPais, onAviso }) {
  const { tr, nombrePais, nombreDivisa } = useI18n();
  const vistos = new Set();
  const lista = [];
  paises.forEach(p => p.items.forEach(i => {
    const k = claveDup(p, i);
    const n = extra[k];
    if (!n || !marcados[i.k] || vistos.has(k)) return;   // las piezas compartidas se cuentan una vez
    vistos.add(k);
    lista.push({ k, n, p,
      txt: `${i.t === 'M' ? tr('h_mon', { d: i.d }) : tr('h_bil', { d: i.d })} · ${COMPARTIDAS.includes(p.cur) ? nombreDivisa(p) : nombrePais(p)}` });
  }));
  const total = lista.reduce((a, x) => a + x.n, 0);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(lista.map(x => `${x.txt} (${x.n})`).join('\n'));
      onAviso(tr('d_copiada'));
    } catch {
      onAviso(tr('d_error'));
    }
  };

  return (
    <div id="dups">
      {lista.length === 0 && <div className="nota">{tr('d_vacio')}</div>}
      {lista.length > 0 && (
        <div className="nota">
          {tr('d_resumen', { n: total, r: lista.length })} <button onClick={copiar}>{tr('d_copiar')}</button>
        </div>
      )}
      {lista.map(x => (
        <div className="hrow" key={x.k} onClick={() => onPais(x.p)}>
          <span>{x.txt}</span>
          <small>{x.n > 1 ? tr('d_repn', { n: x.n }) : tr('d_rep1')}</small>
        </div>
      ))}
    </div>
  );
}
