'use client';
import { HISTORIA } from '@/lib/historia';
import { stats } from '@/lib/paises';
import { useI18n } from './I18n';

export default function PaisDelDia({ p, marcados, onIr, onOtro }) {
  const { idioma, tr, nombrePais, nombreDivisa, nombreCont } = useI18n();
  if (!p) return null;
  const s = stats(p, marcados);
  const curio = (idioma === 'es' && HISTORIA[`${p.cur}|*`]) || tr('dia_aqui', { d: nombreDivisa(p), c: p.cur });
  return (
    <div id="dia">
      <div>
        <small>{tr('dia_titulo')}</small>
        <h2>{nombrePais(p)}</h2>
        <p>{nombreDivisa(p)} ({p.cur}) · {nombreCont(p.cont)}</p>
        <p className="curio">{curio}</p>
        <p>{tr('dia_llevas', { g: s.g, t: s.t })}</p>
      </div>
      <div className="acc">
        <button onClick={() => onIr(p)}>{tr('dia_ver')}</button>
        <button onClick={onOtro}>{tr('dia_otro')}</button>
      </div>
    </div>
  );
}
