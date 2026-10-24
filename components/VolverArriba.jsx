'use client';
import { useEffect, useState } from 'react';

export default function VolverArriba() {
  const [ver, setVer] = useState(false);
  useEffect(() => {
    const f = () => setVer(scrollY > 600);
    addEventListener('scroll', f, { passive: true });
    return () => removeEventListener('scroll', f);
  }, []);
  return (
    <button id="arriba" className={ver ? 'ver' : ''} title="Volver arriba" aria-label="Volver arriba"
            onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>
  );
}
