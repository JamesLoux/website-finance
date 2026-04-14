'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import katex from 'katex';
import 'katex/dist/katex.min.css';

function Katex({ children, block = false }) {
  const formula = Array.isArray(children) ? children.join('') : String(children);
  const html = katex.renderToString(formula, { throwOnError: false, displayMode: block });
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

// ── Banque de 24 questions — 4 groupes de 6 ──

const groupA = [
  {
    id: 'A1',
    question: <>Par quel principe trouve-t-on l&apos;EDP de Black-Scholes ?</>,
    choices: [
      <>La réplication et le delta-hedging</>,
      <>Le théorème central limite</>,
      <>La minimisation de la variance</>,
      <>L&apos;intégration stochastique directe</>,
    ],
    answer: 0,
    explanation: <>On construit un portefeuille <Katex>{'\\Pi = V - \\Delta S'}</Katex> qui réplique l&apos;option. En choisissant <Katex>{'\\Delta = \\partial V/\\partial S'}</Katex>, le terme aléatoire <Katex>{'dW'}</Katex> disparaît. Le portefeuille devient déterministe et, par absence d&apos;arbitrage, doit rapporter <Katex>{'r'}</Katex> — ce qui donne directement l&apos;EDP de BS.</>,
  },
  {
    id: 'A2',
    question: <>Dans la dérivation BS, on construit <Katex>{'\\Pi = V - \\Delta S'}</Katex>. Quelle valeur de <Katex>{'\\Delta'}</Katex> rend le portefeuille sans risque ?</>,
    choices: [
      <><Katex>{'\\partial V/\\partial t'}</Katex></>,
      <><Katex>{'\\partial V/\\partial \\sigma'}</Katex></>,
      <><Katex>{'\\partial^2 V/\\partial S^2'}</Katex></>,
      <><Katex>{'\\partial V/\\partial S'}</Katex></>,
    ],
    answer: 3,
    explanation: <>On applique le lemme d&apos;Itô à <Katex>{'V(S,t)'}</Katex>. Le terme en <Katex>{'dW'}</Katex> de <Katex>{'dV'}</Katex> est <Katex>{'(\\partial V/\\partial S)\\,dS'}</Katex>. Pour que <Katex>{'d\\Pi = dV - \\Delta\\,dS'}</Katex> soit sans terme aléatoire, il faut annuler ce terme, soit <Katex>{'\\Delta = \\partial V/\\partial S'}</Katex> — le Delta de l&apos;option.</>,
  },
  {
    id: 'A3',
    question: <>L&apos;équation de Black-Scholes en termes de Greeks s&apos;écrit :</>,
    choices: [
      <><Katex>{'\\Theta + rS\\Delta + \\tfrac{1}{2}\\sigma^2 S^2 \\Gamma = rV'}</Katex></>,
      <><Katex>{'\\Theta + rS\\Delta + \\sigma^2 S^2 \\Gamma = rV'}</Katex></>,
      <><Katex>{'\\Theta + S\\Delta + \\tfrac{1}{2}\\sigma^2 S^2 \\Gamma = V'}</Katex></>,
      <><Katex>{'\\Theta - rS\\Delta + \\tfrac{1}{2}\\sigma^2 S^2 \\Gamma = rV'}</Katex></>,
    ],
    answer: 0,
    explanation: <>En substituant les Greeks dans l&apos;EDP BS, on obtient <Katex>{'\\Theta + rS\\Delta + \\tfrac{1}{2}\\sigma^2 S^2\\Gamma = rV'}</Katex>. Le facteur <Katex>{'\\tfrac{1}{2}'}</Katex> devant <Katex>{'\\sigma^2'}</Katex> vient du terme de second ordre d&apos;Itô, et le membre droit <Katex>{'rV'}</Katex> est le coût de financement du portefeuille.</>,
  },
  {
    id: 'A4',
    question: <>Quelle hypothèse du modèle BS est la plus souvent violée en pratique ?</>,
    choices: [
      <>Absence de dividendes</>,
      <>Taux sans risque constant</>,
      <>Volatilité constante</>,
      <>Pas de coûts de transaction</>,
    ],
    answer: 2,
    explanation: <>La volatilité n&apos;est pas constante — elle dépend du strike (skew) et de la maturité (term structure). C&apos;est pourquoi toute la surface de volatilité implicite existe : si BS était exact, elle serait plate. Les modules 3 et 6 traitent directement de cette limite.</>,
  },
  {
    id: 'A5',
    question: <>Pourquoi le portefeuille <Katex>{'\\Pi = V - \\Delta S'}</Katex> devient-il déterministe après le choix de <Katex>{'\\Delta'}</Katex> ?</>,
    choices: [
      <>Parce que <Katex>{'V'}</Katex> est une constante</>,
      <>Parce que le terme en <Katex>{'dW'}</Katex> disparaît</>,
      <>Parce que <Katex>{'S'}</Katex> ne fluctue plus</>,
      <>Parce qu&apos;on suppose <Katex>{'\\sigma = 0'}</Katex></>,
    ],
    answer: 1,
    explanation: <>Après application du lemme d&apos;Itô, <Katex>{'dV'}</Katex> contient un terme <Katex>{'(\\partial V/\\partial S)\\,dS'}</Katex>. Dans <Katex>{'d\\Pi = dV - \\Delta\\,dS'}</Katex>, si <Katex>{'\\Delta = \\partial V/\\partial S'}</Katex>, les deux termes en <Katex>{'dW'}</Katex> s&apos;annulent exactement. Il ne reste que des termes en <Katex>{'dt'}</Katex> — le portefeuille est alors parfaitement déterministe sur un instant <Katex>{'dt'}</Katex>.</>,
  },
  {
    id: 'A6',
    question: <>Si le portefeuille delta-hedgé est sans risque, par quel argument conclut-on qu&apos;il doit rapporter <Katex>{'r'}</Katex> ?</>,
    choices: [
      <>La loi des grands nombres</>,
      <>Le théorème de Feynman-Kac</>,
      <>L&apos;absence d&apos;arbitrage</>,
      <>La parité Call-Put</>,
    ],
    answer: 2,
    explanation: <>Un portefeuille sans risque qui rapporterait plus que <Katex>{'r'}</Katex> permettrait un arbitrage (emprunter à <Katex>{'r'}</Katex>, investir dans le portefeuille). Moins que <Katex>{'r'}</Katex>, c&apos;est l&apos;arbitrage inverse. Par absence d&apos;arbitrage, le seul rendement possible est <Katex>{'r'}</Katex> — c&apos;est ce qui ferme l&apos;équation et donne l&apos;EDP de BS.</>,
  },
];

const groupB = [
  {
    id: 'B1',
    question: <>Que représente <Katex>{'N(d_2)'}</Katex> dans la formule de Black-Scholes ?</>,
    choices: [
      <>Le Delta du Call</>,
      <>La probabilité d&apos;exercice sous la mesure risque-neutre <Katex>{'\\mathbb{Q}'}</Katex></>,
      <>La probabilité d&apos;exercice sous la mesure historique <Katex>{'\\mathbb{P}'}</Katex></>,
      <>Le Vega du Call</>,
    ],
    answer: 1,
    explanation: <><Katex>{'N(d_2) = \\mathbb{Q}(S_T > K)'}</Katex> — c&apos;est la probabilité, calculée sous la mesure risque-neutre <Katex>{'\\mathbb{Q}'}</Katex>, que l&apos;option soit exercée à maturité. Elle pondère le terme <Katex>{'Ke^{-r\\tau}'}</Katex> dans la formule du Call.</>,
  },
  {
    id: 'B2',
    question: <>Que représente <Katex>{'N(d_1)'}</Katex> ?</>,
    choices: [
      <>La probabilité que <Katex>{'S_T > K'}</Katex> sous <Katex>{'\\mathbb{Q}'}</Katex></>,
      <>Le Delta du Call</>,
      <>Le Gamma du Call</>,
      <>La probabilité d&apos;exercice sous <Katex>{'\\mathbb{P}'}</Katex></>,
    ],
    answer: 1,
    explanation: <><Katex>{'N(d_1)'}</Katex> est le Delta du Call, soit <Katex>{'\\partial C/\\partial S'}</Katex>. Il représente la sensibilité du prix de l&apos;option au cours du sous-jacent, et correspond à la quantité d&apos;actions à détenir dans le portefeuille de réplication. Ce n&apos;est pas directement une probabilité d&apos;exercice (c&apos;est <Katex>{'N(d_2)'}</Katex> sous <Katex>{'\\mathbb{Q}'}</Katex>).</>,
  },
  {
    id: 'B3',
    question: <>Quel théorème relie l&apos;EDP de Black-Scholes à la formule d&apos;espérance sous <Katex>{'\\mathbb{Q}'}</Katex> ?</>,
    choices: [
      <>Le théorème de Girsanov</>,
      <>Le lemme d&apos;Itô</>,
      <>Le théorème de Feynman-Kac</>,
      <>Le théorème central limite</>,
    ],
    answer: 2,
    explanation: <>Feynman-Kac établit une correspondance entre les EDP paraboliques et les espérances de processus stochastiques. Appliqué à l&apos;EDP de BS, il donne directement <Katex>{'V = e^{-r\\tau}\\,\\mathbb{E}^{\\mathbb{Q}}[\\Phi(S_T)\\mid\\mathcal{F}_t]'}</Katex> — la valeur de l&apos;option est l&apos;espérance actualisée de son payoff sous <Katex>{'\\mathbb{Q}'}</Katex>.</>,
  },
  {
    id: 'B4',
    question: <>Dans la formule BS, <Katex>{'d_2'}</Katex> est défini comme :</>,
    choices: [
      <><Katex>{'d_1 + \\sigma\\sqrt{\\tau}'}</Katex></>,
      <><Katex>{'d_1 - \\sigma\\sqrt{\\tau}'}</Katex></>,
      <><Katex>{'d_1 \\times \\sigma\\sqrt{\\tau}'}</Katex></>,
      <><Katex>{'d_1 / \\sigma\\sqrt{\\tau}'}</Katex></>,
    ],
    answer: 1,
    explanation: <><Katex>{'d_1 = \\tfrac{\\ln(S/K)+(r+\\frac{1}{2}\\sigma^2)\\tau}{\\sigma\\sqrt{\\tau}}'}</Katex> et <Katex>{'d_2 = d_1 - \\sigma\\sqrt{\\tau}'}</Katex>. La différence <Katex>{'\\sigma\\sqrt{\\tau}'}</Katex> provient de la complétion du carré lors du calcul de l&apos;intégrale. Elle représente la &quot;distance&quot; entre les deux probabilités <Katex>{'N(d_1)'}</Katex> et <Katex>{'N(d_2)'}</Katex>.</>,
  },
  {
    id: 'B5',
    question: <>Dans la formule du Call BS <Katex>{'C = S \\cdot N(d_1) - Ke^{-r\\tau} \\cdot N(d_2)'}</Katex>, que représente le terme <Katex>{'Ke^{-r\\tau} \\cdot N(d_2)'}</Katex> ?</>,
    choices: [
      <>La valeur actuelle du sous-jacent pondérée par la proba d&apos;exercice</>,
      <>La valeur actualisée du strike, pondérée par la proba d&apos;exercice sous <Katex>{'\\mathbb{Q}'}</Katex></>,
      <>Le Delta du Call multiplié par le strike</>,
      <>La valeur intrinsèque du Call</>,
    ],
    answer: 1,
    explanation: <><Katex>{'Ke^{-r\\tau}'}</Katex> est la valeur actuelle du strike (actualisé au taux <Katex>{'r'}</Katex> sur la durée <Katex>{'\\tau'}</Katex>). Multiplié par <Katex>{'N(d_2) = \\mathbb{Q}(S_T > K)'}</Katex>, ce terme représente le coût espéré actualisé de l&apos;exercice — ce qu&apos;on paie en moyenne pour acquérir le sous-jacent à maturité.</>,
  },
  {
    id: 'B6',
    question: <>Que démontre implicitement le théorème de Feynman-Kac dans le contexte de Black-Scholes ?</>,
    choices: [
      <>Que la formule BS n&apos;est valable que pour les Calls européens</>,
      <>Que pricer par réplication dynamique et pricer par espérance actualisée sous <Katex>{'\\mathbb{Q}'}</Katex> sont rigoureusement équivalents</>,
      <>Que la mesure risque-neutre <Katex>{'\\mathbb{Q}'}</Katex> coïncide toujours avec la mesure historique <Katex>{'\\mathbb{P}'}</Katex></>,
      <>Que le prix d&apos;une option ne dépend pas du taux de dérive <Katex>{'\\mu'}</Katex></>,
    ],
    answer: 1,
    explanation: <>L&apos;EDP de BS est obtenue par réplication dynamique (delta-hedging + absence d&apos;arbitrage). Feynman-Kac montre que la solution de cette EDP s&apos;écrit aussi comme une espérance actualisée sous <Katex>{'\\mathbb{Q}'}</Katex>. Les deux approches — construire un portefeuille répliquant, ou calculer <Katex>{'\\mathbb{E}^{\\mathbb{Q}}[e^{-r\\tau}\\Phi(S_T)]'}</Katex> — donnent exactement le même prix.</>,
  },
];

const groupC = [
  {
    id: 'C1',
    question: <>Quelle est la principale limite du modèle de Bachelier ?</>,
    choices: [
      <>Il ne modélise pas la volatilité</>,
      <>Il autorise des prix négatifs</>,
      <>Il suppose une volatilité stochastique</>,
      <>Il n&apos;a pas de solution analytique</>,
    ],
    answer: 1,
    explanation: <>Dans le modèle de Bachelier, <Katex>{'S_T'}</Katex> suit une loi normale : <Katex>{'S_T = S_0 + \\mu T + \\sigma\\sqrt{T}\\,Z'}</Katex>. La loi normale étant définie sur <Katex>{'\\mathbb{R}'}</Katex>, rien n&apos;empêche <Katex>{'S_T'}</Katex> de prendre des valeurs négatives — ce qui est économiquement absurde pour une action. C&apos;est la raison pour laquelle Black-Scholes (GBM, log-normal) a supplanté Bachelier pour les actions.</>,
  },
  {
    id: 'C2',
    question: <>Dans le modèle de Bachelier, la loi de <Katex>{'S_T'}</Katex> est :</>,
    choices: [
      <>Log-normale</>,
      <>Normale</>,
      <>Chi-deux</>,
      <>Exponentielle</>,
    ],
    answer: 1,
    explanation: <>L&apos;EDS de Bachelier est <Katex>{'dS = \\mu\\,dt + \\sigma\\,dW'}</Katex> (sans le facteur <Katex>{'S'}</Katex>). La solution est <Katex>{'S_T = S_0 + \\mu T + \\sigma W_T'}</Katex>. Comme <Katex>{'W_T \\sim \\mathcal{N}(0,T)'}</Katex>, <Katex>{'S_T'}</Katex> suit une loi normale de moyenne <Katex>{'S_0 + \\mu T'}</Katex> et d&apos;écart-type <Katex>{'\\sigma\\sqrt{T}'}</Katex>.</>,
  },
  {
    id: 'C3',
    question: <>L&apos;EDS du modèle Black-Scholes est <Katex>{'dS = \\mu S\\,dt + \\sigma S\\,dW'}</Katex>. Dans le terme de diffusion <Katex>{'\\sigma S\\,dW'}</Katex>, que signifie le facteur <Katex>{'S'}</Katex> ?</>,
    choices: [
      <>La volatilité est absolue (en euros), indépendante du niveau du prix</>,
      <>La volatilité est proportionnelle au niveau du prix — les chocs sont multiplicatifs</>,
      <>Le modèle suppose que <Katex>{'S'}</Katex> est constant</>,
      <><Katex>{'S'}</Katex> représente le strike</>,
    ],
    answer: 1,
    explanation: <>Le terme de diffusion <Katex>{'\\sigma S\\,dW'}</Katex> signifie que le choc aléatoire est proportionnel au prix courant <Katex>{'S'}</Katex>. Plus le prix est élevé, plus les fluctuations sont grandes en valeur absolue. C&apos;est le modèle des rendements constants : <Katex>{'dS/S = \\mu\\,dt + \\sigma\\,dW'}</Katex>.</>,
  },
  {
    id: 'C4',
    question: <>Pour quel type d&apos;actif le modèle de Bachelier reste-t-il utilisé aujourd&apos;hui ?</>,
    choices: [
      <>Les actions à forte capitalisation</>,
      <>Les options sur indices exotiques</>,
      <>Les taux d&apos;intérêt et les spreads de crédit</>,
      <>Les options sur devises</>,
    ],
    answer: 2,
    explanation: <>Les taux d&apos;intérêt et les spreads peuvent être négatifs (taux négatifs en zone euro 2014-2022, spreads qui se compriment). La loi normale de Bachelier est donc appropriée dans ce contexte, contrairement à GBM qui exclut les valeurs négatives. Bachelier est aussi utilisé pour le pétrole (WTI) qui peut devenir négatif (avril 2020).</>,
  },
  {
    id: 'C5',
    question: <>Dans le modèle GBM (Black-Scholes), quelle est la loi de <Katex>{'S_T'}</Katex> sachant <Katex>{'S_0'}</Katex> ?</>,
    choices: [
      <>Normale</>,
      <>Log-normale</>,
      <>Uniforme</>,
      <>De Poisson</>,
    ],
    answer: 1,
    explanation: <>Par le lemme d&apos;Itô appliqué à <Katex>{'\\ln S'}</Katex>, on obtient <Katex>{'\\ln(S_T/S_0) \\sim \\mathcal{N}((\\mu - \\tfrac{1}{2}\\sigma^2)T,\\; \\sigma^2 T)'}</Katex>. Comme <Katex>{'S_T = S_0 \\cdot e^{\\cdots}'}</Katex>, <Katex>{'S_T'}</Katex> suit une loi log-normale, strictement positive — ce qui corrige le défaut de Bachelier.</>,
  },
  {
    id: 'C6',
    question: <>Quelle propriété distingue fondamentalement GBM de Bachelier en termes de domaine des valeurs ?</>,
    choices: [
      <>GBM a une volatilité plus faible</>,
      <>Bachelier modélise des rendements, GBM des prix</>,
      <>GBM confine <Katex>{'S_T'}</Katex> sur <Katex>{'\\,]0,+\\infty['}</Katex>, Bachelier autorise <Katex>{'S_T < 0'}</Katex></>,
      <>GBM est discret, Bachelier est continu</>,
    ],
    answer: 2,
    explanation: <>C&apos;est la différence structurelle clé. Dans GBM, <Katex>{'S_T = S_0 \\cdot e^{\\cdots} > 0'}</Katex> toujours. Dans Bachelier, <Katex>{'S_T = S_0 + \\text{terme gaussien}'}</Katex>, qui peut être négatif. Cette propriété détermine pour quel type d&apos;actif chaque modèle est adapté.</>,
  },
];

const groupD = [
  {
    id: 'D1',
    question: <>Le schéma exact GBM sous <Katex>{'\\mathbb{Q}'}</Katex> pour simuler <Katex>{'S_T'}</Katex> est :</>,
    choices: [
      <><Katex>{'S_T = S_0 + rS_0 T + \\sigma\\sqrt{T}\\,Z'}</Katex></>,
      <><Katex>{'S_T = S_0 \\cdot \\exp\\!\\left((r - \\tfrac{1}{2}\\sigma^2)T + \\sigma\\sqrt{T}\\,Z\\right)'}</Katex></>,
      <><Katex>{'S_T = S_0 \\cdot \\exp\\!\\left(rT + \\sigma\\sqrt{T}\\,Z\\right)'}</Katex></>,
      <><Katex>{'S_T = S_0 \\cdot \\exp\\!\\left((r + \\tfrac{1}{2}\\sigma^2)T + \\sigma\\sqrt{T}\\,Z\\right)'}</Katex></>,
    ],
    answer: 1,
    explanation: <>Sous <Katex>{'\\mathbb{Q}'}</Katex>, le drift est <Katex>{'r'}</Katex>. Le lemme d&apos;Itô appliqué à <Katex>{'\\ln S'}</Katex> donne <Katex>{'\\ln(S_T/S_0) = (r - \\tfrac{1}{2}\\sigma^2)T + \\sigma W_T'}</Katex>. Le terme <Katex>{'-\\tfrac{1}{2}\\sigma^2'}</Katex> est l&apos;ajustement de convexité (correction d&apos;Itô). Ce schéma est exact car la loi de <Katex>{'S_T'}</Katex> est connue analytiquement.</>,
  },
  {
    id: 'D2',
    question: <>Sur quel principe repose la simulation de Monte-Carlo ?</>,
    choices: [
      <>On génère un grand nombre de scénarios aléatoires selon la loi de <Katex>{'S_T'}</Katex>, et la loi des grands nombres garantit que la moyenne des payoffs converge vers l&apos;espérance théorique</>,
      <>On résout l&apos;EDP de Black-Scholes par différences finies</>,
      <>On approxime la distribution de <Katex>{'S_T'}</Katex> par une loi normale</>,
      <>On minimise l&apos;erreur de discrétisation par un schéma d&apos;Euler</>,
    ],
    answer: 0,
    explanation: <>Monte-Carlo repose sur la loi des grands nombres : si <Katex>{'X_1, X_2, \\ldots, X_M'}</Katex> sont des réalisations i.i.d. d&apos;une variable <Katex>{'X'}</Katex>, alors <Katex>{'\\tfrac{1}{M}\\sum X_i \\to \\mathbb{E}[X]'}</Katex> p.s. quand <Katex>{'M \\to \\infty'}</Katex>. On simule <Katex>{'M'}</Katex> payoffs <Katex>{'\\Phi(S_T^i)'}</Katex>, on fait la moyenne, on actualise.</>,
  },
  {
    id: 'D3',
    question: <>D&apos;après le théorème central limite, l&apos;erreur standard d&apos;une estimation Monte-Carlo avec <Katex>{'M'}</Katex> simulations est proportionnelle à :</>,
    choices: [
      <><Katex>{'1/M'}</Katex></>,
      <><Katex>{'1/\\sqrt{M}'}</Katex></>,
      <><Katex>{'1/M^2'}</Katex></>,
      <><Katex>{'\\sqrt{M}'}</Katex></>,
    ],
    answer: 1,
    explanation: <>Le TCL dit que l&apos;erreur d&apos;estimation de la moyenne est <Katex>{'\\sigma/\\sqrt{M}'}</Katex>, où <Katex>{'\\sigma'}</Katex> est l&apos;écart-type des payoffs simulés. L&apos;erreur décroît donc en <Katex>{'1/\\sqrt{M}'}</Katex> — lentement. Pour gagner un facteur 10 en précision, il faut multiplier <Katex>{'M'}</Katex> par 100.</>,
  },
  {
    id: 'D4',
    question: <>Pour diviser l&apos;erreur Monte-Carlo par 10, il faut multiplier le nombre de simulations par :</>,
    choices: [
      <>10</>,
      <>50</>,
      <>100</>,
      <>1&nbsp;000</>,
    ],
    answer: 2,
    explanation: <>L&apos;erreur est en <Katex>{'1/\\sqrt{M}'}</Katex>. Si on veut erreur/10, il faut <Katex>{'1/\\sqrt{M\'} = (1/\\sqrt{M})/10'}</Katex>, soit <Katex>{'M\' = 100M'}</Katex>. Diviser l&apos;erreur par un facteur <Katex>{'k'}</Katex> coûte <Katex>{'k^2'}</Katex> fois plus de simulations — d&apos;où l&apos;importance des techniques de réduction de variance.</>,
  },
  {
    id: 'D5',
    question: <>Pour quel type d&apos;option Monte-Carlo est-il particulièrement adapté, par rapport à une méthode analytique ?</>,
    choices: [
      <>Le Call européen vanille</>,
      <>Le Put européen vanille</>,
      <>Une option asiatique (payoff dépendant du chemin)</>,
      <>Le Call digital</>,
    ],
    answer: 2,
    explanation: <>Les options path-dependent (asiatiques, barrières, lookback) ont un payoff qui dépend de toute la trajectoire de <Katex>{'S'}</Katex>, pas seulement de <Katex>{'S_T'}</Katex>. Il n&apos;existe généralement pas de formule fermée. Monte-Carlo simule des trajectoires complètes — il est donc naturellement adapté à ces produits.</>,
  },
  {
    id: 'D6',
    question: <>Dans une simulation Monte-Carlo de pricing, on actualise le payoff moyen au taux <Katex>{'r'}</Katex>. Pourquoi ?</>,
    choices: [
      <>Pour tenir compte de l&apos;inflation</>,
      <>Parce que les simulations sont faites sous <Katex>{'\\mathbb{P}'}</Katex></>,
      <>Parce que la valeur d&apos;une option est une espérance actualisée sous <Katex>{'\\mathbb{Q}'}</Katex></>,
      <>Pour corriger le biais de l&apos;estimateur</>,
    ],
    answer: 2,
    explanation: <>Par Feynman-Kac, <Katex>{'V_0 = e^{-rT}\\,\\mathbb{E}^{\\mathbb{Q}}[\\Phi(S_T)]'}</Katex>. On simule sous <Katex>{'\\mathbb{Q}'}</Katex> (drift <Katex>{'r'}</Katex>, pas <Katex>{'\\mu'}</Katex>), on calcule la moyenne des payoffs, et on multiplie par <Katex>{'e^{-rT}'}</Katex> pour actualiser. L&apos;actualisation est au cœur de la définition du prix par absence d&apos;arbitrage.</>,
  },
];

// ── Tirage stratifié : 3 questions au hasard dans chaque groupe ──
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
    ...shuffle(groupA).slice(0, 3),
    ...shuffle(groupB).slice(0, 3),
    ...shuffle(groupC).slice(0, 3),
    ...shuffle(groupD).slice(0, 3),
  ];
}

const TOTAL = 12;

export default function QuizModule2Page() {
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
      score >= 9 ? 'text-green-600' : score >= 6 ? 'text-amber-500' : 'text-red-500';
    const scoreBg =
      score >= 9 ? 'bg-green-50 border-green-200' : score >= 6 ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200';

    return (
      <div className="max-w-2xl mx-auto px-6 py-12">

        {/* Fil d'Ariane */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/quiz" className="hover:text-blue-600 transition-colors">Quiz</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">Module 2 — Pricing</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Résultats</h1>
        <p className="text-gray-500 mb-8">Quiz · Module 2 — Pricing</p>

        {/* Score */}
        <div className={`border rounded-xl p-6 mb-10 text-center ${scoreBg}`}>
          <p className={`text-5xl font-bold mb-2 ${scoreColor}`}>{score} / {TOTAL}</p>
          <p className="text-gray-600 text-sm">
            {score >= 9
              ? 'Excellent ! Tu maîtrises bien le Module 2.'
              : score >= 6
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
            href="/cours/module-2-pricing/equation-black-scholes"
            className="px-6 py-2.5 rounded-lg text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Revoir le Module 2
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
        <span className="text-gray-800 font-medium">Module 2 — Pricing</span>
      </nav>

      {/* Titre */}
      <h1 className="text-3xl font-bold text-gray-900 mb-1">Quiz · Module 2 — Pricing</h1>
      <p className="text-sm text-gray-400 mb-8">
        12 questions tirées parmi 24 — un nouveau tirage à chaque session
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
