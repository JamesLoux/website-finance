import Link from 'next/link';
import { InlineMath, BlockMath } from '../../../components/Math';

export const metadata = {
  title: 'Politique monétaire | Module 8 — Macro & Politique Monétaire',
  description:
    'La courbe des taux : décomposition taux long, signaux économiques, forward guidance et dot plot, QE/QT et duration.',
};

export default function PolitiqueMonetairePage() {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">

      {/* ── Fil d'Ariane ── */}
      <nav className="text-sm text-gray-500 mb-6 flex flex-wrap gap-1 items-center">
        <Link href="/cours" className="hover:text-blue-600">Cours</Link>
        <span>›</span>
        <span>Module 8 — Macro &amp; Politique Monétaire</span>
        <span>›</span>
        <span className="text-gray-700 font-medium">Politique monétaire</span>
      </nav>

      {/* ── Titre ── */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Politique monétaire
      </h1>
      <p className="text-gray-600 leading-relaxed mb-10">
        La Fed contrôle directement les taux très courts comme l'overnight. Mais l'économie
        vit sur des horizons beaucoup plus longs : 2, 10, 30 ans. La courbe des taux est
        le tableau de bord qui montre comment les anticipations de marché transforment les
        décisions de la Fed en conditions de financement global.
      </p>

      {/* ══════════════════════════════════════════════
          Section 1 — Décomposition d'un taux long
      ══════════════════════════════════════════════ */}
      <h2 id="decomposition" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        1. La décomposition d'un taux long
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Si le taux long ne rémunère pas autant que les taux courts, c'est que le risque n'est évidemment pas le même.
        Le taux long rémunère
        trois choses distinctes.
      </p>

      <div className="bg-gray-100 rounded-xl px-8 py-6 mb-8 text-center overflow-x-auto">
        <BlockMath>{'Y_T = \\underbrace{\\text{Taux court anticipé}}_{\\text{Hypothèse des attentes}} + \\underbrace{\\text{Anticipation d\'inflation}}_{\\text{Fisher}} + \\underbrace{\\text{Prime de terme}}_{\\text{Compensation du risque}}'}</BlockMath>
      </div>

      <div className="flex flex-col xl:flex-row gap-4 mb-8">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex-1">
          <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-2">
            L'hypothèse des attentes
          </p>
          <p className="text-gray-700 leading-relaxed">
            Le taux long est la moyenne géométrique des taux courts successifs anticipés.
            Si la Fed promet de baisser les taux dans 2 ans, le 10 ans baisse dès
            aujourd'hui avant même que la moindre décision soit prise.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex-1">
          <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-2">
            La prime de terme
          </p>
          <p className="text-gray-700 leading-relaxed">
            Le prix du risque de temps. Plus l'échéance est lointaine, plus l'incertitude
            sur l'inflation et la croissance augmente. Les investisseurs exigent un surplus
            de rendement pour compenser ce risque d'immobilisation du capital.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-300 rounded-xl p-6 mb-10">
        <p className="font-semibold text-gray-800 mb-3">L'inversion de 2022–2023</p>
        <p className="text-gray-600 leading-relaxed">
          En mars 2022, la Fed commence à monter ses taux agressivement. Le taux 2 ans suit
          immédiatement car il intègre les hausses à venir. Le 10 ans monte moins vite car
          le marché anticipe un ralentissement économique futur. En octobre 2022, le
          spread 2Y–10Y atteint −80 points de base, son niveau le plus inversé depuis
          1981. Signal : le marché pariait déjà sur des baisses de taux à moyen terme.
        </p>
      </div>

      {/* ══════════════════════════════════════════════
          Section 2 — Lire la courbe
      ══════════════════════════════════════════════ */}
      <h2 id="signaux" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        2. Lire la courbe : les signaux économiques
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        La forme de la courbe est l'un des meilleurs indicateurs avancés de la santé
        d'une économie. Elle agrège le consensus de milliers d'acteurs de marché.
      </p>

      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 border border-gray-300">
              <th className="text-left px-4 py-3 font-semibold text-gray-700 border border-gray-300">Forme</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700 border border-gray-300">Interprétation marché</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700 border border-gray-300">Contexte typique</th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                'Normale (pente positive)',
                'Croissance saine. Le marché anticipe une économie qui progresse avec une inflation modérée.',
                'Expansion économique',
              ],
              [
                'Plate',
                "Incertitude.",
                'Transition de cycle',
              ],
              [
                'Inversée (pente négative)',
                "Signal de récession. Les taux courts dépassent les taux longs. Le marché anticipe des baisses massives à venir pour sauver l'économie.",
                'Pré-crise (ex. 2022–2023)',
              ],
            ].map(([forme, interp, contexte], i) => (
              <tr key={forme} className={`border border-gray-300 ${i % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}>
                <td className="px-4 py-3 font-medium text-gray-800 border border-gray-300">{forme}</td>
                <td className="px-4 py-3 text-gray-600 border border-gray-300">{interp}</td>
                <td className="px-4 py-3 text-gray-600 border border-gray-300">{contexte}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ══════════════════════════════════════════════
          Section 3 — Forward guidance
      ══════════════════════════════════════════════ */}
      <h2 id="forward-guidance" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        3. La forward guidance : gérer par la parole
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        La Fed a compris qu'elle n'a pas besoin de bouger les taux pour changer les
        conditions financières. Il lui suffit de modifier les anticipations. C'est le
        principe de la forward guidance : ancrer les taux longs en promettant une
        trajectoire pour les taux courts.
      </p>

      <div className="space-y-4 mb-10">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
          <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-2">
            Le dot plot
          </p>
          <p className="text-gray-700 leading-relaxed">
            Quatre fois par an, chaque membre du FOMC (parce que c'est un système de vote pour choisir quelle taux sera effectif) place un point représentant sa
            prévision des taux pour les années à venir. C'est l'outil de transparence
            ultime disponible sur Bloomberg, mais il n'y a pas d'engagement. Les dots peuvent évoluer d'une réunion
            à l'autre en fonction des données économiques.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
          <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-2">
            La communication verbale
          </p>
          <p className="text-gray-700 leading-relaxed">
            Un simple adjectif changé dans le communiqué de presse peut faire basculer
            des milliards. Sur Bloomberg,
            il est possible de comparer mot à mot (car il y en a généralement moins de 20 qui changent dans  le discours) les communiqués successifs de la Fed
            pour repérer les inflexions sémantiques.
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          Section 4 — QE et QT : agir sur la duration
      ══════════════════════════════════════════════ */}
      <h2 id="duration" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        4. QE et QT : agir sur la duration
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Quand les mots ne suffisent plus, la Fed utilise son bilan pour agir directement
        sur les taux longs. Non pas en fixant un taux, mais en modifiant la quantité de
        duration disponible sur le marché.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6">
        <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-2">
          Qu'est-ce que la duration ?
        </p>
        <p className="text-gray-700 leading-relaxed">
          Chapitre sur les produits de taux : La duration mesure la sensibilité d'une obligation à une variation de taux.
          Une obligation à 30 ans a une duration élevée : son prix est très sensible aux
          mouvements de taux. En achetant ou vendant ces titres, la Fed modifie
          mécaniquement le prix des bonds à ces maturités.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-4 mb-10">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex-1">
          <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-2">
            QE — aspirer la duration
          </p>
          <p className="text-gray-700 leading-relaxed">
            La Fed achète des obligations à 10 ou 30 ans. En créant une demande massive,
            elle fait monter le prix des titres et baisser leurs rendements. Elle absorbe
            la duration du marché, comprime la prime de terme et force les investisseurs
            à prendre davantage de risques.
          </p>
        </div>
        <div className="bg-gray-50 border border-gray-300 rounded-xl p-6 flex-1">
          <p className="font-semibold text-gray-800 text-xs uppercase tracking-wide mb-2">
            QT — réinjecter la duration
          </p>
          <p className="text-gray-700 leading-relaxed">
            La Fed laisse ses titres arriver à échéance sans les remplacer. Le marché
            doit absorber un surplus d'obligations. Cela recrée de la duration sur le
            marché, fait remonter la prime de terme et pousse les taux longs vers le haut.
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          Section 5 — Le lien avec la plomberie
      ══════════════════════════════════════════════ */}
      <h2 id="plomberie" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        5. Les enjeux
      </h2>


      <p className="text-gray-600 leading-relaxed mb-6">
        Si le TGA se remplit et vide les réserves, le taux de Repo (coût de financement
        à un jour) monte. Si ce coût à court terme reste trop élevé trop longtemps, les
        banques et les fonds ne peuvent plus porter d'obligations à 10 ans. Ils vendent
        leurs titres longs pour récupérer du cash, ce qui fait monter les taux longs.
        Une mauvaise gestion de la plomberie peut casser la courbe et provoquer un krach
        obligataire. L'objectif des Etats-Unis c'est de créer un climat de confiance pour que le monde achète des obligations américaines et qu'il finance leur dette abyssale !
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mt-6 mb-10">
        <p className="text-blue-600 font-semibold uppercase tracking-wide text-xs mb-3">
          En résumé — Module 8
        </p>
        <p className="text-gray-700 leading-relaxed">
          La Fed dispose de trois leviers pour piloter les conditions financières. Les taux
          directeurs agissent sur l'overnight et se transmettent via les anticipations. La
          forward guidance ancre les taux longs par la parole. Le bilan (QE/QT) agit
          directement sur la duration et la prime de terme. Mais ces trois leviers reposent
          sur une plomberie saine : si les réserves bancaires se raréfient ou si le marché
          Repo dysfonctionne, les mécanismes de transmission devient caduque et le climat de confiance s'écrouler (krach obligataire).
        </p>
      </div>

      {/* ── Lien quiz ── */}
      <div className="mt-10 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-gray-700">
        Un quiz sur le Module 8 sera bientôt disponible.
      </div>

      {/* ── Navigation Précédent / Suivant ── */}
      <div className="flex justify-between mt-12 pt-6 border-t border-gray-300">
        <a href="/cours/module-8-macro/plomberie-fed" className="text-blue-600 hover:underline text-sm">
          ← Fonctionnement de la Fed
        </a>
        <div />
      </div>

    </article>
  );
}
