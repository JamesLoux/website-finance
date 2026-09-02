import {
  STRATEGIES, byId, defaultStrikes, defaultRatio, defaultLegs, netPremium, optionPremium,
  hasStock, stockLeg, maturityPnL, buildMaturityData, buildLegData, profileExtrema,
  breakevenStatus, breakevenLegendLabel, structureGreeks, yBoundsFor, legLabel, fmtQty,
  legPrice, sigmaOfK, S_VALS, S0, T_INIT,
} from './engine.mjs';

const SIG = 0.20, SKEW = 0.30, R = 0.02;
let fails = 0;
const check = (name, ok, detail = '') => {
  if (!ok) fails++;
  console.log(`${ok ? '  ok  ' : ' FAIL '} ${name}${detail ? ' — ' + detail : ''}`);
};
const L = (id) => defaultLegs(byId(id));
const P = (id) => netPremium(L(id), SIG, SKEW);

console.log('=== 11. Catalogue ===');
check('21 strategies', STRATEGIES.length === 21, `${STRATEGIES.length}`);
check('ids uniques', new Set(STRATEGIES.map(s => s.id)).size === 21);

console.log('\n=== 12. Quantites fractionnaires (Ratio Collar) ===');
{
  const legs = L('ratio-collar');
  const call = legs.find(l => l.type === 'call');
  check('qty non entiere acceptee', call.qty === -1.6, `qty = ${call.qty}`);
  check('libelle francais', legLabel(call) === 'Short 1,6 Calls 110', legLabel(call));
  check('fmtQty', fmtQty(1.6) === '1,6' && fmtQty(2) === '2', `${fmtQty(1.6)} / ${fmtQty(2)}`);
  // additivite avec quantite fractionnaire
  const prem = netPremium(legs, SIG, SKEW);
  const A = buildMaturityData(legs, prem), Ls = legs.map(l => buildLegData(l, SIG, SKEW));
  let d = 0;
  for (let i = 0; i < A.length; i++) d = Math.max(d, Math.abs(A[i].y - Ls.reduce((a, x) => a + x[i].y, 0)));
  check('additivite des jambes', d < 1e-3, `ecart max ${d.toExponential(2)}`);
}

console.log('\n=== 13. Reversal : jambe stock de quantite negative ===');
{
  const legs = L('reversal');
  const st = stockLeg(legs);
  check('jambe stock qty = -1', st.qty === -1, `${st.qty}`);
  check('libelle', legLabel(st) === 'Short action', legLabel(st));
  const prem = netPremium(legs, SIG, SKEW);
  const A = buildMaturityData(legs, prem), Ls = legs.map(l => buildLegData(l, SIG, SKEW));
  let d = 0;
  for (let i = 0; i < A.length; i++) d = Math.max(d, Math.abs(A[i].y - Ls.reduce((a, x) => a + x[i].y, 0)));
  check('additivite des jambes', d < 1e-3, `ecart max ${d.toExponential(2)}`);
  check('flux initial = overlay seul', Math.abs(optionPremium(legs, SIG, SKEW) - (prem + S0)) < 1e-9,
    `overlay ${optionPremium(legs, SIG, SKEW).toFixed(4)} | total ${prem.toFixed(4)}`);
  check('note de carte = vente a decouvert', stockLeg(legs).qty < 0);
}

console.log('\n=== 14. Conversion / Reversal : cas degeneres ===');
{
  const K = 100;
  const theo = K * (1 - Math.exp(-R * T_INIT));
  for (const [id, sgn] of [['conversion', +1], ['reversal', -1]]) {
    const legs = L(id), prem = netPremium(legs, SIG, SKEW);
    const A = buildMaturityData(legs, prem);
    const ys = A.map(p => p.y);
    const flat = Math.max(...ys) - Math.min(...ys);
    check(`${id} : P&L constant`, flat < 1e-6, `amplitude ${flat.toExponential(2)}`);
    check(`${id} : P&L = ${sgn > 0 ? '+' : '-'}K(1-e^-rT)`, Math.abs(ys[0] - sgn * theo) < 1e-3,
      `${ys[0].toFixed(4)} vs ${(sgn * theo).toFixed(4)}`);
    const be = breakevenStatus(legs, prem);
    check(`${id} : aucun point mort`, be.roots.length === 0, be.label);
    check(`${id} : legende masquee`, breakevenLegendLabel(be.roots) === '', `"${breakevenLegendLabel(be.roots)}"`);
    const b = yBoundsFor(byId(id), SIG, SKEW);
    check(`${id} : plancher d'amplitude 10`, b.max - b.min >= 10, `[${b.min}, ${b.max}]`);
  }
  const c = buildMaturityData(L('conversion'), netPremium(L('conversion'), SIG, SKEW))[0].y;
  const r = buildMaturityData(L('reversal'), netPremium(L('reversal'), SIG, SKEW))[0].y;
  check('Reversal = exact oppose de la Conversion', Math.abs(c + r) < 1e-9, `${c.toFixed(6)} et ${r.toFixed(6)}`);
  const gc = structureGreeks(L('conversion'), SIG, SKEW, 1);
  check('Conversion : Delta/Gamma/Vega nuls', Math.abs(gc.delta) + Math.abs(gc.gamma) + Math.abs(gc.vega) < 1e-9,
    `D=${gc.delta.toExponential(1)}`);
  check('Conversion : Theta > 0 (pret)', gc.theta > 0, `${gc.theta.toFixed(4)}/an`);
}

console.log('\n=== 15. Forward synthetique vs texte section 7 ===');
{
  const legs = L('synthetique'), prem = netPremium(legs, SIG, SKEW);
  const g = structureGreeks(legs, SIG, SKEW, 1);
  // texte : « donne un Delta de 1 et reproduit exactement une position forward »
  check('Delta = 1 exactement', Math.abs(g.delta - 1) < 1e-12, g.delta.toFixed(12));
  check('Gamma et Vega nuls', Math.abs(g.gamma) + Math.abs(g.vega) < 1e-12);
  // texte : C(K) - P(K) = S0 e^-qT - K e^-rT
  const theo = S0 - 100 * Math.exp(-R * T_INIT);
  check('prime = S0 - K e^-rT (parite)', Math.abs(prem - theo) < 1e-9, `${prem.toFixed(6)} vs ${theo.toFixed(6)}`);
  check('prime invariante au skew', Math.abs(prem - netPremium(legs, SIG, 0)) < 1e-9);
  const ex = profileExtrema(legs, prem);
  check('gain non borne', ex.gainMax === null);
  check('perte bornee a -K-prime', Math.abs(ex.perteMax - (-100 - prem)) < 1e-9, ex.perteMax.toFixed(4));
}

console.log('\n=== 16. Put Spread Collar (Seagull) vs texte section 5 ===');
{
  const K = defaultStrikes(byId('put-spread-collar'));
  const legs = L('put-spread-collar'), prem = netPremium(legs, SIG, SKEW);
  const f = (S) => maturityPnL(legs, prem, S);
  // texte : « on renonce a la protection sous K1 »  -> le P&L redescend sous K1
  check('protection interrompue sous K1', f(K.K1 - 10) < f(K.K1) - 5,
    `f(80)=${f(80).toFixed(2)} < f(90)=${f(90).toFixed(2)}`);
  // texte : la jambe de protection est un put spread -> plateau entre K1 et K2
  check('plateau protege entre K1 et K2', Math.abs(f(92) - f(98)) < 1e-9, `f(92)=${f(92).toFixed(4)} f(98)=${f(98).toFixed(4)}`);
  // texte : short call K3 -> gain plafonne
  check('gain plafonne au-dessus de K3', Math.abs(f(120) - f(140)) < 1e-9, `f(120)=${f(120).toFixed(4)}`);
  // texte : « moins cher qu'un collar classique »
  const collarLegs = byId('collar').legs({ K1: K.K2, K2: K.K3 }); // meme protection K2, meme cap K3
  const dPSC = optionPremium(legs, SIG, SKEW), dCol = optionPremium(collarLegs, SIG, SKEW);
  check('overlay moins cher qu\'un collar de meme protection/cap', dPSC < dCol,
    `PSC ${dPSC.toFixed(3)} < Collar ${dCol.toFixed(3)}`);
  check('perte bornee (S=0)', profileExtrema(legs, prem).perteMax !== null,
    profileExtrema(legs, prem).perteMax.toFixed(3));
}

console.log('\n=== 17. Seagull haussier vs texte section 5 ===');
{
  const K = defaultStrikes(byId('seagull-haussier'));
  const legs = L('seagull-haussier'), prem = netPremium(legs, SIG, SKEW);
  const f = (S) => maturityPnL(legs, prem, S);
  check('pas de jambe action', !hasStock(legs));
  // texte : « long call spread finance par la vente d'un put »
  check('gain plafonne (call spread)', Math.abs(f(120) - f(145)) < 1e-9, `f(120)=${f(120).toFixed(4)}`);
  check('plateau entre K1 et K2', Math.abs(f(92) - f(98)) < 1e-9);
  check('perte a la baisse (put vendu)', f(60) < f(95) - 20, `f(60)=${f(60).toFixed(2)}`);
  const ex = profileExtrema(legs, prem);
  check('gain max = K3-K2-prime', Math.abs(ex.gainMax - (K.K3 - K.K2 - prem)) < 1e-9, ex.gainMax.toFixed(4));
  check('finance par le put : overlay bon marche', prem < K.K3 - K.K2, `prime ${prem.toFixed(3)}`);
}

console.log('\n=== 18. Ratio Collar vs texte section 5 ===');
{
  const legs = L('ratio-collar'), prem = netPremium(legs, SIG, SKEW);
  const ex = profileExtrema(legs, prem);
  // texte : « au-dessus de 110 le portefeuille est net short » -> perte non bornee
  check('perte non bornee a la hausse', ex.perteMax === null);
  check('gain borne (pic en K2)', ex.gainMax !== null, ex.gainMax === null ? '' : ex.gainMax.toFixed(3));
  const f = (S) => maturityPnL(legs, prem, S);
  check('le P&L decroit au-dela de K2', f(130) < f(110), `f(110)=${f(110).toFixed(2)} f(130)=${f(130).toFixed(2)}`);
  // texte : a spot 130, resultat net negatif
  console.log(`         P&L a S=130 : ${f(130).toFixed(2)} par action (texte : « resultat net negatif »)`);
  // texte : il faut un ratio plus eleve quand le skew se creuse
  const zeroCost = (skew) => {
    let best = null;
    for (let n = 1.0; n <= 4.0; n += 0.01) {
      const p = optionPremium(byId('ratio-collar').legs({ K1: 90, K2: 110 }, n), SIG, skew);
      if (best === null || Math.abs(p) < Math.abs(best.p)) best = { n, p };
    }
    return best.n;
  };
  const n0 = zeroCost(0), n30 = zeroCost(0.30);
  check('ratio de cout nul croissant avec le skew', n30 > n0,
    `skew 0 -> n=${n0.toFixed(2)} | skew 0,30 -> n=${n30.toFixed(2)}`);
  // texte : ratio 1,6 dans l'exemple chiffre
  console.log(`         put 90 : ${legPrice('put', S0, 90, sigmaOfK(90, SIG, SKEW), 1).toFixed(2)} | call 110 : ${legPrice('call', S0, 110, sigmaOfK(110, SIG, SKEW), 1).toFixed(2)} (texte : 4,00 et 2,50 -> ratio 1,6)`);
}

console.log('\n=== 19. Regle generale du flux initial ===');
for (const s of STRATEGIES) {
  const legs = defaultLegs(s);
  const opt = optionPremium(legs, SIG, SKEW), tot = netPremium(legs, SIG, SKEW);
  const st = stockLeg(legs);
  const expected = st ? tot - st.qty * S0 : tot;
  check(`${s.label}`, Math.abs(opt - expected) < 1e-9,
    st ? `overlay ${opt.toFixed(3)} | total ${tot.toFixed(3)} (action ${st.qty > 0 ? '+' : ''}${st.qty})` : 'pas de jambe action');
}

console.log('\n=== 20. Entree de legende des points morts ===');
for (const s of STRATEGIES) {
  const legs = defaultLegs(s), prem = netPremium(legs, SIG, SKEW);
  const roots = breakevenStatus(legs, prem).roots;
  const lbl = breakevenLegendLabel(roots);
  const ok = roots.length === 0 ? lbl === ''
    : roots.length === 1 ? lbl.startsWith('Point mort ')
    : lbl.startsWith('Points morts ');
  check(`${s.label}`, ok, lbl === '' ? '(entree masquee)' : lbl);
}

console.log(`\n${fails === 0 ? 'TOUS LES TESTS PASSENT' : fails + ' ECHEC(S)'}`);

process.exitCode = fails ? 1 : 0;
