'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Tooltip, Legend, Filler);

// ── Black-Scholes — identique à GreeksChart.js (A&S 26.2.17) ─────────────────

function npdf(x) {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
}

function ncdf(x) {
  if (x < -8) return 0;
  if (x > 8) return 1;
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const p = t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  const cdf = 1 - npdf(x) * p;
  return x >= 0 ? cdf : 1 - cdf;
}

function bsPrice(type, S, K, r, q, sigma, T) {
  if (T <= 0 || sigma <= 0 || S <= 0 || K <= 0) {
    return type === 'Call' ? Math.max(S - K, 0) : Math.max(K - S, 0);
  }
  const sqrtT = Math.sqrt(T);
  const d1 = (Math.log(S / K) + (r - q + 0.5 * sigma * sigma) * T) / (sigma * sqrtT);
  const d2 = d1 - sigma * sqrtT;
  const eqT = Math.exp(-q * T);
  const erT = Math.exp(-r * T);
  return type === 'Call'
    ? S * eqT * ncdf(d1) - K * erT * ncdf(d2)
    : K * erT * ncdf(-d2) - S * eqT * ncdf(-d1);
}

function greekBS(name, type, S, K, r, q, sigma, T) {
  if (S <= 0 || K <= 0 || T <= 0 || sigma <= 0) return 0;
  const sqrtT = Math.sqrt(T);
  const d1 = (Math.log(S / K) + (r - q + 0.5 * sigma * sigma) * T) / (sigma * sqrtT);
  const d2 = d1 - sigma * sqrtT;
  const eqT = Math.exp(-q * T);
  const erT = Math.exp(-r * T);
  const nd1 = npdf(d1);
  const isCall = type === 'Call';
  switch (name) {
    case 'Delta': return isCall ? eqT * ncdf(d1) : -eqT * ncdf(-d1);
    case 'Gamma': return eqT * nd1 / (S * sigma * sqrtT);
    case 'Vega':  return S * eqT * nd1 * sqrtT;
    case 'Theta': {
      const base = -S * eqT * nd1 * sigma / (2 * sqrtT);
      return isCall
        ? base - r * K * erT * ncdf(d2)  + q * S * eqT * ncdf(d1)
        : base + r * K * erT * ncdf(-d2) - q * S * eqT * ncdf(-d1);
    }
    default: return 0;
  }
}

// ── Helpers numériques pour l'affichage au spot ───────────────────────────────

// Scaling trading floor : Greek BS → euros (N = montant / S, fixe par trade)
function scaleEur(gName, t) {
  const N   = t.montant / t.S;
  const sgn = t.sens === 'Short' ? -1 : 1;
  switch (gName) {
    case 'Delta': return N * sgn;
    case 'Gamma': return N * t.S * 0.01 * sgn;   // = montant × 1% × sgn
    case 'Vega':  return N * 0.01 * sgn;
    case 'Theta': return (N / 365) * sgn;
    default:      return sgn;
  }
}

function getGreekAtSpot(trade, greekName) {
  const raw = greekBS(greekName, trade.type, trade.S, trade.K, trade.r, trade.q, trade.sigma, trade.T);
  return raw * scaleEur(greekName, trade);
}

function signCls(v) {
  if (v > 1e-9) return 'text-green-700';
  if (v < -1e-9) return 'text-red-700';
  return 'text-gray-500';
}

function fmtG(v) { return (v >= 0 ? '+' : '') + v.toFixed(4); }

// ── Constantes ────────────────────────────────────────────────────────────────

const N_PTS      = 200;
const M_ARR      = Array.from({ length: N_PTS }, (_, i) => 0.5 + i / (N_PTS - 1));
const GREEK_KEYS   = ['Delta', 'Gamma', 'Vega', 'Theta'];
const GREEK_LABELS = { Delta: 'Delta (€)', Gamma: 'Gamma (€)', Vega: 'Vega (€)', Theta: 'Theta (€/j)' };
const COLORS     = ['#2563eb', '#ef4444'];

const DEFAULT_FORM = {
  type: 'Call', sens: 'Long',
  S: '100', K: '100', sigma: '20', T: '1', q: '0', r: '5', montant: '10000',
};

// ── Construction des datasets (hors composant) ────────────────────────────────

// Deux datasets helper pour les zones colorées : vert au-dessus de 0, rouge en dessous
function fillDatasets(refData) {
  return [
    {
      label: '_fill_pos',
      data: refData.map(d => ({ x: d.x, y: Math.max(d.y, 0) })),
      backgroundColor: 'rgba(34, 197, 94, 0.12)',
      borderWidth: 0, pointRadius: 0, fill: 'origin', tension: 0.2,
    },
    {
      label: '_fill_neg',
      data: refData.map(d => ({ x: d.x, y: Math.min(d.y, 0) })),
      backgroundColor: 'rgba(239, 68, 68, 0.10)',
      borderWidth: 0, pointRadius: 0, fill: 'origin', tension: 0.2,
    },
  ];
}

function buildDatasets(gName, trades) {
  const curve = (t) => M_ARR.map(m => ({
    x: m,
    y: greekBS(gName, t.type, m * t.K, t.K, t.r, t.q, t.sigma, t.T) * scaleEur(gName, t),
  }));
  const spotPt = (t, color) => ({
    label: '_spot',
    data: [{ x: t.S / t.K, y: greekBS(gName, t.type, t.S, t.K, t.r, t.q, t.sigma, t.T) * scaleEur(gName, t) }],
    borderColor: color, backgroundColor: color,
    pointRadius: 6, borderWidth: 0, fill: false, showLine: false,
  });

  if (trades.length === 1) {
    const t = trades[0];
    const refData = curve(t);
    return [
      ...fillDatasets(refData),
      { label: `${t.sens} ${t.type}`, data: refData, borderColor: COLORS[0], borderWidth: 2, pointRadius: 0, tension: 0.2, fill: false },
      spotPt(t, COLORS[0]),
    ];
  }

  const d0 = curve(trades[0]);
  const d1 = curve(trades[1]);
  const aggData = M_ARR.map((m, i) => ({ x: m, y: d0[i].y + d1[i].y }));

  return [
    ...fillDatasets(aggData),
    { label: `T1: ${trades[0].sens} ${trades[0].type}`, data: d0, borderColor: COLORS[0], borderWidth: 1.5, borderDash: [5, 4], pointRadius: 0, tension: 0.2, fill: false },
    spotPt(trades[0], COLORS[0]),
    { label: `T2: ${trades[1].sens} ${trades[1].type}`, data: d1, borderColor: COLORS[1], borderWidth: 1.5, borderDash: [5, 4], pointRadius: 0, tension: 0.2, fill: false },
    spotPt(trades[1], COLORS[1]),
    { label: 'Agrégé', data: aggData, borderColor: '#111827', borderWidth: 2.5, pointRadius: 0, tension: 0.2, fill: false },
  ];
}

// ── Composant principal ───────────────────────────────────────────────────────

export default function SimulateurPage() {
  const [trades, setTrades]               = useState([]);
  const [modalOpen, setModalOpen]         = useState(false);
  const [formData, setFormData]           = useState(DEFAULT_FORM);
  const [visibleGreeks, setVisibleGreeks] = useState({ Delta: true, Gamma: true, Vega: true, Theta: true });
  const [infoOpen, setInfoOpen]           = useState(false);

  // Canvas refs
  const cDelta = useRef(null); const cGamma = useRef(null);
  const cVega  = useRef(null); const cTheta = useRef(null);
  // Chart instance refs
  const iDelta = useRef(null); const iGamma = useRef(null);
  const iVega  = useRef(null); const iTheta = useRef(null);
  // Ref partagée avec le plugin ligne verticale
  const tradesRef = useRef(trades);

  const canvases = [cDelta, cGamma, cVega, cTheta];
  const charts   = [iDelta, iGamma, iVega, iTheta];

  useEffect(() => { tradesRef.current = trades; }, [trades]);

  // ── Calcul temps réel dans la modale ───────────────────────────────────────
  const preview = (() => {
    const S      = parseFloat(formData.S);
    const K      = parseFloat(formData.K);
    const sigma  = parseFloat(formData.sigma) / 100;
    const T      = parseFloat(formData.T);
    const q      = parseFloat(formData.q) / 100 || 0;
    const r      = parseFloat(formData.r) / 100 || 0;
    const montant = parseFloat(formData.montant);
    if (!(S > 0 && K > 0 && sigma > 0 && T > 0 && montant > 0)) return { prime: null, contrats: null, S, K, sigma, T, q, r, montant };
    const prime    = bsPrice(formData.type, S, K, r, q, sigma, T);
    const contrats = prime > 0 ? Math.round(montant / (prime * 100)) : null;
    return { prime, contrats, S, K, sigma, T, q, r, montant };
  })();

  const canSubmit = !!(preview.prime && preview.prime > 0 && preview.contrats && preview.contrats > 0);

  function update(field, val) { setFormData(p => ({ ...p, [field]: val })); }

  function openModal() {
    const base = { ...DEFAULT_FORM };
    if (trades.length > 0) base.r = String(+(trades[0].r * 100).toFixed(2));
    setFormData(base);
    setModalOpen(true);
  }

  function submitTrade() {
    if (!canSubmit) return;
    const { prime, contrats, S, K, sigma, T, q, r, montant } = preview;
    setTrades(p => [...p, { type: formData.type, sens: formData.sens, S, K, sigma, T, q, r, montant, prime, contrats }]);
    setModalOpen(false);
  }

  // ── Rebuild des graphiques ─────────────────────────────────────────────────
  useEffect(() => {
    GREEK_KEYS.forEach((name, idx) => {
      charts[idx].current?.destroy();
      charts[idx].current = null;
      if (!visibleGreeks[name] || !canvases[idx].current || trades.length === 0) return;

      const vlinePlugin = {
        id: `vl_${name}`,
        beforeDraw({ ctx, scales }) {
          ctx.save();

          // Ligne horizontale y = 0
          const y0 = scales.y.getPixelForValue(0);
          ctx.beginPath();
          ctx.moveTo(scales.x.left, y0);
          ctx.lineTo(scales.x.right, y0);
          ctx.strokeStyle = 'rgba(100, 100, 100, 0.35)';
          ctx.lineWidth = 1;
          ctx.setLineDash([]);
          ctx.globalAlpha = 1;
          ctx.stroke();

          // Lignes verticales au spot de chaque trade
          const trs = tradesRef.current;
          if (trs.length) {
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 3]);
            ctx.globalAlpha = 0.45;
            trs.forEach((t, i) => {
              const xPx = scales.x.getPixelForValue(t.S / t.K);
              ctx.strokeStyle = COLORS[i];
              ctx.beginPath();
              ctx.moveTo(xPx, scales.y.top);
              ctx.lineTo(xPx, scales.y.bottom);
              ctx.stroke();
            });
          }

          ctx.restore();
        },
      };

      charts[idx].current = new Chart(canvases[idx].current, {
        type: 'line',
        plugins: [vlinePlugin],
        data: { datasets: buildDatasets(name, trades) },
        options: {
          parsing: false,
          animation: false,
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: { boxWidth: 10, font: { size: 10 }, filter: item => !item.text.startsWith('_') },
            },
            tooltip: {
              filter: item => !item.dataset.label?.startsWith('_'),
              callbacks: {
                title: items => `m = ${items[0].parsed.x.toFixed(3)}`,
                label: item  => `${item.dataset.label}: ${item.parsed.y.toFixed(4)}`,
              },
            },
          },
          scales: {
            x: {
              type: 'linear', min: 0.5, max: 1.5,
              title: { display: true, text: 'Moneyness S/K', font: { size: 10 }, color: '#6b7280' },
              ticks: { color: '#9ca3af', maxTicksLimit: 7 },
              grid: { color: '#f3f4f6' },
            },
            y: {
              title: { display: true, text: GREEK_LABELS[name] || name, font: { size: 10 }, color: '#6b7280' },
              ticks: { color: '#9ca3af', maxTicksLimit: 6 },
              grid: { color: '#f3f4f6' },
            },
          },
        },
      });
    });

    return () => {
      charts.forEach(c => { c.current?.destroy(); c.current = null; });
    };
  }, [trades, visibleGreeks]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Helpers JSX ───────────────────────────────────────────────────────────
  const inputCls = (locked) =>
    `w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${
      locked ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 'border-gray-300 text-gray-900 bg-white'
    }`;

  const INPUTS = [
    { field: 'S',       label: 'Cours actuel (S)',           step: '1'    },
    { field: 'K',       label: 'Strike (K)',                  step: '1'    },
    { field: 'sigma',   label: 'Volatilité annuelle σ (%)',   step: '0.5'  },
    { field: 'T',       label: 'Maturité T (années)',         step: '0.1'  },
    { field: 'q',       label: 'Dividende continu q (%)',     step: '0.1'  },
    { field: 'r',       label: 'Taux sans risque r (%)',      step: '0.1', lock: trades.length > 0 },
    { field: 'montant', label: 'Montant de la position (€)',  step: '1000' },
  ];

  // ── Rendu ─────────────────────────────────────────────────────────────────
  return (
    <div className="bg-gray-50 min-h-full py-12 px-6">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-1">Simulateur de positions</h1>
            <p className="text-gray-500 text-sm">Visualisez l&apos;exposition aux Greeks de votre book d&apos;options.</p>
          </div>
          {trades.length < 2 && (
            <button
              onClick={openModal}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-sm"
            >
              {trades.length === 0 ? 'Ouvrir un trade' : 'Ajouter un trade'}
            </button>
          )}
        </div>

        {/* ── Book de trades ── */}
        {trades.length > 0 && (
          <div className="flex flex-wrap gap-4 mb-8">
            {trades.map((t, idx) => (
              <div
                key={idx}
                className={`relative flex-1 min-w-64 bg-white border border-gray-300 rounded-xl p-4 border-l-4 ${idx === 0 ? 'border-l-blue-500' : 'border-l-red-500'}`}
              >
                <button
                  onClick={() => setTrades(p => p.filter((_, i) => i !== idx))}
                  aria-label="Fermer"
                  className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full text-xl leading-none"
                >
                  ×
                </button>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-bold uppercase tracking-wide ${idx === 0 ? 'text-blue-600' : 'text-red-500'}`}>
                    Trade {idx + 1}
                  </span>
                  <span className={`text-xs rounded-full px-2 py-0.5 font-medium ${t.sens === 'Long' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {t.sens}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-700 rounded-full px-2 py-0.5">{t.type}</span>
                </div>
                <div className="grid grid-cols-4 gap-3 text-xs mb-3">
                  {[['S', t.S], ['K', t.K], ['σ', `${Math.round(t.sigma * 100)}%`], ['T', `${t.T}a`]].map(([lbl, val]) => (
                    <div key={lbl}>
                      <div className="text-gray-400 mb-0.5">{lbl}</div>
                      <div className="font-mono font-semibold text-gray-800">{val}</div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-5 text-xs pt-3 border-t border-gray-100">
                  <div>
                    <div className="text-gray-400 mb-0.5">Prime</div>
                    <div className="font-mono font-semibold text-gray-900">{t.prime.toFixed(2)} €</div>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-0.5">Contrats</div>
                    <div className="font-mono font-semibold text-gray-900">{t.contrats}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-0.5">Montant</div>
                    <div className="font-mono font-semibold text-gray-900">{t.montant.toLocaleString('fr-FR')} €</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Zone graphiques ── */}
        <div>
          {/* Checkboxes + valeurs au spot */}
          <div className="flex flex-wrap items-start gap-5 mb-5">
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-sm font-semibold text-gray-700">Afficher :</span>
              <button
                onClick={() => setInfoOpen(true)}
                aria-label="Informations sur le calcul des Greeks"
                className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-full text-sm leading-none"
              >ⓘ</button>
            </div>
            {GREEK_KEYS.map(name => {
              const v1 = trades.length > 0 ? getGreekAtSpot(trades[0], name) : null;
              const v2 = trades.length > 1 ? getGreekAtSpot(trades[1], name) : null;
              const aggV = v2 !== null ? v1 + v2 : null;
              return (
                <div key={name} className="flex items-start gap-1.5">
                  <label className="flex items-center gap-1.5 cursor-pointer mt-0.5">
                    <input
                      type="checkbox"
                      checked={visibleGreeks[name]}
                      onChange={e => setVisibleGreeks(p => ({ ...p, [name]: e.target.checked }))}
                      className="accent-blue-600 w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">{name}</span>
                  </label>
                  {v1 !== null && (
                    <div className="inline-flex flex-col items-start ml-1 text-xs font-mono leading-tight">
                      <span className="flex items-center gap-1">
                        <span className="text-blue-500">●</span>
                        <span className={signCls(v1)}>{fmtG(v1)}</span>
                      </span>
                      {aggV !== null && (
                        <>
                          <span className="flex items-center gap-1">
                            <span className="text-red-500">●</span>
                            <span className={signCls(v2)}>{fmtG(v2)}</span>
                          </span>
                          <div className="border-t border-gray-400 w-full my-0.5" />
                          <span className={`pl-3 ${signCls(aggV)}`}>{fmtG(aggV)}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* État vide */}
          {trades.length === 0 && (
            <div className="bg-white border border-gray-300 rounded-xl p-16 text-center">
              <p className="text-gray-400 text-base mb-2">Aucune position ouverte</p>
              <p className="text-gray-400 text-sm mb-6">
                Cliquez sur &quot;Ouvrir un trade&quot; pour visualiser votre exposition aux Greeks.
              </p>
              <button
                onClick={openModal}
                className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Ouvrir un trade
              </button>
            </div>
          )}

          {/* Grille graphiques */}
          {trades.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {GREEK_KEYS.map((name, idx) =>
                visibleGreeks[name] ? (
                  <div key={name} className="bg-white border border-gray-300 rounded-xl p-4">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">{name}</h3>
                    <div style={{ height: '220px', position: 'relative' }}>
                      <canvas ref={canvases[idx]} />
                    </div>
                  </div>
                ) : null
              )}
            </div>
          )}
        </div>

      </div>

      {/* ── Modale info ── */}
      {infoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setInfoOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-8 overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold text-gray-900 mb-5">Comment sont calculés les Greeks ?</h2>
            <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
              <div>
                <p className="font-semibold text-gray-900 mb-2">Greeks en euros — convention trading floor</p>
                <p>Les formules de Black-Scholes donnent des Greeks pour une unité de sous-jacent. Pour obtenir l&apos;exposition réelle en euros, comme sur un vrai système de risk, chaque Greek est converti selon la taille de la position.</p>
                <p className="mt-2">On définit <code className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">N = Montant / S</code>, le nombre d&apos;unités du sous-jacent que représente la position.</p>
                <div className="mt-3 space-y-1.5">
                  <p><code className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">Delta (€) = Δ_BS × N</code> : gain ou perte si le spot monte d&apos;une unité</p>
                  <p><code className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">Gamma (€) = Γ_BS × N × S × 1%</code> : gain ou perte si le spot bouge de 1%</p>
                  <p><code className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">Vega (€) = 𝒱_BS × N × 1%</code> : gain ou perte si la volatilité monte d&apos;un point</p>
                  <p><code className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">Theta (€) = Θ_BS × N / 365</code> : gain ou perte par jour calendaire</p>
                </div>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Agrégation du book</p>
                <p>Les Greeks du book sont la somme des Greeks en euros de chaque position — exactement comme un trader lit son risk agrégé.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Courbes en fonction de la moneyness</p>
                <p>L&apos;axe X est la moneyness S/K, de 0,5 à 1,5. Pour chaque point, S varie autour du K de chaque trade via <code className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">S = moneyness × K</code>, tous les autres paramètres restant fixes. Le point coloré indique la position réelle du spot de chaque trade. En réalité la courbe noire peut indiquer le niveau du greek seulement si les deux points sont au même niveau de moneyness.</p>
              </div>
            </div>
            <button
              onClick={() => setInfoOpen(false)}
              className="mt-6 w-full bg-gray-100 text-gray-700 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* ── Modale trade ── */}
      <div className={`fixed inset-0 z-50 ${!modalOpen ? 'pointer-events-none' : ''}`}>
        {/* Fond */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${modalOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setModalOpen(false)}
        />
        {/* Panneau */}
        <div
          className={`absolute right-0 top-0 h-full w-96 bg-white shadow-2xl overflow-y-auto transition-transform duration-300 ${modalOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="p-6">
            {/* En-tête modale */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {trades.length === 0 ? 'Ouvrir un trade' : 'Ajouter un trade'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full text-xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-5">
              {/* Toggle Type */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Type</p>
                <div className="flex gap-2">
                  {['Call', 'Put'].map(opt => (
                    <button key={opt} type="button" onClick={() => update('type', opt)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${formData.type === opt ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggle Sens */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Sens</p>
                <div className="flex gap-2">
                  {['Long', 'Short'].map(opt => (
                    <button key={opt} type="button" onClick={() => update('sens', opt)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${formData.sens === opt ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Champs numériques */}
              {INPUTS.map(({ field, label, step, lock }) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    type="number"
                    step={step}
                    min="0"
                    value={formData[field]}
                    onChange={e => !lock && update(field, e.target.value)}
                    disabled={lock}
                    className={inputCls(lock)}
                  />
                  {lock && (
                    <p className="text-xs text-gray-400 mt-1">Partagé avec le trade 1 pour cohérence du pricing.</p>
                  )}
                </div>
              ))}
            </div>

            {/* Aperçu prime */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Prime BS calculée</span>
                <span className="font-mono font-bold text-blue-700 text-lg">
                  {preview.prime !== null && preview.prime >= 0 ? `${preview.prime.toFixed(2)} €` : '—'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Nombre de contrats</span>
                <span className="font-mono font-semibold text-gray-700">
                  {preview.contrats && preview.contrats > 0 ? preview.contrats : '—'}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-2">montant ÷ (prime × 100), arrondi à l&apos;entier.</p>
            </div>

            {/* Bouton soumettre */}
            <button
              onClick={submitTrade}
              disabled={!canSubmit}
              className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Lancer mon trade →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
