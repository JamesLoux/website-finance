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

// ── Smile réaliste (skew actions) ─────────────────────────────────────────
// Vol implicite décroissante avec légère remontée OTM Call
// Paramètres calés pour ressembler à un skew S&P typique

const K_MIN = 50;
const K_MAX = 150;
const N = 500;
const K_ATM = 100; // strike de référence

function skewVol(K) {
  const m = (K - K_ATM) / K_ATM; // moneyness centrée sur 0 à ATM
  const atmVol = 0.20;
  const slope = -0.25;      // pente du skew (négatif = vol monte quand K baisse)
  const convexity = 0.25;   // sourire résiduel
  return atmVol + slope * m + convexity * m * m;
}

const STRIKES = Array.from({ length: N + 1 }, (_, i) =>
  K_MIN + (i / N) * (K_MAX - K_MIN)
);

const smileData = STRIKES.map(K => ({ x: K, y: skewVol(K) * 100 }));

// ── Composant ─────────────────────────────────────────────────────────────

export default function StickyStrikeChart() {
  const [spot, setSpot] = useState(100);
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const spotRef = useRef(spot);

  // Vol implicite au niveau du spot courant
  const currentVol = (skewVol(spot) * 100).toFixed(1);

  // Plugin : point ATM + ligne verticale
  const spotPlugin = {
    id: 'spotMarker',
    afterDraw(chart) {
      const { ctx, scales } = chart;
      const S = spotRef.current;
      const vol = skewVol(S) * 100;
      const px = scales.x.getPixelForValue(S);
      const py = scales.y.getPixelForValue(vol);

      // Ligne verticale
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(px, scales.y.top);
      ctx.lineTo(px, scales.y.bottom);
      ctx.strokeStyle = '#6b7280';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 4]);
      ctx.stroke();

      // Point bleu sur la courbe
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, 2 * Math.PI);
      ctx.fillStyle = '#dc2626';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.setLineDash([]);
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
            label: 'Vol implicite (skew actions)',
            data: smileData,
            borderColor: '#2563eb',
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
          legend: { display: false },
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
            ticks: {
              callback: v => v + '%',
            },
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
    chartRef.current.update('none');
  }, [spot]);

  return (
    <div className="my-8 p-4 bg-white border border-gray-300 rounded-xl">

      {/* Slider */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Prix du spot : <span className="font-mono text-blue-600">{spot}</span>
          <span className="text-gray-400 ml-2 font-normal">→ vol ATM : <span className="text-blue-600 font-mono">{currentVol}%</span></span>
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

      {/* Graphique + bulle côte à côte sur xl */}
      <div className="flex flex-col xl:flex-row xl:items-center gap-4">
        <div className="xl:w-1/2">
          <canvas ref={canvasRef} height={200} />
        </div>
        <div className="xl:w-1/2 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-gray-700">
          <p className="font-semibold text-gray-900 mb-2">Sticky Strike</p>
          <p className="leading-relaxed">
            Le smile de volatilité reste fixe. Quand le spot bouge, le point bleu glisse le long d&apos;une courbe immobile, la vol implicite de chaque strike absolu est inchangée.
            Donc même si le spot baisse à 80, la vol de votre Put strike 100 (qui est passé de ATM à ITM) reste à 20%.
          </p>
          <p className="text-xs text-gray-400 mt-3">
            Smile stylisé — skew actions typique · K<sub>ATM</sub> = 100
          </p>
        </div>
      </div>
    </div>
  );
}
