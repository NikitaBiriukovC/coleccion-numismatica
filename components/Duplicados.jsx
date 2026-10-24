'use client';
import { paises, COMPARTIDAS, claveDup } from '@/lib/paises';

export default function Duplicados({ marcados, extra, onPais, onAviso }) {
  const vistos = new Set();
  const lista = [];
  paises.forEach(p => p.items.forEach(i => {
    const k = claveDup(p, i);
    const n = extra[k];
    if (!n || !marcados[i.k] || vistos.has(k)) return;   // las piezas compartidas se cuentan una vez
    vistos.add(k);
    lista.push({ k, n, p,
      txt: `${i.t === 'M' ? 'Moneda' : 'Billete'} de ${i.d} · ${COMPARTIDAS.includes(p.cur) ? p.dn : p.nombre}` });
  }));
  const total = lista.reduce((a, x) => a + x.n, 0);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(lista.map(x => `${x.txt} (${x.n})`).join('\n'));
      onAviso('📋 Lista copiada');
    } catch {
      onAviso('No se pudo copiar');
    }
  };

  return (
    <div id="dups">
      {lista.length === 0 && (
        <div className="nota">Aún no tienes duplicados. Marca una pieza y pulsa + para anotar una repetida.</div>
      )}
      {lista.length > 0 && (
        <div className="nota">
          {total} repetidas en {lista.length} referencias <button onClick={copiar}>📋 Copiar lista</button>
        </div>
      )}
      {lista.map(x => (
        <div className="hrow" key={x.k} onClick={() => onPais(x.p)}>
          <span>{x.txt}</span>
          <small>{x.n} repetida{x.n > 1 ? 's' : ''}</small>
        </div>
      ))}
    </div>
  );
}
