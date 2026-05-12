import Link from 'next/link'
import { InlineMath, BlockMath } from '../../../components/Math'
import CDS01Wrapper from './CDS01Wrapper'

export const metadata = {
  title: 'Credit Default Swaps | Fixed Income III',
}

export default function CdsPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12">

      {/* ── Fil d'Ariane ── */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/cours" className="hover:text-blue-600 transition-colors">Cours</Link>
        <span>/</span>
        <span className="text-gray-500">Module 6 — Fixed Income III</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">Credit Default Swaps</span>
      </nav>

      {/* ── Titre ── */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
        Credit Default Swaps
      </h1>

      {/* ── Introduction ── */}
      <p className="text-lg text-gray-600 leading-relaxed mb-10">
        Le CDS sépare le risque de faillite d&apos;une entreprise
        de l&apos;obligation physique elle-même. Pendant longtemps, s&apos;exposer au risque de crédit
        d&apos;une entreprise imposait de trader son obligation. Le CDS permet de le faire sans y toucher.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 1 — Mécanique
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="mecanique" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-24">
        1. Mécanique
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Un CDS est un contrat dérivé qui fonctionne comme une assurance contre un événement
        de crédit : faillite, défaut de paiement ou restructuration. Le contrat oppose deux
        parties aux intérêts inverses.
      </p>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="bg-gray-50 border border-gray-300 rounded-xl p-6 flex-1">
          <p className="text-red-600 font-semibold mb-2">Acheteur de protection</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            <strong className="text-gray-800">Short crédit</strong> — parie contre l&apos;entreprise.
            Verse une prime régulière (le spread CDS) en échange d&apos;une couverture en cas de
            défaut. Profil <strong className="text-gray-800">Short bonds</strong>
          </p>
        </div>
        <div className="bg-gray-50 border border-gray-300 rounded-xl p-6 flex-1">
          <p className="text-green-700 font-semibold mb-2">Vendeur de protection</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            <strong className="text-gray-800">Long crédit</strong> — parie sur la survie.
            Encaisse la prime et s&apos;engage à compenser la perte en cas de défaut. Profil
            similaire à celui qui aurait acheté l&apos;obligation, mais sans la financer.
          </p>
        </div>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        Le CDS est livré en <strong className="text-gray-900">Cash Settlement</strong> :
        le vendeur verse simplement la différence entre le pair et la valeur résiduelle <InlineMath>R </InlineMath> de
        l&apos;obligation de l'entreprise après le défaut. Cette valeur résiduelle est donc en pourcentage et s&apos;appelle le <strong className="text-gray-900">Recovery Rate</strong>.
        On peut simplifier en disant que c'est la valeur de l'entreprise en vendant tout ce qu'elle possède après le défaut, exprimée en pourcentage de sa dette totale. Le dédommagement versé par le vendeur de protection est alors&nbsp;:
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center">
        <BlockMath>{'\\text{Dédommagement} = N \\times (1 - R)'}</BlockMath>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
        <p className="text-xs text-blue-600 uppercase tracking-wide font-semibold mb-3">
          Recovery Rate en pratique
        </p>
        <p className="text-gray-700 leading-relaxed text-sm">
          La valeur de <InlineMath>R</InlineMath> n&apos;est pas connue à l&apos;avance. Le marché utilise
          40&nbsp;% comme convention de pricing pour l&apos;Investment Grade, mais la valeur réalisée varie
          énormément selon le rang de la dette (senior secured vs subordinée) et le secteur.
          Lors du défaut de Lehman Brothers en 2008, le Recovery Rate constaté a été
          d&apos;environ 8&nbsp;%.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 2 — Pricing
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="pricing" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        2. Pricing
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Le spread d&apos;un CDS reflète directement la probabilité de défaut annuelle implicite <InlineMath>{'PD'}</InlineMath>
        du marché. La relation fondamentale est simple&nbsp;:
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center">
        <BlockMath>{'\\text{Spread}_{CDS} \\approx PD \\times (1 - R)'}</BlockMath>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6">
        <p className="text-xs text-blue-600 uppercase tracking-wide font-semibold mb-3">
          Probabilité de défaut implicite
        </p>
        <p className="text-gray-700 leading-relaxed text-sm">
          Cette relation permet de lire le marché directement. Un CDS qui se traite à
          200&nbsp;bps avec un Recovery Rate de 40&nbsp;% implique une probabilité de défaut
          annuelle de{' '}
          <InlineMath>{'PD = 200 / (1 - 0{,}40) \\approx 3{,}3\\%'}</InlineMath>.
          Bloomberg affiche cette probabilité en temps réel sur chaque émetteur.
        </p>
      </div>

      <p className="text-gray-500 text-sm italic leading-relaxed mb-6">
        La formule exacte introduit une Annuité (la somme actualisée des flux de prime
        futurs) au dénominateur&nbsp;:{' '}
        <InlineMath>{'\\text{Spread} = PD \\times (1-R) / \\text{Annuité}'}</InlineMath>.
        L&apos;approximation ci-dessus est valide pour des maturités courtes ou des spreads
        modérés.
      </p>

      <p className="text-gray-600 leading-relaxed mb-6">
        Pour fluidifier les échanges et rendre les contrats fongibles, le marché post-2009
        (réforme Big Bang ISDA) a imposé des coupons fixes. Deux niveaux&nbsp;:
      </p>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="bg-gray-50 border border-gray-300 rounded-xl p-6 flex-1 text-center">
          <p className="text-2xl font-bold text-gray-900 mb-1">100 bps</p>
          <p className="text-sm text-gray-600">Investment Grade</p>
          <p className="text-xs text-gray-400 mt-1">(émetteurs solides)</p>
        </div>
        <div className="bg-gray-50 border border-gray-300 rounded-xl p-6 flex-1 text-center">
          <p className="text-2xl font-bold text-gray-900 mb-1">500 bps</p>
          <p className="text-sm text-gray-600">High Yield</p>
          <p className="text-xs text-gray-400 mt-1">(émetteurs spéculatifs)</p>
        </div>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        Pour compenser l&apos;écart entre ce coupon standardisé et le vrai risque de l&apos;émetteur,
        un paiement cash s&apos;effectue à l&apos;initiation du contrat : le{' '}
        <strong className="text-gray-900">Paiement Upfront</strong>.
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center">
        <BlockMath>{'\\text{Upfront} = (\\text{Spread}_{CDS} - \\text{Coupon}) \\times \\text{Annuité} \\times N'}</BlockMath>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
        <p className="text-xs text-blue-600 uppercase tracking-wide font-semibold mb-3">
          Lecture de l&apos;upfront
        </p>
        <p className="text-gray-700 leading-relaxed text-sm">
          Si un CDS IG traite à 150&nbsp;bps alors que le coupon standardisé est de 100&nbsp;bps,
          l&apos;acheteur de protection verse un upfront positif (il paie 50&nbsp;bps d&apos;avance). Si le
          spread tombe à 60&nbsp;bps, c&apos;est le vendeur qui verse l&apos;upfront : il &ldquo;achète&rdquo; le droit
          de recevoir 100&nbsp;bps alors que le risque ne vaut que 60&nbsp;bps.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 3 — Indices
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="indices" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        3. Indices : iTraxx et CDX
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        En pratique, les traders opèrent massivement sur des indices de CDS plutôt que sur
        des noms individuels. Les fourchettes bid/ask y sont bien plus serrées, la liquidité
        est meilleure, et ils permettent d&apos;exprimer un view directionnel sur le crédit sans
        risque idiosyncratique (grace à la diversification).
      </p>

      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left px-4 py-3 text-gray-700 font-semibold">Indice</th>
              <th className="text-left px-4 py-3 text-gray-700 font-semibold">Univers</th>
              <th className="text-left px-4 py-3 text-gray-700 font-semibold">Composition</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="bg-white">
              <td className="px-4 py-3 font-medium text-gray-900">iTraxx Main</td>
              <td className="px-4 py-3 text-gray-600">Europe Investment Grade</td>
              <td className="px-4 py-3 text-gray-600">125 entités équipondérées</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-900">iTraxx Crossover</td>
              <td className="px-4 py-3 text-gray-600">Europe High Yield</td>
              <td className="px-4 py-3 text-gray-600">75 entités</td>
            </tr>
            <tr className="bg-white">
              <td className="px-4 py-3 font-medium text-gray-900">CDX IG</td>
              <td className="px-4 py-3 text-gray-600">Amérique du Nord IG</td>
              <td className="px-4 py-3 text-gray-600">125 entités équipondérées</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-900">CDX HY</td>
              <td className="px-4 py-3 text-gray-600">Amérique du Nord HY</td>
              <td className="px-4 py-3 text-gray-600">100 entités équipondérées</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        Ces indices se reconstituent tous les six mois (les &ldquo;séries&rdquo;), ce qui garantit
        que les entités restent représentatives du marché.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
        <p className="text-xs text-blue-600 uppercase tracking-wide font-semibold mb-3">
          Mécanique du défaut dans un indice
        </p>
        <p className="text-gray-700 leading-relaxed text-sm">
          Quand l&apos;une des 125 entreprises de l&apos;iTraxx Main fait défaut, l&apos;indice ne disparaît
          pas. L&apos;entité est retirée du panier&nbsp;: le vendeur de protection verse la perte sur
          cette fraction précise (1/125 du notionnel), et le contrat continue sur les 124
          entreprises restantes avec un notionnel proportionnellement réduit. L&apos;acheteur de
          protection continue de payer sa prime sur le notionnel résiduel.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 4 — CS01
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="cs01" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        4. CS01 et convexité négative
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        La sensibilité d&apos;un CDS au spread s&apos;appelle le <strong className="text-gray-900">CS01</strong>{' '}
        (Credit Spread 01) : le gain ou la perte pour un déplacement de 1 point de base du
        spread. Pour un acheteur de protection sur un contrat de notionnel{' '}
        <InlineMath>N</InlineMath> et de maturité <InlineMath>T</InlineMath>, le CS01 est
        approximativement&nbsp;:
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center">
        <BlockMath>{'CS01 \\approx N \\times T \\times 0{,}0001'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        Mais ce CS01 n&apos;est pas constant. Sa{' '}
        <strong className="text-gray-900">convexité est négative</strong>.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6">
        <p className="text-xs text-blue-600 uppercase tracking-wide font-semibold mb-3">
          Convexité négative
        </p>
        <p className="text-gray-700 leading-relaxed text-sm">
          Quand le spread d&apos;un émetteur augmente (quand l&apos;entreprise va mal) la probabilité
          qu&apos;elle survive pour payer ses prochaines primes diminue. Les flux futurs s&apos;effacent
          progressivement, et la sensibilité au changement de bps diminue à mesure que
          le risque augmente.
        </p>
      </div>

      <p className="mt-6 mb-4 text-gray-600 leading-relaxed">
        La courbe ci-dessous illustre cette décroissance : plus le spread s&apos;écarte,
        plus le CS01 s&apos;effondre.
      </p>
      <CDS01Wrapper />

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 mb-10">
        <p className="text-xs text-amber-600 uppercase tracking-wide font-semibold mb-3">
          Conséquence pour la couverture
        </p>
        <p className="text-gray-700 leading-relaxed text-sm">
          Un trader qui utilise des CDS pour couvrir un portefeuille obligataire doit
          recalibrer son ratio de couverture en permanence. Une couverture parfaite à
          100&nbsp;bps de spread devient sous-hedgée si le spread monte à 500&nbsp;bps. 
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 5 — Basis et tail risk
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="basis" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        5. CDS-Bond Basis et tail risk
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Le <strong className="text-gray-900">CDS-Bond Basis</strong> désigne l&apos;écart entre le
        spread de crédit d&apos;une obligation cash (le coupon) et le spread du CDS sur le même émetteur et
        la même maturité. En théorie, ces deux mesures du risque de crédit devraient être
        identiques. En pratique, elles divergent.
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center">
        <BlockMath>{'\\text{Basis} = \\text{Spread}_{CDS} - \\text{Spread}_{Bond}'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        Généralement le Basis est négative (l&apos;obligation paie plus que le CDS ne coûte annuellement), car le Bond est moins liquide et nécessite du capital pour être maintenu.
        Cette situation permet à des investisseurs de réaliser des profits via une
        stratégie d&apos;arbitrage qui : le{' '}
        <strong className="text-gray-900">Negative Basis Trade</strong>.
      </p>

      <div className="bg-gray-50 border border-gray-300 rounded-xl p-6 mb-6">
        <p className="font-semibold text-gray-900 mb-3">
          Le Negative Basis Trade — construction
        </p>
        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <span className="font-semibold text-gray-800">1.</span> Acheter l&apos;obligation
            physique (encaisse le coupon du bond)
          </p>
          <p>
            <span className="font-semibold text-gray-800">2.</span> Acheter la protection CDS
            sur le même émetteur (paie le spread CDS)
          </p>
          <p>
            <span className="font-semibold text-gray-800">3.</span> Financer l&apos;achat de
            l&apos;obligation via le marché Repo (cf. {' '}
            <a href="/cours/module-4-taux-credit/obligations-bases" className="text-blue-600 hover:underline">
              Obligations &amp; Bases
            </a>)
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 font-mono text-sm text-center mt-3">
          P&amp;L annuel ≈ Spread_Bond − Spread_CDS − Coût_Repo = |Basis| − Coût_Repo
        </div>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        L&apos;investisseur est théoriquement immunisé contre le défaut (la perte sur l&apos;obligation
        est compensée par le gain sur le CDS) tout en encaissant la Basis. En pratique, des
        frictions persistent&nbsp;: le risque de liquidité, le coût du Repo, et la qualité du
        collatéral livrable en cas de défaut.
      </p>

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 mb-10">
        <p className="text-xs text-amber-600 uppercase tracking-wide font-semibold mb-3">
          La VaR et le piège du tail risk
        </p>
        <p className="text-gray-700 leading-relaxed text-sm">
          Les banques mesurent le risque de leurs portefeuilles de dérivés de crédit via la
          VaR (Value at Risk). Mais la VaR est structurellement inadaptée aux CDS. Le défaut
          est un événement rare mais violent, un tail risk pur. Sur des horizons de 1
          ou 10&nbsp;jours, la VaR affiche souvent zéro pour un portefeuille de CDS vendeurs de
          protection, masquant une perte potentielle totale sur le notionnel.
        </p>
      </div>

      {/* ── Lien quiz ── */}
      <div className="mt-10 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-gray-700">
        Un quiz sur le Module 6 sera bientôt disponible.
      </div>

      {/* ── Navigation Précédent / Suivant ── */}
      <div className="flex justify-between mt-12 pt-6 border-t border-gray-300">
        <a href="/cours/module-6-fixed-income-3/fx-swap" className="text-blue-600 hover:underline text-sm">
          ← FX Swap et Cross-Currency Swap
        </a>
        <a href="/cours/module-6-fixed-income-3/inflation-swap" className="text-blue-600 hover:underline text-sm">
          Swaps d&apos;Inflation →
        </a>
      </div>

    </article>
  )
}
