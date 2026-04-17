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
    question: <>Qu&apos;est-ce que la volatilité implicite d&apos;une option ?</>,
    choices: [
      <>La valeur de <Katex>{'{\\sigma}'}</Katex> qu&apos;il faut injecter dans la formule de Black-Scholes pour retrouver le prix de marché de l&apos;option</>,
      <>La volatilité historique du sous-jacent sur la durée de vie de l&apos;option</>,
      <>La volatilité future réalisée anticipée par le marché</>,
      <>La dérivée du prix de l&apos;option par rapport à <Katex>{'{\\sigma}'}</Katex></>,
    ],
    answer: 0,
    explanation: <>La volatilité implicite est obtenue par inversion numérique de la formule BS. Elle n&apos;est pas observable directement — c&apos;est la valeur de <Katex>{'{\\sigma}'}</Katex> qui, insérée dans BS, reproduit exactement le prix coté sur le marché.</>,
  },
  {
    id: 'A2',
    question: <>Qu&apos;est-ce que la volatilité locale ?</>,
    choices: [
      <>Un modèle où la volatilité est une fonction déterministe du spot et du temps, <Katex>{'\\sigma = \\sigma(S, t)'}</Katex>, calibrée pour reproduire toute la surface de vol implicite</>,
      <>Un modèle où <Katex>{'{\\sigma}'}</Katex> est constant mais calibré strike par strike</>,
      <>Un modèle où la volatilité suit un processus stochastique indépendant</>,
      <>La volatilité moyenne observée sur un historique glissant</>,
    ],
    answer: 0,
    explanation: <>La vol locale (Dupire 1994) remplace le <Katex>{'{\\sigma}'}</Katex> constant de BS par une surface <Katex>{'\\sigma(S,t)'}</Katex> qui dépend du niveau du spot et du temps. Elle est unique et entièrement déterminée par les prix d&apos;options de marché via la formule de Dupire.</>,
  },
  {
    id: 'A3',
    question: <>En fonction de quels paramètres une surface de volatilité implicite est-elle définie ?</>,
    choices: [
      <>En fonction du Delta et du Vega</>,
      <>En fonction du spot <Katex>{'S'}</Katex> et du strike <Katex>{'K'}</Katex></>,
      <>En fonction du Delta et de la maturité <Katex>{'T'}</Katex></>,
      <>En fonction du strike <Katex>{'K'}</Katex> et de la maturité <Katex>{'T'}</Katex></>,
    ],
    answer: 3,
    explanation: <>La surface de volatilité implicite associe à chaque couple <Katex>{'(K, T)'}</Katex> une volatilité implicite <Katex>{'\\sigma_{impl}(K, T)'}</Katex>. C&apos;est la représentation standard utilisée par les traders pour visualiser et interpoler les prix d&apos;options.</>,
  },
  {
    id: 'A4',
    question: <>Quelle est la limite fondamentale de Black-Scholes qui a motivé l&apos;introduction de la volatilité locale ?</>,
    choices: [
      <>BS suppose des taux d&apos;intérêt nuls</>,
      <>BS suppose une volatilité constante pour tous les strikes et toutes les maturités, ce qui est contredit par le smile/skew observé en marché</>,
      <>BS ne permet pas de pricer les options américaines</>,
      <>BS ne prend pas en compte les dividendes discrets</>,
    ],
    answer: 1,
    explanation: <>Dans BS, <Katex>{'{\\sigma}'}</Katex> est une constante universelle. Or le marché cote des volatilités implicites différentes selon le strike (skew) et la maturité (term structure). Cette inconsistance a conduit Dupire à construire un modèle où <Katex>{'{\\sigma}'}</Katex> dépend de <Katex>{'(S, t)'}</Katex> et reproduit exactement toute la surface observée.</>,
  },
  {
    id: 'A5',
    question: <>Quelle est la limite principale de la volatilité locale ?</>,
    choices: [
      <>Elle ne peut pas reproduire le smile de volatilité observé</>,
      <>Elle suppose que la corrélation entre spot et vol est nulle</>,
      <>Elle introduit trop de paramètres et est impossible à calibrer</>,
      <>La surface de vol locale est calibrée statiquement sur les prix d&apos;aujourd&apos;hui : elle fige la dynamique future du smile, ce qui la rend inadaptée pour les produits sensibles à l&apos;évolution du smile</>,
    ],
    answer: 3,
    explanation: <>La vol locale reproduit parfaitement la surface d&apos;aujourd&apos;hui, mais prédit une dynamique future du smile irréaliste (le smile s&apos;aplatit avec le temps dans le modèle, ce qui n&apos;est pas observé). Elle est insuffisante pour les produits exotiques long terme sensibles à la dynamique du smile.</>,
  },
  {
    id: 'A6',
    question: <>Quelle contrainte d&apos;arbitrage doit respecter une surface de volatilité implicite en fonction de la maturité ?</>,
    choices: [
      <>La volatilité implicite doit converger vers zéro à maturité infinie</>,
      <>La variance totale <Katex>{'\\sigma_{impl}^2(K,T) \\cdot T'}</Katex> doit être croissante en <Katex>{'T'}</Katex> pour tout strike <Katex>{'K'}</Katex> fixé</>,
      <>La volatilité implicite doit être décroissante avec la maturité</>,
      <>La volatilité implicite doit être constante en maturité pour un strike ATM</>,
    ],
    answer: 1,
    explanation: <>Si la variance totale décroissait avec <Katex>{'T'}</Katex>, on pourrait construire un calendar spread d&apos;options qui génère un profit sans risque (arbitrage). La croissance de <Katex>{'\\sigma^2 \\cdot T'}</Katex> en <Katex>{'T'}</Katex> est donc une condition nécessaire d&apos;absence d&apos;arbitrage.</>,
  },
];

const groupB = [
  {
    id: 'B1',
    question: <>Qu&apos;est-ce qu&apos;un modèle à volatilité stochastique ?</>,
    choices: [
      <>Un modèle où le sous-jacent suit un processus à sauts</>,
      <>Un modèle où la volatilité suit elle-même un processus stochastique, piloté par un second mouvement brownien potentiellement corrélé au premier</>,
      <>Un modèle où <Katex>{'{\\sigma}'}</Katex> est une fonction déterministe de <Katex>{'S'}</Katex> et <Katex>{'t'}</Katex></>,
      <>Un modèle où <Katex>{'{\\sigma}'}</Katex> est constant mais recalibré chaque jour</>,
    ],
    answer: 1,
    explanation: <>Contrairement à la vol locale (<Katex>{'{\\sigma}'}</Katex> déterministe), la vol stochastique introduit une seconde source d&apos;aléa : la volatilité est elle-même aléatoire, ce qui génère naturellement un smile et une dynamique plus riche.</>,
  },
  {
    id: 'B2',
    question: <>Dans le modèle de Heston, comment est modélisée la variance ?</>,
    choices: [
      <>La variance est constante entre deux dates de recalibration</>,
      <>La variance est une fonction déterministe du spot</>,
      <>La variance suit un GBM indépendant du sous-jacent</>,
      <>La variance <Katex>{'v_t = \\sigma_t^2'}</Katex> suit un processus CIR piloté par un second mouvement brownien corrélé à celui du sous-jacent</>,
    ],
    answer: 3,
    explanation: <>Dans Heston, <Katex>{'dv_t = \\kappa(\\theta - v_t)dt + \\xi\\sqrt{v_t}\\,dW_t^V'}</Katex>. C&apos;est un processus CIR (mean-reverting, toujours positif sous la condition de Feller <Katex>{'2\\kappa\\theta > \\xi^2'}</Katex>), corrélé au brownien du spot via <Katex>{'\\rho'}</Katex>.</>,
  },
  {
    id: 'B3',
    question: <>Quelle notion nouvelle introduit la volatilité stochastique par rapport à Black-Scholes ?</>,
    choices: [
      <>La vol of vol : la volatilité de la volatilité elle-même</>,
      <>Le smile de volatilité implicite</>,
      <>La sensibilité du prix au taux sans risque</>,
      <>La dépendance du prix au dividende</>,
    ],
    answer: 0,
    explanation: <>En rendant <Katex>{'{\\sigma}'}</Katex> aléatoire, les modèles à vol stochastique introduisent un nouveau paramètre de risque : la volatilité de la volatilité (vol of vol, notée <Katex>{'\\xi'}</Katex> dans Heston ou <Katex>{'\\nu'}</Katex> dans SABR). Elle contrôle la courbure (convexité) du smile.</>,
  },
  {
    id: 'B4',
    question: <>Qu&apos;est-ce que calibrer un modèle financier ?</>,
    choices: [
      <>Simuler des trajectoires du sous-jacent pour estimer un prix</>,
      <>Vérifier que le modèle satisfait les conditions d&apos;absence d&apos;arbitrage</>,
      <>Estimer les paramètres du modèle à partir de données historiques uniquement</>,
      <>Trouver les valeurs des paramètres du modèle qui minimisent l&apos;écart entre les prix théoriques et les prix de marché observés</>,
    ],
    answer: 3,
    explanation: <>La calibration est une optimisation inverse : on cherche les paramètres (ex. <Katex>{'\\kappa, \\theta, \\xi, \\rho, v_0'}</Katex> pour Heston) tels que les prix d&apos;options générés par le modèle reproduisent au mieux les cotations de marché, en minimisant généralement une erreur quadratique sur les volatilités implicites.</>,
  },
  {
    id: 'B5',
    question: <>Dans le modèle de Heston, que contrôlent les paramètres <Katex>{'\\kappa'}</Katex> et <Katex>{'\\theta'}</Katex> ?</>,
    choices: [
      <><Katex>{'\\kappa'}</Katex> contrôle la pente du skew (corrélation spot-vol), <Katex>{'\\theta'}</Katex> contrôle la convexité du smile (la vol of vol)</>,
      <><Katex>{'\\kappa'}</Katex> est la vitesse de retour à la moyenne de la variance, <Katex>{'\\theta'}</Katex> est le niveau de variance long terme vers lequel elle converge</>,
      <><Katex>{'\\kappa'}</Katex> est la volatilité initiale, <Katex>{'\\theta'}</Katex> est la vitesse de retour à la moyenne de la variance</>,
      <><Katex>{'\\kappa'}</Katex> contrôle le niveau de variance long terme, <Katex>{'\\theta'}</Katex> contrôle la vitesse de mean-reversion</>,
    ],
    answer: 1,
    explanation: <>Le processus CIR de Heston <Katex>{'dv_t = \\kappa(\\theta - v_t)dt + \\xi\\sqrt{v_t}dW^V_t'}</Katex> est mean-reverting : quand <Katex>{'v_t > \\theta'}</Katex>, la dérive est négative (la variance revient vers <Katex>{'\\theta'}</Katex>), avec une vitesse gouvernée par <Katex>{'\\kappa'}</Katex>. Un <Katex>{'\\kappa'}</Katex> élevé = retour rapide, un <Katex>{'\\theta'}</Katex> élevé = vol long terme élevée.</>,
  },
  {
    id: 'B6',
    question: <>Dans le modèle SABR, que modélise le paramètre <Katex>{'\\rho'}</Katex> ?</>,
    choices: [
      <>La convexité du smile de volatilité</>,
      <>Le niveau initial de la volatilité</>,
      <>La pente du skew</>,
      <>La vitesse de retour à la moyenne de la volatilité</>,
    ],
    answer: 2,
    explanation: <>Dans SABR, <Katex>{'\\rho = d\\langle W^F, W^\\alpha \\rangle / dt'}</Katex> est la corrélation instantanée entre les deux browniens (S et la variance). Un <Katex>{'\\rho < 0'}</Katex> (typique actions) génère un skew négatif : quand le spot baisse, la vol monte. Un <Katex>{'\\rho > 0'}</Katex> génère un skew positif (typique matières premières).</>,
  },
];

const groupC = [
  {
    id: 'C1',
    question: <>Quelle est la différence fondamentale entre volatilité réalisée et volatilité implicite ?</>,
    choices: [
      <>Elles mesurent la même chose mais sur des horizons différents</>,
      <>La vol réalisée est cotée en marché, la vol implicite est calculée sur historique</>,
      <>La vol réalisée est toujours supérieure à la vol implicite</>,
      <>La vol réalisée mesure les mouvements passés effectifs du sous-jacent, tandis que la vol implicite est extraite des prix d&apos;options et reflète les anticipations du marché</>,
    ],
    answer: 3,
    explanation: <>La vol réalisée (<Katex>{'\\sigma_{real}'}</Katex>) est calculée a posteriori à partir des rendements observés. La vol implicite (<Katex>{'\\sigma_{impl}'}</Katex>) est extraite des prix d&apos;options aujourd&apos;hui et intègre les anticipations et la prime de risque de volatilité. En moyenne, <Katex>{'\\sigma_{impl} > \\sigma_{real}'}</Katex> (prime de risque positive).</>,
  },
  {
    id: 'C2',
    question: <>Comment est calculé le VIX ?</>,
    choices: [
      <>Par interpolation linéaire entre les deux variance swaps encadrant 30 jours sur le S&P 500, en agrégeant les prix d&apos;options de tous les strikes pondérés par <Katex>{'\\Delta K / K^2'}</Katex></>,
      <>Comme la volatilité historique annualisée du S&P 500 sur 30 jours glissants</>,
      <>Comme la moyenne des volatilités implicites ATM sur les 4 maturités les plus proches</>,
      <>Comme la racine carrée de la variance implicite ATM du S&P 500 à 30 jours</>,
    ],
    answer: 0,
    explanation: <>La méthodologie CBOE réplique un variance swap 30 jours en combinant un portefeuille d&apos;options S&P 500 (Puts et Calls OTM) de deux maturités adjacentes, pondérées par <Katex>{'\\Delta K_i / K_i^2'}</Katex>, puis interpolées pour obtenir exactement 30 jours. Le VIX est la racine carrée de cette variance × 100.</>,
  },
  {
    id: 'C3',
    question: <>Comment répliquer statiquement un variance swap ?</>,
    choices: [
      <>En prenant une position long/short sur deux maturités différentes</>,
      <>En vendant des options ATM et en achetant des options OTM</>,
      <>En achetant un straddle ATM et en re-hedgeant dynamiquement le Delta</>,
      <>En achetant un portefeuille de Puts et Calls pour tous les strikes du smile, avec une pondération <Katex>{'1/K^2'}</Katex></>,
    ],
    answer: 3,
    explanation: <>La pondération <Katex>{'1/K^2'}</Katex> est la clé : elle rend le P&L du portefeuille indépendant du spot (le Gamma du portefeuille est constant en <Katex>{'S'}</Katex>), ce qui permet de capturer exactement la variance réalisée sans re-hedging dynamique.</>,
  },
  {
    id: 'C4',
    question: <>Quel outil mathématique justifie la pondération <Katex>{'1/K^2'}</Katex> dans la réplication du variance swap ?</>,
    choices: [
      <>La formule de Dupire appliquée à la surface de vol locale, avec calibration constante et ajustement au niveau du Delta</>,
      <>La parité Call-Put généralisée aux options de variance</>,
      <>Le lemme d&apos;Itô appliqué à <Katex>{'\\ln S_t'}</Katex>, qui fait apparaître un terme de Gamma constant qu&apos;on annule en cherchant <Katex>{'\\Gamma(S) = 1/S^2'}</Katex></>,
      <>L&apos;inégalité de Jensen appliquée au lognormale-prix, ce qui explique la pondération quadratique <Katex>{'1/K^2'}</Katex></>,
    ],
    answer: 2,
    explanation: <>En appliquant Itô à <Katex>{'\\ln S'}</Katex>, le P&L delta-hedgé fait apparaître <Katex>{'\\frac{1}{2}S^2\\Gamma \\cdot \\sigma^2_{real}\\,dt'}</Katex>. Pour que ce terme soit indépendant de <Katex>{'S'}</Katex> (et donc réplicable statiquement), on impose <Katex>{'\\Gamma(S) = 1/S^2'}</Katex>, ce qui conduit au portefeuille de pondération <Katex>{'1/K^2'}</Katex>.</>,
  },
  {
    id: 'C5',
    question: <>Combien coûte un variance swap à l&apos;initiation ?</>,
    choices: [
      <>Une prime équivalente au carré de la volatilité implicite</>,
      <>Zéro, comme tout swap</>,
      <>Sa valeur actualisée du strike de variance <Katex>{'K_{var}'}</Katex></>,
      <>Une prime proportionnelle à la vol implicite ATM</>,
    ],
    answer: 1,
    explanation: <>Le strike <Katex>{'K_{var}'}</Katex> est précisément calibré pour que la valeur initiale du contrat soit nulle — exactement comme un swap de taux où le taux fixe est choisi pour annuler la valeur à l&apos;initiation. Le P&L n&apos;apparaît qu&apos;à maturité, selon que <Katex>{'\\sigma^2_{real}'}</Katex> est supérieure ou inférieure à <Katex>{'K_{var}'}</Katex>.</>,
  },
  {
    id: 'C6',
    question: <>Quelle est la différence principale entre un variance swap et un volatility swap ?</>,
    choices: [
      <>Ils sont identiques mais diffèrent par la convention de calcul de la vol réalisée</>,
      <>Le variance swap porte sur la vol réalisée, le vol swap sur la vol implicite</>,
      <>Le variance swap a un payoff en <Katex>{'\\sigma^2_{real} - K_{var}'}</Katex> (variance), le vol swap en <Katex>{'\\sigma_{real} - K_{vol}'}</Katex> (volatilité) — le variance swap se réplique statiquement, le vol swap non</>,
      <>Le variance swap est coté en points de vol, le vol swap en points de variance</>,
    ],
    answer: 2,
    explanation: <>La réplication statique du variance swap via un portefeuille <Katex>{'1/K^2'}</Katex> est exacte. Le vol swap (sur <Katex>{'\\sigma_{real}'}</Katex> et non <Katex>{'\\sigma^2_{real}'}</Katex>) ne bénéficie pas de cette propriété car la racine carrée brise la linéarité — sa réplication est approximative et requiert des hypothèses supplémentaires.</>,
  },
];

const groupD = [
  {
    id: 'D1',
    question: <>Qu&apos;est-ce que le Skew Delta ?</>,
    choices: [
      <>La composante du Delta total due à la variation de la volatilité implicite lorsque le spot se déplace</>,
      <>La dérivée du Delta par rapport au strike, insuffisante du point de vue de Black Scholes pur</>,
      <>La sensibilité du Vega à une variation du spot au degré infinitésimal</>,
      <>La dérivée de la volatilité implicite par rapport au strike</>,
    ],
    answer: 0,
    explanation: <>Quand le spot bouge, la vol implicite se déplace aussi (le smile n&apos;est pas fixe). Le Delta total doit en tenir compte : <Katex>{'\\Delta_{total} = \\Delta_{BS} + \\mathcal{V} \\cdot \\frac{\\partial \\sigma}{\\partial S}'}</Katex>. Le second terme est le Skew Delta — il peut être significatif dans un book avec un fort skew.</>,
  },
  {
    id: 'D2',
    question: <>En régime Sticky Strike, quelle est la valeur du Skew Delta ?</>,
    choices: [
      <>Positive pour un Call, négative pour un Put</>,
      <>Zéro</>,
      <>Égale au Vanna</>,
      <>Égale au Delta BS</>,
    ],
    answer: 1,
    explanation: <>En Sticky Strike (<Katex>{'\\alpha = 0'}</Katex>), la surface de vol reste fixe en termes de strike absolu quand le spot bouge. Donc <Katex>{'\\frac{\\partial \\sigma}{\\partial S} = 0'}</Katex> et le Skew Delta est nul : <Katex>{'\\Delta_{total} = \\Delta_{BS}'}</Katex>.</>,
  },
  {
    id: 'D3',
    question: <>Si je suis Vega-neutre sur mon portefeuille, que vaut mon Skew Delta ?</>,
    choices: [
      <>Il dépend uniquement de la pente du skew <Katex>{'\\partial \\sigma / \\partial S'}</Katex></>,
      <>Il est égal au Delta BS pur</>,
      <>Il est maximal car le Vega amplifie le skew</>,
      <>Zéro, car le Skew Delta est proportionnel au Vega</>,
    ],
    answer: 3,
    explanation: <>Le Skew Delta vaut <Katex>{'\\mathcal{V} \\cdot \\frac{\\partial \\sigma}{\\partial S}'}</Katex>. Si <Katex>{'\\mathcal{V} = 0'}</Katex> (portefeuille Vega-neutre), le produit est nul quel que soit le skew. Être Vega-neutre annule automatiquement l&apos;exposition au Skew Delta.</>,
  },
  {
    id: 'D4',
    question: <>En régime Sticky Delta (<Katex>{'\\alpha = 1'}</Katex>), comment se comporte le smile quand le spot se déplace ?</>,
    choices: [
      <>La vol ATM augmente quand le spot monte</>,
      <>Le smile reste fixe en termes de strike absolu</>,
      <>Le smile se translate avec le spot : la vol ATM reste constante et chaque niveau de moneyness <Katex>{'K/S'}</Katex> conserve sa volatilité</>,
      <>Le smile disparaît progressivement</>,
    ],
    answer: 2,
    explanation: <>En Sticky Delta, c&apos;est la moneyness <Katex>{'K/S'}</Katex> qui pilote la vol, pas le strike absolu. Quand le spot monte de 100 à 105, le smile se translate vers la droite de 5 points. La vol ATM ne change pas.</>,
  },
  {
    id: 'D5',
    question: <>Je suis long Put strike 90, short Put strike 100 (Put spread), le spot est à 100, Delta BS total nul. En régime Sticky Skew, si le spot descend à 95, mon Delta total devient :</>,
    choices: [
      <>Nul, car le Delta BS reste couvert</>,
      <>Négatif, car le short PUt K=100 gagne en valeur</>,
      <>Positif, ce qui génère une perte si le spot continue de baisser</>,
      <>Positif, ce qui génère un gain si le spot continue de baisser</>,
    ],
    answer: 2,
    explanation: <>En Sticky Skew, quand le spot descend, la vol du Put K=90 (downside, maintenant moins OTM) baisse et celle du Put K=100 (upside, maintenant ITM) monte. Le long Put K=90 perd de la valeur relative, le short Put K=100 en gagne. Le Delta total devient positif : on est implicitement long marché alors que le spot baisse, c'est donc une perte.</>,
  },
  {
    id: 'D6',
    question: <>Quelle est la relation entre le Skew Delta et le Vanna ?</>,
    choices: [
      <>Le Vanna est le carré du Skew Delta</>,
      <>Le Skew Delta est la dérivée du Vanna par rapport au spot</>,
      <>Il n&apos;y a pas de relation directe entre les deux</>,
      <>Le Vanna est défini comme <Katex>{'\\partial \\Delta / \\partial \\sigma = \\partial \\mathcal{V} / \\partial S'}</Katex>, et le Skew Delta utilise exactement cette quantité : la sensibilité croisée entre spot et volatilité</>,
    ],
    answer: 3,
    explanation: <>Le Vanna mesure <Katex>{'\\frac{\\partial \\mathcal{V}}{\\partial S}'}</Katex>, c&apos;est-à-dire comment le Vega change quand le spot bouge. Le Skew Delta fait intervenir le même cross-Greek : c&apos;est parce que le spot bouge que la vol change, et c&apos;est le Vanna qui quantifie cette interaction. Les deux notions sont intimement liées.</>,
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

export default function QuizModule6Page() {
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
          <span className="text-gray-800 font-medium">Module 6 — Volatilité</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Résultats</h1>
        <p className="text-gray-500 mb-8">Quiz · Module 6 — Volatilité</p>

        {/* Score */}
        <div className={`border rounded-xl p-6 mb-10 text-center ${scoreBg}`}>
          <p className={`text-5xl font-bold mb-2 ${scoreColor}`}>{score} / {TOTAL}</p>
          <p className="text-gray-600 text-sm">
            {score >= 9
              ? 'Excellent ! Tu maîtrises bien le Module 6.'
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
            href="/cours/module-6-volatilite/vol-implicite-nappes"
            className="px-6 py-2.5 rounded-lg text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Revoir le Module 6
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
        <span className="text-gray-800 font-medium">Module 6 — Volatilité</span>
      </nav>

      {/* Titre */}
      <h1 className="text-3xl font-bold text-gray-900 mb-1">Quiz · Module 6 — Volatilité</h1>
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
