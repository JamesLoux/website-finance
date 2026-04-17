import Link from 'next/link';
import { InlineMath, BlockMath } from '../../../components/Math';
import VannaWrapper from './VannaWrapper';
import StickyStrikeWrapper from './StickyStrikeWrapper';
import StickyDeltaWrapper from './StickyDeltaWrapper';
import StickySkewWrapper from './StickySkewWrapper';

export const metadata = {
  title: 'Skew Delta | Module 6 — Volatilité',
  description: 'Delta total, effet Vanna et régimes de volatilité : Sticky Strike, Sticky Delta, Sticky Skew.',
};

export default function SkewDelta() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12">

      {/* ── Fil d'Ariane ── */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/cours" className="hover:text-blue-600 transition-colors">Cours</Link>
        <span>/</span>
        <Link href="/cours/module-6-volatilite" className="hover:text-blue-600 transition-colors">Module 6 — Volatilité</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Skew Delta</span>
      </nav>

      {/* ── Titre ── */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
        Skew Delta
      </h1>

      {/* ── Introduction ── */}
      <p className="text-lg text-gray-600 leading-relaxed mb-4">
        La formule de Black-Scholes donne un Delta "naïf" <InlineMath>{'\\Delta_{BS} = \\frac{\\partial C}{\\partial S}'}</InlineMath>, calculé sous l&apos;hypothèse que la volatilité implicite est une constante. Dans la réalité, lorsque le sous-jacent <InlineMath>{'S'}</InlineMath> bouge, la nappe de volatilité bouge avec lui.
        C&apos;est ce qu&apos;on observe sur les marchés actions à cause du skew.
      </p>
      <p className="text-gray-600 leading-relaxed mb-10">
        Pour un market maker qui souhaite être véritablement couvert (car je rappelle que c&apos;est le delta qui indique la quantité d&apos;actif pour se couvrir), il est impératif de prendre en compte cette dynamique croisée. C&apos;est l&apos;objet du <strong>Delta Total</strong>, dont la correction par rapport au Delta BS pur s&apos;appelle le <strong>Skew Delta</strong>.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 1 — Delta Total
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="delta-total" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-24">
        1. Delta Total
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        D&apos;après la règle de dérivation totale, la véritable sensibilité du prix d&apos;une option aux variations du sous-jacent intègre l&apos;effet direct du spot, plus l&apos;effet indirect induit par le changement de volatilité consécutif à ce mouvement :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center text-gray-900">
        <BlockMath>{'\\Delta_{total} = \\frac{dC}{dS} = \\frac{\\partial C}{\\partial S} + \\frac{\\partial C}{\\partial \\sigma} \\cdot \\frac{\\partial \\sigma}{\\partial S}'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        En remplaçant avec les grecs, on obtient l&apos;équation du Delta Total :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center text-gray-900">
        <BlockMath>{'\\Delta_{total} = \\Delta_{BS} + \\mathcal{V} \\cdot \\frac{\\partial \\sigma}{\\partial S}'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-8">
        Le terme additionnel <InlineMath>{'\\mathcal{V} \\cdot \\frac{\\partial \\sigma}{\\partial S}'}</InlineMath> est le <strong>Skew Delta</strong>.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-5">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Le lien avec le Vanna
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Le Vanna est le grec de second ordre défini par <InlineMath>{'\\text{Vanna} = \\frac{\\partial \\Delta}{\\partial \\sigma} = \\frac{\\partial \\mathcal{V}}{\\partial S}'}</InlineMath> (voir{' '}
          <a href="/cours/module-3-grecques/grecques-premier-ordre" className="text-blue-600 hover:underline">L&apos;essentiel des Greeks</a>).
          Il est ici fantomatique. Le Skew Delta force le modèle à ajuster la couverture directionnelle en anticipant que si le spot baisse, la volatilité va monter.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 2 — Démonstration
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="demonstration" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        2. Démonstration : la relation Spot-Vol
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Pour appliquer la formule du Delta Total, il faut une expression de <InlineMath>{'\\frac{\\partial \\sigma}{\\partial S}'}</InlineMath>. On suppose que la volatilité implicite est une fonction de la moneyness ajustée :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center text-gray-900">
        <BlockMath>{'\\sigma(S, K) = \\Sigma\\!\\left( \\frac{K}{S^\\alpha} \\right)'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-8">
        où <InlineMath>{'\\Sigma'}</InlineMath> est la forme du smile et <InlineMath>{'\\alpha'}</InlineMath> un paramètre définissant le régime de marché. On pose <InlineMath>{'x = K \\cdot S^{-\\alpha}'}</InlineMath>.
      </p>

      <p className="text-gray-600 leading-relaxed mb-2">
        <strong>Étape 1 — sensibilité au spot :</strong>
      </p>
      <div className="bg-gray-50 border border-gray-300 rounded-xl p-4 my-4">
        <BlockMath>{'\\frac{\\partial \\sigma}{\\partial S} = \\frac{\\partial \\Sigma(x)}{\\partial x} \\cdot \\frac{\\partial x}{\\partial S} = \\Sigma\'(x) \\cdot \\left(-\\frac{\\alpha}{S} \\cdot K \\cdot S^{-\\alpha}\\right)'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-2">
        <strong>Étape 2 — sensibilité au strike (skew observable) :</strong>
      </p>
      <div className="bg-gray-50 border border-gray-300 rounded-xl p-4 my-4">
        <BlockMath>{'\\frac{\\partial \\sigma}{\\partial K} = \\frac{\\partial \\Sigma(x)}{\\partial x} \\cdot \\frac{\\partial x}{\\partial K} = \\Sigma\'(x) \\cdot S^{-\\alpha} \\quad \\implies \\quad \\Sigma\'(x) = \\frac{\\partial \\sigma}{\\partial K} \\cdot S^\\alpha'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-2">
        <strong>Étape 3 — substitution :</strong> on réinjecte <InlineMath>{"\\Sigma'(x)"}</InlineMath> dans l&apos;étape 1 :
      </p>
      <div className="bg-gray-50 border border-gray-300 rounded-xl p-4 my-4">
        <BlockMath>{'\\frac{\\partial \\sigma}{\\partial S} = -\\frac{\\alpha}{S} \\cdot K \\cdot S^{-\\alpha} \\cdot \\frac{\\partial \\sigma}{\\partial K} \\cdot S^\\alpha = -\\alpha \\cdot \\frac{K}{S} \\cdot \\frac{\\partial \\sigma}{\\partial K}'}</BlockMath>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Interprétation
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          La variation de volatilité par rapport au spot est égale à <InlineMath>{'- \\alpha'}</InlineMath> fois le skew de marché <InlineMath>{'\\frac{\\partial \\sigma}{\\partial K}'}</InlineMath>, ajusté par le ratio de moneyness <InlineMath>{'K/S'}</InlineMath>.
        </p>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        En substituant dans l&apos;équation du Delta Total, le Skew Delta s&apos;écrit formellement :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center text-gray-900">
        <BlockMath>{'\\text{Skew Delta} = -\\alpha \\cdot \\mathcal{V} \\cdot \\frac{K}{S} \\cdot \\frac{\\partial \\sigma}{\\partial K}'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-10">
        En pratique, les traders utilisent souvent l&apos;approximation <InlineMath>{'-\\alpha \\cdot \\mathcal{V} \\cdot \\frac{\\partial \\sigma}{\\partial K}'}</InlineMath>, car on évalue généralement near-ATM où <InlineMath>{'K \\approx S'}</InlineMath> et donc <InlineMath>{'K/S \\approx 1'}</InlineMath>.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 3 — Paradoxe Vanna
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="paradoxe-vanna" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        3. Comprendre le Vanna
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Il est fréquent de confondre la valeur d&apos;une option et sa sensibilité directionnelle. Face à une baisse du spot et explosion de la volatilité, deux effets opposés s&apos;exercent simultanément sur une option. Ici on va prendre le cas d'un Put acheté at-the-money qui rentre dans la monnaie.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">L&apos;effet Vega — le P&amp;L gagnant</p>
          <p className="text-gray-700 text-sm leading-relaxed">
            Acheter une option vous rend long Vega. Si la volatilité implicite explose, la prime de risque explose avec elle. La courbe entière du prix de votre Put se soulève : le choc de volatilité vous enrichit, indépendamment du mouvement du spot.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">L&apos;effet Vanna — l&apos;aplatissement du Delta</p>
          <p className="text-gray-700 text-sm leading-relaxed">
            Le Vanna <InlineMath>{'\\left(\\frac{\\partial \\Delta}{\\partial \\sigma}\\right)'}</InlineMath> mesure à quel point le Delta se déforme quand la volatilité monte. Une volatilité extrême &ldquo;noie&rdquo; la valeur intrinsèque : même si l&apos;option est dans la monnaie, le marché anticipe qu&apos;elle peut en ressortir. Le Delta s&apos;écarte de <InlineMath>{'-1'}</InlineMath> et remonte vers <InlineMath>{'-0{,}5'}</InlineMath>.
          </p>
        </div>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        Ces deux effets sont liés. Le Delta est la pente de la courbe de prix en fonction du spot. Lors du krach, toute la courbe s&apos;est soulevée (Vega), mais elle s&apos;est aussi aplatie (Vanna). Le Put vaut beaucoup plus cher, mais il est devenu moins réactif aux petits mouvements de spot, ce qui modifie la stratégie de couverture.
      </p>

      <p className="text-gray-600 leading-relaxed mb-6">
        Le simulateur ci-dessous illustre ce mécanisme. Augmentez la volatilité : observez que le prix monte (courbe du haut qui se soulève) pendant que le Delta s&apos;aplatit (courbe du bas qui remonte vers zéro).
      </p>

      <VannaWrapper />

      <p className="text-gray-600 leading-relaxed mb-6">
        Le Skew Delta est là pour corriger cette effet Vanna dans le delta de couverture en prenant en compte cette hausse de vol.
        En réalité le trader a un book en Vega neutre, mais toujours avec du résidus à court ou long terme. Ce skew delta utilise ce résidus pour ajuster le delta de couverture.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 4 — Sticky Strike
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="sticky-strike" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        4. Sticky Strike (<InlineMath>{'\\alpha = 0'}</InlineMath>)
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        <strong>Principe :</strong> la volatilité implicite d&apos;un strike fixe ne bouge pas quand le spot bouge. Formellement : <InlineMath>{'\\frac{\\partial \\sigma(K, T)}{\\partial S} = 0'}</InlineMath>. Le smile reste immobile dans l&apos;espace des strikes absolus.
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        Avec <InlineMath>{'\\alpha = 0'}</InlineMath>, le Skew Delta est nul : <InlineMath>{'\\Delta_{total} = \\Delta_{BS}'}</InlineMath>. Le Delta de Black-Scholes suffit.
      </p>

      <StickyStrikeWrapper />

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-2">
          Limite
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          En cas de krach soudain (gap baissier), ce régime suppose que les options conservent leur ancienne volatilité. La nappe ne se déforme pas, ce qui crée des opportunités d&apos;arbitrage massives dans les systèmes de pricing.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 5 — Sticky Delta
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="sticky-delta" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        5. Sticky Delta (<InlineMath>{'\\alpha = 1'}</InlineMath>)
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        <strong>Principe :</strong> le smile glisse horizontalement pour suivre exactement le mouvement du spot. La volatilité est une fonction de la moneyness relative <InlineMath>{'K/S'}</InlineMath>, pas du strike absolu. Formellement : <InlineMath>{'\\frac{\\partial \\sigma(K/S, T)}{\\partial S} = 0'}</InlineMath>.
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        Avec <InlineMath>{'\\alpha = 1'}</InlineMath>, le Skew Delta devient :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center text-gray-900">
        <BlockMath>{'\\text{Skew Delta} = -\\mathcal{V} \\cdot \\frac{K}{S} \\cdot \\frac{\\partial \\sigma}{\\partial K}'}</BlockMath>
      </div>

      <StickyDeltaWrapper />

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-2">
          Limite
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Ce régime ignore la panique baissière. Si un indice perd 10%, la volatilité ATM reste la même qu&apos;avant la chute. En réalité, un krach s&apos;accompagne d&apos;une hausse de la vol absolue, que ce régime ne capture pas.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 6 — Sticky Skew
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="sticky-skew" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        6. Sticky Skew
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Cette dynamique est un compromis entre Sticky Strike (vol ATM réactive) et Sticky Delta (forme du smile préservée). C'est sûrement la plus utilisée en salle des marchés.
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        Quand le spot baisse, la vol ATM monte en suivant la courbe de vol fixe comme en Sticky Strike. Mais la forme du smile (convexité ET skew relatif) reste identique et translate avec le spot.
        Résultat : les options avec un strike sur l&apos;upside (au dessus du spot) voient leur volatilité augmenter, tandis que sur le downside (au dessous du spot) la vol diminue par rapport au smile initial.
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        Quand le spot monte, c'est évidemment l'inverse : la vol ATM baisse, mais les options de l'upside voient leur vol baisser, tandis que celles du downside voient leur vol monter par rapport au smile initial.
      </p>
      
      

      <StickySkewWrapper />

      {/* ══════════════════════════════════════════════════════════════
          Synthèse
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="synthese" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        Synthèse
      </h2>

      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border border-gray-300 rounded-xl overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-gray-700 border-b border-gray-300">Régime</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700 border-b border-gray-300"><InlineMath>{'\\alpha'}</InlineMath></th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700 border-b border-gray-300">Dynamique</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700 border-b border-gray-300">Limite principale</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="bg-white">
              <td className="px-4 py-3 font-medium text-gray-900">Sticky Strike</td>
              <td className="px-4 py-3 text-gray-700"><InlineMath>{'0'}</InlineMath></td>
              <td className="px-4 py-3 text-gray-600">Smile figé dans l&apos;espace des strikes absolus</td>
              <td className="px-4 py-3 text-gray-600">Arbitrages en cas de krach</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-900">Sticky Delta</td>
              <td className="px-4 py-3 text-gray-700"><InlineMath>{'1'}</InlineMath></td>
              <td className="px-4 py-3 text-gray-600">Smile suit le spot en moneyness relative</td>
              <td className="px-4 py-3 text-gray-600">Ignore la hausse de vol absolue en krach</td>
            </tr>
            <tr className="bg-white">
              <td className="px-4 py-3 font-medium text-gray-900">Sticky Skew</td>
              <td className="px-4 py-3 text-gray-700"><InlineMath>{'0 < \\alpha < 1'}</InlineMath></td>
              <td className="px-4 py-3 text-gray-600">Smile de translate le long de la courbe initiale, conserve sa convexité</td>
              <td className="px-4 py-3 text-gray-600">Sûrement que la vol est sous-estimée dans le downside en cas de krach</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── Lien quiz ── */}
      <div className="mt-10 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-gray-700">
        Le quiz du Module 6 est disponible — <a href="/quiz/module-6" className="text-blue-600 hover:underline font-medium">S&apos;entraîner →</a>
      </div>

      {/* ── Navigation Précédent / Suivant ── */}
      <div className="flex justify-between mt-12 pt-6 border-t border-gray-300">
        <a href="/cours/module-6-volatilite/variance-swap-vix" className="text-blue-600 hover:underline text-sm">
          ← Variance Swap &amp; VIX
        </a>
        <div />
      </div>

    </article>
  );
}
