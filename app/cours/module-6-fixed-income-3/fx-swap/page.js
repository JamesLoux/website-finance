import Link from 'next/link'
import { InlineMath, BlockMath } from '../../../components/Math'

export const metadata = {
  title: 'FX Swap et Cross-Currency Swap | Fixed Income III',
}

export default function FxSwapPage() {
  return (
    <article className="px-6 py-12 max-w-3xl">

      {/* Fil d'Ariane */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/cours" className="hover:underline">Cours</Link>
        {' › '}
        <span>Module 6 — Fixed Income III</span>
        {' › '}
        <span className="text-gray-700 font-medium">FX Swap et Cross-Currency Swap</span>
      </nav>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        FX Swap et Cross-Currency Swap
      </h1>

      <p className="text-gray-600 leading-relaxed mb-10">
        Le marché des changes est le plus grand marché
        de financement au monde. Lorsqu'un acteur a besoin de devises étrangères, il
        utilise ses devises domestiques comme garantie à travers deux instruments : le
        FX Swap pour le court terme, et le Cross-Currency Swap pour le long terme.
      </p>

      {/* ── Section 1 ── */}
      <h2 id="fx-swap" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        1. FX Swap
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Un FX Swap est un échange simultané de deux devises à deux dates de valeur
        différentes, sans aucun flux d'intérêt intermédiaire. Il combine une jambe
        au comptant (Spot / Nearleg) et une jambe à terme (Forward / Farleg).
      </p>

      <p className="text-gray-600 leading-relaxed mb-6">
        La différence de prix entre le Spot (EUR/USD par exemple) et le Forward s'exprime en 
        <strong className="text-gray-900"> points de swap (la cotation est en pips = F - S)</strong>.
        Le Forward est un calcul
        mathématique fondé sur le différentiel de taux d'intérêt entre les deux devises,
        la <strong className="text-gray-900">parité des taux couverte</strong>. Attention rappel : la devise de cotation est au dénominateur du spot et la devise de base est au numérateur du spot.
      </p>

      {/* Formule parité des taux */}
      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6">
        <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-3">
          Parité des taux couverte
        </p>
        <BlockMath>{'F = S \\times e^{(r_c - r_b) \\times T} = \\dfrac{EUR}{USD} \\times e^{(r_{usd} - r_{eur}) \\times T}'}</BlockMath>
        <p className="text-sm text-gray-500 mt-3">
          En version discrète :{' '}
          <InlineMath>{'F = S \\times \\dfrac{1 + r_c \\times T}{1 + r_b \\times T}'}</InlineMath>
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6">
        <p className="text-xs text-blue-600 uppercase tracking-wide font-semibold mb-2">
          Interprétation
        </p>
        <p className="text-gray-700 leading-relaxed text-sm">
          Si <InlineMath>{'r_c > r_b'}</InlineMath>, la devise domestique rapporte davantage :
          le Forward est plus élevé que le Spot (prime). Si <InlineMath>{'r_c < r_b'}</InlineMath>,
          le Forward est en dessous du Spot (décote). Cette relation garantit
          l'absence d'arbitrage entre le marché monétaire et le marché des changes.
        </p>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        En pratique, le contrat le plus utilisé pour rouler leurs
        positions de change au jour le jour est le <strong className="text-gray-900">Tom/Next</strong> (Tomorrow/Next) :
        on achète la devise demain (T+1) et on la revend le surlendemain (T+2).
        Un roulement quotidien qui permet la gestion de trésorerie
        en devises.
      </p>

      {/* ── Section 2 ── */}
      <h2 id="cirs" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        2. Cross-Currency Swap (CIRS / XCS)
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Contrairement au FX Swap (instrument de trésorerie court terme), le
        Cross-Currency Swap (CIRS ou XCS) est un produit sur plusieurs années.
        Il implique trois phases distinctes.
      </p>

      {/* Tableau des trois phases */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border border-gray-300 rounded-xl overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 text-gray-700 font-semibold border-b border-gray-300">Phase</th>
              <th className="text-left px-4 py-3 text-gray-700 font-semibold border-b border-gray-300">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="bg-white">
              <td className="px-4 py-3 text-gray-900 font-medium">Échange initial</td>
              <td className="px-4 py-3 text-gray-600">Les deux contreparties échangent leurs nominaux au taux Spot du jour.</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-4 py-3 text-gray-900 font-medium">Paiements intermédiaires</td>
              <td className="px-4 py-3 text-gray-600">Chaque partie verse les intérêts dans la devise reçue, sans netting (car les devises sont différentes).</td>
            </tr>
            <tr className="bg-white">
              <td className="px-4 py-3 text-gray-900 font-medium">Re-échange final</td>
              <td className="px-4 py-3 text-gray-600">Les nominaux sont restitués au taux Spot initial, quel que soit le taux de change courant.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        La logique économique derrière le CIRS est celle de
        l'<strong className="text-gray-900">avantage comparatif</strong>. Plutôt que d'emprunter directement
        dans une devise étrangère à des taux punitifs, chaque contrepartie emprunte
        là où elle est connue et crédible, puis elles swappent leurs dettes.
      </p>

      {/* Exemple avantage comparatif */}
      <div className="bg-gray-50 border border-gray-300 rounded-xl p-6 mb-6">
        <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-4">
          Exemple : Partie A (US) veut des £, Partie B (UK) veut des $
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-1">Taux disponibles</p>
            <p className="text-sm text-gray-600">Banques US : prêtent à A à <span className="font-mono text-gray-900">4%</span>, à B à <span className="font-mono text-gray-900">6%</span></p>
            <p className="text-sm text-gray-600">Banques UK : prêtent à B à <span className="font-mono text-gray-900">7%</span>, à A à <span className="font-mono text-gray-900">10%</span></p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-1">Après le CIRS</p>
            <p className="text-sm text-gray-600">Partie A obtient des £ à <span className="font-mono font-semibold text-green-700">7%</span> (au lieu de 10%)</p>
            <p className="text-sm text-gray-600">Partie B obtient des $ à <span className="font-mono font-semibold text-green-700">4%</span> (au lieu de 6%)</p>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4 space-y-1 text-sm text-gray-600">
          <p><span className="font-semibold text-gray-800">1.</span> A emprunte $2M à 4% et les transfère à B. B emprunte £1M à 7% et les transfère à A (Spot : 1£ = 2$).</p>
          <p><span className="font-semibold text-gray-800">2.</span> Chaque année, A verse des £ à B (7% sur £1M), B verse des $ à A (4% sur $2M).</p>
          <p><span className="font-semibold text-gray-800">3.</span> À maturité, A rend £1M à B et récupère ses $2M. Tout le monde est gagnant.</p>
        </div>
      </div>

      {/* ── Section 3 ── */}
      <h2 id="basis" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        3. Basis Spread et Float/Float
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        L'exemple classique en Fixe contre Fixe est pédagogique, mais la très grande majorité du volume
        interbancaire se traite en <strong className="text-gray-900">Variable contre Variable</strong> (Float vs Float),
        typiquement SOFR contre Euribor. Le pricing Float/Float repose sur les mêmes
        formules de parité ; le Basis vient s'y ajouter comme une couche distincte.
      </p>

      <p className="text-gray-600 leading-relaxed mb-6">
        En raison du déséquilibre mondial de la demande (tout le monde a besoin de
        dollars), prêter des dollars coûte plus cher que ce que la parité des taux
        justifie. Cette friction s'appelle le <strong className="text-gray-900">Cross-Currency Basis Spread</strong>.
      </p>

      {/* Encadré Basis Spread */}
      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6">
        <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-3">
          Mécanisme du Basis EUR/USD
        </p>
        <div className="space-y-2 text-sm">
          <p className="text-gray-700">
            <span className="font-semibold">Jambe EUR :</span> reçoit{' '}
            <InlineMath>{'\\text{Euribor} - \\text{Basis}'}</InlineMath>
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Jambe USD :</span> paie{' '}
            <InlineMath>{'\\text{SOFR (complet)}'}</InlineMath>
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Exemple : Basis EUR/USD = −20 bps. L'européen qui veut des dollars
            ne reçoit que (Euribor − 20 bps) sur ses euros. Le prêteur de dollars
            encaisse cette prime de liquidité.
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
        <p className="text-xs text-blue-600 uppercase tracking-wide font-semibold mb-2">
          Convention de signe
        </p>
        <p className="text-gray-700 leading-relaxed text-sm">
          Le Basis est coté du point de vue de la devise non-dollar. Un Basis négatif
          (EUR/USD à −20 bps) signifie que l'euro est moins cher à emprunter que ce
          que la parité prédit, le dollar est plus rare.
          En période de stress (mars 2020, septembre 2008), le Basis peut s'écraser
          à −100 bps et au-delà.
        </p>
      </div>

      {/* ── Section 4 ── */}
      <h2 id="risques" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        4. La matrice des risques d'un CIRS
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Gérer un livre de CIRS expose le trader à trois risques distincts qui
        impactent son mark-to-market.
      </p>

      <div className="space-y-4 mb-6">

        {/* Basis Risk */}
        <div className="bg-gray-50 border border-gray-300 rounded-xl p-5">
          <p className="text-sm font-semibold text-gray-900 mb-1">Basis Risk</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Le risque que la prime de rareté de la monnaie (le Basis) se creuse en
            période de crise. Un CIRS coté à Basis = −20 bps peut voir ce spread
            exploser à −80 bps si une crise de liquidité dollar se déclenche. Le
            trader subit une perte mark-to-market même si les taux et le Spot sont
            stables.
          </p>
        </div>

        {/* Spot Risk */}
        <div className="bg-gray-50 border border-gray-300 rounded-xl p-5">
          <p className="text-sm font-semibold text-gray-900 mb-1">Spot Risk (FX Risk)</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Puisque les nominaux sont rééchangés en fin de contrat au taux Spot initial,
            une appréciation de la devise empruntée se traduit mécaniquement par une
            hausse de la valeur de la dette. Par exemple, si on a reçu £1M et que la
            livre s'apprécie de 10%, la dette à restituer vaut désormais l'équivalent
            de 1,1M$. Ce risque génère fréquemment des appels de marge importants et
            un coût XVA (risque de défaut de la contrepartie).
          </p>
        </div>

        {/* Rate Risk */}
        <div className="bg-gray-50 border border-gray-300 rounded-xl p-5">
          <p className="text-sm font-semibold text-gray-900 mb-1">Rate Risk (Rho)</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Sur un swap Float/Float, le risque de taux long terme est quasiment neutre :
            les taux variables absorbent automatiquement les déplacements parallèles des
            courbes. Le seul risque résiduel est le risque intra-période entre deux dates
            de fixing. Sur un swap Fixe/Variable, en revanche, le risque de taux est
            analogue à celui d'un IRS classique (DV01 de la jambe fixe).
          </p>
        </div>

      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 mb-10">
        <p className="text-xs text-amber-600 uppercase tracking-wide font-semibold mb-2">
          Interaction entre les risques
        </p>
        <p className="text-gray-700 leading-relaxed text-sm">
          En pratique, le Basis Risk et le Spot Risk sont corrélés en période de stress :
          quand le dollar devient rare, il s'apprécie simultanément (Spot Risk) et le
          Basis se creuse (Basis Risk). Le trader subit les deux à la fois, ce qui le rend
          difficile à hedger proprement.
        </p>
      </div>

      {/* ── Lien quiz ── */}
      <div className="mt-10 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-gray-700">
        Le quiz du Module 6 est disponible — <a href="/quiz/module-6-fixed-income-3" className="text-blue-600 hover:underline font-medium">S&apos;entraîner →</a>
      </div>

      {/* ── Navigation ── */}
      <div className="flex justify-between mt-12 pt-6 border-t border-gray-300">
        <a href="/cours/module-5-fixed-income-2/modele-taux" className="text-blue-600 hover:underline text-sm">
          ← Modèles de taux
        </a>
        <a href="/cours/module-6-fixed-income-3/cds" className="text-blue-600 hover:underline text-sm">
          Credit Default Swaps →
        </a>
      </div>

    </article>
  )
}
