import {
  optionPremium, hasStock,
  STRATEGIES, defaultStrikes, defaultLegs, breakevenLegendLabel, stockLeg, netPremium, maturityPnL, buildMaturityData,
  buildLiveData, buildLegData, profileExtrema, breakevenStatus,
  structureGreeks, yBoundsFor, legLabel, sigmaOfK, S_VALS, S0, T_INIT,
} from './engine.mjs';

const SIG = 0.20, SKEW = 0.30;
let fails = 0;
const check = (name, ok, detail = '') => {
  if (!ok) fails++;
  console.log(`${ok ? '  ok  ' : ' FAIL '} ${name}${detail ? ' — ' + detail : ''}`);
};

console.log('=== 1. Regressions de l\'etape 2 ===');
{
  const s = STRATEGIES[0];
  const legs = defaultLegs(s);
  const prem = netPremium(legs, SIG, SKEW);
  // convergence B -> A
  for (const tau of [1, 0.5, 1 / 52, 0]) {
    const A = buildMaturityData(legs, prem), B = buildLiveData(legs, prem, SIG, SKEW, tau);
    const d = Math.max(...A.map((p, i) => Math.abs(p.y - B[i].y)));
    if (tau === 0) check('convergence B->A a tau=0', d < 1e-9, `ecart ${d.toExponential(2)}`);
  }
}

console.log('\n=== 2. Test fige : ecart(S0) == prime, pour les 15 structures ===');
// Au spot, A(S0) = payoff - P et B(S0) a tau=T_INIT vaut 0 par construction :
// l'ecart entre les deux courbes en S0 est identiquement la valeur temps = la prime...
// plus precisement B(S0,T_INIT) = 0 donc A(S0) - B(S0) = A(S0) = payoff(S0) - P.
// Le test utile : B(S0, T_INIT) doit valoir exactement 0 (la structure vaut sa prime a l'initiation).
for (const s of STRATEGIES) {
  const legs = defaultLegs(s);
  const prem = netPremium(legs, SIG, SKEW);
  const i0 = S_VALS.indexOf(100);
  const B0 = buildLiveData(legs, prem, SIG, SKEW, T_INIT)[i0].y;
  const A0 = buildMaturityData(legs, prem)[i0].y;
  const payoffAtSpot = legs.reduce((a, l) =>
    a + l.qty * (l.type === 'stock' ? S0 : l.type === 'call' ? Math.max(S0 - l.strike, 0) : Math.max(l.strike - S0, 0)), 0);
  // A0 et B0 sont arrondis a 4 decimales pour l'affichage : tolerance 1e-3
  const ok = Math.abs(B0) < 1e-3 && Math.abs((B0 - A0) - (prem - payoffAtSpot)) < 1e-3;
  check(`${s.label}`, ok, `B(S0)=${B0.toFixed(6)}  A(S0)=${A0.toFixed(4)}  P=${prem.toFixed(4)}  valeur temps=${(B0 - A0).toFixed(4)}`);
}

console.log('\n=== 3. Additivite : somme des jambes == courbe A ===');
for (const s of STRATEGIES) {
  const legs = defaultLegs(s);
  const prem = netPremium(legs, SIG, SKEW);
  const A = buildMaturityData(legs, prem);
  const L = legs.map((l) => buildLegData(l, SIG, SKEW));
  let d = 0;
  for (let i = 0; i < A.length; i++) {
    d = Math.max(d, Math.abs(A[i].y - L.reduce((a, arr) => a + arr[i].y, 0)));
  }
  check(s.label, d < 1e-3, `ecart max ${d.toExponential(2)}`);
}

console.log('\n=== 4. Theta : signe attendu ===');
{
  const g = (id) => {
    const s = STRATEGIES.find((x) => x.id === id);
    return structureGreeks(defaultLegs(s), SIG, SKEW, 1).theta / 365;
  };
  check('Straddle theta < 0', g('straddle') < 0, g('straddle').toFixed(5));
  check('Butterfly theta > 0', g('butterfly') > 0, g('butterfly').toFixed(5));
  check('Iron Condor theta > 0', g('iron-condor') > 0, g('iron-condor').toFixed(5));
  check('Strangle theta < 0', g('strangle') < 0, g('strangle').toFixed(5));
}

console.log('\n=== 5. Box Spread : cas degenere ===');
{
  const s = STRATEGIES.find((x) => x.id === 'box-spread');
  const K = defaultStrikes(s), legs = s.legs(K);
  const prem = netPremium(legs, SIG, SKEW);
  const A = buildMaturityData(legs, prem);
  const flat = Math.max(...A.map(p => p.y)) - Math.min(...A.map(p => p.y));
  const theo = (K.K2 - K.K1) * (1 - Math.exp(-0.02));
  check('P&L constant', flat < 1e-6, `amplitude ${flat.toExponential(2)}`);
  check('P&L == (K2-K1)(1-e^-rT)', Math.abs(A[0].y - theo) < 1e-3, `${A[0].y.toFixed(4)} vs ${theo.toFixed(4)}`);
  const b = yBoundsFor(s, SIG, SKEW);
  check('axe Y amplitude >= 10', b.max - b.min >= 10, `[${b.min}, ${b.max}]`);
  check('points morts = aucun', breakevenStatus(legs, prem).roots.length === 0, breakevenStatus(legs, prem).label);
  // invariance au skew
  const p2 = netPremium(legs, SIG, 0);
  check('prime invariante au skew', Math.abs(prem - p2) < 1e-9, `${prem.toFixed(6)} vs ${p2.toFixed(6)}`);
  const gk = structureGreeks(legs, SIG, SKEW, 1);
  check('Delta/Gamma/Vega nuls', Math.abs(gk.delta) + Math.abs(gk.gamma) + Math.abs(gk.vega) < 1e-9,
    `D=${gk.delta.toExponential(1)} G=${gk.gamma.toExponential(1)} V=${gk.vega.toExponential(1)}`);
  const thetaTheo = 0.02 * (K.K2 - K.K1) * Math.exp(-0.02);
  check('Theta == r(K2-K1)e^-rT  (NON nul : portage du ZC)', Math.abs(gk.theta - thetaTheo) < 1e-9,
    `atelier ${gk.theta.toFixed(6)}/an = ${(gk.theta / 365).toFixed(6)}/jour | theorie ${thetaTheo.toFixed(6)}`);
}

console.log('\n=== 6. Bornes de l\'axe Y ===');
for (const s of STRATEGIES) {
  const legs = defaultLegs(s);
  const prem = netPremium(legs, SIG, SKEW);
  const A = buildMaturityData(legs, prem);
  const b = yBoundsFor(s, SIG, SKEW);
  const lo = Math.min(...A.map(p => p.y)), hi = Math.max(...A.map(p => p.y));
  const amp = b.max - b.min;
  // part de la hauteur occupee par la zone entre strikes
  const ks = s.strikes.map(k => k.default);
  const inZone = A.filter(p => p.x >= Math.min(...ks) - 5 && p.x <= Math.max(...ks) + 5).map(p => p.y);
  const zoneShare = (Math.max(...inZone) - Math.min(...inZone)) / amp;
  console.log(`  ${s.label.padEnd(24)} A=[${lo.toFixed(1)}, ${hi.toFixed(1)}]  axe=[${b.min}, ${b.max}]  zone entre strikes ${(zoneShare * 100).toFixed(0)}%`);
  check(`  ${s.label}`, b.min <= lo && b.max >= hi && amp >= 10 && amp <= Math.max(hi - lo, 10) * 2.6,
    b.min > lo || b.max < hi ? 'COURBE TRONQUEE' : '');
}

console.log('\n=== 7. Cartes vs fiches de la page (defauts) ===');
const fiche = {
  'call-spread':      (K, P) => ({ gain: K.K2 - K.K1 - P, perte: P, be: [K.K1 + P] }),
  'put-spread':       (K, P) => ({ gain: K.K2 - K.K1 - P, perte: P, be: [K.K2 - P] }),
  'ratio-1x2':        (K, P) => ({ gain: K.K2 - K.K1 - P, perte: null, be: null }),
  'straddle':         (K, P) => ({ gain: null, perte: P, be: [K.K1 - P, K.K1 + P] }),
  'strangle':         (K, P) => ({ gain: null, perte: P, be: [K.K1 - P, K.K2 + P] }),
  'risk-reversal':    (K, P) => ({ gain: null, perte: K.K1 + P, be: null }),
  'collar':           (K, P) => ({ gain: K.K2 - S0 - P, perte: S0 - K.K1 + P, be: null }),
  'butterfly':        (K, P) => ({ gain: K.K2 - K.K1 - P, perte: P, be: [K.K1 + P, K.K3 - P] }),
  'condor':           (K, P) => ({ gain: K.K2 - K.K1 - P, perte: P, be: [K.K1 + P, K.K4 - P] }),
  'covered-call':     (K, P) => ({ gain: K.K1 - S0 - P, perte: S0 + P, be: [S0 + P] }),  // C = -P
  'cash-secured-put': (K, P) => ({ gain: -P, perte: K.K1 + P, be: [K.K1 + P] }),
};
for (const s of STRATEGIES) {
  const f = fiche[s.id];
  if (!f) { console.log(`  ${s.label.padEnd(24)} (pas de fiche a sept champs)`); continue; }
  const K = defaultStrikes(s), legs = s.legs(K);
  const P = optionPremium(legs, SIG, SKEW);   // « Flux initial » au sens des fiches
  const full = netPremium(legs, SIG, SKEW);   // decalage reel des courbes
  const exp = f(K, P);
  const got = profileExtrema(legs, full);
  const be = breakevenStatus(legs, full).roots;
  const eq = (a, b) => (a === null || b === null) ? a === b : Math.abs(a - b) < 1e-6;
  const beOk = exp.be === null ? true
    : exp.be.length === be.length && exp.be.every((v, i) => Math.abs(v - be[i]) < 1e-6);
  check(`${s.label} gain`, eq(exp.gain, got.gainMax), `fiche ${exp.gain === null ? 'non borne' : exp.gain.toFixed(4)} | atelier ${got.gainMax === null ? 'non borne' : got.gainMax.toFixed(4)}`);
  check(`${s.label} perte`, eq(exp.perte === null ? null : -exp.perte, got.perteMax), `fiche ${exp.perte === null ? 'non bornee' : (-exp.perte).toFixed(4)} | atelier ${got.perteMax === null ? 'non bornee' : got.perteMax.toFixed(4)}`);
  if (exp.be) check(`${s.label} points morts`, beOk, `fiche [${exp.be.map(v => v.toFixed(2))}] | atelier [${be.map(v => v.toFixed(2))}]`);
}

console.log('\n=== 8. Sens des flux annonces par le texte ===');
{
  // « Flux initial » au sens des fiches = overlay optionnel seul
  const prem = (id) => { const s = STRATEGIES.find(x => x.id === id); return optionPremium(defaultLegs(s), SIG, SKEW); };
  const debit = (id) => check(`${id} au debit`, prem(id) > 0, prem(id).toFixed(3));
  const credit = (id) => check(`${id} au credit`, prem(id) < 0, prem(id).toFixed(3));
  ['call-spread', 'put-spread', 'straddle', 'strangle', 'butterfly', 'condor'].forEach(debit);
  ['covered-call', 'cash-secured-put', 'iron-condor', 'iron-butterfly'].forEach(credit);
  check('risk-reversal au credit (skew negatif)', prem('risk-reversal') < 0, prem('risk-reversal').toFixed(3));
  check('ratio-1x2 : credit ou cout nul', prem('ratio-1x2') <= 0.001, prem('ratio-1x2').toFixed(3));
}

console.log('\n=== 8b. Ratio 1x2 : les deux regimes de la fiche ===');
{
  const s = STRATEGIES.find(x => x.id === 'ratio-1x2');
  for (const K2 of [105, 108, 110, 115]) {
    const K = { K1: 100, K2 }, legs = s.legs(K);
    const P = netPremium(legs, SIG, SKEW);
    const be = breakevenStatus(legs, P).roots;
    if (P < 0) {
      // fiche : credit C = -P, un seul point mort a la hausse, en 2K2 - K1 + C
      const attendu = 2 * K2 - K.K1 - P;
      check(`credit K2=${K2} : un seul point mort en 2K2-K1+C`,
        be.length === 1 && Math.abs(be[0] - attendu) < 1e-6,
        `fiche ${attendu.toFixed(2)} | atelier [${be.map(v => v.toFixed(2))}]`);
    } else {
      // fiche : debit D, deux points morts en K1 + D et 2K2 - K1 - D
      const a = K.K1 + P, b = 2 * K2 - K.K1 - P;
      check(`debit K2=${K2} : points morts K1+D et 2K2-K1-D`,
        be.length === 2 && Math.abs(be[0] - a) < 1e-6 && Math.abs(be[1] - b) < 1e-6,
        `fiche [${a.toFixed(2)}, ${b.toFixed(2)}] | atelier [${be.map(v => v.toFixed(2))}]`);
    }
  }
}

console.log('\n=== 9. Effet du skew sur le Call Spread (section 2) ===');
{
  const s = STRATEGIES[0]; const legs = defaultLegs(s);
  const vals = [0, 0.15, 0.30, 0.60].map(k => netPremium(legs, SIG, k));
  check('prime croissante avec le skew', vals.every((v, i) => i === 0 || v > vals[i - 1]), vals.map(v => v.toFixed(3)).join(' < '));
  check('sigma(110) < sigma(100) < sigma(90)',
    sigmaOfK(110, SIG, SKEW) < sigmaOfK(100, SIG, SKEW) && sigmaOfK(100, SIG, SKEW) < sigmaOfK(90, SIG, SKEW),
    `${sigmaOfK(90, SIG, SKEW).toFixed(4)} / ${sigmaOfK(100, SIG, SKEW).toFixed(4)} / ${sigmaOfK(110, SIG, SKEW).toFixed(4)}`);
}

console.log('\n=== 10. Libelles de jambes ===');
for (const id of ['ratio-1x2', 'collar', 'iron-butterfly']) {
  const s = STRATEGIES.find(x => x.id === id);
  console.log(`  ${s.label}: ${defaultLegs(s).map(legLabel).join(' | ')}`);
}

console.log(`\n${fails === 0 ? 'TOUS LES TESTS PASSENT' : fails + ' ECHEC(S)'}`);

process.exitCode = fails ? 1 : 0;
