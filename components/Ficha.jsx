'use client';
import { useEffect, useRef, useState } from 'react';
import { HISTORIA } from '@/lib/historia';
import { claveDup } from '@/lib/paises';
import { useI18n } from './I18n';

// pieza = { p: país, i: pieza } o null. Se abre sola cuando llega una pieza.
export default function Ficha({ pieza, notas, onCerrar }) {
  const ref = useRef(null);
  const { idioma, tr, nombreDivisa } = useI18n();
  const [txt, setTxt] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    const dlg = ref.current;
    if (!pieza) { if (dlg.open) dlg.close(); return; }
    const { p, i } = pieza;
    setLink('');
    if (!dlg.open) dlg.showModal();

    // Los textos de historia.js están en español; en otros idiomas se pide el resumen a Wikipedia
    const propio = idioma === 'es' && (HISTORIA[`${p.cur}|${i.t}|${i.d}`] || HISTORIA[`${p.cur}|*`]);
    if (propio) { setTxt(propio); return; }

    setTxt(tr('f_cargando'));
    let vivo = true;   // evita pintar la respuesta de una ficha que ya se cerró
    fetch(`https://${idioma}.wikipedia.org/api/rest_v1/page/summary/` + encodeURIComponent(nombreDivisa(p)))
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(j => { if (vivo) { setTxt(j.extract); setLink(j.content_urls.desktop.page); } })
      .catch(() => vivo && setTxt(tr('f_nada')));
    return () => { vivo = false; };
  }, [pieza, idioma]);   // eslint-disable-line react-hooks/exhaustive-deps

  const miNota = pieza && notas[claveDup(pieza.p, pieza.i)];

  return (
    <dialog id="ficha" ref={ref} onClose={onCerrar}>
      {pieza && (
        <>
          <h3>
            {pieza.i.t === 'M' ? tr('h_mon', { d: pieza.i.d }) : tr('h_bil', { d: pieza.i.d })}
            {' · '}{nombreDivisa(pieza.p)}
          </h3>
          {/* Tu texto se pinta como texto (React lo escapa), nunca como HTML */}
          {miNota && <p className="minota"><b>📝 {tr('mi_nota')}</b><br />{miNota}</p>}
          <p>{txt}</p>
          {link && <a href={link} target="_blank" rel="noopener noreferrer">{tr('f_mas')}</a>}
          <br />
          <button onClick={() => ref.current.close()}>{tr('f_cerrar')}</button>
        </>
      )}
    </dialog>
  );
}
