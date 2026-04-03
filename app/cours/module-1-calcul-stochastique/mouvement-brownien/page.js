// Page de cours : Module 1 — Mouvement Brownien
// Template de référence pour toutes les pages de cours

import Link from 'next/link';
import { InlineMath, BlockMath } from '../../../components/Math';
import BrownianMotionChart from '../../components/BrownianMotionChart';

export const metadata = {
  title: 'Mouvement Brownien — Finance according to James',
  description:
    'Définition, propriétés fondamentales et variation quadratique du Mouvement Brownien standard.',
};

export default function MouvementBrownienPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12">

      {/* ── Fil d'Ariane ── */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/cours" className="hover:text-blue-600 transition-colors">Cours</Link>
        <span>/</span>
        <span className="text-gray-500">Module 1 — Calcul stochastique</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">Mouvement Brownien</span>
      </nav>

      {/* ── Titre ── */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
        Le Mouvement Brownien
      </h1>

      {/* ── Introduction ── */}
      <p className="text-lg text-gray-600 leading-relaxed mb-4">
        En finance quantitative, le marché est soumis à un flux continu d&apos;informations qui
        génère un bruit erratique et imprévisible. Pour modéliser ce chaos, les mathématiciens
        ont emprunté un outil à la physique : le <strong>Mouvement Brownien</strong>.
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        Son nom vient du botaniste Robert Brown, qui observa en 1827 le déplacement erratique
        de particules de pollen dans l&apos;eau — se déplaçant dans une direction, puis une autre,
        sans mémoire de leur trajectoire passée. C&apos;est exactement ainsi que se comportent les
        chocs qui frappent un prix de marché.
      </p>
      <p className="text-gray-600 leading-relaxed mb-10">
        En finance, ce processus est noté{' '}
        <InlineMath>W_t</InlineMath> (pour <em>Wiener process</em>). C&apos;est la brique élémentaire de toute modélisation
        stochastique : une source d&apos;aléa pur, sans tendance, sans mémoire.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 1 — Définition et Propriétés Fondamentales
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="proprietes-fondamentales" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-24">
        1. Définition et Propriétés Fondamentales
      </h2>

      <p className="text-gray-600 leading-relaxed mb-8">
        Un processus stochastique <InlineMath>W_t</InlineMath> est un{' '}
        <strong>Mouvement Brownien standard</strong> s&apos;il vérifie les trois propriétés suivantes.
      </p>

      {/* Propriété 1 */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-5">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Propriété 1 — Point de départ certain
        </p>
        <BlockMath>W_0 = 0</BlockMath>
        <p className="text-gray-600 text-sm leading-relaxed mt-2">
          À l&apos;instant initial, il n&apos;y a aucune incertitude. Le processus part de zéro.
        </p>
      </div>

      {/* Propriété 2 */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-5">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Propriété 2 — Indépendance des incréments
        </p>
        <p className="text-gray-700 text-sm leading-relaxed mb-4">
          Pour tout instant <InlineMath>t</InlineMath> et tout{' '}
          <InlineMath>{'u > 0'}</InlineMath>, l&apos;incrément{' '}
          <InlineMath>W_{'{t+u}'} - W_t</InlineMath> est indépendant de toute
          l&apos;information passée (la &ldquo;filtration&rdquo; <InlineMath>{`\\mathcal{F}_t`}</InlineMath>).
        </p>
        <div className="bg-white border border-blue-100 rounded-lg p-4 text-sm text-gray-600 leading-relaxed">
          <strong className="text-gray-700">Interprétation financière :</strong> Cette propriété
          traduit l&apos;hypothèse d&apos;efficience faible des marchés. Le marché n&apos;a pas de mémoire :
          connaître la trajectoire passée d&apos;un prix ne donne aucune information sur les chocs
          futurs. C&apos;est la formalisation mathématique de l&apos;idée que &ldquo;les prix passés ne
          prédisent pas les prix futurs&rdquo;.
        </div>
      </div>

      {/* Propriété 3 */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Propriété 3 — Normalité des incréments
        </p>
        <p className="text-gray-700 text-sm leading-relaxed mb-2">
          Les variations du processus sur un intervalle de temps <InlineMath>u</InlineMath> suivent
          une loi normale centrée, de variance égale à cet intervalle :
        </p>
        <BlockMath>{`W_{t+u} - W_t \\sim \\mathcal{N}(0,\\, u)`}</BlockMath>
        <p className="text-gray-600 text-sm leading-relaxed mt-2 mb-4">
          Le bruit est symétrique — les chocs positifs et négatifs sont équiprobables. Et
          l&apos;incertitude croît avec la <strong>racine carrée du temps</strong>, pas avec le
          temps lui-même.
        </p>
        <div className="bg-white border border-blue-100 rounded-lg p-4 text-sm text-gray-600 leading-relaxed">
          <strong className="text-gray-700">Exemple concret :</strong> Si la volatilité annuelle
          d&apos;un actif est <InlineMath>{`\\sigma`}</InlineMath>, alors sur 1 an l&apos;écart-type des
          variations est <InlineMath>{`\\sigma\\sqrt{1} = \\sigma`}</InlineMath>. Sur 4 ans, il est{' '}
          <InlineMath>{`\\sigma\\sqrt{4} = 2\\sigma`}</InlineMath> (et non pas{' '}
          <InlineMath>{`4\\sigma`}</InlineMath>). C&apos;est pourquoi la volatilité se cite toujours en{' '}
          <em>annuelle</em>, et se rescale ensuite selon <InlineMath>{`\\sqrt{T}`}</InlineMath>.
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 2 — Variation Quadratique
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="variation-quadratique" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        2. La Variation Quadratique : la Propriété Clé
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        À l&apos;échelle infinitésimale, l&apos;incrément du Mouvement Brownien se note{' '}
        <InlineMath>dW_t</InlineMath>. De la troisième propriété, on déduit :
      </p>

      <BlockMath>{`\\mathbb{E}[dW_t] = 0 \\qquad \\text{et} \\qquad \\mathrm{Var}(dW_t) = dt`}</BlockMath>

      <p className="text-gray-600 leading-relaxed mb-6">
        Et si tu connais ta formule de la variance, tu comprends que de là découle le résultat le plus fondamental du calcul stochastique :
      </p>

      {/* Règle encadrée */}
      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-8 text-center text-gray-900">
        <BlockMath>{`(dW_t)^2 = dt`}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed">
        En calcul classique (Newton, Leibniz), les termes d&apos;ordre 2 comme{' '}
        <InlineMath>{`(dx)^2`}</InlineMath> tendent vers zéro plus vite que{' '}
        <InlineMath>dx</InlineMath>, et on les ignore sans remords. En calcul stochastique,
        ce n&apos;est plus le cas :{' '}
        <InlineMath>{`(dW_t)^2`}</InlineMath> ne disparaît pas — il converge vers{' '}
        <InlineMath>dt</InlineMath>, un terme du <strong>premier ordre</strong>.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 3 — Pourquoi c'est Fondamental
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="fondamental-pricing" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        3. Pourquoi c&apos;est Fondamental pour le Pricing
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Cette règle apparemment anodine a des conséquences profondes en finance. Lorsqu&apos;on
        applique le calcul différentiel classique à une fonction{' '}
        <InlineMath>{`f(W_t)`}</InlineMath> — par exemple, le prix d&apos;une option — on développe
        en série de Taylor. En calcul classique, on s&apos;arrête au premier ordre. En calcul
        stochastique, le terme du second ordre{' '}
        <InlineMath>{`\\tfrac{1}{2}f''(dW_t)^2`}</InlineMath> ne s&apos;annule pas, car{' '}
        <InlineMath>{`(dW_t)^2 = dt`}</InlineMath>.
      </p>

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 mb-6">
        <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-2">
          Conséquence directe
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          C&apos;est précisément l&apos;origine du <strong>Lemme d&apos;Itô</strong> — la règle de dérivation
          en chaîne du calcul stochastique, que l&apos;on verra dans le chapitre suivant.
        </p>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        Financièrement, ce terme de second ordre est la source de la{' '}
        <strong>convexité dans le prix des options</strong>. C&apos;est lui qui génère le{' '}
        <strong>Gamma</strong> — la dérivée seconde du prix par rapport au sous-jacent — dans
        l&apos;équation de Black-Scholes. Sans{' '}
        <InlineMath>{`(dW_t)^2 = dt`}</InlineMath>, les options n&apos;auraient pas de valeur temps,
        et le Gamma serait nul.
      </p>

      <div className="border-l-4 border-blue-400 pl-5 py-1 my-8">
        <p className="text-gray-700 italic leading-relaxed">
          En résumé : tout ce qui rend les options non-linéaires, tout ce qui crée de la
          convexité dans un portefeuille, remonte à cette seule règle.
        </p>
      </div>

      {/* ── Simulation interactive ── */}
      <BrownianMotionChart />

      {/* ── Lien quiz ── */}
      <div className="mt-12 p-5 bg-gray-50 border border-gray-300 rounded-xl flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-800">Prêt à tester tes connaissances ?</p>
          <p className="text-sm text-gray-500 mt-0.5">Quiz sur le Module 1 — Calcul stochastique</p>
        </div>
        <Link
          href="/quiz"
          className="shrink-0 bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
        >
          S&apos;entraîner →
        </Link>
      </div>

      {/* ── Navigation Précédent / Suivant ── */}
      <div className="mt-8 pt-8 border-t border-gray-300 flex items-center justify-between gap-4">
        {/* Précédent — vide sur la première page */}
        <div className="w-1/2" />

        {/* Suivant */}
        <Link
          href="/cours/module-1-calcul-stochastique/lemme-ito"
          className="group w-1/2 flex flex-col items-end p-4 border border-gray-300 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all text-right"
        >
          <span className="text-xs text-gray-400 mb-1">Chapitre suivant →</span>
          <span className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
            Le Lemme d&apos;Itô
          </span>
        </Link>
      </div>

    </article>
  );
}
