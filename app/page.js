'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useColeccion } from '@/hooks/useColeccion';
import { paises, stats } from '@/lib/paises';
import { evaluarLogros } from '@/lib/logros';
import { paisDelDia } from '@/lib/dia';
import Mapa from '@/components/Mapa';
import Lista from '@/components/Lista';
import Historial from '@/components/Historial';
import Logros from '@/components/Logros';
import Duplicados from '@/components/Duplicados';
import PaisDelDia from '@/components/PaisDelDia';
import Ficha from '@/components/Ficha';
import VolverArriba from '@/components/VolverArriba';

const norm = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const T = paises.reduce((a, p) => a + p.items.length, 0);   // total de piezas: no cambia nunca

export default function Home() {
  const col = useColeccion();
  const [tab, setTab] = useState('coleccion');
  const [solo, setSolo] = useState(false);
  const [q, setQ] = useState('');
  const [diaP, setDiaP] = useState(paisDelDia);
  const [ficha, setFicha] = useState(null);
  const [aviso, setAviso] = useState('');
  const fileRef = useRef(null);
  const qRef = useRef(null);
  const avisoT = useRef(null);

  const avisar = t => {
    setAviso(t);
    clearTimeout(avisoT.current);
    avisoT.current = setTimeout(() => setAviso(''), 2200);
  };

  // ---------- Filtro "solo los que faltan" ----------
  useEffect(() => { setSolo(localStorage.getItem('solo') === '1'); }, []);
  useEffect(() => { document.body.classList.toggle('solo-faltan', solo); }, [solo]);
  const cambiarSolo = v => { setSolo(v); localStorage.setItem('solo', v ? '1' : '0'); };

  const cambiarTema = () => {
    const h = document.documentElement;
    const actual = h.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const nuevo = actual === 'dark' ? 'light' : 'dark';
    h.dataset.theme = nuevo;
    localStorage.setItem('tema', nuevo);
  };

  // ---------- Ir a un país ----------
  const ir = p => {
    setTab('coleccion');
    setTimeout(() => {
      const el = document.getElementById(p.id);
      if (!el) return;
      if (document.body.classList.contains('solo-faltan') && el.classList.contains('completo')) cambiarSolo(false);
      el.closest('details').open = true;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el.classList.add('flash');
      setTimeout(() => el.classList.remove('flash'), 1800);
    }, 0);
  };
  const buscar = () => {
    const t = norm(q.trim());
    if (!t) return;
    const p = paises.find(x => norm(x.nombre) === t) || paises.find(x => norm(x.nombre).includes(t));
    if (p) ir(p);
  };

  // ---------- Logros + avisos al desbloquear ----------
  const logros = useMemo(() => evaluarLogros(col.marcados), [col.marcados]);
  useEffect(() => {
    if (!col.listo) return;
    const ahora = logros.filter(l => l.ok).map(l => l.n);
    const previo = localStorage.getItem('logros');
    if (previo !== null) {   // la primera vez solo guarda, sin avisar
      const antes = JSON.parse(previo);
      ahora.filter(n => !antes.includes(n))
        .forEach((n, i) => setTimeout(() => avisar('🏆 Logro desbloqueado: ' + n), i * 2500));
    }
    localStorage.setItem('logros', JSON.stringify(ahora));
  }, [logros, col.listo]);

  // ---------- Atajos de teclado: / buscador, f filtro, Esc salir ----------
  useEffect(() => {
    const f = e => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const escribiendo = document.activeElement === qRef.current;
      if (e.key === '/' && !escribiendo) { e.preventDefault(); qRef.current.focus(); qRef.current.select(); }
      else if (e.key === 'f' && !escribiendo) cambiarSolo(!solo);
      else if (e.key === 'Escape' && escribiendo) qRef.current.blur();
    };
    addEventListener('keydown', f);
    return () => removeEventListener('keydown', f);
  }, [solo]);

  // ---------- Impresión: solo lo que falta, con todos los continentes abiertos ----------
  useEffect(() => {
    let estado = null;
    const antes = () => {
      const dets = [...document.querySelectorAll('details.cont')];
      estado = { abiertos: dets.map(d => d.open) };
      document.body.classList.add('solo-faltan');
      dets.forEach(d => (d.open = true));
    };
    const despues = () => {
      if (!estado) return;
      document.body.classList.toggle('solo-faltan', localStorage.getItem('solo') === '1');
      document.querySelectorAll('details.cont').forEach((d, i) => (d.open = estado.abiertos[i]));
    };
    addEventListener('beforeprint', antes);
    addEventListener('afterprint', despues);
    return () => { removeEventListener('beforeprint', antes); removeEventListener('afterprint', despues); };
  }, []);

  // ---------- Exportar / importar ----------
  const exportar = () => {
    const blob = new Blob([JSON.stringify({ version: 2, marcados: col.marcados, extra: col.extra }, null, 2)],
      { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'coleccion-' + new Date().toISOString().slice(0, 10) + '.json';
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const importar = async e => {
    const f = e.target.files[0];
    if (!f) return;
    try {
      const d = JSON.parse(await f.text());
      if (!d || typeof d !== 'object' || Array.isArray(d)) throw new Error('formato');
      col.importar(d);
    } catch {
      alert('El archivo no es una colección válida');
    }
    e.target.value = '';
  };

  if (!col.listo) return <p style={{ padding: 16 }}>Cargando…</p>;

  const G = paises.reduce((a, p) => a + stats(p, col.marcados).g, 0);
  const okN = logros.filter(l => l.ok).length;
  const TABS = [
    ['coleccion', 'Colección'],
    ['historial', 'Historial'],
    ['logros', `Logros (${okN}/${logros.length})`],
    ['duplicados', 'Duplicados'],
  ];

  return (
    <>
      <header>
        <h1>🪙 Mi colección</h1>
        <input id="q" ref={qRef} list="paises" value={q} placeholder="Buscar país… ( / )"
               onChange={e => setQ(e.target.value)}
               onKeyDown={e => e.key === 'Enter' && buscar()} />
        <datalist id="paises">{paises.map(p => <option key={p.id} value={p.nombre} />)}</datalist>
        <label className="solo">
          <input type="checkbox" checked={solo} onChange={e => cambiarSolo(e.target.checked)} />
          Solo los que faltan <span id="pend">({(T - G).toLocaleString('es-ES')})</span>
        </label>
        <span id="tot">{G} de {T} piezas ({((G / T) * 100).toFixed(1)}%)</span>
        <button onClick={cambiarTema} title="Cambiar tema">🌓</button>
        <button onClick={exportar}>⬇ Exportar</button>
        <button onClick={() => fileRef.current.click()}>⬆ Importar</button>
        <button onClick={() => window.print()} title="Imprimir lo que me falta">🖨 Imprimir</button>
        <input ref={fileRef} type="file" accept=".json" hidden onChange={importar} />
      </header>

      <div id="ptitulo">Mi colección: piezas que me faltan · {new Date().toLocaleDateString('es-ES')}</div>

      <main>
        <nav id="tabs">
          {TABS.map(([id, txt]) => (
            <button key={id} className={tab === id ? 'on' : ''} onClick={() => setTab(id)}>{txt}</button>
          ))}
        </nav>

        {/* Se oculta en vez de desmontarse, para no perder el zoom del mapa ni los continentes abiertos */}
        <section id="tab-coleccion" hidden={tab !== 'coleccion'}>
          <PaisDelDia p={diaP} marcados={col.marcados} onIr={ir}
                      onOtro={() => setDiaP(paises[Math.floor(Math.random() * paises.length)])} />
          <Mapa marcados={col.marcados} onPais={ir} diaP={diaP} />
          <div id="lista">
            <Lista {...col} onInfo={(p, i) => setFicha({ p, i })} />
          </div>
        </section>

        {tab === 'historial' && <Historial marcados={col.marcados} onPais={ir} />}
        {tab === 'logros' && <Logros logros={logros} />}
        {tab === 'duplicados' && <Duplicados marcados={col.marcados} extra={col.extra} onPais={ir} onAviso={avisar} />}
      </main>

      <Ficha pieza={ficha} onCerrar={() => setFicha(null)} />
      {aviso && <div id="toast">{aviso}</div>}
      <VolverArriba />
    </>
  );
}
