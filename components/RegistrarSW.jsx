'use client';
import { useEffect } from 'react';

export default function RegistrarSW() {
  useEffect(() => {
    // Solo en producción: en desarrollo el service worker confunde porque guarda copias viejas
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register((process.env.NEXT_PUBLIC_BASE_PATH || '') + '/sw.js')
        .catch(() => {});
    }
  }, []);
  return null;
}
