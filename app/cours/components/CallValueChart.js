// Composant : prix d'un Call BS vs valeur intrinsèque — zone verte = valeur temps
// Paramètres fixes : K=100, σ=20%, r=5%, q=0, τ=1 an
// 'use client' obligatoire : canvas, refs React

'use client';

import { useEffect, useRef, useCallback } from 'react';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Filler, Tooltip, Legend);

// ── Paramètres fixes ──────────────────────────────────────────────────────────
const K     = 100;
const r     = 0.05;
const q     = 0;
const SIGMA = 0.20;
const TAU   = 1.0;
const S_MIN = 70;
const S_MAX = 130;
const N_PTS = 200;

// ── Mathématiques ─────────────────────────────────────────────────────────────

// Densité normale standard
function npdf(x) {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
}

// CDF normale standard — Abramowitz & Stegun (erreur < 7.5e-8)
function ncdf(x) {
  if (x < -8) return 0;
  if (x >  8) return 1;
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const p = t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  const cdf = 1 - npdf(x) * p;
  return x >= 0 ? cdf : 1 - cdf;
}

function bs_call(S) {
  if (S <= 0) return 0;
  const sqrtTau = Math.sqrt(TAU);
  const d1 = (Math.log(S / K) + (r - q + 0.5 * SIGMA * SIGMA) * TAU) / (SIGMA * sqrtTau);
  const d2 = d1 - SIGMA * sqrtTau;
  return S * Math.exp(-q * TAU) * ncdf(d1) - K * Math.exp(-r * TAU) * ncdf(d2);
}

function intrinsic(S) {
  return Math.max(S - K, 0);
}

// ── Composant ─────────────────────────────────────────────────────────────────

export default function CallValueChart() {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);

  const buildChart = useCallback(() => {
    const ctx = canvasRef.current.getContext('2d');
    if (chartRef.current) chartRef.current.destroy();

    // Génération des points
    const bsData        = [];
    const intrinsicData = [];

    for (let i = 0; i < N_PTS; i++) {
      const S = S_MIN + (i / (N_PTS - 1)) * (S_MAX - S_MIN);
      bsData.push({ x: S, y: bs_call(S) });
      intrinsicData.push({ x: S, y: intrinsic(S) });
    }

    // Hauteur max pour la ligne verticale K
    const maxY = Math.max(...bsData.map((d) => d.y));
    const kLine = [
      { x: K, y: 0 },
      { x: K, y: maxY * 1.15 },
    ];

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            // Dataset 0 : helper zone — même courbe BS, fill vers dataset suivant (intrinsèque)
            label: '_zone_helper',
            data: bsData,
            borderWidth: 0,
            pointRadius: 0,
            fill: '+1',
            backgroundColor: 'rgba(134, 239, 172, 0.5)',
          },
          {
            // Dataset 1 : valeur intrinsèque (cible du fill + courbe visible en pointillés)
            label: 'Valeur intrinsèque (τ = 0)',
            data: intrinsicData,
            borderColor: '#ef4444',
            borderWidth: 2,
            borderDash: [6, 4],
            pointRadius: 0,
            fill: false,
          },
          {
            // Dataset 2 : prix BS — courbe pleine rouge
            label: 'Call avant échéance (τ = 1 an)',
            data: bsData,
            borderColor: '#ef4444',
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
          },
          {
            // Dataset 3 : ligne verticale au strike K
            label: '_kline',
            data: kLine,
            borderColor: 'rgba(107, 114, 128, 0.5)',
            borderWidth: 1.5,
            borderDash: [4, 3],
            pointRadius: 0,
            fill: false,
          },
        ],
      },
      options: {
        parsing: false,
        animation: false,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              color: '#374151',
              font: { size: 12 },
              boxWidth: 20,
              // Masquer le helper de zone et la ligne K
              filter: (item) => item.datasetIndex === 1 || item.datasetIndex === 2,
            },
          },
          tooltip: {
            filter: (item) => item.datasetIndex === 1 || item.datasetIndex === 2,
            callbacks: {
              title: (ctx) => `S = ${ctx[0].parsed.x.toFixed(1)}`,
              label: (ctx) => `${ctx.dataset.label} : ${ctx.parsed.y.toFixed(2)}`,
            },
          },
        },
        scales: {
          x: {
            type: 'linear',
            min: S_MIN,
            max: S_MAX,
            title: {
              display: true,
              text: 'Cours du sous-jacent S',
              color: '#6b7280',
              font: { size: 12 },
            },
            ticks: { color: '#9ca3af' },
            grid: { color: 'rgba(0,0,0,0.06)' },
          },
          y: {
            min: 0,
            title: {
              display: true,
              text: 'Prime du Call',
              color: '#6b7280',
              font: { size: 12 },
            },
            ticks: { color: '#9ca3af' },
            grid: { color: 'rgba(0,0,0,0.06)' },
          },
        },
      },
    });
  }, []);

  useEffect(() => {
    buildChart();
    return () => {
      chartRef.current?.destroy();
    };
  }, [buildChart]);

  return (
    <div className="my-6 p-4 bg-white border border-gray-300 rounded-lg">
      <p className="text-sm font-medium text-gray-700 mb-3">
        Paramètres : K = 100, σ = 20%, r = 5%, τ = 1 an
      </p>
      <div style={{ height: '320px' }}>
        <canvas ref={canvasRef} />
      </div>
      <p className="text-sm text-gray-600 mt-3 leading-relaxed">
        La zone verte représente la valeur temps du Call : c&apos;est l&apos;écart entre le prix BS
        (courbe pleine) et la valeur intrinsèque max(S−K, 0) (pointillés). Cette valeur temps est
        maximale à la monnaie (S ≈ K) et s&apos;annule à l&apos;échéance.
      </p>
    </div>
  );
}
