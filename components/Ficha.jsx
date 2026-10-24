'use client';
import { useEffect, useRef, useState } from 'react';
import { HISTORIA } from '@/lib/historia';

// pieza = { p: país, i: pieza } o null. Se abre sola cuando llega una pieza.
export default function Ficha({ pieza, onCerrar }) {
  const ref = useRef(null);
  const [txt, setTxt] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    const dlg = ref.current;
    if (!pieza) { if (dlg.open) dlg.close(); return; }
    const { p, i } = pieza;
    setLink('');
    if (!dlg.open) dlg.showModal();

    const propio = HISTORIA[`${p.cur}|${i.t}|${i.d}`] || HISTORIA[`${p.cur}|*`];
    if (propio) { setTxt(propio); return; }

    setTxt('Cargando…');
    let vivo = true;   // evita pintar la respuesta de una ficha que ya se cerró
    fetch('https://es.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(p.dn))
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(j => { if (vivo) { setTxt(j.extract); setLink(j.content_urls.desktop.page); } })
      .catch(() => vivo && setTxt('Todavía no hay información de esta pieza. Puedes añadirla en lib/historia.js.'));
    return () => { vivo = false; };
  }, [pieza]);

  return (
    <dialog id="ficha" ref={ref} onClose={onCerrar}>
      {pieza && (
        <>
          <h3>{pieza.i.t === 'M' ? 'Moneda' : 'Billete'} de {pieza.i.d} · {pieza.p.dn}</h3>
          <p>{txt}</p>
          {link && <a href={link} target="_blank" rel="noopener noreferrer">Leer más en Wikipedia</a>}
          <br />
          <button onClick={() => ref.current.close()}>Cerrar</button>
        </>
      )}
    </dialog>
  );
}
