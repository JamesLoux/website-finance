// Page de cours : Module 2 — Modèles de diffusion

import Link from 'next/link';
import { InlineMath, BlockMath } from '../../../components/Math';
import DiffusionComparisonChart from '../../components/DiffusionComparisonChart';
import BachelierChart from '../../components/BachelierChart';

export const metadata = {
  title: 'Modèles de diffusion — Finance according to James',
  description:
    'Modèle arithmétique de Bachelier vs modèle géométrique de Black-Scholes : EDS, loi de S_T, et cas d\'usage.',
};

export default function ModelesDiffusionPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12">

      {/* ── Fil d'Ariane ── */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/cours" className="hover:text-blue-600 transition-colors">Cours</Link>
        <span>/</span>
        <span className="text-gray-500">Module 2 — Pricing</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">Modèles de diffusion</span>
      </nav>

      {/* ── Titre ── */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
        Modèles de diffusion
      </h1>

      {/* ── Introduction ── */}
      <p className="text-lg text-gray-600 leading-relaxed mb-4">
        L&apos;équation de Black-Scholes repose sur un choix de modélisation : le sous-jacent suit
        un <strong>mouvement brownien géométrique</strong>. Mais ce n&apos;est pas le seul choix
        possible. Selon l&apos;actif modélisé, on peut lui préférer un mouvement brownien
        arithmétique.
      </p>
      <p className="text-gray-600 leading-relaxed mb-10">
        Ces deux familles de modèles (arithmétique et géométrique) correspondent à deux façons
        de répondre à la même question : comment l&apos;actif absorbe-t-il les chocs du marché ?
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 1 — Qu'est-ce qu'un modèle de diffusion ?
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="modele-diffusion" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-24">
        1. Qu&apos;est-ce qu&apos;un modèle de diffusion ?
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Un <strong>modèle de diffusion</strong> est une équation différentielle stochastique (EDS)
        qui décrit comment évolue un actif financier <InlineMath>S_t</InlineMath> au fil du temps.
        Sa forme générale est :
      </p>

      <BlockMath>{`dS_t = \\mu(\\cdot)\\, dt + \\sigma(\\cdot)\\, dW_t`}</BlockMath>

      <p className="text-gray-600 leading-relaxed mb-4">
        Le terme <InlineMath>{'\\mu(\\cdot)\\, dt'}</InlineMath> est la{' '}
        <strong>dérive</strong> (la tendance moyenne de l&apos;actif). Le terme{' '}
        <InlineMath>{'\\sigma(\\cdot)\\, dW_t'}</InlineMath> est la{' '}
        <strong>diffusion</strong> (la façon dont l&apos;actif absorbe les chocs aléatoires du
        marché via le Brownien <InlineMath>dW_t</InlineMath>).
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        Le fait qu'on choisisse l'un ou l'autre réponde à la question suivante : le coefficient de diffusion{' '}
        <InlineMath>{'\\sigma(\\cdot)'}</InlineMath> dépend-il du niveau actuel du
        prix <InlineMath>S_t</InlineMath> ou non ?
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          L&apos;opposition fondamentale
        </p>
        <p className="text-gray-700 text-sm leading-relaxed mb-2">
          <strong>Non donc σ est une constante absolue :</strong> les chocs sont identiques quel que
          soit le niveau de prix. C&apos;est le modèle <em>arithmétique</em> (Bachelier).
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          <strong>Oui donc σ est proportionnel à S_t :</strong> les chocs sont proportionnels au prix
          courant. Une action à 200 € subit des variations absolues deux fois plus grandes qu&apos;une
          action à 100 € pour le même choc. C&apos;est le modèle <em>géométrique</em> (Black-Scholes).
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 2 — Bachelier
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="bachelier" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        2. Le modèle arithmétique (Bachelier, 1900)
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Louis Bachelier, dans sa thèse de 1900, propose le premier modèle mathématique de prix
        financier selon lequel les variations de prix sont des chocs en <strong>montant absolu</strong>,
        indépendants du niveau du prix courant.
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        L&apos;équation différentielle stochastique du modèle arithmétique est :
      </p>

      <BlockMath>{`dS_t = \\mu\\, dt + \\sigma\\, dW_t`}</BlockMath>

      <p className="text-gray-600 leading-relaxed mb-4">
        Le coefficient de diffusion <InlineMath>{'\\sigma'}</InlineMath> est une constante
        absolue, ou un nombre d&apos;euros, indépendant de <InlineMath>{'S_t'}</InlineMath>. Que
        l&apos;actif vaille 10 € ou 1 000 €, l&apos;amplitude des chocs est la même en valeur absolue.
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        En intégrant cette EDS, on trouve que <InlineMath>{'S_T'}</InlineMath> suit une{' '}
        <strong>loi Normale</strong> :
      </p>

      <BlockMath>{`S_T \\sim \\mathcal{N}\\!\\left(S_0 + \\mu T,\\; \\sigma^2 T\\right)`}</BlockMath>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
        <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-2">
          Problème majeur
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          La loi Normale est définie sur <InlineMath>{'(-\\infty, +\\infty)'}</InlineMath>. Le
          modèle de Bachelier attribue donc une probabilité positive aux prix négatifs. Pour une
          action, c&apos;est économiquement absurde, {' '}
          <InlineMath>{'S_T \\geq 0'}</InlineMath>.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Utilisations actuelles
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          Bachelier reste pertinent pour les actifs qui <em>peuvent</em> passer
          négatif : <strong>taux d&apos;intérêt</strong> (les taux européens ont été négatifs entre
          2014 et 2022), <strong>spreads de crédit</strong>, ou certaines
          matières premières en situation de sur-offre extrême (comme le pétrole WTI en avril 2020,
          passé brièvement sous zéro car personne n'en voulait les coûts de stockage devenaient pesants). Dans ces cas, la loi Normale est le bon cadre.
        </p>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        La simulation suivante décompose visuellement les deux forces du modèle :
      </p>
      <BachelierChart />

      {/* ══════════════════════════════════════════════════════════════
          Section 3 — Black-Scholes
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="black-scholes-gbm" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        3. Le modèle géométrique (Black-Scholes, 1973)
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Pour corriger le défaut des prix négatifs, Black, Scholes et Merton modélisent les chocs
        en <strong>pourcentage du prix</strong> plutôt qu&apos;en montant absolu. C&apos;est le mouvement
        brownien géométrique (GBM), standard absolu pour les actions.
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        L&apos;EDS du modèle géométrique est :
      </p>

      <BlockMath>{`dS_t = \\mu S_t\\, dt + \\sigma S_t\\, dW_t`}</BlockMath>

      <p className="text-gray-600 leading-relaxed mb-4">
        Le coefficient de diffusion est maintenant <InlineMath>{'\\sigma S_t'}</InlineMath>, il
        est proportionnel au prix courant. Une action à 200 € subit des variations absolues
        deux fois plus grandes qu&apos;une action à 100 € pour le même choc, mais le{' '}
        <em>rendement</em> <InlineMath>{'dS_t / S_t = \\sigma\\, dW_t'}</InlineMath> reste
        constant. On peut aussi écrire :
      </p>

      <BlockMath>{`\\frac{dS_t}{S_t} = \\mu\\, dt + \\sigma\\, dW_t`}</BlockMath>

      <p className="text-gray-600 leading-relaxed mb-4">
        En appliquant le Lemme d&apos;Itô à <InlineMath>{'\\ln S_t'}</InlineMath> (voir chapitre
        Lemme d&apos;Itô), on intègre et on trouve que <InlineMath>{'S_T'}</InlineMath> suit une{' '}
        <strong>loi Log-Normale</strong>, confinée sur <InlineMath>{'(0, +\\infty)'}</InlineMath> :
      </p>

      <BlockMath>{`S_T = S_0 \\exp\\!\\left(\\left(\\mu - \\tfrac{1}{2}\\sigma^2\\right)T + \\sigma\\sqrt{T}\\, Z\\right), \\quad Z \\sim \\mathcal{N}(0,1)`}</BlockMath>

      <p className="text-gray-600 leading-relaxed mb-6">
        Puisque l&apos;exponentielle est toujours strictement positive, <InlineMath>{'S_T > 0'}</InlineMath>{' '}
        avec probabilité 1. La faillite (<InlineMath>{'S_T = 0'}</InlineMath>) est un événement de
        probabilité nulle.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Utilisations
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          Le GBM est le modèle de référence pour les <strong>actions</strong> et les{' '}
          <strong>indices boursiers</strong> (S&P 500, Euro Stoxx 50…), le{' '}
          <strong>forex</strong> (paires de devises), et plus généralement tout actif dont le
          prix est strictement positif et dont les rendements sont approximativement normaux.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 4 — Composant interactif
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="visualisation" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        4. Visualisation : Normale vs Log-Normale
      </h2>

      <p className="text-gray-600 leading-relaxed mb-2">
        Le graphique ci-dessous représente les densités de probabilité de{' '}
        <InlineMath>{'S_T'}</InlineMath> pour les deux modèles, avec le même prix initial{' '}
        <InlineMath>{'S_0 = 100'}</InlineMath> et la même volatilité <InlineMath>{'\\sigma'}</InlineMath>.
        La ligne rouge en pointillés marque la frontière <InlineMath>{'S_T = 0'}</InlineMath>.
      </p>

      <DiffusionComparisonChart />

      {/* ══════════════════════════════════════════════════════════════
          Section 5 — Synthèse
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="synthese" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        5. Synthèse : comment choisir ?
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Le choix entre les deux modèles est guidé par la nature économique de l&apos;actif.
      </p>

      {/* Tableau comparatif */}
      <div className="overflow-hidden border border-gray-300 rounded-xl mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left font-semibold text-gray-700 w-1/3"></th>
              <th className="px-4 py-3 text-left font-semibold text-blue-600">
                Arithmétique (Bachelier)
              </th>
              <th className="px-4 py-3 text-left font-semibold text-green-600">
                Géométrique (Black-Scholes)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-3 border-b border-gray-300 font-medium text-gray-700">EDS</td>
              <td className="px-4 py-3 border-b border-gray-300 text-gray-600">
                <InlineMath>{'dS_t = \\mu\\, dt + \\sigma\\, dW_t'}</InlineMath>
              </td>
              <td className="px-4 py-3 border-b border-gray-300 text-gray-600">
                <InlineMath>{'dS_t = \\mu S_t\\, dt + \\sigma S_t\\, dW_t'}</InlineMath>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 border-b border-gray-300 font-medium text-gray-700">
                Distribution de <InlineMath>{'S_T'}</InlineMath>
              </td>
              <td className="px-4 py-3 border-b border-gray-300 text-gray-600">
                Normale <InlineMath>{'\\mathcal{N}(S_0 + \\mu T,\\; \\sigma^2 T)'}</InlineMath>
              </td>
              <td className="px-4 py-3 border-b border-gray-300 text-gray-600">
                Log-Normale donc asymétrique et queue droite épaisse
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 border-b border-gray-300 font-medium text-gray-700">
                Prix négatifs possibles
              </td>
              <td className="px-4 py-3 border-b border-gray-300 text-gray-600">
                Oui, loi définie sur <InlineMath>{'(-\\infty, +\\infty)'}</InlineMath>
              </td>
              <td className="px-4 py-3 border-b border-gray-300 text-gray-600">
                Non, <InlineMath>{'S_T > 0'}</InlineMath> avec probabilité 1
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-gray-700">Cas d&apos;usage</td>
              <td className="px-4 py-3 text-gray-600">
                Taux d&apos;intérêt bas, spreads, matières premières en crise
              </td>
              <td className="px-4 py-3 text-gray-600">
                Actions, indices boursiers, forex
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Règle de décision */}
      <p className="text-gray-600 leading-relaxed mb-4">
        La règle de décision pratique tient en deux questions :
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-4">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
          L&apos;actif peut-il passer sous zéro ?
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Si oui (taux bas, spreads), utiliser le <strong>modèle arithmétique de Bachelier</strong>.
          Si oui (taux bas, spreads), utiliser le <strong>modèle arithmétique de Bachelier</strong>.
          La loi Normale est cohérente avec des valeurs négatives et facilite la gestion des
          produits dont le payoff est linéaire en niveau (et non en pourcentage).
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
          La perte maximale s&apos;arrête-t-elle à zéro ?
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Si oui (action, devise), utiliser le <strong>modèle géométrique de Black-Scholes</strong>.
          La log-normalité garantit <InlineMath>{'S_T > 0'}</InlineMath>, cohérent avec la
          responsabilité limitée des actionnaires — une société peut faire faillite, mais son
          cours ne peut pas devenir négatif.
        </p>
      </div>

      <div className="border-l-4 border-blue-400 pl-5 py-1 my-8">
        <p className="text-gray-700 italic leading-relaxed">
          Le choix du modèle de diffusion n&apos;est pas un détail technique — il détermine la
          forme de la distribution des scénarios futurs, et donc la valeur de chaque option.
          Un mauvais choix produit des prix systématiquement biaisés.
        </p>
      </div>

      {/* ── Lien quiz ── */}
      <div className="mt-12 p-5 bg-gray-50 border border-gray-300 rounded-xl flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-800">Prêt à tester tes connaissances ?</p>
          <p className="text-sm text-gray-500 mt-0.5">Quiz sur le Module 2 — Pricing</p>
        </div>
        <span className="shrink-0 bg-gray-200 text-gray-500 text-sm font-semibold px-5 py-2.5 rounded-lg cursor-default">
          Bientôt disponible
        </span>
      </div>

      {/* ── Navigation Précédent / Suivant ── */}
      <div className="mt-8 pt-8 border-t border-gray-300 flex items-center justify-between gap-4">

        {/* Précédent */}
        <Link
          href="/cours/module-2-pricing/probabilites-d1-d2"
          className="group w-1/2 flex flex-col items-start p-4 border border-gray-300 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all"
        >
          <span className="text-xs text-gray-400 mb-1">← Chapitre précédent</span>
          <span className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
            Formule de Black-Scholes
          </span>
        </Link>

        {/* Suivant */}
        <Link
          href="/cours/module-3-grecques/grecques-premier-ordre"
          className="group w-1/2 flex flex-col items-end p-4 border border-gray-300 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all text-right"
        >
          <span className="text-xs text-gray-400 mb-1">Chapitre suivant →</span>
          <span className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
            L&apos;essentiel des Greeks
          </span>
        </Link>

      </div>

    </article>
  );
}
