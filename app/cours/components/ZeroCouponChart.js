'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Tooltip,
} from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Tooltip);

const N_PTS = 200;
const Y_MIN = 0;
const Y_MAX = 105;

function computeData(yDecimal, T) {
  const data = [];
  for (let i = 0; i < N_PTS; i++) {
    const t = (i / (N_PTS - 1)) * T;
    data.push({ x: t, y: 100 * Math.exp(-yDecimal * (T - t)) });
  }
  return data;
}

function formatT(T) {
  const years = Math.floor(T);
  const half  = T % 1 !== 0;
  if (years === 0) return '6 mois';
  if (!half)       return `${years} an${years > 1 ? 's' : ''}`;
  return `${years} an${years > 1 ? 's' : ''} 6 mois`;
}

export default function ZeroCouponChart() {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);
  const priceRef  = useRef(100 * Math.exp(-0.05 * 1));
  const [y, setY] = useState(5);   // rendement en %
  const [T, setT] = useState(1);   // durée en années

  useEffect(() => {
    const yDecimal = y / 100;
    priceRef.current = 100 * Math.exp(-yDecimal * T);

    const data     = computeData(yDecimal, T);
    const radii    = data.map((_, i) => (i === 0 || i === N_PTS - 1) ? 6 : 0);
    const bgColors = data.map((_, i) => {
      if (i === 0)         return '#f97316';
      if (i === N_PTS - 1) return '#16a34a';
      return 'transparent';
    });

    const ctx = canvasRef.current.getContext('2d');
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Prix du ZC',
            data,
            borderColor: '#f97316',
            borderWidth: 2.5,
            tension: 0,
            pointRadius: radii,
            pointBackgroundColor: bgColors,
            pointBorderColor: bgColors,
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
          legend: { display: false },
          tooltip: {
            filter: (item) => item.datasetIndex === 0,
            callbacks: {
              title: (items) => `t = ${items[0].parsed.x.toFixed(2)} an`,
              label: (item)  => `Prix : ${item.parsed.y.toFixed(2)} €`,
            },
          },
        },
        scales: {
          x: {
            type: 'linear',
            min: 0,
            max: T,
            title: {
              display: true,
              text: 'Temps (années)',
              color: '#6b7280',
              font: { size: 12 },
            },
            ticks: { color: '#9ca3af' },
            grid: { color: 'rgba(0,0,0,0.06)' },
          },
          y: {
            min: Y_MIN,
            max: Y_MAX,
            title: {
              display: true,
              text: 'Prix (€)',
              color: '#6b7280',
              font: { size: 12 },
            },
            ticks: {
              color: (context) => {
                const allTicks = context.chart.scales.y?.ticks;
                if (!allTicks?.length) return '#6b7280';
                const price = priceRef.current;
                let minDist = Infinity;
                let closestIdx = -1;
                allTicks.forEach((t, i) => {
                  const d = Math.abs(t.value - price);
                  if (d < minDist) { minDist = d; closestIdx = i; }
                });
                return context.index === closestIdx ? '#f97316' : '#6b7280';
              },
              font: (context) => {
                const allTicks = context.chart.scales.y?.ticks;
                if (!allTicks?.length) return { size: 11 };
                const price = priceRef.current;
                let minDist = Infinity;
                let closestIdx = -1;
                allTicks.forEach((t, i) => {
                  const d = Math.abs(t.value - price);
                  if (d < minDist) { minDist = d; closestIdx = i; }
                });
                return { weight: context.index === closestIdx ? 'bold' : 'normal', size: 11 };
              },
            },
            grid: { color: 'rgba(0,0,0,0.06)' },
          },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [y, T]);

  const price = 100 * Math.exp(-(y / 100) * T);

  return (
    <div className="my-6 p-4 bg-white border border-gray-300 rounded-xl">
      <div style={{ height: '300px' }}>
        <canvas ref={canvasRef} />
      </div>

      {/* Sliders */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600">
            Rendement exigé :{' '}
            <span className="font-medium text-gray-800">{y.toFixed(1)} %</span>
          </label>
          <input
            type="range"
            min="0"
            max="20"
            step="0.5"
            value={y}
            onChange={(e) => setY(parseFloat(e.target.value))}
            className="w-full mt-1 accent-orange-500"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600">
            Durée :{' '}
            <span className="font-medium text-gray-800">{formatT(T)}</span>
          </label>
          <input
            type="range"
            min="0.5"
            max="10"
            step="0.5"
            value={T}
            onChange={(e) => setT(parseFloat(e.target.value))}
            className="w-full mt-1 accent-blue-500"
          />
        </div>
      </div>

      {/* Carte prix */}
      <div className="mt-3 inline-block px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg">
        <span className="text-sm text-gray-500 mr-2">Prix aujourd&apos;hui :</span>
        <span className="font-mono text-orange-500 font-semibold">{price.toFixed(2)} €</span>
      </div>
    </div>
  );
}
