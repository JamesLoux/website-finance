import Link from 'next/link';
import { InlineMath, BlockMath } from '../../../components/Math';
import ZeroCouponChart from '../../components/ZeroCouponChart';

export const metadata = {
  title: 'Obligations & Bases — Finance according to James',
  description:
    'Structure des obligations à taux fixe, zero-coupon, FRN et Repo : les briques fondamentales du Fixed Income.',
};

export default function ObligationsBasesPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12">

      {/* ── Fil d'Ariane ── */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/cours" className="hover:text-blue-600 transition-colors">Cours</Link>
        <span>/</span>
        <span className="text-gray-500">Module 4 — Fixed Income I</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">Obligations & Bases</span>
      </nav>

      {/* ── Titre ── */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
        Obligations & Bases
      </h1>

      {/* ── Introduction ── */}
      <p className="text-lg text-gray-600 leading-relaxed mb-4">
        Avant d&apos;aborder les swaps ou les dérivés de taux, il faut maîtriser les
        briques élémentaires du Fixed Income : qu&apos;est-ce qu&apos;une obligation, comment se price-t-elle,
        et quels sont les instruments de marché qui permettent de financer et de
        transférer le risque de taux ?
      </p>
      <p className="text-gray-600 leading-relaxed mb-10">
        Ce chapitre couvre quatre instruments fondamentaux : l&apos;obligation à taux fixe,
        le zéro-coupon (ZC), le Floating Rate Note (FRN) et le Repo.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 1 — Un vecteur de flux
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="flux" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-24">
        1. L'obligation : un contrat de dette qui est un vecteur de flux
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Une obligation (ou Bond en anglais) à taux fixe est, dans sa forme la plus générale, une promesse contractuelle
        de payer une séquence de flux{' '}
        <InlineMath>{'CF_1, CF_2, \\ldots, CF_n'}</InlineMath> aux dates{' '}
        <InlineMath>{'t_1, t_2, \\ldots, t_n'}</InlineMath>. Les flux intermédiaires sont les
        coupons (fixes, exprimés en pourcentage du nominal), et le dernier flux inclut le
        remboursement du nominal.
      </p>
      <p className="text-gray-600 leading-relaxed mb-6">
        Pour comparer des flux survenant à des dates différentes, on les ramène à une valeur
        présente en les actualisant (par le facteur <InlineMath>{'e^{-y\\, t_i}'}</InlineMath>). Le prix de l&apos;obligation est la somme de ces valeurs actualisées :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center text-gray-900">
        <BlockMath>{'P(y) = \\sum_{i=1}^{n} CF_i \\cdot e^{-y\\, t_i}'}</BlockMath>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Le yield to maturity
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Le <strong>yield to maturity</strong> <InlineMath>y</InlineMath> est le taux implicite
          qui égalise la valeur actualisée des flux avec le prix coté sur le marché. Ce n&apos;est
          pas un taux observé directement : c&apos;est une convention de cotation, un seul chiffre
          qui résume l&apos;ensemble de la structure par terme des flux de l&apos;obligation.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 2 — Le Rho des taux
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="rho" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        2. Le Rho des taux
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        La relation entre le prix d&apos;une obligation et son yield est <strong>inverse</strong>.
        L&apos;intuition est immédiate : si les taux de marché montent, les flux futurs promis par
        l&apos;obligation d&apos;hier valent moins aujourd&apos;hui (on les actualise à un taux plus élevé).
        Le prix de l&apos;obligation baisse donc mécaniquement.
      </p>
      <p className="text-gray-600 leading-relaxed mb-6">
        Cette sensibilité se démontre formellement en dérivant la formule de pricing par rapport
        à <InlineMath>y</InlineMath> :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center text-gray-900">
        <BlockMath>{'\\frac{\\partial P}{\\partial y} = -\\sum_{i=1}^{n} t_i \\cdot CF_i \\cdot e^{-y\\, t_i} < 0'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        Chaque terme est pondéré par <InlineMath>{'t_i'}</InlineMath>, la date du flux : les flux
        lointains pèsent davantage dans la sensibilité. C&apos;est précisément ce que mesure la
        duration, objet du chapitre suivant.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Différence avec les actions
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Contrairement aux actions dont le Delta peut être positif ou négatif selon la direction
          du marché, une obligation à taux fixe porte <strong>toujours</strong> un risque
          directionnel inverse face aux taux. L&apos;étude de cette sensibilité (sa mesure et sa
          non-linéarité) fait l&apos;objet du chapitre suivant.
        </p>
      </div>

      <p className="text-gray-600 leading-relaxed mb-2">
        Le graphique ci-dessous illustre la trajectoire de valorisation d&apos;un zéro-coupon (ZC)
        de nominal 100 € à maturité variable. Faites varier le rendement exigé pour observer
        l&apos;effet immédiat sur le prix d&apos;entrée. On observe que plus le taux de marché (le rendement exigé) est élevé, plus le prix est bas, et inversement.
        Sa convexité (ou courbure) est due à sa formule de valorisation du ZC qui suit l'exponentielle. Tout cela est détaillé dans la section suivante.
      </p>
      <ZeroCouponChart />

      {/* ══════════════════════════════════════════════════════════════
          Section 3 — Les instruments simples : ZC et T-Bills
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="zc" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        3. Les instruments simples : ZC et T-Bills
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Avant d&apos;étudier les obligations à coupons multiples, il est utile de comprendre l&apos;instrument
        le plus simple : le <strong>zéro-coupon</strong>, qui ne verse qu&apos;un seul flux en fin de vie.
      </p>

      <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
        Le zéro-coupon (ZC)
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        Un ZC de maturité <InlineMath>T</InlineMath> et de nominal <InlineMath>N</InlineMath>
        ne verse qu&apos;un seul flux <InlineMath>N</InlineMath> en <InlineMath>T</InlineMath>,
        sans aucun coupon intermédiaire. Son prix aujourd&apos;hui vaut :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-5 text-center text-gray-900">
        <BlockMath>{'P_{ZC} = N \\cdot e^{-y T}'}</BlockMath>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Lien avec le facteur d&apos;escompte (ou "discount factor")
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Pour <InlineMath>{'N = 1'}</InlineMath>, le prix d&apos;un ZC est exactement le{' '}
          <strong>facteur d&apos;escompte (ou d'actualisation)</strong> <InlineMath>{'DF(0,T)'}</InlineMath>. Toute
          obligation à taux fixe n&apos;est mathématiquement qu&apos;une <strong>combinaison linéaire de ZC</strong> :
          chaque coupon est un ZC, et le remboursement du nominal en est un autre.
          Construire une courbe ZC à partir des prix d&apos;obligations cotées s&apos;appelle le
          bootstrapping, et sera l'objet du chapitre 3 de ce module. C'est cette fameuse courbe que l'on appelle "la courbe des taux".
        </p>
      </div>

      <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
        Les T-Bills
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        Les <strong>Treasury Bills</strong> sont des ZC souverains américains de maturité
        inférieure ou égale à un an (4, 13, 26 ou 52 semaines). Ils ne versent pas de coupon :
        l&apos;investisseur achète le titre en dessous du pair (par convention le pair N = 100) et reçoit le nominal à l&apos;échéance.
        Leur cotation se fait à l&apos;<em>escompte</em>, selon la convention{' '}
        <strong>Actual/360</strong> :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-5 text-center text-gray-900">
        <BlockMath>{'P = N \\times \\left(1 - d \\times \\frac{n}{360}\\right)'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        où <InlineMath>d</InlineMath> est le taux d&apos;escompte annuel coté et <InlineMath>n</InlineMath> est le
        nombre de jours réels jusqu&apos;à l&apos;échéance.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Rôle de marché
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Les T-Bills sont le baromètre du marché monétaire souverain à court terme. C&apos;est sur
          eux que la Fed ancre son taux directeur : le corridor IORB/ON RRP encadre
          le rendement de ces instruments à très court terme.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 4 — Le FRN : quand le coupon s'adapte
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="frn" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        4. Le FRN : quand le coupon s&apos;adapte
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Un <strong>Floating Rate Note (FRN)</strong> est une obligation dont le coupon n&apos;est pas
        fixe : il est réinitialisé à chaque période sur la base d&apos;un taux de référence de marché
        (SOFR, Euribor 3 mois…) augmenté d&apos;un <em>spread</em> de crédit. Le coupon est connu au
        début de chaque période, et non à l&apos;émission comme tout autre obligation.
      </p>
      <p className="text-gray-600 leading-relaxed mb-6">
        Le FRN revient donc toujours au pair à chaque date de reset. Pour l'expliquer considérons une
        seule période, de durée <InlineMath>{'\\delta'}</InlineMath>, avec un taux de référence{' '}
        <InlineMath>r</InlineMath> fixé au début de cette courte période. Le coupon versé en fin de période est{' '}
        <InlineMath>{'r \\delta N'}</InlineMath>. Le prix en début de période vaut :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center text-gray-900">
        <BlockMath>{'P = \\frac{N + r\\,\\delta\\, N}{1 + r\\,\\delta} = N \\cdot \\frac{1 + r\\,\\delta}{1 + r\\,\\delta} = N'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        C'est comme plein de T-bills (ZC) sur chaque durée. Donc à chaque reset, le taux servi est exactement le taux d&apos;escompte : le ratio flux sur
        facteur d&apos;actualisation vaut 1. Le prix revient mécaniquement au pair à chaque fin de période.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Risque de taux vs risque de crédit
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Contrairement à l&apos;obligation fixe, le FRN ne porte quasiment pas de risque de taux
          sur le long terme : son Rho est réinitialisé à zéro à chaque détachement de coupon.
          Son risque principal est le <strong>risque de crédit</strong>, incarné par le spread
          figé à l&apos;émission. Si la qualité de l&apos;émetteur se dégrade, le spread exigé par le marché
          monte, et le prix du FRN baisse pour voir son rendement monter.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 5 — Le Repo : financer et arbitrer
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="repo" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        5. Le Repo : financer et arbitrer
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Un <strong>Repo</strong> (<em>repurchase agreement</em>) est économiquement 
        un prêt collatéralisé : le vendeur cède une obligation au comptant et s&apos;engage à la
        racheter à une date future et à un prix convenu à l&apos;avance (ce prix est défini par le taux repo). L&apos;acheteur avance du cash
        et reçoit l&apos;obligation comme garantie.
      </p>
      <p className="text-gray-600 leading-relaxed mb-6">
        Le coût de ce financement est le <strong>taux de Repo</strong>{' '}
        <InlineMath>R</InlineMath>. Sur une durée <InlineMath>{'dt'}</InlineMath> (exprimée en
        fraction d&apos;année sur base Actual/360), le cash remis à terme par le vendeur vaut :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center text-gray-900">
        <BlockMath>{'\\text{Cash remis} = \\text{Cash initial} \\times \\left(1 + R \\times \\frac{dt}{360}\\right)'}</BlockMath>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-5">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          La clé de voûte de l&apos;arbitrage
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Dans toute équation de pricing de dérivés obligataires (que l'on abordera individuellement), c&apos;est <InlineMath>R</InlineMath> qui définit le coût de portage réel, pas un taux
          sans risque théorique. Un desk obligataire finance l&apos;essentiel de son book via le marché
          Repo.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-2">
          Special Repo
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Un taux de Repo anormalement bas (<em>special repo</em>) peut signaler une pénurie du
          titre (le collatéral) sur le marché : le titre est très demandé comme collatéral (par exemple par des
          vendeurs à découvert cherchant à l&apos;emprunter). Cette rareté se traduit par un taux de
          financement inférieur au Repo général (<em>GC Repo</em>), ce qui constitue en soi une
          prime de rareté observable.
        </p>
      </div>

      {/* ── Lien quiz ── */}
      <div className="mt-10 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-gray-700">
        Un quiz sur le Module 4 sera bientôt disponible.
      </div>

      {/* ── Navigation Précédent / Suivant ── */}
      <div className="flex justify-between mt-12 pt-6 border-t border-gray-300">
        <a href="/cours/module-3-grecques/arbitrage-theta-gamma" className="text-blue-600 hover:underline text-sm">
          ← Arbitrage Theta-Gamma
        </a>
        <a href="/cours/module-4-taux-credit/duration-convexite" className="text-blue-600 hover:underline text-sm">
          Duration & Convexité →
        </a>
      </div>

    </article>
  );
}
