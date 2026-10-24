const base = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const dynamic = 'force-static';   // necesario con output: 'export'

export default function manifest() {
  return {
    name: 'Mi colección numismática',
    short_name: 'Colección',
    lang: 'es',
    start_url: base + '/',
    scope: base + '/',
    display: 'standalone',
    background_color: '#f6f4ef',
    theme_color: '#2e7d32',
    icons: [
      { src: base + '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: base + '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: base + '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
