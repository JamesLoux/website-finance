// Composant interactif : simulation d'un Mouvement Brownien avec volatilité σ
// Calcul pur JS (Box-Muller pour les incréments gaussiens), rendu via Chart.js
// 'use client' obligatoire : canvas, état React, génération aléatoire

'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
} from 'chart.js';

// Enregistrement des composants Chart.js utilisés (tree-shaking)
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip);

const N_STEPS = 1000;
const DT = 1 / N_STEPS; // intervalle de temps infinitésimal

// Génère deux nombres gaussiens indépendants N(0,1) via Box-Muller
function boxMuller() {
  const u1 = Math.random();
  const u2 = Math.random();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

// Simule une trajectoire de Mouvement Brownien avec volatilité σ
// Incrément : σ * √dt * N(0,1)
function simulateBrownianMotion(sigma) {
  const path = new Array(N_STEPS + 1);
  path[0] = 0;
  for (let i = 1; i <= N_STEPS; i++) {
    path[i] = path[i - 1] + sigma * Math.sqrt(DT) * boxMuller();
  }
  return path;
}

// Labels de l'axe X : 0, 0.1, 0.2, ..., 1.0 (seulement les repères visibles)
const X_LABELS = Array.from({ length: N_STEPS + 1 }, (_, i) => {
  if (i % 100 === 0) return (i / N_STEPS).toFixed(1);
  return '';
});

export default function BrownianMotionChart() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [sigma, setSigma] = useState(1.0);
  const [path, setPath] = useState(() => simulateBrownianMotion(1.0));

  const generate = useCallback((s) => {
    setPath(simulateBrownianMotion(s));
  }, []);

  // Régénère automatiquement quand σ change
  const handleSigmaChange = useCallback((e) => {
    const s = parseFloat(e.target.value);
    setSigma(s);
    generate(s);
  }, [generate]);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    // Détruit le chart précédent avant d'en créer un nouveau
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: X_LABELS,
        datasets: [
          {
            data: path,
            borderColor: '#2563eb',   // blue-600
            borderWidth: 1.2,
            pointRadius: 0,           // pas de points, ligne seule
            tension: 0,               // ligne droite entre chaque pas
          },
        ],
      },
      options: {
        animation: false,
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `W_t = ${ctx.parsed.y.toFixed(4)}`,
              title: (ctx) => `t = ${(ctx[0].dataIndex / N_STEPS).toFixed(3)}`,
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Temps t',
              color: '#6b7280',
              font: { size: 12 },
            },
            ticks: { color: '#9ca3af', maxRotation: 0 },
            grid: { color: '#f3f4f6' },
          },
          y: {
            title: {
              display: true,
              text: 'Wt',
              color: '#6b7280',
              font: { size: 12 },
            },
            ticks: { color: '#9ca3af' },
            grid: { color: '#f3f4f6' },
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [path]);

  return (
    <div className="border border-gray-300 rounded-xl p-6 bg-white mt-12">

      {/* En-tête */}
      <div className="flex items-center justify-between mb-5 gap-4 flex-wrap">
        <h3 className="text-base font-semibold text-gray-900">
          Simulation — Mouvement Brownien W<sub>t</sub>
        </h3>
        <button
          onClick={() => generate(sigma)}
          className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Générer une nouvelle trajectoire
        </button>
      </div>

      {/* Graphique */}
      <canvas ref={canvasRef} />

      {/* Slider volatilité */}
      <div className="mt-5">
        <label className="block text-sm text-gray-600 mb-2">
          Volatilité σ = <span className="font-semibold text-gray-900">{sigma.toFixed(1)}</span>
        </label>
        <input
          type="range"
          min="0.1"
          max="2.0"
          step="0.1"
          value={sigma}
          onChange={handleSigmaChange}
          className="w-full accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>0.1</span>
          <span>2.0</span>
        </div>
      </div>

    </div>
  );
}
