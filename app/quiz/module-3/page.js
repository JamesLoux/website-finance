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

// ── Banque de 20 questions — 3 groupes (A : 8, B : 6, C : 6) ──

const groupA = [
  {
    id: 'A1',
    question: <>Quel est le lien entre la fonction de répartition <Katex>{'N(x)'}</Katex> et la fonction de densité <Katex>{'n(x)'}</Katex> ?</>,
    choices: [
      <><Katex>{'N'}</Katex> est la primitive de <Katex>{'n'}</Katex></>,
      <><Katex>{'N'}</Katex> est la dérivée de <Katex>{'n'}</Katex></>,
      <><Katex>{'n'}</Katex> et <Katex>{'N'}</Katex> sont égales en <Katex>{'x = 0'}</Katex></>,
      <><Katex>{'n'}</Katex> est la primitive de <Katex>{'N'}</Katex></>,
    ],
    answer: 0,
    explanation: <>Par définition, <Katex>{'N(x) = \\int_{-\\infty}^{x} n(t)\\, dt'}</Katex>. La fonction de répartition est donc bien la primitive (l&apos;intégrale) de la densité, et réciproquement <Katex>{'N\'(x) = n(x)'}</Katex>.</>,
  },
  {
    id: 'A2',
    question: <>Pour une loi normale <Katex>{'\\mathcal{N}(\\mu, \\sigma^2)'}</Katex>, quelle est la valeur de <Katex>{'N(\\mu)'}</Katex> ?</>,
    choices: [
      <>0</>,
      <>0.5</>,
      <>1</>,
      <>Cela dépend de <Katex>{'\\sigma'}</Katex></>,
    ],
    answer: 1,
    explanation: <>Par symétrie de la loi normale autour de sa moyenne, la probabilité d&apos;être en dessous de <Katex>{'\\mu'}</Katex> est exactement <Katex>{'\\frac{1}{2}'}</Katex>. Formellement, <Katex>{'N(\\mu) = \\mathbb{P}(X \\leq \\mu) = 0.5'}</Katex>.</>,
  },
  {
    id: 'A3',
    question: <>Quelle est la formule du Gamma d&apos;un Call européen avec dividende continu <Katex>{'q'}</Katex> ?</>,
    choices: [
      <><Katex>{'S e^{-q\\tau} n(d_1) \\sqrt{\\tau}'}</Katex></>,
      <><Katex>{'e^{-q\\tau} N(d_1)'}</Katex></>,
      <><Katex>{'\\dfrac{e^{-q\\tau} n(d_1)}{S\\,\\sigma\\sqrt{\\tau}}'}</Katex></>,
      <><Katex>{'\\dfrac{n(d_1)}{S\\,\\sigma\\sqrt{\\tau}}'}</Katex></>,
    ],
    answer: 2,
    explanation: <>Le Gamma est la dérivée du Delta <Katex>{'e^{-q\\tau}N(d_1)'}</Katex> par rapport à <Katex>{'S'}</Katex>. En appliquant la règle des fonctions composées : <Katex>{'\\Gamma = e^{-q\\tau} n(d_1) \\cdot \\frac{\\partial d_1}{\\partial S} = \\frac{e^{-q\\tau} n(d_1)}{S\\,\\sigma\\sqrt{\\tau}}'}</Katex>.</>,
  },
  {
    id: 'A4',
    question: <>Parmi les paramètres suivants, lesquels ont un effet inverse sur le Gamma et le Vega ?</>,
    choices: [
      <><Katex>{'S'}</Katex> et <Katex>{'\\tau'}</Katex></>,
      <><Katex>{'r'}</Katex> et <Katex>{'q'}</Katex></>,
      <><Katex>{'K'}</Katex> et <Katex>{'\\sigma'}</Katex></>,
      <><Katex>{'r'}</Katex> et <Katex>{'\\sigma'}</Katex></>,
    ],
    answer: 0,
    explanation: <>Le Gamma est grand quand <Katex>{'S'}</Katex> est proche de <Katex>{'K'}</Katex> et quand <Katex>{'\\tau'}</Katex> est court (ATM court terme). Le Vega est grand quand <Katex>{'\\tau'}</Katex> est long. Ils varient en sens opposé selon <Katex>{'S'}</Katex> et <Katex>{'\\tau'}</Katex> : ce qui amplifie l&apos;un tend à réduire l&apos;autre.</>,
  },
  {
    id: 'A5',
    question: <>Quelle est l&apos;aire totale sous la courbe du Gamma d&apos;un Call européen en fonction du spot ?</>,
    choices: [
      <>0</>,
      <>Dépend de la volatilité</>,
      <>0.5</>,
      <>1</>,
    ],
    answer: 3,
    explanation: <>Le Gamma est la dérivée du Delta. Par le théorème fondamental du calcul intégral, <Katex>{'\\int_0^{+\\infty} \\Gamma\\, dS = \\Delta(+\\infty) - \\Delta(0) = 1 - 0 = 1'}</Katex>. Le Gamma se comporte comme une densité de probabilité.</>,
  },
  {
    id: 'A6',
    question: <>Le Vanna est défini comme :</>,
    choices: [
      <>La dérivée du Gamma par rapport à <Katex>{'\\sigma'}</Katex></>,
      <>La dérivée du Delta par rapport à <Katex>{'\\sigma'}</Katex>, ou de manière équivalente la dérivée du Vega par rapport à <Katex>{'S'}</Katex></>,
      <>La dérivée du Theta par rapport à <Katex>{'S'}</Katex> ou de manière équivalente la dérivée du Delta par rapport à <Katex>{'\\tau'}</Katex></>,
      <>La dérivée du Vega par rapport à <Katex>{'\\tau'}</Katex> ou de manière équivalente la dérivée du Theta par rapport à <Katex>{'\\sigma'}</Katex></>,
    ],
    answer: 1,
    explanation: <><Katex>{'\\text{Vanna} = \\frac{\\partial \\Delta}{\\partial \\sigma} = \\frac{\\partial \\mathcal{V}}{\\partial S}'}</Katex>. Ces deux expressions sont égales par symétrie des dérivées croisées (théorème de Schwarz appliqué au prix de l&apos;option).</>,
  },
  {
    id: 'A7',
    question: <>Conceptuellement, que mesure le Vega d&apos;une option ?</>,
    choices: [
      <>La sensibilité du prix de l'option à une variation du taux sans risque</>,
      <>La sensibilité du Delta à une variation de la volatilité</>,
      <>La perte de valeur de l&apos;option avec le temps</>,
      <>La sensibilité du prix de l&apos;option à une variation de la volatilité implicite</>,
    ],
    answer: 3,
    explanation: <>Le Vega <Katex>{'\\mathcal{V} = \\frac{\\partial V}{\\partial \\sigma}'}</Katex> mesure de combien le prix de l&apos;option varie si la volatilité implicite augmente de 1 point. Il est toujours positif pour un acheteur d&apos;option (Call ou Put).</>,
  },
  {
    id: 'A8',
    question: <>Le Gamma d&apos;un Call et le Gamma d&apos;un Put de même strike, maturité et sous-jacent sont :</>,
    choices: [
      <>Toujours de signes opposés</>,
      <>Égaux uniquement si l&apos;option est ATM</>,
      <>Toujours égaux</>,
      <>Égaux uniquement à maturité nulle</>,
    ],
    answer: 2,
    explanation: <>La parité Call-Put donne <Katex>{'C - P = Se^{-q\\tau} - Ke^{-r\\tau}'}</Katex>, expression linéaire en <Katex>{'S'}</Katex>. Sa dérivée seconde par rapport à <Katex>{'S'}</Katex> est nulle, donc <Katex>{'\\Gamma_C = \\Gamma_P'}</Katex>.</>,
  },
];

const groupB = [
  {
    id: 'B1',
    question: <>Dans la démonstration du Delta, quelle identité fondamentale est utilisée pour simplifier l&apos;expression ?</>,
    choices: [
      <><Katex>{'S\\,e^{-q\\tau} n(d_1) = K\\,e^{-r\\tau} n(d_2)'}</Katex></>,
      <><Katex>{'N(d_1) = N(d_2) + \\sigma\\sqrt{\\tau}'}</Katex></>,
      <><Katex>{'n(d_1) = n(d_2)'}</Katex></>,
      <><Katex>{'d_1 - d_2 = \\sigma\\sqrt{\\tau}'}</Katex></>,
    ],
    answer: 0,
    explanation: <>Cette identité permet d&apos;annuler les termes croisés qui apparaissent lors de la dérivation du produit <Katex>{'Se^{-q\\tau}N(d_1) - Ke^{-r\\tau}N(d_2)'}</Katex>. Elle se démontre en écrivant explicitement <Katex>{'n(d_1)'}</Katex> et <Katex>{'n(d_2)'}</Katex> et en vérifiant que le rapport vaut <Katex>{'Ke^{-r\\tau} / (Se^{-q\\tau})'}</Katex>.</>,
  },
  {
    id: 'B2',
    question: <>Le Delta d&apos;un Put européen avec dividende continu <Katex>{'q'}</Katex> vaut :</>,
    choices: [
      <><Katex>{'-N(d_1)'}</Katex></>,
      <><Katex>{'e^{-q\\tau} N(d_1)'}</Katex></>,
      <><Katex>{'-e^{-q\\tau} N(-d_1)'}</Katex></>,
      <><Katex>{'-e^{-q\\tau} N(d_1)'}</Katex></>,
    ],
    answer: 2,
    explanation: <>Le facteur <Katex>{'e^{-q\\tau}'}</Katex> reflète la fuite de valeur due aux dividendes continus. Sans dividende (<Katex>{'q=0'}</Katex>), on retrouve <Katex>{'\\Delta_{Put} = -N(-d_1)'}</Katex>.</>,
  },
  {
    id: 'B3',
    question: <>Pourquoi le Vega d&apos;un Call et le Vega d&apos;un Put de même caractéristiques sont-ils égaux ?</>,
    choices: [
      <><>Car <Katex>{'N(d_1) = N(d_2)'}</Katex> pour <Katex>{'\\sigma'}</Katex> grand</></>,
      <>Car le Vega est toujours nul à l&apos;expiration</>,
      <><>Car <Katex>{'d_1'}</Katex> et <Katex>{'d_2'}</Katex> ont la même dérivée par rapport à <Katex>{'\\sigma'}</Katex></></>,
      <>Car la parité Call-Put <Katex>{'C - P = Se^{-q\\tau} - Ke^{-r\\tau}'}</Katex> ne dépend pas de <Katex>{'\\sigma'}</Katex>, donc sa dérivée par rapport à <Katex>{'\\sigma'}</Katex> est nulle</>,
    ],
    answer: 3,
    explanation: <>En dérivant <Katex>{'C - P = Se^{-q\\tau} - Ke^{-r\\tau}'}</Katex> par rapport à <Katex>{'\\sigma'}</Katex>, le membre droit étant constant on obtient <Katex>{'\\mathcal{V}_C - \\mathcal{V}_P = 0'}</Katex>, soit <Katex>{'\\mathcal{V}_C = \\mathcal{V}_P'}</Katex>.</>,
  },
  {
    id: 'B4',
    question: <>Quelle est la règle de dérivation utilisée de manière centrale dans les démonstrations de ce cours pour calculer les Greeks ?</>,
    choices: [
      <><Katex>{'\\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\cdot g\'(x)'}</Katex></>,
      <><Katex>{'\\frac{d}{dx}[f(g(x))] = f(g(x)) \\cdot g(x)'}</Katex></>,
      <><Katex>{'\\frac{d}{dx}[f(g(x))] = f\'(x) \\cdot g\'(x)'}</Katex></>,
      <><Katex>{'\\frac{d}{dx}[f(g(x))] = f\'(g\'(x))'}</Katex></>,
    ],
    answer: 0,
    explanation: <>C&apos;est la règle des fonctions composées. Elle est utilisée systématiquement : par exemple <Katex>{'\\frac{d}{dS}[N(d_1)] = n(d_1) \\cdot \\frac{\\partial d_1}{\\partial S}'}</Katex>, où <Katex>{'N'}</Katex> joue le rôle de <Katex>{'f'}</Katex> et <Katex>{'d_1'}</Katex> le rôle de <Katex>{'g(S)'}</Katex>.</>,
  },
  {
    id: 'B5',
    question: <>Quelle est la valeur de <Katex>{'\\frac{\\partial d_1}{\\partial S}'}</Katex> utilisée dans les démonstrations du Delta et du Gamma ?</>,
    choices: [
      <><Katex>{'\\dfrac{1}{\\sigma\\sqrt{\\tau}}'}</Katex></>,
      <><Katex>{'\\dfrac{1}{S\\,\\sigma\\sqrt{\\tau}}'}</Katex></>,
      <><Katex>{'\\dfrac{n(d_1)}{S}'}</Katex></>,
      <><Katex>{'\\dfrac{d_1}{S}'}</Katex></>,
    ],
    answer: 1,
    explanation: <>En dérivant <Katex>{'d_1 = \\frac{\\ln(S/K) + (r - q + \\frac{1}{2}\\sigma^2)\\tau}{\\sigma\\sqrt{\\tau}}'}</Katex> par rapport à <Katex>{'S'}</Katex>, seul le terme <Katex>{'\\ln S'}</Katex> contribue, donnant <Katex>{'\\frac{\\partial d_1}{\\partial S} = \\frac{1}{S\\,\\sigma\\sqrt{\\tau}}'}</Katex>.</>,
  },
  {
    id: 'B6',
    question: <>Dans la démonstration du Gamma, d&apos;où vient le terme <Katex>{'n(d_1)'}</Katex> au numérateur ?</>,
    choices: [
      <>C&apos;est la dérivée de <Katex>{'d_1'}</Katex> par rapport à <Katex>{'\\sigma'}</Katex></>,
      <>C&apos;est la dérivée de <Katex>{'N(d_2)'}</Katex> par rapport à <Katex>{'S'}</Katex></>,
      <>C&apos;est un terme de correction lié au dividende</>,
      <>C&apos;est la dérivée de <Katex>{'N(d_1)'}</Katex> par rapport à <Katex>{'S'}</Katex>, via la règle des fonctions composées : <Katex>{'\\frac{d}{dS}[N(d_1)] = n(d_1) \\cdot \\frac{\\partial d_1}{\\partial S}'}</Katex></>,
    ],
    answer: 3,
    explanation: <>Le Gamma est la dérivée du Delta <Katex>{'e^{-q\\tau}N(d_1)'}</Katex> par rapport à <Katex>{'S'}</Katex>. En appliquant la règle des fonctions composées à <Katex>{'N(d_1)'}</Katex>, on fait apparaître <Katex>{'n(d_1)'}</Katex> (dérivée de <Katex>{'N'}</Katex>) multiplié par <Katex>{'\\frac{\\partial d_1}{\\partial S} = \\frac{1}{S\\sigma\\sqrt{\\tau}}'}</Katex>.</>,
  },
];

const groupC = [
  {
    id: 'C1',
    question: <>Dans un portefeuille delta-neutre, quelle est l&apos;expression du P&L instantané ?</>,
    choices: [
      <><Katex>{'d\\Pi = \\left(\\Theta + \\frac{1}{2}\\sigma^2 S^2 \\Gamma\\right)dt'}</Katex></>,
      <><Katex>{'d\\Pi = \\Theta\\, dt'}</Katex></>,
      <><Katex>{'d\\Pi = \\frac{1}{2}\\sigma^2 S^2 \\Gamma\\, dt'}</Katex></>,
      <><Katex>{'d\\Pi = \\Gamma\\,(dS)^2'}</Katex></>,
    ],
    answer: 0,
    explanation: <>En appliquant le lemme d&apos;Itô à <Katex>{'V(S,t)'}</Katex> et en construisant <Katex>{'\\Pi = V - \\Delta S'}</Katex> (delta-neutre), le terme en <Katex>{'dS'}</Katex> s&apos;annule. Il reste <Katex>{'d\\Pi = \\Theta\\, dt + \\frac{1}{2}\\sigma^2 S^2 \\Gamma\\, dt'}</Katex>.</>,
  },
  {
    id: 'C2',
    question: <>Que dit l&apos;inégalité de Jensen appliquée à la convexité d&apos;une option ?</>,
    choices: [
      <>La valeur d&apos;une option est toujours inférieure à sa valeur intrinsèque</>,
      <><Katex>{'\\mathbb{E}[f(S)] \\geq f(\\mathbb{E}[S])'}</Katex> pour toute fonction convexe <Katex>{'f'}</Katex></>,
      <>Le Gamma est toujours positif pour un Call</>,
      <>La valeur temps est nulle à maturité</>,
    ],
    answer: 1,
    explanation: <>Pour une fonction convexe (comme le payoff d&apos;un Call), Jensen dit que l&apos;espérance de la fonction est supérieure à la fonction de l&apos;espérance. C&apos;est ce qui garantit que la valeur temps d&apos;une option longue est toujours positive.</>,
  },
  {
    id: 'C3',
    question: <>Sous l&apos;hypothèse <Katex>{'r = 0'}</Katex>, quelle relation fondamentale lie Theta et Gamma ?</>,
    choices: [
      <><Katex>{'\\Theta = \\Gamma'}</Katex></>,
      <><Katex>{'\\Theta = \\frac{1}{2}\\sigma^2 S^2 \\Gamma'}</Katex></>,
      <><Katex>{'\\Theta + \\Gamma = 0'}</Katex></>,
      <><Katex>{'\\Theta = -\\frac{1}{2}\\sigma^2 S^2 \\Gamma'}</Katex></>,
    ],
    answer: 3,
    explanation: <>Sous <Katex>{'r = 0'}</Katex>, un portefeuille delta-neutre sans arbitrage doit avoir un P&L nul : <Katex>{'d\\Pi = 0'}</Katex>. On obtient donc <Katex>{'\\Theta + \\frac{1}{2}\\sigma^2 S^2 \\Gamma = 0'}</Katex>, soit <Katex>{'\\Theta = -\\frac{1}{2}\\sigma^2 S^2 \\Gamma'}</Katex>.</>,
  },
  {
    id: 'C4',
    question: <>Qu&apos;est-ce que le Gamma Scalping ?</>,
    choices: [
      <>Vendre des options pour encaisser la prime de Theta</>,
      <>Couvrir le Delta d&apos;un portefeuille en achetant des actions</>,
      <>Acheter une option (long Gamma) et re-hedger dynamiquement le Delta pour capturer la volatilité réalisée</>,
      <>Arbitrer la différence entre Vega Call et Vega Put</>,
    ],
    answer: 2,
    explanation: <>En étant long Gamma, chaque mouvement du sous-jacent génère un gain convexe. En re-hedgeant le Delta après chaque mouvement (acheter bas, vendre haut), on encaisse la volatilité réalisée. On est profitable si <Katex>{'\\sigma_{\\text{réal}} > \\sigma_{\\text{impl}}'}</Katex>.</>,
  },
  {
    id: 'C5',
    question: <>Pour quel type d&apos;option le Theta peut-il être positif ?</>,
    choices: [
      <>Un Call européen ITM</>,
      <>Un Call américain ATM</>,
      <>Un Put européen ITM</>,
      <>Un Call européen ATM</>,
    ],
    answer: 2,
    explanation: <>Le Theta d&apos;un Put européen peut être positif car le Put peut valoir moins que sa valeur intrinsèque (il peut être rationnel d&apos;exercer anticipativement un Put américain). L&apos;EDP complète fait apparaître un terme <Katex>{'r(V - S\\Delta)'}</Katex> qui peut dominer et rendre <Katex>{'\\Theta > 0'}</Katex>.</>,
  },
  {
    id: 'C6',
    question: <>Pour un Put européen deep-ITM avec <Katex>{'r > 0'}</Katex> et <Katex>{'\\Gamma \\approx 0'}</Katex>, vers quelle valeur converge le Theta ?</>,
    choices: [
      <>0</>,
      <><Katex>{'+rK'}</Katex></>,
      <><Katex>{'-rK'}</Katex></>,
      <><Katex>{'-\\frac{1}{2}\\sigma^2 S^2 \\Gamma'}</Katex></>,
    ],
    answer: 1,
    explanation: <>L&apos;EDP complète donne <Katex>{'\\Theta = -\\frac{1}{2}\\sigma^2 S^2\\Gamma + r(V - S\\Delta)'}</Katex>. Pour un Put deep-ITM : <Katex>{'V \\approx K - S'}</Katex>, <Katex>{'\\Delta \\approx -1'}</Katex>, <Katex>{'\\Gamma \\approx 0'}</Katex>. Donc <Katex>{'\\Theta \\approx r(K - S + S) = rK > 0'}</Katex>.</>,
  },
];

// ── Tirage stratifié : 4 de A, 3 de B, 3 de C ──
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
    ...shuffle(groupA).slice(0, 4),
    ...shuffle(groupB).slice(0, 3),
    ...shuffle(groupC).slice(0, 3),
  ];
}

const TOTAL = 10;

export default function QuizModule3Page() {
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
      score >= 8 ? 'text-green-600' : score >= 5 ? 'text-amber-500' : 'text-red-500';
    const scoreBg =
      score >= 8 ? 'bg-green-50 border-green-200' : score >= 5 ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200';

    return (
      <div className="max-w-2xl mx-auto px-6 py-12">

        {/* Fil d'Ariane */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/quiz" className="hover:text-blue-600 transition-colors">Quiz</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">Module 3 — The Greeks</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Résultats</h1>
        <p className="text-gray-500 mb-8">Quiz · Module 3 — The Greeks</p>

        {/* Score */}
        <div className={`border rounded-xl p-6 mb-10 text-center ${scoreBg}`}>
          <p className={`text-5xl font-bold mb-2 ${scoreColor}`}>{score} / {TOTAL}</p>
          <p className="text-gray-600 text-sm">
            {score >= 8
              ? 'Excellent ! Tu maîtrises bien les Greeks.'
              : score >= 5
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
            href="/cours/module-3-grecques/grecques-premier-ordre"
            className="px-6 py-2.5 rounded-lg text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Revoir le Module 3
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
        <span className="text-gray-800 font-medium">Module 3 — The Greeks</span>
      </nav>

      {/* Titre */}
      <h1 className="text-3xl font-bold text-gray-900 mb-1">Quiz · Module 3 — The Greeks</h1>
      <p className="text-sm text-gray-400 mb-8">
        10 questions tirées parmi 20 — un nouveau tirage à chaque session
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
