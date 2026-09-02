'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Tooltip, Legend);

const S0 = 100;
const T_MAX = 3;
const N_POINTS = 300;

// T values computed once — 301 points from 0 to 3
const T_VALS = Array.from({ length: N_POINTS + 1 }, (_, i) =>
  +(i * T_MAX / N_POINTS).toFixed(4)
);

function getDivDates(freq) {
  const count = Math.round(T_MAX * freq); // e.g. 6 for freq=2 over 3 years
  return Array.from({ length: count }, (_, i) => +((i + 1) / freq).toFixed(6));
}

function buildDiscreteData(r, b, divTotal, freq) {
  const rD = r / 100;
  const bD = b / 100;
  const divDates = getDivDates(freq);
  const divPerPeriod = freq > 0 ? divTotal / freq : 0;

  return T_VALS.map(T => {
    // Sum PV of dividends whose ex-date falls on or before T
    let va = 0;
    for (const t of divDates) {
      if (t <= T + 1e-9) va += divPerPeriod * Math.exp(-rD * t);
      else break; // divDates are sorted ascending
    }
    const F = (S0 - va) * Math.exp((rD - bD) * T);
    return { x: T, y: +F.toFixed(3) };
  });
}

function buildContinuousData(r, b, divTotal) {
  const rD = r / 100;
  const bD = b / 100;
  const q = divTotal / S0;
  return T_VALS.map(T => ({
    x: T,
    y: +(S0 * Math.exp((rD - q - bD) * T)).toFixed(3),
  }));
}

export default function ForwardCurveChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const [r, setR] = useState(4);
  const [b, setB] = useState(0);
  const [divTotal, setDivTotal] = useState(4);
  const [freq, setFreq] = useState(2);
  const [showContinuous, setShowContinuous] = useState(true);

  const q = divTotal / S0;
  const isContango = r / 100 > q + b / 100;
  const fCont3 = +(S0 * Math.exp((r / 100 - q - b / 100) * 3)).toFixed(2);

  // ── Initialisation du chart (une seule fois) ──
  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');
    if (!ctx) return;

    // Horizontal line at S0 via plugin (S0 is constant — no ref needed)
    const hlinePlugin = {
      id: 'hline',
      beforeDraw(chart) {
        const { ctx: c2, scales } = chart;
        if (!scales.x || !scales.y) return;
        const yPx = scales.y.getPixelForValue(S0);
        c2.save();
        c2.beginPath();
        c2.setLineDash([4, 4]);
        c2.strokeStyle = 'rgba(100,100,100,0.35)';
        c2.lineWidth = 1;
        c2.moveTo(scales.x.left, yPx);
        c2.lineTo(scales.x.right, yPx);
        c2.stroke();
        c2.setLineDash([]);
        c2.restore();
      },
    };

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Forward discret (single stock)',
            data: buildDiscreteData(r, b, divTotal, freq),
            borderColor: '#2563eb',
            borderWidth: 2,
            pointRadius: 0,
            tension: 0,
          },
          {
            label: 'Forward continu (indice)',
            data: buildContinuousData(r, b, divTotal),
            borderColor: '#9ca3af',
            borderWidth: 1.5,
            borderDash: [6, 4],
            pointRadius: 0,
            tension: 0,
          },
        ],
      },
      options: {
        responsive: true,
        animation: false,
        parsing: false,
        plugins: {
          legend: { position: 'top' },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              title: (items) => `T = ${items[0].parsed.x.toFixed(2)} ans`,
              label: (item) => `${item.dataset.label} : ${item.parsed.y.toFixed(2)}`,
            },
          },
        },
        scales: {
          x: {
            type: 'linear',
            min: 0,
            max: T_MAX,
            title: { display: true, text: 'Maturité T (années)', color: '#6b7280' },
          },
          y: {
            type: 'linear',
            title: { display: true, text: 'Prix forward F(T)', color: '#6b7280' },
          },
        },
      },
      plugins: [hlinePlugin],
    });

    return () => {
      chartInstance.current?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Mise à jour des données sans recréer le chart ──
  useEffect(() => {
    if (!chartInstance.current) return;
    const chart = chartInstance.current;
    chart.data.datasets[0].data = buildDiscreteData(r, b, divTotal, freq);
    chart.data.datasets[1].data = buildContinuousData(r, b, divTotal);
    chart.getDatasetMeta(1).hidden = !showContinuous;
    chart.update('none');
  }, [r, b, divTotal, freq, showContinuous]);

  return (
    <div className="bg-white border border-gray-300 rounded-xl p-6 mt-4 mb-6">
      <p className="text-base font-semibold text-gray-800 mb-4">
        Forward equity en fonction de la maturité — Contango vs Backwardation
      </p>

      <div style={{ height: 300 }}>
        <canvas ref={chartRef} />
      </div>

      {/* ── Cartes de lecture ── */}
      <div className="grid grid-cols-3 gap-4 mt-5">
        <div className={`border rounded-lg p-3 text-center ${
          isContango
            ? 'bg-green-50 border-green-200'
            : 'bg-red-50 border-red-200'
        }`}>
          <p className="text-xs text-gray-500 mb-1">Régime</p>
          <p className={`font-semibold text-sm ${isContango ? 'text-green-700' : 'text-red-600'}`}>
            {isContango ? 'Contango' : 'Backwardation'}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {isContango ? `r > q + b` : `q + b > r`}
          </p>
        </div>
        <div className="bg-gray-50 border border-gray-300 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-500 mb-1">F continu à T = 3 ans</p>
          <p className="font-mono text-gray-900 text-sm font-semibold">{fCont3.toFixed(2)}</p>
        </div>
        <div className="bg-gray-50 border border-gray-300 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-500 mb-1">Rendement div. continu q</p>
          <p className="font-mono text-gray-900 text-sm font-semibold">{(q * 100).toFixed(1)} %</p>
        </div>
      </div>

      {/* ── Contrôles ── */}
      <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-5">
        <div>
          <div className="flex justify-between items-baseline mb-1">
            <span className="font-medium text-sm text-gray-700">Financement r</span>
            <span className="text-blue-600 font-mono text-sm">{r.toFixed(1)} %</span>
          </div>
          <input
            type="range" min={0} max={10} step={0.5}
            value={r}
            onChange={(e) => setR(parseFloat(e.target.value))}
            className="w-full accent-blue-600"
          />
          <p className="text-gray-500 text-xs mt-0.5">Taux de financement sans risque</p>
        </div>

        <div>
          <div className="flex justify-between items-baseline mb-1">
            <span className="font-medium text-sm text-gray-700">Borrow b</span>
            <span className="text-blue-600 font-mono text-sm">{b.toFixed(1)} %</span>
          </div>
          <input
            type="range" min={0} max={10} step={0.5}
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value))}
            className="w-full accent-blue-600"
          />
          <p className="text-gray-500 text-xs mt-0.5">Coût d&apos;emprunt du titre (hard-to-borrow)</p>
        </div>

        <div>
          <div className="flex justify-between items-baseline mb-1">
            <span className="font-medium text-sm text-gray-700">Dividende annuel total</span>
            <span className="text-blue-600 font-mono text-sm">{divTotal.toFixed(1)} €</span>
          </div>
          <input
            type="range" min={0} max={8} step={0.5}
            value={divTotal}
            onChange={(e) => setDivTotal(parseFloat(e.target.value))}
            className="w-full accent-blue-600"
          />
          <p className="text-gray-500 text-xs mt-0.5">Montant total des dividendes sur l&apos;année (S₀ = {S0})</p>
        </div>

        <div>
          <div className="flex justify-between items-baseline mb-1">
            <span className="font-medium text-sm text-gray-700">Fréquence de détachement</span>
            <span className="text-blue-600 font-mono text-sm">{freq}×/an</span>
          </div>
          <select
            value={freq}
            onChange={(e) => setFreq(parseInt(e.target.value))}
            className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
          >
            <option value={1}>1 fois par an (annuel)</option>
            <option value={2}>2 fois par an (semestriel)</option>
            <option value={4}>4 fois par an (trimestriel)</option>
          </select>
          <p className="text-gray-500 text-xs mt-0.5">Dates de détachement régulièrement espacées</p>
        </div>
      </div>

      {/* ── Toggle + légende constantes ── */}
      <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={showContinuous}
            onChange={(e) => setShowContinuous(e.target.checked)}
            className="accent-blue-600"
          />
          Afficher la courbe continue de référence (indice, gris)
        </label>
        <p className="text-gray-400 text-xs">— S₀ = {S0} — Ligne grise = comptant</p>
      </div>
    </div>
  );
}
