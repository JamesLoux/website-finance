'use client';

import { useState } from 'react';
import Link from 'next/link';
import katex from 'katex';
import 'katex/dist/katex.min.css';

function Katex({ children, block = false }) {
  const formula = Array.isArray(children) ? children.join('') : String(children);
  const html = katex.renderToString(formula, { throwOnError: false, displayMode: block });
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

const questions = [
  {
    id: 1,
    question: <>Quelle est la distribution de l&apos;incrément <Katex>{'W_{t+u} - W_t'}</Katex> du Mouvement Brownien standard ?</>,
    choices: [
      <><Katex>{'\\mathcal{N}(\\mu, \\sigma^2)'}</Katex></>,
      <><Katex>{'\\mathcal{N}(0, u)'}</Katex></>,
      <><Katex>{'\\mathcal{N}(0, t)'}</Katex></>,
      <><Katex>{'\\mathcal{N}(0, 1)'}</Katex></>,
    ],
    answer: 1,
    explanation: <>Les incréments sont centrés (pas de drift) et de variance égale à la durée de l&apos;intervalle <Katex>{'u'}</Katex> — pas à l&apos;instant <Katex>{'t'}</Katex>.</>,
  },
  {
    id: 2,
    question: <>Que vaut <Katex>{'(dW_t)^2'}</Katex> en calcul stochastique ?</>,
    choices: [
      <>0</>,
      <><Katex>{'(dt)^2'}</Katex></>,
      <><Katex>{'dt'}</Katex></>,
      <><Katex>{'dW_t'}</Katex></>,
    ],
    answer: 2,
    explanation: <>C&apos;est la variation quadratique du Mouvement Brownien. Contrairement au calcul classique où <Katex>{'(dx)^2 \\to 0'}</Katex>, ici <Katex>{'(dW_t)^2 = dt'}</Katex> — un terme du premier ordre qui survit.</>,
  },
  {
    id: 3,
    question: <>Dans le Lemme d&apos;Itô, pourquoi le terme <Katex>{'\\tfrac{1}{2}\\sigma^2 f\'\''}</Katex> ne disparaît-il pas, contrairement au calcul classique ?</>,
    choices: [
      <><Katex>{'\\sigma'}</Katex> est toujours grand</>,
      <>Parce que <Katex>{'(dW_t)^2 = dt'}</Katex>, ce qui est d&apos;ordre 1</>,
      <><Katex>{"f''"}</Katex> est négatif pour une option</>,
      <>Le drift <Katex>{'\\mu'}</Katex> compense le terme d&apos;ordre 2</>,
    ],
    answer: 1,
    explanation: <>En calcul classique <Katex>{'(dx)^2 \\to 0'}</Katex>. En calcul stochastique <Katex>{'(dW_t)^2 = dt'}</Katex> — c&apos;est un terme du premier ordre qui survit et génère le terme de convexité d&apos;Itô.</>,
  },
  {
    id: 4,
    question: <>Un actif suit <Katex>{'dS_t = \\mu S_t \\, dt + \\sigma S_t \\, dW_t'}</Katex>. Quelle est la dynamique de <Katex>{'\\ln(S_t)'}</Katex> ?</>,
    choices: [
      <><Katex>{'d(\\ln S_t) = \\mu \\, dt + \\sigma \\, dW_t'}</Katex></>,
      <><Katex>{'d(\\ln S_t) = \\left(\\mu + \\tfrac{1}{2}\\sigma^2\\right) dt + \\sigma \\, dW_t'}</Katex></>,
      <><Katex>{'d(\\ln S_t) = \\left(\\mu - \\tfrac{1}{2}\\sigma^2\\right) dt + \\sigma \\, dW_t'}</Katex></>,
      <><Katex>{'d(\\ln S_t) = \\tfrac{1}{\\mu} \\, dt + \\sigma \\, dW_t'}</Katex></>,
    ],
    answer: 2,
    explanation: <>Le terme <Katex>{'-\\tfrac{1}{2}\\sigma^2'}</Katex> est l&apos;ajustement d&apos;Itô dû à la courbure de la fonction logarithme. Oublier ce terme — ou le mettre en <Katex>{'+'}</Katex> — est l&apos;erreur la plus classique.</>,
  },
  {
    id: 5,
    question: <>CALCUL — Si <Katex>{'\\mu = 10\\%'}</Katex> et <Katex>{'\\sigma = 20\\%'}</Katex>, quel est le drift effectif des log-prix <Katex>{'\\mu - \\tfrac{1}{2}\\sigma^2'}</Katex> ?</>,
    choices: [<>10%</>, <>8%</>, <>6%</>, <>12%</>],
    answer: 1,
    explanation: <><Katex>{'\\mu - \\tfrac{1}{2}\\sigma^2 = 10\\% - \\tfrac{1}{2} \\times (20\\%)^2 = 10\\% - 2\\% = 8\\%'}</Katex>. La volatilité réduit mécaniquement le drift effectif des log-prix.</>,
  },
  {
    id: 6,
    question: <>Sous la probabilité risque-neutre <Katex>{'\\mathbb{Q}'}</Katex>, quel est le drift de l&apos;actif <Katex>{'S_t'}</Katex> ?</>,
    choices: [
      <><Katex>{'\\mu'}</Katex> (le drift historique)</>,
      <><Katex>{'\\mu - \\sigma^2/2'}</Katex></>,
      <>0</>,
      <><Katex>{'r'}</Katex> (le taux sans risque)</>,
    ],
    answer: 3,
    explanation: <>Sous <Katex>{'\\mathbb{Q}'}</Katex>, tous les actifs croissent au taux sans risque <Katex>{'r'}</Katex>, indépendamment de leur drift historique <Katex>{'\\mu'}</Katex>. C&apos;est précisément l&apos;objet du changement de mesure de Girsanov.</>,
  },
  {
    id: 7,
    question: <>Que représente le ratio <Katex>{'\\dfrac{\\mu - r}{\\sigma}'}</Katex> dans le théorème de Girsanov ?</>,
    choices: [
      <>Le drift ajusté sous <Katex>{'\\mathbb{Q}'}</Katex></>,
      <>Le prix du risque (Market Price of Risk)</>,
      <>La volatilité implicite de l&apos;actif</>,
      <>Le facteur d&apos;actualisation</>,
    ],
    answer: 1,
    explanation: <>C&apos;est la prime de rendement exigée par unité de volatilité supportée — le Market Price of Risk. C&apos;est ce terme que Girsanov absorbe dans le nouveau Brownien <Katex>{'dW_t^{\\mathbb{Q}}'}</Katex> lors du changement de mesure.</>,
  },
  {
    id: 8,
    question: <>Quelle est la formule de pricing universel sous <Katex>{'\\mathbb{Q}'}</Katex> ?</>,
    choices: [
      <><Katex>{'V_0 = \\mathbb{E}^{\\mathbb{P}}[V_T]'}</Katex></>,
      <><Katex>{'V_0 = e^{rT} \\, \\mathbb{E}^{\\mathbb{Q}}[V_T]'}</Katex></>,
      <><Katex>{'V_0 = e^{-rT} \\, \\mathbb{E}^{\\mathbb{Q}}[V_T]'}</Katex></>,
      <><Katex>{'V_0 = e^{-\\mu T} \\, \\mathbb{E}^{\\mathbb{Q}}[V_T]'}</Katex></>,
    ],
    answer: 2,
    explanation: <>On actualise au taux sans risque <Katex>{'r'}</Katex> (facteur <Katex>{'e^{-rT}'}</Katex>, pas <Katex>{'e^{rT}'}</Katex>), et l&apos;espérance est sous <Katex>{'\\mathbb{Q}'}</Katex> (pas sous <Katex>{'\\mathbb{P}'}</Katex>). Les trois mauvaises réponses contiennent chacune une erreur classique.</>,
  },
];

const TOTAL = 8;

export default function QuizModule1Page() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [validated, setValidated] = useState(false);
  const [results, setResults] = useState([]);
  const [finished, setFinished] = useState(false);

  const q = questions[current];
  const score = results.filter(Boolean).length;

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
    setCurrent(0);
    setSelected(null);
    setValidated(false);
    setResults([]);
    setFinished(false);
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
      score >= 6 ? 'text-green-600' : score >= 4 ? 'text-amber-500' : 'text-red-500';
    const scoreBg =
      score >= 6 ? 'bg-green-50 border-green-200' : score >= 4 ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200';

    return (
      <div className="max-w-2xl mx-auto px-6 py-12">

        {/* Fil d'Ariane */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/quiz" className="hover:text-blue-600 transition-colors">Quiz</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">Module 1 — Calcul stochastique</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Résultats</h1>
        <p className="text-gray-500 mb-8">Quiz — Calcul Stochastique</p>

        {/* Score */}
        <div className={`border rounded-xl p-6 mb-10 text-center ${scoreBg}`}>
          <p className={`text-5xl font-bold mb-2 ${scoreColor}`}>{score} / {TOTAL}</p>
          <p className="text-gray-600 text-sm">
            {score >= 6 ? 'Excellent ! Tu maîtrises bien le Module 1.' : score >= 4 ? 'Pas mal — quelques points à revoir.' : 'Il faut retravailler les fondamentaux.'}
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
            Recommencer
          </button>
          <Link
            href="/cours/module-1-calcul-stochastique/mouvement-brownien"
            className="px-6 py-2.5 rounded-lg text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Revoir le Module 1
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
        <span className="text-gray-800 font-medium">Module 1 — Calcul stochastique</span>
      </nav>

      {/* Titre */}
      <h1 className="text-3xl font-bold text-gray-900 mb-1">Quiz — Calcul Stochastique</h1>
      <p className="text-sm text-gray-400 mb-8">8 questions · Mouvement Brownien, Lemme d&apos;Itô, Girsanov</p>

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
