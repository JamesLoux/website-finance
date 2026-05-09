'use client';

import { useEffect, useRef, useState } from 'react';
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

const NOMINAL = 100;
const TENOR = 10;
const N_POINTS = 300;
const X_MIN = 0.5;
const X_MAX = 10;
const CALL_PRICE = 100.5;

// X positions computed once
const X_VALS = Array.from({ length: N_POINTS }, (_, i) =>
  +(X_MIN + (X_MAX - X_MIN) * i / (N_POINTS - 1)).toFixed(4)
);

function priceBond(yPct, couponPct) {
  const y = yPct / 100;
  let p = 0;
  for (let i = 1; i <= TENOR; i++) {
    p += couponPct * Math.exp(-y * i);
  }
  p += NOMINAL * Math.exp(-y * TENOR);
  return p;
}

// Seuil de rappel = coupon : l'émetteur rappelle quand y < coupon (bond au-dessus du pair)
function priceCallable(yPct, couponPct) {
  const p = priceBond(yPct, couponPct);
  return yPct < couponPct ? Math.min(p, CALL_PRICE) : p;
}

function buildBondData(couponPct) {
  return X_VALS.map(x => ({ x, y: +priceBond(x, couponPct).toFixed(3) }));
}

function buildCallableData(couponPct) {
  return X_VALS.map(x => ({ x, y: +priceCallable(x, couponPct).toFixed(3) }));
}

export default function CallableBondChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const marketRateRef = useRef(4); // lu par le plugin — pas de recréation du chart

  const [coupon, setCoupon] = useState(5);
  const [marketRate, setMarketRate] = useState(4);

  // Mis à jour synchroniquement dans le corps du composant
  marketRateRef.current = marketRate;

  // Cartes : valeurs dérivées de l'état courant
  const pBond = priceBond(marketRate, coupon);
  const pCall = priceCallable(marketRate, coupon);
  const optionValue = pBond - pCall; // ≥ 0
  const gainBps = (coupon - marketRate) * 100; // positif = émetteur a intérêt à rappeler

  // ── Initialisation du chart (une seule fois) ──
  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');
    if (!ctx) return;

    const vertLinePlugin = {
      id: 'marketRateLine',
      beforeDraw(chart) {
        const { ctx: c2, scales } = chart;
        if (!scales.x || !scales.y) return;
        const xPx = scales.x.getPixelForValue(marketRateRef.current);
        c2.save();
        c2.beginPath();
        c2.setLineDash([5, 4]);
        c2.strokeStyle = 'rgba(37,99,235,0.45)';
        c2.lineWidth = 1.5;
        c2.moveTo(xPx, scales.y.top);
        c2.lineTo(xPx, scales.y.bottom);
        c2.stroke();
        c2.setLineDash([]);
        c2.restore();
      },
    };

    const initialCoupon = 5;

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            // Dataset 0 : Callable Bond (bleu) — dessiné en premier, sous le noir
            label: 'Callable Bond',
            data: buildCallableData(initialCoupon),
            borderColor: '#2563eb',
            borderWidth: 2.5,
            pointRadius: 0,
            tension: 0,
            fill: false,
          },
          {
            // Dataset 1 : helper de fill (données Callable = base basse) — remplit vers Bond
            label: "Valeur de l'option vendue",
            data: buildCallableData(initialCoupon),
            borderColor: 'rgba(134,239,172,0.7)',
            borderWidth: 1,
            borderDash: [3, 3],
            pointRadius: 0,
            tension: 0,
            fill: '+1',                               // remplit vers dataset 2 (Bond)
            backgroundColor: 'rgba(134,239,172,0.35)',
          },
          {
            // Dataset 2 : Bond classique (noir) — dessiné en dernier, sur le bleu
            label: 'Bond classique',
            data: buildBondData(initialCoupon),
            borderColor: '#111827',
            borderWidth: 2.5,
            pointRadius: 0,
            tension: 0,
            fill: false,
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
            filter: (item) => item.datasetIndex !== 1, // masque le helper fill
            callbacks: {
              title: (items) => `Taux : ${items[0].parsed.x.toFixed(2)} %`,
              label: (item) => `${item.dataset.label} : ${item.parsed.y.toFixed(2)}`,
            },
          },
        },
        scales: {
          x: {
            type: 'linear',
            min: X_MIN,
            max: X_MAX,
            title: { display: true, text: 'Taux y (%)', color: '#6b7280' },
          },
          y: {
            type: 'linear',
            min: 60,
            max: 140,
            title: { display: true, text: 'Prix (% du nominal)', color: '#6b7280' },
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
    chart.data.datasets[0].data = buildCallableData(coupon);
    chart.data.datasets[1].data = buildCallableData(coupon); // base basse du fill = Callable
    chart.data.datasets[2].data = buildBondData(coupon);
    chart.update('none');
  }, [coupon, marketRate]);

  return (
    <div className="bg-white border border-gray-300 rounded-xl p-4 mt-6">
      <p className="text-base font-semibold text-gray-800 mb-4">
        Bond classique vs Callable Bond — La convexité négative
      </p>

      <div style={{ height: 320 }}>
        <canvas ref={chartRef} />
      </div>

      {/* 2 cartes */}
      <div className="grid grid-cols-2 gap-4 mt-5">
        <div className="bg-gray-50 border border-gray-300 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-500 mb-1">Valeur de l&apos;option au taux actuel</p>
          <p className={`font-mono text-sm font-semibold ${optionValue > 0.005 ? 'text-green-600' : 'text-gray-400'}`}>
            {optionValue > 0.005 ? '+' : ''}{optionValue.toFixed(2)}
          </p>
        </div>
        <div className="bg-gray-50 border border-gray-300 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-500 mb-1">Gain si rappel</p>
          {gainBps > 0 ? (
            <p className="font-mono text-sm font-semibold text-green-600">
              +{gainBps.toFixed(0)} bps
            </p>
          ) : (
            <p className="font-mono text-sm font-semibold text-red-500">
              L&apos;émetteur ne rappelle pas
            </p>
          )}
        </div>
      </div>

      {/* Sliders */}
      <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-4">
        <div>
          <div className="flex justify-between items-baseline mb-1">
            <span className="font-medium text-sm text-gray-700">Coupon annuel</span>
            <span className="text-blue-600 font-mono text-sm">{coupon.toFixed(1)} %</span>
          </div>
          <input
            type="range"
            min={1} max={10} step={0.5}
            value={coupon}
            onChange={(e) => setCoupon(parseFloat(e.target.value))}
            className="w-full accent-blue-600"
          />
          <p className="text-gray-500 text-xs mt-0.5">Coupon annuel en % du nominal (100)</p>
        </div>
        <div>
          <div className="flex justify-between items-baseline mb-1">
            <span className="font-medium text-sm text-gray-700">Taux de marché actuel</span>
            <span className="text-blue-600 font-mono text-sm">{marketRate.toFixed(2)} %</span>
          </div>
          <input
            type="range"
            min={0.5} max={10} step={0.25}
            value={marketRate}
            onChange={(e) => setMarketRate(parseFloat(e.target.value))}
            className="w-full accent-blue-600"
          />
          <p className="text-gray-500 text-xs mt-0.5">Taux aujourd&apos;hui — déplace la ligne verticale</p>
        </div>
      </div>
    </div>
  );
}
