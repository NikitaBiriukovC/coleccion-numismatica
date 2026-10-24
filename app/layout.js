import './globals.css';
import RegistrarSW from '@/components/RegistrarSW';

const base = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata = {
  title: 'Mi colección numismática',
  description: 'Registro de mi colección de monedas y billetes de todo el mundo',
  icons: { apple: base + '/icons/icon-192.png' },
};
export const viewport = { themeColor: '#2e7d32' };

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning: el script de abajo cambia data-theme antes de que React arranque
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html:
          "try{var t=localStorage.getItem('tema');if(t)document.documentElement.dataset.theme=t}catch(e){}" }} />
      </head>
      <body>
        {children}
        <RegistrarSW />
      </body>
    </html>
  );
}
