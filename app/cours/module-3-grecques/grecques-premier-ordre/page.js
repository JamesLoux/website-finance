// Page de cours : Module 3 — L'essentiel des Greeks

import Link from 'next/link';
import { InlineMath, BlockMath } from '../../../components/Math';
import GreeksChart from '../../components/GreeksChart';

export const metadata = {
  title: "L'essentiel des Greeks — Finance according to James",
  description:
    'Delta, Gamma, Vega, Theta, Rho — formules complètes avec dividende continu et visualisation interactive.',
};

export default function GreeksPremierOrdrePage() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12">

      {/* ── Fil d'Ariane ── */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/cours" className="hover:text-blue-600 transition-colors">Cours</Link>
        <span>/</span>
        <span className="text-gray-500">Module 3 — The Greeks</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">L&apos;essentiel des Greeks</span>
      </nav>

      {/* ── Titre ── */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
        L&apos;essentiel des Greeks
      </h1>

      {/* ── Introduction ── */}
      <p className="text-lg text-gray-600 leading-relaxed mb-4">
        Les <strong>Greeks</strong> sont les dérivées partielles du prix d&apos;une option par
        rapport à ses paramètres de marché. Ils mesurent la sensibilité du portefeuille à chaque
        source de risque. C'est vraiment la base du trading de dérivés.
      </p>
      <p className="text-gray-600 leading-relaxed mb-10">
        Cette page dérive les formules pour le modèle de Black-Scholes avec
        dividende continu <InlineMath>q</InlineMath> qui est le cadre le plus général.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 1 — Rappel : Prix du Call Black-Scholes
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="rappel-call" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-24">
        1. Rappel : Prix du Call Black-Scholes
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Avec un dividende continu <InlineMath>q</InlineMath>, la formule fermée du Call européen est :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center text-gray-900">
        <BlockMath>{'C = Se^{-q\\tau}\\mathcal{N}(d_1) - Ke^{-r\\tau}\\mathcal{N}(d_2)'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        Avec <InlineMath>{'\\tau = T - t'}</InlineMath> le temps restant à maturité, et :
      </p>

      <BlockMath>{'d_1 = \\frac{\\ln(S/K) + (r - q + \\tfrac{1}{2}\\sigma^2)\\tau}{\\sigma\\sqrt{\\tau}}, \\qquad d_2 = d_1 - \\sigma\\sqrt{\\tau}'}</BlockMath>

      {/* Deux boîtes bleues : N(x) et n(x) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 mb-6">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
            <InlineMath>{'\\mathcal{N}(x)'}</InlineMath> — fonction de répartition
          </p>
          <BlockMath>{'\\mathcal{N}(x) = \\mathbb{P}(Z \\leq x), \\quad Z \\sim \\mathcal{N}(0,1)'}</BlockMath>
          <p className="text-gray-600 text-sm leading-relaxed mt-2">
            Probabilité qu&apos;une variable normale standard soit inférieure à <InlineMath>x</InlineMath>.
            Valeurs clés : <InlineMath>{'\\mathcal{N}(0) = 0.5'}</InlineMath>,{' '}
            <InlineMath>{'\\mathcal{N}(+\\infty) = 1'}</InlineMath>.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
            <InlineMath>{'n(x)'}</InlineMath> — densité de probabilité
          </p>
          <BlockMath>{'n(x) = \\frac{1}{\\sqrt{2\\pi}}\\, e^{-x^2/2}'}</BlockMath>
          <p className="text-gray-600 text-sm leading-relaxed mt-2">
            La densité gaussienne standard, toujours positive, symétrique autour de 0.
            Propriété clé : <InlineMath>{"n'(x) = -x\\, n(x)"}</InlineMath>.
          </p>
        </div>
      </div>

      {/* Astuce Call → Put */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
        <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-3">
          Astuce pour passer du Call au Put
        </p>
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Pour obtenir le Greek (ou la formule du prix) d&apos;un Put depuis celui d&apos;un Call, remplacer{' '}
          <InlineMath>{'\\mathcal{N}(d_1)'}</InlineMath> par{' '}
          <InlineMath>{'-\\mathcal{N}(-d_1)'}</InlineMath> et{' '}
          <InlineMath>{'\\mathcal{N}(d_2)'}</InlineMath> par{' '}
          <InlineMath>{'-\\mathcal{N}(-d_2)'}</InlineMath>.
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Exemple :{' '}
          <InlineMath>{'\\Delta_{call} = e^{-q\\tau}\\mathcal{N}(d_1)'}</InlineMath>{' '}
          devient{' '}
          <InlineMath>{'\\Delta_{put} = -e^{-q\\tau}\\mathcal{N}(-d_1)'}</InlineMath>.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 2 — Tableau récapitulatif
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="tableau-greeks" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        2. Tableau récapitulatif des Greeks
      </h2>

      <p className="text-gray-600 leading-relaxed mb-5">
        Formules mathématiques pour le Call européen.
        Les Greeks identiques Call/Put sont signalés dans la colonne Note, c'est quand il n'y a pas de fonction de répartition dans la formule pour faire simple.
      </p>

      <div className="overflow-x-auto border border-gray-300 rounded-xl mb-6">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left font-semibold text-gray-700 w-28">Greek</th>
              <th className="px-3 py-3 text-left font-semibold text-gray-700 w-16">Symbole</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Formule (Call)</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 w-40">Note</th>
            </tr>
          </thead>
          <tbody>
            {/* Delta */}
            <tr>
              <td className="px-4 py-3 border-t border-gray-200 font-medium text-gray-800">Delta</td>
              <td className="px-3 py-3 border-t border-gray-200 text-gray-600">
                <InlineMath>{'\\ \\Delta'}</InlineMath>
              </td>
              <td className="px-4 py-3 border-t border-gray-200 text-gray-700">
                <InlineMath>{'e^{-q\\tau}\\mathcal{N}(d_1)'}</InlineMath>
              </td>
              <td className="px-4 py-3 border-t border-gray-200">
                <div className="flex items-center gap-3"><span className="text-gray-700"><InlineMath>{'\\dfrac{\\partial C}{\\partial S}'}</InlineMath></span></div>
              </td>
            </tr>
            {/* Gamma */}
            <tr className="bg-gray-50">
              <td className="px-4 py-3 border-t border-gray-200 font-medium text-gray-800">Gamma</td>
              <td className="px-3 py-3 border-t border-gray-200 text-gray-600">
                <InlineMath>{'\\ \\Gamma'}</InlineMath>
              </td>
              <td className="px-4 py-3 border-t border-gray-200 text-gray-700">
                <div className="flex items-center gap-3 flex-wrap">
                  <InlineMath>{'\\dfrac{e^{-q\\tau}\\, n(d_1)}{S\\sigma\\sqrt{\\tau}}'}</InlineMath>
                  <span className="text-gray-400 text-xs"><InlineMath>{'= \\dfrac{Ke^{-r\\tau}\\,n(d_2)}{S^2\\sigma\\sqrt{\\tau}}'}</InlineMath></span>
                </div>
              </td>
              <td className="px-4 py-3 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <span className="text-gray-700"><InlineMath>{'\\dfrac{\\partial^2 C}{\\partial S^2}'}</InlineMath></span>
                  <span className="text-gray-400 text-xs">identique Call et Put</span>
                </div>
              </td>
            </tr>
            {/* Vega */}
            <tr>
              <td className="px-4 py-3 border-t border-gray-200 font-medium text-gray-800">Vega</td>
              <td className="px-3 py-3 border-t border-gray-200 text-gray-600">
                <InlineMath>{'\\ \\mathcal{V}'}</InlineMath>
              </td>
              <td className="px-4 py-3 border-t border-gray-200 text-gray-700">
                <div className="flex items-center gap-3 flex-wrap">
                  <InlineMath>{'Se^{-q\\tau}\\,n(d_1)\\sqrt{\\tau}'}</InlineMath>
                  <span className="text-gray-400 text-xs"><InlineMath>{'= Ke^{-r\\tau}\\,n(d_2)\\sqrt{\\tau}'}</InlineMath></span>
                </div>
              </td>
              <td className="px-4 py-3 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <span className="text-gray-700"><InlineMath>{'\\dfrac{\\partial C}{\\partial \\sigma}'}</InlineMath></span>
                  <span className="text-gray-400 text-xs">identique Call et Put</span>
                </div>
              </td>
            </tr>
            {/* Theta */}
            <tr className="bg-gray-50">
              <td className="px-4 py-3 border-t border-gray-200 font-medium text-gray-800">Theta</td>
              <td className="px-3 py-3 border-t border-gray-200 text-gray-600">
                <InlineMath>{'\\ \\Theta'}</InlineMath>
              </td>
              <td className="px-4 py-3 border-t border-gray-200 text-gray-700">
                <div className="space-y-0.5 text-xs">
                  <div><InlineMath>{'-\\dfrac{Se^{-q\\tau}\\,n(d_1)\\,\\sigma}{2\\sqrt{\\tau}}'}</InlineMath></div>
                  <div><InlineMath>{'- rKe^{-r\\tau}\\mathcal{N}(d_2)'}</InlineMath></div>
                  <div><InlineMath>{'+ qSe^{-q\\tau}\\mathcal{N}(d_1)'}</InlineMath></div>
                </div>
              </td>
              <td className="px-4 py-3 border-t border-gray-200">
                <div className="text-gray-700"><InlineMath>{'\\dfrac{\\partial C}{\\partial \\tau}'}</InlineMath></div>
              </td>
            </tr>
            {/* Rho */}
            <tr>
              <td className="px-4 py-3 border-t border-gray-200 font-medium text-gray-800">Rho</td>
              <td className="px-3 py-3 border-t border-gray-200 text-gray-600">
                <InlineMath>{'\\ \\rho'}</InlineMath>
              </td>
              <td className="px-4 py-3 border-t border-gray-200 text-gray-700">
                <InlineMath>{'K\\tau\\, e^{-r\\tau}\\mathcal{N}(d_2)'}</InlineMath>
              </td>
              <td className="px-4 py-3 border-t border-gray-200">
                <div className="text-gray-700"><InlineMath>{'\\dfrac{\\partial C}{\\partial r}'}</InlineMath></div>
              </td>
            </tr>
            {/* Epsilon */}
            <tr className="bg-gray-50">
              <td className="px-4 py-3 border-t border-gray-200 font-medium text-gray-800">Epsilon</td>
              <td className="px-3 py-3 border-t border-gray-200 text-gray-600">
                <InlineMath>{'\\ \\varepsilon'}</InlineMath>
              </td>
              <td className="px-4 py-3 border-t border-gray-200 text-gray-700">
                <InlineMath>{'-S\\tau\\, e^{-q\\tau}\\mathcal{N}(d_1)'}</InlineMath>
              </td>
              <td className="px-4 py-3 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <span className="text-gray-700"><InlineMath>{'\\dfrac{\\partial C}{\\partial q}'}</InlineMath></span>
                </div>
              </td>
            </tr>
            {/* Vanna */}
            <tr>
              <td className="px-4 py-3 border-t border-gray-200 font-medium text-gray-800">Vanna</td>
              <td className="px-3 py-3 border-t border-gray-200 text-gray-400 text-xs">—</td>
              <td className="px-4 py-3 border-t border-gray-200 text-gray-700">
                <div className="flex items-center gap-3 flex-wrap">
                  <InlineMath>{'-e^{-q\\tau}\\,n(d_1)\\,\\dfrac{d_2}{\\sigma}'}</InlineMath>
                  <span className="text-gray-400 text-xs"><InlineMath>{'= -\\dfrac{\\mathcal{V}\\cdot d_2}{S\\sigma\\sqrt{\\tau}}'}</InlineMath></span>
                </div>
              </td>
              <td className="px-4 py-3 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <span className="text-gray-700"><InlineMath>{'\\dfrac{\\partial^2 C}{\\partial S\\, \\partial \\sigma}'}</InlineMath></span>
                  <span className="text-gray-400 text-xs">identique Call et Put</span>
                </div>
              </td>
            </tr>
            {/* Volga */}
            <tr className="bg-gray-50">
              <td className="px-4 py-3 border-t border-gray-200 font-medium text-gray-800">Volga / Vomma</td>
              <td className="px-3 py-3 border-t border-gray-200 text-gray-400 text-xs">—</td>
              <td className="px-4 py-3 border-t border-gray-200 text-gray-700">
                <div className="flex items-center gap-3 flex-wrap">
                  <InlineMath>{'Se^{-q\\tau}\\,n(d_1)\\sqrt{\\tau}\\,\\dfrac{d_1 d_2}{\\sigma}'}</InlineMath>
                  <span className="text-gray-400 text-xs"><InlineMath>{'= \\mathcal{V}\\cdot\\dfrac{d_1 d_2}{\\sigma}'}</InlineMath></span>
                </div>
              </td>
              <td className="px-4 py-3 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <span className="text-gray-700"><InlineMath>{'\\dfrac{\\partial^2 C}{\\partial \\sigma^2}'}</InlineMath></span>
                  <span className="text-gray-400 text-xs">identique Call et Put</span>
                </div>
              </td>
            </tr>
            {/* Charm */}
            <tr>
              <td className="px-4 py-3 border-t border-gray-200 font-medium text-gray-800">Charm</td>
              <td className="px-3 py-3 border-t border-gray-200 text-gray-400 text-xs">—</td>
              <td className="px-4 py-3 border-t border-gray-200 text-gray-700">
                <div className="space-y-0.5 text-xs">
                  <div><InlineMath>{'q\\,e^{-q\\tau}\\mathcal{N}(d_1)'}</InlineMath></div>
                  <div>
                    <InlineMath>{'-\\,e^{-q\\tau}\\,n(d_1)\\,\\dfrac{2(r-q)\\tau - d_2\\sigma\\sqrt{\\tau}}{2\\tau\\sigma\\sqrt{\\tau}}'}</InlineMath>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <span className="text-gray-700"><InlineMath>{'\\dfrac{\\partial^2 C}{\\partial S\\, \\partial \\tau}'}</InlineMath></span>
                  <span className="text-gray-400 text-xs">Décroissance du Delta dans le temps</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Boîte mnémotechnique */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4">
          Mnémotechnique : deux trios qui ne se mélangent jamais dans un même facteur.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white border border-blue-100 rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-800 mb-2">
              Trio S / q / d<sub>1</sub> — la "jambe action"
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              <InlineMath>S</InlineMath>,{' '}
              <InlineMath>{'e^{-q\\tau}'}</InlineMath> et{' '}
              <InlineMath>{'\\mathcal{N}(d_1)'}</InlineMath> ou{' '}
              <InlineMath>{'n(d_1)'}</InlineMath> apparaissent toujours ensemble.
              C&apos;est le terme lié à la position en sous-jacent.
            </p>
          </div>
          <div className="bg-white border border-blue-100 rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-800 mb-2">
              Trio K / r / d<sub>2</sub> — la "jambe strike"
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              <InlineMath>K</InlineMath>,{' '}
              <InlineMath>{'e^{-r\\tau}'}</InlineMath> et{' '}
              <InlineMath>{'\\mathcal{N}(d_2)'}</InlineMath> ou{' '}
              <InlineMath>{'n(d_2)'}</InlineMath> apparaissent toujours ensemble.
              C&apos;est le terme lié au paiement du strike actualisé.
            </p>
          </div>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed mt-4">
          Les équivalences de Gamma et Vega illustrent parfaitement cette symétrie : on peut
          toujours permuter <InlineMath>{'n(d_1)'}</InlineMath> et{' '}
          <InlineMath>{'n(d_2)'}</InlineMath> en changeant le facteur devant grâce à l&apos;identité{' '}
          <InlineMath>{'Se^{-q\\tau}\\,n(d_1) = Ke^{-r\\tau}\\,n(d_2)'}</InlineMath>.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 3 — Visualisation interactive
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="visualisation" className="text-2xl font-bold text-gray-900 mt-14 mb-4 scroll-mt-24">
        3. Visualisation interactive
      </h2>

      <p className="text-gray-600 leading-relaxed mb-2">
        Sélectionne un Greek pour observer l&apos;évolution de la sensibilité
        en fonction du prix du sous-jacent <InlineMath>S</InlineMath>.
        Le strike est fixé à <InlineMath>{'K = 100'}</InlineMath>.
      </p>

      <GreeksChart />

      {/* ── Lien simulateur ── */}
      <p className="text-gray-600 leading-relaxed mt-10 mb-8">
        Pour explorer les Greeks et leurs évolutions sur des paramètres précis et les combiner dans des stratégies call/put variées, rendez-vous sur le{' '}
        <Link href="/simulateur" className="text-blue-600 hover:underline">Simulateur de stratégies</Link>.
      </p>

      {/* ── Lien quiz ── */}
      <div className="mt-12 p-5 bg-gray-50 border border-gray-300 rounded-xl flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-800">Prêt à tester tes connaissances ?</p>
          <p className="text-sm text-gray-500 mt-0.5">Quiz sur le Module 3 — The Greeks</p>
        </div>
        <span className="shrink-0 bg-gray-200 text-gray-500 text-sm font-semibold px-5 py-2.5 rounded-lg cursor-default">
          Bientôt disponible
        </span>
      </div>

      {/* ── Navigation Précédent / Suivant ── */}
      <div className="mt-8 pt-8 border-t border-gray-300 flex items-center justify-between gap-4">

        {/* Précédent */}
        <Link
          href="/cours/module-2-pricing/modeles-diffusion"
          className="group w-1/2 flex flex-col items-start p-4 border border-gray-300 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all"
        >
          <span className="text-xs text-gray-400 mb-1">← Chapitre précédent</span>
          <span className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
            Modèles de diffusion
          </span>
        </Link>

        {/* Suivant */}
        <Link
          href="/cours/module-3-grecques/grecques-second-ordre"
          className="group w-1/2 flex flex-col items-end p-4 border border-gray-300 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all text-right"
        >
          <span className="text-xs text-gray-400 mb-1">Chapitre suivant →</span>
          <span className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
            Quelques démonstrations
          </span>
        </Link>

      </div>

    </article>
  );
}
