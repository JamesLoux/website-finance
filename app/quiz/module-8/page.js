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

// ── Banque de 20 questions — 2 groupes de 10 ──
// Équilibrage des positions : exactement 5 occurrences de chaque position (0,1,2,3) sur 20 questions
// Position 0 : A2, A4, A5, B1, B2
// Position 1 : A3, A8, B4, B5, B7
// Position 2 : A1, A6, B3, B8, B10
// Position 3 : A7, A9, A10, B6, B9

const groupA = [
  {
    id: 'A1',
    question: <>Quel est l&apos;objectif de la Fed ? (Double mandat)</>,
    choices: [
      <>Financer le déficit budgétaire américain et stabiliser le dollar</>,
      <>Maximiser la croissance du PIB et maintenir la notation AAA des Treasuries</>,
      <>Maintenir l&apos;inflation autour de 2&nbsp;% et le chômage américain bas</>,
      <>Fixer le taux de change EUR/USD et superviser les banques commerciales</>,
    ],
    answer: 2,
    explanation: <>Le double mandat de la Fed (Federal Reserve Act) est la stabilité des prix (cible d&apos;inflation 2&nbsp;%) et le plein emploi. Contrairement à la BCE dont le mandat est uniquement la stabilité des prix.</>,
  },
  {
    id: 'A2',
    question: <>Quel taux administré constitue le plafond du corridor de taux ?</>,
    choices: [
      <>IORB</>,
      <>ON RRP</>,
      <>SRF</>,
      <>SOFR</>,
    ],
    answer: 0,
    explanation: <>L&apos;IORB (Interest on Reserve Balances) est le taux que la Fed paie aux banques sur leurs réserves. Aucune banque ne prêtera en dessous de ce taux sans risque — c&apos;est donc le plafond naturel du corridor.</>,
  },
  {
    id: 'A3',
    question: <>Il existe deux familles de taux dans le système de la Fed, lesquels ?</>,
    choices: [
      <>Taux nominaux et taux réels</>,
      <>Taux administrés (fixés par la Fed) et taux de marché (issus des transactions réelles entre participants)</>,
      <>Taux qui évoluent chaque nuit et taux qui bougent chaque mois et demie (lors des réunions du FOMC)</>,
      <>Taux courts et taux longs (ceux qui sont sur la courbe des taux)</>,
    ],
    answer: 1,
    explanation: <>Les taux administrés (IORB, ON RRP, SRF) sont fixés arbitrairement par la Fed pour encadrer le marché. Les taux de marché (EFFR, SOFR) résultent des transactions réelles entre participants et évoluent librement dans ce corridor.</>,
  },
  {
    id: 'A4',
    question: <>Quelle est la largeur standard du corridor IORB − ON RRP ?</>,
    choices: [
      <>25 bps</>,
      <>10 bps</>,
      <>50 bps</>,
      <>100 bps</>,
    ],
    answer: 0,
    explanation: <>L&apos;écart entre l&apos;IORB (plafond) et l&apos;ON RRP (plancher) est de 25 bps. C&apos;est dans cette fenêtre que l&apos;EFFR et le SOFR évoluent normalement.</>,
  },
  {
    id: 'A5',
    question: <>Lequel de ces taux est le fameux taux Repo ?</>,
    choices: [
      <>Le SOFR — il mesure le coût des transactions Repo au jour le jour adossées à des Treasuries</>,
      <>L&apos;EFFR — il mesure les prêts interbancaires non sécurisés</>,
      <>L&apos;IORB — il rémunère les réserves des banques à la Fed</>,
      <>L&apos;ON RRP — il permet aux fonds monétaires de placer leur cash</>,
    ],
    answer: 0,
    explanation: <>Le SOFR (Secured Overnight Financing Rate) est le taux du marché Repo, adossé à des Treasuries. Il a remplacé le LIBOR. C&apos;est le taux de référence des marchés de taux américains depuis 2023.</>,
  },
  {
    id: 'A6',
    question: <>Que mesure le spread EFFR − IORB ?</>,
    choices: [
      <>L&apos;écart entre taux sécurisés et non sécurisés</>,
      <>La prime de risque de crédit du système bancaire</>,
      <>Le niveau d&apos;abondance des réserves</>,
      <>La différence entre politique accommodante et restrictive</>,
    ],
    answer: 2,
    explanation: <>En situation normale, l&apos;EFFR est légèrement sous l&apos;IORB — des acteurs non-bancaires prêtent moins cher, ce qui tire l&apos;EFFR vers le bas. Quand les réserves se raréfient, les banques remontent leur prix vers l&apos;IORB. C&apos;est le signal d&apos;alerte de la Fed.</>,
  },
  {
    id: 'A7',
    question: <>Le taux Repo (SOFR) est-il un taux administré ou varie-t-il librement ?</>,
    choices: [
      <>C&apos;est un taux administré, fixé chaque matin par la Fed</>,
      <>C&apos;est un taux administré, mais révisé mensuellement selon l&apos;inflation</>,
      <>Il varie librement, mais uniquement dans un corridor fixé par la BCE</>,
      <>Il varie librement, c&apos;est un taux de marché issu des transactions Repo réelles</>,
    ],
    answer: 3,
    explanation: <>Le SOFR reflète les conditions réelles du marché Repo chaque jour. La Fed l&apos;influence indirectement via le corridor, sans le fixer. Il peut monter brutalement si les réserves se raréfient, c&apos;est exactement ce qui s&apos;est passé en septembre 2019 quand il a spiké à 10&nbsp;%.</>,
  },
  {
    id: 'A8',
    question: <>Quelle est la différence entre RMP et QE ?</>,
    choices: [
      <>Le RMP achète des Treasuries longs, le QE achète des T-Bills</>,
      <>Le RMP est une opération technique pour stabiliser les réserves (achat de T-Bills) ; le QE est un stimulus monétaire pour comprimer les taux longs (achat de Treasuries longs + MBS)</>,
      <>Ce sont deux noms différents pour la même opération</>,
      <>Le RMP est une opération de la BCE, le QE une opération de la Fed</>,
    ],
    answer: 1,
    explanation: <>La distinction est cruciale pour lire les minutes de la Fed. Un RMP n&apos;envoie aucun signal sur la politique monétaire. Un QE est un acte fort qui signale que la Fed veut assouplir les conditions financières. Même mécanisme (achat d&apos;actifs), intention et impact radicalement différents.</>,
  },
  {
    id: 'A9',
    question: <>Pourquoi le TGA représente-t-il un risque pour les réserves bancaires en avril ?</>,
    choices: [
      <>La Fed doit reconstituer ses fonds propres chaque trimestre fiscal</>,
      <>Le Congrès vote le budget en avril, créant une incertitude sur les émissions de Treasuries</>,
      <>Les fonds monétaires retirent massivement leur cash de l&apos;ON RRP en début d&apos;année fiscale</>,
      <>Les Américains paient leurs impôts pour alimenter le compte du Trésor, ce qui fait baisser les réserves</>,
    ],
    answer: 3,
    explanation: <>C&apos;est un effet mécanique de la comptabilité du bilan de la Fed. La fiscalité draine les réserves privées vers le compte public. Si le mouvement est brutal et non anticipé, le marché Repo peut s'assécher et faire des sursauts (d&apos;où les RMP préventifs de la Fed).</>,
  },
  {
    id: 'A10',
    question: <>Quelle est la différence entre l&apos;EFFR et le SOFR ?</>,
    choices: [
      <>L&apos;EFFR est fixé par le marché, le SOFR administré par la Fed</>,
      <>L&apos;EFFR est administré par la Fed, le SOFR est fixé par le marché</>,
      <>L&apos;EFFR est un taux européen, le SOFR un taux américain</>,
      <>L&apos;EFFR est non sécurisé (sans garantie), le SOFR est sécurisé (avec collatéral)</>,
    ],
    answer: 3,
    explanation: <>Les deux sont des taux de marché overnight, mais ils ne mesurent pas la même tension. Le SOFR reflète la rareté du cash contre collatéral (repo adossé à des treasuries qui remplacé le LIBOR). L&apos;EFFR reflète la rareté du cash pur entre banques. Et les deux évoluent dans le corridor IORB/ON RRP.</>,
  },
];

const groupB = [
  {
    id: 'B1',
    question: <>Quel taux de marché représente le mieux les anticipations sur les prochaines décisions de la Fed ?</>,
    choices: [
      <>Le taux 2 ans — suffisamment court pour être dominé par les anticipations de taux directeurs, suffisamment long pour intégrer plusieurs réunions du FOMC à venir</>,
      <>Le taux 10 ans — il intègre toutes les décisions futures sur un horizon long</>,
      <>Le taux 30 ans — c&apos;est le plus sensible aux mouvements de la Fed</>,
      <>L&apos;EFFR — il reflète directement le taux directeur actuel</>,
    ],
    answer: 0,
    explanation: <>Le taux 2 ans est l&apos;indicateur de marché le plus regardé pour les anticipations Fed. Quand la Fed signale des hausses à venir, le 2 ans monte immédiatement. Le 10 ans, lui, intègre aussi la prime de terme et les anticipations de long terme — il est moins pur comme signal sur la Fed.</>,
  },
  {
    id: 'B2',
    question: <>Qu&apos;est-ce que la prime de terme qui se trouvent dans les taux des obligations longues durées ?</>,
    choices: [
      <>La prime compensant l'incertitude lié au temps</>,
      <>La différence entre le taux nominal et le taux réel</>,
      <>Le supplément de rendement exigé par les banques pour prêter à l&apos;État</>,
      <>L&apos;écart entre le taux 2 ans et le taux overnight</>,
    ],
    answer: 0,
    explanation: <>Plus l&apos;horizon est lointain, plus l&apos;incertitude est grande. Les investisseurs exigent une prime pour ce risque de temps. Le QE de la Fed vise précisément à comprimer cette prime de terme en achetant massivement des obligations longues.</>,
  },
  {
    id: 'B3',
    question: <>De quelle forme est la courbe des taux en période normale de croissance économique ?</>,
    choices: [
      <>Plate — les taux courts et longs sont équivalents</>,
      <>Inversée (pente négative) — les taux courts dépassent les taux longs</>,
      <>En contango (pente positive) — les taux longs sont supérieurs aux taux courts</>,
      <>En bosse (hump-shaped) — avec un pic autour de 5 ans</>,
    ],
    answer: 2,
    explanation: <>En période d&apos;expansion normale, la courbe est en contango : les investisseurs exigent un rendement plus élevé pour immobiliser leur capital longtemps (prime de terme positive), reflétant une croissance saine et une inflation modérée anticipée.</>,
  },
  {
    id: 'B4',
    question: <>Quelle forme de courbe des taux signale une récession imminente ?</>,
    choices: [
      <>Une pente positive (taux longs &gt; taux courts)</>,
      <>Une pente négative (taux courts &gt; taux longs)</>,
      <>Plate avec taux courts à 0&nbsp;%</>,
      <>En bosse (hump-shaped) avec un pic à 5 ans</>,
    ],
    answer: 1,
    explanation: <>Le marché anticipe des baisses massives de taux pour sauver l&apos;économie. En octobre 2022, le spread 2Y−10Y a atteint 80 bps, son niveau le plus inversé depuis 1981. Le marché pariait déjà sur des baisses de taux à moyen terme, signalant une récession anticipée malgré des taux directeurs encore en hausse.</>,
  },
  {
    id: 'B5',
    question: <>Qu&apos;est-ce que le dot plot de la Fed ?</>,
    choices: [
      <>Un graphique Bloomberg montrant l&apos;évolution historique du taux directeur</>,
      <>Un graphique publié quatre fois par an où chaque membre du FOMC place un point représentant sa prévision de taux pour les années à venir</>,
      <>Les instructions données aux primary dealers pour les opérations de marché ouvert</>,
      <>Un indicateur de la CME montrant les probabilités implicites de hausse ou baisse de taux</>,
    ],
    answer: 1,
    explanation: <>Le dot plot révèle le consensus interne du FOMC. Mais les dots peuvent évoluer d&apos;une réunion à l&apos;autre en fonction des données économiques. Ce n&apos;est pas un engagement. Il doit être lu comme un signal sur les intentions actuelles, pas une promesse ferme.</>,
  },
  {
    id: 'B6',
    question: <>Comment la Fed agit-elle sur les taux longs sans modifier son taux directeur ?</>,
    choices: [
      <>En modifiant le taux de l&apos;ON RRP uniquement</>,
      <>En publiant ses prévisions économiques (Beige Book)</>,
      <>En garantissant explicitement le taux 10 ans (yield curve control)</>,
      <>Via le QE (achat massif d&apos;obligations longues pour comprimer la prime de terme) ou le QT (laisser les titres arriver à échéance pour réinjecter de la duration sur le marché)</>,
    ],
    answer: 3,
    explanation: <>QE = la Fed aspire la duration du marché → prix des obligations longues monte → rendements baissent. QT = la Fed réinjecte la duration → le marché absorbe plus d&apos;obligations → rendements remontent. C&apos;est le levier bilan, distinct du levier taux directeur.</>,
  },
  {
    id: 'B7',
    question: <>Quel est l&apos;effet du QE sur les investisseurs obligataires ?</>,
    choices: [
      <>Il les incite à vendre leurs obligations longues pour acheter des T-Bills</>,
      <>Il comprime les rendements longs et les force à prendre davantage de risques en se déplaçant vers des actifs plus risqués</>,
      <>Il augmente la prime de terme pour compenser le risque d&apos;inflation</>,
      <>Il n&apos;a d&apos;effet que sur les taux courts, pas sur les taux longs</>,
    ],
    answer: 1,
    explanation: <>C&apos;est le canal de rééquilibrage de portefeuille. Les investisseurs ne trouvant plus de rendement suffisant sur les actifs sûrs (Treasuries, MBS dont les prix ont monté) se déplacent vers des actifs plus risqués (actions, crédit, immobilier). C&apos;est l&apos;un des effets voulus du QE.</>,
  },
  {
    id: 'B8',
    question: <>Qu&apos;est-ce que la forward guidance ?</>,
    choices: [
      <>La publication mensuelle des achats d&apos;actifs de la Fed</>,
      <>Les instructions données aux primary dealers pour les opérations de marché ouvert</>,
      <>La communication par la Fed de la trajectoire future de ses taux pour ancrer les taux longs par les anticipations, sans avoir à agir concrètement sur les taux courts</>,
      <>Le mécanisme par lequel la Fed répercute ses décisions aux banques commerciales</>,
    ],
    answer: 2,
    explanation: <>&quot;Transitoire&quot; en 2021 pour qualifier l&apos;inflation, &quot;patient&quot; en 2019 : un seul mot peut déplacer des milliards de dollars. La forward guidance exploite le canal des anticipations sur l&apos;avenir pour faire bouger les taux longs.</>,
  },
  {
    id: 'B9',
    question: <>Qu&apos;est-ce que le QT (Quantitative Tightening) ?</>,
    choices: [
      <>Une hausse du taux directeur accompagnée d&apos;une réduction du bilan</>,
      <>La vente active d&apos;obligations par la Fed sur le marché secondaire</>,
      <>Une réduction du corridor IORB − ON RRP pour resserrer le marché interbancaire</>,
      <>La Fed laisse ses obligations arriver à échéance sans les remplacerpour réduire son bilan, poussant progressivement les taux longs à la hausse</>,
    ],
    answer: 3,
    explanation: <>Contrairement au QE (achat actif), le QT est passif : la Fed ne renouvelle pas ses titres à maturité. Le marché doit absorber ce surplus de duration, ce qui fait remonter la prime de terme et les rendements longs. C&apos;est le processus inverse du QE, mais en plus lent.</>,
  },
  {
    id: 'B10',
    question: <>Pourquoi une mauvaise gestion de la plomberie peut-elle provoquer un krach obligataire ?</>,
    choices: [
      <>Parce que la Fed perd sa capacité à fixer l&apos;IORB quand les réserves sont trop faibles</>,
      <>Parce que le TGA devient négatif, forçant le Trésor à émettre des Treasuries en urgence</>,
      <>Si les réserves s&apos;assèchent, le coût du Repo monte ; les banques et fonds ne peuvent plus porter des obligations longues et vendent leurs titres, faisant monter les taux longs brutalement</>,
      <>Parce que la Fed doit alors acheter massivement des T-Bills, faisant baisser leur rendement sous l&apos;ON RRP</>,
    ],
    answer: 2,
    explanation: <>C&apos;est la chaîne de transmission : réserves rares → Repo cher → coût de portage des obligations longues trop élevé → ventes forcées → hausse des taux longs → potentiel krach obligataire. La plomberie saine est la condition préalable à tout le reste — c&apos;est pourquoi la Fed préfère maintenir un bilan généreux.</>,
  },
];

// ── Tirage stratifié : 5 questions au hasard dans chaque groupe ──
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function drawSession() {
  return shuffle([
    ...shuffle(groupA).slice(0, 5),
    ...shuffle(groupB).slice(0, 5),
  ]);
}

const TOTAL = 10;

export default function QuizModule8Page() {
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
          <span className="text-gray-800 font-medium">Module 8 — Macro</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Résultats</h1>
        <p className="text-gray-500 mb-8">Quiz · Module 8 — Macro</p>

        {/* Score */}
        <div className={`border rounded-xl p-6 mb-10 text-center ${scoreBg}`}>
          <p className={`text-5xl font-bold mb-2 ${scoreColor}`}>{score} / {TOTAL}</p>
          <p className="text-gray-600 text-sm">
            {score >= 8
              ? 'Excellent ! Tu maîtrises bien le Module 8.'
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
            href="/cours/module-8-macro/plomberie-fed"
            className="px-6 py-2.5 rounded-lg text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Revoir le Module 8
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
        <span className="text-gray-800 font-medium">Module 8 — Macro</span>
      </nav>

      {/* Titre */}
      <h1 className="text-3xl font-bold text-gray-900 mb-1">Quiz · Module 8 — Macro</h1>
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
