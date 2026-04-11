'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, Tooltip, Legend);

// ── Smile de référence (fixe, centré sur K=100) ───────────────────────────

const K_MIN = 50;
const K_MAX = 150;
const N = 500;
const K_ATM_REF = 100;

function skewVol(K, center) {
  const m = (K - center) / center;
  const atmVol = 0.20;
  const slope = -0.25;
  const convexity = 0.25;
  return atmVol + slope * m + convexity * m * m;
}

const STRIKES = Array.from({ length: N + 1 }, (_, i) =>
  K_MIN + (i / N) * (K_MAX - K_MIN)
);

// Smile fixe centré sur 100
const refSmile = STRIKES.map(K => ({ x: K, y: skewVol(K, K_ATM_REF) * 100 }));

// ── Composant ─────────────────────────────────────────────────────────────

export default function StickyDeltaChart() {
  const [spot, setSpot] = useState(100);
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const spotRef = useRef(spot);

  const currentVol = (skewVol(spot, spot) * 100).toFixed(1); // ATM = toujours 20% en sticky delta

  // Plugin : point bleu (ref) + point rouge (dyn) + ligne verticale
  const spotPlugin = {
    id: 'spotMarker',
    afterDraw(chart) {
      const { ctx, scales } = chart;
      const S = spotRef.current;

      // Vol du smile dynamique au niveau du spot (toujours ATM = 20%)
      const volDyn = skewVol(S, S) * 100;
      // Vol du smile fixe au niveau du spot
      const volRef = skewVol(S, K_ATM_REF) * 100;

      const px = scales.x.getPixelForValue(S);
      const pyDyn = scales.y.getPixelForValue(volDyn);
      const pyRef = scales.y.getPixelForValue(volRef);

      ctx.save();

      // Ligne verticale
      ctx.beginPath();
      ctx.moveTo(px, scales.y.top);
      ctx.lineTo(px, scales.y.bottom);
      ctx.strokeStyle = '#6b7280';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 4]);
      ctx.stroke();

      // Point sur smile fixe (bleu)
      ctx.beginPath();
      ctx.arc(px, pyRef, 6, 0, 2 * Math.PI);
      ctx.fillStyle = '#2563eb';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.setLineDash([]);
      ctx.fill();
      ctx.stroke();

      // Point sur smile dynamique (rouge)
      ctx.beginPath();
      ctx.arc(px, pyDyn, 6, 0, 2 * Math.PI);
      ctx.fillStyle = '#dc2626';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    },
  };

  // Init
  useEffect(() => {
    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      plugins: [spotPlugin],
      data: {
        datasets: [
          {
            label: 'Smile initial (fixe)',
            data: refSmile,
            borderColor: '#2563eb',
            borderWidth: 2,
            borderDash: [4, 3],
            pointRadius: 0,
            tension: 0,
          },
          {
            label: 'Smile courant (suit le spot)',
            data: STRIKES.map(K => ({ x: K, y: skewVol(K, spot) * 100 })),
            borderColor: '#dc2626',
            borderWidth: 2,
            pointRadius: 0,
            tension: 0,
          },
        ],
      },
      options: {
        animation: false,
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: { boxWidth: 12, font: { size: 11 } },
          },
          tooltip: { enabled: false },
        },
        scales: {
          x: {
            type: 'linear',
            min: K_MIN,
            max: K_MAX,
            title: { display: true, text: 'Strike K', font: { size: 11 } },
            ticks: { stepSize: 10 },
          },
          y: {
            type: 'linear',
            min: 5,
            max: 40,
            title: { display: true, text: 'Vol implicite (%)', font: { size: 11 } },
            ticks: { callback: v => v + '%' },
          },
        },
      },
    });

    return () => chartRef.current?.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update quand spot change
  useEffect(() => {
    if (!chartRef.current) return;
    spotRef.current = spot;
    // Recalcule le smile dynamique centré sur le nouveau spot
    chartRef.current.data.datasets[1].data = STRIKES.map(K => ({
      x: K,
      y: skewVol(K, spot) * 100,
    }));
    chartRef.current.update('none');
  }, [spot]);

  return (
    <div className="my-8 p-4 bg-white border border-gray-300 rounded-xl">

      {/* Slider */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Prix du spot : <span className="font-mono text-blue-600">{spot}</span>
          <span className="text-gray-400 ml-2 font-normal">
            → vol ATM courante : <span className="font-mono text-red-600">{currentVol}%</span>
          </span>
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

      {/* Graphique + légende côte à côte */}
      <div className="flex flex-col xl:flex-row gap-6 items-start">
        <div className="flex-1 min-w-0">
          <canvas ref={canvasRef} height={220} />
        </div>
        <div className="xl:w-56 p-3 bg-blue-50 border border-blue-100 rounded-lg text-sm text-gray-700 shrink-0">
          <p className="font-semibold text-gray-900 mb-2">Sticky Delta</p>
          <p className="mb-2">
            Le smile (rouge) translate horizontalement avec le spot. La vol ATM reste toujours à 20%, mais la vol d&apos;un strike fixe change
            (elle descend quand le spot baisse et monte quand il monte).
          </p>
          <p>
            Exemple : si le spot baisse de 100 à 80, la vol implicite de votre option strike 100 baisse.
          </p>
          <p className="text-xs text-gray-400 mt-3">Smile stylisé · K<sub>ATM</sub> initial = 100</p>
        </div>
      </div>

    </div>
  );
}
