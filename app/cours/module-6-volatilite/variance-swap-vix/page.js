// Page de cours : Module 6 — Variance Swap & VIX

import Link from 'next/link';
import { InlineMath, BlockMath } from '../../../components/Math';

export const metadata = {
  title: 'Variance Swap & VIX — Finance according to James',
  description:
    'Réplication statique du Variance Swap, formule du payoff, comparaison avec le Volatility Swap, et méthodologie de calcul du VIX.',
};

export default function VarianceSwapVIXPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12">

      {/* ── Fil d'Ariane ── */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/cours" className="hover:text-blue-600 transition-colors">Cours</Link>
        <span>/</span>
        <span className="text-gray-500">Module 6 — Volatilité</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">Variance Swap &amp; VIX</span>
      </nav>

      {/* ── Titre ── */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
        Variance Swap &amp; VIX
      </h1>

      {/* ── Introduction ── */}
      <p className="text-lg text-gray-600 leading-relaxed mb-4">
        Les chapitres précédents ont montré que la volatilité n&apos;est pas constante : elle sourit,
        elle se tord, elle change de niveau au fil du temps. Bonne nouvelle,
        on peut <strong>trader la volatilité elle-même</strong>.
      </p>
      <p className="text-gray-600 leading-relaxed mb-10">
        Le Variance Swap est l&apos;instrument qui rend cette exposition
        propre, directe et réplicable sans ambiguïté. Le VIX en est la déclinaison standardisée,
        devenu le baromètre mondial de la "peur des marchés".
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 1 — La volatilité comme classe d'actifs
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="volatilite-comme-actif" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-24">
        1. La volatilité comme classe d&apos;actifs
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Dans le modèle Black-Scholes, la volatilité <InlineMath>{`\\sigma`}</InlineMath> est un
        paramètre fixé à l&apos;avance. En pratique elle fluctue, et parfois brutalement. Cette
        variabilité crée une opportunité : prendre position sur la <em>direction</em> de la vol,
        indépendamment du sens du marché.
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        Trader la volatilité revient à parier sur l&apos;écart entre deux grandeurs :
      </p>
      <ul className="list-disc list-inside text-gray-600 leading-relaxed mb-4 space-y-2 ml-2">
        <li>
          La <strong>volatilité réalisée</strong> <InlineMath>{`\\sigma_{\\text{real}}`}</InlineMath> :
          les mouvements effectivement observés sur le sous-jacent entre aujourd&apos;hui et la maturité.
        </li>
        <li>
          La <strong>volatilité implicite</strong> <InlineMath>{`\\sigma_{\\text{impl}}`}</InlineMath> :
          le niveau de vol que le marché d&apos;options tarifie aujourd&apos;hui comme couverture de ce risque futur.
        </li>
      </ul>
      <p className="text-gray-600 leading-relaxed mb-4">
        Si tu penses que les marchés vont être plus agités que ce que les options impliquent (ou implicitent?), tu
        achètes de la volatilité. Si tu penses que la vol implicite est surestimée, tu la vends.
      </p>
      

      {/* ══════════════════════════════════════════════════════════════
          Section 2 — Le Variance Swap : définition et payoff
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="variance-swap" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        2. Le Variance Swap : définition et payoff
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Un Variance Swap est un <strong>contrat forward sur la variance réalisée</strong>. Les deux
        contreparties s&apos;accordent aujourd&apos;hui sur un strike de variance <InlineMath>{'K_{\\text{var}}'}</InlineMath> (ou <InlineMath>{`\\sigma^2_{\\text{impl}}`}</InlineMath>),
        et à la maturité <InlineMath>T</InlineMath>, l&apos;acheteur reçoit la différence entre la
        variance réalisée et ce strike, multipliée par un notionnel.
      </p>

      {/* Payoff encadré */}
      <div className="bg-gray-50 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center">
        <BlockMath>{`\\text{Payoff} = N \\times \\left(\\sigma^2_{\\text{real}} - K_{\\text{var}}\\right)`}</BlockMath>
      </div>

      <div className="text-gray-600 leading-relaxed mb-6 space-y-2">
        <p>
          <InlineMath>N</InlineMath> est le notionnel en euros (ou dollars) par <em>point de variance</em>.
          Un notionnel de 100 000 € signifie que chaque point de variance (1 vol²) vaut 100 000 €.
        </p>
        <p>
          <InlineMath>{`\\sigma^2_{\\text{real}}`}</InlineMath> est la <strong>variance réalisée
          annualisée</strong> (il y a 252 jours ouvrés dans 1 an), calculée à partir des rendements journaliers (en nombre de n) observés sur la période :
        </p>
      </div>

      <BlockMath>{`\\sigma^2_{\\text{real}} = \\frac{252}{n} \\sum_{i=1}^{n} \\left(\\ln\\frac{S_i}{S_{i-1}}\\right)^2`}</BlockMath>

      <p className="text-gray-600 leading-relaxed mt-4 mb-4">
        <InlineMath>{'K_{\\text{var}}'}</InlineMath> est le <strong>strike de variance</strong>, fixé à
        la date de trade. Il est calibré pour que le contrat vaille zéro à l&apos;initiation (comme pour tout swap) : il est
        donc au niveau de la variance implicite que le marché d&apos;options anticipe à cette date.
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        L&apos;acheteur du Variance Swap est <em>long volatilité</em> (c'est-à-dire qu'il gagne si les marchés
        s&apos;avèrent plus agités que prévu). Le vendeur est <em>short volatilité</em>.
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        Contrairement à une option classique, le Variance Swap n&apos;a pas de delta à gérer, pas de
        gamma à couvrir au quotidien. Le payoff est uniquement déterminé par la variance réalisée.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 3 — Réplication statique
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="replication-statique" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        3. Réplication statique : la démonstration quant
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        La beauté du Variance Swap tient au fait qu'il peut être répliqué
        <strong> statiquement</strong> par un portefeuille d&apos;options vanilles. Voici la démo.
      </p>

      {/* Étape 1 */}
      <div className="mb-6">
        <p className="font-semibold text-gray-900 mb-2">Étape 1 — Point de départ : P&amp;L d&apos;une option delta-hedgée</p>
        <p className="text-gray-600 leading-relaxed mb-3">
          On a montré dans le chapitre Arbitrage Theta-Gamma que le P&amp;L d&apos;une option
          delta-hedgée sur un intervalle <InlineMath>dt</InlineMath> est :
        </p>
        <BlockMath>{`d\\Pi = \\frac{1}{2} S_t^2 \\,\\Gamma\\, \\left(\\sigma^2_{\\text{real}} - \\sigma^2_{\\text{impl}}\\right) dt`}</BlockMath>
        <p className="text-gray-600 leading-relaxed mt-3">
          L&apos;exposition à la variance réalisée est bien présente, mais elle est pondérée par{' '}
          <InlineMath>{`S_t^2 \\Gamma`}</InlineMath>, qui varie continuellement en fonction du
          chemin du sous-jacent. Le payoff total sur la vie du contrat est <em>path-dependent</em> :
          une même vol réalisée peut produire des résultats différents selon la trajectoire de{' '}
          <InlineMath>S_t</InlineMath>.
        </p>
      </div>

      {/* Étape 2 */}
      <div className="mb-6">
        <p className="font-semibold text-gray-900 mb-2">Étape 2 — L&apos;objectif : rendre l&apos;exposition constante</p>
        <p className="text-gray-600 leading-relaxed">
          Pour obtenir une exposition <em>pure</em> à la variance, il faudrait que le facteur{' '}
          <InlineMath>{`S_t^2 \\Gamma`}</InlineMath> soit constant quel que soit le niveau de{' '}
          <InlineMath>S_t</InlineMath>. On cherche donc à construire un portefeuille d&apos;options
          pondérées par un poids <InlineMath>w(K)</InlineMath> tel que la contribution au Gamma
          total soit identique à tous les niveaux de spot.
        </p>
      </div>

      {/* Étape 3 */}
      <div className="mb-6">
        <p className="font-semibold text-gray-900 mb-2">Étape 3 — La condition sur le Gamma</p>
        <p className="text-gray-600 leading-relaxed mb-3">
          Pour que <InlineMath>{`S_t^2 \\Gamma`}</InlineMath> soit constant, il faut que le Gamma
          d&apos;une option de strike <InlineMath>K</InlineMath> piqué au spot vérifie :
        </p>
        <div className="bg-gray-50 border border-gray-300 rounded-xl px-8 py-4 mb-3 text-center">
          <BlockMath>{`\\Gamma(S) = \\frac{1}{S^2}`}</BlockMath>
        </div>
        <p className="text-gray-600 leading-relaxed">
          Un Dirac de strike <InlineMath>K</InlineMath> contribue au Gamma agrégé en <InlineMath>K</InlineMath>.
          Il faut donc pondérer chaque option par <InlineMath>{`w(K) = \\frac{1}{K^2}`}</InlineMath>.
        </p>
      </div>

      {/* Étape 4 */}
      <div className="mb-6">
        <p className="font-semibold text-gray-900 mb-2">Étape 4 — Quel instrument a un tel Gamma ?</p>
        <p className="text-gray-600 leading-relaxed mb-3">
          On cherche un payoff <InlineMath>f(S_T)</InlineMath> tel que <InlineMath>{`f''(S) = 1/S^2`}</InlineMath>.
          On intègre deux fois :
        </p>
        <div className="space-y-2 ml-4 mb-4">
          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-sm w-24">Dérivée 2e :</span>
            <BlockMath>{`f''(S) = \\frac{1}{S^2}`}</BlockMath>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-sm w-24">Dérivée 1re :</span>
            <BlockMath>{`f'(S) = -\\frac{1}{S}`}</BlockMath>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-sm w-24">Payoff :</span>
            <BlockMath>{`f(S) = -\\ln S`}</BlockMath>
          </div>
        </div>
        <div className="bg-gray-50 border border-gray-300 rounded-xl px-8 py-4 mb-3 text-center">
          <BlockMath>{`\\text{Payoff théorique} = -\\ln\\frac{S_T}{S_0}`}</BlockMath>
        </div>
        <p className="text-gray-600 leading-relaxed">
          Ce payoff logarithmique, dit <em>log-contrat</em>, donne bien une exposition uniforme
          à la variance, indépendante du chemin parcouru par <InlineMath>S_t</InlineMath>.
        </p>
      </div>

      {/* Étape 5 */}
      <div className="mb-6">
        <p className="font-semibold text-gray-900 mb-2">Étape 5 — Réplication pratique par un portefeuille d&apos;options</p>
        <p className="text-gray-600 leading-relaxed mb-3">
          Ce log-contrat n&apos;est pas coté sur les marchés. Mais on peut le répliquer exactement
          (en théorie) par un panier continu d&apos;options vanilles : des Puts OTM pour les strikes
          en dessous du spot, des Calls OTM pour les strikes au-dessus.
        </p>
        <div className="bg-gray-50 border border-gray-300 rounded-xl px-8 py-4 mb-4 text-center">
          <BlockMath>{`w(K) = \\frac{1}{K^2} \\quad \\text{par option de strike } K`}</BlockMath>
        </div>
        <p className="text-gray-600 leading-relaxed">
          En pratique, le portefeuille est constitué d&apos;un nombre fini d&apos;options à strikes régulièrement
          espacés, avec une pondération inversement proportionnelle au carré du strike.
          La réplication est dite <em>statique</em> : le portefeuille est constitué une seule fois
          et tenu jusqu&apos;à maturité, sans ajustement.
        </p>
      </div>

      {/* Boîte amber risque de queue */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
        <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-2">
          Risque de queue
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          La pondération en <InlineMath>{`1/K^2`}</InlineMath> donne un poids considérable aux
          Puts très OTM, dont les strikes <InlineMath>K</InlineMath> sont faibles. Lors d&apos;un
          krach boursier, ces options explosent en valeur et le Variance Swap peut générer
          des pertes (ou des gains, selon le sens) bien au-delà d&apos;une exposition linéaire à la
          vol. C&apos;est la principale source de risque pour les vendeurs de variance.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 4 — Variance Swap vs Volatility Swap
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="varswap-vs-volswap" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        4. Variance Swap vs Volatility Swap
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Il existe une variante du Variance Swap : le <strong>Volatility Swap</strong>, dont le
        payoff porte directement sur la vol réalisée <InlineMath>{`\\sigma_{\\text{real}}`}</InlineMath>
        plutôt que sur sa variance. Les deux instruments sont proches mais présentent des
        différences importantes en pratique.
      </p>

      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50 border border-gray-300">
              <th className="text-left px-4 py-3 text-gray-700 font-semibold border-r border-gray-300">Critère</th>
              <th className="text-left px-4 py-3 text-gray-700 font-semibold border-r border-gray-300">Variance Swap</th>
              <th className="text-left px-4 py-3 text-gray-700 font-semibold">Volatility Swap</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 border border-gray-300">
            <tr>
              <td className="px-4 py-3 text-gray-700 font-medium border-r border-gray-300">Sous-jacent</td>
              <td className="px-4 py-3 text-gray-600 border-r border-gray-300">
                Variance réalisée <InlineMath>{`\\sigma^2_{\\text{real}}`}</InlineMath>
              </td>
              <td className="px-4 py-3 text-gray-600">
                Volatilité réalisée <InlineMath>{`\\sigma_{\\text{real}}`}</InlineMath>
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-4 py-3 text-gray-700 font-medium border-r border-gray-300">Payoff</td>
              <td className="px-4 py-3 text-gray-600 border-r border-gray-300">
                Convexe — <InlineMath>{`N \\times (\\sigma^2_{\\text{real}} - K_{\\text{var}})`}</InlineMath>
              </td>
              <td className="px-4 py-3 text-gray-600">
                Linéaire — <InlineMath>{`N \\times (\\sigma_{\\text{real}} - K_{\\text{vol}})`}</InlineMath>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-gray-700 font-medium border-r border-gray-300">Réplication</td>
              <td className="px-4 py-3 text-gray-600 border-r border-gray-300">
                Statique et parfaite avec le portefeuille pondéré en <InlineMath>{`1/K^2`}</InlineMath>
              </td>
              <td className="px-4 py-3 text-gray-600">
                Dynamique et imparfaite, dépendante du modèle
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-4 py-3 text-gray-700 font-medium border-r border-gray-300">Statut marché</td>
              <td className="px-4 py-3 text-gray-600 border-r border-gray-300">
                Standard OTC vanille, très liquide
              </td>
              <td className="px-4 py-3 text-gray-600">
                Moins liquide, pricing complexe
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        La <strong>convexité</strong> du Variance Swap est un avantage pour l&apos;acheteur de
        variance : si la vol réalisée dépasse le strike, le gain croît de façon quadratique (en puissance 2). Mais
        c&apos;est aussi un risque supplémentaire pour le vendeur en cas de vol explosive.
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        La facilité de réplication statique explique pourquoi le Variance Swap s&apos;est imposé comme
        le standard de marché pour échanger du risque de volatilité, là où le Volatility Swap reste
        un instrument quasi-inexistant.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 5 — L'indice VIX
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="indice-vix" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        5. L&apos;indice VIX : le VarSwap standardisé
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Le VIX est l&apos;indice de volatilité du CBOE (Chicago Board Options Exchange). Il mesure la
        volatilité implicite <strong>à 30 jours</strong> sur le S&amp;P 500 et est recalculé en
        temps réel. Depuis 2008, il est surnommé l&apos;indice de la peur : un VIX à 20 signifie que
        le marché anticipe une vol de 20% sur l&apos;année, soit environ 20/√12 ≈ 5.8% par mois.
      </p>
      <p className="text-gray-600 leading-relaxed mb-6">
        L&apos;idée reçue est que le VIX s&apos;obtient en inversant la formule Black-Scholes sur l&apos;option
        ATM. C&apos;est faux. La méthodologie CBOE est <em>agnostique de tout modèle</em> : elle repose
        exactement sur la logique de réplication du Variance Swap.
      </p>

      <p className="text-gray-700 font-medium mb-3">Méthodologie CBOE en 4 étapes :</p>

      {/* Étape 1 VIX */}
      <div className="mb-4">
        <p className="font-semibold text-gray-900 mb-1">Étape 1 — Constitution du panier</p>
        <p className="text-gray-600 leading-relaxed">
          Le CBOE collecte les cotations de <em>tous</em> les Calls et Puts OTM disponibles sur
          le S&amp;P 500 pour les deux échéances les plus proches encadrant 30 jours. Seules les
          options ayant un bid non nul sont retenues.
        </p>
      </div>

      {/* Étape 2 VIX */}
      <div className="mb-4">
        <p className="font-semibold text-gray-900 mb-1">Étape 2 — Pondération</p>
        <p className="text-gray-600 leading-relaxed mb-2">
          Chaque option de strike <InlineMath>K_i</InlineMath> et de prix <InlineMath>{`Q(K_i)`}</InlineMath>
          est pondérée par <InlineMath>{`\\Delta K_i / K_i^2`}</InlineMath>, conformément à la
          réplication en <InlineMath>{`1/K^2`}</InlineMath> :
        </p>
        <p className="text-sm text-gray-600 mb-3">
          Méthodologie officielle du CBOE : <a href="https://cdn.cboe.com/resources/vix/VIX_Methodology.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">VIX Methodology (PDF) →</a>
        </p>
        <BlockMath>{`\\sigma^2 = \\frac{2}{T} \\sum_i \\frac{\\Delta K_i}{K_i^2} e^{rT} Q(K_i) - \\frac{1}{T}\\left(\\frac{F}{K_0} - 1\\right)^2`}</BlockMath>
        <p className="text-gray-600 text-sm leading-relaxed mt-2">
          <InlineMath>F</InlineMath> est le prix forward, <InlineMath>K_0</InlineMath> le strike
          ATM le plus proche disponible sur le marché, mais ils ne sont jamais pile au même niveau. C'est pourquoi le second terme est un terme de correction lié à ce fait.
        </p>
      </div>

      {/* Pourquoi ΔK/K² */}
      <div className="mb-4">
        <p className="font-semibold text-gray-900 mb-2">Pourquoi <InlineMath>{`\\Delta K_i / K_i^2`}</InlineMath> et pas simplement <InlineMath>{`1/K_i^2`}</InlineMath> ?</p>
        <p className="text-gray-600 leading-relaxed mb-3">
          La formule théorique de réplication repose sur une intégrale continue{' '}
          <InlineMath>{`\\int (1/K^2)\\, dK`}</InlineMath> où <InlineMath>dK</InlineMath> suppose
          une infinité de strikes disponibles. En pratique, les strikes sur le CBOE sont discrets :
          espacement de 5, 10 ou 25 points selon la zone de moneyness. Pour passer de l&apos;intégrale
          à un calcul sur données de marché réelles, on applique une approximation par somme de
          Riemann : la hauteur du rectangle sous la courbe est <InlineMath>{`1/K_i^2`}</InlineMath>, la largeur
          est <InlineMath>{`\\Delta K_i`}</InlineMath>.
        </p>
        <p className="text-gray-600 leading-relaxed mb-3">
          Omettre <InlineMath>{`\\Delta K_i`}</InlineMath> revient à ignorer la largeur de la tranche
          couverte. Une option dans une zone où les strikes sont espacés de 50 points doit peser
          davantage qu&apos;une option dans une zone à 5 points d&apos;écart car elle représente une plage
          de moneyness bien plus large.
        </p>
        <p className="text-gray-600 leading-relaxed mb-3">
          Le CBOE calcule <InlineMath>{`\\Delta K_i`}</InlineMath> comme la demi-distance entre les
          strikes voisins :
        </p>
        <div className="bg-gray-50 border border-gray-300 rounded-xl px-8 py-4 text-center">
          <BlockMath>{`\\Delta K_i = \\frac{K_{i+1} - K_{i-1}}{2}`}</BlockMath>
        </div>
      </div>

      {/* Étape 3 VIX */}
      <div className="mb-4">
        <p className="font-semibold text-gray-900 mb-1">Étape 3 — Interpolation temporelle</p>
        <p className="text-gray-600 leading-relaxed">
          Le calcul est effectué séparément sur les deux échéances encadrant 30 jours. Une
          interpolation linéaire sur les variances (pas les vols) permet d&apos;obtenir une variance
          exactement à 30 jours calendaires (30/365 d&apos;année).
        </p>
      </div>

      {/* Étape 4 VIX */}
      <div className="mb-6">
        <p className="font-semibold text-gray-900 mb-1">Étape 4 — Racine carrée et mise à l&apos;échelle</p>
        <p className="text-gray-600 leading-relaxed mb-2">
          On prend la racine carrée de la variance interpolée et on multiplie par 100 :
        </p>
        <BlockMath>{`\\text{VIX} = 100 \\times \\sqrt{\\sigma^2_{30j}}`}</BlockMath>
        <p className="text-gray-600 leading-relaxed mt-2">
          Un VIX de 20 correspond à une vol implicite annualisée de 20%. Le VIX est exprimé en
          pourcentage, pas en décimal.
        </p>
      </div>

      {/* Boîte bleue clé */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
          À retenir
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Le VIX n&apos;est autre que la cotation continue du strike <InlineMath>{'K_{\\text{var}}'}</InlineMath>{' '}
          d&apos;un Variance Swap à 30 jours sur le S&amp;P 500. Il agrège l&apos;information de l&apos;ensemble
          du marché d&apos;options sans dépendre d&apos;un modèle de pricing. C&apos;est sa force et la raison
          pour laquelle il est devenu la référence universelle de la vol implicite.
        </p>
      </div>

      {/* ── Lien quiz ── */}
      <div className="mt-10 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-gray-700">
        Un quiz sur le Module 6 sera bientôt disponible.
      </div>

      {/* ── Navigation Précédent / Suivant ── */}
      <div className="flex justify-between mt-12 pt-6 border-t border-gray-300">
        <a href="/cours/module-6-volatilite/vol-stochastique" className="text-blue-600 hover:underline text-sm">
          ← Vol stochastique
        </a>
        <a href="/cours/module-6-volatilite/skew-delta" className="text-blue-600 hover:underline text-sm">
          Skew Delta →
        </a>
      </div>

    </article>
  );
}
