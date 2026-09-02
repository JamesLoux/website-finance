// Lance le harnais complet : extraction du moteur, puis les trois suites.
//   node scripts/payoff-tests/run.mjs
// Code de sortie non nul si au moins un contrôle échoue.

import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildEngine } from './extract-engine.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));

const SUITES = [
  ['01-moteur.mjs', 'Moteur Black-Scholes et invariants'],
  ['02-structures.mjs', 'Les 21 structures du catalogue'],
  ['03-exemples-page.mjs', 'Chiffres écrits dans la page'],
];

const { count } = buildEngine();
console.log(`Moteur extrait de StrategyPayoffChart.js — ${count} symboles.\n`);

let failed = 0;
for (const [file, label] of SUITES) {
  console.log(`\n${'─'.repeat(72)}\n${label}  (${file})\n${'─'.repeat(72)}`);
  const r = spawnSync(process.execPath, [resolve(HERE, file)], { stdio: 'inherit' });
  if (r.status !== 0) failed += 1;
}

console.log(`\n${'═'.repeat(72)}`);
console.log(failed === 0 ? 'HARNAIS COMPLET : AUCUN ECHEC' : `${failed} suite(s) en echec`);
process.exitCode = failed === 0 ? 0 : 1;
