import Link from 'next/link';
import { InlineMath, BlockMath } from '../../../components/Math';
import ConvexityWrapper from './ConvexityWrapper';

export const metadata = {
  title: 'Duration & Convexité — Finance according to James',
  description:
    'Duration de Macaulay, sensibilité, convexité et DV01 : les outils fondamentaux de mesure et de couverture du risque de taux.',
};

export default function DurationConvexitePage() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12">

      {/* ── Fil d'Ariane ── */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/cours" className="hover:text-blue-600 transition-colors">Cours</Link>
        <span>/</span>
        <span className="text-gray-500">Module 4 — Fixed Income I</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">Duration & Convexité</span>
      </nav>

      {/* ── Titre ── */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
        Duration &amp; Convexité
      </h1>

      {/* ── Introduction ── */}
      <p className="text-lg text-gray-600 leading-relaxed mb-4">
        Une obligation est sensible aux taux d&apos;intérêt : quand les taux montent, son prix baisse,
        et inversement. Mais de <em>combien</em> exactement ? Pour répondre à cette question, les
        praticiens ont développé deux métriques complémentaires : la <strong>duration</strong>,
        qui mesure la sensibilité de premier ordre, et la <strong>convexité</strong>, qui capture
        la courbure de la relation prix-taux.
      </p>
      <p className="text-gray-600 leading-relaxed mb-10">
        Ces deux outils sont les fondements de toute gestion obligataire et de toute stratégie de
        couverture du risque de taux. Ils découlent directement d&apos;un développement de Taylor
        appliqué à la formule de prix.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 1 — Le développement de Taylor appliqué aux obligations
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="taylor" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-24">
        1. Le développement de Taylor appliqué aux obligations
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Le prix d&apos;une obligation est la valeur actuelle de l&apos;ensemble de ses flux futurs,
        actualisés au taux <InlineMath>y</InlineMath> (le <em>yield to maturity</em>) :
      </p>

      <div className="bg-gray-50 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center">
        <BlockMath>{`P(y) = \\sum_i CF_i \\cdot e^{-y\\, t_i}`}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        Lorsque les taux se déplacent d&apos;un niveau <InlineMath>{'y_0'}</InlineMath> vers{' '}
        <InlineMath>{'y_0 + dy'}</InlineMath>, on peut approximer la variation de prix par un
        développement de Taylor d&apos;ordre 2 autour de <InlineMath>{'y_0'}</InlineMath> :
      </p>

      <div className="bg-gray-50 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center">
        <BlockMath>{`P(y_0 + dy) \\approx P(y_0) + \\frac{\\partial P}{\\partial y}\\, dy + \\frac{1}{2}\\frac{\\partial^2 P}{\\partial y^2}\\,(dy)^2`}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        En divisant par <InlineMath>{'P(y_0)'}</InlineMath>, on obtient la variation <em>relative</em>{' '}
        du prix :
      </p>

      <div className="bg-gray-50 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center">
        <BlockMath>{`\\frac{dP}{P} \\approx \\frac{1}{P}\\frac{\\partial P}{\\partial y}\\, dy + \\frac{1}{2}\\cdot\\frac{1}{P}\\frac{\\partial^2 P}{\\partial y^2}\\,(dy)^2`}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        Les deux termes définissent les deux métriques de risque fondamentales :
        la <strong>sensibilité</strong> (ordre 1) et la <strong>convexité</strong> (ordre 2).
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 2 — Duration et Sensibilité — l'ordre 1
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="ordre-1" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        2. Duration et Sensibilité : l&apos;ordre 1
      </h2>

      {/* A) La Duration de Macaulay */}
      <p className="text-gray-900 font-semibold mb-3">A) La Duration de Macaulay</p>

      <p className="text-gray-600 leading-relaxed mb-4">
        La Duration de Macaulay est une moyenne pondérée des dates de réception des flux. Chaque
        échéance <InlineMath>{'t_i'}</InlineMath> est pondérée par le poids relatif de sa valeur
        actuelle dans le prix total de l&apos;obligation. <InlineMath>{'(1+y)^{-t_i}'}</InlineMath> est le facteur d'actualisation en temps discret.
      </p>

      <div className="bg-gray-50 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center">
        <BlockMath>{`D_{mac} = \\frac{\\displaystyle\\sum_i t_i \\cdot CF_i \\cdot (1+y)^{-t_i}}{P}`}</BlockMath>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Intuition
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Une obligation 10 ans avec une duration de Macaulay de 7 ans signifie que l&apos;investisseur
          récupère en moyenne son investissement au bout de 7 ans grâce aux coupons versés en
          cours de vie. Plus les coupons sont élevés, plus cette moyenne est tirée vers le début,
          et plus la duration est courte. Un zéro-coupon a une duration égale à sa maturité.
        </p>
      </div>

      {/* B) La Sensibilité */}
      <p className="text-gray-900 font-semibold mb-3">B) La Sensibilité (Duration Modifiée)</p>

      <p className="text-gray-600 leading-relaxed mb-4">
        La Sensibilité (ou Duration Modifiée pour les anglo-saxon) est définie comme l&apos;opposé
        de la dérivée relative du prix par rapport au taux :
      </p>

      <div className="bg-gray-50 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center">
        <BlockMath>{`S = -\\frac{1}{P}\\cdot\\frac{\\partial P}{\\partial y}`}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        En monde discret, la dérivée de <InlineMath>{'(1+y)^{-t_i}'}</InlineMath> fait apparaître
        un facteur <InlineMath>{'1/(1+y)'}</InlineMath>, ce qui donne le lien avec la Duration
        de Macaulay :
      </p>

      <div className="bg-gray-50 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center">
        <BlockMath>{`S = -\\frac{D_{mac}}{1+y}`}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-8">
        C&apos;est pour cette raison que la Sensibilité est aussi appelée <em>Duration Modifiée</em> :
        c&apos;est simplement la Duration de Macaulay ajustée du facteur <InlineMath>{'(1+y)'}</InlineMath>{' '}
        propre à la convention de taux discret, fois <InlineMath>{'-1'}</InlineMath>.
      </p>

      {/* C) Exemple chiffré */}
      <p className="text-gray-900 font-semibold mb-3">C) Exemple chiffré</p>

      <p className="text-gray-600 leading-relaxed mb-4">
        Si la Sensibilité d&apos;une obligation est <InlineMath>S = -8</InlineMath> et que les taux
        augmentent de <InlineMath>dy = {'+'}1\,\%</InlineMath>, alors la variation de prix
        est approximativement de <strong>-8 %</strong>. Symétriquement, une baisse de taux de
        1 % engendre une hausse de prix d&apos;environ 8 %.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-4">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          À retenir
        </p>
        <BlockMath>{`\\frac{dP}{P} \\approx S \\cdot dy`}</BlockMath>
        <p className="text-gray-700 text-sm leading-relaxed mt-2">
          La Sensibilité est exprimée en années. Une Sensibilité de 8 signifie qu&apos;un choc de
          taux de 1 % engendre une perte (ou un gain) de 8 % sur le prix de l&apos;obligation.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 3 — Le cas du monde continu
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="monde-continu" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        3. Le cas continu
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        En temps continu, les flux sont actualisés via <InlineMath>{'e^{-y\\,t_i}'}</InlineMath>.
        La dérivée de l&apos;exponentielle est elle-même une exponentielle. Le facteur{' '}
        <InlineMath>{'t_i'}</InlineMath> sort directement, sans dénominateur supplémentaire.
        Le terme <InlineMath>{'(1+y)'}</InlineMath> disparaît de l&apos;équation.
      </p>

      <p className="text-gray-600 leading-relaxed mb-6">
        Conséquence : en temps continu, la Sensibilité est exactement égale à la Duration de
        Macaulay. Le delta temporel et le delta de risque ne font qu&apos;un, ce qui donne la formule
        d&apos;approximation :
      </p>

      <div className="bg-gray-50 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center">
        <BlockMath>{`\\frac{dP}{P} \\approx D \\cdot dy`}</BlockMath>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-4">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Pourquoi les quants préfèrent le temps continu
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          En temps continu, Duration de Macaulay et Sensibilité coïncident parfaitement. Les
          formules sont plus propres, les dérivations plus directes. C&apos;est pourquoi les quants
          travaillent presque exclusivement en temps continu. Le passage au discret est
          une question de convention de marché.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 4 — La Convexité — l'ordre 2
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="convexite" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        4. La Convexité : l&apos;ordre 2
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        La relation entre le prix d&apos;une obligation et son taux est une courbe strictement convexe décroissante,
        pas une droite. L&apos;approximation linéaire fournie par la Sensibilité est une droite tangente
        à cette courbe : elle surestime la baisse de prix lors d&apos;une hausse de taux, et sous-estime
        la hausse de prix lors d&apos;une baisse de taux. Pour les grands chocs de taux, cette erreur
        n&apos;est plus négligeable.
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        La Convexité est le terme correctif d&apos;ordre 2. Elle est définie comme la dérivée seconde
        relative du prix :
      </p>

      <div className="bg-gray-50 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center">
        <BlockMath>{`C = \\frac{1}{P}\\cdot\\frac{\\partial^2 P}{\\partial y^2} = \\frac{\\displaystyle\\sum_i t_i^2 \\cdot CF_i \\cdot e^{-y\\,t_i}}{P}`}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        En incorporant les deux ordres, on obtient la formule complète du P&L obligataire :
      </p>

      <div className="bg-gray-50 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center">
        <BlockMath>{`\\frac{dP}{P} \\approx D \\cdot dy + \\frac{1}{2}\\cdot C \\cdot (dy)^2`}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-2">
        Le graphique ci-dessous illustre les trois courbes simultanément. On observe visuellement
        comment l&apos;ordre 2 colle à la courbe réelle là où l&apos;ordre 1 diverge.
      </p>

      <ConvexityWrapper />

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-4 mt-6">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          La convexité est toujours positive
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Pour une obligation classique avec des flux positifs <InlineMath>{'CF_i > 0'}</InlineMath>{' '}
          et des dates strictement positives <InlineMath>{'t_i^2 > 0'}</InlineMath>, la Convexité est
          strictement positive. Le terme <InlineMath>{'\\tfrac{1}{2}C(dy)^2'}</InlineMath> est donc
          toujours positif quel que soit le signe du choc de taux : il amortit les baisses de prix
          et amplifie les hausses. C&apos;est un avantage (si on peut dire cela ainsi) pour le détenteur de l&apos;obligation.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 5 — Convexité négative — l'exception
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="convexite-negative" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        5. Le cas de convexité négative
      </h2>

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 mb-6">
        <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-2">
          Attention
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Certains instruments obligataires intègrent des options implicites qui peuvent rendre
          leur convexité négative dans certaines zones de taux. La convexité positive décrite
          ci-dessus ne s&apos;applique pas à ces produits.
        </p>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        Lorsque les taux baissent fortement, l&apos;émetteur d&apos;une obligation callable (ou l&apos;emprunteur
        immobilier d&apos;un MBS) a intérêt à exercer son option de remboursement anticipé pour se
        refinancer moins cher. Le prix de ces instruments est alors <em>plafonné</em> : la courbe
        prix-taux s&apos;aplatit en haut, et sa dérivée seconde devient localement négative.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
            Callable Bond
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            L&apos;émetteur (une entreprise ou un État) se réserve le droit de racheter sa dette avant
            l&apos;échéance. Si les taux de marché chutent sous son coupon, il exerce cette option pour
            se refinancer à un taux inférieur. Le prix de l&apos;obligation est donc plafonné au prix
            d&apos;exercice. La hausse de prix liée à la baisse des taux est absorbée par l&apos;émetteur et donc subie par le détenteur.
          </p>
        </div>
        <div className="flex-1 bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
            Mortgage-Backed Security (MBS)
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            Un MBS est adossé à un portefeuille de prêts immobiliers. Quand les taux baissent,
            les emprunteurs remboursent par anticipation pour se refinancer. Le détenteur du MBS
            récupère son capital plus tôt que prévu au moment le plus défavorable pour lui,
            car il doit le réinvestir à des taux plus bas. Convexité négative donc perdant si rebalancement à l'instar du gamma pour equity.
          </p>
        </div>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        La convexité négative est un risque pour l&apos;investisseur car c'est comme s'il vendait une option. Elle signifie que le
        produit performe moins bien que prévu dans les deux sens du marché : la hausse de prix
        est plafonnée quand les taux baissent, et la baisse de prix reste entière quand les taux
        montent. C&apos;est pourquoi ces instruments offrent généralement un rendement supplémentaire
        (une prime) pour compenser ce désavantage structurel.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 6 — DV01 et couverture Delta-Neutre
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="dv01" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        6. DV01 et couverture Delta-Neutre
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        La Sensibilité est une métrique relative (en pourcentage). En pratique, les traders
        raisonnent en impact monétaire absolu. Le <strong>DV01</strong> (Dollar Value of a Basis
        Point) mesure la variation de valeur en devise si les taux se déplacent d&apos;exactement
        1 point de base ou aussi appelé "bips" venant de "basis points" (0,01 %, soit 0,0001 en décimal) :
      </p>

      <div className="bg-gray-50 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center">
        <BlockMath>{`DV01 = S \\times P \\times N_{nominal} \\times 0{,}0001`}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        Un trader long une obligation avec un DV01 de <strong>+50 000 €</strong> perd 50 000 €
        si les taux montent d&apos;1 bp, et gagne 50 000 € s&apos;ils baissent d&apos;1 bp. Cette exposition
        directionnelle au niveau des taux est appelée <em>risque Delta</em> du portefeuille de
        taux. Pour être Delta-Neutre, il couvre cette position avec des Futures sur taux
        (Euribor, Bund) ou des Interest Rate Swaps (IRS), dont il connaît le DV01 unitaire.
        Le nombre de contrats nécessaire est :
      </p>

      <div className="bg-gray-50 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center">
        <BlockMath>{`N_{contrats pour la couverture} = -\\frac{DV01_{position}}{DV01_{couverture}}`}</BlockMath>
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 mb-4">
        <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-2">
          Risque de base
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Ce hedge est théorique et suppose que la courbe des taux se déplace en <strong>parallèle</strong> : tous
          les points de la courbe bougent exactement du même montant. En pratique, les chocs de
          taux sont rarement parallèles. La courbe peut se déformer : flattener (court terme monte,
          long terme baisse), butterfly (ventre de courbe se déplace indépendamment des extrémités).
          Le risque résiduel après couverture DV01 s&apos;appelle <em>risque de base</em> ou risque de
          courbure, et nécessite des instruments de couverture additionnels.
        </p>
      </div>

      {/* ── Lien quiz ── */}
      <div className="mt-10 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-gray-700">
        Le quiz du Module 4 est disponible — <a href="/quiz/module-4" className="text-blue-600 hover:underline font-medium">S&apos;entraîner →</a>
      </div>

      {/* ── Navigation Précédent / Suivant ── */}
      <div className="flex justify-between mt-12 pt-6 border-t border-gray-300">
        <a href="/cours/module-4-taux-credit/obligations-bases" className="text-blue-600 hover:underline text-sm">
          ← Obligations &amp; Bases
        </a>
        <a href="/cours/module-4-taux-credit/fwd-rate-agreement" className="text-blue-600 hover:underline text-sm">
          Fwd Rate Agreement →
        </a>
      </div>

    </article>
  );
}
