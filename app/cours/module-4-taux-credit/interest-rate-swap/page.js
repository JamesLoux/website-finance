import Link from 'next/link';
import { InlineMath, BlockMath } from '../../../components/Math';

export default function InterestRateSwap() {
  return (
    <article className="px-6 py-12 max-w-3xl">

      {/* Fil d'Ariane */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/cours" className="hover:underline">Cours</Link>
        <span className="mx-2">›</span>
        <Link href="/cours/module-4-taux-credit/obligations-bases" className="hover:underline">Fixed Income I</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-700">Interest Rate Swap</span>
      </nav>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">Interest Rate Swap</h1>

      <p className="text-gray-600 leading-relaxed mb-10">
        Le bootstrapping vu au chapitre précédent construit la courbe zéro-coupon jusqu'à deux ou trois ans, là où les FRA et futures sont liquides. Pour pricer des flux à 10, 20 ou 50 ans, l'instrument de référence est l'Interest Rate Swap (le fameux, l'incontournable !). C'est l'outil central de la gestion actif-passif et de la courbe des taux long terme.
      </p>

      {/* ── Section 1 ── */}
      <h2 id="definition-conventions" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        1. Définition et conventions
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Un IRS est un contrat de gré à gré (OTC) où deux contreparties échangent périodiquement des flux d'intérêts calculés sur un notionnel <InlineMath>{'N'}</InlineMath>, sans jamais échanger le principal lui-même. La logique est simple : l'une paie un taux fixe convenu à l'avance, l'autre paie un taux variable réinitialisé à chaque période.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-2">Payer Swap</p>
          <p className="text-gray-700 text-sm leading-relaxed">
            On paie le taux fixe, on reçoit le variable. C'est une protection contre la hausse des taux : économiquement équivalent à être <strong>long taux / short obligation</strong>.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-2">Receiver Swap</p>
          <p className="text-gray-700 text-sm leading-relaxed">
            On reçoit le taux fixe, on paie le variable. On parie sur une baisse des taux : équivalent à être <strong>short taux / long obligation</strong>.
          </p>
        </div>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        En pratique, les deux contreparties ne versent pas chaque flux séparément : on calcule la différence nette à chaque date de paiement (ce qu'on appelle le netting), ce qui réduit le risque de contrepartie et les coûts opérationnels.
      </p>

      <p className="text-gray-600 leading-relaxed mb-3">
        Un détail qui compte pour le pricing exact : la fraction d'année <InlineMath>{'\\delta_i'}</InlineMath> n'est pas calculée de la même façon pour les deux jambes.
      </p>

      <div className="bg-gray-50 border border-gray-300 rounded-xl overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-3 text-gray-700 font-semibold">Jambe</th>
              <th className="text-left px-4 py-3 text-gray-700 font-semibold">Convention</th>
              <th className="text-left px-4 py-3 text-gray-700 font-semibold">Remarque</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-4 py-3 text-gray-700 font-medium">Fixe</td>
              <td className="px-4 py-3 text-gray-700">30/360</td>
              <td className="px-4 py-3 text-gray-600">Standard européen, chaque mois vaut 30 jours</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-gray-700 font-medium">Variable</td>
              <td className="px-4 py-3 text-gray-700">Exact/360</td>
              <td className="px-4 py-3 text-gray-600">Nombre réel de jours calendaires sur 360</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── Section 2 ── */}
      <h2 id="pricing-single-curve" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        2. Pricing classique : le monde single-curve
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        À l'initiation, un swap est conclu à valeur nulle : le taux fixe <InlineMath>{'S'}</InlineMath> (appelé par swap rate) est précisément celui qui égalise les deux jambes (comme tous les swaps). Commençons par établir la valeur de la jambe variable, résultat qui découle directement de la structure télescopique des facteurs d'escompte.
      </p>

      <p className="text-gray-600 leading-relaxed mb-3">
        Un FRN (Floating Rate Note) revient au pair à chaque date de reset. Entre deux resets, le flux variable reçu en <InlineMath>{'t_i'}</InlineMath> est le taux forward <InlineMath>{'F(t_{i-1}, t_i)'}</InlineMath> fixé en <InlineMath>{'t_{i-1}'}</InlineMath>. Actualisé en 0, chaque flux vaut :
      </p>

      <div className="bg-gray-100 rounded-xl px-8 py-5 mb-4 text-center">
        <BlockMath>{'DF(t_{i-1}) - DF(t_i)'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-3">
        La somme sur toutes les périodes est télescopique : tout s'annule sauf le premier et le dernier terme.
      </p>

      <div className="bg-gray-100 rounded-xl px-8 py-5 mb-6 text-center">
        <BlockMath>{'PV_{\\text{variable}} = DF(0) - DF(T) = 1 - DF(T)'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        La jambe fixe est plus directe : c'est une somme de coupons fixes actualisés. En posant <InlineMath>{'\\text{Annuité} = \\sum_{i=1}^{n} \\delta_i \\cdot DF(t_i)'}</InlineMath>, on a <InlineMath>{'PV_{\\text{fixe}} = S \\times \\text{Annuité}'}</InlineMath>. L'égalisation des deux jambes donne le par swap rate :
      </p>

      <div className="bg-gray-100 rounded-xl px-8 py-5 mb-4 text-center">
        <BlockMath>{'S = \\frac{1 - DF(T)}{\\text{Annuité}}'}</BlockMath>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-8">
        <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-2">L'Annuité comme mesure de risque</p>
        <p className="text-gray-700 text-sm leading-relaxed">
          L'Annuité (aussi notée PVBP pour <em>Present Value of a Basis Point</em>) est la sensibilité du swap au taux fixe. Multipliée par <InlineMath>{'0{,}0001'}</InlineMath>, elle donne directement le DV01 de la jambe fixe (cf. section 4).
        </p>
      </div>

      {/* ── Section 3 ── */}
      <h2 id="multi-curve" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        3. Le paradigme multi-curve (post-2008)
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Avant 2008, une seule courbe suffisait : on projetait les taux variables et on actualisait les flux avec les mêmes facteurs d'escompte. La crise a brisé cette hypothèse.
      </p>

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 mb-6">
        <p className="text-amber-700 uppercase tracking-wide text-xs font-semibold mb-2">Pourquoi 2008 a tout changé</p>
        <p className="text-gray-700 text-sm leading-relaxed">
          En septembre 2008, le basis spread Euribor 3M / OIS s'est écarté à plus de 350 points de base. Un écart qui était censé être négligeable (quelques points de base) est devenu un risque majeur. La raison : l'Euribor intègre un risque de crédit interbancaire, alors que le taux OIS reflète un taux quasi sans risque (prêts au jour le jour). Ces deux grandeurs ne peuvent plus être traitées comme identiques.
        </p>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        Le pricing moderne repose désormais sur deux courbes distinctes, avec des rôles bien séparés.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-2">Courbe de projection (Euribor)</p>
          <p className="text-gray-700 text-sm leading-relaxed">
            Sert à estimer les taux forwards futurs qui seront payés sur la jambe variable. Elle intègre la prime de risque interbancaire.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-2">Courbe d'actualisation (OIS)</p>
          <p className="text-gray-700 text-sm leading-relaxed">
            Sert à calculer la valeur présente des flux. Les swaps étant collatéralisés quotidiennement via le contrat CSA, le taux de refinancement sans risque est le taux overnight : <strong>€STR</strong> pour l'EUR, <strong>SOFR</strong> pour l'USD.
          </p>
        </div>
      </div>

      <p className="text-gray-600 leading-relaxed mb-3">
        Le par swap rate n'est plus une simple différence de facteurs d'escompte. C'est une moyenne pondérée des taux forwards projetés par les facteurs d'escompte OIS :
      </p>

      <div className="bg-gray-100 rounded-xl px-8 py-5 mb-6 text-center">
        <BlockMath>{'S = \\frac{\\sum_{i=1}^{n} F_i^{\\text{Euribor}} \\cdot \\delta_i \\cdot DF_i^{\\text{OIS}}}{\\sum_{j=1}^{m} \\delta_j \\cdot DF_j^{\\text{OIS}}}'}</BlockMath>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-8">
        <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-2">Le contrat CSA</p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Le <em>Credit Support Annex</em> est l'annexe juridique qui régit les appels de marge quotidiens entre contreparties. C'est lui qui dicte le choix de la courbe d'actualisation : si le CSA stipule un collatéral en EUR, on actualise au taux OIS EUR (€STR), même si le swap porte sur des flux en USD. Les quants qui travaillent sur des produits multi-devises doivent donc intégrer des courbes de base (cross-currency basis) dans leurs modèles.
        </p>
      </div>

      {/* ── Section 4 ── */}
      <h2 id="risques-sensibilites" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        4. Risques et sensibilités
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Le risque principal d'un swap se mesure par son <strong>DV01</strong> (Dollar Value of a Basis Point, aussi noté PV01) : la variation de valeur pour un déplacement parallèle de 1 point de base de la courbe.
      </p>

      <div className="bg-gray-100 rounded-xl px-8 py-5 mb-4 text-center">
        <BlockMath>{'DV01 = PV(r) - PV(r + 0{,}0001)'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-3">
        Pour un swap vanille, on a l'approximation :
      </p>

      <div className="bg-gray-100 rounded-xl px-8 py-5 mb-6 text-center">
        <BlockMath>{'DV01 \\approx N \\times D \\times 0{,}0001'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        où <InlineMath>{'D'}</InlineMath> est la duration du swap (approximée par la maturité pour un swap ATM). Un swap 10 ans sur 10 M€ a donc un DV01 d'environ 10 000 €.
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        Au-delà du DV01, le swap présente une courbure (convexité) qui impacte le P&L lors de mouvements de grande ampleur. Cette asymétrie n'est pas symétrique entre les deux positions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-2">Receiver Swap — Convexité positive</p>
          <p className="text-gray-700 text-sm leading-relaxed">
            Quand les taux baissent fortement, le gain s'accélère : la valeur présente des coupons fixes reçus augmente de plus en plus vite. Le détenteur bénéficie de la courbure.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-2">Payer Swap — Convexité négative</p>
          <p className="text-gray-700 text-sm leading-relaxed">
            En cas de hausse violente des taux, le gain diminue : la valeur des flux fixes payés reste élevée alors que les flux variables reçus augmentent moins vite que prévu. La courbe de prix s'aplatit contre le payeur.
          </p>
        </div>
      </div>

      {/* ── Section 5 ── */}
      <h2 id="hedging-swap-spread" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        5. Hedging et Swap Spread
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Pour couvrir un IRS, le trader utilise couramment des contrats futures sur obligations d'État. En Europe, le <strong>Bund Future</strong> (FGBL) ou l'<strong>OAT Future</strong>. Le nombre de contrats se calcule par égalisation des DV01 :
      </p>

      <div className="bg-gray-100 rounded-xl px-8 py-5 mb-6 text-center">
        <BlockMath>{'N_{\\text{contrats}} = -\\frac{DV01_{\\text{position}}}{DV01_{\\text{future}}}'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        Cette couverture est efficace pour le risque de taux global, mais elle introduit un nouveau risque : le <strong>Swap Spread</strong> ou Basis Swap.
      </p>

      <div className="bg-gray-100 rounded-xl px-8 py-5 mb-6 text-center">
        <BlockMath>{"\\text{Swap Spread} = \\text{Taux Swap} - \\text{Taux Obligation d'État}"}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        Le taux swap intègre une prime de risque interbancaire (Euribor), tandis que le taux d'une obligation d'État reflète le risque souverain. Si l'on couvre un IRS avec du Bund, on reste exposé à l'écartement du spread entre ces deux références. En cas de stress bancaire, ce spread peut s'envoler, indépendamment du niveau des taux.
      </p>


      {/* ── Lien quiz ── */}
      <div className="mt-10 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-gray-700">
        Le quiz du Module 4 est disponible — <a href="/quiz/module-4" className="text-blue-600 hover:underline font-medium">S&apos;entraîner →</a>
      </div>

      {/* ── Navigation Précédent / Suivant ── */}
      <div className="flex justify-between mt-12 pt-6 border-t border-gray-300">
        <a href="/cours/module-4-taux-credit/fwd-rate-agreement" className="text-blue-600 hover:underline text-sm">
          ← Courbe des taux & instruments
        </a>
        <div />
      </div>

    </article>
  );
}
