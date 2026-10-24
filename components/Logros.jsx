'use client';

export default function Logros({ logros }) {
  return (
    <div id="logros">
      {logros.map(l => (
        <div className={'logro ' + (l.ok ? 'on' : 'off')} key={l.n}>
          <div className="ico">{l.ico}</div>
          <strong>{l.n}</strong>
          <p>{l.d}</p>
          {l.ok ? <p>✔ Conseguido</p> : (
            <>
              <p>{Math.floor(l.a)} / {Math.ceil(l.b)}</p>
              <div className="bar"><i style={{ width: (l.a / l.b) * 100 + '%' }} /></div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
