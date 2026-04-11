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

// ── Smile ─────────────────────────────────────────────────────────────────

const K_MIN = 50;
const K_MAX = 150;
const N = 500;
const K_ATM_REF = 100;

// Smile de référence : centré sur K_ATM_REF, vol ATM = 20%
function skewVol(K, center, atmVol) {
  const m = (K - center) / center;
  const slope = -0.25;
  const convexity = 0.25;
  return atmVol + slope * m + convexity * m * m;
}

const STRIKES = Array.from({ length: N + 1 }, (_, i) =>
  K_MIN + (i / N) * (K_MAX - K_MIN)
);

const ATM_VOL_REF = 0.20;

// Smile fixe
const refSmile = STRIKES.map(K => ({
  x: K,
  y: skewVol(K, K_ATM_REF, ATM_VOL_REF) * 100,
}));

// ── Composant ─────────────────────────────────────────────────────────────

export default function StickySkewChart() {
  const [spot, setSpot] = useState(100);
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const spotRef = useRef(spot);

  // Vol ATM dynamique : lit la vol sur la courbe fixe au niveau du spot
  const atmVolDyn = skewVol(spot, K_ATM_REF, ATM_VOL_REF);
  const atmVolDynPct = (atmVolDyn * 100).toFixed(1);

  // Plugin : points + ligne verticale
  const spotPlugin = {
    id: 'spotMarker',
    afterDraw(chart) {
      const { ctx, scales } = chart;
      const S = spotRef.current;

      const atmDyn = skewVol(S, K_ATM_REF, ATM_VOL_REF);
      const volRef = skewVol(S, K_ATM_REF, ATM_VOL_REF) * 100; // point sur courbe fixe

      const px = scales.x.getPixelForValue(S);
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

      // Point ATM sur smile dynamique (rouge)
      const pyDynATM = scales.y.getPixelForValue(atmDyn * 100);
      ctx.beginPath();
      ctx.arc(px, pyDynATM, 6, 0, 2 * Math.PI);
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
            label: 'Smile courant (Sticky Skew)',
            data: STRIKES.map(K => ({
              x: K,
              y: skewVol(K, spot, atmVolDyn) * 100,
            })),
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
    const atmDyn = skewVol(spot, K_ATM_REF, ATM_VOL_REF);
    chartRef.current.data.datasets[1].data = STRIKES.map(K => ({
      x: K,
      y: skewVol(K, spot, atmDyn) * 100,
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
            → vol ATM courante : <span className="font-mono text-red-600">{atmVolDynPct}%</span>
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

      {/* Graphique + légende */}
      <div className="flex flex-col xl:flex-row gap-6 items-start">
        <div className="flex-1 min-w-0">
          <canvas ref={canvasRef} height={220} />
        </div>
        <div className="xl:w-56 p-3 bg-blue-50 border border-blue-100 rounded-lg text-sm text-gray-700 shrink-0">
          <p className="font-semibold text-gray-900 mb-2">Sticky Skew</p>
          <p className="mb-2">
            Quand le spot baisse, la vol ATM monte, et vice-versa. Le smile rouge translate avec le spot ET bouge verticalement dans le sens du skew.
          </p>
          <p>
            La convexité reste inchangée, donc si le spot baisse : les options avec un strike sur l&apos;upside (au dessus du spot) voient leur vol augmenter, à l'inverse sur le downside la vol baisse par rapport au smile initial.
          </p>
          <p className="text-xs text-gray-400 mt-3">Smile stylisé · K<sub>ATM</sub> initial = 100</p>
        </div>
      </div>

    </div>
  );
}
