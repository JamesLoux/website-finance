import {
  byId, netPremium, optionPremium, legPrice, sigmaOfK, maturityPnL,
  breakevenStatus, profileExtrema, structureGreeks,
} from './engine.mjs';

const S = 0.20, SK = 0.30, N = 1.6, R = 0.02;
let fails = 0;
const check = (name, ok, detail = '') => {
  if (!ok) fails++;
  console.log(`${ok ? '  ok  ' : ' FAIL '} ${name}${detail ? ' — ' + detail : ''}`);
};
const r2 = (x) => Math.round(x * 100) / 100;

console.log('=== 21. Exemple ratio-collar reecrit : chaque chiffre du texte ===');
{
  const strat = byId('ratio-collar');
  check('defauts du composant = (90, 110, 1.6)',
    strat.strikes[0].default === 90 && strat.strikes[1].default === 110 && strat.ratio.default === 1.6);
  check('slider de ratio couvre 0,61', strat.ratio.min <= 0.61,
    `min = ${strat.ratio.min}`);

  const put = legPrice('put', 100, 90, sigmaOfK(90, S, SK), 1);
  const call = legPrice('call', 100, 110, sigmaOfK(110, S, SK), 1);
  const legs = strat.legs({ K1: 90, K2: 110 }, N);
  const prem = netPremium(legs, S, SK), flux = optionPremium(legs, S, SK);

  // Paragraphe « Exemple »
  check('texte « put 90 coute 4,02 »', r2(put) === 4.02, put.toFixed(4));
  check('texte « soit 4 018 au total »', Math.round(put * 1000) === 4018, (put * 1000).toFixed(1));
  check('texte « call 110 rapporte 3,86 »', r2(call) === 3.86, call.toFixed(4));
  check('texte « la vente rapporte 3 858 »', Math.round(call * 1000) === 3858, (call * 1000).toFixed(1));
  check('texte « residu de 160 a payer »', Math.round((put - call) * 1000) === 160, ((put - call) * 1000).toFixed(1));
  check('texte « ratio de cout nul 1,04 »', r2(put / call) === 1.04, (put / call).toFixed(4));

  // Paragraphe « Deux sorties »
  check('texte « 1 600 calls x 3,86 = 6 173 »', Math.round(call * 1600) === 6173, (call * 1600).toFixed(1));
  check('texte « contre 4 018 de puts »', Math.round(put * 1000) === 4018);
  check('texte « credit net de 2 155 »', Math.round(-flux * 1000) === 2155, (-flux * 1000).toFixed(1));

  // Boite amber, scenario S = 150
  const pnl150 = maturityPnL(legs, prem, 150);
  check('texte « les titres gagnent 50 000 »', (150 - 100) * 1000 === 50000);
  check('texte « les calls perdent 64 000 »', N * 1000 * (150 - 110) === 64000);
  check('texte « resultat net -11 845 »', Math.round(pnl150 * 1000) === -11845, (pnl150 * 1000).toFixed(1));
  check('texte « -11,85 par action »', r2(pnl150) === -11.85, pnl150.toFixed(4));
  check('POINT C : P&L a 150 nettement negatif', pnl150 < -5, `${pnl150.toFixed(2)} par action`);

  // Point de bascule
  const be = breakevenStatus(legs, prem).roots;
  check('texte « bascule des 130,26 »', r2(be[1]) === 130.26, be.map(x => x.toFixed(4)).join(' / '));
  const beZero = breakevenStatus(legs, prem - flux).roots;
  check('texte « de 126,67 a 130,26 »', r2(beZero[1]) === 126.67, beZero[1].toFixed(4));
  check('texte « soit 3,6 points de spot »', Math.abs((be[1] - beZero[1]) - 3.6) < 0.05,
    (be[1] - beZero[1]).toFixed(3));

  // Calls nus
  check('texte « 600 calls nus sur 1 600 »', N * 1000 - 1000 === 600);
  check('perte non bornee a la hausse', profileExtrema(legs, prem).perteMax === null);
}

console.log('\n=== 22. Encadre de calibration (point D) ===');
{
  const nStar = (sk) =>
    legPrice('put', 100, 90, sigmaOfK(90, S, sk), 1) / legPrice('call', 100, 110, sigmaOfK(110, S, sk), 1);
  check('texte « 0,61 a volatilite plate »', r2(nStar(0)) === 0.61, nStar(0).toFixed(4));
  check('texte « 1,04 au skew de reference »', r2(nStar(0.30)) === 1.04, nStar(0.30).toFixed(4));
  check('texte « 1,80 sur un skew deux fois plus creuse »', r2(nStar(0.60)) === 1.80, nStar(0.60).toFixed(4));
  check('texte « le defaut 1,6 est au-dessus du cout nul »', 1.6 > nStar(0.30));
  const strat = byId('ratio-collar');
  const atteignable = [0, 0.15, 0.30, 0.45, 0.60].every(sk => nStar(sk) >= strat.ratio.min && nStar(sk) <= strat.ratio.max);
  check('tous les n* atteignables au slider', atteignable,
    `plage ${strat.ratio.min}–${strat.ratio.max}, n* de ${nStar(0).toFixed(2)} a ${nStar(0.6).toFixed(2)}`);
  // ramener n a 1,04 doit annuler le flux et remonter la bascule
  const l104 = byId('ratio-collar').legs({ K1: 90, K2: 110 }, 1.04);
  const f104 = optionPremium(l104, S, SK);
  check('a n = 1,04 le flux est quasi nul', Math.abs(f104) < 0.02, f104.toFixed(4));
  const be104 = breakevenStatus(l104, netPremium(l104, S, SK)).roots;
  check('a n = 1,04 la bascule remonte', be104[be104.length - 1] > 130.26,
    `${be104[be104.length - 1].toFixed(2)} contre 130,26`);
}

console.log('\n=== 23. Diagonal a volatilite plate (point E) ===');
{
  const flat = (K) => sigmaOfK(K, S, 0); // skew 0 => 20 % partout
  const long = legPrice('call', 100, 120, flat(120), 2);
  const short = legPrice('call', 100, 100, flat(100), 0.25);
  check('texte « call 2 ans K=120 a 5,95 »', r2(long) === 5.95, long.toFixed(4));
  check('texte « call 3 mois K=100 a 4,23 »', r2(short) === 4.23, short.toFixed(4));
  // Convention retenue : le debit affiche est la difference des DEUX PRIMES ARRONDIES
  // (5,95 - 4,23 = 1,72), pour que le lecteur qui refait le calcul sur la page tombe juste.
  // Le net exact vaut 1,7148, soit 1,71 : ecart d un centime, assume.
  check('coherence interne : 5,95 - 4,23 = 1,72', r2(r2(long) - r2(short)) === 1.72,
    `${r2(long)} - ${r2(short)} = ${r2(r2(long) - r2(short))}`);
  check('1,72 a moins d un centime du net exact', Math.abs((long - short) - 1.72) < 0.01,
    `net exact ${(long - short).toFixed(4)}`);
  check('texte « perte plafonnee a 21,72 » = 20 + debit affiche', 20 + 1.72 === 21.72);
}

console.log(`\n${fails === 0 ? 'TOUS LES TESTS PASSENT' : fails + ' ECHEC(S)'}`);

process.exitCode = fails ? 1 : 0;
