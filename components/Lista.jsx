'use client';
import { paises, CONTINENTES, claveDup, stats } from '@/lib/paises';
import { useI18n } from './I18n';

export default function Lista({ marcados, extra, notas, marcar, cambiarDup, onInfo, onNota }) {
  const { tr, nombrePais, nombreDivisa, nombreCont } = useI18n();

  return CONTINENTES.map(cont => {
    const ps = paises.filter(p => p.cont === cont);
    const g = ps.reduce((a, p) => a + stats(p, marcados).g, 0);
    const t = ps.reduce((a, p) => a + p.items.length, 0);
    return (
      <details className="cont" key={cont}>
        <summary>{nombreCont(cont)} — {tr('paises_n', { n: ps.length })} · {g}/{t}</summary>
        {ps.map(p => {
          const s = stats(p, marcados);
          const completo = s.t > 0 && s.g === s.t;   // el filtro "solo los que faltan" lo usa
          return (
            <div className={'pais-card' + (completo ? ' completo' : '')} id={p.id} key={p.id}>
              <div className="ph">
                <div><strong>{nombrePais(p)}</strong> <small>{nombreDivisa(p)} ({p.cur})</small></div>
                <div>
                  <small>{s.g}/{s.t}</small>{' '}
                  <button onClick={() => p.items.forEach(i => marcar(p, i, !completo))}>{tr('marcar_todo')}</button>
                </div>
              </div>
              {['M', 'B'].map(tipo => {
                const its = p.items.filter(i => i.t === tipo);
                return its.length > 0 && (
                  <div className="fila" key={tipo}>
                    <em>{tr(tipo === 'M' ? 'monedas' : 'billetes')}</em>
                    {its.map(i => {
                      const n = extra[claveDup(p, i)] || 0;
                      const nota = notas[claveDup(p, i)];
                      return (
                        <label className="chip" key={i.k}>
                          <input type="checkbox" checked={!!marcados[i.k]}
                                 onChange={e => marcar(p, i, e.target.checked)} />
                          {i.d}
                          <span className="dupc">
                            <button type="button" className="dm" onClick={() => cambiarDup(p, i, -1)}>−</button>
                            <b className="dn">{n ? '×' + (n + 1) : ''}</b>
                            <button type="button" className="dm" onClick={() => cambiarDup(p, i, 1)}>+</button>
                          </span>
                          <button type="button" className={'nt' + (nota ? ' tiene' : '')}
                                  title={nota || tr('n_add')}
                                  onClick={e => { e.preventDefault(); onNota(p, i); }}>✎</button>
                          <button type="button" className="inf"
                                  onClick={e => { e.preventDefault(); onInfo(p, i); }}>ⓘ</button>
                        </label>
                      );
                    })}
                  </div>
                );
              })}
              <div className="bar"><i style={{ width: s.pct * 100 + '%' }} /></div>
            </div>
          );
        })}
      </details>
    );
  });
}
