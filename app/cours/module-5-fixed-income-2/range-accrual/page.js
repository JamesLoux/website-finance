import Link from 'next/link';
import { InlineMath, BlockMath } from '../../../components/Math';
import DigitalReplicationWrapper from './DigitalReplicationWrapper';

export const metadata = {
  title: 'Range Accrual — Finance according to James',
  description:
    'Mécanique, structuration cross-asset, clause callable et décomposition quant du Range Accrual.',
};

export default function RangeAccrualPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12">

      {/* ── Fil d'Ariane ── */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/cours" className="hover:text-blue-600 transition-colors">Cours</Link>
        <span>/</span>
        <span className="text-gray-500">Module 5 — Fixed Income II</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">Range Accrual</span>
      </nav>

      {/* ── Titre ── */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
        Range Accrual
      </h1>

      {/* ── Introduction ── */}
      <p className="text-lg text-gray-600 leading-relaxed mb-4">
        Dans des marchés où les rendements traditionnels s&apos;essoufflent, les investisseurs
        cherchent à extraire de la valeur de la <strong>stabilité</strong>. Le Range Accrual
        est un incontournable des Fixed Income.
      </p>
      <p className="text-gray-600 leading-relaxed mb-10">
        Le principe est qu'un coupon élevé s&apos;accumule chaque jour où le sous-jacent
        reste à l&apos;intérieur d&apos;un range <InlineMath>{'[L, H]'}</InlineMath>.
        Dès qu&apos;il en sort, le compteur s&apos;arrête. L&apos;investisseur est donc vendeur de
        volatilité.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 1 — Mécanique et structuration commerciale
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="mecanique" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-24">
        1. Mécanique et structuration commerciale
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        À chaque date de constatation quotidienne, le produit vérifie si l&apos;actif de
        référence se situe dans le range <InlineMath>{'[L, H]'}</InlineMath>. Le coupon
        final est proportionnel au nombre de jours passés à l&apos;intérieur.
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-8 text-center text-gray-900">
        <BlockMath>{'\\text{Coupon}_{\\text{total}} = C_{\\text{fixe}} \\times \\frac{N_{\\text{jours dans le tunnel}}}{N_{\\text{total}}}'}</BlockMath>
      </div>


      <p className="text-gray-600 leading-relaxed mb-4">
        On peut désaxer le tunnel <InlineMath>{'[L, H]'}</InlineMath> pour exprimer une vue
        bearish (range positionné sous le spot) ou bullish. C'est un biais unidirectionnel.
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        Commercialement, on ajoute
        souvent une garantie minimale (MinGtee) pour rassurer l&apos;investisseur :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center text-gray-900">
        <BlockMath>{'\\text{Coupon} = \\max\\!\\bigl(\\text{MinGtee},\\; C_{} \\times \\text{ratio}\\bigr)'}</BlockMath>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Pourquoi une MinGtee ? (Minimum Guarantee)
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Elle évite que l&apos;investisseur ne perçoive zéro coupon si le marché sort
          immédiatement du range. Un plancher à 1% est courant : il préserve l&apos;attractivité
          commerciale du produit sans céder trop de valeur optionnelle.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 2 — L'ingénierie cross-asset
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="cross-asset" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        2. Cross-asset version
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Pour offrir des coupons très supérieurs au marché, les banques créent des Range
        Accruals multi-actifs en liant le coupon à deux actifs de natures différentes.
        La condition journalière devient un produit de deux indicatrices.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 bg-gray-50 border border-gray-300 rounded-xl p-5">
          <p className="text-sm font-semibold text-gray-700 mb-2">Actions US + Devises</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Le coupon s&apos;accumule si le S&amp;P 500 ne monte pas de plus de 20% <em>et</em>{' '}
            si l&apos;USD ne s&apos;apprécie pas de plus de 15% contre l&apos;euro. L&apos;investisseur
            parie sur la stabilité simultanée des marchés actions et du change.
          </p>
        </div>
        <div className="flex-1 bg-gray-50 border border-gray-300 rounded-xl p-5">
          <p className="text-sm font-semibold text-gray-700 mb-2">Pétrole + Actions</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Pari sur la résilience d&apos;un secteur industriel et la stabilité des coûts
            énergétiques. Si le pétrole s&apos;emballe ou si les actions corrigent, le coupon
            s&apos;arrête de s&apos;accumuler.
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          L'investisseur est long corrélation
        </p>
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Si les actifs sont indépendants,{' '}
          <InlineMath>{'P(A \\cap B) = P(A) \\times P(B)'}</InlineMath> et <InlineMath>{'\\rho = 0'}</InlineMath>, la probabilité
          conjointe de rester dans les deux tunnels est faible, ce qui justifie un coupon
          élevé si on est avant l'émission du produit. La pire corrélation pour l'acheteur serait 0 si le Range Accrual est bidirectionnel (où l'investisseur n'a pas désaxé le range)
          ou -1 si le Range Accrual est unidirectionnel (quand l'investisseur l'a désaxé pour exprimer une vue bearish ou bullish).
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Si la corrélation monte, les actifs se comportent de façon similaire : soit ils
          restent tous dans le tunnel, soit ils en sortent ensemble.
          L&apos;investisseur est donc <strong>long corrélation</strong> et la banque (l'émetteur) est donc <strong>short corrélation</strong> et{' '}
          <strong>long dispersion</strong> pendant la durée de vie du produit.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 3 — La clause callable
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="callable" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        3. Callable version
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Le Callable Range Accrual est l&apos;une des versions les plus populaires. La banque se
        réserve le droit de rembourser par anticipation (souvent tous les semestres). C&apos;est
        un échange de bons procédés entre l&apos;émetteur et l&apos;investisseur.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
            Pour l&apos;investisseur
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            En cédant l&apos;option de rappel à la banque, il <strong>subventionne son propre
            coupon</strong>. La valeur de l&apos;option cédée est transformée en rendement
            supplémentaire. Il espère souvent un rappel rapide (early redemption) pour
            récupérer son capital et le réinvestir dans des conditions potentiellement
            meilleures.
          </p>
        </div>
        <div className="flex-1 bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
            Pour la banque
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            Elle exercera son droit si les conditions lui deviennent défavorables. Si la
            volatilité s&apos;effondre, l&apos;actif reste dans le tunnel, le coupon est payé
            régulièrement, et la banque rappelle pour se libérer d&apos;un engagement coûteux.
            Si la volatilité explose, elle paie peu voire rien et n&apos;a aucune raison de
            rappeler.
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 4 — La décomposition quant : somme de digitales
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="decomposition-quant" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        4. Somme de digitales
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Structurellement, le Range Accrual est un portefeuille d&apos;options digitales journalières.
        Chaque jour de constatation est une option binaire qui vaut 1 si tous les actifs sont
        dans leur tunnel, 0 sinon.
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        La condition journalière, pour un produit lié à <InlineMath>M</InlineMath> actifs, s&apos;écrit :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-4 text-center text-gray-900">
        <BlockMath>{'\\prod_{j=1}^{M} \\mathbf{1}_{\\{L_j < S_j(t) < H_j\\}}'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        Le coupon total implique ces indicatrices en une somme de jours sur toute la durée du produit. On a simplement une formule plus générale que celle présentée précédemment :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center text-gray-900">
        <BlockMath>{'Coupon_{\\text{total}} = C_{\\text{fixe}} \\times \\frac{1}{N} \\sum_{t=1}^{N} \\prod_{j=1}^{M} \\mathbf{1}_{\\{L_j < S_j(t) < H_j\\}}'}</BlockMath>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Modélisation
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          C'est un actif path-dependent dû aux barrières. Le prix dépend de la capacité du modèle à capturer la pente de la volatilité
          (le skew) aux barrières. Si le modèle sous-estime la probabilité qu&apos;un actif
          touche sa borne, le produit est mal valorisé. L&apos;utilisation de modèles à
          volatilité stochastique est indispensable pour capturer la dynamique
          réelle aux barrières.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 5 — Gestion des risques : Gamma et Call Spread
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="gestion-risques" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        5. Réplication pour gestion des risques
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Comme pour toute option digitale qui se respectent, le risque est aux abords
        des barrières <InlineMath>L</InlineMath> ou <InlineMath>H</InlineMath>, car le Gamma
        devient mathématiquement infini lors des fixings quotidiens. Une légère variation
        de l&apos;actif autour de la barrière peut faire basculer l&apos;indicatrice de 0 à 1,
        engendrant des mouvements de couverture discontinus et coûteux.
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        Et comme pour l'option digit, on contourne ce problème en remplaçant chaque option digitale par un
        Call Spread serré. L&apos;approximation standard est :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center text-gray-900">
        <BlockMath>{'\\text{Digital}(K) \\approx \\frac{\\text{Call}(K-\\varepsilon) - \\text{Call}(K+\\varepsilon)}{2\\varepsilon}'}</BlockMath>
      </div>

      <DigitalReplicationWrapper />

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6 mt-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          L&apos;overhedge
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          En utilisant un
          Call Spread serré entre deux strikes très proches (ex : 99,9% et 100,1%),
          on crée une pente artificielle. Cela <strong>lisse les mouvements de couverture</strong>{' '}
          et rend le risque gérable lors des fixings quotidiens : au lieu d&apos;un saut
          de Delta discontinu, on obtient un Delta qui varie progressivement autour
          de la barrière.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-2">
          Limite
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Plus on souhaite ressérer le spread entre l'Achat et la Vente du call du Call Spread (le spread <InlineMath>{'\\varepsilon'}</InlineMath> entre les deux strikes{' '}
          <InlineMath>{'K - \\varepsilon'}</InlineMath> et{' '}
          <InlineMath>{'K + \\varepsilon'}</InlineMath>), et plus on doit en acheter et en vendre pour que la pente soit suffisamment raide pour approcher la digitale.
          On aurait alors une meilleure réplication mais plus coûteuse.
          C'est un compromis entre la précision de l'approximation et les coûts de transaction.
        </p>
      </div>

      {/* ── Lien quiz ── */}
      <div className="mt-10 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-gray-700">
        Le quiz du Module 5 est disponible —{' '}
        <a href="/quiz/module-5" className="text-blue-600 hover:underline font-medium">S&apos;entraîner →</a>
      </div>

      {/* ── Navigation Précédent / Suivant ── */}
      <div className="flex justify-between mt-12 pt-6 border-t border-gray-300">
        <a href="/cours/module-5-fixed-income-2/bond-options-swaptions" className="text-blue-600 hover:underline text-sm">
          ← Bond Options &amp; Swaptions
        </a>
        <a href="/cours/module-5-fixed-income-2/modele-taux" className="text-blue-600 hover:underline text-sm">
          Modèles de taux →
        </a>
      </div>

    </article>
  );
}
