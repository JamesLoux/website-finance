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

const K     = 100;
const S_MIN = 80;
const S_MAX = 120;
const N_PTS = 200;

const S_VALS = Array.from({ length: N_PTS + 1 }, (_, i) =>
  +(S_MIN + (S_MAX - S_MIN) * i / N_PTS).toFixed(4)
);

// Step function calculée une seule fois au chargement du module
const DIGITAL_DATA = (() => {
  const pts = [];
  for (const s of S_VALS) {
    if (s < 99.999) pts.push({ x: s, y: 0 });
  }
  pts.push({ x: 99.999, y: 0 });
  pts.push({ x: 100.001, y: 1 });
  for (const s of S_VALS) {
    if (s > 100.001) pts.push({ x: s, y: 1 });
  }
  return pts;
})();

// Payoff normalisé du Call Spread : rampe linéaire de 0 à 1 entre K-ε et K+ε
// Converge vers la digitale idéale quand ε → 0
function buildCallSpreadData(epsilon) {
  const lo = K - epsilon;
  const hi = K + epsilon;
  return S_VALS.map(s => ({
    x: s,
    y: s <= lo ? 0 : s >= hi ? 1 : +((s - lo) / (2 * epsilon)).toFixed(5),
  }));
}

export default function DigitalReplicationChart() {
  const chartRef      = useRef(null);
  const chartInstance = useRef(null);

  const [epsilon, setEpsilon] = useState(4);

  // Crée le chart une seule fois au montage
  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Digital idéale',
            data: DIGITAL_DATA,
            borderColor: '#111827',
            borderWidth: 2,
            borderDash: [6, 4],
            pointRadius: 0,
            tension: 0,
          },
          {
            label: 'Call Spread (réplication)',
            data: buildCallSpreadData(4),
            borderColor: '#3b82f6',
            borderWidth: 2.5,
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
            filter: (item) => item.datasetIndex === 1,
            callbacks: {
              title: (items) => `S = ${items[0].parsed.x.toFixed(1)}`,
              label: (item) => `Call Spread : ${item.parsed.y.toFixed(4)}`,
            },
          },
        },
        scales: {
          x: {
            type: 'linear',
            min: S_MIN,
            max: S_MAX,
            title: { display: true, text: 'Spot S', color: '#6b7280' },
          },
          y: {
            type: 'linear',
            min: 0,
            max: 1.2,
            title: { display: true, text: 'Valeur normalisée', color: '#6b7280' },
          },
        },
      },
    });

    return () => {
      chartInstance.current?.destroy();
      chartInstance.current = null;
    };
  }, []);

  // Met à jour le chart directement dans le handler — pas de second useEffect
  const handleEpsilonChange = (e) => {
    const newEpsilon = parseFloat(e.target.value);
    setEpsilon(newEpsilon);
    if (chartInstance.current) {
      chartInstance.current.data.datasets[1].data = buildCallSpreadData(newEpsilon);
      chartInstance.current.update('none');
    }
  };

  const N     = Math.round(1000000 / (1000 * 2 * epsilon));
  const kLow  = (K - epsilon).toFixed(1);
  const kHigh = (K + epsilon).toFixed(1);

  return (
    <div className="bg-white border border-gray-300 rounded-xl p-6 mt-6">
      <p className="text-base font-semibold text-gray-800 mb-4">
        Digital idéale vs Call Spread — réplication par overhedge
      </p>

      <div style={{ height: 300 }}>
        <canvas ref={chartRef} />
      </div>

      <div className="mt-5">
        <div className="flex justify-between items-baseline mb-1">
          <span className="font-medium text-sm text-gray-700">Largeur du Call Spread</span>
          <span className="text-blue-600 font-mono text-sm">
            ε = {epsilon.toFixed(1)}% (strikes : {kLow} / {kHigh})
          </span>
        </div>
        <input
          type="range"
          min={0.5} max={10} step={0.5}
          value={epsilon}
          onChange={handleEpsilonChange}
          className="w-full accent-blue-600"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <div className="flex-1 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-gray-700">
          <p className="mb-2">Pour répliquer cette Digital sur un nominal de 1 000 000 €</p>
          <p className="font-mono text-xs leading-loose">
            {'→ Acheter  '}
            <span className="font-bold text-blue-600">{N}</span>
            {' calls  strike '}
            <span className="font-mono">{kLow}</span>
          </p>
          <p className="font-mono text-xs leading-loose">
            {'→ Vendre   '}
            <span className="font-bold text-blue-600">{N}</span>
            {' calls  strike '}
            <span className="font-mono">{kHigh}</span>
          </p>
        </div>
        <div className="flex-1 bg-gray-50 border border-gray-300 rounded-xl p-4 text-sm text-gray-700">
          <p className="font-semibold text-gray-800 mb-2">Pourquoi {N} contrats ?</p>
          <p className="font-mono text-xs leading-loose mb-2">
            N = Nominal / (Taille × 2ε)
          </p>
          <p className="text-xs text-gray-600 leading-relaxed">
            La Digital verse 1 € si S{'>'} K. Le Call Spread de largeur 2ε approxime ce payoff, mais son amplitude maximale est {(2 * epsilon).toFixed(1)} € par contrat de 1 000 sous-jacents. Il en faut donc{' '}
            <span className="font-mono">1 000 000 / (1 000 × {(2 * epsilon).toFixed(1)}) = <span className="font-bold text-gray-800">{N}</span></span>.
          </p>
        </div>
      </div>
    </div>
  );
}
