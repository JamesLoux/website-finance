import { InlineMath, BlockMath } from '../../../components/Math'
import CallableBondWrapper from './CallableBondWrapper'

export const metadata = {
  title: 'Bond Options & Swaptions — Fixed Income II',
  description: 'Options sur obligations et swaptions : équivalences, modèle de Bachelier, swaptions bermudéennes, grecques du cube de volatilité.',
}

export default function BondOptionsSwaptions() {
  return (
    <article className="px-6 py-12 max-w-3xl">

      {/* Fil d'Ariane */}
      <nav className="text-sm text-gray-500 mb-6">
        <a href="/cours" className="hover:underline">Cours</a>
        <span className="mx-2">›</span>
        <a href="/cours/module-5-fixed-income-2" className="hover:underline">Fixed Income II</a>
        <span className="mx-2">›</span>
        <span className="text-gray-900">Bond Options & Swaptions</span>
      </nav>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">Bond Options & Swaptions</h1>
      <p className="text-gray-600 leading-relaxed mb-10">
        Le chapitre précédent traitait de l&apos;optionnalité sur le marché monétaire (court terme).
        Pour gérer le risque optionnel sur le marché obligataire (long terme), les acteurs se tournent
        vers les Bond Options et surtout leur pendant OTC standardisé et très liquide : le Swaption.
      </p>

      {/* ── Section 1 ── */}
      <h2 id="definition-typologie-equivalence" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        1. Définition, Typologie et Équivalence
      </h2>
      <p className="text-gray-600 leading-relaxed mb-6">
        Un Swaption est une option qui donne à son détenteur le droit, mais non l&apos;obligation, d&apos;entrer dans
        un Swap de Taux (IRS) sous-jacent à une date future déterminée (l&apos;Expiry) et à un taux fixe
        pré-négocié (le Strike).
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">Payer Swaption (Le Put)</p>
          <p className="text-gray-700 text-sm leading-relaxed mb-3">
            Donne le droit de <strong>payer le taux fixe</strong>. On l&apos;exerce si les taux du marché montent
            au-delà du strike. C&apos;est une position Long Rates.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Équivalence obligataire : la hausse des taux fait chuter le prix des obligations.
            Détenir une Payer Swaption est comme détenir un <strong>Put sur Bond</strong>.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">Receiver Swaption (Le Call)</p>
          <p className="text-gray-700 text-sm leading-relaxed mb-3">
            Donne le droit de <strong>recevoir le taux fixe</strong>. On l&apos;exerce si les taux du marché
            baissent sous le strike. C&apos;est une position Short Rates.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Équivalence obligataire : c&apos;est le droit d&apos;acheter un rendement fixe élevé dans un marché où les
            taux se sont effondrés. C&apos;est comme détenir un <strong>Call sur Bond</strong>.
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-8">
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-3">La notation standard du marché — Expiry × Tenor</p>
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Une Swaption notée <strong>1y10y</strong> signifie :
        </p>
        <ul className="text-sm text-gray-700 space-y-1 mb-3">
          <li><strong>Expiry :</strong> la date de décision est dans 1 an.</li>
          <li><strong>Tenor :</strong> si l&apos;option est exercée, l&apos;IRS sous-jacent durera 10 ans.</li>
          <li><strong>Durée totale :</strong> le risque s&apos;étale sur 11 ans au total.</li>
        </ul>
        <p className="text-gray-600 text-sm leading-relaxed">
          Logiquement le sous-jacent que l&apos;on observe aujourd&apos;hui pour pricer cette option est le <strong>taux swap forward
          10 ans dans 1 an</strong>.
        </p>
      </div>

      {/* ── Section 2 ── */}
      <h2 id="pricing-bachelier" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        2. Pricing et Modélisation
      </h2>
      <p className="text-gray-600 leading-relaxed mb-6">
        Pour évaluer un Swaption Européen, on modélise la dynamique du Taux Swap Forward{' '}
        <InlineMath>{'S_{\\text{Fwd}}'}</InlineMath>. Historiquement, le marché utilisait le modèle de Black (1976),
        qui suppose une dynamique lognormale <InlineMath>{'dS = \\sigma S\\, dW'}</InlineMath>. Dans ce cadre,
        la volatilité est exprimée en pourcentage du taux et, par construction, les taux ne peuvent jamais devenir négatifs.
      </p>

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 mb-6">
        <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-2">Le problème des taux négatifs</p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Avec l&apos;avènement des taux négatifs en zone Euro, le modèle lognormal a mathématiquement explosé :
          il est impossible de prendre le logarithme d&apos;un taux négatif. Le marché a donc basculé sur le
          modèle normal de Bachelier.
        </p>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        Le Modèle Normal repose sur un mouvement brownien arithmétique :
      </p>
      <div className="mb-6 text-center">
        <BlockMath>{'dS = \\sigma_N\\, dW'}</BlockMath>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">Conséquence 1</p>
          <p className="text-gray-700 text-sm leading-relaxed">
            Les taux peuvent franchir zéro sans problème mathématique.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">Conséquence 2</p>
          <p className="text-gray-700 text-sm leading-relaxed">
            La volatilité implicite n&apos;est plus exprimée en pourcentage, mais en <strong>points de base par an (bps/an)</strong>.
          </p>
        </div>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        Le payoff d&apos;une Payer Swaption à l&apos;exercice est :
      </p>
      <div className="bg-gray-100 rounded-xl px-8 py-6 mb-6 text-center">
        <BlockMath>{'\\text{Payoff} = N \\times \\text{Annuité} \\times \\max(S_{\\text{Fwd}} - K,\\, 0)'}</BlockMath>
      </div>
      <p className="text-gray-600 leading-relaxed mb-4">
        L&apos;Annuité est simplement le facteur qui convertit un taux en cash : <InlineMath>{'\\text{Annuité} = \\sum_{i=1}^{n} \\delta_i \\cdot DF(t_i)'}</InlineMath>, c&apos;est la somme des
        facteurs d&apos;actualisation sur toutes les échéances du swap sous-jacent. Elle joue
        le rôle du notional dans une option sur action, elle transforme un écart de taux
        en euros.
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        Sous le modèle Normal, <InlineMath>{'S_{\\text{Fwd}}'}</InlineMath> suit une loi normale de moyenne{' '}
        <InlineMath>{'F'}</InlineMath> (le forward) et d&apos;écart-type{' '}
        <InlineMath>{'\\sigma_N \\sqrt{T}'}</InlineMath>. Le prix du Payer Swaption est donc
        l&apos;espérance actualisée du payoff sous la mesure Annuité :
      </p>
      <div className="mb-4 text-center">
        <BlockMath>{'V_{\\text{Payer}} = N \\times \\text{Annuité} \\times \\mathbb{E}^A\\bigl[\\max(S_{\\text{Fwd}} - K,\\, 0)\\bigr]'}</BlockMath>
      </div>
      <p className="text-gray-600 leading-relaxed mb-4">
        C&apos;est exactement le même calcul que pour la formule de Black-Scholes (une espérance d&apos;un
        max avec une loi gaussienne) sauf que la loi est ici normale (pas log-normale). L&apos;intégrale
        se résout de la même façon, par scission en deux blocs et complétion, et donne :
      </p>
      <div className="bg-gray-100 rounded-xl px-8 py-6 mb-4 text-center">
        <BlockMath>{'V_{\\text{Payer}} = N \\times \\text{Annuité} \\times \\bigl[\\,(F - K)\\,\\mathcal{N}(d) + \\sigma_N\\sqrt{T}\\,\\mathcal{n}(d)\\,\\bigr]'}</BlockMath>
      </div>
      <p className="text-gray-600 leading-relaxed mb-4">
        avec <InlineMath>{'d = (F - K)/(\\sigma_N \\sqrt{T})'}</InlineMath>.
        Le premier terme <InlineMath>{'(F-K)\\,\\mathcal{N}(d)'}</InlineMath> est la valeur intrinsèque
        pondérée par la probabilité d&apos;exercice. Le second terme{' '}
        <InlineMath>{'\\sigma_N\\sqrt{T}\\,\\mathcal{n}(d)'}</InlineMath> est la valeur temps : il ne
        dépend que de la volatilité et disparaît à maturité.
      </p>
      <p className="text-gray-600 leading-relaxed mb-8">
        La symétrie est simple : ATM (<InlineMath>{'F = K'}</InlineMath>), le premier terme s&apos;annule
        et seule la valeur temps subsiste. Plus la volatilité est grande, plus cette valeur temps est
        élevée.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-8">
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">Le Cube de Volatilité</p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Contrairement aux options sur actions dont la volatilité se lit sur une surface 2D (Strike × Maturité),
          les Swaptions requièrent une dimension supplémentaire. Les traders pricent et couvrent leurs positions
          sur un <strong>cube de volatilité 3D</strong> défini par{' '}
          <InlineMath>{'(\\text{Strike},\\ \\text{Expiry},\\ \\text{Tenor})'}</InlineMath>. Du point de vue du strike, c'est un smile que l'on observe.
          Du point de vue du Tenor, c'est un skew.
        </p>
      </div>

      {/* ── Section 3 ── */}
      <h2 id="bermudeennes-callable-bonds" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        3. Swaptions Bermudéens et Callable Bonds
      </h2>
      <p className="text-gray-600 leading-relaxed mb-6">
        Au-delà des Swaptions européens, exerçables à une seule date, les banques traitent massivement
        des <strong>Swaptions Bermudéens</strong>, exerçables à des dates multiples prédéfinies (donc discrètes).
        Une notation comme <strong>10nc1</strong> (10 ans, non-callable 1 an) signifie que l&apos;option
        peut être exercée à chaque date anniversaire à partir de la première année jusqu&apos;à la dixième.
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        Elles sont le moteur de l&apos;émission des <strong>Callable Bonds</strong>. Pour un
        structurer, un Callable Bond revient à une décomposition simple :
      </p>
      <div className="bg-gray-100 rounded-xl px-8 py-6 mb-6 text-center">
        <BlockMath>{"\\text{Callable Bond} = \\text{Bond Fixe} + \\text{Vente d'une Receiver Swaption Bermudéen}"}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        Rappel : un Receiver Swaption est comme un Call sur Bond. S'il est bermudéen, c'est comme si le Bond était américain.
      </p>

      <p className="text-gray-600 leading-relaxed mb-6">
        L&apos;émetteur se donne le droit de rembourser par anticipation si les taux baissent, il vend la volatilité implicite de la Bermudéen au marché. Cette prime encaissée lui permet
        de gonfler le coupon de son obligation pour la rendre plus attractive. L&apos;investisseur quant à lui accepte
        en échange le risque d&apos;être remboursé prématurément si les taux baissent.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6">
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">L&apos;analogie du Covered Call</p>
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          La structure est exactement celle d&apos;un <strong>Covered Call</strong> en actions : on détient le
          sous-jacent (le Bond Fixe) et on vend le Call dessus (la Receiver Swaption Bermudéenne = Call
          américain sur Bond). On encaisse la prime (ici matérialisée par un coupon bonifié) mais on
          cède la convexité.
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Si les taux baissent fortement, un Bond classique verrait son prix monter de plus en plus vite
          (convexité positive). Le Callable Bond est rappelé avant, en réalité l&apos;investisseur ne profite jamais
          de cette accélération. C&apos;est exactement le phénomène de <strong>convexité négative</strong>{' '}
          décrit dans la page Duration & Convexité.
        </p>
      </div>

      <CallableBondWrapper />

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6">
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">La complexité du pricing — Optimal Stopping Time</p>
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Pricer un Swaption Bermudéen est l&apos;un des défis majeurs de l&apos;ingénierie financière :
          c&apos;est un produit path-dependent. L&apos;algorithme doit décider, à chaque temps d'arrêt, s&apos;il est plus
          rentable d&apos;exercer immédiatement ou d&apos;attendre.
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          La formule de Bachelier fermée ne s&apos;applique plus. On doit recourir à des arbres ou des EDP
          via des modèles de taux courts (Hull-White), ou à des méthodes de Monte Carlo avec
          l&apos;algorithme de <strong>Longstaff-Schwartz</strong> : régression par moindres carrés pour
          estimer la valeur de continuation à chaque pas de temps. C'est ce qu'on utilise également pour pricer les options américaines. Pour aller plus loin sur ce sujet, consulter mon projet final d'études dans la section "À propos" du site.
        </p>
      </div>

      {/* ── Section 4 ── */}
      <h2 id="trading-grecques-cube" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        4. Trading de Volatilité : les Greeks du Cube
      </h2>
      <p className="text-gray-600 leading-relaxed mb-6">
        Un desk d&apos;options de taux ne parie pas seulement sur la direction des taux, il parie sur
        l&apos;évolution de la <strong>forme du cube de volatilité</strong>. Acheter un Swaption génère
        trois sensibilités :
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">Long Vega</p>
          <p className="text-gray-700 text-sm leading-relaxed">
            Le trader gagne si la volatilité implicite globale monte.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">Long Gamma</p>
          <p className="text-gray-700 text-sm leading-relaxed">
            Le trader gagne sur les grands mouvements brusques du sous-jacent.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">Short Theta</p>
          <p className="text-gray-700 text-sm leading-relaxed">
            Chaque jour qui passe sans mouvement ampute la valeur de la prime.
          </p>
        </div>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        Puisque le Vega se trade sur tous les points du cube, un market maker ne se contente pas d&apos;être
        directionnel sur la volatilité, il trade la <strong>déformation du cube</strong>.
        Par exemple, s&apos;il estime que la volatilité court terme est surévaluée par rapport à celle à
        moyen terme, il monte un portefeuille combiné :
      </p>
      <div className="mb-6 text-center">
        <BlockMath>{'\\text{Stratégie} = \\text{Long Vega}_{\\,5y5y} + \\text{Short Vega}_{\\,1y10y}'}</BlockMath>
      </div>
      <p className="text-gray-600 leading-relaxed mb-8">
        Il isole ainsi un risque très pur : une pentification ou un aplatissement de la structure par terme
        de la volatilité implicite, tout en restant immunisé contre un choc parallèle de cette même volatilité.
      </p>

      {/* ── Lien quiz ── */}
      <div className="mt-10 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-gray-700">
        Le quiz du Module 5 est disponible —{' '}
        <a href="/quiz/module-5" className="text-blue-600 hover:underline font-medium">S&apos;entraîner →</a>
      </div>

      {/* ── Navigation Précédent / Suivant ── */}
      <div className="flex justify-between mt-12 pt-6 border-t border-gray-300">
        <a href="/cours/module-5-fixed-income-2/cap-floor" className="text-blue-600 hover:underline text-sm">
          ← Cap & Floor
        </a>
        <a href="/cours/module-5-fixed-income-2/cms" className="text-blue-600 hover:underline text-sm">
          CMS →
        </a>
      </div>

    </article>
  )
}
