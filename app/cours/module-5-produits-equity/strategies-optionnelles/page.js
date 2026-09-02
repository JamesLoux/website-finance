import Link from 'next/link';
import { InlineMath, BlockMath } from '../../../components/Math';
import StrategyPayoffWrapper from './StrategyPayoffWrapper';

export const metadata = {
  title: "Stratégies Optionnelles — Finance according to James",
  description:
    "Spreads verticaux, straddle et strangle, calendar spreads, risk reversal et collar, butterfly et condor, overlay et parité : le catalogue des combinaisons d'options vanilles et le facteur de risque que chacune isole.",
};

// ── Fiche stratégie : gabarit unique à sept champs, réutilisé pour chaque instrument ──
function Fiche({ construction, vue, flux, gainMax, perteMax, pointsMorts, greeks }) {
  return (
    <div className="bg-gray-50 border border-gray-300 rounded-xl p-4 text-sm mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-x-4 gap-y-2">
        <span className="font-semibold text-gray-900">Construction</span>
        <span className="text-gray-600">{construction}</span>
        <span className="font-semibold text-gray-900">Vue exprimée</span>
        <span className="text-gray-600">{vue}</span>
        <span className="font-semibold text-gray-900">Flux initial</span>
        <span className="text-gray-600">{flux}</span>
        <span className="font-semibold text-gray-900">Gain maximum</span>
        <span className="text-gray-600">{gainMax}</span>
        <span className="font-semibold text-gray-900">Perte maximum</span>
        <span className="text-gray-600">{perteMax}</span>
        <span className="font-semibold text-gray-900">Points morts</span>
        <span className="text-gray-600">{pointsMorts}</span>
        <span className="font-semibold text-gray-900">Greeks dominants</span>
        <span className="text-gray-600">{greeks}</span>
      </div>
    </div>
  );
}

// Renvoie vers l'atelier de la section 1, pas vers le simulateur : l'atelier
// construit exactement les structures de cette page. Le lien vers le
// simulateur de positions reste en clôture de la section 8, où il pointe vers
// un book de trades réel et non vers un outil pédagogique.
function AtelierLink() {
  return (
    <p className="text-sm mb-10">
      <a href="#lecture" className="text-blue-600 hover:underline">
        Construire cette structure dans l&apos;atelier →
      </a>
    </p>
  );
}

export default function StrategiesOptionnellesPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12">

      {/* ── Fil d'Ariane ── */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/cours" className="hover:text-blue-600 transition-colors">Cours</Link>
        <span>/</span>
        <span className="text-gray-500">Module 7 — Equity I</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">Stratégies optionnelles</span>
      </nav>

      {/* ── Titre ── */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
        Stratégies optionnelles
      </h1>

      {/* ── Introduction ── */}
      <p className="text-lg text-gray-600 leading-relaxed mb-10">
        Assembler des options vanilles permet de créer des profils de gains sur mesure. Une option seule expose simultanément à la
        direction, au niveau de volatilité, à la pente du smile et au passage du temps. Une combinaison
        bien choisie ne laisse vivre que celui de ces facteurs sur lequel on a une vue.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 1 — Ce que l'on négocie vraiment
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="lecture" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-24">
        1. Grille de lecture et Atelier
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Avant de dérouler le catalogue, il faut comprendre que toute structure optionnelle revient à
        prendre position sur l&apos;une des cinq dimensions suivantes.
      </p>

      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800">Facteur négocié</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800">Instrument canonique</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800">Greek dominant</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Direction, avec un budget contraint</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Spreads verticaux</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Delta borné</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Niveau de volatilité</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Straddle, Strangle</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Vega, Gamma</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Pente du smile (skew)</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Risk Reversal, Collar</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Vanna</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Convexité du smile (kurtosis)</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Butterfly, Condor</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Volga</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Structure par terme de la volatilité</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Calendar Spread</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Vega par échéance</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-gray-600 leading-relaxed mb-8">
        Rappel des Greeks du premier et deuxième ordre dans{' '}
        <a href="/cours/module-3-grecques/grecques-premier-ordre" className="text-blue-600 hover:underline">
          L&apos;essentiel des Greeks
        </a>
        .
      </p>

      <p className="text-gray-600 leading-relaxed mb-3">
        <strong className="text-gray-800">Débit et crédit.</strong> Une structure est au débit quand la prime totale se paye (quand
        la prime payée dépasse la prime encaissée). Une structure au crédit : la prime totale se perçoit. Cette distinction
        détermine le profil de risque.
      </p>

      <p className="text-gray-600 leading-relaxed mb-8">
        Une structure au débit a une perte maximale connue et bornée par la prime versée. Une structure au
        crédit encaisse immédiatement, mais expose à une perte supérieure au montant encaissé, et donc à des appels
        de marge auprès de la chambre de compensation.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Comment lire une fiche
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Chaque instrument de cette page est résumé par sept champs, toujours dans le même ordre :
          Construction, Vue exprimée, Flux initial, Gain maximum, Perte maximum, Points morts, Greeks
          dominants. Les gains et pertes maximum sont toujours donnés à maturité, hors frais et hors coût
          de portage.
        </p>
      </div>

      <p className="text-gray-600 leading-relaxed mb-3">
        Chaque structure de cette page peut être construite dans l&apos;atelier ci-dessous,
        décomposée en ses jambes, et observée entre son initiation et son expiration.
      </p>

      <StrategyPayoffWrapper />

      {/* ══════════════════════════════════════════════════════════════
          Section 2 — Les spreads verticaux
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="spreads-verticaux" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        2. Spreads verticaux
      </h2>

      <p className="text-gray-600 leading-relaxed mb-8">
        Le spread vertical est l&apos;unité de base de la structuration. Acheter une option et en vendre
        une autre, de même type et de même échéance, à un strike différent. La vente finance l&apos;achat
        et plafonne le gain. C&apos;est un échange volontaire de convexité contre du budget.
      </p>

      <h3 id="call-spread" className="text-xl font-semibold text-gray-900 mb-4 scroll-mt-24">
        Call Spread (en Bull Spread)
      </h3>

      <p className="text-gray-600 leading-relaxed mb-4">
        Achat d&apos;un Call <InlineMath>K_1</InlineMath>, vente d&apos;un Call <InlineMath>K_2</InlineMath>,
        avec <InlineMath>{'K_1 < K_2'}</InlineMath>.
      </p>

      <Fiche
        construction={<>long Call <InlineMath>K_1</InlineMath> + short Call <InlineMath>K_2</InlineMath>, même échéance</>}
        vue="Hausse modérée, plafonnée"
        flux="Débit"
        gainMax={<><InlineMath>{'K_2 - K_1 - P'}</InlineMath> (atteint pour <InlineMath>{'S_T \\geq K_2'}</InlineMath>)</>}
        perteMax={<>la prime nette <InlineMath>P</InlineMath></>}
        pointsMorts={<><InlineMath>{'S_T = K_1 + P'}</InlineMath></>}
        greeks="Delta positif borné, Vega de signe variable, sensibilité à la pente du smile"
      />

      <p className="text-gray-600 leading-relaxed mb-4">
        <strong className="text-gray-800">Attention.</strong>{' '}
        Le prix du call spread n&apos;est pas donné par une volatilité unique. Chaque jambe se price avec sa
        propre volatilité implicite :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-3 text-center text-gray-900">
        <BlockMath>{'CS = C(K_1, \\sigma(K_1)) - C(K_2, \\sigma(K_2))'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        Précédemment, nous avons démontré l&apos;unicité de la vol implicite dans{' '}
        <a href="/cours/module-5-produits-equity/options-vanilles#parite" className="text-blue-600 hover:underline">
          Options Vanilles, section Parité Call-Put
        </a>
        {' '}
        pour chaque couple <InlineMath>{'(K,T)'}</InlineMath>. Déduisant qu'un call et un put européens de même strike et même maturité partagent
        nécessairement la même volatilité implicite. Cette volatilité ne peut être qu&apos;une fonction du
        couple <InlineMath>{'(K,T)'}</InlineMath>, et non un nombre unique valable pour toute la nappe.
      </p>

      <p className="text-gray-600 leading-relaxed mb-6">
        En actions, le skew est négatif : <InlineMath>{'\\sigma(K_1) > \\sigma(K_2)'}</InlineMath> pour{' '}
        <InlineMath>{'K_1 < K_2'}</InlineMath>. On achète donc la jambe la plus chère en volatilité et on
        vend la moins chère. Un modèle à
        volatilité plate sous-estime son coût. Un call spread est donc autant un trade de pente qu&apos;un
        trade directionnel et dépend du régime du Skew Delta. Tout est développé dans le module Volatilité.
      </p>

      <p className="text-gray-600 leading-relaxed mb-6">
        Renvoi :{' '}
        <a href="/cours/module-6-volatilite/skew-delta" className="text-blue-600 hover:underline">
          Skew Delta
        </a>
        .
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Le Vega du call spread change de signe
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Le Vega net vaut <InlineMath>{'\\nu(K_1) - \\nu(K_2)'}</InlineMath>. Le Vega d&apos;une option est
          maximal près de la monnaie. Tant que le spot est sous le corridor (avant <InlineMath>K_1</InlineMath>), <InlineMath>K_1</InlineMath>{' '}
          est plus proche de la monnaie et le Vega net est positif. Au-dessus de <InlineMath>K_2</InlineMath>,
          la relation s&apos;inverse et le Vega net est négatif. Il ne s&apos;agit donc pas d&apos;une
          position &laquo; sans Vega &raquo; mais d&apos;une position dont le signe du Vega dépend du spot.
        </p>
      </div>

      <p className="text-gray-600 leading-relaxed mb-3">
        <strong className="text-gray-800">Convergence vers la digitale.</strong> Un call spread normalisé
        par l&apos;écart de strikes converge vers une option digitale quand cet écart tend vers zéro :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-3 text-center text-gray-900 overflow-x-auto">
        <BlockMath>{'\\frac{C(K) - C(K + \\varepsilon)}{\\varepsilon} \\xrightarrow[\\varepsilon \\to 0]{} -\\frac{\\partial C}{\\partial K} = e^{-rT} \\, \\mathbb{Q}(S_T > K)'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-8">
        C&apos;est le fondement de la réplication des produits digitaux, déjà démontrée et illustrée
        graphiquement dans le module Fixed Income II. Renvoi :{' '}
        <a href="/cours/module-5-fixed-income-2/range-accrual#gestion-risques" className="text-blue-600 hover:underline">
          Range Accrual, section Réplication Digitale.
        </a>
      </p>

      <h3 id="put-spread" className="text-xl font-semibold text-gray-900 mb-4 scroll-mt-24">
        Put Spread (en Bear Spread)
      </h3>

      <p className="text-gray-600 leading-relaxed mb-4">
        Achat d&apos;un Put <InlineMath>K_2</InlineMath>, vente d&apos;un Put <InlineMath>K_1</InlineMath>,
        avec <InlineMath>{'K_1 < K_2'}</InlineMath>.
      </p>

      <Fiche
        construction={<>long Put <InlineMath>K_2</InlineMath> + short Put <InlineMath>K_1</InlineMath></>}
        vue="Baisse modérée et encadrée"
        flux="Débit"
        gainMax={<><InlineMath>{'K_2 - K_1 - P'}</InlineMath></>}
        perteMax={<>la prime nette <InlineMath>P</InlineMath></>}
        pointsMorts={<><InlineMath>{'S_T = K_2 - P'}</InlineMath></>}
        greeks="Delta négatif borné, position vendeuse de skew"
      />

      <p className="text-gray-600 leading-relaxed mb-6">
        Le skew joue ici en faveur de l&apos;acheteur. On achète le Put <InlineMath>K_2</InlineMath>{' '}
        (volatilité plus basse) et on vend le Put <InlineMath>K_1</InlineMath> (volatilité plus haute, car
        plus loin dans la queue de gauche). Le skew négatif des actions rend donc le put spread
        relativement bon marché face à un put sec. C'est pourquoi les gérants couvrent en put spread plutôt qu&apos;en put sec et acceptent en échange que la protection s&apos;arrête à{' '}
          <InlineMath>K_1</InlineMath>{' '} dans le scénario du krach.
      </p>

      <h3 id="ratio-backspread" className="text-xl font-semibold text-gray-900 mb-4 scroll-mt-24">
        Ratio Spreads et Backspreads
      </h3>

      <p className="text-gray-600 leading-relaxed mb-4">
        Ratio Call Spread 1×2 : achat d&apos;un Call <InlineMath>K_1</InlineMath>, vente de deux Calls{' '}
        <InlineMath>K_2</InlineMath>. Souvent structuré à coût nul.
      </p>

      <Fiche
        construction={<>long 1 Call <InlineMath>K_1</InlineMath> + short 2 Calls <InlineMath>K_2</InlineMath></>}
        vue={<>Hausse limitée s&apos;arrêtant autour de <InlineMath>K_2</InlineMath></>}
        flux="Crédit ou coût nul (mais peut être monté au débit)"
        gainMax={<><InlineMath>{'K_2 - K_1 + C'}</InlineMath> (atteint pour <InlineMath>{'S_T = K_2'}</InlineMath>)</>}
        perteMax={<>non bornée au-dessus de <InlineMath>K_2</InlineMath></>}
        pointsMorts={<><InlineMath>{'S_T = 2K_2 - K_1 + C'}</InlineMath> à la hausse, aucun point mort à la baisse si la structure est montée en crédit.
        Si elle est montée au débit D, deux points morts apparaissent : <InlineMath>{'S_T = K_1 + D'}</InlineMath> et <InlineMath>{'S_T = 2K_2 - K_1 - D'}</InlineMath></>}
        greeks="Gamma négatif, Vega négatif, Theta positif"
      />

      <p className="text-gray-600 leading-relaxed mb-6">
        <strong className="text-gray-800">Backspread</strong> : la structure inverse (vente d&apos;une
        option proche, achat de deux options plus lointaines). Position longue en convexité, financée par
        la vente de la jambe centrale. Gamma et Vega positifs, Theta négatif.
      </p>

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 mb-6">
        <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-2">
          Attention
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Le ratio spread est la première structure de cette page dont la perte n&apos;est pas bornée.
          Vendre deux options contre une revient à être structurellement short gamma. Le profil séduisant à
          maturité masque un risque de queue réel avant maturité.
        </p>
      </div>

      <AtelierLink />

      {/* ══════════════════════════════════════════════════════════════
          Section 3 — La volatilité pure
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="volatilite-pure" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        3. Volatilité
      </h2>

      <p className="text-gray-600 leading-relaxed mb-8">
        Ces structures visent à capturer un mouvement sans pari directionnel. Encore faut-il préciser de
        quel &laquo; mouvement &raquo; on parle, car le straddle nu et le straddle delta-hedgé ne négocient
        pas la même chose.
      </p>

      <h3 id="straddle" className="text-xl font-semibold text-gray-900 mb-4 scroll-mt-24">
        Straddle
      </h3>

      <p className="text-gray-600 leading-relaxed mb-4">
        Achat d&apos;un Call <InlineMath>K</InlineMath> et d&apos;un Put <InlineMath>K</InlineMath>, même
        échéance, généralement à la monnaie.
      </p>

      <Fiche
        construction={<>long Call <InlineMath>K</InlineMath> + long Put <InlineMath>K</InlineMath></>}
        vue="Volatilité réalisée supérieure à la volatilité implicite"
        flux="Débit"
        gainMax={<>non borné à la hausse</>}
        perteMax={<>la prime totale <InlineMath>{'C + P'}</InlineMath>, atteinte pour <InlineMath>{'S_T = K'}</InlineMath></>}
        pointsMorts={<><InlineMath>{'S_T = K \\pm (C + P)'}</InlineMath></>}
        greeks="Gamma positif, Vega positif, Theta négatif"
      />

      <p className="text-gray-600 leading-relaxed mb-3">
        <strong className="text-gray-800">Correction importante sur le Delta.</strong> Le straddle
        n&apos;est pas exactement delta-neutre. Son Delta vaut :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-3 text-center text-gray-900">
        <BlockMath>{'\\Delta_{straddle} = e^{-qT}\\left[2N(d_1) - 1\\right]'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-8">
        Il ne s&apos;annule que si <InlineMath>{'d_1 = 0'}</InlineMath>, c&apos;est-à-dire pour{' '}
        <InlineMath>{'K = S \\, e^{(r - q + \\sigma^2/2)T}'}</InlineMath>. Un straddle à la monnaie spot
        avec <InlineMath>{'r > q'}</InlineMath> {' '}porte donc un Delta positif, et même si <InlineMath>{'r = q'}</InlineMath> {' '}, le Delta reste très légèrement positif.
        Le strike de neutralité stricte est <InlineMath>{'K = F·e^{(σ²/2)T}'}</InlineMath> {' '}, strictement au-dessus du forward, et qu'il porte le nom de Delta-Neutral Straddle,
        convention de cotation de la volatilité ATM sur le marché FX. Les trois points de référence du smile (ATM, RR 25Δ, Fly 25Δ) sont définis par des conditions sur les Deltas et non par des strikes fixes.
      </p>

      <p className="text-gray-600 leading-relaxed mb-3">
        <strong className="text-gray-800">Approximation du prix.</strong> Pour une option à la monnaie
        et une maturité courte :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-3 text-center text-gray-900">
        <BlockMath>{'C \\approx 0{,}4 \\, S \\, \\sigma \\sqrt{T} \\quad {donc} \\quad C + P \\approx 0{,}8 \\, S \\, \\sigma \\sqrt{T}'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-8">
        Un straddle à un an sur un sous-jacent à 100 avec une implicite à 20 % coûte donc environ 16
        points. Le marché doit bouger de 16 % pour atteindre le point mort. Cette règle de calcul mental est
        utilisée en permanence sur un desk. Voir{' '}
        <a href="/cours/module-2-pricing/probabilites-d1-d2" className="text-blue-600 hover:underline">
          Formule de Black-Scholes
        </a>
        .
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Straddle nu ou straddle delta-hedgé : deux trades différents
        </p>
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          <strong className="text-gray-800">Nu.</strong> On garde la position telle quelle. Le P&amp;L
          dépend du niveau final du sous-jacent. On parie sur l&apos;amplitude d&apos;un mouvement, pas sur
          la volatilité au sens statistique.
        </p>
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          <strong className="text-gray-800">Delta-hedgé.</strong> On rebalance le Delta en continu. Le
          P&amp;L devient alors, à l&apos;ordre dominant :
        </p>
        <div className="bg-white border border-blue-100 rounded-lg px-6 py-4 mb-3 text-center overflow-x-auto">
          <BlockMath>{'d\\Pi \\approx \\tfrac{1}{2} \\, \\Gamma \\, S^2 \\left(\\sigma_{r\\acute{e}alis\\acute{e}e}^2 - \\sigma_{implicite}^2\\right) dt'}</BlockMath>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed">
          C&apos;est un pari pur sur la volatilité réalisée contre la volatilité implicite payée à
          l&apos;initiation. Le sous-jacent peut finir exactement à son point de départ et la position être
          largement gagnante, à condition d&apos;avoir suffisamment bougé en chemin.
        </p>
      </div>

      <p className="text-gray-600 leading-relaxed mb-8">
        Voir{' '}
        <a href="/cours/module-3-grecques/arbitrage-theta-gamma" className="text-blue-600 hover:underline">
          Arbitrage Theta-Gamma
        </a>
        {' '} et {' '}
        <a href="/cours/module-6-volatilite/variance-swap-vix" className="text-blue-600 hover:underline">
          Variance Swap &amp; VIX
        </a>
        {' '} pour approfondir l'exposition à la volatilité pure.
      </p>

      <h3 id="strangle" className="text-xl font-semibold text-gray-900 mb-4 scroll-mt-24">
        Strangle
      </h3>

      <p className="text-gray-600 leading-relaxed mb-4">
        Achat d&apos;un Call OTM <InlineMath>K_2</InlineMath> et d&apos;un Put OTM <InlineMath>K_1</InlineMath>,
        avec <InlineMath>{'K_1 < S_0 < K_2'}</InlineMath>.
      </p>

      <Fiche
        construction={<>long Put <InlineMath>K_1</InlineMath> + long Call <InlineMath>K_2</InlineMath></>}
        vue="Mouvement extrême, rupture de régime"
        flux="Débit, nettement inférieur au straddle"
        gainMax="Non borné à la hausse"
        perteMax={<>la prime totale, sur tout l&apos;intervalle <InlineMath>{'[K_1, K_2]'}</InlineMath></>}
        pointsMorts={<><InlineMath>{'S_T = K_1 - P'}</InlineMath> et <InlineMath>{'S_T = K_2 + P'}</InlineMath></>}
        greeks="Gamma et Vega positifs mais plus étalés, Theta moins agressif"
      />

      <p className="text-gray-600 leading-relaxed mb-4">
        La perte est constante et maximale sur
        tout l&apos;intervalle entre les deux strikes, puis le payoff redevient linéaire. La courbure en U
        n&apos;apparaît que sur la valeur de la position avant maturité, sous l&apos;effet de la valeur
        temps.
      </p>

      <p className="text-gray-600 leading-relaxed mb-8">
        Le strangle offre plus de Vega par euro de prime que le straddle et souffre moins du Theta, parce
        qu&apos;une option hors de la monnaie porte moins de valeur temps en absolu. En contrepartie, il
        faut un mouvement plus violent pour franchir les points morts. Acheter un strangle, c&apos;est
        acheter les ailes du smile : c&apos;est donc aussi une position longue en convexité de la nappe, pas
        seulement en niveau.
      </p>

      <h3 id="limites-vega" className="text-xl font-semibold text-gray-900 mb-4 scroll-mt-24">
        La limite : Une exposition incomplète à la volatilité
      </h3>

      <p className="text-gray-600 leading-relaxed mb-4">
        Le Vega d&apos;une option est maximal à la monnaie et décroît de part et d&apos;autre. Donc
        dès que le spot s&apos;éloigne du strike, le straddle perd son exposition à la
        volatilité. Le trader qui achetait de la volatilité se retrouve avec une position quasi
        directionnelle dont le Vega a fondu, au moment même où sa vue se réalise.
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        Cette dégradation automatique est le défaut congénital des structures vanilles utilisées comme
        instruments de volatilité, et la raison d&apos;être historique du variance swap, dont
        l&apos;exposition à la variance reste constante quel que soit le niveau du spot. Voir{' '}
        <a href="/cours/module-6-volatilite/variance-swap-vix" className="text-blue-600 hover:underline">
          Variance Swap &amp; VIX
        </a>
        .
      </p>

      <p className="text-gray-600 leading-relaxed mb-8">
        La solution technique consiste à répliquer non pas une option unique, mais une bande continue
        d&apos;options pondérées en <InlineMath>{'1/K^2'}</InlineMath>. C&apos;est le résultat de
        Carr-Madan, déjà utilisé pour l&apos;ajustement de convexité des CMS, analogue au VarSwap. Voir{' '}
        <a href="/cours/module-5-fixed-income-2/cms" className="text-blue-600 hover:underline">
          CMS &amp; Ajustement de Convexité
        </a>
        .
      </p>

      <AtelierLink />

      {/* ══════════════════════════════════════════════════════════════
          Section 4 — Les spreads calendaires
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="spreads-calendaires" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        4. Spreads calendaires
      </h2>

      <p className="text-gray-600 leading-relaxed mb-8">
        Jusqu&apos;ici toutes les structures partagent la même échéance (on pouvait représenter les payoffs combinés). En faisant varier la maturité
        plutôt que le strike, on négocie sa structure par
        terme.
      </p>

      <h3 id="calendar" className="text-xl font-semibold text-gray-900 mb-4 scroll-mt-24">
        Calendar Spread (spread horizontal)
      </h3>

      <p className="text-gray-600 leading-relaxed mb-4">
        Vente d&apos;une option d&apos;échéance courte <InlineMath>T_1</InlineMath>{' '} et achat d&apos;une
        option de même type et même strike d&apos;échéance longue <InlineMath>T_2</InlineMath>, avec{' '}
        <InlineMath>{'T_1 < T_2'}</InlineMath>.
      </p>

      <Fiche
        construction={<>short option <InlineMath>{'(K, T_1)'}</InlineMath> + long option <InlineMath>{'(K, T_2)'}</InlineMath></>}
        vue="Stagnation à court terme, et pente de la structure par terme jugée trop plate"
        flux="Débit"
        gainMax={<>atteint pour <InlineMath>{'S_{T_1} = K'}</InlineMath>, non exprimable en forme close</>}
        perteMax="La prime nette"
        pointsMorts="De part et d'autre de K, dépendants de la volatilité résiduelle en T₁"
        greeks="Vega positif (porté par la jambe longue), Gamma négatif et Theta positif (portés par la jambe courte)"
      />

      <p className="text-gray-600 leading-relaxed mb-4">
        Le Vega croît
        approximativement en <InlineMath>{'\\sqrt{T}'}</InlineMath> : la jambe longue domine, le Vega net
        est positif. Le Gamma et le Theta se comportent en <InlineMath>{'1/\\sqrt{T}'}</InlineMath> : la
        jambe courte domine, on est donc short gamma et long theta. Le calendar est ainsi l&apos;une des
        rares structures qui encaisse du temps tout en restant longue en volatilité.
      </p>


      <h3 id="diagonal" className="text-xl font-semibold text-gray-900 mb-4 scroll-mt-24">
        Diagonal Spread
      </h3>

      <p className="text-gray-600 leading-relaxed mb-4">
        Même principe, mais les deux jambes diffèrent à la fois par le strike et par l&apos;échéance. On
        superpose une vue directionnelle à la vue de structure par terme.
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        <strong className="text-gray-800">Convention pour la suite.</strong> Les deux jambes sont des
        calls, avec <InlineMath>{'T_1 < T_2'}</InlineMath>. La relation entre <InlineMath>K_1</InlineMath>{' '}
        et <InlineMath>K_2</InlineMath>{' '} reste libre, et c&apos;est elle qui définit deux configurations de
        risque bien distinctes, détaillées plus bas.
      </p>

      <Fiche
        construction={<>short Call <InlineMath>{'(K_1, T_1)'}</InlineMath> + long Call <InlineMath>{'(K_2, T_2)'}</InlineMath></>}
        vue={<>Stagnation sous <InlineMath>K_1</InlineMath> jusqu&apos;à <InlineMath>T_1</InlineMath>, puis hausse ; structure par terme de volatilité qui ne s&apos;aplatit pas</>}
        flux="Débit dans la plupart des configurations, la maturité longue portant plus de valeur temps ; crédit possible si le strike acheté est suffisamment hors de la monnaie"
        gainMax="Non exprimable en forme close, la jambe longue survit à l'expiration de la jambe courte"
        perteMax={<>Le débit net si <InlineMath>{'K_2 < K_1'}</InlineMath> ; <InlineMath>{'K_2 - K_1'}</InlineMath> plus le débit net si <InlineMath>{'K_2 > K_1'}</InlineMath>. Bornée dans les deux cas</>}
        pointsMorts="Non définis à maturité unique, la position se pilote en valeur simulée à T₁"
        greeks="Mélange de Delta directionnel et de Vega net positif porté par la jambe longue"
      />

      <p className="text-gray-600 leading-relaxed mb-4">
        <strong className="text-gray-800">Un trade en deux temps.</strong> Jusqu&apos;à{' '}
        <InlineMath>T_1</InlineMath>, la position est short l&apos;option courte : elle encaisse du Theta
        et profite d&apos;une stagnation du sous-jacent sous <InlineMath>K_1</InlineMath>. Passé{' '}
        <InlineMath>T_1</InlineMath>, il ne reste plus qu&apos;un call long <InlineMath>K_2</InlineMath>,
        partiellement financé par la prime déjà encaissée sur la jambe courte, et la position devient
        purement directionnelle. La vue sur la structure par terme de la volatilité se superpose à ces
        deux phases via le Vega net positif porté par la jambe longue, actif pendant toute la durée de vie
        du trade.
      </p>

      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800">Configuration</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800">Couverture de la jambe courte</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800">Perte maximum</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800">Usage typique</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700"><InlineMath>{'K_2 < K_1'}</InlineMath></td>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Intégrale, la jambe longue est plus ITM</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Débit net</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Poor Man&apos;s Covered Call</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700"><InlineMath>{'K_2 > K_1'}</InlineMath></td>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Partielle entre les deux strikes</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-600"><InlineMath>{'(K_2 - K_1)'}</InlineMath> + débit net</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Hausse progressive à budget réduit</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-gray-600 leading-relaxed mb-8">
        <strong className="text-gray-800">Exemple chiffré (cas <InlineMath>{'K_2 > K_1'}</InlineMath>).</strong>{' '}
        Spot à 100 : achat d&apos;un call 2 ans de strike 120 à 5,95, vente d&apos;un call 3 mois de strike
        100 à 4,23, débit net de 1,72. En cas de hausse forte du sous-jacent avant{' '}
        <InlineMath>T_1</InlineMath>, la jambe courte perd <InlineMath>{'(S - 100)'}</InlineMath> et la
        jambe longue gagne <InlineMath>{'(S - 120)'}</InlineMath>, soit un net de{' '}
        <InlineMath>{'-20'}</InlineMath> sur les deux jambes, auquel s&apos;ajoute le débit initial de
        1,72 : la perte est plafonnée à 21,72, quelle que soit l&apos;ampleur de la hausse.
      </p>

      <p className="text-gray-500 text-sm leading-relaxed mb-4">
        Ces deux primes sont calculées à volatilité plate : l&apos;atelier n&apos;a pas de structure par
        terme de skew et ne peut donc pas valoriser correctement une jambe à deux ans, ce qui est aussi la
        raison pour laquelle le Diagonal est absent de son sélecteur.
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        <strong className="text-gray-800">Pourquoi il n&apos;y a pas de payoff fermé.</strong> Les autres
        structures de la page ont des jambes qui expirent ensemble, donc un payoff terminal linéaire par
        morceaux. Ici, en <InlineMath>T_1</InlineMath>, la jambe longue est encore vivante et vaut sa valeur
        Black-Scholes, laquelle dépend de la volatilité implicite <InlineMath>{'\\sigma(K_2, T_2 - T_1)'}</InlineMath>{' '}
        qui n&apos;est pas connue aujourd&apos;hui. Le diagonal est donc une position sur la volatilité
        forward, et non une position à payoff déterminé.
      </p>

      <p className="text-gray-600 leading-relaxed mb-3">
        Le Calendar et le spread vertical sont les deux cas dégénérés du Diagonal :
      </p>

      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse">
          <tbody>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700"><InlineMath>{'K_1 = K_2'}</InlineMath></td>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Calendar (Spread horizontal)</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700"><InlineMath>{'T_1 = T_2'}</InlineMath></td>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Spread vertical</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700"><InlineMath>{'K_1 \\neq K_2'}</InlineMath> et <InlineMath>{'T_1 \\neq T_2'}</InlineMath></td>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Diagonal</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        Le trader dose son exposition entre directionnel et structure par terme en choisissant
        le bon équilibre.
      </p>

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 mb-6">
        <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-2">
          Attention
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Sur un Calendar (strike identique), si la jambe courte finit dans la monnaie, la jambe longue
          l&apos;est aussi. Sur un diagonal avec <InlineMath>{'K_1 < K_2'}</InlineMath>,
          la jambe courte peut finir ITM alors que la jambe longue est encore OTM : on se retrouve court le
          sous-jacent sans couverture intrinsèque, protégé seulement par la valeur temps d&apos;une option
          hors de la monnaie. Ce risque n&apos;existe pas sur le calendar.
        </p>
      </div>

      <p className="text-gray-600 leading-relaxed mb-10">
        <strong className="text-gray-800">Usage réel, le Poor Man&apos;s Covered Call.</strong> Vendre un
        call court terme OTM contre un call long terme deep-ITM, plutôt
        que de détenir l&apos;action. Un call à Delta 0,85 sur deux ans reproduit l&apos;essentiel de
        l&apos;exposition action pour une fraction du capital immobilisé. Sur un sous-jacent à 100 et sous
        les paramètres de l&apos;atelier, ce Delta correspond à un strike de l&apos;ordre de 74, pour une
        prime d&apos;environ un tiers du spot : l&apos;ordre de grandeur compte plus que la valeur exacte,
        qui dépend entièrement de la nappe retenue. C&apos;est un covered call à effet de levier. Renvois
        vers{' '}
        <a href="#covered-call" className="text-blue-600 hover:underline">
          Le Covered Call
        </a>{' '}
        plus bas sur cette page, et vers{' '}
        <a href="/cours/module-5-produits-equity/delta-one-cash" className="text-blue-600 hover:underline">
          Delta-One et Cash
        </a>{' '}
        pour l&apos;exposition synthétique au sous-jacent.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 5 — Skew et couverture
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="skew" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        5. Skew et couverture
      </h2>

      <p className="text-gray-600 leading-relaxed mb-8">
        Les structures suivantes prennent position sur la pente du smile (le skew), en exploitant le fait qu&apos;en actions les puts hors de la
        monnaie se traitent structurellement plus cher que les calls symétriques.
      </p>

      <h3 id="risk-reversal" className="text-xl font-semibold text-gray-900 mb-4 scroll-mt-24">
        Risk Reversal
      </h3>

      <p className="text-gray-600 leading-relaxed mb-4">
        Achat d&apos;un Call OTM et vente d&apos;un Put OTM (ou l&apos;inverse), typiquement à delta 25 de
        chaque côté.
      </p>

      <Fiche
        construction={<>long Call <InlineMath>K_2</InlineMath> + short Put <InlineMath>K_1</InlineMath></>}
        vue="Hausse, et skew jugé excessif"
        flux="Souvent un crédit en actions, du fait du skew négatif"
        gainMax="Non borné"
        perteMax={<><InlineMath>K_1</InlineMath> moins le crédit reçu, dans le scénario de faillite</>}
        pointsMorts={<>autour de <InlineMath>K_2</InlineMath> à la hausse et <InlineMath>K_1</InlineMath> à la baisse, ajustés du flux initial</>}
        greeks="Delta positif (environ 0,5 pour un 25-delta), Vega proche de zéro, Vanna positif"
      />

      <p className="text-gray-600 leading-relaxed mb-3">
        <strong className="text-gray-800">Le Risk Reversal n'est pas une stratégie populaire mais plus une indication sur le skew.
        </strong> Sur les desks, il ne se cote pas en prime mais en différence de volatilités
        implicites :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center text-gray-900">
        <BlockMath>{'RR_{25\\Delta} = \\sigma(25\\Delta\\,\\text{Call}) - \\sigma(25\\Delta\\,\\text{Put})'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-8">
        En actions, cette quantité est structurellement négative. Le Risk Reversal est donc la mesure
        directe et négociable de la pente du smile.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Le vrai Greek du Risk Reversal est le Vanna
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Les Vegas des deux jambes 25-delta sont proches, le Vega net est donc quasi nul. Ce qui reste est
          le Vanna, sensibilité du Vega au spot. Un Call OTM a un Vanna positif (si le spot monte, le Call se rapproche du ATM et donc son Vega augmente), un Put OTM un Vanna
          négatif : donc être short sur le put ajoute encore du Vanna positif. Le Risk Reversal est donc une
          position longue en Vanna, c&apos;est-à-dire une position sur la manière dont le smile se déforme
          quand le marché bouge. Voir{' '}
          <a href="/cours/module-6-volatilite/skew-delta" className="text-blue-600 hover:underline">
            Skew Delta
          </a>
          .
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-2">
          Attention
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Financer un pari haussier en vendant de la protection revient à vendre le risque de krach. Le
          profil est asymétrique dans le mauvais sens : gains fréquents et petits, perte rare et grosse.
          Le crédit initial est donc la rémunération d&apos;un risque de queue.
        </p>
      </div>

      <h3 id="collar" className="text-xl font-semibold text-gray-900 mb-4 scroll-mt-24">
        Collar
      </h3>

      <p className="text-gray-600 leading-relaxed mb-4">
        Position longue sur l&apos;action, plus achat d&apos;un Put OTM <InlineMath>K_1</InlineMath>, plus
        vente d&apos;un Call OTM <InlineMath>K_2</InlineMath>.
      </p>

      <Fiche
        construction={<>long action + long Put <InlineMath>K_1</InlineMath> + short Call <InlineMath>K_2</InlineMath></>}
        vue="Conserver une position en acceptant un tunnel de rendement"
        flux="Ajustable, souvent calibré à coût nul"
        gainMax={<><InlineMath>{'K_2 - S_0'}</InlineMath>, ajusté du flux initial</>}
        perteMax={<><InlineMath>{'S_0 - K_1'}</InlineMath>, ajustée du flux initial</>}
        pointsMorts={<><InlineMath>{'S_T = S_0'}</InlineMath> pour un collar à coût nul</>}
        greeks="Delta compris entre 0 et 1, Vanna négatif (position inverse du Risk Reversal)"
      />

      <p className="text-gray-600 leading-relaxed mb-4">
        <strong className="text-gray-800">Le skew joue contre le collar.</strong>{' '} Ici on fait l&apos;inverse
        d&apos;un Risk Reversal : on achète le put, c&apos;est-à-dire l&apos;aile chère, et on vend le
        call, c&apos;est-à-dire l&apos;aile bon marché. Le skew négatif des actions pénalise donc doublement
        la structure. Conséquence pratique : pour obtenir un collar à coût nul, il faut choisir un strike de
        call beaucoup plus proche de la monnaie qu'intuitivement. Le tunnel obtenu est
        asymétrique, et cette asymétrie est le prix du skew.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Le collar est un call spread déguisé
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Par la parité call-put, une action longue plus un put de strike <InlineMath>K_1</InlineMath>{' '}
          équivaut à un call synthétique de strike <InlineMath>K_1</InlineMath> augmenté d&apos;une
          composante obligataire. En y ajoutant la vente du call <InlineMath>K_2</InlineMath>, on retrouve
          exactement le profil d&apos;un call spread <InlineMath>{'K_1 / K_2'}</InlineMath>. On le voit d'ailleurs en graphique que c'est le même tunnel à échéance.
        </p>
      </div>

      <p className="text-gray-600 leading-relaxed mb-3">
        La même structure existe sur les taux, sous le nom de Collar de taux (achat de Cap, vente de
        Floor) :{' '}
        <a href="/cours/module-5-fixed-income-2/cap-floor" className="text-blue-600 hover:underline">
          Cap &amp; Floor
        </a>
        . Même logique de tunnel, sous-jacent différent.
      </p>

      <p className="text-gray-600 leading-relaxed mb-6">
        La jambe action n&apos;est pas neutre : dividende, coût de financement, borrow. Voir{' '}
        <a href="/cours/module-5-produits-equity/delta-one-cash" className="text-blue-600 hover:underline">
          Delta-One et Cash
        </a>
        .
      </p>


      <h3 id="variantes-financees" className="text-xl font-semibold text-gray-900 mb-4 scroll-mt-24">
        Seagull et Put Spread Collar
      </h3>

      <p className="text-gray-600 leading-relaxed mb-4">
        Deux déclinaisons courantes du même principe : améliorer le prix de la couverture en dégradant
        volontairement une partie du profil.
      </p>

      <p className="text-gray-600 leading-relaxed mb-3">
        <strong className="text-gray-800">Put Spread Collar, ou Seagull.</strong> Construction à quatre
        jambes : long action + long Put <InlineMath>K_2</InlineMath> + short Put <InlineMath>K_1</InlineMath>{' '}
        + short Call <InlineMath>K_3</InlineMath>, avec <InlineMath>{'K_1 < K_2 < K_3'}</InlineMath>. La
        jambe de protection est elle-même un put spread : on renonce à la protection sous{' '}
        <InlineMath>K_1</InlineMath>{' '} (le scénario de krach n'est plus couvert) pour financer la structure moins cher qu&apos;un collar classique.
      </p>

      <p className="text-gray-600 leading-relaxed mb-3">
        Les deux noms désignent exactement la même construction. La différence est d&apos;usage, pas de
        mathématique : on parle de <strong className="text-gray-800">Put Spread Collar</strong> en gestion
        actions, quand il existe une position en titres à couvrir ; on parle de{' '}
        <strong className="text-gray-800">Seagull</strong>{' '} en FX et en structuration, où l&apos;overlay se
        traite seul, sans sous-jacent détenu.
      </p>


      <p className="text-gray-600 leading-relaxed mb-10">
        Le seagull existe aussi en version haussière : long call spread financé par la vente d&apos;un
        put. Cette variante n&apos;a pas d&apos;équivalent &laquo; collar &raquo;, puisqu&apos;elle ne
        couvre aucune position détenue.
      </p>

      <h3 id="ratio-collar" className="text-xl font-semibold text-gray-900 mb-4 scroll-mt-24">
        Ratio Collar
      </h3>

      <p className="text-gray-600 leading-relaxed mb-3">
        <strong className="text-gray-800">Exemple.</strong> Un portefeuille de 1 000 actions à
        100 souhaite se couvrir avec un Put de strike 90, qui coûte 4,02 par action, soit 4 018 au total.
        Le skew négatif rend les calls hors de la monnaie bon marché : un Call de strike 110 ne rapporte
        que 3,86. À nominal égal (1 000 calls vendus), la vente rapporte 3 858 et laisse un résidu de 160
        à payer. Le collar à nominal égal est donc presque exactement autofinancé : le ratio de coût nul
        vaut 1,04.
      </p>

      <p className="text-gray-600 leading-relaxed mb-3">
        <strong className="text-gray-800">Deux sorties.</strong>{' '} Soit s&apos;arrêter là, au ratio
        d&apos;autofinancement : chaque call vendu est adossé à une action détenue, la couverture ne coûte
        rien et le portefeuille reste intégralement couvert. Soit pousser le nominal vendu au-delà de ce
        qui est nécessaire, non plus pour financer le put mais pour encaisser une prime :
        1 600 calls × 3,86 = 6 173 contre 4 018 de puts achetés, soit un crédit net de 2 155, encaissé
        immédiatement. Le ratio entre calls vendus et puts achetés vaut alors 1,6.
      </p>

      <p className="text-gray-600 leading-relaxed mb-3">
        C&apos;est cette seconde sortie qui rend le montage attractif, et c&apos;est exactement ce qui le
        rend dangereux. Le gérant ne cherche pas le coût nul, qu&apos;il avait déjà à nominal égal : il
        vend du nominal supplémentaire pour transformer sa couverture en source de revenu.
      </p>

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 mb-6">
        <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-2">
          Attention
        </p>
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          <strong className="text-gray-800">La queue devient perdante.</strong> Seuls 1 000 des 1 600 calls vendus sont
          couverts par les titres détenus. Les 600 calls restants sont nus. Au-dessus de 110, le
          portefeuille est donc net short 600 actions.
        </p>
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          <strong className="text-gray-800">Si le spot atteint 150.</strong> Les 1 000 titres gagnent
          50 000. Les 1 600 calls vendus perdent 64 000. Le put 90 expire sans valeur. Même en conservant
          le crédit initial de 2 155, le résultat net ressort à <strong className="text-gray-800">−11 845</strong>,
          soit −11,85 par action, alors que le marché a monté de 50 %. La position bascule dans le rouge
          dès 130,26 et se dégrade linéairement au-delà.
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          <strong className="text-gray-800">Conclusion.</strong> Une structure vendue comme couverture
          devient perdante dans le scénario favorable. Le risque de baisse a été échangé contre un risque
          de hausse. Le crédit encaissé à l&apos;initiation n&apos;achète qu&apos;un sursis : il ne
          repousse le point de bascule que de 126,67 à 130,26, soit 3,6 points de spot.
        </p>
      </div>

      <p className="text-gray-600 leading-relaxed mb-3">
        C&apos;est le même mécanisme short gamma que le{' '}
        <a href="#ratio-backspread" className="text-blue-600 hover:underline">
          Ratio Spread
        </a>{' '}
        de la section 2, appliqué ici à une couverture plutôt qu&apos;à un pari directionnel.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Le ratio d&apos;autofinancement est dicté par le skew
        </p>
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Rien dans ce montage ne fixe le ratio à 1,6 : c&apos;est la pente du smile qui décide combien de
          calls il faut vendre pour payer le put. Sur ce couple de strikes 90 / 110, le ratio de coût nul
          vaut <strong className="text-gray-800">0,61</strong> à volatilité plate,{' '}
          <strong className="text-gray-800">1,04</strong> au skew de référence, et{' '}
          <strong className="text-gray-800">1,80</strong> sur un skew deux fois plus creusé. Plus le skew
          est prononcé, plus le put est cher et le call bon marché, donc plus il faut vendre de nominal
          pour équilibrer, et plus la queue haussière se dénude.
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Le curseur de skew de l&apos;
          <a href="#lecture" className="text-blue-600 hover:underline">
            atelier
          </a>{' '}
          permet de le vérifier directement sur le Ratio Collar : en le déplaçant, on regarde le flux
          initial changer de signe, puis on ramène le curseur de ratio jusqu&apos;à annuler ce flux pour
          lire le nouveau ratio d&apos;autofinancement. Le réglage par défaut, n = 1,6, est délibérément
          au-dessus du coût nul — c&apos;est la version qui encaisse une prime ; le ramener à 1,04 restitue
          l&apos;autofinancement exact et fait remonter le point de bascule.
        </p>
      </div>

      <AtelierLink />

      {/* ══════════════════════════════════════════════════════════════
          Section 6 — Les stratégies de convexité
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="convexite" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        6. Convexité
      </h2>

      <p className="text-gray-600 leading-relaxed mb-8">
        Structures à trois ou quatre jambes. On achète les ailes et on vend le corps, ou l&apos;inverse.
        Ce sont des trades sur la convexité, ils donnent directement
        des informations sur le smile.
      </p>

      <h3 id="butterfly" className="text-xl font-semibold text-gray-900 mb-4 scroll-mt-24">
        Butterfly
      </h3>

      <p className="text-gray-600 leading-relaxed mb-4">
        Achat d&apos;une option <InlineMath>K_1</InlineMath>, vente de deux options <InlineMath>K_2</InlineMath>,
        achat d&apos;une option <InlineMath>K_3</InlineMath>, strikes équidistants, même type et même
        échéance.
      </p>

      <Fiche
        construction={<>long 1 <InlineMath>K_1</InlineMath>, short 2 <InlineMath>K_2</InlineMath>, long 1 <InlineMath>K_3</InlineMath></>}
        vue={<>Stagnation du spot au voisinage exact de <InlineMath>K_2</InlineMath></>}
        flux="Débit"
        gainMax={<><InlineMath>{'K_2 - K_1 - P'}</InlineMath>, atteint uniquement pour <InlineMath>{'S_T = K_2'}</InlineMath></>}
        perteMax={<>la prime nette <InlineMath>P</InlineMath></>}
        pointsMorts={<><InlineMath>{'S_T = K_1 + P'}</InlineMath> et <InlineMath>{'S_T = K_3 - P'}</InlineMath></>}
        greeks="Gamma négatif, Vega négatif, Theta positif, Volga positif"
      />

      <h3 id="condor" className="text-xl font-semibold text-gray-900 mb-4 scroll-mt-24">
        Condor
      </h3>

      <p className="text-gray-600 leading-relaxed mb-4">
        Quatre strikes au lieu de trois : achat <InlineMath>K_1</InlineMath>, vente <InlineMath>K_2</InlineMath>,
        vente <InlineMath>K_3</InlineMath>, achat <InlineMath>K_4</InlineMath>.
      </p>

      <Fiche
        construction={<>long <InlineMath>K_1</InlineMath>, short <InlineMath>K_2</InlineMath>, short <InlineMath>K_3</InlineMath>, long <InlineMath>K_4</InlineMath></>}
        vue={<>Stagnation dans la zone <InlineMath>{'[K_2, K_3]'}</InlineMath></>}
        flux="Débit"
        gainMax={<><InlineMath>{'K_2 - K_1 - P'}</InlineMath>, sur tout le plateau <InlineMath>{'[K_2, K_3]'}</InlineMath></>}
        perteMax="La prime nette"
        pointsMorts={<><InlineMath>{'K_1 + P'}</InlineMath> et <InlineMath>{'K_4 - P'}</InlineMath></>}
        greeks="Gamma négatif, Vega négatif, Theta positif, moins concentré que le butterfly"
      />

      <p className="text-gray-600 leading-relaxed mb-10">
        Le condor est un butterfly dont le sommet a été aplati. On échange un gain maximal plus faible
        contre une zone de gain beaucoup plus large. C&apos;est la version réaliste du pari de stagnation :
        le butterfly ne paie pleinement que sur un point, ce qui est rarement une hypothèse tenable.
      </p>

      <h3 id="structures-iron" className="text-xl font-semibold text-gray-900 mb-4 scroll-mt-24">
        Les versions Iron
      </h3>

      <p className="text-gray-600 leading-relaxed mb-4">
        Un butterfly classique est construit avec 100 % de Calls ou 100 % de Puts. La jambe{' '}
        <InlineMath>K_1</InlineMath> est alors dans la monnaie : spread bid-ask large, capital immobilisé,
        et risque d&apos;exercice anticipé si l&apos;option est américaine.
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        La version Iron reproduit exactement le même profil de gain en utilisant un Put Spread (en Bull Spread) pour la
        partie basse et un Call Spread (en Bear Spread) pour la partie haute. Toutes les options utilisées sont OTM
        : meilleure liquidité, meilleure exécution, moins de capital.
      </p>

      <p className="text-gray-600 leading-relaxed mb-3">
        <strong className="text-gray-800">Iron Butterfly</strong> = vente d&apos;un Straddle <InlineMath>K_2</InlineMath>{' '}
        + achat d&apos;un Strangle <InlineMath>{'K_1 / K_3'}</InlineMath>.
      </p>

      <p className="text-gray-600 leading-relaxed mb-6">
        <strong className="text-gray-800">Iron Condor</strong> = vente d&apos;un Strangle{' '}
        <InlineMath>{'K_2 / K_3'}</InlineMath> + achat d&apos;un Strangle plus large{' '}
        <InlineMath>{'K_1 / K_4'}</InlineMath>.
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        Les version Iron s'encaissent donc au crédit, car le strangle serré s'est vendu plus chère que le strangle large acheté.
      </p>

      <h3 id="densite-risque-neutre" className="text-xl font-semibold text-gray-900 mb-4 scroll-mt-24">
        Ce que le Butterfly révèle sur le marché
      </h3>

      <p className="text-gray-600 leading-relaxed mb-3">
        C&apos;est le résultat le plus important de la section. Considérons un butterfly d&apos;ailes{' '}
        <InlineMath>{'\\varepsilon'}</InlineMath> centré en <InlineMath>K</InlineMath> :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center text-gray-900 overflow-x-auto">
        <BlockMath>{'\\frac{C(K - \\varepsilon) - 2C(K) + C(K + \\varepsilon)}{\\varepsilon^2} \\xrightarrow[\\varepsilon \\to 0]{} \\frac{\\partial^2 C}{\\partial K^2}'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-3">
        Or le résultat de Breeden et Litzenberger établit que cette dérivée seconde est exactement la
        densité risque-neutre actualisée du sous-jacent à maturité :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center text-gray-900 overflow-x-auto">
        <BlockMath>{'\\frac{\\partial^2 C}{\\partial K^2} = e^{-rT} \\, \\varphi_{\\mathbb{Q}}(K)'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-8">
        Le prix d&apos;un butterfly est donc, à normalisation près, la probabilité risque-neutre que le
        sous-jacent termine au voisinage de <InlineMath>K</InlineMath>. Le marché des options ne cote pas
        seulement un prix à travers le butterfly mais une distribution complète.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Une surface de vol en AOA
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Une densité étant positive, le prix d&apos;un butterfly ne peut jamais être négatif. Un butterfly
          négatif signifie que la nappe de volatilité viole la contrainte de convexité en strike, et
          constitue une opportunité d&apos;arbitrage. Ce peut être un des tests
          appliqués à la surface de vol pour vérifier ses contraintes. Voir{' '}
          <a href="/cours/module-6-volatilite/vol-implicite-nappes" className="text-blue-600 hover:underline">
            Vol implicite et nappes
          </a>
          .
        </p>
      </div>

      <p className="text-gray-600 leading-relaxed mb-3">
        <strong className="text-gray-800">Le smile se révèle dans ces trois instruments.</strong> Décomposé dans le cours{' '}
          <a href="/cours/module-6-volatilite/vol-stochastique" className="text-blue-600 hover:underline">
            Vol stochastique et smile
          </a> 
        , le smile se décrit par un
        niveau, une pente et une convexité.
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center text-gray-900 overflow-x-auto">
        <BlockMath>{'\\sigma_{ATM} \\quad ; \\quad RR_{25\\Delta} = \\sigma_{25\\Delta C} - \\sigma_{25\\Delta P} \\quad ; \\quad Fly_{25\\Delta} = \\frac{\\sigma_{25\\Delta C} + \\sigma_{25\\Delta P}}{2} - \\sigma_{ATM}'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-8">
        Le Straddle négocie le premier terme, le Risk Reversal le deuxième, le Butterfly le troisième.
        Toute la beauté de ce cours est de montrer que les
        trois familles de cette page (hors spreads) sont les trois axes de paramétrisation
        du smile, rendus négociables sur les marchés. *sous vos applaudissements*
      </p>

      <AtelierLink />

      {/* ══════════════════════════════════════════════════════════════
          Section 7 — Overlay et parité
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="overlay-parite" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        7. Overlay et parité
      </h2>

      <p className="text-gray-600 leading-relaxed mb-8">
        Les structures précédentes sont autonomes. Celles qui suivent se superposent à une position
        existante, ou exploitent la parité call-put pour recréer synthétiquement un instrument que l&apos;on
        ne veut ou ne peut pas détenir directement.
      </p>

      <h3 id="covered-call" className="text-xl font-semibold text-gray-900 mb-4 scroll-mt-24">
        Covered Call
      </h3>

      <p className="text-gray-600 leading-relaxed mb-4">
        Position longue sur l&apos;action, plus vente d&apos;un Call OTM.
      </p>

      <Fiche
        construction={<>long action + short Call <InlineMath>K</InlineMath></>}
        vue="Stagnation ou hausse faible, volonté de générer du rendement"
        flux="Crédit"
        gainMax={<><InlineMath>{'K - S_0 + C'}</InlineMath></>}
        perteMax={<><InlineMath>{'S_0 - C'}</InlineMath> en cas de chute à zéro</>}
        pointsMorts={<><InlineMath>{'S_T = S_0 - C'}</InlineMath></>}
        greeks="Delta positif, Gamma négatif, Vega négatif, Theta positif"
      />

      <p className="text-gray-600 leading-relaxed mb-4">
        Par parité call-put, un covered call est équivalent à une vente de Put nu de même
        strike. Le covered call est présenté comme prudent, la vente de put nu comme
        agressive, alors que les deux positions sont identiques.
      </p>

      <p className="text-gray-600 leading-relaxed mb-10">
        <strong className="text-gray-800"></strong> En actions, le skew négatif
        rend le call hors de la monnaie relativement bon marché. Le covered call vend donc l&apos;aile la
        moins rémunératrice du smile.
      </p>

      <h3 id="cash-secured-put" className="text-xl font-semibold text-gray-900 mb-4 scroll-mt-24">
        Cash-Secured Put
      </h3>

      <p className="text-gray-600 leading-relaxed mb-4">
        Détention de liquidités, plus vente d&apos;un Put de strike <InlineMath>K</InlineMath>, le cash
        couvrant l&apos;obligation d&apos;achat éventuelle.
      </p>

      <Fiche
        construction={<>cash <InlineMath>K</InlineMath> + short Put <InlineMath>K</InlineMath></>}
        vue={<>Accepter d&apos;acheter le sous-jacent à <InlineMath>K</InlineMath>, en étant payé pour attendre</>}
        flux="Crédit"
        gainMax={<>la prime <InlineMath>P</InlineMath></>}
        perteMax={<><InlineMath>{'K - P'}</InlineMath></>}
        pointsMorts={<><InlineMath>{'S_T = K - P'}</InlineMath></>}
        greeks="Delta positif, Gamma négatif, Vega négatif, Theta positif"
      />

      <p className="text-gray-600 leading-relaxed mb-2">
        <strong className="text-gray-800">Vers les produits structurés.</strong>{' '} Remplacer le cash
        par une obligation zéro-coupon et la vente du put nue par une vente de put à barrière donne
        exactement la structure d&apos;un Reverse Convertible. Beaucoup de produits de rendement
        distribués au public repose sur cela. Ce point sera développé dans le module Equity III
        (produits structurés, yield enhancement), à venir.
      </p>


      <h3 id="synthetique-box" className="text-xl font-semibold text-gray-900 mb-4 scroll-mt-24">
        Synthétique, Conversion et Box Spread
      </h3>

      <p className="text-gray-600 leading-relaxed mb-3">
        <strong className="text-gray-800">Le forward synthétique.</strong> Long Call <InlineMath>K</InlineMath>{' '}
        + short Put <InlineMath>K</InlineMath>, même échéance, donne un Delta de 1 et reproduit exactement
        une position forward :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-3 text-center text-gray-900">
        <BlockMath>{'C(K) - P(K) = S_0 e^{-qT} - K e^{-rT}'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        Cette identité n&apos;est pas re-démontrée ici : c&apos;est exactement la relation de parité
        établie et démontrée dans{' '}
        <a href="/cours/module-5-produits-equity/options-vanilles#parite" className="text-blue-600 hover:underline">
          Options Vanilles, section Parité Call-Put
        </a>
        .
      </p>

      <p className="text-gray-600 leading-relaxed mb-8">
        Utile quand la détention directe du titre est coûteuse ou impossible : borrow indisponible,
        contrainte de bilan, restriction réglementaire. Voir{' '}
        <a href="/cours/module-5-produits-equity/delta-one-cash" className="text-blue-600 hover:underline">
          Delta-One et Cash
        </a>
        .
      </p>

      <p className="text-gray-600 leading-relaxed mb-3">
        <strong className="text-gray-800">La Conversion et le Reversal.</strong>{' '}Les Reversals sont l&apos;un des moyens par lesquels le marché optionnel révèle le taux de repo et
        le coût de borrow réels. Ces stratégies sont déjà décrites dans{' '}
        <a href="/cours/module-5-produits-equity/options-vanilles#parite" className="text-blue-600 hover:underline">
          Options Vanilles, section Parité Call-Put
        </a>
        , où elles sont introduites comme des arbitrages qui rétablissent la
        parité. Ici, elles sont utilisées comme des structures de financement à part
        entière.
      </p>

      <p className="text-gray-600 leading-relaxed mb-6">
        
      </p>

      <p className="text-gray-600 leading-relaxed mb-3">
        <strong className="text-gray-800">Le Box Spread.</strong> Un Call Spread <InlineMath>{'K_1 / K_2'}</InlineMath>{' '}
        combiné à un Put Spread <InlineMath>{'K_1 / K_2'}</InlineMath> donne un payoff certain de{' '}
        <InlineMath>{'K_2 - K_1'}</InlineMath>, quel que soit le sous-jacent :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center text-gray-900">
        <BlockMath>{'\\text{Box} = (K_2 - K_1) e^{-rT}'}</BlockMath>
      </div>

      <Fiche
        construction={<>Call Spread <InlineMath>{'K_1/K_2'}</InlineMath> + Put Spread <InlineMath>{'K_1/K_2'}</InlineMath></>}
        vue="Aucune : instrument de financement synthétique, pas de vue de marché"
        flux="Débit ou crédit selon le sens"
        gainMax={<>flux actualisé <InlineMath>{'(K_2-K_1)e^{-rT}'}</InlineMath>, identique à la perte maximum</>}
        perteMax={<>flux actualisé <InlineMath>{'(K_2-K_1)e^{-rT}'}</InlineMath>, identique au gain maximum</>}
        pointsMorts="Aucun : le payoff est constant quel que soit le sous-jacent"
        greeks={<>Delta, Gamma et Vega nuls par construction. Theta strictement positif :{' '}
        <InlineMath>{'\\Theta = r(K_2 - K_1)e^{-r\\tau}'}</InlineMath>, le portage du zéro-coupon
        qui tire la valeur vers <InlineMath>{'K_2 - K_1'}</InlineMath>.</>}
      />

      <p className="text-gray-600 leading-relaxed mb-3">
        Le box spread n&apos;est pas un instrument de marché mais un instrument de financement
        synthétique : acheter un box revient à prêter, en vendre revient à emprunter, au taux implicite du
        marché optionnel.
      </p>

      <p className="text-gray-600 leading-relaxed mb-6">
        Ce Theta positif n&apos;est pas un résidu numérique, c&apos;est la confirmation de la nature de
        l&apos;instrument. Un box acheté vaut <InlineMath>{'(K_2 - K_1)e^{-r\\tau}'}</InlineMath> aujourd&apos;hui
        et <InlineMath>{'K_2 - K_1'}</InlineMath> à l&apos;échéance : sa valeur monte mécaniquement avec le
        temps qui passe, exactement comme celle d&apos;une obligation zéro-coupon qui converge vers son
        pair. Acheter un box revient à prêter, et un prêt rapporte de l&apos;intérêt.
      </p>


      {/* ══════════════════════════════════════════════════════════════
          Section 8 — Réalité d'exécution et synthèse
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="desk-synthese" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        8. Réalité d&apos;exécution et synthèse
      </h2>

      <h3 id="pieges-desk" className="text-xl font-semibold text-gray-900 mb-4 scroll-mt-24">
        Différents risques
      </h3>

      <p className="text-gray-600 leading-relaxed mb-3">
        <strong className="text-gray-800">Le coût d&apos;exécution est multiplié par le nombre de jambes.</strong>{' '}
        Un Iron Condor comporte quatre jambes, donc potentiellement quatre fourchettes bid-ask à franchir.
        Une structure séduisante sur le papier peut être structurellement perdante après frais. C&apos;est
        la raison pour laquelle ces structures se négocient en package, cotées comme un prix unique, et non
        jambe par jambe.
      </p>

      <p className="text-gray-600 leading-relaxed mb-3">
        <strong className="text-gray-800">Le risque de jambe (legging risk).</strong> Exécuter les jambes
        séparément expose au mouvement du marché entre deux exécutions. Une structure delta-neutre à la
        conception peut naître directionnelle.
      </p>

      <p className="text-gray-600 leading-relaxed mb-3">
        <strong className="text-gray-800">Le pin risk.</strong>{' '} À l&apos;approche de l&apos;expiration, si
        le spot est proche du strike du corps d&apos;un butterfly ou d&apos;un short straddle, l&apos;exercice
        de la jambe vendue devient incertain. Le trader ignore, le lundi matin, quel Delta résiduel il
        porte.
      </p>

      <p className="text-gray-600 leading-relaxed mb-3">
        <strong className="text-gray-800">L&apos;exercice anticipé avant détachement de dividende.</strong>{' '}
        Le mécanisme est démontré dans{' '}
        <a href="/cours/module-5-produits-equity/options-vanilles#americaines" className="text-blue-600 hover:underline">
          Options Vanilles, section Le cas des options américaines
        </a>
        . Toutes structures décrites dans ce chapitre sont affectés par ce risque.
      </p>

      <p className="text-gray-600 leading-relaxed mb-3">
        <strong className="text-gray-800">La marge.</strong> Les structures au crédit mobilisent du
        collatéral auprès de la chambre. Le rendement affiché doit être rapporté au capital réellement
        immobilisé durant toute sa durée.
      </p>

      <p className="text-gray-600 leading-relaxed mb-3">
        <strong className="text-gray-800">La liquidité des ailes deep-ITM</strong>,
        argument central en faveur des versions Iron.
      </p>


      <h3 id="tableau-synthese" className="text-xl font-semibold text-gray-900 mb-4 scroll-mt-24">
        Tableau de synthèse
      </h3>

      <p className="text-gray-600 leading-relaxed mb-4">
        Signes donnés à l&apos;initiation, pour une position centrée autour de la monnaie.
      </p>

      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800">Stratégie</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800">Vue exprimée</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800">Δ</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800">Γ</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800">Vega</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800">Θ</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800">Flux initial</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Call Spread', 'Hausse modérée', '+', '±', '±', '±', 'Débit'],
              ['Put Spread', 'Baisse modérée', '−', '±', '±', '±', 'Débit'],
              ['Ratio 1×2', 'Hausse s\u2019arrêtant au corps', '±', '−', '−', '+', 'Crédit'],
              ['Backspread', 'Rupture de régime', '±', '+', '+', '−', 'Débit ou nul'],
              ['Straddle', 'Vol réalisée > implicite', '≈ 0', '+', '+', '−', 'Débit'],
              ['Strangle', 'Mouvement extrême', '≈ 0', '+', '+', '−', 'Débit'],
              ['Calendar Spread', 'Pente de la structure par terme', '≈ 0', '−', '+', '+', 'Débit'],
              ['Risk Reversal', 'Hausse et skew excessif', '+', '≈ 0', '≈ 0', '≈ 0', 'Crédit'],
              ['Collar', 'Protection d\u2019une position longue', '+', '≈ 0', '≈ 0', '≈ 0', '≈ 0'],
              ['Butterfly', 'Stagnation ponctuelle', '≈ 0', '−', '−', '+', 'Débit'],
              ['Condor', 'Stagnation en zone', '≈ 0', '−', '−', '+', 'Débit'],
              ['Iron Condor', 'Stagnation en zone', '≈ 0', '−', '−', '+', 'Crédit'],
              ['Covered Call', 'Stagnation ou hausse faible', '+', '−', '−', '+', 'Crédit'],
              ['Box Spread', 'Aucune, financement', '0', '0', '0', '+', 'Débit'],
            ].map((row, i) => (
              <tr key={row[0]} className={i % 2 === 1 ? 'bg-gray-50' : ''}>
                <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700">{row[0]}</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-600">{row[1]}</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-600">{row[2]}</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-600">{row[3]}</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-600">{row[4]}</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-600">{row[5]}</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-600">{row[6]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Construire ces structures
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Toutes les structures de cette page peuvent être construites jambe par jambe dans le{' '}
          <a href="/simulateur" className="text-blue-600 hover:underline">
            simulateur de positions
          </a>
          , avec visualisation des quatre Greeks.
        </p>
      </div>

      {/* ── Lien quiz ── */}
      <div className="mt-10 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-gray-700">
        Un quiz sur le Module 7 sera bientôt disponible.
      </div>

      {/* ── Navigation Précédent / Suivant ── */}
      <div className="flex justify-between mt-12 pt-6 border-t border-gray-300">
        <a href="/cours/module-5-produits-equity/options-vanilles" className="text-blue-600 hover:underline text-sm">
          ← Options Vanilles
        </a>
        <div />
      </div>

    </article>
  );
}
