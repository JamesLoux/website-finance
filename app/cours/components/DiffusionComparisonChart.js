// Composant interactif : comparaison des densités Normale (Bachelier) vs Log-Normale (Black-Scholes)
// Slider σ déformant les deux courbes en temps réel
// 'use client' obligatoire : canvas, état React

'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
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

const S0 = 100;       // Prix initial de référence
const N_POINTS = 600; // Résolution des courbes
const X_MIN = -150;   // Permet de montrer les prix négatifs (Bachelier)
const X_MAX = 400;    // Queue droite de la log-normale

// Densité de la loi Normale
function normalPdf(x, mean, std) {
  return (1 / (std * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((x - mean) / std) ** 2);
}

// Densité de la loi Log-Normale (nulle pour x ≤ 0)
function lognormalPdf(x, muLog, sigmaLog) {
  if (x <= 0) return 0;
  return (
    (1 / (x * sigmaLog * Math.sqrt(2 * Math.PI))) *
    Math.exp(-0.5 * ((Math.log(x) - muLog) / sigmaLog) ** 2)
  );
}

// Calcule les deux séries de densité pour un σ donné
function computeDensities(sigma) {
  const normalStd = sigma * S0;                      // écart-type absolu (Bachelier)
  const muLog = Math.log(S0) - (sigma * sigma) / 2; // médiane = S0 (Black-Scholes)

  const normalData = [];
  const lognormalData = [];

  for (let i = 0; i < N_POINTS; i++) {
    const x = X_MIN + (i / (N_POINTS - 1)) * (X_MAX - X_MIN);
    normalData.push({ x, y: normalPdf(x, S0, normalStd) });
    lognormalData.push({ x, y: lognormalPdf(x, muLog, sigma) });
  }

  return { normalData, lognormalData };
}

export default function DiffusionComparisonChart() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [sigma, setSigma] = useState(0.3);

  const buildChart = useCallback((s) => {
    const ctx = canvasRef.current.getContext('2d');
    if (chartRef.current) chartRef.current.destroy();

    const { normalData, lognormalData } = computeDensities(s);

    // Ligne verticale en pointillés à x = 0 (frontière prix négatifs)
    const maxY = Math.max(...normalData.map((d) => d.y), ...lognormalData.map((d) => d.y));
    const zeroLine = [
      { x: 0, y: 0 },
      { x: 0, y: maxY * 1.15 },
    ];

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Normale (Bachelier)',
            data: normalData,
            borderColor: '#2563eb', // blue-600
            borderWidth: 2,
            pointRadius: 0,
            tension: 0.3,
          },
          {
            label: 'Log-Normale (Black-Scholes)',
            data: lognormalData,
            borderColor: '#16a34a', // green-600
            borderWidth: 2,
            pointRadius: 0,
            tension: 0.3,
          },
          {
            label: 'Prix = 0 (faillite)',
            data: zeroLine,
            borderColor: '#dc2626', // red-600
            borderWidth: 1.5,
            borderDash: [6, 4],
            pointRadius: 0,
          },
        ],
      },
      options: {
        parsing: false,
        animation: false,
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            labels: { color: '#374151', font: { size: 12 }, boxWidth: 20 },
          },
          tooltip: {
            filter: (item) => item.datasetIndex !== 2, // masque le tooltip sur la ligne rouge
            callbacks: {
              title: (ctx) => `S_T = ${ctx[0].parsed.x.toFixed(1)}`,
              label: (ctx) => `${ctx.dataset.label} : densité = ${ctx.parsed.y.toFixed(6)}`,
            },
          },
        },
        scales: {
          x: {
            type: 'linear',
            min: X_MIN,
            max: X_MAX,
            title: {
              display: true,
              text: 'Prix S_T à maturité',
              color: '#6b7280',
              font: { size: 12 },
            },
            ticks: { color: '#9ca3af' },
            grid: { color: '#f3f4f6' },
          },
          y: {
            min: 0,
            title: {
              display: true,
              text: 'Densité de probabilité',
              color: '#6b7280',
              font: { size: 12 },
            },
            ticks: { color: '#9ca3af' },
            grid: { color: '#f3f4f6' },
          },
        },
      },
    });
  }, []);

  useEffect(() => {
    buildChart(sigma);
    return () => {
      chartRef.current?.destroy();
    };
  }, [sigma, buildChart]);

  return (
    <div className="border border-gray-300 rounded-xl p-6 bg-white mt-12">

      {/* En-tête */}
      <h3 className="text-base font-semibold text-gray-900 mb-5">
        Densités de probabilité — Normale vs Log-Normale
      </h3>

      {/* Graphique */}
      <canvas ref={canvasRef} />

      {/* Slider σ */}
      <div className="mt-5">
        <label className="block text-sm text-gray-600 mb-2">
          Volatilité σ = <span className="font-semibold text-gray-900">{sigma.toFixed(1)}</span>
        </label>
        <input
          type="range"
          min="0.1"
          max="1.0"
          step="0.1"
          value={sigma}
          onChange={(e) => setSigma(parseFloat(e.target.value))}
          className="w-full accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>0.1</span>
          <span>1.0</span>
        </div>
      </div>

      {/* Légende explicative */}
      <p className="text-xs text-gray-400 mt-4 leading-relaxed">
        La courbe bleue (Normale) s&apos;étend dans les prix négatifs. La ligne rouge en pointillés
        marque la frontière S_T = 0. La courbe verte (Log-Normale) s&apos;arrête strictement à zéro.
        Les deux distributions ont le même prix médian S₀ = 100 et la même volatilité σ.
      </p>

    </div>
  );
}
