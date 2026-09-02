// Extrait le moteur de calcul d'un composant de payoff, pour le rendre
// exécutable par Node hors navigateur.
//
// Le point essentiel : on ne recopie pas les formules dans le test, on les
// découpe dans le fichier composant réel. Le code testé est donc exactement le
// code exécuté par le site, et il ne peut pas diverger silencieusement.
//
// Hypothèse de découpage, respectée par StrategyPayoffChart.js : tout le moteur
// (constantes, Black-Scholes, catalogue, agrégations) est défini AVANT le
// `export default function` du composant React. Seule cette partie est extraite,
// donc rien de ce qui touche à React ou à Chart.js n'est chargé.

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const SOURCE = resolve(HERE, '../../app/cours/components/StrategyPayoffChart.js');
const TARGET = resolve(HERE, 'engine.mjs');

export function extractEngine(src) {
  // 1. Ne garder que ce qui précède le composant React
  const cut = src.indexOf('export default function');
  if (cut === -1) throw new Error("Pas de 'export default function' trouvé : composant inattendu.");
  const head = src.slice(0, cut);

  // 2. Retirer ce que Node ne doit pas charger : la directive client, les
  //    imports (mono et multi-lignes) et l'enregistrement des modules Chart.js
  const body = head
    .replace(/^\s*['"]use client['"];?\s*$/gm, '')
    .replace(/^import[\s\S]*?from\s+['"][^'"]+['"];?[ \t]*$/gm, '')
    .replace(/^Chart\.register\([^)]*\);?[ \t]*$/gm, '');

  // 3. Ré-exporter automatiquement toutes les déclarations de premier niveau.
  //    Auto-détecté plutôt que listé à la main : ajouter une fonction au moteur
  //    la rend testable sans toucher à ce script.
  const names = new Set();
  for (const m of body.matchAll(/^(?:export\s+)?function\s+([A-Za-z_$][\w$]*)/gm)) names.add(m[1]);
  for (const m of body.matchAll(/^(?:export\s+)?const\s+([A-Za-z_$][\w$]*)\s*=/gm)) names.add(m[1]);
  if (names.size === 0) throw new Error('Aucune déclaration de premier niveau détectée.');

  return `${body}\nexport { ${[...names].join(', ')} };\n`;
}

export function buildEngine() {
  const generated = extractEngine(readFileSync(SOURCE, 'utf8'));
  writeFileSync(TARGET, generated, 'utf8');
  const count = (generated.match(/export \{ (.*) \};/)?.[1] ?? '').split(', ').length;
  return { source: SOURCE, target: TARGET, count };
}

// Exécutable seul : node extract-engine.mjs
if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  const { count } = buildEngine();
  console.log(`engine.mjs régénéré — ${count} symboles exportés.`);
}
