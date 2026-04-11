// Composant interactif : calibration du smile SABR
// 4 sliders (α, β, ρ, ν) — courbe rouge ajustable vs smile de référence bleu
// Score RMSE affiché entre le graphique et les sliders

'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const F0 = 100;
const T = 1;
const STRIKES = Array.from({ length: 16 }, (_, i) => 70 + i * 3); // 70 à 115

// Formule SABR de Hagan asymptotique
// Retourne la vol implicite en décimal (ex: 0.25 pour 25%)
function sabrVol(K, F, alpha, beta, rho, nu) {
  if (K <= 0 || F <= 0) return alpha;

  const FK = Math.sqrt(F * K);
  const logFK = Math.log(F / K);

  // Cas ATM (K ≈ F) : éviter division par zéro
  const eps = 1e-7;
  let B;
  if (Math.abs(logFK) < eps) {
    B = 1;
  } else {
    const z = (nu / alpha) * Math.pow(FK, beta) * logFK;
    const sqrtTerm = Math.sqrt(1 - 2 * rho * z + z * z);
    const chi = Math.log((sqrtTerm + z - rho) / (1 - rho));
    B = Math.abs(chi) < eps ? 1 : z / chi;
  }

  // Facteur A
  const denom =
    Math.pow(FK, 1 - beta) *
    (1 +
      Math.pow((1 - beta) * logFK, 2) / 24 +
      Math.pow((1 - beta) * logFK, 4) / 1920);
  const A = alpha / denom;

  // Correction en T
  const FKb = Math.pow(FK, 1 - beta);
  const C =
    1 +
    ((Math.pow((1 - beta) * alpha, 2)) / (24 * Math.pow(FK, 2 * (1 - beta))) +
      (rho * beta * nu * alpha) / (4 * FKb) +
      (nu * nu * (2 - 3 * rho * rho)) / 24) *
      T;

  return A * B * C;
}

// Paramètres de référence (smile de marché caché)
const REF = { alpha: 0.25, beta: 0.50, rho: -0.90, nu: 1.50 };

// Calcule les vols de référence une seule fois (stable)
const REF_VOLS = STRIKES.map((K) => sabrVol(K, F0, REF.alpha, REF.beta, REF.rho, REF.nu));
const MONEYNESS = STRIKES.map((K) => (K / F0).toFixed(2));

function getRmseColor(rmse) {
  if (rmse > 5) return { text: 'text-red-600', bar: 'bg-red-400', label: 'Loin du marché' };
  if (rmse > 2) return { text: 'text-amber-500', bar: 'bg-amber-400', label: 'Vous approchez...' };
  if (rmse > 0.5) return { text: 'text-green-600', bar: 'bg-green-500', label: 'Bonne calibration !' };
  return { text: 'text-blue-600 font-bold', bar: 'bg-blue-500', label: 'Calibration quasi-parfaite !' };
}

const SLIDERS = [
  { key: 'alpha', label: 'α', name: 'Niveau de vol ATM', min: 0.05, max: 0.80, step: 0.01, desc: 'Volatilité instantanée du forward' },
  { key: 'beta',  label: 'β', name: 'Backbone (0=Normale, 1=Log-Normale)', min: 0.0, max: 1.0, step: 0.1, desc: 'Dynamique du forward quand le marché bouge' },
  { key: 'rho',   label: 'ρ', name: 'Corrélation (Skew)', min: -0.90, max: 0.90, step: 0.05, desc: 'Penche le smile vers la gauche (ρ<0) ou la droite (ρ>0)' },
  { key: 'nu',    label: 'ν', name: 'Vol of Vol (Smile)', min: 0.0, max: 2.0, step: 0.05, desc: 'Creuse le sourire, plus ν est grand' },
];

export default function SABRCalibrationChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const [params, setParams] = useState({ alpha: 0.20, beta: 0.7, rho: 0.0, nu: 0.20 });

  // Vols utilisateur recalculées à chaque changement de params
  const userVols = useMemo(
    () => STRIKES.map((K) => sabrVol(K, F0, params.alpha, params.beta, params.rho, params.nu)),
    [params]
  );

  // RMSE en points de vol (×100 pour avoir des %)
  const rmse = useMemo(() => {
    const mse = REF_VOLS.reduce((acc, v, i) => acc + Math.pow((v - userVols[i]) * 100, 2), 0) / REF_VOLS.length;
    return Math.sqrt(mse);
  }, [userVols]);

  // Initialisation du graphique
  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: MONEYNESS,
        datasets: [
          {
            label: 'Smile de référence',
            data: REF_VOLS.map((v) => +(v * 100).toFixed(2)),
            borderColor: '#3b82f6',
            borderWidth: 2.5,
            pointRadius: 0,
            tension: 0.3,
          },
          {
            label: 'Votre calibration',
            data: userVols.map((v) => +(v * 100).toFixed(2)),
            borderColor: '#ef4444',
            borderWidth: 2,
            borderDash: [5, 3],
            pointRadius: 0,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        animation: false,
        plugins: {
          legend: { position: 'top' },
          tooltip: { mode: 'index', intersect: false },
        },
        scales: {
          x: {
            title: { display: true, text: 'Moneyness K/F₀', color: '#6b7280' },
          },
          y: {
            title: { display: true, text: 'Vol implicite σ (%)', color: '#6b7280' },
            min: 0,
            max: 30,
          },
        },
      },
    });

    return () => {
      chartInstance.current?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mise à jour de la courbe rouge à chaque changement de params
  useEffect(() => {
    if (!chartInstance.current) return;
    chartInstance.current.data.datasets[1].data = userVols.map((v) => +(v * 100).toFixed(2));
    chartInstance.current.update('none');
  }, [userVols]);

  const { text, bar, label } = getRmseColor(rmse);
  const barWidth = Math.min(100, rmse * 10);

  return (
    <div className="bg-white border border-gray-300 rounded-xl p-6 mt-6">
      <p className="text-base font-semibold text-gray-800 mb-4">Calibrez votre smile SABR</p>

      {/* Graphique */}
      <div style={{ height: 320 }}>
        <canvas ref={chartRef} />
      </div>

      {/* Score de calibration */}
      <div className="mt-5 mb-1">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-600">Erreur de calibration (RMSE)</span>
          <span className={`text-sm ${text}`}>{label} — {rmse.toFixed(2)} pts</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className={`${bar} h-2 rounded-full transition-all duration-300`}
            style={{ width: `${barWidth}%` }}
          />
        </div>
      </div>

      {/* Sliders — 2 colonnes */}
      <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-5">
        {SLIDERS.map(({ key, label: lbl, name, min, max, step, desc }) => (
          <div key={key}>
            <div className="flex justify-between items-baseline mb-1">
              <span className="font-medium text-sm text-gray-700">{lbl} — {name}</span>
              <span className="text-blue-600 font-mono text-sm">{params[key].toFixed(key === 'beta' ? 1 : 2)}</span>
            </div>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={params[key]}
              onChange={(e) => setParams((p) => ({ ...p, [key]: parseFloat(e.target.value) }))}
              className="w-full accent-blue-600"
            />
            <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
