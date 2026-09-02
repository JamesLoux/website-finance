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

// ────────────────────────────────────────────────────────────────
//  Paramètres de marché — fixes, non exposés à l'utilisateur
// ────────────────────────────────────────────────────────────────
const S0 = 100;      // spot de référence
const R = 0.02;      // taux sans risque
const Q = 0;         // rendement de dividende
const T_INIT = 1;    // maturité à l'initiation (1 an)

const S_MIN = 50;
const S_MAX = 150;
const N_PTS = 200;

// Grille de spot — calculée une seule fois au chargement du module
const S_VALS = Array.from({ length: N_PTS + 1 }, (_, i) =>
  +(S_MIN + ((S_MAX - S_MIN) * i) / N_PTS).toFixed(4)
);

// ────────────────────────────────────────────────────────────────
//  Black-Scholes
// ────────────────────────────────────────────────────────────────

// Abramowitz & Stegun 7.1.26 — approxime erf(x)
function erf(x) {
  const sign = x < 0 ? -1 : 1;
  const ax = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * ax);
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t +
      0.254829592) *
      t *
      Math.exp(-ax * ax);
  return sign * y;
}

// N(x) = ½(1 + erf(x/√2)) — il faut bien diviser par √2 avant d'appeler erf
function normCDF(x) {
  return 0.5 * (1 + erf(x / Math.SQRT2));
}

function normPDF(x) {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
}

// Volatilité implicite propre à chaque strike — skew négatif actions
function sigmaOfK(K, sigmaATM, skew) {
  return Math.max(0.01, sigmaATM - skew * Math.log(K / S0));
}

// Payoff terminal d'une jambe unitaire
function legPayoff(type, S, K) {
  if (type === 'stock') return S;
  if (type === 'call') return Math.max(S - K, 0);
  return Math.max(K - S, 0);
}

// Prix Black-Scholes d'une jambe unitaire
function legPrice(type, S, K, sigma, tau) {
  if (type === 'stock') return S;
  if (tau <= 0 || sigma <= 0 || S <= 0) return legPayoff(type, S, K);

  const vt = sigma * Math.sqrt(tau);
  const d1 = (Math.log(S / K) + (R - Q + 0.5 * sigma * sigma) * tau) / vt;
  const d2 = d1 - vt;
  const dfS = Math.exp(-Q * tau);
  const dfK = Math.exp(-R * tau);

  if (type === 'call') return S * dfS * normCDF(d1) - K * dfK * normCDF(d2);
  return K * dfK * normCDF(-d2) - S * dfS * normCDF(-d1);
}

// Greeks Black-Scholes d'une jambe unitaire.
// Theta est rendu en variation par an (négatif pour une option longue) : la
// convention BS est ∂V/∂t = −∂V/∂τ, la valeur décroît quand τ diminue.
function legGreeks(type, S, K, sigma, tau) {
  if (type === 'stock') return { delta: 1, gamma: 0, vega: 0, theta: 0 };
  if (tau <= 0 || sigma <= 0 || S <= 0) {
    const d = type === 'call' ? (S > K ? 1 : 0) : S < K ? -1 : 0;
    return { delta: d, gamma: 0, vega: 0, theta: 0 };
  }

  const rt = Math.sqrt(tau);
  const vt = sigma * rt;
  const d1 = (Math.log(S / K) + (R - Q + 0.5 * sigma * sigma) * tau) / vt;
  const d2 = d1 - vt;
  const dfS = Math.exp(-Q * tau);
  const dfK = Math.exp(-R * tau);
  const nd1 = normPDF(d1);

  const gamma = (dfS * nd1) / (S * vt);
  const vega = S * dfS * nd1 * rt;
  const decay = -(S * dfS * nd1 * sigma) / (2 * rt);

  if (type === 'call') {
    return {
      delta: dfS * normCDF(d1),
      gamma,
      vega,
      theta: decay - R * K * dfK * normCDF(d2) + Q * S * dfS * normCDF(d1),
    };
  }
  return {
    delta: dfS * (normCDF(d1) - 1),
    gamma,
    vega,
    theta: decay + R * K * dfK * normCDF(-d2) - Q * S * dfS * normCDF(-d1),
  };
}

// ────────────────────────────────────────────────────────────────
//  Catalogue — une stratégie = une liste de jambes signées
//  Ordre repris du tableau de synthèse de la section 8.
//  Calendar et Diagonal en sont absents : leur jambe longue survit à
//  l'expiration de la jambe courte, il n'existe donc pas de payoff
//  terminal unique à tracer.
// ────────────────────────────────────────────────────────────────
const STRATEGIES = [
  {
    id: 'call-spread',
    label: 'Call Spread',
    strikes: [
      { key: 'K1', label: 'K₁', default: 100 },
      { key: 'K2', label: 'K₂', default: 110 },
    ],
    legs: (K) => [
      { type: 'call', strike: K.K1, qty: +1 },
      { type: 'call', strike: K.K2, qty: -1 },
    ],
  },
  {
    id: 'put-spread',
    label: 'Put Spread',
    strikes: [
      { key: 'K1', label: 'K₁', default: 90 },
      { key: 'K2', label: 'K₂', default: 100 },
    ],
    legs: (K) => [
      { type: 'put', strike: K.K2, qty: +1 },
      { type: 'put', strike: K.K1, qty: -1 },
    ],
  },
  {
    id: 'ratio-1x2',
    label: 'Ratio Call Spread 1×2',
    // K₂ = 108 place la structure au crédit, sa configuration canonique : un
    // seul point mort, à la hausse. Monter K₂ la fait basculer au débit et
    // fait apparaître le second point mort, comme décrit dans la fiche.
    strikes: [
      { key: 'K1', label: 'K₁', default: 100 },
      { key: 'K2', label: 'K₂', default: 108 },
    ],
    legs: (K) => [
      { type: 'call', strike: K.K1, qty: +1 },
      { type: 'call', strike: K.K2, qty: -2 },
    ],
  },
  {
    id: 'backspread',
    label: 'Call Backspread',
    strikes: [
      { key: 'K1', label: 'K₁', default: 100 },
      { key: 'K2', label: 'K₂', default: 110 },
    ],
    legs: (K) => [
      { type: 'call', strike: K.K1, qty: -1 },
      { type: 'call', strike: K.K2, qty: +2 },
    ],
  },
  {
    id: 'straddle',
    label: 'Straddle',
    strikes: [{ key: 'K1', label: 'K', default: 100 }],
    legs: (K) => [
      { type: 'call', strike: K.K1, qty: +1 },
      { type: 'put', strike: K.K1, qty: +1 },
    ],
  },
  {
    id: 'strangle',
    label: 'Strangle',
    strikes: [
      { key: 'K1', label: 'K₁', default: 90 },
      { key: 'K2', label: 'K₂', default: 110 },
    ],
    legs: (K) => [
      { type: 'put', strike: K.K1, qty: +1 },
      { type: 'call', strike: K.K2, qty: +1 },
    ],
  },
  {
    id: 'risk-reversal',
    label: 'Risk Reversal',
    strikes: [
      { key: 'K1', label: 'K₁', default: 90 },
      { key: 'K2', label: 'K₂', default: 110 },
    ],
    legs: (K) => [
      { type: 'put', strike: K.K1, qty: -1 },
      { type: 'call', strike: K.K2, qty: +1 },
    ],
  },
  {
    id: 'collar',
    label: 'Collar',
    strikes: [
      { key: 'K1', label: 'K₁', default: 90 },
      { key: 'K2', label: 'K₂', default: 110 },
    ],
    legs: (K) => [
      { type: 'stock', strike: 0, qty: +1 },
      { type: 'put', strike: K.K1, qty: +1 },
      { type: 'call', strike: K.K2, qty: -1 },
    ],
  },
  {
    // Put Spread Collar et Seagull sont la même construction : un seul nom
    // porte les deux, comme dans la section 5 de la page.
    id: 'put-spread-collar',
    label: 'Put Spread Collar (Seagull)',
    strikes: [
      { key: 'K1', label: 'K₁', default: 90 },
      { key: 'K2', label: 'K₂', default: 100 },
      { key: 'K3', label: 'K₃', default: 110 },
    ],
    legs: (K) => [
      { type: 'stock', strike: 0, qty: +1 },
      { type: 'put', strike: K.K1, qty: -1 },
      { type: 'put', strike: K.K2, qty: +1 },
      { type: 'call', strike: K.K3, qty: -1 },
    ],
  },
  {
    // Variante haussière : structure distincte, sans sous-jacent détenu
    id: 'seagull-haussier',
    label: 'Seagull haussier',
    strikes: [
      { key: 'K1', label: 'K₁', default: 90 },
      { key: 'K2', label: 'K₂', default: 100 },
      { key: 'K3', label: 'K₃', default: 110 },
    ],
    legs: (K) => [
      { type: 'put', strike: K.K1, qty: -1 },
      { type: 'call', strike: K.K2, qty: +1 },
      { type: 'call', strike: K.K3, qty: -1 },
    ],
  },
  {
    id: 'ratio-collar',
    label: 'Ratio Collar',
    strikes: [
      { key: 'K1', label: 'K₁', default: 90 },
      { key: 'K2', label: 'K₂', default: 110 },
    ],
    // Seule stratégie à quantité ajustable : le ratio de calls vendus par
    // action détenue. Au-delà de 1, la queue haussière devient nue.
    // Minimum à 0,5 et non 1,0 : le ratio d'autofinancement descend à 0,61 à
    // volatilité plate, et l'exercice de calibration décrit sous l'exemple du
    // Ratio Collar demande de pouvoir l'atteindre sur toute la plage de skew.
    ratio: { min: 0.5, max: 2.5, step: 0.1, default: 1.6 },
    legs: (K, n) => [
      { type: 'stock', strike: 0, qty: +1 },
      { type: 'put', strike: K.K1, qty: +1 },
      { type: 'call', strike: K.K2, qty: -n },
    ],
  },
  {
    id: 'butterfly',
    label: 'Butterfly',
    strikes: [
      { key: 'K1', label: 'K₁', default: 90 },
      { key: 'K2', label: 'K₂', default: 100 },
      { key: 'K3', label: 'K₃', default: 110 },
    ],
    legs: (K) => [
      { type: 'call', strike: K.K1, qty: +1 },
      { type: 'call', strike: K.K2, qty: -2 },
      { type: 'call', strike: K.K3, qty: +1 },
    ],
  },
  {
    id: 'condor',
    label: 'Condor',
    strikes: [
      { key: 'K1', label: 'K₁', default: 85 },
      { key: 'K2', label: 'K₂', default: 95 },
      { key: 'K3', label: 'K₃', default: 105 },
      { key: 'K4', label: 'K₄', default: 115 },
    ],
    legs: (K) => [
      { type: 'call', strike: K.K1, qty: +1 },
      { type: 'call', strike: K.K2, qty: -1 },
      { type: 'call', strike: K.K3, qty: -1 },
      { type: 'call', strike: K.K4, qty: +1 },
    ],
  },
  {
    id: 'iron-condor',
    label: 'Iron Condor',
    strikes: [
      { key: 'K1', label: 'K₁', default: 85 },
      { key: 'K2', label: 'K₂', default: 95 },
      { key: 'K3', label: 'K₃', default: 105 },
      { key: 'K4', label: 'K₄', default: 115 },
    ],
    legs: (K) => [
      { type: 'put', strike: K.K1, qty: +1 },
      { type: 'put', strike: K.K2, qty: -1 },
      { type: 'call', strike: K.K3, qty: -1 },
      { type: 'call', strike: K.K4, qty: +1 },
    ],
  },
  {
    id: 'iron-butterfly',
    label: 'Iron Butterfly',
    strikes: [
      { key: 'K1', label: 'K₁', default: 90 },
      { key: 'K2', label: 'K₂', default: 100 },
      { key: 'K3', label: 'K₃', default: 110 },
    ],
    legs: (K) => [
      { type: 'put', strike: K.K1, qty: +1 },
      { type: 'put', strike: K.K2, qty: -1 },
      { type: 'call', strike: K.K2, qty: -1 },
      { type: 'call', strike: K.K3, qty: +1 },
    ],
  },
  {
    id: 'covered-call',
    label: 'Covered Call',
    strikes: [{ key: 'K1', label: 'K', default: 110 }],
    legs: (K) => [
      { type: 'stock', strike: 0, qty: +1 },
      { type: 'call', strike: K.K1, qty: -1 },
    ],
  },
  {
    id: 'cash-secured-put',
    label: 'Cash-Secured Put',
    strikes: [{ key: 'K1', label: 'K', default: 95 }],
    legs: (K) => [{ type: 'put', strike: K.K1, qty: -1 }],
  },
  {
    id: 'synthetique',
    label: 'Forward synthétique',
    strikes: [{ key: 'K1', label: 'K', default: 100 }],
    legs: (K) => [
      { type: 'call', strike: K.K1, qty: +1 },
      { type: 'put', strike: K.K1, qty: -1 },
    ],
  },
  {
    id: 'conversion',
    label: 'Conversion',
    strikes: [{ key: 'K1', label: 'K', default: 100 }],
    legs: (K) => [
      { type: 'stock', strike: 0, qty: +1 },
      { type: 'put', strike: K.K1, qty: +1 },
      { type: 'call', strike: K.K1, qty: -1 },
    ],
  },
  {
    id: 'reversal',
    label: 'Reversal',
    strikes: [{ key: 'K1', label: 'K', default: 100 }],
    legs: (K) => [
      { type: 'stock', strike: 0, qty: -1 },
      { type: 'put', strike: K.K1, qty: -1 },
      { type: 'call', strike: K.K1, qty: +1 },
    ],
  },
  {
    id: 'box-spread',
    label: 'Box Spread',
    strikes: [
      { key: 'K1', label: 'K₁', default: 95 },
      { key: 'K2', label: 'K₂', default: 105 },
    ],
    legs: (K) => [
      { type: 'call', strike: K.K1, qty: +1 },
      { type: 'call', strike: K.K2, qty: -1 },
      { type: 'put', strike: K.K2, qty: +1 },
      { type: 'put', strike: K.K1, qty: -1 },
    ],
  },
];

const byId = (id) => STRATEGIES.find((s) => s.id === id);

const defaultStrikes = (strategy) => {
  const K = {};
  strategy.strikes.forEach((s) => {
    K[s.key] = s.default;
  });
  return K;
};

// Ratio de quantité, pour les seules stratégies qui en déclarent un
const defaultRatio = (strategy) => strategy.ratio?.default ?? 1;
const defaultLegs = (strategy) => strategy.legs(defaultStrikes(strategy), defaultRatio(strategy));

// ────────────────────────────────────────────────────────────────
//  Moteur générique — boucle sur les jambes, jamais sur les cas
// ────────────────────────────────────────────────────────────────

// Prime nette de la structure, figée à l'initiation (S = S₀, τ = T_INIT).
// Inclut la jambe action à son prix S₀ : c'est le coût total d'entrée, et
// c'est bien lui qui décale les courbes de P&L.
function netPremium(legs, sigmaATM, skew) {
  return legs.reduce(
    (acc, l) =>
      acc +
      l.qty * legPrice(l.type, S0, l.strike, sigmaOfK(l.strike, sigmaATM, skew), T_INIT),
    0
  );
}

// Flux initial de l'overlay optionnel seul — c'est ce que les fiches de la page
// appellent « Flux initial ». Règle générale, déduite de la seule présence d'une
// jambe action, sans liste de stratégies codée en dur : dès qu'une structure
// détient (ou vend à découvert) le sous-jacent, la carte « Flux initial »
// n'affiche que l'overlay optionnel, tandis que les courbes continuent
// d'utiliser la prime totale. Sinon un Covered Call afficherait « Débit 96,14 »
// au lieu du crédit de 3,86 que porte sa fiche.
function optionPremium(legs, sigmaATM, skew) {
  return netPremium(legs.filter((l) => l.type !== 'stock'), sigmaATM, skew);
}

const stockLeg = (legs) => legs.find((l) => l.type === 'stock') ?? null;
const hasStock = (legs) => stockLeg(legs) !== null;

// P&L combiné à maturité en un point
function maturityPnL(legs, premium, S) {
  return legs.reduce((acc, l) => acc + l.qty * legPayoff(l.type, S, l.strike), 0) - premium;
}

// Courbe A — P&L combiné à maturité, net de prime
function buildMaturityData(legs, premium) {
  return S_VALS.map((s) => ({ x: s, y: +maturityPnL(legs, premium, s).toFixed(4) }));
}

// Courbe B — P&L combiné avant maturité (temps restant τ), net de prime
function buildLiveData(legs, premium, sigmaATM, skew, tau) {
  return S_VALS.map((s) => {
    const v = legs.reduce(
      (acc, l) =>
        acc +
        l.qty * legPrice(l.type, s, l.strike, sigmaOfK(l.strike, sigmaATM, skew), tau),
      0
    );
    return { x: s, y: +(v - premium).toFixed(4) };
  });
}

// Courbe C — une jambe, nette de sa propre prime.
// La somme des jambes reproduit exactement la courbe A.
function buildLegData(leg, sigmaATM, skew) {
  const p = legPrice(leg.type, S0, leg.strike, sigmaOfK(leg.strike, sigmaATM, skew), T_INIT);
  return S_VALS.map((s) => ({
    x: s,
    y: +(leg.qty * (legPayoff(leg.type, s, leg.strike) - p)).toFixed(4),
  }));
}

// ────────────────────────────────────────────────────────────────
//  Analyse exacte du profil à maturité
//  Le payoff est linéaire par morceaux : les extrema et les points morts
//  se lisent sur les seuls nœuds {0} ∪ strikes, et sur les pentes
//  asymptotiques. Rien n'est déduit de la grille d'affichage, donc les
//  résultats restent exacts hors de la fenêtre 50–150.
// ────────────────────────────────────────────────────────────────

function slopeAtInfinity(legs) {
  return legs.reduce(
    (a, l) => a + (l.type === 'call' || l.type === 'stock' ? l.qty : 0),
    0
  );
}

function kinkNodes(legs) {
  const ks = [...new Set(legs.filter((l) => l.type !== 'stock').map((l) => l.strike))];
  return [0, ...ks.sort((a, b) => a - b)];
}

function profileExtrema(legs, premium) {
  const slopeInf = slopeAtInfinity(legs);
  const nodes = kinkNodes(legs);
  const vals = nodes.map((s) => maturityPnL(legs, premium, s));
  return {
    // Vers S → 0 le payoff est toujours fini : la perte est bornée sauf si
    // la structure est nette vendeuse de calls (pente négative à l'infini).
    gainMax: slopeInf > 1e-9 ? null : Math.max(...vals),
    perteMax: slopeInf < -1e-9 ? null : Math.min(...vals),
  };
}

function findBreakevens(legs, premium) {
  const nodes = kinkNodes(legs);
  const roots = [];
  const push = (x) => {
    if (x >= -1e-9 && !roots.some((r) => Math.abs(r - x) < 1e-6)) roots.push(x);
  };
  const f = (S) => maturityPnL(legs, premium, S);

  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];
    const fa = f(a);
    if (Math.abs(fa) < 1e-9) push(a); // courbe tangente à zéro, ou nœud sur l'axe
    if (i < nodes.length - 1) {
      const b = nodes[i + 1];
      const fb = f(b);
      if (fa * fb < 0) push(a + ((b - a) * -fa) / (fb - fa));
    } else {
      const sl = slopeAtInfinity(legs);
      if (Math.abs(sl) > 1e-12) {
        const x = a - fa / sl;
        if (x > a + 1e-9) push(x);
      }
    }
  }
  return roots.sort((a, b) => a - b);
}

// Distingue « aucun point mort » d'un tableau vide dû à une erreur de calcul :
// on qualifie toujours le signe de la courbe.
function breakevenStatus(legs, premium) {
  const roots = findBreakevens(legs, premium);
  if (roots.length) return { roots, label: roots.map((r) => r.toFixed(2)).join(' · ') };

  const probes = [0, ...kinkNodes(legs).slice(1), S_MAX * 4].map((s) =>
    maturityPnL(legs, premium, s)
  );
  const allPos = probes.every((v) => v > 0);
  const allNeg = probes.every((v) => v < 0);
  const flat = Math.max(...probes) - Math.min(...probes) < 1e-9;

  if (flat) return { roots, label: `aucun — P&L constant (${probes[0].toFixed(2)})` };
  if (allPos) return { roots, label: 'aucun — toujours gagnante' };
  if (allNeg) return { roots, label: 'aucun — toujours perdante' };
  return { roots, label: 'aucun' };
}

// Greeks agrégés de la structure, au spot, pour le τ courant
function structureGreeks(legs, sigmaATM, skew, tau) {
  return legs.reduce(
    (acc, l) => {
      const g = legGreeks(l.type, S0, l.strike, sigmaOfK(l.strike, sigmaATM, skew), tau);
      acc.delta += l.qty * g.delta;
      acc.gamma += l.qty * g.gamma;
      acc.vega += l.qty * g.vega;
      acc.theta += l.qty * g.theta;
      return acc;
    },
    { delta: 0, gamma: 0, vega: 0, theta: 0 }
  );
}

// ────────────────────────────────────────────────────────────────
//  Bornes de l'axe Y
//  Figées à la sélection de la stratégie, puis élargies seulement si une
//  courbe sort du cadre. L'élargissement est monotone : l'échelle ne
//  rétrécit jamais en cours de manipulation, donc pas de vibration.
// ────────────────────────────────────────────────────────────────
const MIN_AMPLITUDE = 10; // Box Spread : courbe plate, l'axe s'effondrerait sans plancher

function robustExtent(ys) {
  const sorted = [...ys].sort((a, b) => a - b);
  const n = sorted.length;
  const q = (f) => sorted[Math.min(n - 1, Math.max(0, Math.round(f * (n - 1))))];
  const pLo = q(0.03);
  const pHi = q(0.97);
  const rawLo = sorted[0];
  const rawHi = sorted[n - 1];
  const core = pHi - pLo;
  // Une branche divergente (Ratio 1×2, Backspread) écrase la zone utile :
  // on lui substitue le percentile dès qu'elle s'écarte trop du corps du profil.
  const lo = core > 0 && pLo - rawLo > 1.5 * core ? pLo : rawLo;
  const hi = core > 0 && rawHi - pHi > 1.5 * core ? pHi : rawHi;
  return { lo, hi };
}

function yBoundsFor(strategy, sigmaATM, skew) {
  const legs = defaultLegs(strategy);
  const premium = netPremium(legs, sigmaATM, skew);
  const ys = [
    ...buildMaturityData(legs, premium).map((p) => p.y),
    ...buildLiveData(legs, premium, sigmaATM, skew, T_INIT).map((p) => p.y),
  ];
  let { lo, hi } = robustExtent(ys);
  if (hi - lo < MIN_AMPLITUDE) {
    const mid = (hi + lo) / 2;
    lo = mid - MIN_AMPLITUDE / 2;
    hi = mid + MIN_AMPLITUDE / 2;
  }
  const margin = (hi - lo) * 0.15;
  return { min: Math.floor(lo - margin), max: Math.ceil(hi + margin) };
}

// ────────────────────────────────────────────────────────────────
//  Présentation
// ────────────────────────────────────────────────────────────────
function formatTau(tau) {
  const weeks = Math.round(tau * 52);
  if (weeks <= 0) return 'expiration';
  if (weeks >= 52) return '1 an';
  if (weeks >= 9) return `${Math.round(tau * 12)} mois`;
  return weeks === 1 ? '1 semaine' : `${weeks} semaines`;
}

// Les quantités peuvent être fractionnaires (Ratio Collar : 1,6 call par action)
const fmtQty = (n) =>
  Number.isInteger(n) ? String(n) : n.toFixed(1).replace('.', ',');

function legLabel(leg) {
  const n = Math.abs(leg.qty);
  const sens = leg.qty > 0 ? 'Long' : 'Short';
  if (leg.type === 'stock') return `${sens} action`;
  const noun = leg.type === 'call' ? 'Call' : 'Put';
  const body = n > 1 ? `${fmtQty(n)} ${noun}s` : noun;
  return `${sens} ${body} ${leg.strike}`;
}

// ── D : libellé de l'entrée de légende des points morts ──
function breakevenLegendLabel(roots) {
  if (!roots.length) return '';
  const vals = roots.map((r) => r.toFixed(2)).join(' · ');
  return roots.length === 1 ? `Point mort ${vals}` : `Points morts ${vals}`;
}

const LONG_COLOR = '#16a34a';
const SHORT_COLOR = '#dc2626';
const STOCK_COLOR = '#6b7280';
const DASHES = [
  [6, 4],
  [2, 3],
  [10, 4],
  [1, 3],
];

// Deux jambes de même sens se distinguent par le motif de trait, pas par la couleur
function legStyles(legs) {
  const seen = { long: 0, short: 0, stock: 0 };
  return legs.map((l) => {
    const bucket = l.type === 'stock' ? 'stock' : l.qty > 0 ? 'long' : 'short';
    const dash = DASHES[seen[bucket] % DASHES.length];
    seen[bucket] += 1;
    return {
      color: l.type === 'stock' ? STOCK_COLOR : l.qty > 0 ? LONG_COLOR : SHORT_COLOR,
      dash,
    };
  });
}

const fmtSigned = (v, d = 2) => `${v >= 0 ? '+' : ''}${v.toFixed(d)}`;

// ────────────────────────────────────────────────────────────────
//  Composant
// ────────────────────────────────────────────────────────────────
export default function StrategyPayoffChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const yBoundsRef = useRef({ min: 0, max: 0 });
  const breakevenRef = useRef([]);

  const [strategyId, setStrategyId] = useState('call-spread');
  const [strikes, setStrikes] = useState(() => defaultStrikes(byId('call-spread')));
  const [tau, setTau] = useState(1);
  const [sigmaATM, setSigmaATM] = useState(0.2);
  const [skew, setSkew] = useState(0.3);
  const [ratio, setRatio] = useState(defaultRatio(byId('call-spread')));
  const [visibleLegs, setVisibleLegs] = useState([true, true]);

  const strategy = byId(strategyId);
  const legs = strategy.legs(strikes, ratio);
  const premium = netPremium(legs, sigmaATM, skew);
  const optPremium = optionPremium(legs, sigmaATM, skew);
  const styles = legStyles(legs);

  const { gainMax, perteMax } = profileExtrema(legs, premium);
  const beStatus = breakevenStatus(legs, premium);
  const greeks = structureGreeks(legs, sigmaATM, skew, tau);

  // Lu par le plugin à chaque frame, sans recréation du chart
  breakevenRef.current = beStatus.roots;

  // ── Init / recréation : le nombre de datasets change avec la stratégie ──
  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');
    if (!ctx) return;

    const strat = byId(strategyId);
    const legs0 = defaultLegs(strat);
    const prem0 = netPremium(legs0, sigmaATM, skew);
    const styles0 = legStyles(legs0);
    yBoundsRef.current = yBoundsFor(strat, sigmaATM, skew);

    const refLinesPlugin = {
      id: 'refLines',
      beforeDraw(chart) {
        const { ctx: c, scales } = chart;
        if (!scales.x || !scales.y) return;
        c.save();

        // Ligne horizontale y = 0
        const y0px = scales.y.getPixelForValue(0);
        c.beginPath();
        c.strokeStyle = 'rgba(100,100,100,0.45)';
        c.lineWidth = 1;
        c.moveTo(scales.x.left, y0px);
        c.lineTo(scales.x.right, y0px);
        c.stroke();

        // Points morts
        c.setLineDash([4, 4]);
        c.strokeStyle = 'rgba(147,197,253,0.95)';
        c.lineWidth = 1.5;
        for (const r of breakevenRef.current) {
          if (r < S_MIN || r > S_MAX) continue;
          const px = scales.x.getPixelForValue(r);
          c.beginPath();
          c.moveTo(px, scales.y.top);
          c.lineTo(px, scales.y.bottom);
          c.stroke();
        }

        // Ligne verticale au spot S₀
        c.setLineDash([5, 4]);
        c.strokeStyle = 'rgba(100,100,100,0.5)';
        c.lineWidth = 1;
        const xpx = scales.x.getPixelForValue(S0);
        c.beginPath();
        c.moveTo(xpx, scales.y.top);
        c.lineTo(xpx, scales.y.bottom);
        c.stroke();

        c.setLineDash([]);
        c.restore();
      },
    };

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'À maturité',
            data: buildMaturityData(legs0, prem0),
            borderColor: '#111827',
            borderWidth: 2.5,
            pointRadius: 0,
            tension: 0,
            order: 2,
          },
          {
            label: 'Avant maturité',
            data: buildLiveData(legs0, prem0, sigmaATM, skew, T_INIT),
            borderColor: '#2563eb',
            borderWidth: 2.5,
            pointRadius: 0,
            tension: 0,
            order: 1,
          },
          // Entrée de légende des points morts : dataset vide, porté seulement
          // par son label et son style. Les lignes elles-mêmes restent tracées
          // par le plugin, qui n'a pas eu à être modifié.
          {
            label: breakevenLegendLabel(breakevenRef.current),
            data: [],
            borderColor: 'rgba(147,197,253,0.95)',
            borderWidth: 1.5,
            borderDash: [4, 4],
            pointRadius: 0,
            tension: 0,
            order: 4,
          },
          ...legs0.map((l, i) => ({
            label: legLabel(l),
            data: buildLegData(l, sigmaATM, skew),
            borderColor: styles0[i].color,
            borderWidth: 1.5,
            borderDash: styles0[i].dash,
            pointRadius: 0,
            tension: 0,
            order: 3,
          })),
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        parsing: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          // Seules les deux courbes combinées figurent dans la légende native.
          // Les jambes sont identifiées par les chips de cases à cocher.
          legend: {
            position: 'top',
            labels: {
              // Les deux courbes combinées, plus les points morts s'il en existe.
              // Les jambes sont identifiées par les chips de cases à cocher.
              filter: (item) =>
                item.datasetIndex < 2 ||
                (item.datasetIndex === 2 && breakevenRef.current.length > 0),
            },
            onClick: (evt, item, legend) => {
              if (item.datasetIndex === 2) return; // repère, pas une série masquable
              Chart.defaults.plugins.legend.onClick.call(legend, evt, item, legend);
            },
          },
          tooltip: {
            callbacks: {
              title: (items) => `S = ${items[0].parsed.x.toFixed(1)}`,
              label: (item) => `${item.dataset.label} : ${fmtSigned(item.parsed.y)}`,
            },
          },
        },
        scales: {
          x: {
            type: 'linear',
            min: S_MIN,
            max: S_MAX,
            title: { display: true, text: 'Spot S', color: '#6b7280' },
          },
          y: {
            type: 'linear',
            min: yBoundsRef.current.min,
            max: yBoundsRef.current.max,
            title: { display: true, text: 'P&L net de prime', color: '#6b7280' },
          },
        },
      },
      plugins: [refLinesPlugin],
    });

    return () => {
      chartInstance.current?.destroy();
      chartInstance.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strategyId]);

  // ── Mise à jour des données seules — pas de recréation ──
  useEffect(() => {
    const chart = chartInstance.current;
    if (!chart) return;

    const beRoots = breakevenRef.current;
    const dataA = buildMaturityData(legs, premium);
    const dataB = buildLiveData(legs, premium, sigmaATM, skew, tau);
    chart.data.datasets[0].data = dataA;
    chart.data.datasets[1].data = dataB;

    chart.data.datasets[2].label = breakevenLegendLabel(beRoots);

    legs.forEach((l, i) => {
      const ds = chart.data.datasets[i + 3];
      if (!ds) return;
      ds.data = buildLegData(l, sigmaATM, skew);
      ds.label = legLabel(l);
      ds.borderColor = styles[i].color;
      ds.borderDash = styles[i].dash;
      ds.hidden = !visibleLegs[i];
    });

    // Élargissement monotone de l'axe Y
    const b = yBoundsRef.current;
    let lo = Infinity;
    let hi = -Infinity;
    for (const p of [...dataA, ...dataB]) {
      if (p.y < lo) lo = p.y;
      if (p.y > hi) hi = p.y;
    }
    const pad = Math.max((hi - lo) * 0.1, 1);
    if (lo < b.min) b.min = Math.floor(lo - pad);
    if (hi > b.max) b.max = Math.ceil(hi + pad);
    chart.options.scales.y.min = b.min;
    chart.options.scales.y.max = b.max;

    chart.update('none');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strikes, tau, sigmaATM, skew, strategyId, visibleLegs, ratio]);

  // Clamp : garantit K₁ < K₂ < K₃ < K₄
  const handleStrikeChange = (idx, raw) => {
    const defs = strategy.strikes;
    const v = parseFloat(raw);
    const lo = idx > 0 ? strikes[defs[idx - 1].key] + 1 : 70;
    const hi = idx < defs.length - 1 ? strikes[defs[idx + 1].key] - 1 : 130;
    setStrikes({ ...strikes, [defs[idx].key]: Math.min(Math.max(v, lo), hi) });
  };

  const handleStrategyChange = (id) => {
    const next = byId(id);
    setStrikes(defaultStrikes(next));
    setRatio(defaultRatio(next));
    setVisibleLegs(defaultLegs(next).map(() => true));
    setStrategyId(id);
  };

  const boundLabel = (v, kind) =>
    v === null ? (
      <span className={kind === 'gain' ? 'text-green-700' : 'text-red-600'}>
        {kind === 'gain' ? 'non borné' : 'non bornée'}
      </span>
    ) : (
      fmtSigned(v)
    );

  return (
    <div className="bg-white border border-gray-300 rounded-xl p-4 sm:p-6 mt-6">
      <p className="text-base font-semibold text-gray-800 mb-4">
        Atelier — construire et décomposer une structure
      </p>

      <div className="h-[320px] md:h-[400px]">
        <canvas ref={chartRef} />
      </div>

      {/* ── Chips des jambes : couleur et motif de trait du graphique ── */}
      <div className="flex flex-wrap gap-2 mt-4">
        {legs.map((l, i) => (
          <label
            key={`${l.type}-${l.strike}-${i}`}
            className="flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-full pl-2 pr-3 py-1 text-xs text-gray-700 cursor-pointer hover:bg-gray-100"
          >
            <input
              type="checkbox"
              checked={visibleLegs[i] ?? true}
              onChange={() => {
                const next = legs.map((_, j) => visibleLegs[j] ?? true);
                next[i] = !next[i];
                setVisibleLegs(next);
              }}
              className="accent-blue-600"
            />
            <svg width="22" height="8" aria-hidden="true">
              <line
                x1="1"
                y1="4"
                x2="21"
                y2="4"
                stroke={styles[i].color}
                strokeWidth="1.8"
                strokeDasharray={styles[i].dash.join(' ')}
              />
            </svg>
            <span>{legLabel(l)}</span>
          </label>
        ))}
      </div>

      {/* ── Contrôles : strikes à gauche, temps / vol à droite ── */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
        <div className="md:col-span-2">
          <label className="block font-medium text-sm text-gray-700 mb-1">Stratégie</label>
          <select
            value={strategyId}
            onChange={(e) => handleStrategyChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white"
          >
            {STRATEGIES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* Colonne gauche — strikes */}
        <div className="flex flex-col gap-4">
          {strategy.strikes.map((sk, i) => (
            <div key={sk.key}>
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-medium text-sm text-gray-700">Strike {sk.label}</span>
                <span className="text-blue-600 font-mono text-sm">{strikes[sk.key]}</span>
              </div>
              <input
                type="range"
                min={70}
                max={130}
                step={1}
                value={strikes[sk.key]}
                onChange={(e) => handleStrikeChange(i, e.target.value)}
                className="w-full accent-blue-600"
              />
            </div>
          ))}
        </div>

        {/* Colonne droite — ratio (si déclaré), temps, volatilité, skew */}
        <div className="flex flex-col gap-4">
          {strategy.ratio && (
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-medium text-sm text-gray-700">
                  Ratio de calls vendus
                </span>
                <span className="text-blue-600 font-mono text-sm">
                  {fmtQty(ratio)} × 1
                </span>
              </div>
              <input
                type="range"
                min={strategy.ratio.min}
                max={strategy.ratio.max}
                step={strategy.ratio.step}
                value={ratio}
                onChange={(e) => setRatio(parseFloat(e.target.value))}
                className="w-full accent-blue-600"
              />
              <p className="text-gray-500 text-xs mt-0.5">
                À skew nul, un ratio faible suffit à financer le put. Plus le skew se creuse,
                plus il faut vendre de calls, et plus la queue haussière devient nue.
              </p>
            </div>
          )}
          <div>
            <div className="flex justify-between items-baseline mb-1">
              <span className="font-medium text-sm text-gray-700">Temps restant</span>
              <span className="text-blue-600 font-mono text-sm">{formatTau(tau)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={1 / 52}
              value={tau}
              onChange={(e) => setTau(parseFloat(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between items-baseline mb-1">
              <span className="font-medium text-sm text-gray-700">Volatilité ATM</span>
              <span className="text-blue-600 font-mono text-sm">
                {(sigmaATM * 100).toFixed(0)} %
              </span>
            </div>
            <input
              type="range"
              min={0.05}
              max={0.6}
              step={0.01}
              value={sigmaATM}
              onChange={(e) => setSigmaATM(parseFloat(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between items-baseline mb-1">
              <span className="font-medium text-sm text-gray-700">Skew</span>
              <span className="text-blue-600 font-mono text-sm">{skew.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={0.6}
              step={0.05}
              value={skew}
              onChange={(e) => setSkew(parseFloat(e.target.value))}
              className="w-full accent-blue-600"
            />
            <p className="text-gray-500 text-xs mt-0.5">
              {skew === 0
                ? 'Volatilité plate : tous les strikes à la même vol'
                : 'Skew négatif equity : les strikes bas ont une vol plus élevée'}
            </p>
          </div>
        </div>
      </div>

      <p className="text-gray-500 text-xs mt-4 leading-relaxed">
        Chaque jambe est valorisée à sa propre volatilité implicite{' '}
        <span className="font-mono">σ(K)</span>, comme l&apos;explique le{' '}
        <a href="#call-spread" className="text-blue-600 hover:underline">
          Call Spread
        </a>
        . La prime est figée à l&apos;initiation, à un an de maturité : le curseur de temps
        représente l&apos;écoulement du temps sur une position déjà montée. S₀ = 100, r = 2 %,
        pas de dividende.
      </p>

      {/* ── Cartes de résultats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
        <div className="bg-gray-50 border border-gray-300 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-1">Flux initial</p>
          <p className="font-mono text-gray-900 text-sm font-semibold">
            {Math.abs(optPremium).toFixed(2)}{' '}
            <span className={optPremium >= 0 ? 'text-red-600' : 'text-green-700'}>
              {optPremium >= 0 ? 'Débit' : 'Crédit'}
            </span>
          </p>
          {hasStock(legs) && (
            <p className="text-xs text-gray-400 mt-1">
              overlay seul, hors {stockLeg(legs).qty > 0 ? 'achat' : 'vente à découvert'} de
              l&apos;action à S₀
            </p>
          )}
          {strategy.ratio && (
            <p className="text-xs text-gray-400 mt-1">
              {fmtQty(ratio)} call vendu pour 1 action détenue
            </p>
          )}
        </div>
        <div className="bg-gray-50 border border-gray-300 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-1">Gain maximum</p>
          <p className="font-mono text-gray-900 text-sm font-semibold">
            {boundLabel(gainMax, 'gain')}
          </p>
        </div>
        <div className="bg-gray-50 border border-gray-300 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-1">Perte maximum</p>
          <p className="font-mono text-gray-900 text-sm font-semibold">
            {boundLabel(perteMax, 'perte')}
          </p>
        </div>
        <div className="bg-gray-50 border border-gray-300 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-1">Points morts</p>
          <p className="font-mono text-gray-900 text-sm font-semibold">{beStatus.label}</p>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-300 rounded-xl p-4 mt-3">
        <p className="text-xs text-gray-500 mb-2">
          Greeks de la structure au spot, à {formatTau(tau)} de l&apos;échéance
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
          <div>
            <p className="text-xs text-gray-500">Delta</p>
            <p className="font-mono font-semibold text-gray-900">
              {fmtSigned(greeks.delta, 3)}
            </p>
            <p className="text-xs text-gray-400">par unité de sous-jacent</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Gamma</p>
            <p className="font-mono font-semibold text-gray-900">
              {fmtSigned(greeks.gamma, 4)}
            </p>
            <p className="text-xs text-gray-400">variation du Delta pour +1</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Vega</p>
            <p className="font-mono font-semibold text-gray-900">
              {fmtSigned(greeks.vega / 100, 3)}
            </p>
            <p className="text-xs text-gray-400">pour +1 point de volatilité</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Theta</p>
            <p className="font-mono font-semibold text-gray-900">
              {fmtSigned(greeks.theta / 365, 4)}
            </p>
            <p className="text-xs text-gray-400">par jour calendaire</p>
          </div>
        </div>
      </div>

      {/* ── Notes ── */}
      <div className="text-xs text-gray-500 mt-4 space-y-2 leading-relaxed">
        {strategyId === 'cash-secured-put' && (
          <p>
            La jambe cash immobilisée en garantie n&apos;est pas tracée : son P&amp;L est nul hors
            intérêts, elle ne déforme donc pas le profil.
          </p>
        )}
        <p>
          Le{' '}
          <a href="#calendar" className="text-blue-600 hover:underline">
            Calendar
          </a>{' '}
          et le{' '}
          <a href="#diagonal" className="text-blue-600 hover:underline">
            Diagonal
          </a>{' '}
          ne figurent pas dans le sélecteur : leur jambe longue survit à l&apos;expiration de la
          jambe courte, il n&apos;existe donc pas de payoff terminal unique à tracer. C&apos;est
          ce qu&apos;explique la section 4.
        </p>
      </div>
    </div>
  );
}
