// Composant interactif : Greek en fonction de S — Call et Put côte à côte
// Zones colorées : vert au-dessus de y=0, rouge en dessous
// 'use client' obligatoire : canvas, état React

'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Filler,
  Tooltip,
} from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Filler, Tooltip);

// ── Paramètres fixes du modèle ────────────────────────────────────────────────
const K     = 100;
const r     = 0.05;
const q     = 0.02;
const SIGMA = 0.20;
const TAU   = 1.0;

// ── Mathématiques ─────────────────────────────────────────────────────────────

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

function computeGreek(S, isCall, greek) {
  if (S <= 0) return null;
  const sqrtTau = Math.sqrt(TAU);
  const d1   = (Math.log(S / K) + (r - q + 0.5 * SIGMA * SIGMA) * TAU) / (SIGMA * sqrtTau);
  const d2   = d1 - SIGMA * sqrtTau;
  const eqt  = Math.exp(-q * TAU);
  const ert  = Math.exp(-r * TAU);
  const nd1  = npdf(d1);
  const Nd1  = ncdf(d1);
  const Nnd1 = ncdf(-d1);
  const Nd2  = ncdf(d2);
  const Nnd2 = ncdf(-d2);

  switch (greek) {
    case 'Delta':   return isCall ? eqt * Nd1 : -eqt * Nnd1;
    case 'Gamma':   return eqt * nd1 / (S * SIGMA * sqrtTau);
    case 'Vega':    return S * eqt * nd1 * sqrtTau;
    case 'Theta': {
      const base = -S * eqt * nd1 * SIGMA / (2 * sqrtTau);
      return isCall
        ? base - r * K * ert * Nd2  + q * S * eqt * Nd1
        : base + r * K * ert * Nnd2 - q * S * eqt * Nnd1;
    }
    case 'Rho':     return isCall ?  K * TAU * ert * Nd2  : -K * TAU * ert * Nnd2;
    case 'Epsilon': return isCall ? -S * TAU * eqt * Nd1  :  S * TAU * eqt * Nnd1;
    case 'Vanna':   return -eqt * nd1 * d2 / SIGMA;
    case 'Volga': {
      const vega = S * eqt * nd1 * sqrtTau;
      return vega * d1 * d2 / SIGMA;
    }
    case 'Charm': {
      const denom  = 2 * TAU * SIGMA * sqrtTau;
      const common = eqt * nd1 * (2 * (r - q) * TAU - d2 * SIGMA * sqrtTau) / denom;
      return isCall ?  q * eqt * Nd1 - common : -q * eqt * Nnd1 - common;
    }
    default: return null;
  }
}

const GREEKS   = ['Delta', 'Gamma', 'Vega', 'Theta', 'Rho', 'Epsilon', 'Vanna', 'Volga', 'Charm'];
const S_VALUES = Array.from({ length: 200 }, (_, i) => i + 1);

// ── Constantes de couleur ─────────────────────────────────────────────────────
const GREEN_BG  = 'rgba(34, 197, 94, 0.15)';
const RED_BG    = 'rgba(239, 68, 68, 0.15)';
const ZERO_LINE = 'rgba(249, 115, 22, 0.8)'; // orange

// ── Fonction de construction d'un Chart ───────────────────────────────────────
function buildChart(canvas, isCall, greekName) {
  const ctx = canvas.getContext('2d');

  const raw = S_VALUES.map((S) => {
    const y = computeGreek(S, isCall, greekName);
    return (y !== null && isFinite(y) && !isNaN(y)) ? { x: S, y } : null;
  });

  // Données filtrées pour chaque zone
  const mainData = raw.map((d) => d ?? { x: 0, y: null });
  const posData  = raw.map((d) => d ? { x: d.x, y: Math.max(d.y, 0) } : { x: 0, y: null });
  const negData  = raw.map((d) => d ? { x: d.x, y: Math.min(d.y, 0) } : { x: 0, y: null });
  const zeroData = S_VALUES.map((S) => ({ x: S, y: 0 }));

  return new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [
        // Zone positive — remplissage vert au-dessus de y=0
        {
          data: posData,
          fill: 'origin',
          backgroundColor: GREEN_BG,
          borderWidth: 0,
          pointRadius: 0,
          tension: 0.2,
        },
        // Zone négative — remplissage rouge en dessous de y=0
        {
          data: negData,
          fill: 'origin',
          backgroundColor: RED_BG,
          borderWidth: 0,
          pointRadius: 0,
          tension: 0.2,
        },
        // Ligne horizontale y = 0 en pointillés orange
        {
          data: zeroData,
          borderColor: ZERO_LINE,
          borderWidth: 1.5,
          borderDash: [6, 4],
          pointRadius: 0,
          fill: false,
        },
        // Courbe principale en noir
        {
          data: mainData,
          borderColor: 'rgb(0, 0, 0)',
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.2,
          fill: false,
        },
      ],
    },
    options: {
      parsing: false,
      animation: false,
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          filter: (item) => item.datasetIndex === 3, // tooltip sur la courbe principale seulement
          callbacks: {
            title: (ctx) => `S = ${ctx[0].parsed.x}`,
            label: (ctx) => `${greekName} = ${ctx.parsed.y.toFixed(5)}`,
          },
        },
      },
      scales: {
        x: {
          type: 'linear',
          min: 1,
          max: 200,
          title: {
            display: true,
            text: 'S',
            color: '#6b7280',
            font: { size: 11 },
          },
          ticks: { color: '#9ca3af', maxTicksLimit: 6 },
          grid: { color: '#f3f4f6' },
        },
        y: {
          title: {
            display: true,
            text: greekName,
            color: '#6b7280',
            font: { size: 11 },
          },
          ticks: { color: '#9ca3af' },
          grid: { color: '#f3f4f6' },
        },
      },
    },
  });
}

// ── Composant ─────────────────────────────────────────────────────────────────
const GREEKS_LIST = GREEKS;

export default function GreeksChart() {
  const callCanvasRef = useRef(null);
  const putCanvasRef  = useRef(null);
  const callChartRef  = useRef(null);
  const putChartRef   = useRef(null);
  const [greek, setGreek] = useState('Delta');

  const rebuild = useCallback((greekName) => {
    if (callChartRef.current) callChartRef.current.destroy();
    if (putChartRef.current)  putChartRef.current.destroy();
    callChartRef.current = buildChart(callCanvasRef.current, true,  greekName);
    putChartRef.current  = buildChart(putCanvasRef.current,  false, greekName);
  }, []);

  useEffect(() => {
    rebuild(greek);
    return () => {
      callChartRef.current?.destroy();
      putChartRef.current?.destroy();
    };
  }, [greek, rebuild]);

  return (
    <div className="bg-white border border-gray-300 rounded-xl p-6 mt-10">

      {/* En-tête + sélecteur */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <h3 className="text-base font-semibold text-gray-900 flex-1">
          Visualisation des Greeks
        </h3>
        <select
          value={greek}
          onChange={(e) => setGreek(e.target.value)}
          className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          {GREEKS_LIST.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      {/* Deux graphiques côte à côte */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2 text-center">Call</p>
          <canvas ref={callCanvasRef} />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2 text-center">Put</p>
          <canvas ref={putCanvasRef} />
        </div>
      </div>

      {/* Légende des zones */}
      <p className="text-center text-sm text-gray-500 italic mt-4">
        Zone verte = long {greek} · Zone rouge = short {greek}
      </p>

      {/* Paramètres fixes */}
      <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs text-gray-400">
        <span>K = 100</span>
        <span>r = 5 %</span>
        <span>q = 2 %</span>
        <span>σ = 20 %</span>
        <span>τ = 1 an</span>
      </div>

    </div>
  );
}
