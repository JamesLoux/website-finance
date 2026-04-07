// Composant interactif : décomposition du modèle de Bachelier
// Tendance μdt (orange) + Bruit σdW (bleu) = Bachelier complet (noir)
// 'use client' obligatoire : canvas, état React, génération aléatoire

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

// ── Paramètres fixes ──────────────────────────────────────────────────────────
const S0    = 100;
const MU    = 0.08;
const SIGMA = 0.15;
const N     = 252;
const DT    = 1 / 252;

// ── Box-Muller ────────────────────────────────────────────────────────────────
function boxMuller() {
  const u1 = Math.random();
  const u2 = Math.random();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

// ── Simulation ────────────────────────────────────────────────────────────────
function simulate() {
  const trend     = [];
  const noise     = [];
  const bachelier = [];

  let W = 0; // Brownien cumulé

  for (let i = 0; i <= N; i++) {
    const t = i;
    const trendVal     = S0 + MU * i * DT;
    const noiseVal     = S0 + SIGMA * W;
    const bachelierVal = S0 + MU * i * DT + SIGMA * W;

    trend.push({ x: t, y: trendVal });
    noise.push({ x: t, y: noiseVal });
    bachelier.push({ x: t, y: bachelierVal });

    if (i < N) {
      W += Math.sqrt(DT) * boxMuller();
    }
  }

  return { trend, noise, bachelier };
}

// ── Composant ─────────────────────────────────────────────────────────────────

export default function BachelierChart() {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);
  const [count, setCount] = useState(0);

  const buildChart = useCallback(() => {
    const ctx = canvasRef.current.getContext('2d');
    if (chartRef.current) chartRef.current.destroy();

    const { trend, noise, bachelier } = simulate();

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Bruit σdW (Brownien)',
            data: noise,
            borderColor: '#3b82f6',
            borderWidth: 1.5,
            pointRadius: 0,
            fill: false,
          },
          {
            label: 'Tendance μdt',
            data: trend,
            borderColor: '#f97316',
            borderWidth: 2,
            borderDash: [6, 3],
            pointRadius: 0,
            fill: false,
          },
          {
            label: 'Bachelier : dS = μdt + σdW',
            data: bachelier,
            borderColor: '#111827',
            borderWidth: 2.5,
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
            },
          },
          tooltip: {
            enabled: false,
          },
        },
        scales: {
          x: {
            type: 'linear',
            min: 0,
            max: 252,
            title: {
              display: true,
              text: 'Temps (jours)',
              color: '#6b7280',
              font: { size: 12 },
            },
            ticks: { color: '#9ca3af' },
            grid: { color: 'rgba(0,0,0,0.06)' },
          },
          y: {
            title: {
              display: true,
              text: 'Prix S',
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
  }, [count, buildChart]);

  return (
    <div className="my-6 p-4 bg-white border border-gray-300 rounded-lg">
      <p className="text-sm font-medium text-gray-700 mb-3">
        Paramètres : S₀ = 100, μ = 8%, σ = 15%, T = 1 an (252 jours)
      </p>
      <div style={{ height: '320px' }}>
        <canvas ref={canvasRef} />
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCount((c) => c + 1)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Nouvelle simulation
        </button>
      </div>
      <p className="text-sm text-gray-600 mt-3 leading-relaxed">
        Le modèle de Bachelier décompose le prix en deux forces : une dérive déterministe μdt
        (orange, pointillés) et un choc aléatoire σdW (bleu). La trajectoire noire est leur
        somme — c&apos;est le modèle arithmétique complet.
      </p>
    </div>
  );
}
