'use client'

import { useRef, useEffect } from 'react'
import Chart from 'chart.js/auto'

function computeCS01(spreadBps) {
  const N = 10_000_000
  const r = 0.03
  const R = 0.40
  const dt = 0.25
  const spread = spreadBps / 10000
  const lambda = spread / (1 - R)

  let annuite = 0
  for (let i = 1; i <= 20; i++) {
    const t = i * dt
    const survProb = Math.exp(-lambda * t)
    const df = Math.exp(-r * t)
    annuite += dt * survProb * df
  }
  return N * annuite * 0.0001
}

export default function CDS01Chart() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const data = Array.from({ length: 300 }, (_, i) => {
      const spread = (i + 1) * 10
      return { x: spread, y: computeCS01(spread) }
    })

    const chart = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        datasets: [
          {
            data,
            parsing: false,
            borderColor: '#2563eb',
            borderWidth: 2.5,
            tension: 0.3,
            pointRadius: 0,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              title: (items) => `Spread : ${items[0].parsed.x} bps`,
              label: (item) => `CS01 : ${Math.round(item.parsed.y).toLocaleString('fr-FR')} €`,
            },
          },
        },
        scales: {
          x: {
            type: 'linear',
            min: 10,
            max: 3000,
            title: {
              display: true,
              text: 'Spread CDS (bps)',
              color: '#6b7280',
            },
            afterBuildTicks(axis) {
              axis.ticks = [50, 500, 1000, 2000, 3000].map((v) => ({ value: v }))
            },
            ticks: {
              color: '#6b7280',
              callback: (value) => value.toLocaleString('fr-FR'),
            },
          },
          y: {
            title: {
              display: true,
              text: 'CS01 (€ par bp)',
              color: '#6b7280',
            },
            ticks: {
              color: '#6b7280',
              callback: (value) => Math.round(value).toLocaleString('fr-FR') + ' €',
            },
          },
        },
      },
      plugins: [
        {
          id: 'verticalLine300',
          beforeDraw(chart) {
            const { ctx, chartArea, scales } = chart
            const xPixel = scales.x.getPixelForValue(300)

            ctx.save()
            ctx.beginPath()
            ctx.strokeStyle = 'rgba(100,100,100,0.4)'
            ctx.lineWidth = 1
            ctx.setLineDash([4, 4])
            ctx.moveTo(xPixel, chartArea.top)
            ctx.lineTo(xPixel, chartArea.bottom)
            ctx.stroke()

            ctx.setLineDash([])
            ctx.fillStyle = 'rgba(100,100,100,0.7)'
            ctx.font = '11px sans-serif'
            ctx.textAlign = 'center'
            ctx.fillText('HY typique', xPixel, chartArea.bottom + 14)
            ctx.restore()
          },
        },
      ],
    })

    return () => chart.destroy()
  }, [])

  return (
    <div className="border border-gray-300 rounded-xl bg-white p-4 mb-4">
      <div style={{ height: '320px' }}>
        <canvas ref={canvasRef} />
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center">
        Notionnel 10 M€ — Maturité 5 ans — Recovery Rate 40 % — Taux sans risque 3 %
      </p>
    </div>
  )
}
