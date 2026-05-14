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

// ── Banque de 18 questions — 4 groupes ──

const groupA = [
  {
    id: 'A1',
    question: <>Pourquoi le prix d&apos;une obligation baisse-t-il quand les taux montent ?</>,
    choices: [
      <>Les flux futurs sont actualisés à un taux plus élevé, donc leur valeur présente diminue.</>,
      <>Le coupon versé par l&apos;obligation augmente automatiquement.</>,
      <>La durée de vie de l&apos;obligation se raccourcit mécaniquement.</>,
      <>Les investisseurs vendent pour acheter des actions.</>,
    ],
    answer: 0,
    explanation: <>Le prix est la somme des flux actualisés. Un taux d&apos;actualisation plus élevé réduit chaque terme de la somme.</>,
  },
  {
    id: 'A2',
    question: <>Qu&apos;est-ce que le yield to maturity (YTM) d&apos;une obligation ?</>,
    choices: [
      <>Le taux de coupon annoncé à l&apos;émission.</>,
      <>Le taux d&apos;actualisation.</>,
      <>Le taux directeur de la banque centrale.</>,
      <>Le spread de crédit par rapport au taux sans risque.</>,
    ],
    answer: 1,
    explanation: <>Le YTM est une convention de cotation qui égalise la valeur présente des flux au prix de marché. Il résume en un seul chiffre l&apos;ensemble du profil de flux de l&apos;obligation.</>,
  },
  {
    id: 'A3',
    question: <>Un Floating Rate Note (FRN) revient systématiquement au pair à chaque date de reset. Pourquoi ?</>,
    choices: [
      <>Parce que l&apos;émetteur rachète les titres à chaque coupon.</>,
      <>Parce que le coupon est fixé à l&apos;émission et ne change jamais.</>,
      <>Parce que le spread de crédit disparaît à chaque reset.</>,
      <>Parce que le coupon suivant reflète exactement le taux de marché.</>,
    ],
    answer: 3,
    explanation: <>À chaque reset, le prochain flux est <Katex>{'N(1+r\\delta)'}</Katex> actualisé à <Katex>{'(1+r\\delta)'}</Katex>, ce qui donne <Katex>{'N'}</Katex>. Le FRN est immunisé contre le risque de taux, pas contre le risque de crédit.</>,
  },
  {
    id: 'A4',
    question: <>Un T-Bill à 90 jours cote à un taux de discount de 4 % (base Actual/360). Quel est son prix pour un nominal de 100 ?</>,
    choices: [
      <>96,00</>,
      <>99,00</>,
      <>98,04</>,
      <>100,00</>,
    ],
    answer: 1,
    explanation: <><Katex>{'\\text{Prix} = 100 \\times (1 - 4\\% \\times 90/360) = 100 \\times 0{,}99 = 99{,}00'}</Katex>. La base Actual/360 est la convention du marché monétaire américain.</>,
  },
];

const groupB = [
  {
    id: 'B1',
    question: <>Quelle est l&apos;intuition de la Duration Macaulay ?</>,
    choices: [
      <>C&apos;est le taux de rendement moyen de l&apos;obligation sur sa vie.</>,
      <>C&apos;est la maturité restante de l&apos;obligation.</>,
      <>C&apos;est la moyenne pondérée des échéances des flux, pondérée par leur valeur présente.</>,
      <>C&apos;est la sensibilité du prix à une variation du spread de crédit.</>,
    ],
    answer: 2,
    explanation: <>Une obligation 10 ans avec des coupons importants a une Duration bien inférieure à 10 ans car les flux intermédiaires pèsent dans la moyenne.</>,
  },
  {
    id: 'B2',
    question: <>Qu&apos;est-ce que signifie le fait que la convexité est toujours positive pour une obligation classique ?</>,
    choices: [
      <>Le prix ne peut jamais descendre en dessous du nominal.</>,
      <>Le prix monte plus qu&apos;il ne baisse pour une variation symétrique des taux.</>,
      <>Le coupon augmente automatiquement quand les taux montent.</>,
      <>La Duration augmente quelle que soit la variation de taux.</>,
    ],
    answer: 1,
    explanation: <>La convexité positive signifie que l&apos;approximation linéaire (Duration seule) sous-estime toujours le prix réel. L&apos;acheteur bénéficie de cet écart dans les deux sens.</>,
  },
  {
    id: 'B3',
    question: <>Une obligation a une sensibilité de 7 et un prix de 110. Quelle est la variation de prix approximative si les taux montent de 50 bps ?</>,
    choices: [
      <>&minus;3,85</>,
      <>&minus;7,70</>,
      <>&minus;0,50</>,
      <>&minus;7,00</>,
    ],
    answer: 0,
    explanation: <><Katex>{'dP \\approx -S \\times P \\times dy = -7 \\times 110 \\times 0{,}005 = -3{,}85'}</Katex>. La réponse &minus;7,70 correspond à dy=1%, et &minus;7,00 oublie de multiplier par le prix.</>,
  },
  {
    id: 'B4',
    question: <>Quelle est la principale différence entre une obligation classique et une obligation callable ?</>,
    choices: [
      <>L&apos;obligation callable a une Duration plus longue.</>,
      <>L&apos;obligation callable peut avoir une convexité négative quand les taux baissent fortement.</>,
      <>L&apos;obligation callable ne verse pas de coupon fixe.</>,
      <>L&apos;obligation callable est toujours moins chère qu&apos;une obligation classique équivalente.</>,
    ],
    answer: 1,
    explanation: <>Quand les taux baissent, l&apos;émetteur a intérêt à rappeler l&apos;obligation. Le prix est alors plafonné, ce qui crée une convexité négative.</>,
  },
  {
    id: 'B5',
    question: <>Un zéro-coupon avec un yield de 5 % sur 10 ans a une Duration Macaulay de… ?</>,
    choices: [
      <>5 ans</>,
      <>9,5 ans</>,
      <>8,1 ans</>,
      <>10 ans</>,
    ],
    answer: 3,
    explanation: <>Un zéro-coupon n&apos;a qu&apos;un seul flux, à maturité. La moyenne pondérée des échéances est triviale : 100 % du poids sur <Katex>{'T = 10'}</Katex> ans. Le yield n&apos;intervient pas.</>,
  },
];

const groupC = [
  {
    id: 'C1',
    question: <>Qu&apos;est-ce qu&apos;un taux forward <Katex>{'F(T_1, T_2)'}</Katex> ?</>,
    choices: [
      <>Le taux spot observé aujourd&apos;hui pour une maturité <Katex>{'T_2'}</Katex>.</>,
      <>Le taux d&apos;intérêt garanti aujourd&apos;hui pour un emprunt qui démarrera en <Katex>{'T_1'}</Katex> et se terminera en <Katex>{'T_2'}</Katex>.</>,
      <>La différence entre le taux <Katex>{'T_2'}</Katex> et le taux <Katex>{'T_1'}</Katex>.</>,
      <>Le taux de rendement d&apos;une obligation zéro-coupon de maturité <Katex>{'T_1'}</Katex>.</>,
    ],
    answer: 1,
    explanation: <>Le taux forward est extrait de la courbe spot par la condition d&apos;égalité des facteurs d&apos;escompte : placer 2 ans doit être équivalent à placer 1 an puis rouler au taux forward.</>,
  },
  {
    id: 'C2',
    question: <>Pourquoi un FRA est-il réglé en <Katex>{'T_1'}</Katex> et non en <Katex>{'T_2'}</Katex>, alors que le taux de référence porte sur la période <Katex>{'[T_1, T_2]'}</Katex> ?</>,
    choices: [
      <>Pour simplifier la comptabilité des banques.</>,
      <>Pour éviter le risque de contrepartie sur toute la durée du contrat.</>,
      <>Parce que le taux EURIBOR n&apos;est observé qu&apos;en <Katex>{'T_1'}</Katex>.</>,
      <>Parce que le régulateur l&apos;impose depuis Bâle III.</>,
    ],
    answer: 2,
    explanation: <>Le payoff <Katex>{'N(L-K)\\delta'}</Katex> est connu en <Katex>{'T_1'}</Katex> (fixing du taux L), mais représente un gain en <Katex>{'T_2'}</Katex>. On l&apos;actualise de <Katex>{'T_2'}</Katex> à <Katex>{'T_1'}</Katex> au taux L : payoff <Katex>{'= N(L-K)\\delta\\,/\\,(1+L\\delta)'}</Katex>.</>,
  },
  {
    id: 'C3',
    question: <>Le taux spot 1 an est 3 % et le taux spot 2 ans est 4 % (taux continus). Quel est le taux forward <Katex>{'F(1,2)'}</Katex> ?</>,
    choices: [
      <>3,5 %</>,
      <>4,0 %</>,
      <>5,0 %</>,
      <>1,0 %</>,
    ],
    answer: 2,
    explanation: <><Katex>{'F(1,2) = \\frac{y_2 T_2 - y_1 T_1}{T_2 - T_1} = \\frac{4\\% \\times 2 - 3\\% \\times 1}{1} = 5\\%'}</Katex>. Le taux forward est supérieur au taux long car la courbe est pentue.</>,
  },
  {
    id: 'C4',
    question: <>Quel est le principe du bootstrapping de la courbe des taux ?</>,
    choices: [
      <>Interpoler linéairement entre deux taux connus de la courbe des taux.</>,
      <>Extraire les facteurs d&apos;escompte un par un, des maturités courtes vers les longues, en utilisant les instruments cotés.</>,
      <>Calibrer un modèle de taux court sur les données historiques.</>,
      <>Utiliser la régression linéaire entre taux spot et taux forward.</>,
    ],
    answer: 1,
    explanation: <>On part du taux overnight, on monte vers le 3 mois (T-Bills), puis on utilise les FRA et futures pour les maturités intermédiaires. Chaque étape réutilise les facteurs d&apos;escompte déjà extraits.</>,
  },
];

const groupD = [
  {
    id: 'D1',
    question: <>Qu&apos;est-ce qu&apos;un Payer Swap du point de vue du risque de taux ?</>,
    choices: [
      <>Une position longue obligataire : on bénéficie si les taux baissent.</>,
      <>Une position neutre : les deux jambes se compensent exactement.</>,
      <>Une position courte obligataire : on bénéficie si les taux montent.</>,
      <>Une option sur taux avec un strike égal au taux fixe.</>,
    ],
    answer: 2,
    explanation: <>Payer le fixe et recevoir le variable revient à être short d&apos;une obligation (on paie un flux fixe) car on est long du taux variable (on gagne si les taux montent).</>,
  },
  {
    id: 'D2',
    question: <>Dans le monde single-curve, pourquoi la jambe variable d&apos;un swap vaut-elle simplement <Katex>{'1 - DF(T)'}</Katex> ?</>,
    choices: [
      <>Parce que les coupons variables sont égaux aux coupons fixes par construction.</>,
      <>Parce qu&apos;une suite de taux variables est équivalente à emprunter au taux court et rouler.</>,
      <>Parce que la courbe des taux est plate dans ce modèle.</>,
      <>Parce que le netting des flux intermédiaires annule tous les paiements sauf le dernier.</>,
    ],
    answer: 1,
    explanation: <>Structure télescopique : <Katex>{'DF(0)-DF(t_1) + DF(t_1)-DF(t_2) + \\ldots + DF(t_{n-1})-DF(T) = 1 - DF(T)'}</Katex>. Chaque taux Euribor forward est répliqué par deux zéro-coupons.</>,
  },
  {
    id: 'D3',
    question: <>Pourquoi la crise de 2008 a-t-elle imposé de séparer courbe de projection et courbe d&apos;actualisation dans le pricing des swaps ?</>,
    choices: [
      <>Parce que les régulateurs ont interdit d&apos;utiliser l&apos;Euribor comme taux sans risque.</>,
      <>Parce que le spread Euribor/OIS, censé être négligeable, a atteint 350 bps.</>,
      <>Parce que la BCE a changé sa politique de taux directeurs.</>,
      <>Parce que les swaps ont commencé à être compensés en chambre de compensation.</>,
    ],
    answer: 1,
    explanation: <>Avant 2008, une seule courbe Euribor servait à tout. La crise a montré qu&apos;Euribor ≠ taux sans risque car il contient un risque de crédit bancaire. On projette désormais les flux en Euribor mais on actualise en OIS.</>,
  },
  {
    id: 'D4',
    question: <>Un swap 10 ans de nominal 10 M€ a une DV01 de 10 000 €. Un future Bund a une DV01 de 80 €. Combien de contrats faut-il vendre pour couvrir le risque de taux ?</>,
    choices: [
      <>8 contrats</>,
      <>80 contrats</>,
      <>800 contrats</>,
      <>125 contrats</>,
    ],
    answer: 3,
    explanation: <><Katex>{'N = \\frac{DV01_{\\text{swap}}}{DV01_{\\text{future}}} = \\frac{10\\,000}{80} = 125'}</Katex> contrats. On vend les futures car on couvre une position receiver (long taux).</>,
  },
  {
    id: 'D5',
    question: <>Dans le contexte d&apos;un swap de taux, qu&apos;est-ce que l&apos;Annuité ?</>,
    choices: [
      <>Le montant du coupon fixe versé chaque année.</>,
      <>La somme des facteurs d&apos;escompte pondérés par les fractions de période sur toutes les dates de paiement.</>,
      <>La valeur de la jambe variable au moment de l&apos;initiation.</>,
      <>Le nominal multiplié par la durée du swap.</>,
    ],
    answer: 1,
    explanation: <>L&apos;Annuité <Katex>{'= \\sum_i DF(t_i) \\times \\delta_i'}</Katex>. Elle sert à calculer le par swap rate <Katex>{'S = (1 - DF(T)) / \\text{Annuité}'}</Katex>. C&apos;est aussi la sensibilité du swap au taux fixe — son PVBP.</>,
  },
];

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
    ...shuffle(groupA).slice(0, 2),
    ...shuffle(groupB).slice(0, 2),
    ...shuffle(groupC).slice(0, 2),
    ...shuffle(groupD).slice(0, 2),
  ];
}

const TOTAL = 8;

export default function QuizModule4Page() {
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
          <span className="text-gray-800 font-medium">Module 4 — Fixed Income I</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Résultats</h1>
        <p className="text-gray-500 mb-8">Quiz · Module 4 — Fixed Income I</p>

        {/* Score */}
        <div className={`border rounded-xl p-6 mb-10 text-center ${scoreBg}`}>
          <p className={`text-5xl font-bold mb-2 ${scoreColor}`}>{score} / {TOTAL}</p>
          <p className="text-gray-600 text-sm">
            {score >= 6
              ? 'Excellent ! Tu maîtrises bien le Module 4.'
              : score >= 4
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
            href="/cours/module-4-taux-credit/obligations-bases"
            className="px-6 py-2.5 rounded-lg text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Revoir le Module 4
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
        <span className="text-gray-800 font-medium">Module 4 — Fixed Income I</span>
      </nav>

      {/* Titre */}
      <h1 className="text-3xl font-bold text-gray-900 mb-1">Quiz · Module 4 — Fixed Income I</h1>
      <p className="text-sm text-gray-400 mb-8">
        8 questions tirées parmi 18 — un nouveau tirage à chaque session
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
