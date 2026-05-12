import { InlineMath, BlockMath } from '../../../components/Math'
import Link from 'next/link'

export const metadata = {
  title: 'Swaps d\'Inflation — Module 6 | Finance according to James',
  description: 'ZCIS, point mort d\'inflation, arbitrage Bond vs Swap et Deflation Floor.',
}

export default function InflationSwapPage() {
  return (
    <article className="px-6 py-12 max-w-3xl">

      {/* ── Fil d'Ariane ── */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/cours" className="hover:text-blue-600">Cours</Link>
        <span className="mx-2">›</span>
        <Link href="/cours/module-6-fixed-income-3" className="hover:text-blue-600">Fixed Income III</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-900">Swaps d&apos;Inflation</span>
      </nav>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Inflation Swap
      </h1>
      <p className="text-gray-600 leading-relaxed mb-12">
        L&apos;inflation érode la valeur de la monnaie. Pour s&apos;en protéger (ou pour spéculer sur la
        hausse des prix), le marché utilise deux grands instruments : les obligations indexées
        (cash) et les swaps d&apos;inflation (dérivés). Cette page couvre les deux, comme si on était sur un desk inflation.
      </p>

      {/* ══════════════════════════════════════════
          Section 1 — ZCIS et indices
      ══════════════════════════════════════════ */}
      <h2 id="zcis" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        1. ZCIS et indices
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Le <strong className="text-gray-900">Zero-Coupon Inflation Swap (ZCIS)</strong> est le contrat
        standard du marché des dérivés d&apos;inflation. Il oppose deux contreparties sur une unique
        date d&apos;échéance, sans aucun flux intermédiaire.
      </p>

      <div className="bg-gray-100 px-8 py-6 rounded-xl my-6 text-center">
        <BlockMath>{'\\text{Payoff} = N \\times \\left[\\left(1 + K\\right)^T - \\frac{I_T}{I_0}\\right]'}</BlockMath>
        <p className="text-sm text-gray-500 mt-3">
          Le payeur du fixe verse <InlineMath>{'(1+K)^T'}</InlineMath> et reçoit la croissance exacte de l&apos;indice.
        </p>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        <InlineMath>{'I_0'}</InlineMath> et <InlineMath>{'I_T'}</InlineMath> désignent la valeur
        de l&apos;indice des prix à la date de départ et à l&apos;échéance. Le swap est à somme nulle à
        l&apos;initiation : si le taux fixe <InlineMath>{'K'}</InlineMath> est correctement calibré,
        aucune prime n&apos;est échangée.
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        Les indices de référence sont définis contractuellement et font l&apos;objet d&apos;une grande
        rigueur :
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-2">Zone Euro</p>
          <p className="text-gray-900 font-semibold text-sm mb-1">HICPxT</p>
          <p className="text-gray-600 text-sm">
            Harmonized Index of Consumer Prices ex-Tobacco. Le tabac est exclu car ses prix
            sont dictés par la fiscalité étatique, pas par l&apos;économie réelle.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-2">États-Unis</p>
          <p className="text-gray-900 font-semibold text-sm mb-1">CPI-U</p>
          <p className="text-gray-600 text-sm">
            Consumer Price Index for All Urban Consumers. Référence pour les TIPS
            (Treasury Inflation-Protected Securities).
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-2">Royaume-Uni</p>
          <p className="text-gray-900 font-semibold text-sm mb-1">RPI</p>
          <p className="text-gray-600 text-sm">
            Retail Price Index. Méthodologie différente du CPI britannique — historiquement
            plus élevé de 50 à 100 bps en régime normal.
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-8">
        <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-2">
          Variante : le YoY Swap (Year-on-Year)
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Contrairement au ZCIS, le <strong>Year-on-Year Inflation Swap</strong> prévoit des flux
          annuels : à chaque date, le payeur du fixe verse <InlineMath>{'K'}</InlineMath> et reçoit
          le taux d&apos;inflation de l&apos;année écoulée{' '}
          <InlineMath>{'I_{t_i}/I_{t_{i-1}} - 1'}</InlineMath>. Plus intuitif pour un trésorier
          d&apos;entreprise, il est néanmoins moins liquide que le ZCIS sur les marchés
          interbancaires. Il est courant au Royaume-Uni et pour les structurés retail.
        </p>
      </div>

      {/* ══════════════════════════════════════════
          Section 2 — Breakeven et Fisher
      ══════════════════════════════════════════ */}
      <h2 id="breakeven" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        2. L'équation de Fisher
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        L&apos;équation de Fisher dit que le taux nominal d&apos;une obligation est la somme du taux réel
        et de l&apos;inflation anticipée :
      </p>

      <div className="bg-gray-100 px-8 py-6 rounded-xl my-6 text-center">
        <BlockMath>{'(1 + r_{\\text{nominal}}) = (1 + r_{\\text{réel}}) \\times (1 + \\pi)'}</BlockMath>
        <p className="text-sm text-gray-500 mt-3">
          Pour des niveaux faibles, on simplifie en{' '}
          <InlineMath>{'r_{\\text{nominal}} \\approx r_{\\text{réel}} + \\pi'}</InlineMath>.
        </p>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        Sur le marché américain, ces trois grandeurs correspondent à trois instruments concrets :
      </p>

      <div className="space-y-3 mb-6">
        <div className="bg-gray-50 border border-gray-300 rounded-xl p-4">
          <p className="text-gray-900 font-semibold text-sm mb-1">Treasury → r_nominal</p>
          <p className="text-gray-600 text-sm">
            Une obligation du Trésor américain qui paye un coupon fixe en dollars. L&apos;inflation future est embarquée dedans sans être visible.
          </p>
        </div>
        <div className="bg-gray-50 border border-gray-300 rounded-xl p-4">
          <p className="text-gray-900 font-semibold text-sm mb-1">TIPS → r_réel</p>
          <p className="text-gray-600 text-sm">
            Une obligation indexée sur l&apos;inflation, qui paye un coupon fixe <em>au-dessus de l&apos;inflation</em>, garanti contractuellement par l&apos;État.
            Ce n&apos;est pas une anticipation, c&apos;est l'Etat américain qui promet dans le contrat qu'il paiera au dessus de l'inflation une fois qu'elle sera connue.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <p className="text-gray-900 font-semibold text-sm mb-1">
            Différence Treasury − TIPS → <InlineMath>{'\\pi'}</InlineMath> anticipé = Breakeven
          </p>
          <p className="text-gray-600 text-sm">
            Par exemple 4% − 1,5% = 2,5%. C&apos;est ce que les acheteurs du Treasury ont implicitement
            accepté comme inflation future pour trouver les deux instruments aussi attractifs l&apos;un
            que l&apos;autre. Une anticipation collective révélée par les prix de marché sur le taux du Treasury (pas une prévision
            de l&apos;État).
          </p>
        </div>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        En pratique, ce breakeven se lit de deux façons sur les marchés :
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 border border-gray-300 rounded-xl p-4">
          <p className="text-gray-900 font-semibold text-sm mb-1">Breakeven Bond</p>
          <p className="text-gray-600 text-sm">
            Différence de rendement entre une obligation nominale et une obligation indexée de même
            maturité (ex. Treasury 10 ans moins TIPS 10 ans).
          </p>
        </div>
        <div className="bg-gray-50 border border-gray-300 rounded-xl p-4">
          <p className="text-gray-900 font-semibold text-sm mb-1">Breakeven Swap</p>
          <p className="text-gray-600 text-sm">
            Taux fixe <InlineMath>{'K'}</InlineMath> du ZCIS. Joue exactement le même rôle que
            le breakeven bond : c&apos;est la valeur de <InlineMath>{'\\pi'}</InlineMath> que le marché
            des dérivés price aujourd&apos;hui. Il inclut en général une prime de liquidité supplémentaire
            par rapport au breakeven bond : si les deux divergent, il y a un Basis à exploiter
            (voir section 4).
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          Section 3 — Réalité du desk
      ══════════════════════════════════════════ */}
      <h2 id="desk" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        3. Particularités
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Pricer l&apos;inflation à court terme est un exercice de prévisionniste et de quant.
        Trois particularités structurelles rendent ce marché unique.
      </p>

      <div className="space-y-4 mb-6">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-2">
            Le lag (décalage de publication)
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            L&apos;inflation de mars n&apos;est publiée qu&apos;en avril. Les contrats utilisent donc un
            décalage standard de <strong>3 mois</strong> : pour un paiement en décembre, on
            observe l&apos;indice de septembre. Ce lag est contractuellement fixé et identique
            pour toutes les contreparties. À savoir pour le calcul du fixing exact.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-2">
            Gap risk à la publication
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            La publication mensuelle du CPI est un <strong>saut discontinu</strong> du marché.
            Il n&apos;existe pas de couverture continue possible dans les heures qui précèdent
            l&apos;annonce : le trader est exposé
            à un gap risk brut. Sa seule protection est d&apos;avoir un modèle macroéconomique
            plus précis que le consensus Bloomberg : à qui aura le meilleur prévisioniste dans sa banque.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-2">
            Saisonnalité et carry
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            L&apos;inflation est hautement cyclique. Les soldes de janvier font plonger l&apos;indice
            mensuel, créant un <strong>carry négatif</strong> pour celui qui est long inflation.
            À l&apos;inverse, la période juillet-septembre (tourisme, transport aérien) génère
            un <strong>carry très positif</strong>. Un trader d&apos;inflation intègre cette saisonnalité dans sa stratégie de trading.
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          Section 4 — Arbitrage Bond vs Swap
      ══════════════════════════════════════════ */}
      <h2 id="arbitrage" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        4. L&apos;arbitrage Bond vs Swap : capturer le Basis
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Dans un monde parfait, le breakeven déduit des obligations indexées devrait être
        strictement égal au taux fixe du ZCIS. En pratique, le swap est souvent plus cher que
        l&apos;obligation. Cet écart s&apos;appelle le <strong className="text-gray-900">Basis</strong>.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6">
        <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-2">
          Pourquoi le Basis existe-t-il ?
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Acheter un TIPS nécessite du cash (ou un financement via le marché
          du Repo). Entrer dans un ZCIS est gratuit au jour 1 (hors appels de marge). Le marché
          fait donc payer la <strong>liquidité du dérivé</strong> : accéder à l&apos;inflation
          sans immobiliser de capital a un prix, qui se reflète dans un taux fixe du swap
          structurellement supérieur au breakeven bond. C'est ce qu'on observait également entre le CDS et le Bond à la page précédente.
        </p>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        Un trader peut exploiter ce Basis en montant la structure suivante :
      </p>

      <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 mb-4">
        <ol className="space-y-3 text-sm text-gray-700">
          <li className="flex gap-3">
            <span className="text-blue-600 font-bold shrink-0">1.</span>
            <span>
              <strong>Achat du TIPS :</strong> le trader encaisse le taux réel
              garanti par l&apos;État plus la vraie inflation payée par l&apos;indexation du principal.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-600 font-bold shrink-0">2.</span>
            <span>
              <strong>Vente du ZCIS (position payeur inflation) :</strong> il paie la vraie
              inflation à sa contrepartie et encaisse le taux fixe du swap{' '}
              <InlineMath>{'K_{\\text{swap}}'}</InlineMath>.
            </span>
          </li>
        </ol>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        Les deux flux d&apos;inflation réelle s&apos;annulent. Le résultat net est :
      </p>

      <div className="bg-gray-100 px-8 py-6 rounded-xl my-6 text-center">
        <BlockMath>{'\\text{Gain net} = r_{\\text{réel}} + (K_{\\text{swap}} - \\pi_{\\text{breakeven bond}})'}</BlockMath>
        <p className="text-sm text-gray-500 mt-3">
          Le trader capture le taux réel plus le Basis ({' '}
          <InlineMath>{'K_{\\text{swap}} - \\pi_{\\text{bond}}'}</InlineMath>) et non un
          rendement absolu sur le taux nominal.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-8">
        <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-2">
          Ce que le Basis mesure vraiment
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Le Basis n&apos;est pas un free lunch. Il rémunère la complexité opérationnelle
          (Repo, custodian, ISDA), le risque de liquidité en cas de stress, et une option implicite logée dans l&apos;obligation
          que la structure d&apos;arbitrage permet de capturer.
        </p>
      </div>

      {/* ══════════════════════════════════════════
          Section 5 — Deflation Floor
      ══════════════════════════════════════════ */}
      <h2 id="deflation-floor" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        5. Le Deflation Floor
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        L&apos;arbitrage décrit ci-dessus cache une subtilité que la plupart des présentations
        ignorent. En achetant un TIPS, le trader bénéficie d&apos;une garantie étatique :
        si l&apos;inflation cumulée est négative, l&apos;État rembourse{' '}
        <strong className="text-gray-900">100% du capital initial</strong>, et non le principal
        indexé déflaté (qui serait inférieur à 100).
      </p>

      <div className="bg-gray-100 px-8 py-6 rounded-xl my-6 text-center">
        <BlockMath>{'\\text{Remboursement} = N \\times \\max\\!\\left(\\frac{I_T}{I_0},\\ 1\\right)'}</BlockMath>
        <p className="text-sm text-gray-500 mt-3">
          L&apos;obligation contient un <strong>Floor sur l&apos;inflation à 0%</strong>,
          une option plancher dans le contrat de l&apos;émetteur souverain.
        </p>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        Le ZCIS, lui, est purement linéaire : en cas de déflation, celui qui reçoit l&apos;inflation
        doit effectivement payer sa contrepartie. Il n&apos;y a pas de plancher.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 border border-gray-300 rounded-xl p-4">
          <p className="text-gray-900 font-semibold text-sm mb-2">TIPS (obligation)</p>
          <p className="text-gray-600 text-sm">
            Profil convexe : bénéficie de l&apos;inflation positive, est protégé en déflation.
            Le Deflation Floor a une valeur optionnelle réelle, donc d&apos;autant plus élevée que
            la volatilité de l&apos;inflation est grande et la maturité longue.
          </p>
        </div>
        <div className="bg-gray-50 border border-gray-300 rounded-xl p-4">
          <p className="text-gray-900 font-semibold text-sm mb-2">ZCIS (swap)</p>
          <p className="text-gray-600 text-sm">
            Profil strictement linéaire : exposition symétrique. En déflation profonde,
            la contrepartie qui reçoit l&apos;inflation est perdante sans aucun filet.
            Le swap ne contient aucune option implicite.
          </p>
        </div>
      </div>

      <div className="border border-amber-100 bg-amber-50 rounded-xl p-5 mb-6">
        <p className="text-amber-700 uppercase tracking-wide text-xs font-semibold mb-2">
          Conséquence pour l&apos;arbitrage
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Le trader qui monte le trade Bond vs Swap ne capture pas seulement le Basis.
          Il détient également le Deflation Floor de l&apos;obligation, qu&apos;il n&apos;a pas
          cédé dans le ZCIS. Cette option est reçue <strong>"gratuitement"</strong> dans
          la structure. Une partie de ce qu&apos;on appelle &ldquo;Basis&rdquo; est en réalité
          la prime d&apos;une option sur l&apos;inflation négative, logée dans l&apos;obligation
          et invisible dans le swap. Sur un marché stressé qui anticipe une déflation,
          cette option peut être intéressante et représenter plusieurs points de base de valeur.
        </p>
      </div>

      {/* ── Lien quiz ── */}
      <div className="mt-10 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-gray-700">
        Un quiz sur le Module 6 sera bientôt disponible.
      </div>

      {/* ── Navigation Précédent / Suivant ── */}
      <div className="flex justify-between mt-12 pt-6 border-t border-gray-300">
        <a href="/cours/module-6-fixed-income-3/cds" className="text-blue-600 hover:underline text-sm">
          ← Credit Default Swaps
        </a>
        <a href="/cours/module-6-fixed-income-3/trs" className="text-blue-600 hover:underline text-sm">
          Total Return Swap →
        </a>
      </div>

    </article>
  )
}
