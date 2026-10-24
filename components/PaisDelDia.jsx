'use client';
import { HISTORIA } from '@/lib/historia';
import { stats } from '@/lib/paises';

export default function PaisDelDia({ p, marcados, onIr, onOtro }) {
  if (!p) return null;
  const s = stats(p, marcados);
  const curio = HISTORIA[`${p.cur}|*`] || `Aquí se usa ${p.dn} (${p.cur}).`;
  return (
    <div id="dia">
      <div>
        <small>🎲 País del día</small>
        <h2>{p.nombre}</h2>
        <p>{p.dn} ({p.cur}) · {p.cont}</p>
        <p className="curio">{curio}</p>
        <p>Llevas <b>{s.g}/{s.t}</b> piezas de este país.</p>
      </div>
      <div className="acc">
        <button onClick={() => onIr(p)}>Ver país</button>
        <button onClick={onOtro}>Otro país 🎲</button>
      </div>
    </div>
  );
}
