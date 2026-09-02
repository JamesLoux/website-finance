# Harnais de vérification des payoffs

`npm run test:payoff` (ou `node scripts/payoff-tests/run.mjs`). Aucune dépendance, aucun
navigateur : Node seul. La commande régénère d'abord `engine.mjs` puis enchaîne les trois
suites, et sort en code non nul si un seul contrôle échoue. `engine.mjs` est un fichier
**généré**, il est dans le `.gitignore` — ne jamais l'éditer, éditer le composant.

Le mécanisme central est `extract-engine.mjs`, et c'est lui qui fait toute la valeur du
harnais : il **découpe le moteur dans `app/cours/components/StrategyPayoffChart.js` lui-même**,
en gardant tout ce qui précède le `export default function` et en retirant la directive
`'use client'`, les imports et le `Chart.register`. Les fonctions testées sont donc
littéralement celles qu'exécute le site, jamais une recopie susceptible de diverger au fil
des retouches. Les symboles de premier niveau sont réexportés automatiquement (47 à ce jour),
donc ajouter une fonction au moteur la rend testable sans toucher à ce script. Cette propriété
n'est pas un détail d'implémentation : un harnais qui recopierait les formules validerait sa
propre copie et ne prouverait rien sur la page en production.

Les trois suites vérifient, dans l'ordre : **`01-moteur.mjs`**, les fondations — parité
call-put exacte, `N(x)` d'Abramowitz-Stegun, convergence de la courbe avant maturité vers la
courbe à maturité quand τ → 0, additivité des jambes (leur somme doit reproduire la courbe
combinée au flottant près), invariant de la valeur temps au spot, signes de Theta, cas dégénéré
du Box Spread, bornes d'axe ; **`02-structures.mjs`**, les 21 structures du catalogue — quantités
fractionnaires, jambe action de quantité négative, règle du flux initial, entrée de légende des
points morts, recoupement avec le texte des sections 5 et 7 ; **`03-exemples-page.mjs`**, chaque
nombre écrit en dur dans `strategies-optionnelles/page.js`. Cette troisième suite est celle qui
a le plus servi : elle a mis au jour quatre erreurs de contenu qu'aucune relecture n'avait vues
(points morts du Ratio 1×2, Theta du Box Spread, primes inventées du Ratio Collar, primes du
Diagonal). D'où la règle de méthode du projet : **tout exemple chiffré d'une page de cours doit
être produit par un moteur, jamais écrit à la main.**

Pour l'étendre à un nouveau composant de payoff (Modules 8 et 9), le chemin le plus court est
de réutiliser le motif « une stratégie = une liste de jambes signées » : si le nouveau composant
place lui aussi son moteur avant son `export default function`, il suffit de pointer `SOURCE`
dans `extract-engine.mjs` vers ce fichier — ou de généraliser la constante en paramètre si les
deux composants doivent coexister — puis d'ajouter une suite sur le modèle de
`03-exemples-page.mjs`. Les produits structurés (Reverse Convertible, Autocall, Capital
Protected Note) se décrivent dans le même format de jambes, à condition d'ajouter les types
manquants (digitale, barrière) à `legPayoff` et `legPrice`. Écrire le moteur **avant** de rédiger
les exemples chiffrés de la page, et faire produire chaque nombre par lui.
