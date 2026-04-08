'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

// ─── Utilitaires mathématiques ────────────────────────────────────────────────

function randNormal() {
  // Box-Muller
  const u = 1 - Math.random()
  const v = Math.random()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

// CDF normale — A&S 7.1.26 approxime erf(z), donc on passe x/√2
function normCDF(x) {
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741
  const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911
  const sign = x < 0 ? -1 : 1
  const z = Math.abs(x) / Math.sqrt(2)
  const t = 1 / (1 + p * z)
  const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-z * z)
  return 0.5 * (1 + sign * y)
}

function bsCall(S0, K, T, r, sigma) {
  const sqrtT = Math.sqrt(T)
  const d1 = (Math.log(S0 / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * sqrtT)
  const d2 = d1 - sigma * sqrtT
  return S0 * normCDF(d1) - K * Math.exp(-r * T) * normCDF(d2)
}

function simulatePaths(S0, K, T, r, sigma, M, steps, maxDisplay) {
  // Simule M chemins complets sur `steps` pas de temps
  // Retourne : prix MC, prix BS, et maxDisplay trajectoires pour affichage
  const dt = T / steps
  const displayPaths = []

  let sumPayoff = 0

  for (let i = 0; i < M; i++) {
    let S = S0
    const path = i < maxDisplay ? [S0] : null

    for (let j = 0; j < steps; j++) {
      const Z = randNormal()
      S = S * Math.exp((r - 0.5 * sigma ** 2) * dt + sigma * Math.sqrt(dt) * Z)
      if (path) path.push(S)
    }

    sumPayoff += Math.max(S - K, 0)
    if (path) displayPaths.push(path)
  }

  const priceMC = Math.exp(-r * T) * sumPayoff / M
  const priceBS = bsCall(S0, K, T, r, sigma)

  return { priceMC, priceBS, displayPaths }
}

// ─── Composant principal ─────────────────────────────────────────────────────

export default function MonteCarloChart() {
  const pathCanvas = useRef(null)
  const [params, setParams] = useState({ M: 1000, sigma: 0.2 })
  const [result, setResult] = useState(null)
  const [running, setRunning] = useState(false)

  const S0 = 100, K = 100, T = 1, r = 0.05, steps = 50, maxDisplay = 30

  const run = useCallback(() => {
    setRunning(true)
    // setTimeout pour laisser React re-render avant le calcul lourd
    setTimeout(() => {
      const res = simulatePaths(S0, K, T, r, params.sigma, params.M, steps, maxDisplay)
      setResult(res)
      setRunning(false)
    }, 10)
  }, [params])

  // Dessiner les trajectoires sur le canvas
  useEffect(() => {
    if (!result || !pathCanvas.current) return
    const canvas = pathCanvas.current
    const ctx = canvas.getContext('2d')
    const { width, height } = canvas
    ctx.clearRect(0, 0, width, height)

    const { displayPaths } = result
    if (!displayPaths.length) return

    // Echelle Y : min/max sur toutes les trajectoires affichées
    let minS = Infinity, maxS = -Infinity
    displayPaths.forEach(path => path.forEach(s => {
      if (s < minS) minS = s
      if (s > maxS) maxS = s
    }))
    const pad = 20
    const scaleX = (i) => pad + (i / steps) * (width - 2 * pad)
    const scaleY = (s) => height - pad - ((s - minS) / (maxS - minS || 1)) * (height - 2 * pad)

    // Ligne K (strike)
    ctx.setLineDash([4, 4])
    ctx.strokeStyle = 'rgba(239,68,68,0.5)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(pad, scaleY(K))
    ctx.lineTo(width - pad, scaleY(K))
    ctx.stroke()
    ctx.setLineDash([])

    // Trajectoires
    displayPaths.forEach((path) => {
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(59,130,246,0.25)'
      ctx.lineWidth = 1
      path.forEach((s, i) => {
        i === 0 ? ctx.moveTo(scaleX(i), scaleY(s)) : ctx.lineTo(scaleX(i), scaleY(s))
      })
      ctx.stroke()
    })

    // Légende K
    ctx.fillStyle = 'rgba(239,68,68,0.8)'
    ctx.font = '11px sans-serif'
    ctx.fillText(`K = ${K}`, width - pad - 40, scaleY(K) - 5)

  }, [result])

  // Lancer au montage et à chaque changement de paramètres
  useEffect(() => { run() }, [run])

  const slider = (label, key, min, max, step, format) => (
    <div className="mb-3">
      <div className="flex justify-between text-sm text-gray-700 mb-1">
        <span>{label}</span>
        <span className="font-medium text-blue-600">{format(params[key])}</span>
      </div>
      <input type="range" min={min} max={max} step={step}
        value={params[key]}
        onChange={e => setParams(p => ({ ...p, [key]: Number(e.target.value) }))}
        className="w-full accent-blue-600"
      />
    </div>
  )

  return (
    <div className="border border-gray-300 rounded-xl p-5 bg-white mb-6">

      {/* Graphique trajectoires */}
      <p className="text-sm font-medium text-gray-700 mb-2">
        Trajectoires simulées de <em>S</em><sub>t</sub>
        <span className="text-gray-400 font-normal ml-2">
          ({Math.min(maxDisplay, params.M)} affichées sur {params.M})
        </span>
      </p>
      <canvas ref={pathCanvas} width={600} height={220}
        className="w-full rounded-lg bg-gray-50 border border-gray-200 mb-5"
      />

      {/* Prix MC vs BS */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 bg-blue-50 border border-blue-100 rounded-lg p-4 text-center">
          <p className="text-xs text-gray-500 mb-1">Prix Monte-Carlo</p>
          <p className="text-2xl font-bold text-blue-600">
            {running ? '…' : result ? result.priceMC.toFixed(2) + ' €' : '—'}
          </p>
        </div>
        <div className="flex-1 bg-gray-50 border border-gray-300 rounded-lg p-4 text-center">
          <p className="text-xs text-gray-500 mb-1">Prix Black-Scholes (exact)</p>
          <p className="text-2xl font-bold text-gray-700">
            {result ? result.priceBS.toFixed(2) + ' €' : '—'}
          </p>
        </div>
        <div className="flex-1 bg-gray-50 border border-gray-300 rounded-lg p-4 text-center">
          <p className="text-xs text-gray-500 mb-1">Écart relatif</p>
          <p className="text-2xl font-bold text-gray-700">
            {result ? (Math.abs(result.priceMC - result.priceBS) / result.priceBS * 100).toFixed(2) + ' %' : '—'}
          </p>
        </div>
      </div>

      {/* Contrôles */}
      <div className="border-t border-gray-200 pt-4">
        <p className="text-sm text-gray-700 mb-2">Nombre de chemins (M)</p>
        <div className="flex gap-2 mb-4">
          {[1000, 10000, 100000].map(n => (
            <button
              key={n}
              onClick={() => setParams(p => ({ ...p, M: n }))}
              className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors
                ${params.M === n
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'}`}
            >
              {n.toLocaleString()}
            </button>
          ))}
        </div>
        {slider('Volatilité σ', 'sigma', 0.05, 0.80, 0.05, v => (v * 100).toFixed(0) + '%')}
        <p className="text-xs text-gray-400 mt-1">
          Paramètres fixes : S₀ = 100 €, K = 100 €, T = 1 an, r = 5%
        </p>
      </div>

      <button onClick={run} disabled={running}
        className="mt-4 w-full py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors">
        {running ? 'Calcul en cours…' : 'Relancer la simulation'}
      </button>
    </div>
  )
}
