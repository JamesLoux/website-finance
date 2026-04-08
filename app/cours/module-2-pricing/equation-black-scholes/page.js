// Page de cours : Module 2 — Équation de Black-Scholes

import Link from 'next/link';
import { InlineMath, BlockMath } from '../../../components/Math';

export const metadata = {
  title: 'Équation de Black-Scholes — Finance according to James',
  description:
    'Dérivation complète de l\'équation de Black-Scholes par le delta-hedging et l\'absence d\'arbitrage.',
};

export default function EquationBlackScholesPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12">

      {/* ── Fil d'Ariane ── */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/cours" className="hover:text-blue-600 transition-colors">Cours</Link>
        <span>/</span>
        <span className="text-gray-500">Module 2 — Pricing</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">Équation de Black-Scholes</span>
      </nav>

      {/* ── Titre ── */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
        L&apos;Équation de Black-Scholes
      </h1>

      {/* ── Introduction ── */}
      <p className="text-lg text-gray-600 leading-relaxed mb-10">
        Le modèle de Black, Scholes et Merton (1973) repose sur une idée : puisqu&apos;il
        est possible de <strong>répliquer exactement</strong> le comportement d&apos;une option avec
        le sous-jacent et un actif sans risque, on peut annuler tout le risque de marché.
        C&apos;est le principe du <strong>Delta-Hedging</strong>.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 0 — L'intuition : la réplication
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="intuition" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-24">
        0. L&apos;intuition — la réplication
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        La finance quantitative repose sur une idée simple : si on peut
        construire un portefeuille qui se comporte exactement comme une option (qu'importe le 
        scénario du marché) alors ce portefeuille et l&apos;option doivent avoir le même prix.
        Sinon, un arbitrage existe.
      </p>

      <p className="text-gray-600 leading-relaxed mb-6">
        Black, Scholes et Merton ont montré en 1973 que cette réplication est possible, en
        ajustant en continu la quantité de sous-jacent détenue. Le prix d&apos;une option n&apos;est donc
        pas une opinion sur la direction du marché, c&apos;est le <strong>coût de sa réplication
        dynamique</strong>.
      </p>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
        <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-2">
          Conséquence directe
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Le drift <InlineMath>{`\\mu`}</InlineMath> de l&apos;actif disparaît de l&apos;équation. Peu importe
          que le marché monte ou descende en tendance, le prix de l&apos;option est universel. On
          retrouve ici le résultat de Girsanov : sous <InlineMath>{`\\mathbb{Q}`}</InlineMath>,
          seul le taux sans risque <InlineMath>r</InlineMath> compte.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 1 — Les hypothèses fondamentales
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="hypotheses" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        1. Les hypothèses
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Voici le cadre restrictif du modèle :
      </p>

      <div className="overflow-hidden border border-gray-300 rounded-xl mb-10">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Hypothèse</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Ce qu&apos;elle implique</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Limite pratique</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-3 border-b border-gray-300 text-gray-700">
                <InlineMath>S_t</InlineMath> suit un GBM — volatilité{' '}
                <InlineMath>{`\\sigma`}</InlineMath> et drift{' '}
                <InlineMath>{`\\mu`}</InlineMath> constants
              </td>
              <td className="px-4 py-3 border-b border-gray-300 text-gray-600">
                Les rendements sont log-normaux, les queues de distribution sont fines
              </td>
              <td className="px-4 py-3 border-b border-gray-300 text-gray-600">
                En réalité la volatilité sourit (skew) et les queues sont épaisses — Module 6
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 border-b border-gray-300 text-gray-700">
                Marché continu — pas de frais, divisibilité parfaite
              </td>
              <td className="px-4 py-3 border-b border-gray-300 text-gray-600">
                Le delta-hedging est instantané et sans coût
              </td>
              <td className="px-4 py-3 border-b border-gray-300 text-gray-600">
                En pratique le rebalancement est discret et coûteux — Module 3
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-gray-700">
                Emprunt et prêt illimités au taux <InlineMath>r</InlineMath>
              </td>
              <td className="px-4 py-3 text-gray-600">
                Le taux sans risque est unique et constant
              </td>
              <td className="px-4 py-3 text-gray-600">
                En réalité les taux varient et les spreads de crédit existent — Module 4
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 2 — La construction du portefeuille de couverture
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="portefeuille-couverture" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        2. La construction du portefeuille de couverture
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Considérons une option dont le prix à l&apos;instant <InlineMath>t</InlineMath> est donné par
        une fonction <InlineMath>{'V(S, t)'}</InlineMath>. Nous construisons un portefeuille{' '}
        <InlineMath>{`\\Pi`}</InlineMath> en achetant une unité de cette option et en vendant à
        découvert une quantité <InlineMath>{`\\Delta`}</InlineMath> du sous-jacent :
      </p>

      <BlockMath>{`\\Pi = V(S, t) - \\Delta S_t`}</BlockMath>

      <p className="text-gray-600 leading-relaxed mb-10">
        L&apos;objectif est de trouver la valeur exacte de <InlineMath>{`\\Delta`}</InlineMath> qui
        immunisera ce portefeuille contre les variations infinitésimales de{' '}
        <InlineMath>S_t</InlineMath>.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 3 — La dynamique via le Lemme d'Itô
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="dynamique-ito" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        3. La dynamique du portefeuille via le Lemme d&apos;Itô
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        La variation du portefeuille sur un pas de temps infinitésimal{' '}
        <InlineMath>dt</InlineMath> est :
      </p>

      <BlockMath>{`d\\Pi = dV - \\Delta \\, dS_t`}</BlockMath>

      <p className="text-gray-600 leading-relaxed mb-4">
        En appliquant le Lemme d&apos;Itô à <InlineMath>{'V(S, t)'}</InlineMath> :
      </p>

      <BlockMath>{`dV = \\left( \\frac{\\partial V}{\\partial t} + \\mu S_t \\frac{\\partial V}{\\partial S} + \\frac{1}{2}\\sigma^2 S_t^2 \\frac{\\partial^2 V}{\\partial S^2} \\right) dt + \\sigma S_t \\frac{\\partial V}{\\partial S} \\, dW_t`}</BlockMath>

      <p className="text-gray-600 leading-relaxed mb-4">
        En remplaçant <InlineMath>dV</InlineMath> et{' '}
        <InlineMath>{'dS_t = \\mu S_t \\, dt + \\sigma S_t \\, dW_t'}</InlineMath> dans{' '}
        <InlineMath>{`d\\Pi`}</InlineMath>, et en regroupant les termes :
      </p>

      <BlockMath>{`d\\Pi = \\left( \\frac{\\partial V}{\\partial t} + \\mu S_t \\frac{\\partial V}{\\partial S} + \\frac{1}{2}\\sigma^2 S_t^2 \\frac{\\partial^2 V}{\\partial S^2} - \\Delta \\mu S_t \\right) dt + \\sigma S_t \\left( \\frac{\\partial V}{\\partial S} - \\Delta \\right) dW_t`}</BlockMath>

      {/* ══════════════════════════════════════════════════════════════
          Section 4 — Le Delta-Hedging
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="delta-hedging" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        4. L&apos;élimination du risque — le Delta-Hedging
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Le terme en <InlineMath>dW_t</InlineMath> représente le risque directionnel du marché.
        Pour rendre le portefeuille totalement insensible aux chocs, on annule ce terme en
        choisissant :
      </p>

      <BlockMath>{`\\Delta = \\frac{\\partial V}{\\partial S}`}</BlockMath>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Exemple concret
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Si <InlineMath>{'\\Delta = 0.6'}</InlineMath> et <InlineMath>S</InlineMath> monte de 1€,
          la position en option gagne environ 0.60€ — exactement compensé par la perte sur les
          0.6 actions vendues à découvert. Le portefeuille est immunisé contre ce choc.
        </p>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        Cette annulation fait disparaître l&apos;incertitude. Le rendement du portefeuille devient
        purement déterministe :
      </p>

      <BlockMath>{`d\\Pi = \\left( \\frac{\\partial V}{\\partial t} + \\frac{1}{2}\\sigma^2 S_t^2 \\frac{\\partial^2 V}{\\partial S^2} \\right) dt`}</BlockMath>

      {/* ══════════════════════════════════════════════════════════════
          Section 5 — L'absence d'arbitrage
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="absence-arbitrage" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        5. L&apos;absence d&apos;opportunité d&apos;arbitrage (AOA)
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Un portefeuille totalement sans risque doit rapporter exactement le taux sans risque{' '}
        <InlineMath>r</InlineMath>. Le mécanisme est automatique :
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Le mécanisme d&apos;arbitrage
        </p>
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Si <InlineMath>{'d\\Pi > r\\Pi \\, dt'}</InlineMath> : tout trader rationnel emprunte
          au taux <InlineMath>r</InlineMath> pour acheter <InlineMath>{`\\Pi`}</InlineMath>. La
          demande fait monter le prix de l&apos;option jusqu&apos;à ce que l&apos;écart disparaisse.
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Si <InlineMath>{'d\\Pi < r\\Pi \\, dt'}</InlineMath> : tout trader vend{' '}
          <InlineMath>{`\\Pi`}</InlineMath> et place l&apos;argent au taux sans risque. L&apos;offre fait
          baisser le prix jusqu&apos;à l&apos;équilibre.
        </p>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        Dans les deux cas, la concurrence entre arbitragistes force{' '}
        <InlineMath>{'d\\Pi = r\\Pi \\, dt'}</InlineMath>. En remplaçant{' '}
        <InlineMath>{'\\Pi = V - \\frac{\\partial V}{\\partial S} S_t'}</InlineMath> :
      </p>

      <BlockMath>{`d\\Pi = r\\left(V - \\frac{\\partial V}{\\partial S} S_t\\right) dt`}</BlockMath>

      {/* ══════════════════════════════════════════════════════════════
          Section 6 — L'équation finale
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="equation-finale" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        6. L&apos;équation finale
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        En égalisant les deux expressions de <InlineMath>{`d\\Pi`}</InlineMath> de la partie 4 et 5, en
        réorganisant on obtient l&apos;équation de Black-Scholes :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-8 text-center text-gray-900">
        <BlockMath>{`\\frac{\\partial V}{\\partial t} + r S_t \\frac{\\partial V}{\\partial S} + \\frac{1}{2}\\sigma^2 S_t^2 \\frac{\\partial^2 V}{\\partial S^2} = rV`}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        On peut la lire aussi par les Greeks si on veut :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center text-gray-900">
        <BlockMath>{`\\Theta + r S_t \\Delta + \\frac{1}{2} \\sigma^2 S_t^2 \\Gamma = rV`}</BlockMath>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
        <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-2">
          Interprétation trader
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Le coût du passage du temps (<InlineMath>{`\\Theta`}</InlineMath>) et l&apos;ajustement de
          convexité de la volatilité (<InlineMath>{'\\frac{1}{2}\\sigma^2 S^2 \\Gamma'}</InlineMath>)
          doivent financer le coût de portage de la position couverte (
          <InlineMath>{'rV - rS_t\\Delta'}</InlineMath>). Le fameux trade-off Theta-Gamma est
          entièrement résumé ici.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 7 — Les limites du modèle
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="limites-modele" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        7. Les limites du modèle
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        L&apos;équation de Black-Scholes est élégante et universelle — mais elle repose sur des
        hypothèses qui ne tiennent pas en pratique. Trois limites sont critiques :
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-4">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          La volatilité n&apos;est pas constante
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          En pratique, la volatilité implicite varie selon le strike et la maturité, c&apos;est le{' '}
          <strong>smile de volatilité</strong>. Un put très en dehors de la monnaie a une vol
          implicite bien supérieure à un call équivalent. Black-Scholes, avec son{' '}
          <InlineMath>{`\\sigma`}</InlineMath> constant, est incapable de capturer ce phénomène.
          Solution : les modèles de volatilité locale et stochastique (Module 6).
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-4">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Les marchés ne sont pas continus
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          Le delta-hedging continu est une fiction mathématique. En pratique, les marchés ont
          des gaps (ouvertures en écart, événements macro), et le rebalancement est discret et
          coûteux. Le risque résiduel non couvert s&apos;appelle le <strong>risque de gamma</strong>.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Les queues de distribution sont épaisses
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          La log-normalité sous-estime la probabilité des événements extrêmes. Les krachs de
          1987, 2008, 2020 sont des événements quasi-impossibles sous Black-Scholes. En pratique,
          on corrige via le skew de volatilité.
        </p>
      </div>

      <div className="border-l-4 border-blue-400 pl-5 py-1 my-8">
        <p className="text-gray-700 italic leading-relaxed">
          Black-Scholes ne décrit pas le monde réel — il fournit le <strong>langage
          universel</strong> dans lequel les traders communiquent. La volatilité implicite
          n&apos;est pas une prévision : c&apos;est un prix.
        </p>
      </div>

      {/* ── Lien quiz ── */}
      <div className="mt-10 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-gray-700">
        Un quiz sur le Module 2 sera bientôt disponible.
      </div>

      {/* ── Navigation Précédent / Suivant ── */}
      <div className="flex justify-between mt-12 pt-6 border-t border-gray-300">
        <a href="/cours/module-1-calcul-stochastique/girsanov-risque-neutre" className="text-blue-600 hover:underline text-sm">
          ← Girsanov &amp; Risque-Neutre
        </a>
        <a href="/cours/module-2-pricing/probabilites-d1-d2" className="text-blue-600 hover:underline text-sm">
          Formule de Black-Scholes →
        </a>
      </div>

    </article>
  );
}
