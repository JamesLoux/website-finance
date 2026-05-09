import Link from 'next/link';
import { InlineMath, BlockMath } from '../../../components/Math';

export const metadata = {
  title: 'Cap & Floor — Finance according to James',
  description:
    'Caplets, Floorlets, parité Cap-Floor-Swap, Collar, Flat Vol vs Spot Vol et Grecques des taux.',
};

export default function CapFloorPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12">

      {/* ── Fil d'Ariane ── */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/cours" className="hover:text-blue-600 transition-colors">Cours</Link>
        <span>/</span>
        <span className="text-gray-500">Module 5 — Fixed Income II</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">Cap &amp; Floor</span>
      </nav>

      {/* ── Titre ── */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
        Cap &amp; Floor
      </h1>

      {/* ── Introduction ── */}
      <p className="text-lg text-gray-600 leading-relaxed mb-4">
        Un emprunteur à taux variable se protège contre la hausse des taux. Un prêteur à l'inverse se protège contre la baisse.
        Pour se couvrir, ils achètent des <strong>options sur taux</strong> (les Caps et les Floors)
        qui constituent la brique de base de tout le marché des dérivés de taux vanilles.
      </p>
      <p className="text-gray-600 leading-relaxed mb-10">
        Même si cela y ressemble beaucoup, contrairement aux options sur actions (Call et Put) où l&apos;on achète une option sur un seul flux futur,
        un Cap ou un Floor est un <strong>portefeuille d&apos;options</strong> : une série de petites
        options (Caplets et Floorlets) sur chaque période d&apos;intérêt de la vie du produit.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 1 — Anatomie d'un Cap
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="anatomie-cap" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-24">
        1. Anatomie d&apos;un Cap : Caplets
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Un <strong>Cap</strong> de maturité <InlineMath>T</InlineMath> sur le taux{' '}
        <InlineMath>L</InlineMath> (Euribor 3M ou SOFR 3M, par exemple) est simplement la somme de{' '}
        <InlineMath>n</InlineMath> <strong>Caplets</strong> indépendants, un par période.
        Symétriquement, un <strong>Floor</strong> est la somme de <strong>Floorlets</strong>.
        Le payoff de chaque pièce élémentaire est :
      </p>

      {/* Payoffs encadrés */}
      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-4">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 text-center">Caplet</p>
        <BlockMath>{'\\text{Payoff}_i = (L_i - K)_+ \\times N \\times \\delta_i'}</BlockMath>
      </div>
      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-8">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 text-center">Floorlet</p>
        <BlockMath>{'\\text{Payoff}_i = (K - L_i)_+ \\times N \\times \\delta_i'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        Où <InlineMath>L_i</InlineMath> est le taux Euribor observé à la période{' '}
        <InlineMath>i</InlineMath>, <InlineMath>K</InlineMath> le strike du Cap/Floor,{' '}
        <InlineMath>N</InlineMath> le notionnel, et <InlineMath>{'\\delta_i'}</InlineMath> la
        fraction d&apos;année de la période (typiquement <InlineMath>0.25</InlineMath> pour un Euribor 3M).
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4">
          Deux pièges structurels
        </p>

        <p className="text-sm font-semibold text-gray-700 mb-2">(A) Fixing in advance, payment in arrears</p>
        <p className="text-gray-600 text-sm leading-relaxed mb-5">
          Le taux <InlineMath>L_i</InlineMath> est <strong>observé (fixé)</strong> à la date{' '}
          <InlineMath>{'t_i'}</InlineMath>, mais le flux est <strong>payé</strong> à la date{' '}
          suivante <InlineMath>{'t_{i+1}'}</InlineMath>. Pour valoriser correctement le Caplet, il
          faut donc actualiser le payoff avec le facteur d&apos;escompte{' '}
          <InlineMath>{'DF(0,\\, t_{i+1})'}</InlineMath>, et non <InlineMath>{'DF(0,\\, t_i)'}</InlineMath>.
          
        </p>

        <p className="text-sm font-semibold text-gray-700 mb-2">(B) Le &laquo;&nbsp;Caplet manquant&nbsp;&raquo;</p>
        <p className="text-gray-600 text-sm leading-relaxed">
          Un Cap 5 ans sur Euribor 3M couvre 20 périodes trimestrielles. Pourtant, il ne contient
          que <strong>19 Caplets</strong> (et non 20). La raison : le premier taux Euribor est déjà
          connu à la date de négociation du Cap (il est fixé pour la période en cours). Ce Caplet
          n&apos;a aucune valeur optionnelle, il est certain et donc exclu du portefeuille.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 2 — Parité Cap-Floor-Swap
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="parite-cap-floor-swap" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        2. Parité Cap-Floor-Swap
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Il existe une relation d&apos;arbitrage fondamentale entre un Cap, un Floor et un IRS (Interest
        Rate Swap) de même strike <InlineMath>K</InlineMath> et même maturité. A l'instar de la parité Call-Put qui donne le forward en action, elle se démontre
        en deux étapes au niveau d&apos;un seul Caplet/Floorlet.
      </p>

      <p className="text-gray-600 leading-relaxed mb-3">
        <strong>Étape 1 — Payoffs bruts.</strong> Soustraire le payoff du Floorlet de celui du
        Caplet :
      </p>
      <BlockMath>{'(L - K)_+ - (K - L)_+ = L - K'}</BlockMath>

      <p className="text-gray-600 leading-relaxed mt-4 mb-6">
        <strong>Étape 2 — Agrégation.</strong> En sommant sur toutes les périodes et en actualisant
        chaque flux, on reconnaît exactement la valeur d&apos;un IRS payer (receveur fixe / payeur
        variable) de strike <InlineMath>K</InlineMath>. D&apos;où la relation :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-8 text-center">
        <BlockMath>{'\\text{Achat Cap} - \\text{Vente Floor} = \\text{Swap Payer (IRS)}'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        Cette parité est l&apos;analogue exact de la parité Call-Put en actions. Elle interdit tout
        arbitrage entre les marchés de Cap, Floor et IRS : si les prix s&apos;écartent, un teneur de
        marché ferme immédiatement l&apos;écart. En pratique, elle sert à <strong>extraire le prix
        d&apos;un Floor depuis un Cap coté</strong> (ou inversement) sans avoir à interpoler.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 3 — Stratégies : Collar et l'option cachée
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="collar-option-cachee" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        3. Stratégies : Collar et option cachée
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        La combinaison d&apos;un Cap et d&apos;un Floor sur la même jambe variable donne naissance au{' '}
        <strong>Collar</strong>, la stratégie de couverture la plus répandue chez les emprunteurs
        corporate. À côté de cette structure explicite, il existe une option sur taux implicite,
        souvent ignorée, dans des produits d&apos;épargne grand public.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Zero Cost Collar
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          Un emprunteur à taux variable achète un Cap strike{' '}
          <InlineMath>{'K_{\\text{cap}}'}</InlineMath> (protection contre la hausse) et vend
          simultanément un Floor strike{' '}
          <InlineMath>{'K_{\\text{floor}}'}</InlineMath> (renonce à profiter d&apos;une baisse en
          dessous de ce niveau). La prime reçue sur le Floor compense tout ou partie de la prime
          payée sur le Cap. Le payoff ressemble grandent à un risk reversal en equity.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          La condition <strong>zero cost</strong> (prime nette nulle) s&apos;obtient en ajustant les
          deux strikes jusqu&apos;à l&apos;équilibre. C&apos;est le rôle du quant : pour un notionnel et une
          maturité donnés, trouver le couple{' '}
          <InlineMath>{'(K_{\\text{cap}}, K_{\\text{floor}})'}</InlineMath> qui annule la prime
          nette tout en répondant aux contraintes de l&apos;emprunteur (taux plafond acceptable,
          taux plancher tolérable).
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          L&apos;option cachée du Livret A
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          Le Livret A garantit par construction un taux <strong>jamais négatif</strong>. Cette
          garantie n&apos;est pas gratuite : c&apos;est un Floor strike 0% que la banque a implicitement
          vendu au déposant. Lorsque les taux passent en territoire négatif (comme en zone euro
          entre 2014 et 2022), ce Floor se retrouve dans la monnaie : la banque doit verser des
          intérêts positifs alors qu&apos;elle emprunte à taux négatif sur le marché.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          Ce risque est porté et géré par les équipes <strong>ALM (Asset-Liability Management)</strong>{' '}
          des banques, qui le couvrent en achetant des Floors de marché.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 4 — Cotation : Flat Vol, Spot Vol et bootstrapping
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="flat-vol-spot-vol" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        4. Cotation : Flat Vol, Spot Vol et bootstrapping
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Pour pricer un Caplet isolé, on utilise la <strong>formule de Black</strong> (1976). C&apos;est
        l&apos;adaptation de Black-Scholes aux taux forward. On traite le taux forward comme le
        sous-jacent et on applique la formule classique avec la volatilité du taux. Deux conventions
        de cotation coexistent sur le marché.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">Flat Vol</p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Une <strong>volatilité unique</strong>, appliquée à tous les Caplets du Cap. C&apos;est le
            chiffre qu&apos;affiche Bloomberg pour un Cap donné. Pratique pour les traders : une
            seule valeur résume le prix du produit entier. Mais ce chiffre est une moyenne
            pondérée implicite, il ne reflète pas la structure par terme réelle de la volatilité.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">Spot Vol (Forward Vol)</p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Une <strong>volatilité distincte par Caplet</strong>, reflet de la volatilité
            intrinsèque du taux sur chaque période future. La Spot Vol donne la vraie structure
            par terme de la volatilité, indispensable pour pricer des produits complexes ou
            path-dependent.
          </p>
        </div>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        Le passage de la Flat Vol à la Spot Vol s&apos;effectue par <strong>bootstrapping</strong>, en
        isolant successivement la contribution de chaque nouveau Caplet :
      </p>

      <div className="bg-gray-50 border border-gray-300 rounded-xl p-6 mb-6">
        <div className="space-y-4">
          <div className="flex gap-4">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">1</span>
            <p className="text-gray-600 text-sm leading-relaxed">
              <strong>Cap 1 an</strong> : Le cap le plus court n&apos;a que quelques Caplets. On extrait
              leur Spot Vol directement depuis le prix de marché du Cap 1 an via la formule de Black
              inversée (même principe que la vol implicite en actions).
            </p>
          </div>
          <div className="flex gap-4">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">2</span>
            <p className="text-gray-600 text-sm leading-relaxed">
              <strong>Cap 2 ans</strong> : Le prix du Cap 2 ans est connu (coté). Les Caplets de
              la première année sont déjà pricés avec la Spot Vol extraite à l&apos;étape 1.
              La différence de valeur isole exactement les nouveaux Caplets (an 1 → an 2), dont
              on extrait la Spot Vol.
            </p>
          </div>
          <div className="flex gap-4">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">3</span>
            <p className="text-gray-600 text-sm leading-relaxed">
              <strong>Répétition</strong> : On itère sur toutes les maturités cotées (2, 3, 5, 7,
              10 ans…). À chaque étape, les Spot Vols précédentes sont figées. On construit ainsi
              progressivement la <strong>Term Structure of Volatility</strong> : la courbe complète
              des volatilités par Caplet.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
          Pourquoi ça compte
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          La Flat Vol est commode pour les sales et les traders qui comparent des prix en un chiffre.
          Mais elle est <strong>inutilisable pour pricer des exotiques</strong> : un produit
          path-dependent (Range Accrual, CMS Spread Option…) dépend de la dynamique de la
          volatilité période par période. Seule la Spot Vol (extraite par bootstrapping) permet
          de construire un modèle de taux correctement calibré et d&apos;éviter les arbitrages internes.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 5 — Grecques : le conflit Delta/Rho
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="grecques-conflit-delta-rho" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        5. Greeks : le conflit Delta/Rho
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        La sensibilité d&apos;un Cap aux taux est plus subtile que celle d&apos;une option vanille sur action.
        Intuitivement, le Long Cap est une position <strong>Long taux</strong> (il gagne quand les
        taux montent). Ce qui, en termes obligataires, correspond à être <strong>Short prix
        d&apos;obligations</strong> : techniquement l&apos;opposé d&apos;un Call sur action, qui est Long sous-jacent.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
          Intuition économique
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          Long Cap = Long taux = Short prix obligations. Quand les taux montent, la valeur
          intrinsèque du Caplet augmente (le taux de marché dépasse le strike), mais les facteurs
          d&apos;escompte baissent (les flux futurs valent moins aujourd&apos;hui). Ces deux effets
          s&apos;opposent.
        </p>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        Pour formaliser, on décompose l&apos;impact d&apos;une hausse parallèle de la courbe en deux effets
        antagonistes sur la valeur d&apos;un Caplet :
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
            Effet Delta (Forward)
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            La hausse des taux fait monter les taux forward <InlineMath>L_i</InlineMath> anticipés.
            La valeur intrinsèque <InlineMath>{'(L_i - K)_+'}</InlineMath> augmente. Le Caplet
            gagne de la valeur par cet effet. C&apos;est l&apos;effet <strong>Delta</strong> (sensitvité
            au taux forward).
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
            Effet Rho (Discounting)
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            La même hausse des taux fait baisser le facteur d&apos;escompte{' '}
            <InlineMath>{'DF(0,\\, t_{i+1})'}</InlineMath>. La valeur actuelle du gain futur
            diminue. Le Caplet perd de la valeur par cet effet. C&apos;est l&apos;effet <strong>Rho</strong>{' '}
            (sensibilité à la courbe d&apos;actualisation).
          </p>
        </div>
      </div>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-8">
        <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3 text-center">
          Conclusion
        </p>
        <p className="text-gray-700 text-sm leading-relaxed text-center">
          L&apos;effet Delta (Forward) domine l&apos;effet Rho (Discounting) en pratique : un Long Cap
          gagne bien de la valeur quand les taux montent. Mais le quant ne peut pas se contenter
          de cette intuition pour hedger : il calcule précisément le ratio des deux sensibilités
          (Forward DV01 vs OIS DV01) pour delta-hedger correctement le book, en distinguant
          la courbe de projection (Euribor) et la courbe d&apos;actualisation (OIS).
        </p>
      </div>

      {/* ── Lien quiz ── */}
      <div className="mt-10 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-gray-700">
        Un quiz sur le Module 5 sera bientôt disponible.
      </div>

      {/* ── Navigation Précédent / Suivant ── */}
      <div className="flex justify-between mt-12 pt-6 border-t border-gray-300">
        <a href="/cours/module-4-taux-credit/interest-rate-swap" className="text-blue-600 hover:underline text-sm">
          ← Interest Rate Swap
        </a>
        <a href="/cours/module-5-fixed-income-2/bond-options-swaptions" className="text-blue-600 hover:underline text-sm">
          Bond Options & Swaptions →
        </a>
      </div>

    </article>
  );
}
