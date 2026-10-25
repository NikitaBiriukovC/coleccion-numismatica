'use client';
import { useI18n } from './I18n';

export default function Logros({ logros }) {
  const { tr, lg } = useI18n();
  return (
    <div id="logros">
      {logros.map((l, idx) => {
        const [nombre, desc] = lg(idx);   // el logro número idx, en el idioma activo
        return (
          <div className={'logro ' + (l.ok ? 'on' : 'off')} key={l.n}>
            <div className="ico">{l.ico}</div>
            <strong>{nombre}</strong>
            <p>{desc}</p>
            {l.ok ? <p>{tr('logro_ok')}</p> : (
              <>
                <p>{Math.floor(l.a)} / {Math.ceil(l.b)}</p>
                <div className="bar"><i style={{ width: (l.a / l.b) * 100 + '%' }} /></div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
