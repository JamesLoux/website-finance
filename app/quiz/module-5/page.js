'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import katex from 'katex';
import 'katex/dist/katex.min.css';

function Katex({ children }) {
  const formula = Array.isArray(children) ? children.join('') : String(children);
  const html = katex.renderToString(formula, { throwOnError: false, displayMode: false });
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

// ── Banque de 30 questions — 6 groupes ──

const groups = {

  // ── A : Cap & Floor ───────────────────────────────────────────────────
  A: [
    {
      id: 'A1',
      question: <>Le payoff d&apos;un Caplet sur la période <Katex>{'[t_i, t_{i+1}]'}</Katex> vaut :</>,
      choices: [
        <><Katex>{'N \\times \\delta_i \\times \\max(L_i - K,\\, 0)'}</Katex></>,
        <><Katex>{'N \\times \\delta_i \\times (L_i - K)'}</Katex></>,
        <><Katex>{'N \\times \\max(L_i - K,\\, 0)'}</Katex> sans facteur de durée</>,
        <><Katex>{'N \\times \\delta_i \\times \\max(K - L_i,\\, 0)'}</Katex></>,
      ],
      answer: 0,
      explanation: <>Le Caplet verse <Katex>{'N \\times \\delta_i \\times (L_i - K)_+'}</Katex> en <Katex>{'t_{i+1}'}</Katex>, où <Katex>\delta_i</Katex> est la fraction d&apos;année de la période et <Katex>L_i</Katex> le taux observé en <Katex>t_i</Katex> (fixing in advance, payment in arrears). Le Floorlet remplace le <Katex>{'\\max'}</Katex> par <Katex>{'(K - L_i)_+'}</Katex>.</>,
    },
    {
      id: 'A2',
      question: <>La parité Cap-Floor-Swap stipule que :</>,
      choices: [
        <>Achat Cap + Achat Floor = Swap Receiver</>,
        <>Achat Cap + Vente Floor = Swap Payer</>,
        <>Achat Cap + Vente Floor = Swap Receiver</>,
        <>Vente Cap + Achat Floor = Swap Payer</>,
      ],
      answer: 1,
      explanation: <>Par agrégation des payoffs : <Katex>{'(L-K)_+ - (K-L)_+ = L - K'}</Katex>, flux net d&apos;un Swap Payer (on reçoit <Katex>L</Katex> et paie <Katex>K</Katex>). C&apos;est l&apos;analogue de la parité Call-Put en actions.</>,
    },
    {
      id: 'A3',
      question: <>Un Cap 5 ans Euribor 3M contient combien de Caplets ?</>,
      choices: [
        <>20 Caplets</>,
        <>16 Caplets</>,
        <>19 Caplets</>,
        <>18 Caplets</>,
      ],
      answer: 2,
      explanation: <>Un Cap 5 ans trimestriel (4 par an) génère 20 périodes (4 x 5 = 20), mais le premier taux Euribor 3M est déjà fixé à l&apos;initiation du contrat. Il n&apos;y a donc aucune optionnalité sur cette première période : le Cap ne contient que 19 Caplets.</>,
    },
    {
      id: 'A4',
      question: <>La Spot Vol d&apos;un Caplet se distingue de la Flat Vol car :</>,
      choices: [
        <>Elle est identique pour tous les Caplets d&apos;un même Cap</>,
        <>Elle correspond à la volatilité historique du taux Euribor</>,
        <>Elle représente la vol implicite moyenne de tout le marché des Caps</>,
        <>Elle est la volatilité intrinsèque de chaque Caplet, obtenue par bootstrapping</>,
      ],
      answer: 3,
      explanation: <>La Flat Vol (vol de Cap) est unique et redonne le prix du Cap entier. La Spot Vol est propre à chaque Caplet et s&apos;obtient en extrayant la volatilité Caplet par Caplet via un bootstrapping séquentiel (du plus court au plus long). Seule la Spot Vol permet de pricer des produits exotiques ou path-dependent.</>,
    },
    {
      id: 'A5',
      question: <>Le Zero-Cost Collar consiste à :</>,
      choices: [
        <>Acheter un Cap et un Floor au même strike pour annuler le risque de taux</>,
        <>Vendre simultanément un Cap et un Floor pour encaisser deux primes</>,
        <>Acheter un Cap à strike haut et vendre un Floor à strike bas au même delta absolu</>,
        <>Acheter un Cap financé par la vente d&apos;un Floor, de sorte que les deux primes se compensent</>,
      ],
      answer: 3,
      explanation: <>Le Zero-Cost Collar achète un Cap (protection contre la hausse des taux) et vend un Floor (cède la protection contre la baisse). Le quant ajuste les strikes des deux jambes jusqu&apos;à ce que la prime nette soit nulle.</>,
    },
  ],

  // ── B : Bond Options & Swaptions ──────────────────────────────────────
  B: [
    {
      id: 'B1',
      question: <>Un Receiver Swaption équivaut à :</>,
      choices: [
        <>Un Cap sur taux swap du sous-jacent</>,
        <>Un Call sur obligation (profite si les taux baissent)</>,
        <>Un Put sur obligation (profite si les taux montent)</>,
        <>On ne peut rien dire, cela dépend des maturités</>,
      ],
      answer: 1,
      explanation: <>Une Receiver Swaption donne le droit de recevoir le taux fixe dans un swap. Quand les taux baissent, le taux fixe reçu est supérieur au marché : la swaption est ITM. C&apos;est exactement le profil d&apos;un Call sur obligation (quand les taux baissent, le prix de l&apos;obligation monte). La Payer Swaption est à l&apos;inverse : un Put sur obligation.</>,
    },
    {
      id: 'B2',
      question: <>La formule de Bachelier pour une Payer Swaption donne :</>,
      choices: [
        <><Katex>{'V = N \\times A \\times [(F-K)\\,N(d) + \\sigma_N \\sqrt{T}\\, n(d)]'}</Katex></>,
        <><Katex>{'V = N \\times A \\times [F\\,N(d_1) - K\\,N(d_2)]'}</Katex></>,
        <><Katex>{'V = N \\times A \\times [(F-K)\\,n(d) - \\sigma_N \\sqrt{T}\\, N(d)]'}</Katex></>,
        <><Katex>{'V = N \\times e^{-rT} \\times [(F-K)\\,N(d) + \\sigma_N \\sqrt{T}\\, n(d)]'}</Katex></>,
      ],
      answer: 0,
      explanation: <><Katex>{'A'}</Katex> est l&apos;Annuité (facteur d&apos;actualisation multi-périodes du swap), <Katex>{'F'}</Katex> le taux swap forward, <Katex>{'d = (F-K)/(\\sigma_N\\sqrt{T})'}</Katex>. L&apos;actualisation est portée par l&apos;Annuité, pas par un <Katex>{'e^{-rT}'}</Katex> séparé. Bachelier est le standard post-2014 car il autorise les taux négatifs (processus arithmétique gaussien).</>,
    },
    {
      id: 'B3',
      question: <>Dans la notation &quot;1y10y&quot;, &quot;10y&quot; désigne :</>,
      choices: [
        <>La durée de vie de l&apos;option</>,
        <>Le tenor du swap sous-jacent</>,
        <>La maturité de l&apos;obligation livrée à expiry</>,
        <>La durée du bootstrapping nécessaire à la calibration</>,
      ],
      answer: 1,
      explanation: <>La convention est Expiry × Tenor. Une swaption 1y10y expire dans 1 an ; si elle est exercée, on entre dans un swap de tenor 10 ans. Le sous-jacent est donc le taux swap 10 ans observé dans 1 an. Le cube de volatilité est indexé sur ces trois dimensions : Strike, Expiry et Tenor.</>,
    },
    {
      id: 'B4',
      question: <>Une Callable Bond peut se décomposer en :</>,
      choices: [
        <>Bond fixe + Achat d&apos;une Receiver Swaption Bermudéenne par l&apos;investisseur</>,
        <>Bond fixe + Achat d&apos;une Payer Swaption Européenne par l&apos;investisseur</>,
        <>Bond variable + Achat d&apos;un Cap par l&apos;émetteur</>,
        <>Bond fixe + Vente d&apos;une Receiver Swaption Bermudéenne par l&apos;investisseur</>,
      ],
      answer: 3,
      explanation: <>L&apos;émetteur possède le droit de rappeler — c&apos;est une Receiver Swaption Bermudéenne (rappeler = entrer dans un swap Receiver pour se refinancer moins cher quand les taux baissent). L&apos;investisseur a vendu ce droit : il reçoit un coupon légèrement supérieur en compensation, mais subit la convexité négative.</>,
    },
    {
      id: 'B5',
      question: <>Pourquoi le pricing d&apos;une swaption bermudéenne nécessite-t-il un modèle de taux (HW, LMM) ?</>,
      choices: [
        <>Car la formule de Black 76 ne s&apos;applique qu&apos;aux Caps et Floors</>,
        <>Car le smile de volatilité des Swaptions n&apos;est pas capturé par Bachelier</>,
        <>Car les swaptions bermudéennes ont un notionnel variable dans le temps</>,
        <>Car la décision d&apos;exercice est un problème d&apos;arrêt optimal requérant une évaluation backward</>,
      ],
      answer: 3,
      explanation: <>À chaque date d&apos;exercice bermudéenne, le holder choisit d&apos;exercer ou d&apos;attendre : il faut comparer la valeur d&apos;exercice immédiat à la valeur de continuation. Ce problème de temps d&apos;arrêt optimal (Optimal Stopping) est résolu par backward induction sur un arbre trinomial (Hull-White) ou par Longstaff-Schwartz en Monte Carlo (LMM). Aucune formule fermée n&apos;existe.</>,
    },
  ],

  // ── C : CMS & Ajustement de Convexité ─────────────────────────────────
  C: [
    {
      id: 'C1',
      question: <>Le taux CMS 10 ans versé dans un CMS Swap diffère du taux forward (comme dans un vrai IRS) 10 ans car :</>,
      choices: [
        <>Le CMS est actualisé avec une courbe OIS différente de la courbe de projection</>,
        <>Le payoff du CMS est convexe par rapport au taux swap, créant un ajustement via Jensen</>,
        <>Le CMS intègre une prime de liquidité absente du taux forward</>,
        <>Le CMS est calculé en convention Actual/365 là où le forward utilise Actual/360</>,
      ],
      answer: 1,
      explanation: <>Par l&apos;inégalité de Jensen, si <Katex>f</Katex> est convexe, <Katex>{'\\mathbb{E}[f(X)] > f(\\mathbb{E}[X])'}</Katex>. Le payoff CMS étant convexe en le taux swap, <Katex>{'\\mathbb{E}^Q[S_{CMS}] > S_{Fwd}'}</Katex>. La différence est l&apos;ajustement de convexité, typiquement 20 à 60 bps selon la maturité et la volatilité des swaptions.</>,
    },
    {
      id: 'C2',
      question: <>L&apos;ajustement de convexité d&apos;un CMS est toujours positif parce que :</>,
      choices: [
        <>Le taux CMS est par convention toujours supérieur au taux forward de marché</>,
        <>Le payoff CMS profite de la hausse des taux sans jamais subir leur baisse</>,
        <>Le payoff CMS est une fonction convexe du taux swap sous-jacent</>,
        <>Les flux CMS sont actualisés à un taux inférieur au taux forward, créant un gain</>,
      ],
      answer: 2,
      explanation: <>L&apos;ajustement vient directement de la convexité du payoff via Jensen. Intuitivement, quand les taux montent, le CMS gagne davantage (la courbe est convexe vers le haut) que ce qu&apos;il perd quand les taux baissent du même montant. Cette asymétrie favorable a une valeur : c&apos;est l&apos;ajustement de convexité, toujours <Katex>{'>0'}</Katex> pour un CMS receveur.</>,
    },
    {
      id: 'C3',
      question: <>La réplication statique de Carr-Madan pour un CMS consiste à :</>,
      choices: [
        <>Acheter un FRA au taux forward et un Straddle de swaptions ATM</>,
        <>Delta-hedger dynamiquement le CMS avec un portefeuille de swaps</>,
        <>Répliquer le payoff convexe du CMS par un portefeuille de Payer et Receiver Swaptions pondérées par la dérivée seconde du payoff</>,
        <>Bootstrapper la courbe CMS depuis les prix de swaptions vanilla</>,
      ],
      answer: 2,
      explanation: <>Carr-Madan décompose tout payoff convexe <Katex>{'f(S_T)'}</Katex> comme une intégrale de Calls et Puts pondérés par <Katex>{"f''(K)"}</Katex>. Pour un CMS, la somme discrète des Swaptions cotées tous les 25-50 bps suffit en pratique.</>,
    },
    {
      id: 'C4',
      question: <>Dans un CMS Steepener, l&apos;investisseur est :</>,
      choices: [
        <>Receiver CMS 10 ans et Payer CMS 2 ans</>,
        <>Receiver CMS 2 ans et Receiver CMS 10 ans</>,
        <>Payer CMS 10 ans et Receiver CMS 2 ans</>,
        <>Payer CMS 10 ans et Payer CMS 2 ans</>,
      ],
      answer: 0,
      explanation: <>Le Steepener bénéficie quand <Katex>{'S_{10y} - S_{2y}'}</Katex> s&apos;élargit. Structure : recevoir CMS 10 ans (profite si le long monte) et payer CMS 2 ans (profite si le court baisse ou reste bas). C&apos;est le pari typique sur une pentification de la courbe en fin de cycle monétaire restrictif.</>,
    },
    {
      id: 'C5',
      question: <>Pourquoi recourt-on à SABR pour la réplication Carr-Madan d&apos;un CMS ?</>,
      choices: [
        <>SABR est plus rapide numériquement que les arbres trinomiaux Hull-White</>,
        <>SABR est le seul modèle autorisant des taux négatifs dans ce contexte</>,
        <>La réplication requiert des Swaptions à des strikes très OTM, illiquides, dont la vol doit être extrapolée par un modèle de smile</>,
        <>SABR fournit directement la formule fermée de l&apos;ajustement de convexité</>,
      ],
      answer: 2,
      explanation: <>La réplication Carr-Madan nécessite des Swaptions sur toute la plage de strikes, y compris les strikes extrêmes très OTM, peu cotés en marché. SABR permet d&apos;extrapoler le smile de volatilité de manière cohérente au-delà des strikes liquides, et ainsi de valoriser ces Swaptions périphériques nécessaires à la réplication.</>,
    },
  ],

  // ── D : Convertible Bond ──────────────────────────────────────────────
  D: [
    {
      id: 'D1',
      question: <>Le Bond Floor d&apos;un convertible représente :</>,
      choices: [
        <>Le prix minimum légal de rappel fixé par l&apos;émetteur</>,
        <>La valeur actualisée des flux obligataires sans l&apos;option de conversion</>,
        <>La valeur de parité <Katex>{'CR \\times S'}</Katex> quand l&apos;action est très basse</>,
        <>Le coupon minimum garanti contractuellement</>,
      ],
      answer: 1,
      explanation: <>Le Bond Floor est la valeur actualisée des coupons et du remboursement au spread de crédit de l&apos;émetteur, comme si la convertible était une obligation ordinaire. Il constitue le plancher théorique. En pratique, si le crédit se dégrade simultanément avec l&apos;action (corrélation crédit-action), ce plancher s&apos;effondre.</>,
    },
    {
      id: 'D2',
      question: <>Dans la zone hybride d&apos;une convertible (option ATM), le Greek dominant est :</>,
      choices: [
        <>Le Delta, proche de 1, qui rend la convertible équivalente à une action</>,
        <>Le Rho, car les taux bas valorisent fortement le Bond Floor</>,
        <>Le Gamma et le Vega, qui sont à leur maximum près de la monnaie</>,
        <>Le Theta, car la valeur temps est maximale quand l&apos;option est ATM</>,
      ],
      answer: 2,
      explanation: <>Quand le prix de conversion est proche du prix de l&apos;action (zone hybride), l&apos;option est ATM. C&apos;est là que le Gamma (sensibilité du Delta à l&apos;action) et le Vega (sensibilité à la volatilité) sont maximaux.</>,
    },
    {
      id: 'D3',
      question: <>Pour delta-hedger une convertible, l&apos;arbitragiste doit vendre à découvert :</>,
      choices: [
        <><Katex>{'CR'}</Katex> actions (conversion totale)</>,
        <><Katex>{'CR \\times \\Delta_{Call}'}</Katex> actions</>,
        <><Katex>{'\\Delta_{Call}'}</Katex> actions sans ajustement par le Ratio de Conversion</>,
        <><Katex>{'1/CR'}</Katex> actions pour neutraliser l&apos;exposition obligataire</>,
      ],
      answer: 1,
      explanation: <>Le convertible embarque un Call sur <Katex>CR</Katex> actions. Le Delta global est <Katex>{'CR \\times \\Delta_{Call}'}</Katex>. Pour être delta-neutre, l&apos;arbitragiste vend à découvert ce nombre d&apos;actions. Quand l&apos;action monte, <Katex>{'\\Delta_{Call}'}</Katex> augmente et il faut shorter davantage (gamma scalping). Quand elle baisse, il rachète.</>,
    },
    {
      id: 'D4',
      question: <>Le Convertible Bond peut se décomposer comme :</>,
      choices: [
        <><Katex>{'Obligation ordinaire + Put sur l&apos;action'}</Katex></>,
        <><Katex>{'Obligation ordinaire + Call sur l&apos;action'}</Katex></>,
        <><Katex>{'Autocall mais sans barrière de rappel'}</Katex></>,
        <><Katex>{'Obligation ordinaire + Collar sur l&apos;action'}</Katex></>,
      ],
      answer: 1,
      explanation: <>Possibilité de convertir l&apos;obligation en actions si cette dernière s'avère plus intéressante, gain si surprise à la hausse, optionnalité uniquement haussière.</>,
    },
    {
      id: 'D5',
      question: <>Pourquoi n&apos;existe-t-il pas de formule fermée pour pricer une convertible ?</>,
      choices: [
        <>Car la corrélation crédit-action est un paramètre non observable rendant tout calcul analytique impossible</>,
        <>Car l&apos;exercice est de type américain ou bermudéen, nécessitant des méthodes numériques (arbres)</>,
        <>Car le modèle de Heston est obligatoire et n&apos;admet pas de solution fermée</>,
        <>Car le Bond Floor dépend du spread de crédit, lui-même stochastique</>,
      ],
      answer: 1,
      explanation: <>La possibilité d&apos;exercice anticipé (conversion à tout moment pour une américaine, ou à certaines dates pour une bermudéenne) empêche l&apos;application directe de Black-Scholes. On recourt à des arbres binomiaux hybrides modélisant simultanément l&apos;action et le spread de crédit, ou à des méthodes de différences finies en 2D.</>,
    },
  ],

  // ── E : Range Accrual ─────────────────────────────────────────────────
  E: [
    {
      id: 'E1',
      question: <>Le coupon d&apos;un Range Accrual est égal à :</>,
      choices: [
        <><Katex>{'C_{} \\times \\bar{L}'}</Katex>, où <Katex>{'\\bar{L}'}</Katex> est la moyenne du taux sur la période</>,
        <><Katex>{'C_{} \\times (L_{cap} - L_{floor}) / L_{cap}'}</Katex></>,
        <><Katex>{'C_{} \\times N_{jours\\_dans\\_range} / N_{total}'}</Katex></>,
        <><Katex>{'\\max(C_{}, 0) \\times N_{jours\\_dans\\_range} / N_{total}'}</Katex></>,
      ],
      answer: 2,
      explanation: <>Le coupon s&apos;accumule uniquement les jours où le taux de référence reste à l&apos;intérieur du range <Katex>{'[L_{floor}, L_{cap}]'}</Katex>. La formule est <Katex>{'C_{} \\times N_{jours} / N_{total}'}</Katex>. La MinGtee ajoute un plancher : <Katex>{'\\max(MinGtee,\\; C_{} \\times ratio)'}</Katex>.</>,
    },
    {
      id: 'E2',
      question: <>La décomposition quant d&apos;un Range Accrual le représente comme :</>,
      choices: [
        <>Un Cap moins un Floor sur toute la période, avec strike égal au centre du range</>,
        <>Une somme de digitales journalières : <Katex>{'C_{} \\times \\sum_i \\mathbf{1}_{L_i \\in [L_{floor}, L_{cap}]}'}</Katex></>,
        <>Une série de swaptions pondérées par la probabilité de rester dans le range</>,
        <>Un Collar sur chaque période d&apos;observation, agrégé sur la durée totale</>,
      ],
      answer: 1,
      explanation: <>Chaque jour, l&apos;indicatrice <Katex>{'\\mathbf{1}_{L_i \\in [L_{floor}, L_{cap}]}'}</Katex> vaut 1 ou 0 selon que le taux est dans le range. Le coupon total est la somme de ces digitales pondérée par <Katex>{'C_{}'}</Katex>. Cette décomposition permet de pricer chaque digitale avec un modèle de smile (SABR), crucial car le skew au niveau des barrières peut être fort.</>,
    },
    {
      id: 'E3',
      question: <>La réplication d&apos;une digitale par un Call Spread de paramètre <Katex>\varepsilon</Katex> implique :</>,
      choices: [
        <>Quand <Katex>{'\\varepsilon \\to \\infty'}</Katex>, le Call Spread converge vers la digitale exacte</>,
        <>Quand <Katex>{'\\varepsilon \\to 0'}</Katex>, le Call Spread diverge et ne réplique plus rien</>,
        <>Quand <Katex>{'\\varepsilon \\to 0'}</Katex>, le Call Spread converge vers la digitale exacte</>,
        <>La réplication est exacte pour tout <Katex>\varepsilon</Katex>, quel que soit le smile</>,
      ],
      answer: 2,
      explanation: <>La digitale est la dérivée d&apos;un Call par rapport au strike : <Katex>{'D(K) = -\\partial C/\\partial K'}</Katex>. On l&apos;approche par <Katex>{'[C(K-\\varepsilon) - C(K+\\varepsilon)]/(2\\varepsilon)'}</Katex>. Quand <Katex>{'\\varepsilon \\to 0'}</Katex>, l&apos;approximation par différence finie devient exacte. En pratique, un <Katex>\varepsilon</Katex> non nul constitue un overhedge (biais de pricing intentionnel pour gérer le pin risk).</>,
    },
    {
      id: 'E4',
      question: <>Pourquoi un Range Accrual cross-asset rend l&apos;investisseur &quot;long corrélation&quot; ?</>,
      choices: [
        <>Car la valeur du produit augmente si les actifs sous-jacents évoluent dans des directions opposées</>,
        <>Car la probabilité que deux actifs soient simultanément dans leur range respectif augmente quand <Katex>{'\\rho = 1'}</Katex></>,
        <>Car le produit paie uniquement quand les actifs sont corrélés négativement</>,
        <>Car la banque se hedge en achetant de la corrélation sur le marché des variance swaps</>,
      ],
      answer: 1,
      explanation: <>Si les deux actifs sont indépendants (<Katex>{'\\rho=0'}</Katex>), <Katex>{'P(A \\cap B) = P(A) \\times P(B)'}</Katex> le coupon est maximal, la proba de rester dans leur range respectifs est la plus faible, l'objectif du vendeur est qu'elle diminue le plus possible pour délivrer le moins de coupon possible. Donc l'investisseur est à l'opposé de la banque : long corrélation.</>,
    },
    {
      id: 'E5',
      question: <>La clause callable d&apos;un Range Accrual bénéficie à la banque car :</>,
      choices: [
        <>Elle lui permet de modifier le niveau du tunnel si le taux sort trop souvent</>,
        <>Elle lui permet de rappeler le produit quand la volatilité explose, limitant les pertes</>,
        <>Elle lui permet de rappeler le produit quand la volatilité s&apos;effondre</>,
        <>Elle lui permet de rallonger la maturité du produit si les conditions sont défavorables</>,
      ],
      answer: 2,
      explanation: <>La banque rappelle quand elle est perdante. Etant vendeuse, elle souhaite que la volatilité monte pour augmenter les probas que les sous-jacents sortent du range (et dans ce cas elle ne paiera plus de coupon). Si la volatilité s'effondre, elle rappelle.</>,
    },
  ],

  // ── F : Modèles de taux ───────────────────────────────────────────────
  F: [
    {
      id: 'F1',
      question: <>La limite principale de Vasicek (1977) est :</>,
      choices: [
        <>Ses paramètres constants ne permettent pas de reproduire exactement la courbe de taux observée</>,
        <>Il n&apos;intègre pas de mean-reversion du taux court</>,
        <>Il suppose une volatilité nulle pour les taux longs</>,
        <>Il interdit mathématiquement les taux négatifs</>,
      ],
      answer: 0,
      explanation: <>Vasicek est un modèle d&apos;équilibre : <Katex>{'dr_t = a(b - r_t)\\,dt + \\sigma\\,dW_t'}</Katex> avec <Katex>{'a, b, \\sigma'}</Katex> constants. Il ne peut pas reproduire exactement une courbe Bloomberg donnée. Hull-White résout ce problème en remplaçant <Katex>b</Katex> par une fonction du temps <Katex>{'\\theta(t)'}</Katex> (condition de no-arbitrage).</>,
    },
    {
      id: 'F2',
      question: <>L&apos;EDS de Hull-White 1-Facteur est :</>,
      choices: [
        <><Katex>{'dr_t = a(b - r_t)\\,dt + \\sigma\\,dW_t'}</Katex> avec <Katex>{'a, b, \\sigma'}</Katex> constants</>,
        <><Katex>{'dr_t = \\sigma(t)\\,dW_t'}</Katex> sans mean-reversion</>,
        <><Katex>{'dr_t = \\theta\\,dt + \\sigma(t)\\,dW_t'}</Katex> sans amortissement</>,
        <><Katex>{'dr_t = [\\theta(t) - a(t)\\,r_t]\\,dt + \\sigma(t)\\,dW_t'}</Katex></>,
      ],
      answer: 3,
      explanation: <><Katex>{'\\theta(t)'}</Katex> est calibré pour reproduire exactement la courbe de taux (no-arbitrage). <Katex>{'a(t)'}</Katex> contrôle la vitesse de mean-reversion. <Katex>{'\\sigma(t)'}</Katex> est calibré sur la structure par terme de volatilité des Swaptions. Les arbres trinomiaux permettent la backward induction pour les produits bermudéens.</>,
    },
    {
      id: 'F3',
      question: <>Hull-White 1-Facteur est inadapté pour pricer des CMS Spread Options car :</>,
      choices: [
        <>Il n&apos;autorise pas les taux négatifs dans les environnements post-2014</>,
        <>Il ne modélise que la volatilité des taux courts, pas celle des taux longs</>,
        <>Avec un seul Brownien, tous les taux sont parfaitement corrélés : la courbe ne peut se déformer</>,
        <>Son calibrage est trop lent pour les produits multi-courbes</>,
      ],
      answer: 2,
      explanation: <>Avec un seul facteur <Katex>{'dW_t'}</Katex>, tous les taux sont des fonctions déterministes du même choc : corrélation parfaite. La courbe peut monter ou descendre parallèlement, mais jamais se tordre. Un CMS Spread Option parie précisément sur la déformation de la courbe. Il faut au moins deux facteurs (HW2F) pour capturer ce risque.</>,
    },
    {
      id: 'F4',
      question: <>Dans Hull-White 2-Facteurs, le second facteur <Katex>u_t</Katex> suit :</>,
      choices: [
        <><Katex>{'du_t = \\kappa(\\theta - u_t)\\,dt + \\xi\\,dW_2'}</Katex> (processus CIR)</>,
        <><Katex>{'du_t = -b\\,u_t\\,dt + \\sigma_2(t)\\,dW_2'}</Katex> (perturbation sans niveau cible)</>,
        <><Katex>{'du_t = \\sigma_2(t)\\,dW_2'}</Katex> (martingale pure)</>,
        <><Katex>{'du_t = a(t)\\,u_t\\,dt + \\sigma_2(t)\\,dW_2'}</Katex> (processus explosif)</>,
      ],
      answer: 1,
      explanation: <><Katex>u_t</Katex> est une perturbation qui mean-reverte vers 0 sans niveau cible : <Katex>{'du_t = -b\\,u_t\\,dt + \\sigma_2(t)\\,dW_2'}</Katex>. Il perturbe lentement le taux court <Katex>r_t</Katex>, découplant ainsi l&apos;évolution du court terme de celle du long terme. HW2F admet des formules fermées pour les obligations zéro-coupon, facilitant la calibration.</>,
    },
    {
      id: 'F5',
      question: <>La différence fondamentale entre HJM et LMM est que :</>,
      choices: [
        <>HJM modélise les taux courts, LMM modélise les taux longs</>,
        <>HJM est un modèle à temps discret, LMM est à temps continu</>,
        <>LMM est calibré exclusivement sur les Caps, HJM exclusivement sur les Swaptions</>,
        <>LMM modélise les taux de marché (SOFR, Euribor), HJM modélise les taux forward instantanés</>,
      ],
      answer: 3,
      explanation: <>HJM modélise <Katex>{'f(t,T)'}</Katex>, les taux forward instantanés, objets théoriques non directement observables. LMM (BGM) modélise les taux LIBOR/SOFR de marché, directement liés aux prix des Caps et FRA : calibration naturelle.</>,
    },
  ],
};

// ── Tirage stratifié : 2 questions au hasard dans chaque groupe ──
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function drawSession() {
  return [
    ...shuffle(groups.A).slice(0, 2),
    ...shuffle(groups.B).slice(0, 2),
    ...shuffle(groups.C).slice(0, 2),
    ...shuffle(groups.D).slice(0, 2),
    ...shuffle(groups.E).slice(0, 2),
    ...shuffle(groups.F).slice(0, 2),
  ];
}

const TOTAL = 12;

export default function QuizModule5Page() {
  const [questions, setQuestions] = useState(null);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [validated, setValidated] = useState(false);
  const [results, setResults] = useState([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => { setQuestions(drawSession()); }, []);

  const q = questions ? questions[current] : null;
  const score = results.filter(Boolean).length;

  if (!questions) return <div className="max-w-2xl mx-auto px-6 py-12 text-gray-400 text-sm">Chargement…</div>;

  function handleSelect(index) {
    if (validated) return;
    setSelected(index);
  }

  function handleValidate() {
    if (selected === null) return;
    setValidated(true);
    setResults((prev) => [...prev, selected === q.answer]);
  }

  function handleNext() {
    if (current === TOTAL - 1) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setValidated(false);
    }
  }

  function handleRestart() {
    window.location.reload();
  }

  function choiceStyle(index) {
    const base = 'w-full text-left px-4 py-3 rounded-lg border mb-2 text-sm transition-colors cursor-pointer';
    if (!validated) {
      return selected === index
        ? `${base} bg-blue-50 border-blue-400 text-blue-900`
        : `${base} bg-white border-gray-300 text-gray-700 hover:bg-gray-50`;
    }
    if (index === q.answer) return `${base} bg-green-50 border-green-400 text-green-800`;
    if (index === selected && selected !== q.answer) return `${base} bg-red-50 border-red-400 text-red-800`;
    return `${base} bg-white border-gray-200 text-gray-400`;
  }

  // ── Écran de résultat ──
  if (finished) {
    const scoreColor =
      score >= 10 ? 'text-green-600' : score >= 7 ? 'text-amber-500' : 'text-red-500';
    const scoreBg =
      score >= 10 ? 'bg-green-50 border-green-200' : score >= 7 ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200';

    return (
      <div className="max-w-2xl mx-auto px-6 py-12">

        {/* Fil d'Ariane */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/quiz" className="hover:text-blue-600 transition-colors">Quiz</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">Module 5 — Fixed Income II</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Résultats</h1>
        <p className="text-gray-500 mb-8">Quiz · Module 5 — Fixed Income II</p>

        {/* Score */}
        <div className={`border rounded-xl p-6 mb-10 text-center ${scoreBg}`}>
          <p className={`text-5xl font-bold mb-2 ${scoreColor}`}>{score} / {TOTAL}</p>
          <p className="text-gray-600 text-sm">
            {score >= 10
              ? 'Excellent ! Tu maîtrises bien le Module 5.'
              : score >= 7
              ? 'Pas mal — quelques points à revoir.'
              : 'Il faut retravailler les fondamentaux.'}
          </p>
        </div>

        {/* Corrigé complet */}
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Corrigé complet</h2>
        <div className="space-y-4 mb-10">
          {questions.map((question, qi) => (
            <div key={question.id} className="bg-white border border-gray-300 rounded-xl p-5">
              <p className="text-sm font-medium text-gray-800 mb-3">
                <span className="text-gray-400 mr-2">{qi + 1}.</span>{question.question}
              </p>
              <div className="text-sm px-3 py-2 bg-green-50 border border-green-300 rounded-lg text-green-800 mb-2">
                ✓ {question.choices[question.answer]}
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{question.explanation}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={handleRestart}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Nouveau tirage
          </button>
          <Link
            href="/cours/module-5-fixed-income-2/cap-floor"
            className="px-6 py-2.5 rounded-lg text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Revoir le Module 5
          </Link>
          <Link
            href="/quiz"
            className="px-6 py-2.5 rounded-lg text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            ← Tous les quiz
          </Link>
        </div>

      </div>
    );
  }

  // ── Écran de question ──
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">

      {/* Fil d'Ariane */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-blue-600 transition-colors">Accueil</Link>
        <span>/</span>
        <Link href="/quiz" className="hover:text-blue-600 transition-colors">Quiz</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Module 5 — Fixed Income II</span>
      </nav>

      {/* Titre */}
      <h1 className="text-3xl font-bold text-gray-900 mb-1">Quiz · Module 5 — Fixed Income II</h1>
      <p className="text-sm text-gray-400 mb-8">
        12 questions tirées parmi 30 — un nouveau tirage à chaque session
      </p>

      {/* Progression */}
      <div className="mb-6">
        <p className="text-xs text-gray-400 mb-2">Question {current + 1} / {TOTAL}</p>
        <div className="w-full bg-gray-100 rounded-full h-1">
          <div
            className="bg-blue-600 h-1 rounded-full transition-all duration-300"
            style={{ width: `${(current / TOTAL) * 100}%` }}
          />
        </div>
      </div>

      {/* Carte question */}
      <div className="bg-white border border-gray-300 rounded-xl p-6 mb-4 shadow-sm">
        <div className="text-base font-medium text-gray-900 mb-6">{q.question}</div>

        {/* Choix */}
        <div>
          {q.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              className={choiceStyle(index)}
            >
              {choice}
            </button>
          ))}
        </div>

        {/* Explication */}
        {validated && (
          <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mt-4 text-sm text-gray-700">
            <span className="font-semibold text-gray-800">Explication : </span>
            {q.explanation}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        {!validated ? (
          <button
            onClick={handleValidate}
            disabled={selected === null}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Valider
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            {current === TOTAL - 1 ? 'Voir les résultats' : 'Question suivante'}
          </button>
        )}
      </div>

    </div>
  );
}
