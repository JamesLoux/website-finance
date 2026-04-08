// Page de cours : Module 2 — Formule de Black-Scholes

import Link from 'next/link';
import { InlineMath, BlockMath } from '../../../components/Math';

export const metadata = {
  title: 'Formule de Black-Scholes — Finance according to James',
  description:
    'Dérivation complète de la formule de Black-Scholes : de l\'espérance sous ℚ à N(d1) et N(d2) via Feynman-Kac.',
};

export default function Probabilitesd1d2Page() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12">

      {/* ── Fil d'Ariane ── */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/cours" className="hover:text-blue-600 transition-colors">Cours</Link>
        <span>/</span>
        <span className="text-gray-500">Module 2 — Pricing</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">Formule de Black-Scholes</span>
      </nav>

      {/* ── Titre ── */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
        La Formule de Black-Scholes
      </h1>

      {/* ── Introduction ── */}
      <p className="text-lg text-gray-600 leading-relaxed mb-4">
        L&apos;équation de Black-Scholes est une EDP. Sa solution fermée est {' '}
        <InlineMath>{'C = S_t N(d_1) - K e^{-r\\tau} N(d_2)'}</InlineMath> et n&apos;est pas
        évidente. Pour la retrouver proprement, on va quitter le monde des EDP et rejoindre
        le monde des probabilités : c&apos;est le théorème de <strong>Feynman-Kac</strong>.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 1 — Feynman-Kac
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="feynman-kac" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-24">
        1. Le pont mathématique : Feynman-Kac
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        L&apos;équation de Black-Scholes est une EDP parabolique et difficile à résoudre directement.
        Le théorème de <strong>Feynman-Kac</strong> établit un lien profond entre les EDP et les
        espérances stochastiques : la solution de l&apos;EDP peut s&apos;écrire comme une espérance
        conditionnelle sous la probabilité risque-neutre <InlineMath>{'\\mathbb{Q}'}</InlineMath>.
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        L&apos;EDP de Black-Scholes est :
      </p>

      <BlockMath>{`\\frac{\\partial V}{\\partial t} + r S_t \\frac{\\partial V}{\\partial S} + \\frac{1}{2}\\sigma^2 S_t^2 \\frac{\\partial^2 V}{\\partial S^2} = rV`}</BlockMath>

      <p className="text-gray-600 leading-relaxed mb-4">
        Feynman-Kac dit que la solution de cette EDP, avec condition terminale égale au payoff{' '}
        <InlineMath>{'V(S_T, T) = \\Phi(S_T)'}</InlineMath>, s&apos;écrit :
      </p>

      {/* Formule encadrée Feynman-Kac */}
      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-8 text-center text-gray-900">
        <BlockMath>{`V(S_t, t) = e^{-r(T-t)}\\, \\mathbb{E}^{\\mathbb{Q}}\\!\\left[\\Phi(S_T) \\,\\middle|\\, \\mathcal{F}_t\\right]`}</BlockMath>
      </div>

      <div className="border-l-4 border-blue-400 pl-5 py-1 my-8">
        <p className="text-gray-700 italic leading-relaxed">
          Pricer par réplication dynamique (Delta-Hedging) donne rigoureusement le même résultat
          que pricer par espérance sous <InlineMath>{'\\mathbb{Q}'}</InlineMath> (Girsanov). Feynman-Kac
          prouve l&apos;équivalence des deux approches.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 2 — Application au Call européen
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="call-europeen" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        2. Application au Call européen
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Pour un Call européen de strike <InlineMath>K</InlineMath> et maturité <InlineMath>T</InlineMath>,
        le payoff à l&apos;échéance est :
      </p>

      <BlockMath>{`\\Phi(S_T) = \\max(S_T - K,\\; 0)`}</BlockMath>

      <p className="text-gray-600 leading-relaxed mb-4">
        En appliquant Feynman-Kac, le prix du Call est :
      </p>

      {/* Formule encadrée du Call */}
      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center text-gray-900">
        <BlockMath>{`C(S_t, t) = e^{-r(T-t)}\\, \\mathbb{E}^{\\mathbb{Q}}\\!\\left[\\max(S_T - K,\\; 0) \\,\\middle|\\, \\mathcal{F}_t\\right]`}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        Il reste à calculer cette espérance. Sous <InlineMath>{'\\mathbb{Q}'}</InlineMath>,
        la dynamique du sous-jacent est un GBM avec drift <InlineMath>r</InlineMath> :
      </p>

      <BlockMath>{`dS_t = r S_t\\, dt + \\sigma S_t\\, dW_t^{\\mathbb{Q}}`}</BlockMath>

      <p className="text-gray-600 leading-relaxed mb-4">
        En intégrant (résultat du Lemme d&apos;Itô sur le GBM vu au chapitre <strong>Lemme d&apos;Itô</strong>), la loi de <InlineMath>{'S_T'}</InlineMath>
        est log-normale :
      </p>

      <BlockMath>{`S_T = S_t \\exp\\!\\left(\\left(r - \\tfrac{1}{2}\\sigma^2\\right)\\tau + \\sigma\\sqrt{\\tau}\\, Z\\right), \\quad Z \\sim \\mathcal{N}(0,1)`}</BlockMath>

      <p className="text-gray-600 leading-relaxed mb-10">
        où <InlineMath>{'\\tau = T - t'}</InlineMath> est le temps restant jusqu&apos;à la maturité.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 3 — Démonstration
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="demonstration" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        3. Démonstration : de l&apos;espérance à la formule
      </h2>

      <p className="text-gray-600 leading-relaxed mb-8">
        On pose <InlineMath>{'\\tau = T - t'}</InlineMath> et on développe l&apos;espérance comme
        une intégrale sur la loi de <InlineMath>Z</InlineMath>. La densité de la normale standard
        est <InlineMath>{'f(z) = \\frac{1}{\\sqrt{2\\pi}} e^{-z^2/2}'}</InlineMath>.
      </p>

      {/* Étape 3.1 */}
      <h3 className="text-lg font-bold text-gray-800 mt-10 mb-4">
        Étape 3.1 — Borne d&apos;intégration (condition d&apos;exercice)
      </h3>

      <p className="text-gray-600 leading-relaxed mb-4">
        L&apos;option est exercée si et seulement si <InlineMath>{'S_T > K'}</InlineMath>. En
        substituant l&apos;expression de <InlineMath>{'S_T'}</InlineMath> :
      </p>

      <BlockMath>{`S_t \\exp\\!\\left(\\left(r - \\tfrac{1}{2}\\sigma^2\\right)\\tau + \\sigma\\sqrt{\\tau}\\, Z\\right) > K`}</BlockMath>

      <p className="text-gray-600 leading-relaxed mb-4">
        On prend le logarithme des deux membres (strictement positifs) :
      </p>

      <BlockMath>{`\\left(r - \\tfrac{1}{2}\\sigma^2\\right)\\tau + \\sigma\\sqrt{\\tau}\\, Z > \\ln\\!\\left(\\frac{K}{S_t}\\right)`}</BlockMath>

      <p className="text-gray-600 leading-relaxed mb-4">
        On isole <InlineMath>Z</InlineMath> en soustrayant puis en divisant par <InlineMath>{'\\sigma\\sqrt{\\tau}'}</InlineMath> :
      </p>

      <BlockMath>{`Z > \\frac{\\ln(K/S_t) - (r - \\tfrac{1}{2}\\sigma^2)\\tau}{\\sigma\\sqrt{\\tau}} = -d_2`}</BlockMath>

      <p className="text-gray-600 leading-relaxed mb-4">
        La borne naturelle qui apparaît est <InlineMath>{'d_2'}</InlineMath> :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-5 mb-6 text-center text-gray-900">
        <BlockMath>{`d_2 = \\frac{\\ln(S_t/K) + (r - \\tfrac{1}{2}\\sigma^2)\\tau}{\\sigma\\sqrt{\\tau}}`}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-2">
        La condition d&apos;exercice <InlineMath>{'S_T > K'}</InlineMath> est donc équivalente à{' '}
        <InlineMath>{'Z > -d_2'}</InlineMath>.
      </p>

      {/* Étape 3.2 */}
      <h3 className="text-lg font-bold text-gray-800 mt-10 mb-4">
        Étape 3.2 — Scinder l&apos;intégrale
      </h3>

      <p className="text-gray-600 leading-relaxed mb-4">
        L&apos;espérance se réduit à une intégrale sur la région{' '}
        <InlineMath>{'Z > -d_2'}</InlineMath> (là où l&apos;option est dans la monnaie) :
      </p>

      <BlockMath>{`C = e^{-r\\tau}\\int_{-d_2}^{+\\infty} \\max(S_T(z) - K,\\;0)\\, f(z)\\, dz`}</BlockMath>

      <p className="text-gray-600 leading-relaxed mb-4">
        Sur cette région, <InlineMath>{'S_T > K'}</InlineMath> donc le max vaut{' '}
        <InlineMath>{'S_T(z) - K'}</InlineMath>. On sépare en deux blocs :
      </p>

      <BlockMath>{`C = e^{-r\\tau}\\underbrace{\\int_{-d_2}^{+\\infty} S_T(z)\\, f(z)\\, dz}_{\\text{Bloc A}} - e^{-r\\tau}\\underbrace{\\int_{-d_2}^{+\\infty} K\\, f(z)\\, dz}_{\\text{Bloc B}}`}</BlockMath>

      {/* Étape 3.3 */}
      <h3 className="text-lg font-bold text-gray-800 mt-10 mb-4">
        Étape 3.3 — Bloc B
      </h3>

      <p className="text-gray-600 leading-relaxed mb-4">
        Dans le Bloc B, <InlineMath>K</InlineMath> est une constante qui sort de l&apos;intégrale.
        Il reste l&apos;intégrale de la densité gaussienne :
      </p>

      <BlockMath>{`e^{-r\\tau}\\int_{-d_2}^{+\\infty} K\\, f(z)\\, dz = K e^{-r\\tau} \\cdot \\mathbb{P}(Z > -d_2)`}</BlockMath>

      <p className="text-gray-600 leading-relaxed mb-4">
        Par symétrie de la loi normale (la distribution est symétrique autour de 0) :
      </p>

      <BlockMath>{`\\mathbb{P}(Z > -d_2) = \\mathbb{P}(Z < d_2) = N(d_2)`}</BlockMath>

      <p className="text-gray-600 leading-relaxed mb-2">
        Conclusion :
      </p>

      <BlockMath>{`\\text{Bloc B} = K\\, e^{-r\\tau}\\, N(d_2)`}</BlockMath>

      {/* Étape 3.4 */}
      <h3 className="text-lg font-bold text-gray-800 mt-10 mb-4">
        Étape 3.4 — Bloc A
      </h3>

      <p className="text-gray-600 leading-relaxed mb-4">
        On substitue <InlineMath>{'S_T(z) = S_t \\exp\\bigl((r - \\tfrac{1}{2}\\sigma^2)\\tau + \\sigma\\sqrt{\\tau}\\,z\\bigr)'}</InlineMath>{' '}
        et la densité <InlineMath>{'f(z) = \\frac{1}{\\sqrt{2\\pi}} e^{-z^2/2}'}</InlineMath> :
      </p>

      <BlockMath>{`e^{-r\\tau}\\int_{-d_2}^{+\\infty} S_t\\, e^{(r-\\frac{1}{2}\\sigma^2)\\tau + \\sigma\\sqrt{\\tau}\\,z} \\cdot \\frac{1}{\\sqrt{2\\pi}} e^{-z^2/2}\\, dz`}</BlockMath>

      <p className="text-gray-600 leading-relaxed mb-4">
        On sort les constantes, les exponentielles se réunissent et <InlineMath>{'e^{-r\\tau} \\cdot e^{r\\tau}'}</InlineMath> se
        simplifie :
      </p>

      <BlockMath>{`S_t\\int_{-d_2}^{+\\infty} \\frac{1}{\\sqrt{2\\pi}}\\, e^{-\\frac{1}{2}\\sigma^2\\tau + \\sigma\\sqrt{\\tau}\\,z - z^2/2}\\, dz`}</BlockMath>

      <p className="text-gray-600 leading-relaxed mb-4">
        L&apos;exposant est <InlineMath>{'- \\tfrac{1}{2}\\sigma^2\\tau + \\sigma\\sqrt{\\tau}\\,z - \\tfrac{z^2}{2}'}</InlineMath>.
        On le réécrit en complétant le carré :
      </p>

      {/* Boîte astuce */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          L&apos;astuce mathématique : la complétion du carré
        </p>
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          On développe <InlineMath>{'(z - \\sigma\\sqrt{\\tau})^2'}</InlineMath> :
        </p>
        <BlockMath>{`(z - \\sigma\\sqrt{\\tau})^2 = z^2 - 2\\sigma\\sqrt{\\tau}\\,z + \\sigma^2\\tau`}</BlockMath>
        <p className="text-gray-700 text-sm leading-relaxed mt-3">
          Donc <InlineMath>{'- z^2/2 + \\sigma\\sqrt{\\tau}\\,z - \\frac{1}{2}\\sigma^2\\tau = -\\frac{1}{2}(z - \\sigma\\sqrt{\\tau})^2'}</InlineMath>.
          Les termes en <InlineMath>{'e^{\\pm\\frac{1}{2}\\sigma^2\\tau}'}</InlineMath> se sont annulés.
        </p>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        L&apos;intégrale devient :
      </p>

      <BlockMath>{`S_t\\int_{-d_2}^{+\\infty} \\frac{1}{\\sqrt{2\\pi}}\\, e^{-\\frac{1}{2}(z - \\sigma\\sqrt{\\tau})^2}\\, dz`}</BlockMath>

      <p className="text-gray-600 leading-relaxed mb-4">
        On effectue le changement de variable{' '}
        <InlineMath>{'u = z - \\sigma\\sqrt{\\tau}'}</InlineMath> (donc <InlineMath>{'du = dz'}</InlineMath>).
        Quand <InlineMath>{'z = -d_2'}</InlineMath>, la nouvelle borne est{' '}
        <InlineMath>{'u = -d_2 - \\sigma\\sqrt{\\tau} = -d_1'}</InlineMath>.
        On définit ainsi :
      </p>

      <BlockMath>{`d_1 = d_2 + \\sigma\\sqrt{\\tau}`}</BlockMath>

      <p className="text-gray-600 leading-relaxed mb-4">
        L&apos;intégrale devient une intégrale de la densité standard sur{' '}
        <InlineMath>{'[-d_1, +\\infty['}</InlineMath>, qui vaut (par symétrie)
        {' '}<InlineMath>{'N(d_1)'}</InlineMath> :
      </p>

      <BlockMath>{`\\text{Bloc A} = S_t \\int_{-d_1}^{+\\infty} \\frac{1}{\\sqrt{2\\pi}}\\, e^{-u^2/2}\\, du = S_t\\, N(d_1)`}</BlockMath>

      {/* Étape 3.5 */}
      <h3 className="text-lg font-bold text-gray-800 mt-10 mb-4">
        Étape 3.5 — Formule finale
      </h3>

      <p className="text-gray-600 leading-relaxed mb-4">
        En assemblant Bloc A et Bloc B :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center text-gray-900">
        <BlockMath>{`C = S_t\\, N(d_1) - K\\, e^{-r\\tau}\\, N(d_2)`}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        Avec les deux paramètres liés par :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-5 mb-8 text-center text-gray-900">
        <BlockMath>{`d_1 = d_2 + \\sigma\\sqrt{\\tau} = \\frac{\\ln(S_t/K) + (r + \\tfrac{1}{2}\\sigma^2)\\tau}{\\sigma\\sqrt{\\tau}}`}</BlockMath>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 4 — Interprétation financière
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="interpretation-financiere" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        4. Interprétation financière
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        La formule <InlineMath>{'C = S_t N(d_1) - K e^{-r\\tau} N(d_2)'}</InlineMath> se lit
        naturellement comme la différence entre deux termes ayant chacun une signification
        financière précise.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-4">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          N(d<sub>2</sub>) — Probabilité d&apos;exercice
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          <InlineMath>{'N(d_2)'}</InlineMath> est la probabilité risque-neutre que l&apos;option
          soit exercée à maturité : <InlineMath>{'\\mathbb{Q}(S_T > K)'}</InlineMath>. Le terme{' '}
          <InlineMath>{'K e^{-r\\tau} N(d_2)'}</InlineMath> est la valeur actuelle du paiement
          du strike ou la sortie de trésorerie conditionnelle à l&apos;exercice, actualisée au taux sans risque.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          N(d<sub>1</sub>) — Le Delta (Δ) du Call
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          <InlineMath>{'N(d_1)'}</InlineMath> est le <strong>Delta</strong> de l&apos;option Call :
          c&apos;est le nombre d&apos;actions à détenir pour répliquer l&apos;option
          (<InlineMath>{'\\partial C / \\partial S_t'}</InlineMath>). Le terme{' '}
          <InlineMath>{'S_t N(d_1)'}</InlineMath> est la valeur de cette position en actif risqué.
          N(d<sub>1</sub>) ≠ N(d<sub>2</sub>) car le Delta intègre la convexité de l&apos;option,
          l&apos;effet Gamma.
        </p>
      </div>

      <div className="border-l-4 border-blue-400 pl-5 py-1 my-8">
        <p className="text-gray-700 italic leading-relaxed">
          En résumé : le prix d&apos;un Call est la valeur de la position de couverture{' '}
          (<InlineMath>{'S_t N(d_1)'}</InlineMath>) moins le coût actualisé du strike à payer
          si l&apos;option est exercée (<InlineMath>{'K e^{-r\\tau} N(d_2)'}</InlineMath>).
        </p>
      </div>

      {/* ── Lien quiz ── */}
      <div className="mt-10 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-gray-700">
        Un quiz sur le Module 2 sera bientôt disponible.
      </div>

      {/* ── Navigation Précédent / Suivant ── */}
      <div className="flex justify-between mt-12 pt-6 border-t border-gray-300">
        <a href="/cours/module-2-pricing/equation-black-scholes" className="text-blue-600 hover:underline text-sm">
          ← Équation de Black-Scholes
        </a>
        <a href="/cours/module-2-pricing/modeles-diffusion" className="text-blue-600 hover:underline text-sm">
          Modèles de diffusion →
        </a>
      </div>

    </article>
  );
}
