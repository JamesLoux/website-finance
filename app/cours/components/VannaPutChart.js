'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, Filler);

// ── Black-Scholes helpers ──────────────────────────────────────────────────

function normCDF(x) {
  if (x < -8) return 0;
  if (x > 8) return 1;
  let sum = 0, term = x;
  for (let i = 3; sum + term !== sum; i += 2) {
    sum += term;
    term *= x * x / i;
  }
  return 0.5 + sum * Math.exp(-0.5 * x * x - 0.9189385332046728);
}

function bsPut(S, K, r, T, sigma) {
  if (T <= 0 || sigma <= 0) return Math.max(K - S, 0);
  const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);
  return K * Math.exp(-r * T) * normCDF(-d2) - S * normCDF(-d1);
}

function bsPutDelta(S, K, r, T, sigma) {
  if (T <= 0 || sigma <= 0) return S < K ? -1 : 0;
  const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
  return normCDF(d1) - 1;
}

// ── Constantes ────────────────────────────────────────────────────────────

const K = 100;
const r = 0;
const T = 0.5;
const SIGMA_REF = 0.15;
const S_MIN = 50;
const S_MAX = 150;
const N_POINTS = 1000;

const SPOTS = Array.from({ length: N_POINTS + 1 }, (_, i) =>
  S_MIN + (i / N_POINTS) * (S_MAX - S_MIN)
);

const refPrices = SPOTS.map(S => ({ x: S, y: bsPut(S, K, r, T, SIGMA_REF) }));
const refDeltas = SPOTS.map(S => ({ x: S, y: bsPutDelta(S, K, r, T, SIGMA_REF) }));

// ── Composant ─────────────────────────────────────────────────────────────

export default function VannaPutChart() {
  const [sigma, setSigma] = useState(0.40);
  const [spot, setSpot] = useState(80);

  const priceRef = useRef(null);
  const deltaRef = useRef(null);
  const priceChart = useRef(null);
  const deltaChart = useRef(null);
  // Ref mutable partagée avec le plugin — pas de réassignation de config.plugins
  const spotRef = useRef(spot);

  const currentPrice = bsPut(spot, K, r, T, sigma).toFixed(2);
  const currentDelta = bsPutDelta(spot, K, r, T, sigma).toFixed(3);
  const refPrice = bsPut(spot, K, r, T, SIGMA_REF).toFixed(2);
  const refDelta = bsPutDelta(spot, K, r, T, SIGMA_REF).toFixed(3);

  // Plugin ligne verticale — lit spotRef.current à chaque draw
  const verticalLinePlugin = {
    id: 'verticalLine',
    afterDraw(chart) {
      const { ctx, scales } = chart;
      const x = scales.x.getPixelForValue(spotRef.current);
      const top = scales.y.top;
      const bottom = scales.y.bottom;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, top);
      ctx.lineTo(x, bottom);
      ctx.strokeStyle = '#6b7280';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 4]);
      ctx.stroke();
      ctx.restore();
    },
  };

  const commonOptions = (yLabel, yMin, yMax) => ({
    animation: false,
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top', labels: { boxWidth: 12, font: { size: 11 } } },
      tooltip: { enabled: false },
    },
    scales: {
      x: {
        type: 'linear',
        min: S_MIN,
        max: S_MAX,
        title: { display: true, text: 'Prix du sous-jacent S', font: { size: 11 } },
        ticks: { stepSize: 10 },
      },
      y: {
        type: 'linear',
        min: yMin,
        max: yMax,
        title: { display: true, text: yLabel, font: { size: 11 } },
      },
    },
  });

  // Init charts — une seule fois
  useEffect(() => {
    const dynPrices = SPOTS.map(S => ({ x: S, y: bsPut(S, K, r, T, sigma) }));
    const dynDeltas = SPOTS.map(S => ({ x: S, y: bsPutDelta(S, K, r, T, sigma) }));

    priceChart.current = new Chart(priceRef.current, {
      type: 'line',
      plugins: [verticalLinePlugin],
      data: {
        datasets: [
          {
            label: `Vol dynamique (${Math.round(sigma * 100)}%)`,
            data: dynPrices,
            borderColor: '#2563eb',
            borderWidth: 2,
            pointRadius: 0,
            tension: 0,
          },
          {
            label: 'Vol de référence (15%)',
            data: refPrices,
            borderColor: '#9ca3af',
            borderWidth: 1.5,
            borderDash: [5, 4],
            pointRadius: 0,
            tension: 0,
          },
        ],
      },
      options: commonOptions('Prix du Put', 0, null),
    });

    deltaChart.current = new Chart(deltaRef.current, {
      type: 'line',
      plugins: [verticalLinePlugin],
      data: {
        datasets: [
          {
            label: `Vol dynamique (${Math.round(sigma * 100)}%)`,
            data: dynDeltas,
            borderColor: '#2563eb',
            borderWidth: 2,
            pointRadius: 0,
            tension: 0,
          },
          {
            label: 'Vol de référence (15%)',
            data: refDeltas,
            borderColor: '#9ca3af',
            borderWidth: 1.5,
            borderDash: [5, 4],
            pointRadius: 0,
            tension: 0,
          },
        ],
      },
      options: commonOptions('Delta du Put', -1, 0),
    });

    return () => {
      priceChart.current?.destroy();
      deltaChart.current?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update quand sigma ou spot change
  useEffect(() => {
    if (!priceChart.current || !deltaChart.current) return;

    // Mettre à jour la ref du spot — le plugin la lira au prochain draw
    spotRef.current = spot;

    const dynPrices = SPOTS.map(S => ({ x: S, y: bsPut(S, K, r, T, sigma) }));
    const dynDeltas = SPOTS.map(S => ({ x: S, y: bsPutDelta(S, K, r, T, sigma) }));

    priceChart.current.data.datasets[0].data = dynPrices;
    priceChart.current.data.datasets[0].label = `Vol dynamique (${Math.round(sigma * 100)}%)`;
    priceChart.current.update('none');

    deltaChart.current.data.datasets[0].data = dynDeltas;
    deltaChart.current.data.datasets[0].label = `Vol dynamique (${Math.round(sigma * 100)}%)`;
    deltaChart.current.update('none');
  }, [sigma, spot]);

  return (
    <div className="my-8 p-4 bg-white border border-gray-300 rounded-xl">

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Volatilité actuelle : <span className="font-mono text-blue-600">{Math.round(sigma * 100)}%</span>
          </label>
          <input
            type="range" min={10} max={80} step={1}
            value={Math.round(sigma * 100)}
            onChange={e => setSigma(Number(e.target.value) / 100)}
            className="w-full accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>10%</span><span>80%</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prix du spot : <span className="font-mono text-blue-600">{spot}</span>
          </label>
          <input
            type="range" min={50} max={150} step={1}
            value={spot}
            onChange={e => setSpot(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>50</span><span>150</span>
          </div>
        </div>
      </div>

      {/* Cartes de valeurs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-center">
          <div className="text-xs text-gray-500 mb-1">Prix Put (dyn.)</div>
          <div className="font-mono font-semibold text-blue-700 text-lg">{currentPrice}</div>
        </div>
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-center">
          <div className="text-xs text-gray-500 mb-1">Prix Put (réf.)</div>
          <div className="font-mono font-semibold text-gray-600 text-lg">{refPrice}</div>
        </div>
        <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-center">
          <div className="text-xs text-gray-500 mb-1">Delta Put (dyn.)</div>
          <div className="font-mono font-semibold text-blue-700 text-lg">{currentDelta}</div>
        </div>
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-center">
          <div className="text-xs text-gray-500 mb-1">Delta Put (réf.)</div>
          <div className="font-mono font-semibold text-gray-600 text-lg">{refDelta}</div>
        </div>
      </div>

      {/* Graphiques côte à côte sur grand écran */}
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1">
          <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">Prix du Put</p>
          <canvas ref={priceRef} height={220} />
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">Delta du Put</p>
          <canvas ref={deltaRef} height={220} />
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-4 text-center">
        Paramètres fixes : K = 100 · r = 0% · T = 6 mois · Vol référence = 15%
      </p>
    </div>
  );
}
