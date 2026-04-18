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

const groupA = [
  {
    id: 'A1',
    question: <>Quelle différence entre le Bêta et la corrélation <Katex>{'\\rho'}</Katex> ?</>,
    choices: [
      <>La corrélation et le bêta sont deux mesures équivalentes, juste dans des unités différentes</>,
      <>Le bêta est toujours compris entre <Katex>{'-1'}</Katex> et <Katex>{'1'}</Katex>, la corrélation non</>,
      <>La corrélation s&apos;applique aux actions, le bêta aux indices</>,
      <>La corrélation indique la direction du mouvement commun, le bêta indique le facteur d&apos;amplification</>,
    ],
    answer: 3,
    explanation: <><Katex>{'\\rho \\in [-1,1]'}</Katex> mesure si deux actifs bougent dans le même sens. Le bêta <Katex>{'\\beta = \\rho \\cdot \\sigma_A/\\sigma_B'}</Katex> dit de combien bouge A quand B bouge d&apos;une unité — il intègre le ratio de volatilités.</>,
  },
  {
    id: 'A2',
    question: <>Dans toute démonstration autour de la corrélation entre actifs, quelle propriété mathématique est fondamentale ?</>,
    choices: [
      <>La commutativité du produit scalaire</>,
      <>La linéarité de la covariance</>,
      <>L&apos;indépendance des incréments browniens</>,
      <>La propriété de martingale sous <Katex>{'\\mathbb{Q}'}</Katex></>,
    ],
    answer: 1,
    explanation: <><Katex>{'\\mathrm{Cov}(aX,\\, bY+Z) = ab\\,\\mathrm{Cov}(X,Y) + a\\,\\mathrm{Cov}(X,Z)'}</Katex>. C&apos;est cette propriété qui permet de décomposer la covariance d&apos;un indice (somme pondérée) avec n&apos;importe quel autre actif.</>,
  },
  {
    id: 'A3',
    question: <>Quelle formule lie le rendement de l&apos;indice au rendement de ses composantes ?</>,
    choices: [
      <><Katex>{'r_I = \\max(w_i \\cdot r_i)'}</Katex></>,
      <><Katex>{'r_I = \\sum w_i \\cdot r_i'}</Katex></>,
      <><Katex>{'r_I = \\prod w_i \\cdot r_i'}</Katex></>,
      <><Katex>{'r_I = \\sum w_i \\cdot r_i^2'}</Katex></>,
    ],
    answer: 1,
    explanation: <>L&apos;indice est une somme pondérée de ses composantes. C&apos;est le point de départ de toutes les démonstrations sur la corrélation indice-FX.</>,
  },
  {
    id: 'A4',
    question: <>Quelle est la formule de la volatilité d&apos;un indice en fonction de la volatilité de ses composantes ?</>,
    choices: [
      <><Katex>{'\\sigma_I = \\sum w_i \\cdot \\sigma_i'}</Katex></>,
      <><Katex>{'\\sigma_I = \\sqrt{\\sum w_i \\cdot \\sigma_i^2}'}</Katex></>,
      <><Katex>{'\\sigma_I = \\sqrt{\\sum_i \\sum_j w_i w_j \\rho_{ij} \\sigma_i \\sigma_j}'}</Katex></>,
      <><Katex>{'\\sigma_I = \\bigl(\\sum w_i \\cdot \\sigma_i\\bigr)^2'}</Katex></>,
    ],
    answer: 2,
    explanation: <>La variance de l&apos;indice est une double somme qui fait intervenir toutes les covariances croisées <Katex>{'\\rho_{ij}\\sigma_i\\sigma_j'}</Katex>. La formule <Katex>{'\\sum w_i\\sigma_i'}</Katex> serait vraie seulement si toutes les corrélations valaient 1.</>,
  },
  {
    id: 'A5',
    question: <>Qu&apos;est-ce qu&apos;un trade de dispersion ?</>,
    choices: [
      <>Vendre de la volatilité sur l&apos;indice et acheter de la volatilité sur les actions individuelles</>,
      <>Acheter de la volatilité sur l&apos;indice et vendre de la volatilité sur les actions individuelles</>,
      <>Acheter simultanément des straddles sur toutes les actions d&apos;un panier</>,
      <>Arbitrer le spread entre vol implicite et vol réalisée sur un indice</>,
    ],
    answer: 0,
    explanation: <>On est short corrélation : si les actions divergent (dispersion élevée), la vol réalisée des actions individuelles dépasse la vol de l&apos;indice, et on gagne sur les straddles achetés. L&apos;inverse est vrai si les actions sont très corrélées.</>,
  },
  {
    id: 'A6',
    question: <>Qu&apos;est-ce que la corrélation implicite ?</>,
    choices: [
      <>La corrélation historique entre deux actifs calculée sur 1 an</>,
      <>La corrélation extraite des cours de futures sur indices</>,
      <>La corrélation entre vol implicite et spot (le Vanna)</>,
      <>La corrélation déduite des prix d&apos;options sur l&apos;indice et sur ses composantes</>,
    ],
    answer: 3,
    explanation: <>En inversant la formule <Katex>{'\\sigma_I = \\sqrt{\\sum_i\\sum_j w_i w_j \\rho_{ij}\\sigma_i\\sigma_j}'}</Katex> avec les vols implicites de marché, on extrait la corrélation que le marché prise — c&apos;est la corrélation implicite.</>,
  },
  {
    id: 'A7',
    question: <>Quelle inégalité relie la volatilité de l&apos;indice à la moyenne pondérée des volatilités individuelles ?</>,
    choices: [
      <><Katex>{'\\sigma_I \\geq \\sum w_i \\sigma_i'}</Katex> (la diversification amplifie la vol)</>,
      <><Katex>{'\\sigma_I \\leq \\sum w_i \\sigma_i'}</Katex> (la diversification réduit la vol)</>,
      <><Katex>{'\\sigma_I = \\sum w_i \\sigma_i'}</Katex> toujours (vol additive)</>,
      <>Aucune relation générale n&apos;existe</>,
    ],
    answer: 1,
    explanation: <>C&apos;est l&apos;inégalité de Markowitz. La diversification réduit la volatilité globale dès que les corrélations sont strictement inférieures à 1. L&apos;égalité est atteinte seulement quand <Katex>{'\\rho_{ij} = 1'}</Katex> pour tous les couples.</>,
  },
  {
    id: 'A8',
    question: <>Quelle est la formule de la corrélation indice-FX ?</>,
    choices: [
      <><Katex>{'\\rho_{I,FX} = \\sum w_i \\cdot \\rho_{i,FX}'}</Katex></>,
      <><Katex>{'\\rho_{I,FX} = \\bigl(\\sum w_i \\cdot \\rho_{i,FX}\\bigr)^2'}</Katex></>,
      <><Katex>{'\\rho_{I,FX} = \\sum w_i \\cdot \\rho_{i,FX} \\cdot \\sigma_i / \\sigma_I'}</Katex></>,
      <><Katex>{'\\rho_{I,FX} = \\max(\\rho_{i,FX})'}</Katex></>,
    ],
    answer: 2,
    explanation: <>Par linéarité de la covariance : <Katex>{'\\mathrm{Cov}(I, FX) = \\sum w_i \\cdot \\mathrm{Cov}(S_i, FX) = \\sum w_i \\cdot \\rho_{i,FX} \\cdot \\sigma_i \\cdot \\sigma_{FX}'}</Katex>. En divisant par <Katex>{'\\sigma_I \\cdot \\sigma_{FX}'}</Katex>, le <Katex>{'\\sigma_{FX}'}</Katex> se simplifie et il reste le ratio <Katex>{'\\sigma_i/\\sigma_I'}</Katex> comme poids effectif.</>,
  },
  {
    id: 'A9',
    question: <>Dans un trade de dispersion, quel scénario est favorable à l&apos;acheteur de dispersion ?</>,
    choices: [
      <>Les actions du panier évoluent dans des directions différentes</>,
      <>Les actions du panier sont toutes très corrélées entre elles</>,
      <>La vol implicite de l&apos;indice monte fortement</>,
      <>Le FX est stable sur la période</>,
    ],
    answer: 0,
    explanation: <>L&apos;acheteur de dispersion est long vol actions, short vol indice. Il gagne si la dispersion est élevée (les actions s&apos;écartent les unes des autres), ce qui fait monter la vol réalisée des singles au-dessus de celle de l&apos;indice.</>,
  },
  {
    id: 'A10',
    question: <>Pourquoi la pondération dans la formule de corrélation indice-FX est-elle <Katex>{'\\sigma_i/\\sigma_I'}</Katex> et non simplement <Katex>{'w_i'}</Katex> ?</>,
    choices: [
      <>Pour normaliser les poids à 1</>,
      <>C&apos;est une convention de marché arbitraire</>,
      <>Pour tenir compte de l&apos;effet de levier de chaque action</>,
      <>La covariance est bilinéaire : en développant <Katex>{'\\mathrm{Cov}(\\sum w_i r_i,\\, r_{FX})'}</Katex> puis en divisant par <Katex>{'\\sigma_I \\cdot \\sigma_{FX}'}</Katex>, le ratio <Katex>{'\\sigma_i/\\sigma_I'}</Katex> apparaît naturellement</>,
    ],
    answer: 3,
    explanation: <><Katex>{'\\mathrm{Cov}(I,FX) = \\sum w_i\\,\\mathrm{Cov}(r_i, r_{FX}) = \\sum w_i \\rho_{i,FX}\\sigma_i\\sigma_{FX}'}</Katex>. En divisant par <Katex>{'\\sigma_I \\cdot \\sigma_{FX}'}</Katex> pour obtenir <Katex>{'\\rho'}</Katex>, le <Katex>{'\\sigma_{FX}'}</Katex> se simplifie et <Katex>{'\\sigma_i/\\sigma_I'}</Katex> reste comme facteur — ce n&apos;est pas une convention, c&apos;est une conséquence de la bilinéarité.</>,
  },
];

const groupB = [
  {
    id: 'B1',
    question: <>Quelle est la différence principale entre une option Quanto et une option Composite ?</>,
    choices: [
      <>Le Quanto est un Call, le Composite est un Put</>,
      <>Le Quanto s&apos;applique aux actions, le Composite aux indices</>,
      <>Le Quanto fixe le taux de change, le Composite s'expose au taux de change</>,
      <>Le Quanto a un payoff libellé en devise étrangère, le Composite en devise domestique</>,
    ],
    answer: 2,
    explanation: <>C&apos;est la distinction fondamentale. Le Quanto élimine le risque de change en fixant <Katex>{'X'}</Katex> à l&apos;avance. Le Composite conserve l&apos;exposition au FX puisque <Katex>{'S_T'}</Katex> est multiplié par <Katex>{'X_T'}</Katex> à maturité.</>,
  },
  {
    id: 'B2',
    question: <>Quel est le payoff d&apos;un Quanto Call ?</>,
    choices: [
      <><Katex>{'X_{\\text{fixe}} \\times (S_T - K)_+'}</Katex></>,
      <><Katex>{'(S_T \\times X_T - K)_+'}</Katex></>,
      <><Katex>{'X_T \\times (S_T - K)_+'}</Katex></>,
      <><Katex>{'(S_T - K \\times X_{\\text{fixe}})_+'}</Katex></>,
    ],
    answer: 0,
    explanation: <>Le taux de change est fixé à <Katex>{'X_{\\text{fixe}}'}</Katex>, donc on convertit le payoff en devise étrangère à un taux garanti. C&apos;est ce qui distingue le Quanto d&apos;une option vanille convertie au spot.</>,
  },
  {
    id: 'B3',
    question: <>Quel est le payoff d&apos;un Composite Call (du point de vue européen vers les US : <Katex>{'S_T'}</Katex> est en USD et <Katex>{'X_T'}</Katex> est l'USD/EUR) ?</>,
    choices: [
      <><Katex>{'X_{\\text{fixe}} \\times (S_T - K)_+'}</Katex></>,
      <><Katex>{'X_T \\times (S_T - K_{EUR})_+'}</Katex></>,
      <><Katex>{'(S_T \\times X_T - K_{EUR})_+'}</Katex></>,
      <><Katex>{'(S_T - K_{EUR} / X_T)_+'}</Katex></>,
    ],
    answer: 2,
    explanation: <>Le sous-jacent <Katex>{'S_T'}</Katex> (en USD) est converti au taux courant <Katex>{'X_T'}</Katex>, et on compare le résultat au strike <Katex>{'K'}</Katex> en EUR. Le risque de change est pleinement présent — c&apos;est pourquoi la vol composite dépend de <Katex>{'\\rho'}</Katex>.</>,
  },
  {
    id: 'B4',
    question: <>Quel est le processus de l&apos;action sous-jacente dans un Quanto (sous <Katex>{'\\mathbb{Q}_{EUR}'}</Katex>) ?</>,
    choices: [
      <><Katex>{'dS/S = (r_{EUR} - q)\\,dt + \\sigma_S\\,dW^{S,\\mathbb{Q}_{USD}}'}</Katex></>,
      <><Katex>{'dS/S = (r_{USD} - q - \\rho\\sigma_S\\sigma_X)\\,dt + \\sigma_S\\,dW^{S,\\mathbb{Q}_{EUR}}'}</Katex></>,
      <><Katex>{'dS/S = (r_{USD} - q)\\,dt + \\sigma_S\\,dW^{S,\\mathbb{Q}_{USD}}'}</Katex></>,
      <><Katex>{'dS/S = (r_{EUR} - q + \\rho\\sigma_S\\sigma_X)\\,dt + \\sigma_S\\,dW^{S,\\mathbb{Q}_{EUR}}'}</Katex></>,
    ],
    answer: 1,
    explanation: <>Sous <Katex>{'\\mathbb{Q}_{EUR}'}</Katex>, le changement de mesure de Girsanov introduit un drift correctif <Katex>{'-\\rho\\sigma_S\\sigma_X'}</Katex>. C&apos;est le &quot;coût du quanto&quot; : si l&apos;action et le FX sont positivement corrélés, le forward Quanto est réduit d&apos;autant. Le hedging du quanto doit rapporter le taux sans risque étranger (USD).</>,
  },
  {
    id: 'B5',
    question: <>D&apos;où vient le terme de correction <Katex>{'-\\rho\\sigma_S\\sigma_X'}</Katex> dans le drift du Quanto ?</>,
    choices: [
      <>D&apos;un changement de mesure de Girsanov entre <Katex>{'\\mathbb{Q}_{USD}'}</Katex> et <Katex>{'\\mathbb{Q}_{EUR}'}</Katex>, qui introduit un drift correctif proportionnel à la corrélation</>,
      <>D&apos;un ajustement de convexité lié à la courbure du payoff</>,
      <>D&apos;une approximation de Taylor au premier ordre du taux de change</>,
      <>D&apos;une condition de non-arbitrage entre marchés Call et Put</>,
    ],
    answer: 0,
    explanation: <>Passer de <Katex>{'\\mathbb{Q}_{USD}'}</Katex> à <Katex>{'\\mathbb{Q}_{EUR}'}</Katex> modifie le Brownien de l&apos;action : <Katex>{'dW^{S,\\mathbb{Q}_{EUR}} = dW^{S,\\mathbb{Q}_{USD}} + \\rho\\sigma_X\\,dt'}</Katex>. Ce drift supplémentaire <Katex>{'\\rho\\sigma_X'}</Katex> vient se soustraire au drift sous <Katex>{'\\mathbb{Q}_{USD}'}</Katex>, donnant <Katex>{'r_{USD} - q - \\rho\\sigma_S\\sigma_X'}</Katex>.</>,
  },
  {
    id: 'B6',
    question: <>Quel est le processus de l&apos;action sous-jacente dans une option Composite (sous <Katex>{'\\mathbb{Q}_{EUR}'}</Katex>) ?</>,
    choices: [
      <><Katex>{'dS/S = r_{USD}\\,dt + \\sigma_S\\,dW^{S,\\mathbb{Q}_{EUR}}'}</Katex></>,
      <><Katex>{'dS/S = r_{EUR}\\,dt + \\sigma_S\\,dW^{S,\\mathbb{Q}_{EUR}}'}</Katex></>,
      <><Katex>{'dS/S = (r_{EUR} - q)\\,dt + \\sqrt{\\sigma_S^2 + \\sigma_X^2}\\,dW^{S,\\mathbb{Q}_{EUR}}'}</Katex></>,
      <><Katex>{'dS/S = r_{EUR}\\,dt + \\sqrt{\\sigma_S^2 + \\sigma_X^2 + 2\\rho\\sigma_S\\sigma_X}\\,dW^{S,\\mathbb{Q}_{EUR}}'}</Katex></>,
    ],
    answer: 3,
    explanation: <>Dans le Composite, on price <Katex>{'S_T \\times X_T'}</Katex> sous <Katex>{'\\mathbb{Q}_{EUR}'}</Katex>. Le produit <Katex>{'S \\times X'}</Katex> se comporte comme un actif de vol <Katex>{'\\sqrt{\\sigma_S^2 + \\sigma_X^2 + 2\\rho\\sigma_S\\sigma_X}'}</Katex> — la formule du portefeuille. Le drift est <Katex>{'r_{EUR}'}</Katex> par absence d&apos;arbitrage domestique.</>,
  },
  {
    id: 'B7',
    question: <>Pour un Long Call Composite, quelle est l&apos;exposition à la corrélation <Katex>{'\\rho'}</Katex> ?</>,
    choices: [
      <>Short <Katex>{'\\rho'}</Katex></>,
      <>Neutre à <Katex>{'\\rho'}</Katex></>,
      <>Long <Katex>{'\\rho'}</Katex></>,
      <>Dépend du niveau du strike</>,
    ],
    answer: 2,
    explanation: <>Vol composite <Katex>{'= \\sqrt{\\sigma_S^2 + \\sigma_X^2 + 2\\rho\\sigma_S\\sigma_X}'}</Katex>. Plus <Katex>{'\\rho'}</Katex> est élevé, plus la vol est grande, plus la prime du Call est élevée. Long Call Composite = Long <Katex>{'\\rho'}</Katex>. Cas limite : <Katex>{'\\rho = -1'}</Katex> annule quasiment la volatilité.</>,
  },
  {
    id: 'B8',
    question: <>Pour un Long Call Quanto, quelle est l&apos;exposition à la corrélation <Katex>{'\\rho'}</Katex> ?</>,
    choices: [
      <>Long <Katex>{'\\rho'}</Katex></>,
      <>Short <Katex>{'\\rho'}</Katex></>,
      <>Neutre à <Katex>{'\\rho'}</Katex></>,
      <>J'avoue humblement que je ne sais pas</>,
    ],
    answer: 1,
    explanation: <>Le forward Quanto <Katex>{'= S_0 \\cdot e^{(r_{USD} - q - \\rho\\sigma_S\\sigma_X)T}'}</Katex>. Si <Katex>{'\\rho > 0'}</Katex>, le forward baisse, donc la prime du Call baisse. Long Call Quanto = Short <Katex>{'\\rho'}</Katex>. C'est l&apos;opposé pour un Long Put Quanto.</>,
  },
  {
    id: 'B9',
    question: <>Qu&apos;est-ce que le Cross-Gamma dans le hedging d&apos;un Quanto ?</>,
    choices: [
      <>La dérivée seconde croisée du prix par rapport à <Katex>{'S'}</Katex> et <Katex>{'X'}</Katex></>,
      <>Le Gamma de l&apos;option par rapport au FX uniquement</>,
      <>La somme des Gammas du Quanto et du FX forward</>,
      <>Un terme applicable uniquement aux options à barrière</>,
    ],
    answer: 0,
    explanation: <><Katex>{'d\\Pi \\propto (\\rho_{\\text{réal}} - \\rho_{\\text{impl}}) \\cdot \\sigma_S \\cdot \\sigma_X \\cdot S \\cdot X \\cdot dt'}</Katex>. Si la corrélation réalisée dépasse la corrélation implicite pricée, le trader gagne. C&apos;est l&apos;analogue du Gamma scalping mais sur la corrélation.</>,
  },
  {
    id: 'B10',
    question: <>Pourquoi dit-on que le Quanto élimine le risque de change pour l&apos;investisseur domestique ?</>,
    choices: [
      <>Parce que la corrélation <Katex>{'\\rho'}</Katex> est supposée nulle dans le modèle</>,
      <>Parce que l&apos;option est toujours réglée en monnaie locale au taux spot</>,
      <>Parce que le sous-jacent est converti au taux initial <Katex>{'S_0'}</Katex></>,
      <>Parce que le taux de change <Katex>{'X_{\\text{fixe}}'}</Katex> est contractuellement fixé dès l&apos;initiation.</>,
    ],
    answer: 3,
    explanation: <>Le payoff <Katex>{'X_{\\text{fixe}} \\times (S_T - K)_+'}</Katex> ne dépend plus de <Katex>{'X_T'}</Katex>. Quelle que soit l&apos;évolution du FX entre aujourd&apos;hui et maturité, l&apos;investisseur reçoit exactement <Katex>{'X_{\\text{fixe}}'}</Katex> par unité de performance de l&apos;action. Le risque FX est transféré à la contrepartie qui vend le Quanto.</>,
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

export default function QuizModule7Page() {
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
          <span className="text-gray-800 font-medium">Module 7 — Quanto &amp; FX</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Résultats</h1>
        <p className="text-gray-500 mb-8">Quiz · Module 7 — Quanto &amp; FX</p>

        {/* Score */}
        <div className={`border rounded-xl p-6 mb-10 text-center ${scoreBg}`}>
          <p className={`text-5xl font-bold mb-2 ${scoreColor}`}>{score} / {TOTAL}</p>
          <p className="text-gray-600 text-sm">
            {score >= 8
              ? 'Excellent ! Tu maîtrises bien le Module 7.'
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
            href="/cours/module-7-quanto-fx/correlation-fx"
            className="px-6 py-2.5 rounded-lg text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Revoir le Module 7
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
        <span className="text-gray-800 font-medium">Module 7 — Quanto &amp; FX</span>
      </nav>

      {/* Titre */}
      <h1 className="text-3xl font-bold text-gray-900 mb-1">Quiz · Module 7 — Quanto &amp; FX</h1>
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
