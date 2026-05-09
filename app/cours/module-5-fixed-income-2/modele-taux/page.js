import Link from 'next/link';
import { InlineMath, BlockMath } from '../../../components/Math';

export const metadata = {
  title: 'Modèles de taux — Finance according to James',
  description:
    'De Vasicek à Hull-White : modélisation du taux court, corrélation parfaite et alternatives HJM/LMM.',
};

export default function ModeleTauxPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12">

      {/* ── Fil d'Ariane ── */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/cours" className="hover:text-blue-600 transition-colors">Cours</Link>
        <span>/</span>
        <span className="text-gray-500">Module 5 — Fixed Income II</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">Modèles de taux</span>
      </nav>

      {/* ── Titre ── */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
        Modèles de taux
      </h1>

      {/* ── Introduction ── */}
      <p className="text-lg text-gray-600 leading-relaxed mb-4">
        Pour pricer des produits complexes comme les Bermudéennes ou les Range Accruals,
        un instantané de la courbe des taux ne suffit pas. Il faut simuler la{' '}
        <strong>trajectoire complète des taux dans le temps</strong>, et c&apos;est le rôle
        des modèles de taux court.
      </p>
      <p className="text-gray-600 leading-relaxed mb-10">
        Tout commence par la modélisation du <strong>taux court instantané</strong>{' '}
        <InlineMath>r_t</InlineMath> : le taux au jour le jour que pilote directement
        la banque centrale. La courbe entière en découle via les anticipations et
        les primes de terme (cf. module Macro).
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 1 — Pourquoi un modèle de taux court ?
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="pourquoi" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-24">
        1. Fondamentaux
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Pour un <strong>Swaption européen</strong>, Bachelier ou Black suffisent : il n&apos;y a
        qu&apos;une seule date d&apos;exercice et un seul taux forward à pricer. La formule fermée
        donne directement le prix.
      </p>
      <p className="text-gray-600 leading-relaxed mb-8">
        Pour un <strong>Swaption bermudéenne</strong> ou un <strong>Range Accrual</strong>,
        c&apos;est une autre histoire. L&apos;exercice peut intervenir à n&apos;importe quelle date, et
        le coupon dépend du chemin parcouru par les taux chaque jour. Il faut donc simuler
        toute la <em>vie</em> de la courbe (ce que les formules fermées ne permettent pas).
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        Le point de départ est <strong>Vasicek (1977)</strong>, le modèle ancêtre. Son
        intuition centrale : les taux ne s&apos;envolent pas à l&apos;infini, ils{' '}
        <em>reviennent à la moyenne</em>.
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center text-gray-900">
        <BlockMath>{'dr_t = a(b - r_t)\\,dt + \\sigma\\,dW_t'}</BlockMath>
      </div>

      <ul className="space-y-3 mb-6 text-gray-600 text-sm leading-relaxed">
        <li>
          <InlineMath>b</InlineMath> <strong>(niveau cible)</strong> : la moyenne de long terme
          vers laquelle les taux reviennent après chaque choc économique.
        </li>
        <li>
          <InlineMath>a</InlineMath> <strong>(vitesse de retour)</strong> : la vitesse de retour vers la moyenne (la force de l'élastique).
          Plus <InlineMath>a</InlineMath> est grand, plus le retour vers <InlineMath>b</InlineMath> est rapide.
        </li>
        <li>
          <InlineMath>{`\\sigma\\,dW_t`}</InlineMath> <strong>(choc aléatoire)</strong> : le bruit
          du marché, source de volatilité du taux court, qui illustre les chocs économiques.
        </li>
      </ul>

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-2">
          La limite de Vasicek
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          C&apos;est un modèle <em>d&apos;équilibre</em> : les paramètres{' '}
          <InlineMath>{`(a, b, \\sigma)`}</InlineMath> sont constants. Il est incapable
          de reproduire exactement la courbe des taux observée aujourd&apos;hui sur Bloomberg.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 2 — Hull-White 1-Facteur
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="hw1f" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        2. Hull-White 1-Facteur
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Hull et White (1990) corrigent Vasicek en rendant ses paramètres{' '}
        <em>dépendants du temps</em>. On parle souvent de &ldquo;Vasicek étendu&rdquo; car
        la structure est identique. Le drift devient une fonction calibrée sur la
        courbe du jour.
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-8 text-center text-gray-900">
        <BlockMath>{'dr_t = \\bigl[\\theta(t) - a(t)\\,r_t\\bigr]\\,dt + \\sigma(t)\\,dW_t'}</BlockMath>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-5">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          <InlineMath>{`\\theta(t)`}</InlineMath> — calibration no-arbitrage
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Ce n&apos;est plus une cible fixe mais une fonction que l&apos;on déduit analytiquement
          des prix de zéro-coupon observés. Grâce à <InlineMath>{`\\theta(t)`}</InlineMath>,
          le modèle redonne <em>exactement</em> la courbe des taux d&apos;aujourd&apos;hui (propriété de non-arbitrage qui le distingue de Vasicek).
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-5">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          <InlineMath>{`\\sigma(t)`}</InlineMath> — calibration de la volatilité
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          En rendant la volatilité dépendante du temps, on calibre le modèle sur les
          Swaptions cotées en marché : chaque tranche de maturité reçoit son propre niveau
          de volatilité. C&apos;est ce qui permet de reproduire la{' '}
          <em>structure par terme de la volatilité</em> observée sur le cube.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Arbres de taux et backward induction
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Hull-White 1F se prête naturellement à la construction d&apos;un{' '}
          <strong>arbre trinomial</strong>. Sur chaque nœud, on peut décider si une option
          américaine ou bermudéenne doit être exercée (backward induction),
          méthode pour les Callables et les Bermudéennes. Voir{' '}
          <a href="/cours/module-5-fixed-income-2/bond-options-swaptions" className="text-blue-600 hover:underline font-medium">
            Bond Options &amp; Swaptions
          </a>{' '}
          pour le détail de l&apos;optimal stopping time.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 3 — La limite fatale : corrélation parfaite
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="limite" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        3. La limite du 1-Facteur
      </h2>

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-3">
          Un seul facteur = corrélation parfaite entre tous les taux
        </p>
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Dans Hull-White 1F, un seul Brownien <InlineMath>dW_t</InlineMath> drive
          l&apos;ensemble de la courbe. Conséquence : tous les taux sont parfaitement corrélés.
          Si le taux 2 ans monte, le taux 10 ans monte <em>forcément</em> dans le même sens,
          avec la même intensité relative.
        </p>
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          La courbe peut monter, descendre ou se déplacer en parallèle, mais elle ne peut
          pas se <strong>tordre</strong>. Un mouvement de pentification (le court terme monte
          pendant que le long terme baisse) est mathématiquement impossible dans ce cadre.
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Il est de fait que Hull-White 1F est incapable de pricer correctement les{' '}
          <strong>CMS Spread Options</strong>, dont le payoff dépend précisément de l&apos;écart
          entre deux taux de maturités différentes. Voir{' '}
          <a href="/cours/module-5-fixed-income-2/cms" className="text-amber-700 hover:underline font-medium">
            CMS &amp; Ajustement de Convexité
          </a>{' '}
          pour la problématique de la corrélation inter-taux.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 4 — Hull-White 2-Facteurs
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="hw2f" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        4. Hull-White 2-Facteurs
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Pour briser la corrélation parfaite, Hull-White 2F ajoute une{' '}
        <strong>seconde source d&apos;aléa</strong> <InlineMath>u_t</InlineMath> au drift du
        taux court. Les deux Browniens évoluent indépendamment, ce qui permet à la courbe
        de se tordre.
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-4 text-center text-gray-900">
        <BlockMath>{'dr_t = \\bigl[\\theta(t) + u_t - a(t)\\,r_t\\bigr]\\,dt + \\sigma_1(t)\\,dW_1'}</BlockMath>
      </div>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-8 text-center text-gray-900">
        <BlockMath>{'du_t = -b\\,u_t\\,dt + \\sigma_2(t)\\,dW_2'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        Le second facteur <InlineMath>u_t</InlineMath> est lui-même mean-reverting vers zéro (-b est un constante).
        Il joue le rôle d&apos;une <em>perturbation lente</em> qui décale le drift du taux court
        sur le long terme, sans toucher au court terme. C&apos;est ce découplage qui permet à
        la courbe de se pentifier ou de s&apos;aplatir indépendamment du niveau absolu des taux.
      </p>

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 mb-5">
        <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-2">
          Risque d&apos;over-fit qui peut engendrer une instabilité numérique
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Avec deux fonctions <InlineMath>{`\\sigma_1(t)`}</InlineMath> et{' '}
          <InlineMath>{`\\sigma_2(t)`}</InlineMath> dépendant du temps, le modèle dispose
          de beaucoup de degrés de liberté. En calibrant trop finement sur les Swaptions,
          on génère des fonctions <InlineMath>{`\\sigma(t)`}</InlineMath> très irrégulières ou
          oscillantes, ce qui rend la simulation Monte Carlo
          instable et les arbres difficiles à construire.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Formules fermées pour les zéro-coupons
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Malgré la complexité accrue, Hull-White 2F conserve des formules analytiques pour
          les prix de zéro-coupon. Cela permet de calibrer rapidement le modèle sur la
          courbe des taux sans recourir à la simulation. On n&apos;utilise Monte Carlo ou
          l&apos;arbre que pour les produits path-dependent, une fois la calibration achevée.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 5 — HJM et LMM : pourquoi on s'arrête là
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="hjm-lmm" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        5. HJM et LMM : ouvertures académiques
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Au-delà de Hull-White, deux familles dominent la recherche académique et certains
        desks de vanilles complexes. Elles sont plus générales, mais aussi plus lourdes en
        implémentation, d&apos;où le choix de HW pour la production quotidienne.
      </p>

      <div className="bg-gray-50 border border-gray-300 rounded-xl p-6 mb-5">
        <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
          HJM — Heath-Jarrow-Morton (1992)
        </p>
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          HJM modélise directement la <em>dynamique des taux forward</em> pour toutes les
          maturités simultanément (pas seulement les taux courts comme ceux précédemment expliqués). C&apos;est un cadre général de Hull-White qui en est un cas particulier
          de HJM avec une structure de drift spécifique.
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          <strong>Limite :</strong> Le drift d&apos;un taux forward HJM dépend de la
          volatilité de tous les autres taux forward (condition de non-arbitrage de HJM). Le modèle a donc de la mémoire : la trajectoire future d&apos;un taux dépend de tous les chocs passés sur tous les autres taux.
          Un arbre où les branches se rejoignent ne sert donc à rien car tout le chemin parcouru compte. Cela rend la simulation Monte Carlo obligatoire et donc inadapté aux Bermudéennes,
          qui nécessitent une évaluation backward sur un arbre.
        </p>
      </div>

      <div className="bg-gray-50 border border-gray-300 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
          LMM — Libor Market Model (Brace-Gatarek-Musiela, 1997)
        </p>
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Le LMM modélise directement les <em>taux de marché observables</em> (Euribor 3M,
          SOFR...) plutôt qu&apos;un taux court fictif. Sa calibration sur Caps et Swaptions
          est naturelle et intuitive, et chaque taux forward a sa propre volatilité lognormale
          ou normale.
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          <strong>Limites :</strong> dès qu&apos;on modélise <InlineMath>N</InlineMath> taux
          forward, la matrice de corrélation est de taille{' '}
          <InlineMath>{'N \\times N'}</InlineMath> et la dimensionnalité explose. La transition
          post-LIBOR (passage au SOFR, EUSTR...) a considérablement alourdi l&apos;implémentation.
        </p>
      </div>

      <div className="border-l-4 border-blue-400 pl-5 py-1 my-8">
        <p className="text-gray-700 italic leading-relaxed">
          La règle à retenir : <strong>Hull-White pour tout ce qui nécessite un arbre</strong>{' '}
          (Bermudéennes, Callables, Range Accruals callables).
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Pour aller plus loin
        </p>
        <ul className="text-gray-700 text-sm leading-relaxed space-y-2">
          <li>
            <strong>Brigo &amp; Mercurio</strong> — <em>Interest Rate Models: Theory and
            Practice</em> (2006) : la référence complète sur HJM, LMM et leurs variantes SABR.
          </li>
          <li>
            <strong>Andersen &amp; Piterbarg</strong> — <em>Interest Rate Modeling</em>{' '}
            (3 volumes, 2010) : implémentation numérique, arbres, Monte Carlo,
            gestion du cube de volatilité.
          </li>
          <li>
            <strong>Mon rapport de stage</strong> — <em>Dividend Swaps Modeling</em>{' '}
            (2026) : Dans mon dernier chapitre de travail de recherche j'ai implémenter un double Vasicek pour modéliser les dividendes futures. Disponible dans la section "À propos" du site.
          </li>
        </ul>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Tableau synthèse
      ══════════════════════════════════════════════════════════════ */}
      <h2 className="text-xl font-bold text-gray-900 mt-14 mb-4">
        Tableau synthèse
      </h2>

      <div className="overflow-x-auto mb-3">
        <table className="w-full text-sm border border-gray-300 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-50 text-gray-700">
              <th className="text-left px-4 py-3 font-semibold border-b border-gray-300">Modèle</th>
              <th className="text-left px-4 py-3 font-semibold border-b border-gray-300">Principe</th>
              <th className="text-left px-4 py-3 font-semibold border-b border-gray-300">Usage principal</th>
              <th className="text-left px-4 py-3 font-semibold border-b border-gray-300">Limites</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y divide-gray-200">
            <tr>
              <td className="px-4 py-3 font-medium text-gray-800">HW 1F</td>
              <td className="px-4 py-3">Vasicek étendu : fit no-arbitrage de la courbe spot</td>
              <td className="px-4 py-3">Bermudéennes, Callables, Range Accruals</td>
              <td className="px-4 py-3">Corrélation parfaite entre taux</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-800">HW 2F</td>
              <td className="px-4 py-3">Deux facteurs indépendants : la courbe peut se tordre</td>
              <td className="px-4 py-3">CMS Spreads, produits sensibles à la pente</td>
              <td className="px-4 py-3">Over-fit, instabilité numérique de <InlineMath>{`\\sigma(t)`}</InlineMath></td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-gray-800">HJM</td>
              <td className="px-4 py-3">Framework général : modélise tous les taux forward</td>
              <td className="px-4 py-3">Recherche, pricing exotique en Monte Carlo</td>
              <td className="px-4 py-3">Monte Carlo obligatoire donc inadapté aux arbres</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-800">LMM</td>
              <td className="px-4 py-3">Taux de marché directement (Euribor / SOFR)</td>
              <td className="px-4 py-3">Caps, Swaptions, portefeuilles de vanilles</td>
              <td className="px-4 py-3">Dimensionnalité explosive, complexité post-LIBOR</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-400 mb-8">
        Note : SABR n&apos;apparaît pas dans ce tableau car il ne modélise pas la dynamique du
        taux court. C&apos;est un modèle de volatilité de marché (smile de taux forward),
        distinct de la famille des modèles de taux court. Il est souvent utilisé en
        complément de ces modèles pour gérer le smile aux barrières.
      </p>

      {/* ── Lien quiz ── */}
      <div className="mt-10 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-gray-700">
        Un quiz sur le Module 5 sera bientôt disponible.
      </div>

      {/* ── Navigation Précédent / Suivant ── */}
      <div className="flex justify-between mt-12 pt-6 border-t border-gray-300">
        <a href="/cours/module-5-fixed-income-2/range-accrual" className="text-blue-600 hover:underline text-sm">
          ← Range Accrual
        </a>
        <div />
      </div>

    </article>
  );
}
