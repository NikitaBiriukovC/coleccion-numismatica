'use client';
import { useEffect, useRef, useState } from 'react';
import { COMPARTIDAS, claveDup } from '@/lib/paises';
import { useI18n } from './I18n';

// pieza = { p: país, i: pieza } o null. Se abre sola cuando llega una pieza.
export default function NotaDialog({ pieza, notas, onGuardar, onCerrar }) {
  const ref = useRef(null);
  const { tr, nombrePais, nombreDivisa } = useI18n();
  const [txt, setTxt] = useState('');

  useEffect(() => {
    const dlg = ref.current;
    if (!pieza) { if (dlg.open) dlg.close(); return; }
    setTxt(notas[claveDup(pieza.p, pieza.i)] || '');
    if (!dlg.open) dlg.showModal();
  }, [pieza]);   // eslint-disable-line react-hooks/exhaustive-deps

  const cerrarCon = texto => { onGuardar(pieza.p, pieza.i, texto); ref.current.close(); };

  return (
    <dialog id="notaDlg" ref={ref} onClose={onCerrar}>
      {pieza && (
        <>
          <h3>
            {pieza.i.t === 'M' ? tr('h_mon', { d: pieza.i.d }) : tr('h_bil', { d: pieza.i.d })}
            {' · '}{COMPARTIDAS.includes(pieza.p.cur) ? nombreDivisa(pieza.p) : nombrePais(pieza.p)}
          </h3>
          <textarea id="notaTxt" rows={6} maxLength={1000} value={txt} placeholder={tr('n_ph')}
                    onChange={e => setTxt(e.target.value)} autoFocus />
          <div className="nacc">
            <button id="notaGuardar" onClick={() => cerrarCon(txt)}>{tr('n_guardar')}</button>
            <button onClick={() => cerrarCon('')}>{tr('n_borrar')}</button>
            <button onClick={() => ref.current.close()}>{tr('n_cancelar')}</button>
          </div>
        </>
      )}
    </dialog>
  );
}
