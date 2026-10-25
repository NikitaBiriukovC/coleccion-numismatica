'use client';
import { useEffect, useState } from 'react';
import { useI18n } from './I18n';

export default function VolverArriba() {
  const { tr } = useI18n();
  const [ver, setVer] = useState(false);
  useEffect(() => {
    const f = () => setVer(scrollY > 600);
    addEventListener('scroll', f, { passive: true });
    return () => removeEventListener('scroll', f);
  }, []);
  return (
    <button id="arriba" className={ver ? 'ver' : ''} title={tr('arriba')} aria-label={tr('arriba')}
            onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>
  );
}
