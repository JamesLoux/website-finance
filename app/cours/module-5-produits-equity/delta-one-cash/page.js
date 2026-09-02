import Link from 'next/link';
import { InlineMath, BlockMath } from '../../../components/Math';
import ForwardCurveWrapper from './ForwardCurveWrapper';

export const metadata = {
  title: "Les Fondations Equity — Finance according to James",
  description:
    "Le desk Delta-One : stock, forward equity, futures, dividend swaps et ETF. Les briques linéaires de tout le bloc Equity.",
};

export default function DeltaOneCashPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12">

      {/* ── Fil d'Ariane ── */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/cours" className="hover:text-blue-600 transition-colors">Cours</Link>
        <span>/</span>
        <span className="text-gray-500">Module 7 — Equity I</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">Les Fondations Equity</span>
      </nav>

      {/* ── Titre ── */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
        Les Fondations Equity — Delta-One
      </h1>

      {/* ── Introduction ── */}
      <p className="text-lg text-gray-600 leading-relaxed mb-10">
        Le desk Delta-One est la salle des machines des marchés actions. Là où les traders d&apos;options
        gèrent la courbure et l&apos;incertitude, le Delta-One manipule des instruments strictement
        linéaires, dont la valeur suit le sous-jacent. Cette page pose les briques de tout
        le bloc Equity : le stock, le forward, le future, le dividend swap et l&apos;ETF. Mais le forward equity est celle qui relie financement, dividendes
        et coût d&apos;emprunt du titre. Tout le reste s&apos;organise autour d&apos;elle.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 1 — Le Métier Delta-One
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="delta-one" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-24">
        1. Le Métier Delta-One
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Comme son nom l'indique, le desk Delta-One gère des produits dont la sensibilité directionnelle au sous-jacent est
        absolue : le Delta vaut exactement 1 (ou &minus;1 en cas de vente à découvert). Contrairement
        au trader d&apos;options qui surveille le Gamma et le Vega, le trader Delta-One n&apos;a ni
        courbure ni exposition à la volatilité à couvrir : son produit monte d&apos;un euro quand le
        sous-jacent monte d&apos;un euro.
      </p>

      <p className="text-gray-600 leading-relaxed mb-6">
        L&apos;inventaire du desk regroupe les actions physiques (stocks), les Forwards, les Futures, les
        Dividend Swaps et les ETF. Les Total Return Swaps, qui appartiennent aussi à cet univers,
        ont été traités dans le Module 6.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Le forward est le fil directeur
        </p>
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Parmi ces instruments, le forward equity est la brique centrale. Comprendre son prix,
          c&apos;est comprendre pourquoi un future cote au-dessus ou en dessous du
          comptant, ce qu&apos;un dividend swap isole, et comment un ETF synthétique réplique son
          indice. Les sections partent donc du stock, construisent le forward, puis en dérivent
          tout le reste.
        </p>
        <p className="text-gray-600 text-sm">
          Les Total Return Swaps ont été traités dans le Module 6 —{' '}
          <a href="/cours/module-6-fixed-income-3/trs" className="text-blue-600 hover:underline">
            voir la page TRS →
          </a>
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 2 — Le Stock et le Portage
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="stock" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        2. Stock et Portage
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Détenir l&apos;action physique est l&apos;exposition la plus directe : un Delta de 1, sans
        maturité ni levier. Mais acheter un titre n&apos;est jamais gratuit. Le capital est emprunté
        au taux de financement (le taux sans risque <InlineMath>r</InlineMath> en première
        approximation), et cette dette court tant que la position est ouverte.
      </p>

      <p className="text-gray-600 leading-relaxed mb-6">
        Le coût net de détention est le portage (cost of carry) : la différence entre ce que
        l&apos;action rapporte, ses dividendes, et ce qu&apos;elle coûte à financer.
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-3 text-center text-gray-900">
        <BlockMath>{`\\text{Portage} = D - r \\cdot S_0`}</BlockMath>
      </div>
      <p className="text-gray-500 text-sm leading-relaxed mb-8 text-center">
        où <InlineMath>D</InlineMath> est le dividende perçu sur la période et{' '}
        <InlineMath>{'r \\cdot S_0'}</InlineMath> le coût de financement du notionnel.
      </p>

      <p className="text-gray-600 leading-relaxed">
        Portage positif, détenir l&apos;action rapporte ; portage négatif, la position coûte à
        porter. C&apos;est cette tension entre rendement et financement que le forward projette à
        l&apos;horizon <InlineMath>T</InlineMath>.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 3 — Le Forward Equity
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="forward" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        3. Forward Equity
      </h2>

      <p className="text-gray-600 leading-relaxed mb-8">
        Un contrat forward est un accord de gré à gré (OTC) pour acheter ou vendre un actif à
        une date future <InlineMath>T</InlineMath>, à un prix fixé aujourd&apos;hui, noté{' '}
        <InlineMath>F</InlineMath>. Aucun flux n&apos;est échangé à la mise en place : le forward
        est une promesse et non pas une option, donc le contrat ne coûte rien en soi et n'a pas de prime. Le prix est donc ajusté pour qu&apos;il vaille zéro aujourd&apos;hui.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-4">A. Le prix forward</h3>

      <p className="text-gray-600 leading-relaxed mb-6">
        Pour un indice, qui distribue de nombreux dividendes étalés sur l&apos;année, on modélise
        ces versements comme un rendement continu <InlineMath>q</InlineMath>. Le prix forward
        prend alors sa forme la plus connue :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center text-gray-900">
        <BlockMath>{'F = S_0 \\cdot e^{(r-q)T}'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        L&apos;intuition est celle du portage projeté à l&apos;horizon <InlineMath>T</InlineMath> :
        on part du comptant <InlineMath>{'S_0'}</InlineMath>, on le capitalise au financement{' '}
        <InlineMath>r</InlineMath>, et on retranche ce que les dividendes <InlineMath>q</InlineMath>{' '}
        rapportent entre-temps, puisque le détenteur du forward ne les touche pas. Quand{' '}
        <InlineMath>{'r > q'}</InlineMath>, le forward cote une prime (<InlineMath>{'F > S_0'}</InlineMath>) :
        c&apos;est le contango. Quand <InlineMath>{'q > r'}</InlineMath>, il cote une décote
        (<InlineMath>{'F < S_0'}</InlineMath>) : c&apos;est la backwardation.
      </p>

      <p className="text-gray-600 leading-relaxed mb-8">
        Ce paramètre <InlineMath>q</InlineMath> n&apos;est pas propre au forward : c&apos;est le
        même rendement de dividende continu qu&apos;on retrouve dans Black-Scholes,
        au cœur des <InlineMath>{'d_1'}</InlineMath> et{' '}
        <InlineMath>{'d_2'}</InlineMath>.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Le cas de l&apos;action individuelle
        </p>
        <p className="text-gray-700 text-sm leading-relaxed mb-4">
          Pour une single stock, les dividendes ne sont pas un flux continu mais quelques
          versements ponctuels, à des dates et des montants quasi connus. On ne lisse plus en{' '}
          <InlineMath>q</InlineMath> : on actualise chaque dividende et on le retranche du spot
          avant de capitaliser.
        </p>
        <div className="bg-white border border-blue-100 rounded-lg px-6 py-4 mb-4 text-center">
          <BlockMath>{'F = (S_0 - \\text{VA}(\\text{Div})) \\cdot e^{rT}'}</BlockMath>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">
          On retire la valeur actuelle des dividendes avant de capitaliser, parce que ces montants
          quittent le titre à leur date de détachement et ne participent pas à sa croissance
          capitalisée.
        </p>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-4">B. Le Repo et le Borrow implicite</h3>

      <p className="text-gray-600 leading-relaxed mb-4">
        La formule continue cache une réalité de marché : la vente à découvert. Pour vendre un
        titre à découvert, il faut d&apos;abord l&apos;emprunter, et cet emprunt a un prix. Quand
        un titre est très demandé par les vendeurs à découvert, il devient hard-to-borrow et sa
        commission d&apos;emprunt grimpe.
      </p>

      <p className="text-gray-600 leading-relaxed mb-6">
        Il faut distinguer deux coûts. Le repo est un financement collatéralisé : on emprunte
        du cash en donnant le titre en garantie. Le borrow (ou stock loan fee) est la commission
        payée pour emprunter le titre lui-même, afin de le shorter. C&apos;est le second qui pèse
        sur le forward. Il se comporte comme un dividende supplémentaire versé par celui qui
        détient le titre et le prête, et s&apos;ajoute donc à <InlineMath>q</InlineMath> :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-3 text-center text-gray-900">
        <BlockMath>{'F = S_0 \\cdot e^{(r-q-b)T}'}</BlockMath>
      </div>
      <p className="text-gray-500 text-sm leading-relaxed mb-6 text-center">
        où <InlineMath>b</InlineMath> est le taux de borrow. Négligeable pour un titre general
        collateral, il devient significatif pour un hard-to-borrow et déprime le forward.
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        Un forward anormalement bas est ainsi un signal direct : le marché paie cher pour
        emprunter ce titre, souvent parce que beaucoup cherchent à le shorter.
      </p>

      <p className="text-gray-600 leading-relaxed mb-2">
        Le graphe ci-dessous rend ces forces manipulables : ajuste le financement, le borrow
        et les dividendes pour voir le forward basculer entre contango et backwardation.
      </p>

      <ForwardCurveWrapper />

      <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-6">C. La Base (The Basis)</h3>

      <p className="text-gray-600 leading-relaxed mb-6">
        La base est l&apos;écart entre le prix forward théorique, celui qu&apos;on obtiendrait
        avec les seuls taux publics (r), et le prix réellement traité. Cet écart s'explique sur trois plans.
      </p>

      <p className="text-gray-600 leading-relaxed mb-3">
        <strong className="text-gray-800">Les dividendes anticipés (q).</strong> Le forward théorique
        repose sur une estimation des dividendes futurs. Si le forward traité s&apos;en écarte,
        c&apos;est souvent que le marché price une révision de la distribution, hausse attendue ou
        coupe redoutée, avant même l&apos;annonce de l&apos;entreprise. La base devient un
        baromètre du dividende anticipé.
      </p>

      <p className="text-gray-600 leading-relaxed mb-3">
        <strong className="text-gray-800">La tension sur le borrow (b).</strong> Un coût d&apos;emprunt
        élevé déprime le forward. Une base négative persistante sur une single stock trahit
        fréquemment un titre cher à emprunter, sous forte pression vendeuse à découvert. La base
        devient un indicateur de rareté du titre.
      </p>

      <p className="text-gray-600 leading-relaxed mb-8">
        <strong className="text-gray-800">Les flux structurels.</strong> La base porte enfin la
        trace des grands flux techniques : couverture de produits structurés, roll des futures
        d&apos;indice aux échéances trimestrielles, rééquilibrages indiciels. Ces flux ne disent
        rien de la valeur fondamentale mais déforment temporairement l&apos;offre et la demande
        de forward.
      </p>

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 mb-6">
        <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-2">
          Même phénomène hors du monde actions : l&apos;argent
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          On a vu qu&apos;un forward sous le comptant (backwardation) signale, sur une action, un
          gros dividende ou un titre hard-to-borrow. Le même régime s&apos;observe sur les matières
          premières, mais pour une raison différente : là, le moteur est le convenience yield, le
          bénéfice à détenir le métal physique plutôt qu&apos;un contrat. Quand la demande de métal
          immédiatement livrable s&apos;emballe, comme sur l&apos;argent début 2026, ce rendement
          de convenance grimpe et bascule le marché en backwardation. Même symptôme, cause
          distincte : sur une action, c&apos;est le borrow ; sur un métal, c&apos;est la tension
          physique.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 4 — Les Futures
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="futures" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        4. Futures Actions et Indices
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Le future est la version standardisée et listée du forward. Même logique de prix, mais un habillage de marché différent, avec de nombreuses conséquences.
      </p>

      <p className="text-gray-600 leading-relaxed mb-3">
        <strong className="text-gray-800">Les appels de marge.</strong> Le future est réévalué
        chaque jour (mark-to-market) : gains et pertes sont réglés en cash tous les soirs, au lieu
        d&apos;être portés jusqu&apos;à l&apos;échéance comme dans un forward OTC.
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        <strong className="text-gray-800">L&apos;ajustement de convexité.</strong> Ces appels de marge quotidiens
        créent une petite déviation entre future et forward théorique. La raison est celle
        vue pour les taux au Module 4 : quand gains et taux d&apos;intérêt sont corrélés, le
        règlement quotidien avantage systématiquement un côté. Sur les actions à court terme,
        l&apos;effet reste mineur.{' '}
        <a href="/cours/module-4-taux-credit/fwd-rate-agreement" className="text-blue-600 hover:underline">
          Voir la page Fwd Rate Agreement →
        </a>
      </p>

      <p className="text-gray-600 leading-relaxed mb-6">
        <strong className="text-gray-800">Les index futures.</strong> Des contrats comme
        l&apos;E-mini S&P 500 offrent la liquidité la plus profonde qui soit et permettent de
        prendre ou céder l&apos;exposition à un marché entier via un seul instrument : l&apos;outil
        de couverture directionnelle par excellence du desk.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 5 — Les Dividend Swaps
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="div-swaps" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        5. Dividend Swaps
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Toute la section 3 l&apos;a montré : le prix du forward dépend massivement du dividende,{' '}
        <InlineMath>q</InlineMath> pour l&apos;indice,{' '}
        <InlineMath>{'\\text{VA}(\\text{Div})'}</InlineMath> pour la single stock.
        C&apos;est cette composante que le dividend swap isole et rend négociable pour elle-même.
      </p>

      <p className="text-gray-600 leading-relaxed mb-6">
        Le dividend swap échange un montant fixe, estimé aujourd&apos;hui, contre le flux de
        dividendes réellement distribué d&apos;ici l&apos;échéance. Là où le forward mélange spot,
        financement et dividende, le dividend swap ne conserve que le dividende. C&apos;est
        l&apos;outil de celui qui a une vue sur la politique de distribution des entreprises, un
        secteur qui va couper, un autre qui va relever, sans vouloir porter le risque directionnel{' '}
        <InlineMath>{'S_0'}</InlineMath>. Il extrait le <InlineMath>q</InlineMath> du forward et
        en fait un sous-jacent à part entière.
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        Divswap long : on paie le dividende implicite et on reçoit le réalisé.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 6 — Les ETF et Trackers
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="etf" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        6. ETF et Trackers
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        L&apos;ETF empaquette l&apos;exposition d&apos;un indice entier dans une seule part,
        cotée en continu et Delta-One par construction. Deux façons de le fabriquer.
      </p>

      <p className="text-gray-600 leading-relaxed mb-3">
        <strong className="text-gray-800">Réplication physique.</strong> Le fonds détient
        réellement les actions de l&apos;indice, dans les mêmes proportions : simple et transparent,
        au prix d&apos;une gestion lourde aux rééquilibrages.
      </p>

      <p className="text-gray-600 leading-relaxed mb-3">
        <strong className="text-gray-800">Réplication synthétique.</strong> Le fonds détient un
        panier substitut et conclut un Total Return Swap avec une banque, pour échanger la
        performance de ce panier contre celle de l&apos;indice cible. On retrouve le TRS du
        Module 6, cette fois côté acheteur de performance.
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        <strong className="text-gray-800">Création/rachat.</strong> C&apos;est ce mécanisme qui
        garde le prix de l&apos;ETF collé à sa valeur liquidative (NAV). Si le cours s&apos;écarte
        de la valeur du panier sous-jacent, des arbitrageurs (Authorized Participants)
        créent ou détruisent des parts pour capturer l&apos;écart.
      </p>

      <p className="text-gray-600 text-sm leading-relaxed mb-6">
        La réplication synthétique s&apos;appuie sur un TRS —{' '}
        <a href="/cours/module-6-fixed-income-3/trs" className="text-blue-600 hover:underline">
          voir la page TRS →
        </a>
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 7 — Synthèse
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="synthese" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        7. Synthèse
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Ces cinq instruments se distinguent
        par leur mode de financement et par la façon dont chacun traite le dividende.
      </p>

      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800">Instrument</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800">Financement</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800">Traitement du dividende</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700">Stock</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Notionnel intégral emprunté à <InlineMath>r</InlineMath></td>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Dividende perçu directement</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700">Forward</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Aucun décaissement initial, financement implicite dans <InlineMath>F</InlineMath></td>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Intégré au prix via <InlineMath>q</InlineMath> (ou <InlineMath>{'\\text{VA}(\\text{Div})'}</InlineMath>)</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700">Future</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Marge quotidienne, pas de notionnel plein</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Intégré au prix, comme le forward</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700">Dividend Swap</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Notionnel réduit</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Le dividende est le sous-jacent</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700">ETF</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Prix de la part</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Réinvesti ou distribué selon le fonds</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        En résumé, le stock comprend
        tout ; le forward et le future projettent le portage à l&apos;horizon <InlineMath>T</InlineMath> ;
        le dividend swap extrait le seul dividende et l&apos;ETF réassemble un indice entier en une
        part. Toute la matière optionnelle (non-linéaire) du module, à partir de la page suivante, viendra
        de ces briques linéaires.
      </p>

      {/* ── Lien quiz ── */}
      <div className="mt-10 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-gray-700">
        Un quiz sur le Module 7 sera bientôt disponible.
      </div>

      {/* ── Navigation Précédent / Suivant ── */}
      <div className="flex justify-between mt-12 pt-6 border-t border-gray-300">
        <div />
        <a href="/cours/module-5-produits-equity/options-vanilles" className="text-blue-600 hover:underline text-sm">
          Options vanilles →
        </a>
      </div>

    </article>
  );
}
