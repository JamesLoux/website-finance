import Link from 'next/link';
import { InlineMath, BlockMath } from '../../../components/Math';
import CallValueChart from '../../components/CallValueChart';

export const metadata = {
  title: "Options Vanilles — Finance according to James",
  description:
    "Le contrat d'option, ses conventions, la parité Call-Put, la valeur temps et le cas des options américaines.",
};

export default function OptionsVanillesPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12">

      {/* ── Fil d'Ariane ── */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/cours" className="hover:text-blue-600 transition-colors">Cours</Link>
        <span>/</span>
        <span className="text-gray-500">Module 7 — Equity I</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">Options Vanilles</span>
      </nav>

      {/* ── Titre ── */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
        Options Vanilles
      </h1>

      {/* ── Introduction ── */}
      <p className="text-lg text-gray-600 leading-relaxed mb-10">
        Une option est un contrat qui donne le droit, mais non l'obligation, d'acheter (call) ou de vendre (put) un sous-jacent à un prix fixé (strike) à une date donnée (maturité). Le prix payé pour ce droit s'appelle la prime.
        Une option vanille n&apos;est donc pas un pari directionnel simple, car on ne trade pas l&apos;action : on trade la distribution des
        prix futurs du sous-jacent, et donc la volatilité. Cette page traite le contrat lui-même et les
        relations d&apos;arbitrage qui le lient au marché comptant. Le pricing et les sensibilités sont
        traités dans les modules amont.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 1 — Le contrat et ses conventions
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="contrat" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-24">
        1. Le contrat
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Une option est un contrat, avec des
        conventions de marché qui déterminent son prix autant que sa formule. Le sous-jacent d&apos;une
        option equity est le plus souvent une action ou un indice, dont le comportement de portage
        (financement, dividende, repo) a été traité dans{' '}
        <a href="/cours/module-5-produits-equity/delta-one-cash" className="text-blue-600 hover:underline">
          Delta-One et Cash
        </a>
        . C&apos;est ce comportement qui fixe le Forward, et le Forward est ce sur quoi l&apos;option est
        réellement pricée.
      </p>

      <p className="text-gray-600 leading-relaxed mb-6">
        Les cinq paramètres du contrat : le sous-jacent (<InlineMath>S</InlineMath>), le prix d&apos;exercice (strike, noté{' '}
        <InlineMath>K</InlineMath>), la date d&apos;échéance (maturité, notée <InlineMath>T</InlineMath>),
        le sens (call ou put) et le style d&apos;exercice (européen ou américain). Le prix payé à
        l&apos;origine s&apos;appelle la prime.
      </p>

      <p className="text-gray-600 leading-relaxed mb-6">
        <strong className="text-gray-800">Le style d&apos;exercice.</strong> Une option européenne ne
        s&apos;exerce qu&apos;à la date <InlineMath>T</InlineMath>. Une option américaine s&apos;exerce à
        tout moment jusqu&apos;à <InlineMath>T</InlineMath>. Cette distinction détermine s&apos;il existe une formule fermée pour le prix (section 5).
      </p>

      <p className="text-gray-600 leading-relaxed mb-6">
        <strong className="text-gray-800">Listed contre OTC.</strong> Une option listée s&apos;échange sur
        un marché organisé (Eurex, CBOE) avec des strikes et des échéances standardisés, une chambre de
        compensation et une quotité fixe (typiquement 100 actions par contrat aux États-Unis, 1 sur les
        indices européens selon le contrat). Une option OTC est négociée de gré à gré : strike, maturité et
        nominal sont libres, mais il y a un vrai risque de contrepartie et de liquidité dépendant du dealer.
      </p>

      <p className="text-gray-600 leading-relaxed mb-6">
        <strong className="text-gray-800">Le règlement.</strong> À l&apos;exercice, deux modes coexistent.
        Le règlement physique livre effectivement le sous-jacent contre le strike : c&apos;est la norme sur
        les options single-stock. Le règlement cash verse la différence en espèces : c&apos;est la norme
        sur les options sur indices, où livrer les 500 composants du S&amp;P n&apos;aurait aucun sens.
      </p>

      <p className="text-gray-600 leading-relaxed mb-8">
        <strong className="text-gray-800">Les échéances.</strong> Les options listées expirent à des dates
        standardisées, historiquement le troisième vendredi du mois. Les échéances trimestrielles (mars,
        juin, septembre, décembre) concentrent l&apos;essentiel de l&apos;open interest et génèrent des
        flux de couverture importants à l&apos;approche de l&apos;expiration.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          On ne cote pas une option en prix, on la cote en volatilité
        </p>
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Sur le marché OTC, un dealer ne répond pas &laquo; cette option vaut 4,20 euros &raquo; mais
          &laquo; je traite cette option à 18 de vol &raquo;. La raison est pratique : le prix en euros
          bouge à chaque tick du sous-jacent, alors que la volatilité implicite est stable sur des horizons
          bien plus longs. Deux contreparties qui s&apos;accordent sur un niveau de vol peuvent recalculer
          le prix à tout moment via Black-Scholes, qui joue ici le rôle de simple convertisseur entre une
          vol et un prix, vu que tous les autres paramètes de l'équation sont connus.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          La construction de cette surface de volatilité implicite, sa forme et ses régimes de déformation
          font l&apos;objet du{' '}
          <a href="/cours/module-6-volatilite/vol-implicite-nappes" className="text-blue-600 hover:underline">
            Module 10 — Volatilité
          </a>
          . Retenir ici que le prix affiché sur un écran d&apos;options est presque toujours une
          conversion, pas une donnée primaire.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 2 — Payoffs et asymétrie
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="payoff" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        2. Payoffs et asymétrie
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Une option européenne ne s&apos;exerce qu&apos;à sa date d&apos;échéance. Son profil de gain à
        maturité dépend uniquement du prix final du sous-jacent, noté <InlineMath>{'S_T'}</InlineMath>,
        comparé au strike <InlineMath>K</InlineMath>.
      </p>

      <p className="text-gray-600 leading-relaxed mb-3">
        Le Call (option d&apos;achat) confère le droit d&apos;acheter à <InlineMath>K</InlineMath>.
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center text-gray-900">
        <BlockMath>{'\\text{Payoff}_{Call} = \\max(S_T - K, 0)'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-3">
        Le Put (option de vente) confère le droit de vendre à <InlineMath>K</InlineMath>.
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center text-gray-900">
        <BlockMath>{'\\text{Payoff}_{Put} = \\max(K - S_T, 0)'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-8">
        L&apos;asymétrie est la propriété fondatrice. Le payoff est plat sur une moitié de l&apos;espace
        des prix et linéaire sur l&apos;autre. L&apos;acheteur d&apos;un call ne peut pas perdre plus que
        sa prime, alors que son gain est non borné. Le vendeur subit exactement le profil inverse : gain
        plafonné à la prime encaissée, perte non bornée sur un short call, et bornée à{' '}
        <InlineMath>K</InlineMath> sur un short put puisque le sous-jacent ne peut pas descendre sous zéro.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Asymétrie du payoff et risque Gamma sont deux choses distinctes
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Le risque de perte non bornée du vendeur de call est une propriété statique du payoff à
          maturité. Il existerait même si le vendeur ne couvrait jamais sa position. Le risque Gamma est
          autre chose : c&apos;est le coût de recouverture d&apos;une position delta-neutre entre deux
          rebalancements, qui vient du fait que le payoff est une fonction convexe de{' '}
          <InlineMath>S</InlineMath>. Cette convexité donne un Gamma positif à l&apos;acheteur, dont la
          contrepartie est un Theta négatif : il paie du temps pour acheter de la convexité. Le vendeur
          encaisse le Theta et porte le Gamma négatif. Confondre les deux notions conduit à mal évaluer une
          position couverte.
        </p>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        La convexité du payoff en <InlineMath>S</InlineMath> est exactement ce que mesure le Gamma, dont la
        construction formelle est faite dans{' '}
        <a href="/cours/module-3-grecques/grecques-second-ordre" className="text-blue-600 hover:underline">
          Quelques démonstrations
        </a>{' '}
        du Module 3.
      </p>

      <p className="text-gray-600 leading-relaxed mb-8">
        Le mécanisme complet par lequel un vendeur d&apos;option finance son Gamma négatif avec son Theta
        positif, et les conditions dans lesquelles cet échange est gagnant, sont traités dans{' '}
        <a href="/cours/module-3-grecques/arbitrage-theta-gamma" className="text-blue-600 hover:underline">
          Arbitrage Theta-Gamma
        </a>
        . C&apos;est le vrai P&amp;L d&apos;un desk de volatilité, et il n&apos;a que peu à voir avec le
        profil de payoff dessiné ci-dessus.
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        Le graphique suivant illustre justement cette différence entre le payoff à maturité et le prix
        avant échéance : la prime d&apos;un Call européen (son prix en courbe pleine) reste toujours au-dessus de sa
        valeur intrinsèque (le payoff en pointillés). La valeur temps fait l'objet de la section 4 de cette page.
      </p>
      <CallValueChart />

      {/* ══════════════════════════════════════════════════════════════
          Section 3 — La parité Call-Put
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="parite" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        3. Parité Call-Put
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        C&apos;est la relation la plus importante du marché des dérivés.
      </p>

      <p className="text-gray-600 leading-relaxed mb-3">
        Pour deux options européennes de même strike <InlineMath>K</InlineMath> et même maturité{' '}
        <InlineMath>T</InlineMath>, sur le même sous-jacent :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-3 text-center text-gray-900">
        <BlockMath>{'C - P = e^{-rT}(F - K) = Se^{-qT} - Ke^{-rT}'}</BlockMath>
      </div>
      <p className="text-gray-500 text-sm leading-relaxed mb-8 text-center">
        où <InlineMath>F</InlineMath> est le prix forward du sous-jacent à l&apos;échéance{' '}
        <InlineMath>T</InlineMath>.
      </p>

      <p className="text-gray-600 leading-relaxed mb-8">
        Cette relation découle uniquement de
        l&apos;absence d&apos;opportunité d&apos;arbitrage. C&apos;est ce qui la rend si contraignante :
        elle doit tenir quel que soit l&apos;état du marché.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-4">Les deux arbitrages</h3>

      <p className="text-gray-600 leading-relaxed mb-4">
        Acheter un call et vendre un put de même strike revient exactement à détenir un forward
        synthétique. Si l&apos;égalité est rompue, deux montages la rétablissent :
      </p>

      <p className="text-gray-600 leading-relaxed mb-3">
        <strong className="text-gray-800">La Conversion</strong> : achat de l&apos;action au comptant +
        achat du put + vente du call. On détient l&apos;actif et on verrouille son prix de vente à{' '}
        <InlineMath>K</InlineMath>.
      </p>

      <p className="text-gray-600 leading-relaxed mb-6">
        <strong className="text-gray-800">La Reversal</strong> : vente à découvert de l&apos;action + achat
        du call + vente du put. Position inverse, qui exige d&apos;emprunter le titre.
      </p>

      <p className="text-gray-600 leading-relaxed mb-8">
        Les fourchettes bid-ask transforment l&apos;égalité en un
        couloir de non-arbitrage. Un titre difficile à emprunter (hard-to-borrow) rend la Reversal
        coûteuse, puisqu&apos;il faut payer le borrow. Un dividende non anticipé déplace{' '}
        <InlineMath>F</InlineMath> et donc la relation entière. Cette structure de parité se retrouve également sur la parité Cap-Floor-Swap qui joue exactement le même rôle et se démontre de la même façon : voir{' '}
        <a href="/cours/module-5-fixed-income-2/cap-floor" className="text-blue-600 hover:underline">
          Cap &amp; Floor
        </a>{' '}
        dans le Module 5.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-4">L&apos;usage inverse : extraire l&apos;information du marché</h3>

      <p className="text-gray-600 leading-relaxed mb-6">
        Sur un desk, on n&apos;utilise presque jamais la parité pour vérifier qu&apos;elle tient. On
        l&apos;utilise à l&apos;envers. À partir des prix de call et de put cotés sur le marché, on inverse
        la relation pour en déduire le Forward implicite, et de là le repo et le dividende anticipé par le
        marché.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Deux chemins vers la même information
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          La page précédente extrayait le repo implicite depuis l&apos;écart entre le Forward coté et le
          Spot. La parité Call-Put donne la même information depuis le marché optionnel. Sur beaucoup de
          sous-jacents, le marché des options est plus liquide et plus profond que celui du forward OTC, ce
          qui fait de la parité le canal d&apos;information privilégié. Un écart persistant entre les deux
          estimations du repo n&apos;est pas une erreur de calcul : c&apos;est un signal, souvent lié à une
          tension sur l&apos;emprunt de titres ou à un désaccord sur un dividende à venir. L&apos;extraction
          du repo depuis le spread Forward/Spot, ainsi que les notions de borrow et de base, sont détaillées
          dans la section 3 de{' '}
          <a href="/cours/module-5-produits-equity/delta-one-cash" className="text-blue-600 hover:underline">
            Delta-One et Cash
          </a>
          . La parité Call-Put en est le pendant sur le marché optionnel.
        </p>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-4">Une volatilité implicite unique</h3>

      <p className="text-gray-600 leading-relaxed mb-6">
        Puisque la parité relie les prix sans passer par un modèle, un call et un put européens de même
        strike et même maturité ont nécessairement la même volatilité implicite. Si on inversait
        Black-Scholes séparément sur le call et sur le put et qu&apos;on obtenait deux vols différentes,
        l&apos;écart serait immédiatement arbitrable. C&apos;est la raison pour laquelle une nappe de
        volatilité n&apos;a qu&apos;une seule valeur par couple <InlineMath>{'(K,T)'}</InlineMath>, et non
        deux. C&apos;est cette unicité qui rend une nappe de volatilité bien définie. Sa construction, ses
        contraintes d&apos;absence d&apos;arbitrage et sa lecture sont traitées dans{' '}
        <a href="/cours/module-6-volatilite/vol-implicite-nappes" className="text-blue-600 hover:underline">
          Vol implicite et nappes
        </a>
        .
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-4">Le cas américain : l&apos;égalité devient un encadrement</h3>

      <p className="text-gray-600 leading-relaxed mb-3">
        La parité américaine sera expliquée dans la section 5 de cette page.
      </p>
      <p className="text-gray-600 leading-relaxed mb-8">
        Précision de vocabulaire : les bornes dites de Merton ne désignent pas cet encadrement mais les
        bornes de non-arbitrage sur le prix d&apos;une option seule, par exemple{' '}
        <InlineMath>{'C \\geq \\max(S_0 - Ke^{-rT}, 0)'}</InlineMath> pour un call européen. Ces bornes
        sont ce qui garantit qu&apos;une surface de prix d&apos;options est cohérente, et elles
        contraignent aussi la monotonie et la convexité du prix en fonction du strike.
      </p>


      {/* ══════════════════════════════════════════════════════════════
          Section 4 — Valeur temps et moneyness
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="valeur-temps" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        4. Valeur temps et moneyness
      </h2>

      <h3 className="text-xl font-semibold text-gray-900 mb-4">La décomposition</h3>

      <p className="text-gray-600 leading-relaxed mb-3">
        Le prix d&apos;une option se décompose toujours en deux termes :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center text-gray-900">
        <BlockMath>{'\\text{Prix} = \\text{Valeur intrinsèque} + \\text{Valeur temps}'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        La valeur intrinsèque est le gain qu&apos;on obtiendrait si l&apos;option expirait à l&apos;instant
        présent, soit <InlineMath>{'\\max(S-K,0)'}</InlineMath> pour un call. Elle est toujours positive ou
        nulle (voir graphique section 2).
      </p>

      <p className="text-gray-600 leading-relaxed mb-6">
        La valeur temps est le reste : l&apos;incertitude quantifiée sur la trajectoire future du
        sous-jacent. Plus la volatilité est élevée et plus l&apos;échéance est lointaine, plus ce terme est
        important. La formule fermée qui donne ce prix, et donc la valeur temps par différence, est établie et démontrée
        dans{' '}
        <a href="/cours/module-2-pricing/probabilites-d1-d2" className="text-blue-600 hover:underline">
          Formule de Black-Scholes
        </a>{' '}
        du Module 2.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-4">Le maximum est à l&apos;ATM forward, pas à l&apos;ATM spot</h3>

      <p className="text-gray-600 leading-relaxed mb-4">
        La valeur temps atteint son maximum quand le strike est égal au Forward, pas au Spot. On parle
        alors d&apos;option ATMF. Sur des maturités courtes et des taux faibles la différence est
        négligeable, mais sur une maturité longue ou un sous-jacent à fort rendement de dividende,
        l&apos;écart devient significatif. C&apos;est la première raison pour laquelle un desk raisonne en
        moneyness forward.
      </p>

      <p className="text-gray-600 leading-relaxed mb-8">
        Loin de la monnaie, la valeur temps s&apos;écrase. Une option très hors de la monnaie devient un
        contrat quasiment mort, avec un Delta proche de zéro.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-4">La moneyness sur un desk</h3>

      <p className="text-gray-600 leading-relaxed mb-6">
        Trois façons de situer une option, de la plus naïve à la plus opérationnelle.
      </p>

      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800">Type</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800">Formule</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800">Usage sur le desk</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700">Spot moneyness</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-600"><InlineMath>S/K</InlineMath></td>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Basique. Indique simplement si l&apos;option est dans, à, ou hors de la monnaie.</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700">Forward moneyness</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-600"><InlineMath>F/K</InlineMath> ou <InlineMath>{'\\ln(K/F)'}</InlineMath></td>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Le standard. Les options sont pricées sur le Forward. Une option est vraiment à la monnaie, dite ATMF, quand <InlineMath>K=F</InlineMath>.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700">Delta moneyness</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-600"><InlineMath>{'\\Delta'}</InlineMath>, ex. un put 25-delta</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">La métrique de cotation. Un trader demande le prix du call 25-delta, pas celui du call de strike 4 350. Elle suit automatiquement le marché.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        Le fait de coter en delta plutôt qu&apos;en strike a une conséquence directe sur la façon dont le
        smile se déforme quand le spot bouge, et sur le delta réel d&apos;une position. Ces régimes sont
        traités dans{' '}
        <a href="/cours/module-6-volatilite/skew-delta" className="text-blue-600 hover:underline">
          Skew Delta
        </a>
        .
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-4">Ce que N(d₁) et N(d₂) sont vraiment</h3>

      <p className="text-gray-600 leading-relaxed mb-4">
        On dit souvent que le Delta <InlineMath>{'N(d_1)'}</InlineMath>{' '} est la probabilité
        d&apos;exercice de l'option, et donc la proba que le sous-jacent finisse dans la monnaie à échéance (<InlineMath>{'S(T) > K'}</InlineMath>). On dit aussi communément que la vraie probabilité est donnée par le Dual Delta <InlineMath>{'N(d_2)'}</InlineMath>. C&apos;est inexact sur les
        deux points.
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        <InlineMath>{'N(d_2)'}</InlineMath> est la probabilité d&apos;exercice sous la mesure
        risque-neutre, celle dont le numéraire est le compte en cash. <InlineMath>{'N(d_1)'}</InlineMath>{' '}
        est aussi une probabilité exacte, mais sous une autre mesure : celle dont le numéraire est
        l&apos;action elle-même. Le changement de numéraire qui fait apparaître ces deux probabilités sous deux mesures
        différentes est construit dans{' '}
        <a href="/cours/module-1-calcul-stochastique/girsanov-risque-neutre" className="text-blue-600 hover:underline">
          Girsanov et Risque-Neutre
        </a>
        . C&apos;est le même outil qui sert ensuite pour les options quanto (module 11).
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        Par ailleurs, le Dual Delta est défini comme <InlineMath>{'-\\partial C/\\partial K = e^{-rT}N(d_2)'}</InlineMath>,
        et non <InlineMath>{'N(d_2)'}</InlineMath> seul. Le facteur d&apos;actualisation compte.
      </p>

      <p className="text-gray-600 leading-relaxed mb-8">
        En pratique, sur des maturités courtes, l&apos;écart entre <InlineMath>{'N(d_1)'}</InlineMath> et{' '}
        <InlineMath>{'N(d_2)'}</InlineMath> reste faible, ce qui explique pourquoi le raccourci &laquo; un
        put 25-delta a 25 % de chances de finir dans la monnaie &raquo; survit sur les desks. Il reste un
        raccourci.
      </p>

      
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Le piège : la valeur temps peut être négative</h3>

      <p className="text-gray-600 leading-relaxed mb-4">
        Déjà abordé dans la section 4 de la page {' '}
        <a href="/cours/module-3-grecques/arbitrage-theta-gamma" className="text-blue-600 hover:underline">
          Arbitrage Theta-Gamma
        </a> 
         du module 2, le theta peut être positif dans le cas d'un put
        européen deep ITM, autrement dit sa valeur temps peut être négative.
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        Le prix d&apos;un put européen est borné : il ne peut jamais dépasser la valeur actualisée du
        strike, soit <InlineMath>{'Ke^{-rT}'}</InlineMath>. Or pour un put très dans la monnaie, la valeur
        intrinsèque <InlineMath>{'K-S'}</InlineMath> s&apos;approche de <InlineMath>K</InlineMath>, qui est
        supérieur à <InlineMath>{'Ke^{-rT}'}</InlineMath> dès que les taux sont positifs. La valeur temps
        est donc négative : le put européen deep ITM cote sous sa valeur intrinsèque.
      </p>

      <p className="text-gray-600 leading-relaxed mb-6">
        Pour un call sans dividende, l&apos;inégalité inverse est vraie. On a{' '}
        <InlineMath>{'C \\geq S_0 - Ke^{-rT} \\geq S_0 - K'}</InlineMath>, donc la valeur temps reste
        toujours positive ou nulle.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Cette asymétrie est la clé de toute la section 5
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Un put européen deep ITM vaut moins que ce qu&apos;il rapporterait immédiatement, parce que son
          détenteur doit attendre <InlineMath>T</InlineMath> pour toucher <InlineMath>K</InlineMath> et
          perd donc les intérêts sur ce montant. Un call, lui, ne subit jamais cette pénalité. C&apos;est
          exactement pour cette raison qu&apos;un put américain est exercé par anticipation et qu&apos;un
          call américain sans dividende ne l&apos;est jamais. La section suivante ne fait qu&apos;exploiter
          cette asymétrie.
        </p>
      </div>


      {/* ══════════════════════════════════════════════════════════════
          Section 5 — Le cas des options américaines
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="americaines" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        5. Le cas des options américaines
      </h2>

      <p className="text-gray-600 leading-relaxed mb-3">
        Une option américaine peut être exercée à tout moment jusqu&apos;à l&apos;échéance. L&apos;acheteur
        détient donc un droit supplémentaire, sans contrepartie, ce qui impose :
      </p>

      <p className="text-gray-600 leading-relaxed mb-6 text-center">
        <InlineMath>{'V_{am} \\geq V_{eur}'}</InlineMath>
      </p>

      <p className="text-gray-600 leading-relaxed mb-8">
        L&apos;écart entre les deux s&apos;appelle la prime d&apos;exercice anticipé. Toute la question est
        de savoir quand elle est strictement positive.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-4">Le call américain : presque jamais exercé</h3>

      <p className="text-gray-600 leading-relaxed mb-4">
        Sur une action sans dividende, il n&apos;est jamais optimal d&apos;exercer un call américain avant
        l&apos;échéance. Exercer revient à payer <InlineMath>K</InlineMath> immédiatement pour recevoir une
        action, donc à détruire la valeur temps restante et à perdre les intérêts sur{' '}
        <InlineMath>K</InlineMath>. Il vaut toujours mieux vendre l&apos;option que l&apos;exercer.
        Conséquence : un call américain sur action sans dividende vaut exactement son équivalent européen.
      </p>

      <p className="text-gray-600 leading-relaxed mb-3">
        L&apos;unique exception est le détachement de dividende. La veille d&apos;une ex-date, l&apos;exercice
        devient optimal si le dividende encaissé dépasse la valeur temps abandonnée. La condition
        approchée s&apos;écrit :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-3 text-center text-gray-900">
        <BlockMath>{'D > K\\left(1 - e^{-r(T-t)}\\right)'}</BlockMath>
      </div>
      <p className="text-gray-500 text-sm leading-relaxed mb-8 text-center">
        où <InlineMath>D</InlineMath> est le dividende discret détaché. En pratique, cela ne concerne que
        les calls dans la monnaie sur des titres à fort rendement de dividende, à quelques jours de
        l&apos;ex-date.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-4">Le put américain : régulièrement exercé</h3>

      <p className="text-gray-600 leading-relaxed mb-6">
        C&apos;est l&apos;application directe de la section 4. Un put deep ITM a une valeur temps négative
        : il cote sous sa valeur intrinsèque. Exercer immédiatement permet de vendre l&apos;action à{' '}
        <InlineMath>K</InlineMath> et de placer ce cash au taux sans risque <InlineMath>r</InlineMath>{' '}
        jusqu&apos;à <InlineMath>T</InlineMath>, ce qui rapporte davantage que d&apos;attendre passivement.
        La frontière d&apos;exercice est le niveau de spot en dessous duquel exercer devient optimal.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Test de cohérence
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Si <InlineMath>r=0</InlineMath> et qu&apos;il n&apos;y a pas de dividende, l&apos;exercice
          anticipé d&apos;un put américain n&apos;est jamais strictement optimal, et le put américain vaut
          son équivalent européen. Ce cas limite confirme que le moteur de l&apos;exercice anticipé du put
          est bien le placement du cash au taux sans risque, et rien d&apos;autre.
        </p>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-4">La Parité américaine : l&apos;égalité devient un encadrement</h3>

      <p className="text-gray-600 leading-relaxed mb-3">
        Pour des options américaines, la possibilité d&apos;exercice anticipé casse l&apos;égalité. Sans
        dividende, le {' '}<InlineMath>{'C_{am} = C_{eur}'}</InlineMath> mais le {' '}<InlineMath>{'P_{am}'}</InlineMath> reste exerçable par anticipation, la relation devient un encadrement :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center text-gray-900">
        <BlockMath>{'S_0 - K \\leq C_{am} - P_{am} \\leq S_0 - Ke^{-rT}'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-8">
        Par la borne supérieure, car la Parité américaine ne peut dépasser la Parité européenne (vente d'un {' '}<InlineMath>{'P_{am}'}</InlineMath> qui vaut plus qu'un {' '}<InlineMath>{'P_{eur}'}</InlineMath>).
        Par la borne inférieure, car le {' '}<InlineMath>{'P_{am}'}</InlineMath> pouvant être exercé dès le début, le vendeur du {' '}<InlineMath>{'P_{am}'}</InlineMath> peut subir l'opération {' '}<InlineMath>{'S - K'}</InlineMath> immédiatement (autrement dit être contraint d'acheter l'actif au prix {' '}<InlineMath>{'K'}</InlineMath>).
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-4">La conséquence pratique : plus de formule fermée</h3>

      <p className="text-gray-600 leading-relaxed mb-6">
        Le prix ne se résume plus à une espérance à une
        date fixe mais à un problème d&apos;arrêt optimal : à chaque instant, il faut comparer la valeur de
        continuation à la valeur d&apos;exercice immédiat. Cela élimine toute formule fermée. Deux méthodes
        dominent :
      </p>

      <p className="text-gray-600 leading-relaxed mb-3">
        <strong className="text-gray-800">L&apos;arbre binomial</strong> : on discrétise le temps et on
        remonte l&apos;arbre en prenant à chaque nœud le maximum entre la valeur de continuation et la
        valeur d&apos;exercice. Simple, robuste, adapté aux faibles dimensions. Le même problème
        d&apos;arrêt optimal, résolu par la même technique d&apos;arbre, se pose sur les swaptions
        bermudéennes et les obligations callables : voir{' '}
        <a href="/cours/module-5-fixed-income-2/bond-options-swaptions" className="text-blue-600 hover:underline">
          Bond Options &amp; Swaptions
        </a>
        .
      </p>

      <p className="text-gray-600 leading-relaxed mb-8">
        <strong className="text-gray-800">Longstaff-Schwartz (LSM)</strong> : un Monte-Carlo augmenté
        d&apos;une régression qui estime la valeur de continuation à partir des trajectoires simulées.
        Nécessaire dès que la dimension augmente. Le Monte-Carlo standard, tel que présenté dans{' '}
        <a href="/cours/module-2-pricing/monte-carlo" className="text-blue-600 hover:underline">
          Simulation de Monte-Carlo
        </a>
        , simule des trajectoires jusqu&apos;à maturité et ne sait pas gérer une décision d&apos;arrêt en
        cours de route. C&apos;est précisément cette limite que Longstaff-Schwartz contourne.
      </p>

      <p className="text-gray-600 leading-relaxed mb-6">
        Le pricing d'options américaines est l'objet de mon projet de fin d'études que vous pouvez consulter et
        télécharger depuis la page <a href="/a-propos" className="text-blue-600 hover:underline">À propos</a>.
        Ces deux méthodes y sont bien détaillées.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-4">Qui est américain, en pratique</h3>

      <p className="text-gray-600 leading-relaxed mb-4">
        Communément sur les marchés equity : les options sur actions individuelles cotées aux
        États-Unis sont américaines, alors que les options sur indices (SPX, Eurostoxx 50) sont
        européennes. En Europe, les options sur actions individuelles sont majoritairement américaines sur
        Eurex, mais les indices restent européens. Cette convention explique pourquoi la quasi-totalité du
        travail de modélisation sur les indices, y compris toute la construction des nappes de volatilité,
        se fait dans un cadre européen.
      </p>

      <p className="text-gray-600 leading-relaxed mb-10">
        Une obligation convertible est l&apos;exemple le plus courant de call américain embarqué dans un
        instrument plus large, avec toutes les difficultés de valorisation que cela implique : voir{' '}
        <a href="/cours/module-5-fixed-income-2/convertible-bond" className="text-blue-600 hover:underline">
          Convertible Bond
        </a>
        .
      </p>

      {/* ── Pour aller plus loin ── */}
      <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 mb-6">
        <p className="font-semibold text-gray-900 mb-3">Pour aller plus loin</p>
        <p className="text-gray-600 text-sm leading-relaxed mb-2">
          <a href="/docs/rapport-pfe.pdf" className="text-blue-600 hover:underline">
            Rapport du projet de fin d&apos;études — Pricing d&apos;options américaines
          </a>{' '}
          : détails de la méthode de l&apos;arbre binomial et implémentation de l'algorithme de Longstaff-Schwartz pour le pricing d&apos;options américaines, avec des exemples et approches de calibration.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-2">
          <a href="/cours/module-6-volatilite/vol-implicite-nappes" className="text-blue-600 hover:underline">
            Module 10 — Vol implicite et nappes
          </a>{' '}
          : la volatilité implicite comme véritable variable de cotation, et la surface qu&apos;elle forme.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          <a href="/simulateur" className="text-blue-600 hover:underline">
            Simulateur de positions
          </a>{' '}
          : construire un book de calls et de puts et observer les payoffs et les Greeks en direct.
        </p>
      </div>

      <p className="text-gray-500 text-sm leading-relaxed mb-6">
        Les combinaisons de ces briques vanilles, spreads, straddles et autres structures, font l&apos;objet
        de la page suivante, Stratégies Optionnelles. Les options à payoff discontinu et à barrière sont
        traitées dans le Module 8 — Equity II.
      </p>

      {/* ── Lien quiz ── */}
      <div className="mt-10 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-gray-700">
        Un quiz sur le Module 7 sera bientôt disponible.
      </div>

      {/* ── Navigation Précédent / Suivant ── */}
      <div className="flex justify-between mt-12 pt-6 border-t border-gray-300">
        <a href="/cours/module-5-produits-equity/delta-one-cash" className="text-blue-600 hover:underline text-sm">
          ← Les Fondations Equity, l&apos;Univers Delta-One
        </a>
        <a href="/cours/module-5-produits-equity/strategies-optionnelles" className="text-blue-600 hover:underline text-sm">
          Stratégies optionnelles →
        </a>
      </div>

    </article>
  );
}
