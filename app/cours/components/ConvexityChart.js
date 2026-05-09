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

const NOMINAL = 100;
const TENOR = 10;
const N_POINTS = 200;
const X_MIN = 0.1;
const X_MAX = 23;

// Positions X fixes — calculées une seule fois au chargement du module
const X_VALS = Array.from({ length: N_POINTS + 1 }, (_, j) =>
  +(X_MIN + (X_MAX - X_MIN) * j / N_POINTS).toFixed(4)
);

function priceObligation(yPct, coupon) {
  const y = yPct / 100;
  let p = 0;
  for (let i = 1; i <= TENOR; i++) {
    const cf = coupon + (i === TENOR ? NOMINAL : 0);
    p += cf * Math.exp(-y * i);
  }
  return p;
}

function computeMetrics(y0Pct, coupon) {
  const y0 = y0Pct / 100;
  const P0 = priceObligation(y0Pct, coupon);
  let sensSum = 0, convSum = 0;
  for (let i = 1; i <= TENOR; i++) {
    const cf = coupon + (i === TENOR ? NOMINAL : 0);
    const pv = cf * Math.exp(-y0 * i);
    sensSum += i * pv;
    convSum += i * i * pv;
  }
  return { P0, S: sensSum / P0, Conv: convSum / P0 };
}

function buildRealData(coupon) {
  return X_VALS.map(xPct => ({ x: xPct, y: +priceObligation(xPct, coupon).toFixed(3) }));
}

function buildApproxData(y0Pct, coupon, order) {
  const { P0, S, Conv } = computeMetrics(y0Pct, coupon);
  const y0 = y0Pct / 100;
  return X_VALS.map(xPct => {
    const dy = xPct / 100 - y0;
    const val = order === 1
      ? P0 * (1 - S * dy)
      : P0 * (1 - S * dy + 0.5 * Conv * dy * dy);
    return { x: xPct, y: +val.toFixed(3) };
  });
}

export default function ConvexityChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const y0Ref = useRef(5); // lu par le plugin à chaque frame — pas de recréation

  const [y0, setY0] = useState(5);
  const [couponPct, setCouponPct] = useState(5);

  // Mis à jour synchroniquement avant chaque effet
  y0Ref.current = y0;

  const { P0, S, Conv } = computeMetrics(y0, couponPct);

  const errorAt200 = (() => {
    const pReal = priceObligation(y0 + 2, couponPct);
    const pApprox1 = P0 * (1 - S * 0.02);
    return Math.abs(pReal - pApprox1) / pReal * 100;
  })();

  // ── Initialisation du chart (une seule fois) ──
  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');
    if (!ctx) return;

    const vertLinePlugin = {
      id: 'vertLine',
      beforeDraw(chart) {
        const { ctx: c2, scales } = chart;
        if (!scales.x || !scales.y) return;
        const xPx = scales.x.getPixelForValue(y0Ref.current);
        c2.save();
        c2.beginPath();
        c2.setLineDash([5, 4]);
        c2.strokeStyle = 'rgba(100,100,100,0.5)';
        c2.lineWidth = 1;
        c2.moveTo(xPx, scales.y.top);
        c2.lineTo(xPx, scales.y.bottom);
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
            label: 'Prix réel P(y)',
            data: buildRealData(couponPct),
            borderColor: '#111827',
            borderWidth: 2.5,
            pointRadius: 0,
            tension: 0,
          },
          {
            label: 'Ordre 1 : D·dy',
            data: buildApproxData(y0, couponPct, 1),
            borderColor: '#f97316',
            borderWidth: 1.8,
            borderDash: [6, 4],
            pointRadius: 0,
            tension: 0,
          },
          {
            label: 'Ordre 2 : +½C·(dy)²',
            data: buildApproxData(y0, couponPct, 2),
            borderColor: '#3b82f6',
            borderWidth: 1.8,
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
              title: (items) => `Taux : ${items[0].parsed.x.toFixed(2)} %`,
              label: (item) => `${item.dataset.label} : ${item.parsed.y.toFixed(2)}`,
            },
          },
        },
        scales: {
          x: {
            type: 'linear',
            min: 0,
            max: 23,
            title: { display: true, text: 'Taux y (%)', color: '#6b7280' },
          },
          y: {
            type: 'linear',
            min: 0,
            max: 200,
            title: { display: true, text: 'Prix P(y)', color: '#6b7280' },
          },
        },
      },
      plugins: [vertLinePlugin],
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
    chart.data.datasets[0].data = buildRealData(couponPct);
    chart.data.datasets[1].data = buildApproxData(y0, couponPct, 1);
    chart.data.datasets[2].data = buildApproxData(y0, couponPct, 2);
    chart.update('none');
  }, [y0, couponPct]);

  return (
    <div className="bg-white border border-gray-300 rounded-xl p-6 mt-6">
      <p className="text-base font-semibold text-gray-800 mb-4">
        Prix réel vs approximations — Duration &amp; Convexité
      </p>

      <div style={{ height: 320 }}>
        <canvas ref={chartRef} />
      </div>

      {/* 3 cartes */}
      <div className="grid grid-cols-3 gap-4 mt-5">
        <div className="bg-gray-50 border border-gray-300 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-500 mb-1">Sensibilité</p>
          <p className="font-mono text-gray-900 text-sm font-semibold">{S.toFixed(2)}</p>
        </div>
        <div className="bg-gray-50 border border-gray-300 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-500 mb-1">Convexité</p>
          <p className="font-mono text-gray-900 text-sm font-semibold">{Conv.toFixed(2)}</p>
        </div>
        <div className="bg-gray-50 border border-gray-300 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-500 mb-1">Erreur Δ-hedging à +200bps</p>
          <p className="font-mono text-gray-900 text-sm font-semibold">{errorAt200.toFixed(2)} %</p>
        </div>
      </div>

      {/* Sliders — 2 colonnes */}
      <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-5">
        <div>
          <div className="flex justify-between items-baseline mb-1">
            <span className="font-medium text-sm text-gray-700">Taux central y₀</span>
            <span className="text-blue-600 font-mono text-sm">{y0.toFixed(1)} %</span>
          </div>
          <input
            type="range"
            min={1} max={15} step={0.5}
            value={y0}
            onChange={(e) => setY0(parseFloat(e.target.value))}
            className="w-full accent-blue-600"
          />
          <p className="text-gray-500 text-xs mt-0.5">Niveau de taux autour duquel on développe</p>
        </div>
        <div>
          <div className="flex justify-between items-baseline mb-1">
            <span className="font-medium text-sm text-gray-700">Coupon annuel</span>
            <span className="text-blue-600 font-mono text-sm">{couponPct.toFixed(1)} %</span>
          </div>
          <input
            type="range"
            min={0} max={10} step={0.5}
            value={couponPct}
            onChange={(e) => setCouponPct(parseFloat(e.target.value))}
            className="w-full accent-blue-600"
          />
          <p className="text-gray-500 text-xs mt-0.5">Coupon annuel en % du nominal (100)</p>
        </div>
      </div>
    </div>
  );
}
