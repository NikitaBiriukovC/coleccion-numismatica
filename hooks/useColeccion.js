'use client';
import { useCallback, useEffect, useState } from 'react';
import { paises, COMPARTIDAS, claveDup } from '@/lib/paises';

const KEY = 'coleccion-numismatica';

export function useColeccion() {
  const [marcados, setMarcados] = useState({});   // pieza -> fecha en que la marcaste
  const [extra, setExtra] = useState({});         // pieza -> nº de copias repetidas
  const [notas, setNotas] = useState({});         // pieza -> tu texto
  const [listo, setListo] = useState(false);

  // Leer localStorage solo en el navegador (en el servidor no existe)
  useEffect(() => {
    try {
      setMarcados(JSON.parse(localStorage.getItem(KEY) || '{}'));
      setExtra(JSON.parse(localStorage.getItem(KEY + '-extra') || '{}'));
      setNotas(JSON.parse(localStorage.getItem(KEY + '-notas') || '{}'));
    } catch {}
    setListo(true);
  }, []);

  // Guardar cada vez que cambian; "listo" evita pisar los datos antes de leerlos
  useEffect(() => {
    if (!listo) return;
    localStorage.setItem(KEY, JSON.stringify(marcados));
    localStorage.setItem(KEY + '-extra', JSON.stringify(extra));
    localStorage.setItem(KEY + '-notas', JSON.stringify(notas));
  }, [marcados, extra, notas, listo]);

  const marcar = useCallback((p, i, on) => {
    const afectados = COMPARTIDAS.includes(p.cur) ? paises.filter(x => x.cur === p.cur) : [p];
    const ahora = Date.now();
    setMarcados(prev => {
      const n = { ...prev };
      afectados.forEach(x => {
        const k = `${x.nombre}|${i.t}|${i.d}`;
        if (on) n[k] = n[k] || ahora; else delete n[k];
      });
      return n;
    });
    if (!on) setExtra(prev => {
      const n = { ...prev };
      afectados.forEach(x => delete n[claveDup(x, i)]);
      return n;
    });
    // Las notas NO se borran al desmarcar: tu historia no se pierde si te equivocas de casilla
  }, []);

  const cambiarDup = useCallback((p, i, delta) => {
    if (!marcados[`${p.nombre}|${i.t}|${i.d}`]) return;
    const k = claveDup(p, i);
    setExtra(prev => {
      const v = Math.max(0, (prev[k] || 0) + delta);
      const n = { ...prev };
      v ? (n[k] = v) : delete n[k];
      return n;
    });
  }, [marcados]);

  // Texto vacío = borrar la nota
  const guardarNota = useCallback((p, i, texto) => {
    const k = claveDup(p, i);   // en el euro la nota es de la pieza, no de cada país
    const v = texto.trim();
    setNotas(prev => {
      const n = { ...prev };
      v ? (n[k] = v) : delete n[k];
      return n;
    });
  }, []);

  const importar = useCallback(datos => {
    setMarcados(datos.marcados || datos);   // acepta también el formato antiguo
    setExtra(datos.extra || {});
    setNotas(datos.notas || {});
  }, []);

  return { marcados, extra, notas, listo, marcar, cambiarDup, guardarNota, importar };
}
