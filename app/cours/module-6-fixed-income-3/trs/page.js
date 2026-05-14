import Link from 'next/link';
import { InlineMath, BlockMath } from '../../../components/Math';

export const metadata = {
  title: 'Total Return Swap — Fixed Income III',
  description: 'Mécanique du TRS, rationnel du Hedge Fund, couverture Delta One et matrice des risques.',
};

export default function TRSPage() {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">

      {/* Fil d'Ariane */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/cours" className="hover:underline">Cours</Link>
        <span className="mx-2">›</span>
        <Link href="/cours/module-6-fixed-income-3" className="hover:underline">Fixed Income III</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-700">Total Return Swap</span>
      </nav>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">Total Return Swap</h1>
      <p className="text-gray-600 leading-relaxed mb-10">
        Le Total Return Swap (TRS) est l&apos;outil phare des Hedge Funds et le cœur des desks Delta One.
        Il permet de transférer le rendement total d&apos;un actif sans jamais le détenir physiquement,
        avec tout ce que cela implique en termes de levier, d&apos;anonymat et de risques structurels.
      </p>

      {/* ── Section 1 ── */}
      <h2 id="mecanique" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        1. Mécanique
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Un TRS est un contrat d&apos;échange de flux périodiques (mensuels ou trimestriels) entre un investisseur et une banque.
        Deux jambes s&apos;opposent exactement :
      </p>

      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border border-gray-300 rounded-xl overflow-hidden">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Jambe</th>
              <th className="px-4 py-3 text-left font-semibold">Contenu</th>
              <th className="px-4 py-3 text-left font-semibold">Direction (client Long)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-600">
            <tr>
              <td className="px-4 py-3 font-medium">Performance (Equity Leg)</td>
              <td className="px-4 py-3">Variation de prix + dividendes / coupons</td>
              <td className="px-4 py-3 text-green-700 font-medium">Reçoit</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-4 py-3 font-medium">Financement (Floating Leg)</td>
              <td className="px-4 py-3">Euribor / SOFR + Spread</td>
              <td className="px-4 py-3 text-red-600 font-medium">Paie</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        Pour un client vendeur (Short), les flux s&apos;inversent : il paie la performance et reçoit le financement.
        Le payoff net du client Long sur une période est :
      </p>

      <div className="bg-gray-100 rounded-xl px-8 py-6 mb-6 text-center">
        <BlockMath>{'\\text{P\\&L}_{\\text{Long}} = \\underbrace{\\frac{S_T - S_0}{S_0} + d}_{\\text{Equity Leg}} - \\underbrace{(\\text{Euribor} + s) \\cdot \\delta}_{\\text{Floating Leg}}'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-10">
        où <InlineMath>{'d'}</InlineMath> représente le rendement en dividendes sur la période,{' '}
        <InlineMath>{'s'}</InlineMath> le spread de financement et <InlineMath>{'\\delta'}</InlineMath> la fraction d&apos;année.
        Si l&apos;actif sous-jacent est une action, on parle d&apos;<strong>Equity Swap</strong> et la mécanique est identique.
      </p>

      {/* ── Section 2 ── */}
      <h2 id="rationnel" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        2. Raison d'être
      </h2>
      <p className="text-gray-600 leading-relaxed mb-6">
        Un Hedge Fund recourt au TRS pour trois raisons stratégiques, chacune inaccessible via un achat direct en bourse.
      </p>

      <div className="space-y-4 mb-8">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">1 — Effet de levier</p>
          <p className="text-gray-700 leading-relaxed">
            Il est inutile de débourser 100 % du prix de l&apos;actif. Une couverture en collatéral de 10 % suffit
            pour être exposé à 100 % de la performance. Pour un même nominal, il offre plus de rendement et de perte.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">2 — Efficacité du bilan</p>
          <p className="text-gray-700 leading-relaxed">
            L&apos;actif n&apos;apparaît pas au bilan de l&apos;investisseur (off-balance sheet). Le Hedge Fund améliore
            mécaniquement ses ratios de levier réglementaires sans réduire son exposition économique réelle.
            Depuis post-IFRS 10 (2013), si la banque exerce un contrôle effectif sur l&apos;entité sous-jacente, des règles de
            consolidation peuvent forcer une reprise au bilan.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">3 — Anonymat et accumulation discrète</p>
          <p className="text-gray-700 leading-relaxed">
            La banque détient l&apos;actif physiquement : le Hedge Fund n&apos;apparaît pas au registre des actionnaires.
            Il peut accumuler une exposition massive sur une valeur sans déclencher les alertes réglementaires
            de franchissement de seuil (5 %, 10 %...) qui obligeraient à une déclaration publique.
          </p>
        </div>
      </div>

      {/* Archegos */}
      <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 mb-10">
        <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-2">Cas réel — Archegos Capital (2021)</p>
        <p className="text-gray-700 leading-relaxed mb-3">
          Archegos, le family office de Bill Hwang, avait accumulé via des TRS des positions colossales
          sur ViacomCBS, Discovery et plusieurs ADR chinois (iQIYI, Tencent Music, Baidu) sans jamais apparaître comme actionnaire déclaré.
          Le levier atteignait 5x à 8x sur certaines lignes. Lorsque ViacomCBS a annoncé une émission dilutive
          en mars 2021, les cours ont chuté, déclenchant des appels de marge simultanés de plusieurs banques
          (Credit Suisse, Nomura, Goldman Sachs, Morgan Stanley).
        </p>
        <p className="text-gray-700 leading-relaxed">
          Aucune banque ne savait que les autres étaient exposées aux mêmes sous-jacents via le même client.
          La liquidation forcée en bloc a amplifié la chute. Bilan : plus de 10 milliards de dollars de pertes
          pour le secteur bancaire, dont ~4,7 Mds pour Credit Suisse seul (qui a liquidé ses positions trop tard). L&apos;anonymat du TRS avait
          rendu le risque systémique invisible jusqu&apos;à l&apos;explosion.
        </p>
      </div>

      {/* ── Section 3 ── */}
      <h2 id="couverture" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        3. La couverture de la banque
      </h2>
      <p className="text-gray-600 leading-relaxed mb-6">
        La banque qui offre ce TRS ne prend aucun pari directionnel. Elle se couvre immédiatement
        pour rendre son exposition parfaitement neutre. Sa couverture est structurellement identique à un Cash-and-Carry sur futures.
        Voici le déroulé complet pour un client Long :
      </p>

      <div className="bg-gray-50 border border-gray-300 rounded-xl p-6 mb-6">
        <p className="text-sm font-semibold text-gray-700 mb-4">Scénario — Client Long (la banque est vendeuse du TRS)</p>
        <ol className="space-y-3 text-gray-600 text-sm">
          <li className="flex gap-3">
            <span className="font-bold text-blue-600 shrink-0">①</span>
            <span>La banque emprunte du cash sur le marché monétaire au taux Euribor.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-blue-600 shrink-0">②</span>
            <span>Elle achète l&apos;action physiquement sur le marché avec ce cash.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-blue-600 shrink-0">③</span>
            <span>La hausse de l&apos;action physique compense exactement ce qu&apos;elle doit verser au client (Equity Leg).</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-blue-600 shrink-0">④</span>
            <span>L&apos;Euribor reçu du client (Floating Leg) compense l&apos;Euribor payé sur le marché monétaire.</span>
          </li>
        </ol>
      </div>

      
      {/* ── Diagramme de flux ── */}
      <div className="my-3 flex justify-center">
        <svg viewBox="0 75 640 150" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-2xl">

          {/* ── Boîtes ── */}
          {/* Hedge Fund */}
          <rect x="20" y="110" width="160" height="64" rx="12" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5"/>
          <text x="100" y="137" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">Hedge Fund</text>
          <text x="100" y="156" textAnchor="middle" fontSize="11" fill="#3b82f6">(client Long)</text>

          {/* Banque */}
          <rect x="240" y="110" width="160" height="64" rx="12" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5"/>
          <text x="320" y="137" textAnchor="middle" fontSize="13" fontWeight="700" fill="#15803d">Banque</text>
          <text x="320" y="156" textAnchor="middle" fontSize="11" fill="#16a34a">(desk Delta One)</text>

          {/* Marché */}
          <rect x="460" y="110" width="160" height="64" rx="12" fill="#fafafa" stroke="#6b7280" strokeWidth="1.5"/>
          <text x="540" y="137" textAnchor="middle" fontSize="13" fontWeight="700" fill="#374151">Marché</text>
          <text x="540" y="156" textAnchor="middle" fontSize="11" fill="#6b7280">(monétaire + actions)</text>

          {/* ── Flèches HF ↔ Banque ── */}
          {/* Equity Leg : Banque → HF (vers la gauche, au-dessus) */}
          <line x1="240" y1="128" x2="180" y2="128" stroke="#2563eb" strokeWidth="1.8" markerEnd="url(#arrowBlue)"/>
          <text x="210" y="118" textAnchor="middle" fontSize="10" fill="#2563eb" fontWeight="600">Equity Leg</text>
          <text x="210" y="108" textAnchor="middle" fontSize="9" fill="#2563eb">(perf. + dividendes)</text>

          {/* Floating Leg : HF → Banque (vers la droite, en-dessous) */}
          <line x1="180" y1="158" x2="240" y2="158" stroke="#dc2626" strokeWidth="1.8" markerEnd="url(#arrowRed)"/>
          <text x="210" y="175" textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="600">Floating Leg</text>
          <text x="210" y="186" textAnchor="middle" fontSize="9" fill="#dc2626">(Euribor + spread)</text>

          {/* ── Flèches Banque ↔ Marché ── */}
          {/* Cash monétaire : Marché → Banque */}
          <line x1="400" y1="128" x2="460" y2="128" stroke="#6b7280" strokeWidth="1.8" markerEnd="url(#arrowGray)"/>
          <text x="430" y="118" textAnchor="middle" fontSize="10" fill="#6b7280" fontWeight="600">Cash emprunté</text>
          <text x="430" y="108" textAnchor="middle" fontSize="9" fill="#6b7280">(taux Euribor)</text>

          {/* Action physique : Banque → Marché (achat) */}
          <line x1="460" y1="158" x2="400" y2="158" stroke="#6b7280" strokeWidth="1.8" markerEnd="url(#arrowGray)"/>
          <text x="430" y="175" textAnchor="middle" fontSize="10" fill="#6b7280" fontWeight="600">Achat action</text>
          <text x="430" y="186" textAnchor="middle" fontSize="9" fill="#6b7280">(physique)</text>

          
          {/* ── Définition des marqueurs ── */}
          <defs>
            <marker id="arrowBlue" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#2563eb"/>
            </marker>
            <marker id="arrowRed" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#dc2626"/>
            </marker>
            <marker id="arrowGray" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#6b7280"/>
            </marker>
          </defs>

        </svg>
      </div>


      <div className="bg-gray-100 rounded-xl px-8 py-6 mb-6 text-center">
        <BlockMath>{'\\text{P\\&L}_{\\text{Banque}} = \\underbrace{s \\cdot \\delta \\cdot N}_{\\text{Spread facturé}}'}</BlockMath>
      </div>


      <p className="text-gray-600 leading-relaxed mb-10">
        Le profit de la banque est purement le spread facturé au-dessus de l&apos;Euribor.
        Ce spread rémunère les risques structurels que la banque continue de porter
        malgré la couverture.
      </p>

      {/* ── Section 4 ── */}
      <h2 id="risques" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        4. Matrice des risques
      </h2>
      <p className="text-gray-600 leading-relaxed mb-6">
        Bien que théoriquement couverte, la banque fait face à trois risques structurels persistants.
        Ce sont eux que le spread est censé rémunérer. Et spoiler, ils peuvent tous dépasser ce spread en situation de stress.
      </p>

      <div className="space-y-4 mb-10">
        <div className="bg-gray-50 border border-gray-300 rounded-xl p-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Tax Risk — Risque fiscal</p>
          <p className="text-gray-700 leading-relaxed">
            La banque doit verser au client le dividende brut contractuellement prévu dans le TRS.
            Mais elle reçoit physiquement un dividende net, amputé de la retenue à la source locale.
            Un changement de législation fiscale (ou une position dans un pays où la banque ne récupère pas
            le crédit d&apos;impôt) crée une asymétrie permanente entre ce qu&apos;elle doit et ce qu&apos;elle encaisse.
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-300 rounded-xl p-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Funding Risk — Risque de refinancement (client Long)</p>
          <p className="text-gray-700 leading-relaxed">
            Pour porter les actions physiques, la banque doit se refinancer en permanence sur le marché monétaire.
            En temps de crise, le coût de ce refinancement interbancaire peut exploser bien au-delà de l&apos;Euribor affiché.
            Si ce coût dépasse le spread facturé au client, la banque tombe en <strong>negative carry</strong> :
            elle perd de l&apos;argent à chaque jour de portage de la position.
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-300 rounded-xl p-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Repo Risk — Risque d&apos;emprunt de titres (client Short)</p>
          <p className="text-gray-700 leading-relaxed">
            Pour couvrir un client Short, la banque doit vendre l&apos;action à découvert, elle doit donc l&apos;emprunter
            physiquement via le marché Repo. Si l&apos;action est rare ou massivement shortée (<em>Hard to Borrow</em>),
            le prêteur imposera un taux Repo très négatif, c&apos;est-à-dire un gros coût d&apos;emprunt.
            Ce surcoût est répercuté sur le client qui voit sa jambe de financement lourdement amputée,
            et dans de rares cas jusqu&apos;à rendre la stratégie non rentable.
          </p>
        </div>
      </div>


      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-3">En résumé</p>
        <p className="text-gray-700 leading-relaxed">
          Le TRS est un instrument de transfert de performance économique sans transfert de propriété.
          Pour le Hedge Fund, c&apos;est un accélérateur de levier et un bouclier d&apos;anonymat.
          Pour la banque, c&apos;est une source de revenus de spread, mais exposée à trois risques structurels
          (fiscal, refinancement, emprunt de titres).
        </p>
      </div>

      {/* ── Lien quiz ── */}
      <div className="mt-10 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-gray-700">
        Le quiz du Module 6 est disponible — <a href="/quiz/module-6-fixed-income-3" className="text-blue-600 hover:underline font-medium">S&apos;entraîner →</a>
      </div>

      {/* ── Navigation ── */}
      <div className="flex justify-between mt-12 pt-6 border-t border-gray-300">
        <a href="/cours/module-6-fixed-income-3/inflation-swap" className="text-blue-600 hover:underline text-sm">
          ← Swaps d&apos;Inflation
        </a>
        <div />
      </div>

    </article>
  );
}
