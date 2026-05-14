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

// ── Banque de 24 questions — 4 groupes ──

const groupA = [
  {
    id: 'A1',
    question: <>La parité des taux couverte stipule que le taux forward EUR/USD est égal à :</>,
    choices: [
      <><Katex>{'S \\times e^{(r_{\\text{USD}} - r_{\\text{EUR}}) \\times T}'}</Katex></>,
      <><Katex>{'S \\times e^{(r_{\\text{EUR}} - r_{\\text{USD}}) \\times T}'}</Katex></>,
      <>Le taux spot multiplié par la différence des taux d&apos;intérêts</>,
      <>Le taux spot plus les points de swap en valeur absolue</>,
    ],
    answer: 0,
    explanation: <>Si <Katex>{'r_{\\text{USD}} > r_{\\text{EUR}}'}</Katex>, alors <Katex>{'F > S'}</Katex>.</>,
  },
  {
    id: 'A2',
    question: <>Dans un FX Swap EUR/USD, la jambe Farleg désigne :</>,
    choices: [
      <>L&apos;échange initial au taux spot</>,
      <>L&apos;échange final à une date ultérieure au taux forward convenu</>,
      <>Le différentiel entre le taux forward et le taux spot</>,
      <>Le paiement des intérêts intermédiaires en dollars</>,
    ],
    answer: 1,
    explanation: <>Le FX Swap = Nearleg (spot) + Farleg (forward). Aucun flux intermédiaire, c&apos;est ce qui le distingue d&apos;un CIRS (XCSwap).</>,
  },
  {
    id: 'A3',
    question: <>Le Cross-Currency Basis Spread EUR/USD est négatif. Cela signifie que :</>,
    choices: [
      <>La parité des taux couverte est respectée</>,
      <>L&apos;euro est plus rare que le dollar sur le marché interbancaire</>,
      <>Le taux forward EUR/USD est inférieur au taux spot</>,
      <>Le dollar est plus rare que l&apos;euro, ce qui rend son emprunt plus coûteux</>,
    ],
    answer: 3,
    explanation: <>Basis négatif = la jambe EUR reçoit Euribor moins le Basis. Le dollar est en prime de rareté (visible lors des crises mars 2020, septembre 2008).</>,
  },
  {
    id: 'A4',
    question: <>Dans un CIRS (Cross-Currency Swap) standard, les notionnels :</>,
    choices: [
      <>Ne sont jamais échangés, seuls les flux d&apos;intérêts transitent</>,
      <>Sont échangés à l&apos;initiation au taux spot, puis ré-échangés à l&apos;échéance au même taux spot initial</>,
      <>Sont échangés uniquement à l&apos;initiation, pas à l&apos;échéance</>,
      <>Sont échangés à l&apos;initiation au taux spot, puis ré-échangés à l&apos;échéance au taux forward</>,
    ],
    answer: 1,
    explanation: <>Le ré-échange final se fait au taux spot initial, c&apos;est ce qui élimine le risque de change sur le notionnel, contrairement à deux emprunts séparés.</>,
  },
  {
    id: 'A5',
    question: <>Un tom/next est utilisé principalement pour :</>,
    choices: [
      <>Fixer le taux d&apos;un FRA à deux jours ouvrés</>,
      <>Roller quotidiennement une position FX spot d&apos;un jour ouvré au suivant</>,
      <>Calculer les points de swap sur une maturité supérieure à un an</>,
      <>Compenser le basis spread dans un CIRS Float/Float</>,
    ],
    answer: 1,
    explanation: <>Le tom/next permet de maintenir une position FX spot active sans livraison physique. C&apos;est le mécanisme de roulement standard sur le marché des changes.</>,
  },
  {
    id: 'A6',
    question: <>Dans un Cross-Currency Swap Float/Float, quels sont les risques principaux associés ?</>,
    choices: [
      <>Risque de taux, Risque de contrepartie / XVA, Spot Risk</>,
      <>Risque de taux, Basis Risk, Spot Risk</>,
      <>Basis Risk, Spot Risk, Risque de liquidité</>,
      <>Basis Risk, Spot Risk, XVA / Risque de contrepartie</>,
    ],
    answer: 3,
    explanation: <>Un Float/Float est quasi-neutre au risque de taux (les deux jambes sont variables). Les risques réels sont : le Basis Risk, le Spot Risk (appréciation de la devise empruntée → appels de marge), et le risque de contrepartie/XVA.</>,
  },
];

const groupB = [
  {
    id: 'B1',
    question: <>Un investisseur achète une protection CDS. En cas d&apos;événement de crédit avec un Recovery Rate de 40 %, le vendeur de protection verse :</>,
    choices: [
      <>60 % du notionnel</>,
      <>40 % du notionnel</>,
      <>100 % du notionnel moins la valeur de marché de l&apos;obligation</>,
      <>Le spread CDS multiplié par le notionnel</>,
    ],
    answer: 0,
    explanation: <>Le vendeur verse <Katex>{'N \\times (1 - R) = 60\\,\\%'}</Katex> du notionnel. L&apos;acheteur récupère les 40 % restants via la livraison de l&apos;obligation ou le cash settlement.</>,
  },
  {
    id: 'B2',
    question: <>La relation d&apos;approximation du spread CDS est :</>,
    choices: [
      <>Spread ≈ PD / (1 − R)</>,
      <>Spread ≈ PD × R</>,
      <>Spread ≈ PD × (1 − R)</>,
      <>Spread ≈ (1 − PD) × R</>,
    ],
    answer: 2,
    explanation: <>Le spread compense l&apos;espérance de perte : PD × (1−R). Exemple : PD=5 %, R=40 % → spread ≈ 300 bps. La formule exacte divise le tout par l&apos;Annuité.</>,
  },
  {
    id: 'B3',
    question: <>Depuis la standardisation Big Bang ISDA 2009, les CDS Investment Grade se négocient avec :</>,
    choices: [
      <>Un coupon variable égal au spread de marché, sans upfront</>,
      <>Un coupon fixe de 100 bps et un upfront ajustable</>,
      <>Un coupon fixe de 25 bps et un upfront ajustable</>,
      <>Un coupon fixe de 500 bps et un upfront ajustable</>,
    ],
    answer: 1,
    explanation: <>IG = 100 bps fixes, HY = 500 bps fixes. L&apos;upfront compense la différence entre le coupon standardisé et le spread de marché réel. Cela facilite la compensation centrale.</>,
  },
  {
    id: 'B4',
    question: <>Le CS01 d&apos;un CDS décroît quand son spread augmente. Ce phénomène s&apos;explique par :</>,
    choices: [
      <>La réduction de la durée résiduelle du contrat en cas de défaut imminent</>,
      <>L&apos;augmentation du Recovery Rate implicite en période de stress</>,
      <>La convention de coupon fixe post-ISDA 2009 qui plafonne la sensibilité</>,
      <>La diminution de la probabilité de survie qui réduit la valeur des flux futurs</>,
    ],
    answer: 3,
    explanation: <>Quand le spread augmente, la probabilité de survie diminue, les flux futurs s&apos;effacent progressivement et le CS01 fond. C&apos;est la convexité négative du CDS vendeur.</>,
  },
  {
    id: 'B5',
    question: <>Un Negative Basis Trade consiste à :</>,
    choices: [
      <>Vendre une protection CDS et vendre l&apos;obligation sous-jacente simultanément</>,
      <>Acheter une protection CDS et vendre l&apos;obligation à découvert</>,
      <>Acheter une protection CDS et acheter l&apos;obligation, financée via Repo</>,
      <>Vendre une protection CDS et acheter des Puts sur l&apos;obligation</>,
    ],
    answer: 2,
    explanation: <>Achat obligation + achat protection CDS financé via Repo. Le gain = Basis négatif (spread bond &gt; spread CDS). Théoriquement sans risque de crédit, mais exposé au risque de financement Repo et au gap risk.</>,
  },
  {
    id: 'B6',
    question: <>La VaR d&apos;un book de vente de protection CDS affiche souvent zéro. Pourquoi est-ce trompeur ?</>,
    choices: [
      <>Car le Recovery Rate est fixé à 40 % par convention, neutralisant la perte attendue</>,
      <>Car la VaR mesure les pertes quotidiennes normales et manque les événements de défaut rares</>,
      <>Car les indices iTraxx et CDX compensent automatiquement le risque directionnel</>,
      <>Car le CDS est un dérivé hors-bilan non soumis aux règles de VaR</>,
    ],
    answer: 1,
    explanation: <>Le défaut est un événement binaire et rare : invisible dans la distribution historique des P&amp;L quotidiens. La VaR = 0 masque souvent un gros tail risk.</>,
  },
];

const groupC = [
  {
    id: 'C1',
    question: <>Du point de vue du receveur inflation dans un ZCIS, le payoff à l&apos;échéance est :</>,
    choices: [
      <><Katex>{'N \\times K \\times T'}</Katex></>,
      <><Katex>{'N \\times \\left[(1+K)^T - I_T/I_0\\right]'}</Katex></>,
      <><Katex>{'N \\times (I_T/I_0 - 1) \\times T'}</Katex></>,
      <><Katex>{'N \\times \\left[I_T/I_0 - (1+K)^T\\right]'}</Katex></>,
    ],
    answer: 3,
    explanation: <>Le receveur inflation reçoit la performance cumulée de l&apos;indice et paie le taux fixe composé. Positif si l&apos;inflation réalisée dépasse le taux fixe négocié.</>,
  },
  {
    id: 'C2',
    question: <>Laquelle de ces expressions représente l&apos;équation de Fisher exacte ?</>,
    choices: [
      <><Katex>{'(1 + r_{\\text{nom}}) = (1 + r_{\\text{réel}}) \\times (1 + \\pi)'}</Katex></>,
      <><Katex>{'r_{\\text{nom}} = r_{\\text{réel}} \\times \\pi'}</Katex></>,
      <><Katex>{'(1 + r_{\\text{nom}}) = (1 + r_{\\text{réel}}) + (1 + \\pi)'}</Katex></>,
      <><Katex>{'r_{\\text{nom}} = r_{\\text{réel}} \\times (1 + \\pi)'}</Katex></>,
    ],
    answer: 0,
    explanation: <>La forme exacte est multiplicative. L&apos;approximation additive <Katex>{'r_{\\text{nom}} \\approx r_{\\text{réel}} + \\pi'}</Katex> tient quand les taux sont faibles, car le terme croisé <Katex>{'r_{\\text{réel}} \\times \\pi'}</Katex> devient négligeable.</>,
  },
  {
    id: 'C3',
    question: <>Le lag de 3 mois dans les swaps d&apos;inflation existe principalement parce que :</>,
    choices: [
      <>Les indices CPI/HICPxT sont publiés avec un décalage, rendant l&apos;indice du mois courant indisponible à la date de fixing</>,
      <>La BCE impose un délai réglementaire de 3 mois sur tous les dérivés de taux</>,
      <>Le délai de 3 mois correspond à la saisonnalité de l&apos;inflation en zone euro</>,
      <>Le marché interbancaire ne cote les swaps d&apos;inflation qu&apos;en fin de trimestre</>,
    ],
    answer: 0,
    explanation: <>L&apos;indice du mois M n&apos;est publié qu&apos;en M+1 ou M+2. Le lag de 3 mois garantit que l&apos;indice de référence est disponible à la date de fixing du swap.</>,
  },
  {
    id: 'C4',
    question: <>Le Breakeven Swap est supérieur au Breakeven Bond. Cet écart (le Basis) s&apos;explique principalement par :</>,
    choices: [
      <>La différence de duration entre un ZCIS et un TIPS de même maturité</>,
      <>La prime de liquidité du dérivé et la valeur du Deflation Floor implicite dans le TIPS</>,
      <>Le risque de contrepartie plus élevé sur les swaps que sur les obligations d&apos;État</>,
      <>La fiscalité plus favorable des obligations indexées par rapport aux swaps</>,
    ],
    answer: 1,
    explanation: <>Le TIPS embarque un Deflation Floor (remboursement au minimum au pair) que le détenteur possède gratuitement. Le Basis reflète cette option en plus de la prime de liquidité du dérivé.</>,
  },
  {
    id: 'C5',
    question: <>La saisonnalité de l&apos;inflation crée un carry sur les swaps d&apos;inflation. En pratique :</>,
    choices: [
      <>Le carry est toujours positif pour le receveur inflation quelle que soit la période</>,
      <>Le carry est nul car les indices sont corrigés des variations saisonnières</>,
      <>Le carry est positif en janvier car les hausses de prix de début d&apos;année gonflent l&apos;indice</>,
      <>Le carry est négatif en janvier (soldes) et positif en juillet-septembre (énergie, vacances)</>,
    ],
    answer: 3,
    explanation: <>Les soldes de janvier compriment l&apos;indice → carry négatif pour le receveur inflation. Juillet-septembre gonflent l&apos;indice → carry positif. Le desk gère activement ce risque calendaire.</>,
  },
  {
    id: 'C6',
    question: <>Un trader achète un TIPS et vend un ZCIS de même maturité. Son gain net est :</>,
    choices: [
      <>Le breakeven bond (inflation implicite) moins le taux fixe du ZCIS (K_swap)</>,
      <>Le taux nominal du Treasury moins le taux réel du TIPS</>,
      <>(K_swap − inflation implicite du Bond), soit le Basis capturé</>,
      <>Le taux réel du TIPS plus le dividende versé par le TIPS</>,
    ],
    answer: 2,
    explanation: <>Achat TIPS → reçoit r_réel + inflation réalisée. Vente ZCIS → paie inflation réalisée, reçoit K_swap. Net = r_réel + K_swap − [le coût d'achat du TIPS (qui est r_nom = r_réel + inflation implicite)] donc net = (K_swap − inflation implicite du Bond) = (Breakeven Swap - Breakeven Bond), soit le Basis. Si Basis &gt; 0, le trade est profitable, et le trader détient aussi le Deflation Floor implicitement.</>,
  },
];

const groupD = [
  {
    id: 'D1',
    question: <>Dans un Total Return Swap, la jambe Equity Leg reçue par le hedge fund comprend :</>,
    choices: [
      <>La performance en capital plus les dividendes versés pendant la période</>,
      <>Uniquement la performance en capital de l&apos;actif sous-jacent</>,
      <>La performance en capital moins les dividendes retenus par la banque</>,
      <>Un taux fixe calculé sur la valeur initiale de l&apos;actif</>,
    ],
    answer: 0,
    explanation: <>La jambe Equity = performance totale = plus-value + dividendes. C&apos;est précisément ce qui donne son nom au Total Return Swap, le hedge fund reçoit le rendement total sans détenir l&apos;actif.</>,
  },
  {
    id: 'D2',
    question: <>L&apos;un des principaux avantages du TRS pour un hedge fund est l&apos;anonymat. Cela signifie concrètement :</>,
    choices: [
      <>Le hedge fund peut éviter la retenue à la source sur les dividendes étrangers</>,
      <>La banque ne connaît pas l&apos;identité du hedge fund dans le contrat</>,
      <>Le hedge fund n&apos;apparaît pas dans le registre des actionnaires et évite les obligations de déclaration de franchissement de seuil</>,
      <>Les positions du hedge fund sont exemptées de reporting à l&apos;autorité de marché</>,
    ],
    answer: 2,
    explanation: <>Via le TRS, le hedge fund accumule une exposition sans jamais franchir officiellement les seuils de déclaration, rendant le risque agrégé invisible pour les régulateurs et les autres contreparties.</>,
  },
  {
    id: 'D3',
    question: <>La banque qui vend un TRS à un hedge fund se couvre en achetant l&apos;actif physiquement. Son P&amp;L résiduel est :</>,
    choices: [
      <>Égal au dividende reçu moins le coupon fixe versé au hedge fund</>,
      <>Nul, la couverture est parfaite par construction</>,
      <>Égal au spread s perçu sur la jambe Floating, net des coûts de financement et de portage</>,
      <>Égal à la performance de l&apos;actif moins le taux Euribor</>,
    ],
    answer: 2,
    explanation: <>La banque emprunte à Euribor, achète l&apos;actif, reverse la performance, et perçoit Euribor + spread. Son gain net = spread s. Ce spread devient insuffisant si le coût de financement dépasse le spread (negative carry en crise).</>,
  },
  {
    id: 'D4',
    question: <>Le levier via TRS présente un risque structurel spécifique par rapport à un levier classique sur marge. Lequel ?</>,
    choices: [
      <>Le TRS impose une limite réglementaire de levier fixée à 3x le capital du fonds</>,
      <>Le TRS amplifie le risque de taux car la jambe Floating est indexée sur Euribor</>,
      <>Le levier est visible dans le bilan du hedge fund et soumis aux appels de marge quotidiens</>,
      <>L&apos;exposition totale est hors-bilan et potentiellement invisible pour les contreparties et les régulateurs, rendant le risque systémique difficile à détecter</>,
    ],
    answer: 3,
    explanation: <>Le TRS est hors-bilan pour le hedge fund. Plusieurs banques peuvent chacune ignorer l&apos;exposition totale du fonds. Ce manque de transparence agrégée est le risque systémique central.</>,
  },
  {
    id: 'D5',
    question: <>Le Tax Risk sur un TRS Equity désigne :</>,
    choices: [
      <>L&apos;asymétrie entre le dividende brut dû par la banque au hedge fund et le dividende net effectivement reçu par la banque</>,
      <>Le risque que la législation fiscale requalifie le TRS en détention directe d&apos;actions</>,
      <>La retenue à la source appliquée sur la jambe Floating en cas de paiement transfrontalier</>,
      <>Le risque de double imposition sur les plus-values réalisées via le TRS</>,
    ],
    answer: 0,
    explanation: <>La banque reçoit un dividende net (après retenue à la source) mais doit reverser un dividende brut au hedge fund. L&apos;écart est un coût structurel absorbé par le desk Delta One.</>,
  },
  {
    id: 'D6',
    question: <>Un desk Delta One reçoit un TRS sur une action hard-to-borrow. On doit donc vendre la performance de l'actif.Quel risque spécifique cela génère-t-il ?</>,
    choices: [
      <>Un risque de taux car la jambe Floating est indexée sur Euribor</>,
      <>Un risque de change si l'action est cotée dans une devise étrangère</>,
      <>Un surcoût de repo car emprunter le titre coûte plus cher que le spread standard</>,
      <>Un risque de dividende car l'action hard-to-borrow verse des dividendes exceptionnels</>,
    ],
    answer: 2,
    explanation: <>Hard-to-borrow = le titre est rare sur le marché du prêt de titres. La banque paie un Special Repo élevé pour se couvrir. Ce surcoût est répercuté sur le client via un spread majoré sur la jambe Floating.</>,
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

export default function QuizModule6FI3Page() {
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
          <span className="text-gray-800 font-medium">Module 6 — Fixed Income III</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Résultats</h1>
        <p className="text-gray-500 mb-8">Quiz · Module 6 — Fixed Income III</p>

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
            href="/cours/module-6-fixed-income-3/fx-swap"
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
        <span className="text-gray-800 font-medium">Module 6 — Fixed Income III</span>
      </nav>

      {/* Titre */}
      <h1 className="text-3xl font-bold text-gray-900 mb-1">Quiz · Module 6 — Fixed Income III</h1>
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
