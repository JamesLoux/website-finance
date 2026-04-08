// Page de cours : Module 3 — Arbitrage Theta-Gamma

import Link from 'next/link';
import { InlineMath, BlockMath } from '../../../components/Math';
import CallValueChart from '../../components/CallValueChart';

export const metadata = {
  title: 'Arbitrage Theta-Gamma — Finance according to James',
  description:
    "Relation fondamentale entre Theta et Gamma dans un portefeuille Delta-neutre, Gamma scalping et anomalie du Put Deep-ITM.",
};

export default function ArbitrageThetaGammaPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12">

      {/* ── Fil d'Ariane ── */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/cours" className="hover:text-blue-600 transition-colors">Cours</Link>
        <span>/</span>
        <span className="text-gray-500">Module 3 — The Greeks</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">Arbitrage Theta-Gamma</span>
      </nav>

      {/* ── Titre ── */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
        Arbitrage Theta-Gamma
      </h1>

      {/* ── Introduction ── */}
      <p className="text-lg text-gray-600 leading-relaxed mb-4">
        Les Greeks ne sont pas indépendants. Theta et Gamma sont liés par une relation
        d&apos;équilibre qui est la base de la logique du delta-hedging dynamique.
        Comprendre cette relation, c&apos;est comprendre pourquoi une option vaut quelque chose
        et comment on peut en extraire de la valeur.
      </p>
      <p className="text-gray-600 leading-relaxed mb-10">
        On commence par l&apos;inégalité de Jensen pour expliquer l&apos;origine de la valeur temps,
        puis on construit le P&L d&apos;un portefeuille Delta-neutre pour dériver la relation
        fondamentale Theta-Gamma. Enfin, on examinera une anomalie qui n&apos;existe que pour les options européennes.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 1 — Jensen
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="jensen" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-24">
        1. L&apos;origine de la convexité : l&apos;inégalité de Jensen
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Le payoff d&apos;un Call européen, <InlineMath>{'\\max(S_T - K,\\, 0)'}</InlineMath>, est une
        fonction <strong>convexe</strong> du prix du sous-jacent <InlineMath>{'S_T'}</InlineMath>.
        Une fonction est convexe si sa courbe est toujours en dessous de la corde qui relie
        deux points quelconques. Visuellement, elle est en forme de sourire.
      </p>
      <p className="text-gray-600 leading-relaxed mb-6">
        L&apos;inégalité de Jensen établit une propriété fondamentale des fonctions convexes :
      </p>

      <div className="bg-gray-50 border border-gray-300 rounded-xl px-8 py-6 mb-8 text-center">
        <BlockMath>{'\\mathbb{E}\\left[f(S_t)\\right] \\geq f\\left(\\mathbb{E}\\left[S_t\\right]\\right)'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        Autrement dit, l&apos;espérance d&apos;une fonction convexe est toujours supérieure ou égale
        à la fonction de l&apos;espérance. C'est l'explication financière derrière le prix de l'option car le payoff est convexe.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Traduction financière
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Le prix d&apos;une option vaut <strong>toujours plus</strong> que la valeur intrinsèque
          calculée sur l&apos;espérance du prix futur. Cette différence est la{' '}
          <strong>valeur temps</strong>, et elle est entièrement dictée par la volatilité :
          plus <InlineMath>{'S_T'}</InlineMath> peut s&apos;écarter de son espérance (grande volatilité),
          plus l&apos;inégalité de Jensen est &quot;active&quot; et plus la valeur temps est importante.
          C&apos;est pour cette raison fondamentale qu&apos;une option a une valeur positive même
          quand elle est en dehors de la monnaie.
          Personnellement, je lis cette inégalité avec cette phrase : &quot;Le prix d'une option vaut plus que l'option du prix moyen&quot;. Exemple pour le démontrer : Le prix moyen de deux options vaut plus que l'option sur le prix moyen de deux même sous-jacents, il suffit de regarder quand l'une est exercée et l'autre non.
        </p>
      </div>

      {/* ── Graphique interactif : valeur temps d'un Call ── */}
      <p className="text-gray-600 leading-relaxed mb-4">
        Le graphique suivant illustre concrètement cet écart pour un Call européen :
      </p>
      <CallValueChart />

      {/* ══════════════════════════════════════════════════════════════
          Section 2 — P&L Delta-neutre
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="pnl-delta-neutre" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        2. Le P&amp;L d&apos;un portefeuille Delta-Neutre
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Pour isoler la relation Theta-Gamma, on construit un portefeuille Delta-neutre.
        On part du développement de la valeur de l&apos;option donné par le lemme d&apos;Itô :
      </p>

      <BlockMath>{'dV = \\Theta\\,dt + \\Delta\\,dS_t + \\frac{1}{2}\\sigma^2 S_t^2 \\Gamma\\,dt'}</BlockMath>

      <p className="text-gray-600 leading-relaxed mt-6 mb-3">
        <strong>Étape 1</strong> — On construit le portefeuille{' '}
        <InlineMath>{'\\Pi = V - \\Delta S_t'}</InlineMath>, soit une position longue sur l&apos;option
        couverte par une position courte sur{' '}
        <InlineMath>{'\\Delta'}</InlineMath> unités du sous-jacent, on est alors delta-neutre (ou delta-hedgé). Sa variation infinitésimale est :
      </p>

      <BlockMath>{'d\\Pi = dV - \\Delta\\,dS_t'}</BlockMath>

      <p className="text-gray-600 leading-relaxed mt-4 mb-3">
        <strong>Étape 2</strong> — On substitue l&apos;expression de <InlineMath>{'dV'}</InlineMath> :
      </p>

      <BlockMath>{'d\\Pi = \\Theta\\,dt + \\Delta\\,dS_t + \\frac{1}{2}\\sigma^2 S_t^2 \\Gamma\\,dt - \\Delta\\,dS_t'}</BlockMath>

      <p className="text-gray-600 leading-relaxed mt-4 mb-3">
        <strong>Étape 3</strong> — Le terme stochastique{' '}
        <InlineMath>{'\\Delta\\,dS_t'}</InlineMath> s&apos;annule exactement, c&apos;est le principe du delta-hedging.
        Effectivement, le but c'était qu'il ne reste que des termes déterministes :
      </p>

      <div className="bg-gray-50 border border-gray-300 rounded-xl px-8 py-6 mb-8 text-center">
        <BlockMath>{'d\\Pi = \\left(\\Theta + \\frac{1}{2}\\sigma^2 S_t^2\\,\\Gamma\\right)dt'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        Un portefeuille Delta-neutre est très localement
        <strong> sans risque</strong>. Son P&L sur un intervalle <InlineMath>{'dt'}</InlineMath> dépend
        uniquement de <InlineMath>{'\\Theta'}</InlineMath> (le passage du temps) et de{' '}
        <InlineMath>{'\\Gamma'}</InlineMath> (la courbure du prix par rapport à <InlineMath>{'S'}</InlineMath>).
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 3 — Relation fondamentale
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="relation-fondamentale" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        3. La relation fondamentale : Theta contre Gamma
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Pour comprendre simplement, on va émettre l&apos;hypothèse que <InlineMath>{'r = 0'}</InlineMath>.
        En l&apos;absence de taux d&apos;intérêt, un portefeuille sans risque ne peut rapporter que 0 :
        l&apos;absence d&apos;arbitrage impose <InlineMath>{'d\\Pi = 0'}</InlineMath>. On obtient alors la relation
        fondamentale :
      </p>

      <div className="bg-gray-50 border border-gray-300 rounded-xl px-8 py-6 mb-8 text-center">
        <BlockMath>{'\\Theta = -\\frac{1}{2}\\sigma^2 S_t^2\\,\\Gamma'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        <strong>Theta et Gamma sont de signes opposés</strong> : une option longue a un Gamma positif
        et un Theta négatif. Une option courte a un Gamma négatif et un Theta positif.
        Cette opposition est au cœur du Gamma Scalping.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Gamma Scalping
        </p>
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Un opérateur long option paie un <strong>Theta négatif</strong> (il est short theta, il perd de l'argent à mesure que le temps avance), chaque jour la valeur
          temps se consume. En contrepartie, le <strong>Gamma positif</strong> (on dira qu'il est long Gamma) lui permet
          de rehedger profitablement : quand <InlineMath>{'S_t'}</InlineMath> monte, son Delta augmente
          (il vend du sous-jacent en haut) ; quand <InlineMath>{'S_t'}</InlineMath> baisse, son Delta
          diminue (il doit racheter en bas). Ce rehedgeage systématique{' '}
          <em>achat bas / vente haut</em> génère des flux positifs proportionnels à la volatilité réalisée.
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          La question centrale est donc : la volatilité réalisée va-t-elle compenser le Theta ?
        </p>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        En levant complètement l&apos;hypothèse <InlineMath>{'r = 0'}</InlineMath>, le portefeuille Delta-neutre
        doit rapporter le taux sans risque, ce qui introduit une condition d&apos;arbitrage précise.
        Notons <InlineMath>{'\\sigma_{\\text{réal}}'}</InlineMath> la volatilité effectivement réalisée par
        le marché et <InlineMath>{'\\sigma_{\\text{impl}}'}</InlineMath> la volatilité implicite à laquelle
        l&apos;option a été achetée :
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Condition d&apos;arbitrage Theta-Gamma
        </p>
        <ul className="text-gray-700 text-sm leading-relaxed space-y-2">
          <li>
            <InlineMath>{'\\sigma_{\\text{réal}} > \\sigma_{\\text{impl}}'}</InlineMath>
            {' '}→ le terme Gamma domine → <strong>P&L positif</strong> pour l&apos;acheteur d&apos;option.
          </li>
          <li>
            <InlineMath>{'\\sigma_{\\text{réal}} < \\sigma_{\\text{impl}}'}</InlineMath>
            {' '}→ le Theta domine → <strong>P&L négatif</strong> pour l&apos;acheteur (positif pour le vendeur).
          </li>
        </ul>
        <p className="text-gray-600 text-sm leading-relaxed mt-3">
          Acheter une option et delta-hedger revient à parier que la volatilité réalisée
          sera supérieure à la volatilité implicite payée. Vendre une option et delta-hedger,
          c&apos;est le pari inverse.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 4 — Anomalie
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="anomalie" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        4. L&apos;anomalie : un Theta positif avec un Gamma positif
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        La relation <InlineMath>{'\\Theta = -\\frac{1}{2}\\sigma^2 S_t^2\\,\\Gamma'}</InlineMath> laisse penser
        que Theta est toujours négatif quand Gamma est positif. Ce n&apos;est pas toujours vrai.
        L&apos;EDP de Black-Scholes complète (avec <InlineMath>{'r > 0'}</InlineMath>) s&apos;écrit :
      </p>

      <BlockMath>{'\\Theta + \\frac{1}{2}\\sigma^2 S_t^2\\,\\Gamma + rS_t\\Delta = rV'}</BlockMath>

      <p className="text-gray-600 leading-relaxed mt-4 mb-6">
        En isolant <InlineMath>{'\\Theta'}</InlineMath> :
      </p>

      <BlockMath>{'\\Theta = -\\frac{1}{2}\\sigma^2 S_t^2\\,\\Gamma + r\\left(V - S_t\\Delta\\right)'}</BlockMath>

      <p className="text-gray-600 leading-relaxed mt-4 mb-3">
        Appliquons ce résultat au <strong>Put Européen Deep In-The-Money</strong>. Dans cette configuration,
        l&apos;option est très profondément dans la monnaie : <InlineMath>{'S_t \\ll K'}</InlineMath>.
        Les approximations sont les suivantes :
      </p>

      <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed mb-4 space-y-1 pl-2">
        <li><InlineMath>{'V \\approx K e^{-r\\tau} - S_t'}</InlineMath> (principe d'un Put)</li>
        <li><InlineMath>{'\\Delta \\approx -1'}</InlineMath> (le Delta du Put converge vers -1 Deep-ITM)</li>
        <li><InlineMath>{'\\Gamma \\to 0'}</InlineMath> (la courbe du prix est presque linéaire, donc la courbure disparaît)</li>
      </ul>

      <p className="text-gray-600 leading-relaxed mb-3">
        <strong>Étape 1</strong> — Le terme Gamma est négligeable :
      </p>

      <BlockMath>{'-\\frac{1}{2}\\sigma^2 S_t^2\\,\\Gamma \\approx 0'}</BlockMath>

      <p className="text-gray-600 leading-relaxed mt-4 mb-3">
        <strong>Étape 2</strong> — On calcule <InlineMath>{'V - S_t\\Delta'}</InlineMath> :
      </p>

      <BlockMath>{'V - S_t\\Delta \\approx (K - S_t) - S_t \\cdot (-1) = K - S_t + S_t = K'}</BlockMath>

      <p className="text-gray-600 leading-relaxed mt-4 mb-3">
        <strong>Étape 3</strong> — On substitue dans la formule du Theta :
      </p>

      <BlockMath>{'\\Theta \\approx 0 + r \\cdot K'}</BlockMath>

      <p className="text-gray-600 leading-relaxed mt-4 mb-6">
        Ce qui donne le résultat :
      </p>

      <div className="bg-gray-50 border border-gray-300 rounded-xl px-8 py-6 mb-8 text-center">
        <BlockMath>{'\\Theta_{\\text{put deep-ITM}} \\approx rK > 0'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        Un Put Européen Deep-ITM a un Theta <strong>positif</strong>, alors même que son Gamma est 
        <strong>positif</strong> (quoique proche de zéro).
      </p>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
        <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-3">
          Attention
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Ce phénomène n&apos;existe que pour les options <strong>Européennes</strong>, qui ne peuvent être exercées qu&apos;à maturité. Une option Américaine
          le peut.
          L&apos;exercice immédiat élimine l&apos;anomalie.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Explication économique
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Le Put Deep-ITM donne le droit de vendre à <InlineMath>{'K'}</InlineMath> une action qui ne
          vaut presque plus rien. L&apos;acheteur est donc assis sur un cash futur de{' '}
          <InlineMath>{'K'}</InlineMath>. Or, à mesure que l&apos;échéance approche, ce cash futur
          subit <strong>moins d&apos;actualisation</strong>, sa valeur présente{' '}
          <InlineMath>{'Ke^{-r\\tau}'}</InlineMath> augmente quand <InlineMath>{'\\tau'}</InlineMath>{' '}
          diminue. L&apos;acheteur &quot;gagne&quot; le taux sans risque sur <InlineMath>{'K'}</InlineMath>
          au fil du temps, ce qui se traduit par un Theta positif.
        </p>
      </div>

      {/* ── Lien quiz ── */}
      <div className="mt-10 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-gray-700">
        Un quiz sur le Module 3 sera bientôt disponible.
      </div>

      {/* ── Navigation Précédent / Suivant ── */}
      <div className="flex justify-between mt-12 pt-6 border-t border-gray-300">
        <a href="/cours/module-3-grecques/grecques-second-ordre" className="text-blue-600 hover:underline text-sm">
          ← Quelques démonstrations
        </a>
        <a href="/cours/module-4-taux-credit/swaps-flux" className="text-blue-600 hover:underline text-sm">
          Swaps &amp; Flux →
        </a>
      </div>

    </article>
  );
}
