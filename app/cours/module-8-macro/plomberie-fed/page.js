import Link from 'next/link';
import { InlineMath, BlockMath } from '../../../components/Math';

export const metadata = {
  title: 'Fonctionnement de la Fed | Module 8 — Macro & Politique Monétaire',
  description:
    'Comprendre la plomberie de la Fed : taux administrés (IORB, ON RRP, SRF), bilan T-account, dynamique TGA/réserves, et distinction RMP vs QE.',
};

export default function FonctionnementFedPage() {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">

      {/* ── Fil d'Ariane ── */}
      <nav className="text-sm text-gray-500 mb-6 flex flex-wrap gap-1 items-center">
        <Link href="/cours" className="hover:text-blue-600">Cours</Link>
        <span>›</span>
        <span>Module 8 — Macro &amp; Politique Monétaire</span>
        <span>›</span>
        <span className="text-gray-700 font-medium">Fonctionnement de la Fed</span>
      </nav>

      {/* ── Titre ── */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Fonctionnement de la Fed
      </h1>
      <p className="text-gray-600 leading-relaxed mb-10">
        La Fed ne se contente pas de "fixer" un taux directeur et d'attendre.
        Elle gère en permanence une infrastructure complexe de taux administrés,
        de facilités permanentes et de bilan pour maintenir le marché monétaire
        stable. Le but de ce cours est de comprendre cette mécanique, pour enfin comprendre les minutes de la Fed quand vous les lirez.
      </p>

      {/* ══════════════════════════════════════════════
          Section 1 — La hiérarchie des taux
      ══════════════════════════════════════════════ */}
      <h2 id="hierarchie-taux" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        1. La hiérarchie des taux : administrés vs marché
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Pour gérer sa politique monétaire au jour le jour, la Banque Centrale des États-Unis (Fed) dispose de
        deux types de leviers : des taux qu'elle fixe arbitrairement pour
        encadrer le marché (les taux administrés), et des taux qui résultent des transactions réelles
        entre participants (les taux de marché).
      </p>

      <h3 className="text-lg font-semibold text-gray-800 mb-3">A. Les taux administrés</h3>

      <div className="space-y-4 mb-8">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-2">
            IORB — Interest on Reserve Balances
          </p>
          <p className="text-gray-700 leading-relaxed">
            Le taux auquel la Fed rémunère les réserves des banques commerciales
            déposées chez elle. C'est le <strong>plafond théorique</strong> du corridor :
            aucune banque n'a intérêt à prêter sur le marché interbancaire en
            dessous de ce qu'elle touche sans risque à la Fed.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-2">
            ON RRP — Overnight Reverse Repo
          </p>
          <p className="text-gray-700 leading-relaxed">
            Le <strong>plancher</strong>. La Fed permet aux fonds monétaires (qui ne
            peuvent pas déposer à la Fed directement, contrairement aux banques)
            de placer du cash contre collatéral au jour le jour. En drainant les
            surplus de liquidités, ce mécanisme empêche les taux de tomber trop bas.
          </p>
        </div>

        <p className="text-gray-600 leading-relaxed mb-6">
        L'écart entre ces deux taux est de 0.25% (25bps). C'est ce que l'on appelle le corridor et on le voit sur
        <a href="https://www.cmegroup.com/markets/interest-rates/cme-fedwatch-tool.html" className="text-blue-500 hover:underline mx-1">
          le site de la CME qui affiche en temps réel les taux de marché
        </a>
        (clique sur "Probabilities" à gauche pour voir les prévisions du marché sur les taux, un indicateur passionnant !).
      </p>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-2">
            SRF — Standing Repo Facility
          </p>
          <p className="text-gray-700 leading-relaxed">
            Le <strong>backstop</strong>. La Fed prête du cash contre collatéral
            (Treasuries, MBS) à n'importe quelle banque éligible, à tout moment.
            Son rôle est d'éviter un squeeze de liquidité : si les réserves
            deviennent soudainement trop rares, la SRF garantit que les banques
            peuvent s'approvisionner sans paniquer.
          </p>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-3">B. Les taux de marché</h3>

      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50 border border-gray-300">
              <th className="text-left px-4 py-3 font-semibold text-gray-700 border border-gray-300">Taux</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700 border border-gray-300">Catégorie</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700 border border-gray-300">Ce qu'il mesure</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border border-gray-300">
              <td className="px-4 py-3 font-mono text-gray-900 border border-gray-300">EFFR</td>
              <td className="px-4 py-3 text-gray-600 border border-gray-300">Non sécurisé (unsecured)</td>
              <td className="px-4 py-3 text-gray-600 border border-gray-300">
                Moyenne pondérée des transactions réelles entre banques sur le marché
                des Fed Funds. Indicateur de la rareté du cash pur, sans collatéral.
              </td>
            </tr>
            <tr className="bg-gray-50 border border-gray-300">
              <td className="px-4 py-3 font-mono text-gray-900 border border-gray-300">SOFR</td>
              <td className="px-4 py-3 text-gray-600 border border-gray-300">Sécurisé (secured)</td>
              <td className="px-4 py-3 text-gray-600 border border-gray-300">
                Taux du marché Repo au jour le jour, adossé à des Treasuries. A
                remplacé le LIBOR. Mesure la rareté du cash contre collatéral.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ══════════════════════════════════════════════
          Section 2 — Le bilan
      ══════════════════════════════════════════════ */}
      <h2 id="bilan-fed" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        2. Le bilan de la Fed
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Le bilan de la Fed (Balance Sheet) obéit à la comptabilité sur le principe des vases communicants : toute
        variation d'un poste du passif doit être compensée par une variation
        d'un autre poste du passif, ou par une variation de l'actif.
      </p>

      {/* T-Account */}
      <div className="mb-6 rounded-xl border border-gray-300 overflow-hidden">
        <div className="bg-gray-900 text-white text-center text-sm font-semibold py-2 tracking-wide">
          BILAN DE LA FED (T-ACCOUNT)
        </div>
        <div className="grid grid-cols-2 divide-x divide-gray-300">
          {/* Actif */}
          <div>
            <div className="bg-gray-100 text-gray-700 text-xs font-semibold uppercase tracking-wide px-4 py-2 border-b border-gray-300">
              Actif (Assets)
            </div>
            <ul className="divide-y divide-gray-200">
              {[
                ['T-Bills', 'Titres < 1 an'],
                ['Treasuries', 'Obligations > 1 an'],
                ['MBS', 'Mortgage-Backed Securities'],
              ].map(([label, desc]) => (
                <li key={label} className="px-4 py-3">
                  <span className="font-mono text-gray-900 text-sm">{label}</span>
                  <span className="block text-gray-500 text-xs mt-0.5">{desc}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Passif */}
          <div>
            <div className="bg-gray-100 text-gray-700 text-xs font-semibold uppercase tracking-wide px-4 py-2 border-b border-gray-300">
              Passif (Liabilities)
            </div>
            <ul className="divide-y divide-gray-200">
              {[
                ['Réserves', 'Cash des banques commerciales'],
                ['TGA', "Compte courant de l'État américain"],
                ['ON RRP', 'Cash des fonds monétaires (drain temporaire)'],
                ['Currency', 'Billets en circulation (Federal Reserve Notes)'],
              ].map(([label, desc]) => (
                <li key={label} className="px-4 py-3">
                  <span className="font-mono text-gray-900 text-sm">{label}</span>
                  <span className="block text-gray-500 text-xs mt-0.5">{desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 mb-10">
        <p className="text-amber-700 uppercase tracking-wide text-xs font-semibold mb-2">
          Le risque du TGA en avril — saison des impôts
        </p>
        <p className="text-gray-700 leading-relaxed">
          Chaque année en avril, les Américains payent leurs impôts. Le cash
          quitte les comptes bancaires privés (Réserves{' '}
          <span className="font-mono">↓</span>) pour alimenter le compte de
          l'État (TGA <span className="font-mono">↑</span>). Si ce mouvement
          est brutal et que les réserves tombent trop bas, le marché du Repo
          s'assèche et les taux peuvent faire des "spikes" (sursauts violents). C'est pour anticiper
          ce drainage que la Fed intervient parfois en amont.
        </p>
      </div>

      {/* ══════════════════════════════════════════════
          Section 3 — Le spread EFFR - IORB
      ══════════════════════════════════════════════ */}
      <h2 id="spread-effr-iorb" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        3. La surveillance des réserves via le spread EFFR − IORB
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Kevin Warsh ne surveille pas les taux en isolation. Ce qui l'intéresse, c'est
        leur écart.
      </p>

      <div className="bg-gray-100 rounded-xl px-8 py-6 mb-6 text-center">
        <BlockMath>{'\\text{Signal clé} = \\text{EFFR} - \\text{IORB}'}</BlockMath>
      </div>

      <div className="space-y-4 mb-8">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-2">
            Situation normale — spread négatif
          </p>
          <p className="text-gray-700 leading-relaxed">
            L'EFFR est légèrement inférieur à l'IORB. Les banques ont suffisamment
            de réserves : certains acteurs non-bancaires (fonds monétaires, GSE)
            prêtent en dessous de l'IORB, ce qui tire l'EFFR vers le bas. Le
            système est fluide.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-2">
            Signal d'alerte — spread qui se resserre
          </p>
          <p className="text-gray-700 leading-relaxed">
            Si l'EFFR remonte vers l'IORB, cela signifie que les réserves se
            raréfient. Les banques préfèrent alors se prêter entre elles à un
            prix proche de ce que la Fed leur offre, plutôt que de prêter moins
            cher à des contreparties non-bancaires. C'est le signe que le coussin
            de réserves s'érode.
          </p>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
          <p className="text-amber-700 uppercase tracking-wide text-xs font-semibold mb-2">
            Souvenir de septembre 2019
          </p>
          <p className="text-gray-700 leading-relaxed">
            Le marché du Repo a connu un spike brutal à 10%, mettant en lumière
            que les réserves étaient tombées sous le niveau adéquat lors du QT
            précédent. Depuis, la Fed préfère maintenir un bilan "gras" plutôt
            que de risquer un nouvel accident de liquidité.
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          Section 4 — RMP vs QE
      ══════════════════════════════════════════════ */}
      <h2 id="rmp-vs-qe" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        4. RMP vs QE
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Quand le spread EFFR − IORB se resserre trop, la Fed peut acheter des
        actifs pour réinjecter des réserves. Mais deux types d'achats existent,
        et leur impact sur les marchés est radicalement différent.
      </p>

      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50 border border-gray-300">
              <th className="text-left px-4 py-3 font-semibold text-gray-700 border border-gray-300">Caractéristique</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700 border border-gray-300">RMP (Reserve Management Purchases)</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700 border border-gray-300">QE (Quantitative Easing)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Intention', 'Maintenance — garder le niveau de réserves stable', 'Stimulus — assouplir les conditions financières'],
              ['Cibles', 'T-Bills (< 1 an)', 'Treasuries longs + MBS'],
              ['Communication', '"Opération technique", neutre pour la politique monétaire', "Signal fort de soutien à l'économie"],
              ['Impact sur les taux longs', 'Nul ou très faible', 'Baisse significative via achat massif de la Fed'],
              ['Réaction des marchés', 'Limitée', 'Rally obligataire et actions'],
            ].map(([crit, rmp, qe], i) => (
              <tr key={crit} className={`border border-gray-300 ${i % 2 === 1 ? 'bg-gray-50' : ''}`}>
                <td className="px-4 py-3 font-medium text-gray-800 border border-gray-300">{crit}</td>
                <td className="px-4 py-3 text-gray-600 border border-gray-300">{rmp}</td>
                <td className="px-4 py-3 text-gray-600 border border-gray-300">{qe}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
        <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-2">
          Exemple concret — janvier 2026
        </p>
        <p className="text-gray-700 leading-relaxed">
          En anticipation du drainage de réserves lié au remplissage du TGA en
          avril (saison des impôts), la Fed a eu recours aux RMP en achetant des
          T-Bills. En augmentant son actif, elle augmente mécaniquement le passif
          correspondant : les réserves des banques. Résultat : le coussin est
          reconstitué avant que le problème ne survienne, sans que cela soit
          interprété comme un signal dovish sur la politique monétaire.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
        <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-2">
          L'objectif ultime : un Repo stable
        </p>
        <p className="text-gray-700 leading-relaxed">
          Les Treasuries américains sont en grande partie financés via le marché
          du Repo. Si ce marché devient instable (par manque de réserves ou par
          méfiance entre contreparties), c'est le financement de la dette
          américaine entière qui est en danger. La Fed préfère donc maintenir un
          bilan généreux en réserves, quitte à ne jamais atteindre un "bilan
          minimal" théorique.
        </p>
      </div>

      {/* ── Lien quiz ── */}
      <div className="mt-10 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-gray-700">
        Le quiz du Module 8 est disponible — <a href="/quiz/module-8" className="text-blue-600 hover:underline font-medium">S&apos;entraîner →</a>
      </div>

      {/* ── Navigation Précédent / Suivant ── */}
      <div className="flex justify-between mt-12 pt-6 border-t border-gray-300">
        <a
          href="/cours/module-7-quanto-fx/correlation-fx"
          className="text-blue-600 hover:underline text-sm"
        >
          ← Corrélation Indice et FX
        </a>
        <a href="/cours/module-8-macro/politique-monetaire" className="text-blue-600 hover:underline text-sm">
          Politique monétaire →
        </a>
      </div>

    </article>
  );
}
