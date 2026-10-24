'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { zoom, zoomIdentity } from 'd3-zoom';
import { select } from 'd3-selection';
import 'd3-transition';
import { interpolateYlGn } from 'd3-scale-chromatic';
import { feature } from 'topojson-client';
import atlas from 'world-atlas/countries-50m.json';
import { paises, CONTINENTES, porIso, stats } from '@/lib/paises';

// Se calcula una sola vez al cargar el módulo
const trazar = geoPath(geoNaturalEarth1().fitSize([960, 500], { type: 'Sphere' }));
const caminos = feature(atlas, atlas.objects.countries).features
  .map(f => ({ id: +f.id, nombre: f.properties.name, d: trazar(f) }));

const color = pct => (pct === 0 ? 'var(--vacio)' : interpolateYlGn(0.25 + 0.75 * pct));
// La leyenda usa la misma función de color que el mapa
const degradado = 'linear-gradient(to right,' + [0.05, 0.25, 0.5, 0.75, 1].map(p => color(p)).join(',') + ')';

export default function Mapa({ marcados, onPais, diaP }) {
  const svgRef = useRef(null);
  const gRef = useRef(null);
  const zoomRef = useRef(null);
  const [tip, setTip] = useState(null);

  useEffect(() => {
    const svg = select(svgRef.current);
    const z = zoom()
      .scaleExtent([1, 12])
      .translateExtent([[0, 0], [960, 500]])
      .filter(e => (e.type === 'wheel' ? e.ctrlKey || e.metaKey : !e.button))
      .on('zoom', e => gRef.current.setAttribute('transform', e.transform.toString()));
    svg.call(z);
    zoomRef.current = z;
    return () => svg.on('.zoom', null);
  }, []);

  const botonZoom = a => {
    const svg = select(svgRef.current).transition().duration(300);
    if (a === 'reset') svg.call(zoomRef.current.transform, zoomIdentity);
    else svg.call(zoomRef.current.scaleBy, a === 'in' ? 1.6 : 1 / 1.6);
  };

  const relleno = useMemo(() => {
    const m = {};
    caminos.forEach(c => {
      const p = porIso[c.id];
      m[c.id] = p ? color(stats(p, marcados).pct) : '#cfcfcf';
    });
    return m;
  }, [marcados]);

  const conts = useMemo(() => CONTINENTES.map(c => {
    const ps = paises.filter(p => p.cont === c);
    return {
      c,
      g: ps.reduce((a, p) => a + stats(p, marcados).g, 0),
      t: ps.reduce((a, p) => a + p.items.length, 0),
    };
  }), [marcados]);

  // El país del día se dibuja el último para que su contorno quede encima de los vecinos
  const iso = diaP && diaP.iso;
  const orden = useMemo(
    () => [...caminos.filter(c => c.id !== iso), ...caminos.filter(c => c.id === iso)],
    [iso]
  );

  const p = tip && porIso[tip.c.id];
  const s = p && stats(p, marcados);
  const lst = a => (a.length ? a.slice(0, 14).join(', ') + (a.length > 14 ? '…' : '') : '✓ completo');

  return (
    <div id="mapa">
      <div id="conts">
        {conts.map(x => (
          <div className="cp" key={x.c}>
            <span>{x.c}</span><b>{x.g}/{x.t}</b>
            <div className="bar"><i style={{ width: (x.t ? (x.g / x.t) * 100 : 0) + '%' }} /></div>
          </div>
        ))}
      </div>

      <div id="zoombtns">
        <button onClick={() => botonZoom('in')} title="Acercar">+</button>
        <button onClick={() => botonZoom('out')} title="Alejar">−</button>
        <button onClick={() => botonZoom('reset')} title="Restablecer">⟲</button>
      </div>

      <div id="leyenda">
        <i className="sw dia" /><span>Hoy</span>
        <span>0 %</span><i className="sw" />
        <i id="grad" style={{ background: degradado }} />
        <span>100 %</span>
      </div>

      <svg ref={svgRef} viewBox="0 0 960 500">
        <g ref={gRef}>
          {orden.map(c => (
            <path key={c.id} className={'pais' + (iso && c.id === iso ? ' dia' : '')} d={c.d}
                  style={{ fill: relleno[c.id] }}
                  onMouseMove={e => setTip({ x: e.clientX, y: e.clientY, c })}
                  onMouseLeave={() => setTip(null)}
                  onClick={() => porIso[c.id] && onPais?.(porIso[c.id])} />
          ))}
        </g>
      </svg>

      {tip && (
        <div id="tip" style={{ left: Math.min(tip.x + 14, innerWidth - 290), top: tip.y + 14 }}>
          {p ? (
            <>
              <b>{p.nombre}: {s.g}/{s.t} (faltan {s.t - s.g})</b>
              Monedas que faltan: {lst(s.fm)}<br />Billetes que faltan: {lst(s.fb)}
            </>
          ) : (<><b>{tip.c.nombre}</b>Sin datos</>)}
        </div>
      )}
    </div>
  );
}
