import Link from 'next/link'
import { InlineMath, BlockMath } from '../../../components/Math'

export const metadata = {
  title: 'Convertible Bond | Fixed Income II | Finance according to James',
}

export default function ConvertibleBond() {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">

      {/* Fil d'Ariane */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/cours" className="hover:underline">Cours</Link>
        <span className="mx-2">›</span>
        <Link href="/cours/module-5-fixed-income-2" className="hover:underline">Fixed Income II</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-700">Convertible Bond</span>
      </nav>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Convertible Bond
      </h1>
      <p className="text-gray-600 leading-relaxed mb-10">
        Une obligation convertible est un instrument hybride : c&apos;est une dette d&apos;entreprise
        classique à laquelle est attachée une option d&apos;achat sur les actions de cette entreprise.
        C&apos;est l&apos;un des produits les plus riches à analyser
        car il fait dialoguer trois sources de risque distinctes (les taux, le crédit et
        la volatilité action) dans un seul et même instrument.
      </p>

      {/* ── Section 1 ── */}
      <h2 id="decomposition" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        1. Décomposition et vocabulaire
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Si on décompose une convertible (CB), c&apos;est simplement :
      </p>
      <div className="bg-gray-100 px-8 py-6 rounded-xl my-6 text-center">
        <BlockMath>{'Prix_{CB} = \\text{Bond Floor} + \\text{Call}(K, T)'}</BlockMath>
      </div>
      <p className="text-gray-600 leading-relaxed mb-6">
        Voici quelques termes à savoir :
      </p>

      <div className="bg-gray-50 border border-gray-300 rounded-xl p-6 mb-6 space-y-4">
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-1">Ratio de Conversion (CR)</p>
          <p className="text-gray-600 text-sm">
            C'est une constante : le nombre fixe d&apos;actions obtenues en convertissant une obligation. Défini
            contractuellement à l&apos;émission et inscrit dans le prospectus.
          </p>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <p className="text-sm font-semibold text-gray-700 mb-1">Prix de Conversion (K)</p>
          <p className="text-gray-600 text-sm mb-2">
            Le strike implicite de l&apos;option Call. C&apos;est le prix constant auquel on &quot;achète&quot; l&apos;action
            en convertissant :
          </p>
          <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-center">
            <BlockMath>{'K = \\dfrac{\\text{Nominal}}{CR}'}</BlockMath>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <p className="text-sm font-semibold text-gray-700 mb-1">Bond Floor (Plancher Obligataire)</p>
          <p className="text-gray-600 text-sm">
            La valeur présente de tous les flux futurs (coupons + nominal), actualisée
            avec la courbe sans risque, avec le spread de crédit de l&apos;émetteur.
            C&apos;est ce que vaudrait l&apos;obligation si l&apos;option n&apos;existait pas.
          </p>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <p className="text-sm font-semibold text-gray-700 mb-1">Valeur de Parité (Parity)</p>
          <p className="text-gray-600 text-sm mb-2">
            La valeur si l&apos;on convertissait immédiatement (S est le spot de l&apos;action de l'entreprise émettrice) :
          </p>
          <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-center">
            <BlockMath>{'\\text{Parity} = CR \\times S'}</BlockMath>
          </div>
        </div>
      </div>

      {/* ── Section 2 ── */}
      <h2 id="trois-phases" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        2. Les trois zones d&apos;une convertible
      </h2>
      <p className="text-gray-600 leading-relaxed mb-6">
        Le comportement d&apos;une CB change radicalement selon la position du prix de l&apos;action
        par rapport au prix de conversion. On distingue trois zones, chacun avec ses
        propres Grecques et sa propre logique de trading.
      </p>

      <div className="space-y-4 mb-8">
        <div className="bg-gray-50 border border-gray-300 rounded-xl p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-1">
            Busted (action très basse)
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            L&apos;option Call est deep-OTM et ne vaut presque plus rien. Le prix de la CB
            s&apos;écrase sur son Bond Floor. Le Delta (sensibilité à l&apos;action) est proche de
            zéro. Le produit devient sensible uniquement aux taux et au risque de faillite
            de l&apos;émetteur. On le trade comme une obligation High Yield.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 mb-1">
            Hybride (action proche du prix de conversion)
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            C&apos;est la zone ou il y a beaucoup de volatilité. L&apos;option est ATM : le Gamma
            et le Vega sont à leur maximum. La CB réagit simultanément aux mouvements
            de l&apos;action, aux taux et à la volatilité implicite.
          </p>
        </div>
        <div className="bg-gray-50 border border-gray-300 rounded-xl p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-1">
            Equity-Bound (action très haute)
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            L&apos;option est deep-ITM. Le Bond Floor devient hors de propos. Le prix
            de la CB colle à la Parité, et le Delta tend vers 1. Si l&apos;action monte d&apos;1 €,
            la CB monte de <InlineMath>{'CR'}</InlineMath> €. On la trade comme l&apos;action elle-même.
          </p>
        </div>
      </div>

      {/* ── Section 3 ── */}
      <h2 id="premium" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        3. Le premium
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Ce qui est le plus intéressant n&apos;est ni le prix
        absolu de la CB ni la parité, mais l&apos;écart entre les deux : le premium de conversion.
      </p>
      <div className="bg-gray-100 px-8 py-6 rounded-xl my-6 text-center">
        <BlockMath>{'\\text{Premium} = \\dfrac{Prix_{CB} - \\text{Parity}}{\\text{Parity}}'}</BlockMath>
      </div>
      <p className="text-gray-600 leading-relaxed mb-6">
        Ce ratio exprime combien l&apos;investisseur paie en excès par rapport à la valeur
        immédiate de conversion. Un premium de 30% signifie que l&apos;action doit monter de
        30% avant que la conversion soit rentable.
      </p>

      <div className="flex flex-col xl:flex-row gap-4 mb-8">
        <div className="flex-1 bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
            Premium élevé (30–50%)
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            L'action est encore loin du prix de conversion (le Call est légèrement OTM). L'investisseur paie cher la protection obligataire :
            en cas de chute, le Bond Floor amortit la perte. Le Delta est faible, le Gamma aussi.
            Il faut une forte hausse de l'action pour que la conversion devienne intéressante.
          </p>
        </div>
        <div className="flex-1 bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
            Premium faible (5–15%)
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            La CB est proche de la parité. Delta et Gamma plutôt élevés. Le call de la CB est ITM.
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
          Le Break-even
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          Un deuxième indicateur clé est le break-even temporel : combien d&apos;années faut-il
          pour que le surcroît de coupon de la CB (par rapport au dividende de l&apos;action)
          compense le premium payé ? Un break-even de 3 ans sur une CB 5 ans est attractif ;
          un break-even de 7 ans sur une CB 5 ans signifie que l&apos;investisseur ne récupère
          jamais sa mise optionnelle.
        </p>

        <p className="text-gray-600 text-sm leading-relaxed">
          Exemple concret :
          L'action vaut 80 €, le prix de conversion K = 100 €. Tu achètes la CB à 110 € alors que la parité est 80 €. Tu paies donc 30 € de premium.
          Mais la CB te verse un coupon de 5% par an, alors que l'action ne verse qu'un dividende de 2% par an. Tu gagnes donc 3% par an en la tenant plutôt qu'en détenant l'action directement.
          Le break-even c'est : combien d'années à 3%/an pour récupérer les 30 € de premium ? Ici environ 3-4 ans.
        </p>
      </div>

      {/* ── Section 4 ── */}
      <h2 id="arbitrage" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        4. Arbitrage convertible
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Les CB sont souvent émises avec une décote sur l&apos;option : la volatilité implicite
        facturée dans le Call embarqué est moins chère que la volatilité de la même action
        sur le marché des options vanilles. Pourquoi ? Parce que les émetteurs de CB sont des entreprises qui ont besoin de se financer.
        Elles acceptent de vendre l'option bon marché pour obtenir un coupon plus bas sur leur dette.
        C'est un transfert structurel de valeur de l'émetteur vers l'investisseur. Et le fonds alternatif vient capter cet écart
        via
        une stratégie de delta-hedging.
      </p>

      <div className="bg-gray-50 border border-gray-300 rounded-xl p-6 mb-6 space-y-3">
        <p className="text-sm font-semibold text-gray-700">Construction de la position</p>
        <div className="flex items-start gap-3">
          <span className="text-blue-600 font-bold text-sm mt-0.5">①</span>
          <p className="text-gray-600 text-sm">
            <strong>Achat de la CB</strong> : position Long Gamma, Long Vega, Long Delta.
          </p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-blue-600 font-bold text-sm mt-0.5">②</span>
          <p className="text-gray-600 text-sm">
            <strong>Short de l&apos;action</strong> : pour neutraliser le Delta et rester insensible
            au sens du marché :
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-center">
          <BlockMath>{'N_{\\text{short}} = CR \\times \\Delta_{\\text{Call}}'}</BlockMath>
        </div>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        Une fois delta-neutre, le trader ne parie plus sur la direction de l&apos;action. Il
        récolte le Gamma : à chaque mouvement de marché, le Delta de la CB évolue, ce qui
        oblige à rééquilibrer la couverture.
      </p>

      <div className="flex flex-col xl:flex-row gap-4 mb-8">
        <div className="flex-1 bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
            Si l&apos;action monte
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Le Delta de la CB augmente. Le trader est &quot;trop long&quot;. Il vend davantage
            d&apos;actions (il vend haut).
          </p>
        </div>
        <div className="flex-1 bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
            Si l&apos;action baisse
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Le Delta de la CB baisse. Le trader est &quot;trop court&quot;. Il rachète des actions
            (il achète bas).
          </p>
        </div>
      </div>

      <p className="text-gray-600 leading-relaxed mb-10">
        Cet ajustement dynamique génère de petits profits constants à chaque mouvement,
        tant que la volatilité réalisée dépasse la volatilité implicite payée à l&apos;achat
        de la CB. C&apos;est exactement la logique du gamma scalping vue dans la page sur
        l&apos;arbitrage Theta-Gamma, appliquée ici à un sous-jacent hybride.
      </p>

      {/* ── Section 5 ── */}
      <h2 id="pieges" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        5. Les pièges réels du desk
      </h2>
      <p className="text-gray-600 leading-relaxed mb-6">
        La formule Bond + Call est un point de départ, pas un pricer. Sur un vrai desk,
        trois frictions peuvent détruire la rentabilité d&apos;une stratégie CB.
      </p>

      <div className="space-y-4 mb-8">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
            Le coût d&apos;emprunt (Borrow Rate)
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Pour shorter l&apos;action dans le cadre du delta-hedging, le trader doit emprunter
            les titres. Si l&apos;entreprise est petite ou en difficulté, l&apos;action est
            Hard-to-Borrow : le coût d&apos;emprunt peut atteindre 10 à 15% par an. Ce coût
            récurrent ronge les gains du gamma scalping.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
            Le risque dividende
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Le détenteur d&apos;une CB ne perçoit pas les dividendes en cash de l&apos;entreprise.
            Or, au détachement d&apos;un dividende, le prix de l&apos;action baisse,
            ce qui érode la valeur de l&apos;option Call de la CB (comme un call ou un forward vanille). Pour protéger l&apos;investisseur,
            les contrats incluent des clauses de Dividend Protection qui ajustent le
            Ratio de Conversion à la hausse pour compenser. Le quant doit modéliser le calendrier des dividendes anticipés.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-xl p-6">
          <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-2">
            La corrélation crédit-action
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            C&apos;est sûrement le plus important. Dans la décomposition Bond + Call, on traite
            implicitement le Bond Floor comme stable. Ce n&apos;est pas le cas en réalité il y a une corrélation : si l&apos;action
            s&apos;effondre, c&apos;est souvent parce que l&apos;entreprise va mal, ce qui fait exploser
            le spread de crédit et fait chuter le Bond Floor au même moment. Les deux
            jambes de la décomposition se détériorent ensemble, exactement quand on
            en a le plus besoin. Des modèles avancés (Tsiveriotis-Fernandes, approches
            structurelles à la Merton) cherchent à capturer cette corrélation endogène
            entre le prix de l&apos;action et le risque de défaut.
          </p>
        </div>
      </div>

      {/* ── Lien quiz ── */}
      <div className="mt-10 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-gray-700">
        Le quiz du Module 5 est disponible —{' '}
        <a href="/quiz/module-5" className="text-blue-600 hover:underline font-medium">S&apos;entraîner →</a>
      </div>

      {/* ── Navigation Précédent / Suivant ── */}
      <div className="flex justify-between mt-12 pt-6 border-t border-gray-300">
        <a href="/cours/module-5-fixed-income-2/cms" className="text-blue-600 hover:underline text-sm">
          ← CMS & Ajustement de Convexité
        </a>
        <a href="/cours/module-5-fixed-income-2/range-accrual" className="text-blue-600 hover:underline text-sm">
          Range Accrual →
        </a>
      </div>

    </article>
  )
}
