'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as L from '@/lib/i18n';

const Ctx = createContext(null);

// Guarda el idioma y ofrece funciones ya "atadas" a él: tr, lg, nombrePais, nombreDivisa, nombreCont
export function I18nProvider({ children }) {
  const [idioma, setIdioma] = useState('es');

  useEffect(() => {
    const guardado = localStorage.getItem('idioma');
    if (guardado && L.IDIOMAS[guardado]) setIdioma(guardado);
  }, []);
  useEffect(() => { document.documentElement.lang = idioma; }, [idioma]);

  const valor = useMemo(() => ({
    idioma,
    cambiar: c => { setIdioma(c); localStorage.setItem('idioma', c); },
    tr: (k, v) => L.tr(idioma, k, v),
    lg: i => L.lg(idioma, i),
    nombrePais: p => L.nombrePais(idioma, p),
    nombreDivisa: p => L.nombreDivisa(idioma, p),
    nombreCont: c => L.nombreCont(idioma, c),
  }), [idioma]);

  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
