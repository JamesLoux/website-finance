// Page de cours : Module 3 — Quelques démonstrations

import Link from 'next/link';
import { InlineMath, BlockMath } from '../../../components/Math';

export const metadata = {
  title: 'Quelques démonstrations — Finance according to James',
  description:
    'Dérivation du Delta, du Gamma et du Vega à partir de la formule de Black-Scholes avec dividende continu.',
};

export default function GreeksSecondOrdrePage() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12">

      {/* ── Fil d'Ariane ── */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/cours" className="hover:text-blue-600 transition-colors">Cours</Link>
        <span>/</span>
        <span className="text-gray-500">Module 3 — The Greeks</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">Quelques démonstrations</span>
      </nav>

      {/* ── Titre ── */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
        Quelques démonstrations
      </h1>

      {/* ── Introduction ── */}
      <p className="text-lg text-gray-600 leading-relaxed mb-4">
        La page précédente a posé les formules des Greeks. Voici leur démonstration :
        Clique sur les titres du sommaire à droite pour accéder aux démonstrations qui t'intéressent.
      </p>
      <p className="text-gray-600 leading-relaxed mb-10">
        La difficulté technique commune aux calculs est que{' '}
        <InlineMath>{'d_1'}</InlineMath> et <InlineMath>{'d_2'}</InlineMath> dépendent aussi des paramètres alors qu'ils sont dans une fonction.
      </p>

      {/* ── Encadré À savoir ── */}
      <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 mb-10">
        <p className="text-blue-700 font-semibold mb-3">À savoir — Dérivée de fonction composée</p>
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Toutes les démonstrations de cette page reposent sur la dérivée de fonction composée.
          En général :
        </p>
        <BlockMath>{'\\frac{d}{dx}\\left[f(g(x))\\right] = f\'(g(x)) \\cdot g\'(x)'}</BlockMath>
        <p className="text-gray-700 text-sm leading-relaxed mt-3 mb-3">
          Appliqué à <InlineMath>{'N(d_1)'}</InlineMath> où <InlineMath>{'d_1'}</InlineMath> dépend de <InlineMath>{'x'}</InlineMath> :
        </p>
        <BlockMath>{'\\frac{\\partial}{\\partial x}\\left[N(d_1)\\right] = n(d_1) \\cdot \\frac{\\partial d_1}{\\partial x}'}</BlockMath>
        <p className="text-gray-600 text-sm leading-relaxed mt-3">
          où <InlineMath>{'n'}</InlineMath> est la densité de la loi normale standard (la dérivée de la fonction de répartition <InlineMath>{'N'}</InlineMath>),
          et <InlineMath>{'x'}</InlineMath> désigne le paramètre associé à la sensi (<InlineMath>{'S'}</InlineMath> ou{' '}
          <InlineMath>{'\\sigma'}</InlineMath> selon le Greek calculé).
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 1 — Delta
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="delta" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-24">
        1. Delta : ∂C/∂S
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        On repart de la formule du Call européen avec dividende continu :
      </p>

      <div className="bg-gray-50 border border-gray-300 rounded-xl px-8 py-6 mb-8 text-center">
        <BlockMath>{'C = S e^{-q\\tau} N(d_1) - K e^{-r\\tau} N(d_2)'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        L&apos;objectif est de calculer <InlineMath>{'\\partial C / \\partial S'}</InlineMath> sur les deux termes de la formule.
        On prend en compte le fait que <InlineMath>{'d_1'}</InlineMath> et{' '}
        <InlineMath>{'d_2'}</InlineMath> dépendent de <InlineMath>{'S'}</InlineMath>.
      </p>

      <p className="text-gray-600 leading-relaxed mb-3">
        <strong>Étape 1</strong> — Dériver le premier terme par rapport à <InlineMath>{'S'}</InlineMath> (avec <InlineMath>{'u\\prime v + u v\\prime'}</InlineMath>) :
      </p>

      <BlockMath>{'\\frac{\\partial}{\\partial S}\\left[S e^{-q\\tau} N(d_1)\\right] = e^{-q\\tau} N(d_1) + S e^{-q\\tau} n(d_1) \\frac{\\partial d_1}{\\partial S}'}</BlockMath>

      <p className="text-gray-600 leading-relaxed mt-4 mb-3">
        <strong>Étape 2</strong> — Dériver le second terme par rapport à <InlineMath>{'S'}</InlineMath> :
      </p>

      <BlockMath>{'\\frac{\\partial}{\\partial S}\\left[K e^{-r\\tau} N(d_2)\\right] = K e^{-r\\tau} n(d_2) \\frac{\\partial d_2}{\\partial S}'}</BlockMath>

      <p className="text-gray-600 leading-relaxed mt-4 mb-3">
        <strong>Étape 3</strong> — Calculer <InlineMath>{'\\partial d_1 / \\partial S'}</InlineMath> et{' '}
        <InlineMath>{'\\partial d_2 / \\partial S'}</InlineMath>. On isole le terme en <InlineMath>{'S'}</InlineMath> dans{' '}
        <InlineMath>{'d_1'}</InlineMath> :
      </p>

      <BlockMath>{'d_1 = \\frac{\\ln S - \\ln K + (r - q + \\frac{1}{2}\\sigma^2)\\tau}{\\sigma\\sqrt{\\tau}} = \\frac{\\ln S}{\\sigma\\sqrt{\\tau}} + \\frac{-\\ln K + (r - q + \\frac{1}{2}\\sigma^2)\\tau}{\\sigma\\sqrt{\\tau}}'}</BlockMath>

      <p className="text-gray-600 leading-relaxed mt-4 mb-3">
        Le second terme est une constante par rapport à <InlineMath>{'S'}</InlineMath>.
        La dérivée de <InlineMath>{'\\ln S / (\\sigma\\sqrt{\\tau})'}</InlineMath> par rapport à{' '}
        <InlineMath>{'S'}</InlineMath> vaut <InlineMath>{'1/(S\\sigma\\sqrt{\\tau})'}</InlineMath>, donc :
      </p>

      <BlockMath>{'\\frac{\\partial d_1}{\\partial S} = \\frac{1}{S\\sigma\\sqrt{\\tau}}'}</BlockMath>

      <p className="text-gray-600 leading-relaxed mt-4 mb-3">
        Même calcul pour <InlineMath>{'d_2 = d_1 - \\sigma\\sqrt{\\tau}'}</InlineMath>,
        la constante <InlineMath>{'\\sigma\\sqrt{\\tau}'}</InlineMath> disparaît à la dérivation :
      </p>

      <BlockMath>{'\\frac{\\partial d_2}{\\partial S} = \\frac{1}{S\\sigma\\sqrt{\\tau}}'}</BlockMath>

      <p className="text-gray-600 leading-relaxed mt-4 mb-3">
        <strong>Étape 4</strong> — Simplification : En assemblant les étapes 1, 2 et 3, on obtient :
      </p>

      <BlockMath>{'\\frac{\\partial C}{\\partial S} = e^{-q\\tau} N(d_1) + \\underbrace{S e^{-q\\tau} n(d_1) \\frac{1}{S\\sigma\\sqrt{\\tau}} - K e^{-r\\tau} n(d_2) \\frac{1}{S\\sigma\\sqrt{\\tau}}}_{\\text{termes en } n(\\cdot)}'}</BlockMath>

      <p className="text-gray-600 leading-relaxed mt-4 mb-4">
        Les deux termes en <InlineMath>{'n(\\cdot)'}</InlineMath> s&apos;annulent. Cela repose sur
        l&apos;identité fondamentale :
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Identité fondamentale
        </p>
        <BlockMath>{'S e^{-q\\tau} n(d_1) = K e^{-r\\tau} n(d_2)'}</BlockMath>
        <p className="text-gray-600 text-sm leading-relaxed mt-2">
          Elle se démontre en développant les densités gaussiennes et en utilisant la relation{' '}
          <InlineMath>{'d_1 - d_2 = \\sigma\\sqrt{\\tau}'}</InlineMath>. Les exponentielles et
          les carrés dans les gaussiennes se compensent exactement.
        </p>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        Les termes en <InlineMath>{'n(\\cdot)'}</InlineMath> s&apos;annulent mutuellement, et il reste :
      </p>

      <div className="bg-gray-50 border border-gray-300 rounded-xl px-8 py-6 mb-8 text-center">
        <BlockMath>{'\\Delta_{\\text{call}} = e^{-q\\tau} N(d_1)'}</BlockMath>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 2 — Gamma
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="gamma" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        2. Gamma : ∂²C/∂S²
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Le Gamma est la dérivée seconde du prix par rapport à <InlineMath>{'S'}</InlineMath>,
        soit <InlineMath>{'\\partial \\Delta / \\partial S'}</InlineMath>. On repart de
        la formule du Delta que l&apos;on vient d&apos;établir :
      </p>

      <div className="bg-gray-50 border border-gray-300 rounded-xl px-8 py-6 mb-8 text-center">
        <BlockMath>{'\\Delta = e^{-q\\tau} N(d_1)'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-3">
        <strong>Étape 1</strong> — Dériver <InlineMath>{'\\Delta'}</InlineMath> par rapport à{' '}
        <InlineMath>{'S'}</InlineMath>. La constante <InlineMath>{'e^{-q\\tau}'}</InlineMath> sort,
        et <InlineMath>{'N(d_1)'}</InlineMath> se dérive en <InlineMath>{'n(d_1)'}</InlineMath> par
        la règle des fonctions composées :
      </p>

      <BlockMath>{'\\frac{\\partial \\Delta}{\\partial S} = e^{-q\\tau} n(d_1) \\frac{\\partial d_1}{\\partial S}'}</BlockMath>

      <p className="text-gray-600 leading-relaxed mt-4 mb-3">
        <strong>Étape 2</strong> — On substitue <InlineMath>{'\\partial d_1 / \\partial S = 1/(S\\sigma\\sqrt{\\tau})'}</InlineMath>,
        calculé à l&apos;étape 3 de la section précédente :
      </p>

      <BlockMath>{'\\Gamma = e^{-q\\tau} n(d_1) \\cdot \\frac{1}{S\\sigma\\sqrt{\\tau}}'}</BlockMath>

      <p className="text-gray-600 leading-relaxed mt-4 mb-6">
        Ce qui donne directement le résultat :
      </p>

      <div className="bg-gray-50 border border-gray-300 rounded-xl px-8 py-6 mb-8 text-center">
        <BlockMath>{'\\Gamma = \\frac{e^{-q\\tau} n(d_1)}{S\\sigma\\sqrt{\\tau}}'}</BlockMath>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Gamma du Call = Gamma du Put
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          La parité Call-Put donne <InlineMath>{'\\Delta_{\\text{put}} = \\Delta_{\\text{call}} - e^{-q\\tau}'}</InlineMath>.
          La constante <InlineMath>{'e^{-q\\tau}'}</InlineMath> disparaît à la dérivation par rapport à{' '}
          <InlineMath>{'S'}</InlineMath>, donc les deux Gammas sont identiques :{' '}
          <InlineMath>{'\\Gamma_{\\text{put}} = \\Gamma_{\\text{call}}'}</InlineMath>.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 3 — Vega
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="vega" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        3. Vega : ∂C/∂σ
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Cette fois, <InlineMath>{'d_1'}</InlineMath> et <InlineMath>{'d_2'}</InlineMath> dépendent
        de <InlineMath>{'\\sigma'}</InlineMath>, et les deux termes en <InlineMath>{'n(\\cdot)'}</InlineMath> vont
        intervenir (contrairement au Delta où ils s&apos;annulaient). Ici, c&apos;est l&apos;identité
        fondamentale qui va permettre de les <em>factoriser</em>.
      </p>

      <p className="text-gray-600 leading-relaxed mb-3">
        <strong>Étape 1</strong> — Calculer{' '}
        <InlineMath>{'\\partial d_1 / \\partial \\sigma'}</InlineMath> et{' '}
        <InlineMath>{'\\partial d_2 / \\partial \\sigma'}</InlineMath>. On développe{' '}
        <InlineMath>{'d_1'}</InlineMath> en isolant les termes en <InlineMath>{'\\sigma'}</InlineMath> :
      </p>

      <BlockMath>{'d_1 = \\frac{\\ln(S/K) + (r-q)\\tau}{\\sigma\\sqrt{\\tau}} + \\frac{\\sigma\\sqrt{\\tau}}{2}'}</BlockMath>

      <p className="text-gray-600 leading-relaxed mt-4 mb-3">
        Le premier terme est en <InlineMath>{'1/\\sigma'}</InlineMath>, le second est en{' '}
        <InlineMath>{'\\sigma'}</InlineMath>. On dérive :
      </p>

      <BlockMath>{'\\frac{\\partial d_1}{\\partial \\sigma} = -\\frac{\\ln(S/K)+(r-q)\\tau}{\\sigma^2\\sqrt{\\tau}} + \\frac{\\sqrt{\\tau}}{2}'}</BlockMath>

      <p className="text-gray-600 leading-relaxed mt-4 mb-3">
        Même calcul pour <InlineMath>{'d_2 = d_1 - \\sigma\\sqrt{\\tau}'}</InlineMath>, on sait que seul le signe du
        second terme s&apos;inverse :
      </p>

      <BlockMath>{'\\frac{\\partial d_2}{\\partial \\sigma} = -\\frac{\\ln(S/K)+(r-q)\\tau}{\\sigma^2\\sqrt{\\tau}} - \\frac{\\sqrt{\\tau}}{2}'}</BlockMath>

      <p className="text-gray-600 leading-relaxed mt-4 mb-3">
        <strong>Étape 2</strong> — Dériver <InlineMath>{'C'}</InlineMath> par rapport à{' '}
        <InlineMath>{'\\sigma'}</InlineMath>. Les termes constants par rapport à{' '}
        <InlineMath>{'\\sigma'}</InlineMath> (les <InlineMath>{'N(\\cdot)'}</InlineMath> portant sur{' '}
        <InlineMath>{'S'}</InlineMath> et <InlineMath>{'K'}</InlineMath>) disparaissent, seules
        les dérivées des <InlineMath>{'N(d_i)'}</InlineMath> subsistent :
      </p>

      <BlockMath>{'\\frac{\\partial C}{\\partial \\sigma} = S e^{-q\\tau} n(d_1) \\frac{\\partial d_1}{\\partial \\sigma} - K e^{-r\\tau} n(d_2) \\frac{\\partial d_2}{\\partial \\sigma}'}</BlockMath>

      <p className="text-gray-600 leading-relaxed mt-4 mb-3">
        <strong>Étape 3</strong> — Simplification : On réutilise l&apos;identité fondamentale{' '}
        <InlineMath>{'S e^{-q\\tau} n(d_1) = K e^{-r\\tau} n(d_2)'}</InlineMath> que l'on a vu dans les démos précédentes, ce qui
        permet de factoriser :
      </p>

      <BlockMath>{'\\frac{\\partial C}{\\partial \\sigma} = S e^{-q\\tau} n(d_1) \\left(\\frac{\\partial d_1}{\\partial \\sigma} - \\frac{\\partial d_2}{\\partial \\sigma}\\right)'}</BlockMath>

      <p className="text-gray-600 leading-relaxed mt-4 mb-3">
        <strong>Étape 4</strong> — La différence des dérivées. Les termes en{' '}
        <InlineMath>{'1/\\sigma^2'}</InlineMath> s&apos;annulent, il reste :
      </p>

      <BlockMath>{'\\frac{\\partial d_1}{\\partial \\sigma} - \\frac{\\partial d_2}{\\partial \\sigma} = \\frac{\\sqrt{\\tau}}{2} - \\left(-\\frac{\\sqrt{\\tau}}{2}\\right) = \\sqrt{\\tau}'}</BlockMath>

      <p className="text-gray-600 leading-relaxed mt-4 mb-6">
        On substitue et on obtient le résultat :
      </p>

      <div className="bg-gray-50 border border-gray-300 rounded-xl px-8 py-6 mb-8 text-center">
        <BlockMath>{'\\mathcal{V}_{\\text{call}} = S e^{-q\\tau} n(d_1) \\sqrt{\\tau}'}</BlockMath>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Vega du Call = Vega du Put
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          La parité Call-Put s&apos;écrit{' '}
          <InlineMath>{'C - P = S e^{-q\\tau} - K e^{-r\\tau}'}</InlineMath> et ne
          dépend pas de <InlineMath>{'\\sigma'}</InlineMath>, alors sa dérivée par rapport à{' '}
          <InlineMath>{'\\sigma'}</InlineMath> est nulle :{' '}
          <InlineMath>{'\\mathcal{V}_{\\text{call}} - \\mathcal{V}_{\\text{put}} = 0'}</InlineMath>,
          et donc <InlineMath>{'\\mathcal{V}_{\\text{put}} = \\mathcal{V}_{\\text{call}}'}</InlineMath>.
        </p>
      </div>

      {/* ── Lien quiz ── */}
      <div className="mt-10 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-gray-700">
        Un quiz sur le Module 3 sera bientôt disponible.
      </div>

      {/* ── Navigation Précédent / Suivant ── */}
      <div className="flex justify-between mt-12 pt-6 border-t border-gray-300">
        <a href="/cours/module-3-grecques/grecques-premier-ordre" className="text-blue-600 hover:underline text-sm">
          ← L&apos;essentiel des Greeks
        </a>
        <a href="/cours/module-3-grecques/arbitrage-theta-gamma" className="text-blue-600 hover:underline text-sm">
          Arbitrage Theta-Gamma →
        </a>
      </div>

    </article>
  );
}
