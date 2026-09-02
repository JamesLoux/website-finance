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
const MAX_TRADES   = 4;
const TRADE_COLORS = ['#2563eb', '#dc2626', '#16a34a', '#d97706'];

// Plus petit slot libre (0 → 3), null si le book est plein
function firstFreeSlot(trades) {
  for (let s = 0; s < MAX_TRADES; s++) if (!trades.some(t => t.slot === s)) return s;
  return null;
}

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

function buildDatasets(gName, trades, aggOnly) {
  const curve = (t) => M_ARR.map(m => ({
    x: m,
    y: greekBS(gName, t.type, m * t.K, t.K, t.r, t.q, t.sigma, t.T) * scaleEur(gName, t),
  }));
  const spotPt = (t) => ({
    label: '_spot',
    data: [{ x: t.S / t.K, y: greekBS(gName, t.type, t.S, t.K, t.r, t.q, t.sigma, t.T) * scaleEur(gName, t) }],
    borderColor: TRADE_COLORS[t.slot], backgroundColor: TRADE_COLORS[t.slot],
    pointRadius: 6, borderWidth: 0, fill: false, showLine: false,
  });

  if (trades.length === 1) {
    const t = trades[0];
    const refData = curve(t);
    return [
      ...fillDatasets(refData),
      { label: `${t.sens} ${t.type}`, data: refData, borderColor: TRADE_COLORS[t.slot], borderWidth: 2, pointRadius: 0, tension: 0.2, fill: false },
      spotPt(t),
    ];
  }

  const curves  = trades.map(curve);
  const aggData = M_ARR.map((m, i) => ({ x: m, y: curves.reduce((s, c) => s + c[i].y, 0) }));

  // Une courbe pointillée + un point au spot par trade, sauf en mode « Agrégé seul »
  const individuels = aggOnly ? [] : trades.flatMap((t, i) => ([
    {
      label: `T${t.slot + 1}: ${t.sens} ${t.type}`, data: curves[i],
      borderColor: TRADE_COLORS[t.slot], borderWidth: 1.5, borderDash: [5, 4],
      pointRadius: 0, tension: 0.2, fill: false,
    },
    spotPt(t),
  ]));

  return [
    ...fillDatasets(aggData),
    ...individuels,
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
  const [aggOnly, setAggOnly]             = useState(false);
  const [editingId, setEditingId]         = useState(null);   // null = mode création
  const [sameUnderlying, setSameUnderlying] = useState(true);

  // Canvas refs
  const cDelta = useRef(null); const cGamma = useRef(null);
  const cVega  = useRef(null); const cTheta = useRef(null);
  // Chart instance refs
  const iDelta = useRef(null); const iGamma = useRef(null);
  const iVega  = useRef(null); const iTheta = useRef(null);
  // Ref partagée avec le plugin ligne verticale
  const tradesRef = useRef(trades);

  // Identifiants de trade, stables sur toute la vie de la page
  const nextId = useRef(1);

  const canvases = [cDelta, cGamma, cVega, cTheta];
  const charts   = [iDelta, iGamma, iVega, iTheta];

  // Assignée dans le corps du composant : le plugin lit toujours la valeur courante
  tradesRef.current = trades;

  // Le book est trié par slot : le trade de référence est donc trades[0]
  const refTrade     = trades.length > 0 ? trades[0] : null;
  const editingTrade = editingId !== null ? trades.find(t => t.id === editingId) : null;
  // r est éditable en création si le book est vide, en édition sur le seul trade de référence
  const rLocked = editingId === null
    ? trades.length > 0
    : !!(refTrade && editingTrade && editingTrade.id !== refTrade.id);

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

  const pct = (v) => String(+(v * 100).toFixed(4));

  function openCreate() {
    if (trades.length >= MAX_TRADES) return;
    const base = { ...DEFAULT_FORM };
    if (refTrade) {
      base.r = pct(refTrade.r);
      // Défaut « même sous-jacent » : S, σ et q hérités, mais librement modifiables
      base.S     = String(refTrade.S);
      base.sigma = pct(refTrade.sigma);
      base.q     = pct(refTrade.q);
    }
    setSameUnderlying(true);
    setEditingId(null);
    setFormData(base);
    setModalOpen(true);
  }

  function openEdit(t) {
    setEditingId(t.id);
    setFormData({
      type: t.type, sens: t.sens,
      S: String(t.S), K: String(t.K), sigma: pct(t.sigma),
      T: String(t.T), q: pct(t.q), r: pct(t.r), montant: String(t.montant),
    });
    setModalOpen(true);
  }

  // Toggle « même sous-jacent » : ne touche que S, σ et q
  function toggleSameUnderlying(val) {
    setSameUnderlying(val);
    if (!refTrade) return;
    setFormData(p => ({
      ...p,
      S:     val ? String(refTrade.S)   : DEFAULT_FORM.S,
      sigma: val ? pct(refTrade.sigma)  : DEFAULT_FORM.sigma,
      q:     val ? pct(refTrade.q)      : DEFAULT_FORM.q,
    }));
  }

  function submitTrade() {
    if (!canSubmit) return;
    const { prime, contrats, S, K, sigma, T, q, r, montant } = preview;
    const fields = { type: formData.type, sens: formData.sens, S, K, sigma, T, q, r, montant, prime, contrats };

    if (editingId !== null) {
      setTrades(prev => {
        if (!prev.some(t => t.id === editingId)) return prev;
        const editingRef = prev[0].id === editingId;  // le trade édité porte-t-il le r de référence ?
        return prev.map(t => {
          if (t.id === editingId) return { ...t, ...fields };   // id et slot conservés
          if (!editingRef || t.r === r) return t;
          // Propagation du nouveau r : la prime des autres trades est recalculée
          const p2 = bsPrice(t.type, t.S, t.K, r, t.q, t.sigma, t.T);
          return { ...t, r, prime: p2, contrats: p2 > 0 ? Math.round(t.montant / (p2 * 100)) : t.contrats };
        });
      });
    } else {
      const slot = firstFreeSlot(trades);
      if (slot === null) return;
      const id = nextId.current++;
      setTrades(prev => [...prev, { id, slot, ...fields }].sort((a, b) => a.slot - b.slot));
    }
    setModalOpen(false);
  }

  // Signature de structure : tout ce qui change le nombre ou l'ordre des datasets
  const structureKey = JSON.stringify({
    slots: trades.map(t => t.slot),
    aggOnly,
    visibleGreeks,
  });

  // ── Création des graphiques — uniquement quand la structure change ─────────
  useEffect(() => {
    const trs = tradesRef.current;
    GREEK_KEYS.forEach((name, idx) => {
      charts[idx].current?.destroy();
      charts[idx].current = null;
      if (!visibleGreeks[name] || !canvases[idx].current || trs.length === 0) return;

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

          // Lignes verticales au spot de chaque trade ouvert
          const cur = tradesRef.current;
          if (cur.length) {
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 3]);
            ctx.globalAlpha = 0.45;
            cur.forEach((t) => {
              const xPx = scales.x.getPixelForValue(t.S / t.K);
              ctx.strokeStyle = TRADE_COLORS[t.slot];
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
        data: { datasets: buildDatasets(name, trs, aggOnly) },
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
  }, [structureKey]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Mise à jour des données — sans jamais recréer les graphiques ───────────
  useEffect(() => {
    GREEK_KEYS.forEach((name, idx) => {
      const chart = charts[idx].current;
      if (!chart || trades.length === 0) return;
      const next = buildDatasets(name, trades, aggOnly);
      if (next.length !== chart.data.datasets.length) return; // pris en charge par l'effet de structure
      next.forEach((d, i) => {
        chart.data.datasets[i].data  = d.data;
        chart.data.datasets[i].label = d.label;
      });
      chart.update('none');
    });
  }, [trades, structureKey]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Helpers JSX ───────────────────────────────────────────────────────────
  const inputCls = (locked) =>
    `w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${
      locked ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 'border-gray-300 text-gray-900 bg-white'
    }`;

  // Sous-jacent hérité : S et q sont figés, σ reste libre (la vol dépend du strike et de la maturité)
  const sousJacentHerite = editingId === null && !!refTrade && sameUnderlying;

  const INPUTS = [
    { field: 'S',       label: 'Cours actuel (S)',           step: '1',   lock: sousJacentHerite },
    { field: 'K',       label: 'Strike (K)',                  step: '1'    },
    { field: 'sigma',   label: 'Volatilité annuelle σ (%)',   step: '0.5'  },
    { field: 'T',       label: 'Maturité T (années)',         step: '0.1'  },
    { field: 'q',       label: 'Dividende continu q (%)',     step: '0.1', lock: sousJacentHerite },
    { field: 'r',       label: 'Taux sans risque r (%)',      step: '0.1', lock: rLocked },
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
          <div className="flex flex-col items-end gap-1">
            <button
              onClick={openCreate}
              disabled={trades.length >= MAX_TRADES}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-sm disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-200"
            >
              {trades.length === 0 ? 'Ouvrir un trade' : 'Ajouter un trade'}
            </button>
            {trades.length >= MAX_TRADES && (
              <span className="text-xs text-gray-400">Book plein ({MAX_TRADES} trades).</span>
            )}
          </div>
        </div>

        {/* ── Book de trades ── */}
        {trades.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {trades.map((t) => (
              <div
                key={t.id}
                className="relative bg-white border border-gray-300 rounded-xl p-4 border-l-4"
                style={{ borderLeftColor: TRADE_COLORS[t.slot] }}
              >
                <div className="absolute top-3 right-3 flex items-center gap-0.5">
                  <button
                    onClick={() => openEdit(t)}
                    aria-label={`Modifier le trade ${t.slot + 1}`}
                    className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-gray-100 rounded-full text-sm leading-none"
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => setTrades(p => p.filter(x => x.id !== t.id))}
                    aria-label={`Fermer le trade ${t.slot + 1}`}
                    className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full text-xl leading-none"
                  >
                    ×
                  </button>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-xs font-bold uppercase tracking-wide"
                    style={{ color: TRADE_COLORS[t.slot] }}
                  >
                    Trade {t.slot + 1}
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
              const vals = trades.map(t => getGreekAtSpot(t, name));
              const agg  = vals.reduce((s, v) => s + v, 0);
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
                  {vals.length > 0 && (
                    <div className="inline-flex flex-col items-start ml-1 text-[11px] font-mono leading-[1.25]">
                      {trades.map((t, i) => (
                        <span key={t.id} className="flex items-center gap-1">
                          <span style={{ color: TRADE_COLORS[t.slot] }}>●</span>
                          <span className={signCls(vals[i])}>{fmtG(vals[i])}</span>
                        </span>
                      ))}
                      {vals.length > 1 && (
                        <>
                          <div className="border-t border-gray-400 w-full my-0.5" />
                          <span className={`pl-3 ${signCls(agg)}`}>{fmtG(agg)}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
            {trades.length > 1 && (
              <label className="flex items-center gap-1.5 cursor-pointer mt-0.5">
                <input
                  type="checkbox"
                  checked={aggOnly}
                  onChange={e => setAggOnly(e.target.checked)}
                  className="accent-gray-800 w-4 h-4"
                />
                <span className="text-sm text-gray-700">Agrégé seul</span>
              </label>
            )}
          </div>

          {/* Avertissement : strikes hétérogènes, l'agrégation en moneyness perd son sens */}
          {new Set(trades.map(t => t.K)).size > 1 && (
            <div className="mb-5 bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-900">
              <span className="mr-1">⚠</span>
              Vos trades n&apos;ont pas le même strike. L&apos;axe horizontal étant gradué en moneyness S/K,
              un même point de l&apos;axe correspond à un spot différent pour chaque trade : la courbe noire
              agrégée n&apos;a pas de sens financier dans cette configuration. Les courbes individuelles,
              elles, restent justes.
            </div>
          )}

          {/* État vide */}
          {trades.length === 0 && (
            <div className="bg-white border border-gray-300 rounded-xl p-16 text-center">
              <p className="text-gray-400 text-base mb-2">Aucune position ouverte</p>
              <p className="text-gray-400 text-sm mb-6">
                Cliquez sur &quot;Ouvrir un trade&quot; pour visualiser votre exposition aux Greeks.
              </p>
              <button
                onClick={openCreate}
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
                {editingTrade
                  ? `Modifier le trade ${editingTrade.slot + 1}`
                  : trades.length === 0 ? 'Ouvrir un trade' : 'Ajouter un trade'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full text-xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-5">
              {/* Toggle Même sous-jacent — création uniquement */}
              {editingId === null && refTrade && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Même sous-jacent que le trade {refTrade.slot + 1} ?
                  </p>
                  <div className="flex gap-2">
                    {[['Oui', true], ['Non', false]].map(([lbl, val]) => (
                      <button key={lbl} type="button" onClick={() => toggleSameUnderlying(val)}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${sameUnderlying === val ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                        {lbl}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Fige S et q sur ceux du trade {refTrade.slot + 1}. σ reste modifiable : la vol implicite dépend du strike et de la maturité.
                  </p>
                </div>
              )}

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
                    <p className="text-xs text-gray-400 mt-1">
                      {field === 'r'
                        ? `Partagé avec le trade ${refTrade ? refTrade.slot + 1 : 1} pour cohérence du pricing.`
                        : `Hérité du trade ${refTrade ? refTrade.slot + 1 : 1} — répondre « Non » ci-dessus pour le modifier.`}
                    </p>
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
              {editingTrade ? 'Enregistrer les modifications' : 'Lancer mon trade →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
