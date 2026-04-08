// Page de cours : Module 6 — Vol implicite et nappes

import Link from 'next/link';
import { InlineMath, BlockMath } from '../../../components/Math';
import VolSurfaceWrapper from './VolSurfaceWrapper';

export const metadata = {
  title: 'Vol implicite et nappes — Finance according to James',
  description:
    "Volatilité implicite, smile, skew, nappe de volatilité et formule de Dupire. L'architecture cachée des marchés d'options.",
};

export default function VolImpliciteNappesPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12">

      {/* ── Fil d'Ariane ── */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-blue-600 transition-colors">Accueil</Link>
        <span>/</span>
        <Link href="/cours" className="hover:text-blue-600 transition-colors">Cours</Link>
        <span>/</span>
        <span className="text-gray-500">Module 6 — Volatilité</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">Vol implicite et nappes</span>
      </nav>

      {/* ── Titre ── */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
        Vol implicite et nappes
      </h1>

      {/* ── Introduction ── */}
      <p className="text-lg text-gray-600 leading-relaxed mb-4">
        Black-Scholes repose sur l'hypothèse que la volatilité est une constante,
        identique pour toutes les options d&apos;un même sous-jacent. Les marchés, eux, ont leur
        propre opinion. Et depuis le krach de 1987, on l'observe clairement :
        la volatilité n&apos;est pas plate.
      </p>
      <p className="text-gray-600 leading-relaxed mb-10">
        Ce chapitre explore comment on lit cette information dans les prix,
        comment on la cartographie sous forme de nappe, et comment Bruno Dupire
        a fourni la réponse mathématique en 1994.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 1 — La volatilité implicite
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="volatilite-implicite" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-24">
        1. L&apos;inversion de la formule : la volatilité implicite
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Sur les marchés financiers, les options sont cotées en continu par l&apos;offre et la
        demande. Le prix d&apos;un Call <InlineMath>{'C_{\\text{marché}}'}</InlineMath> est donc une
        donnée observable.
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        Dans la formule de Black-Scholes, tous les paramètres sont connus (<InlineMath>S</InlineMath> le
        prix spot, <InlineMath>K</InlineMath> le strike, <InlineMath>T</InlineMath> le temps,{' '}
        <InlineMath>r</InlineMath> le taux sans risque, <InlineMath>q</InlineMath> le dividende
        continu)... sauf la volatilité.
      </p>
      <p className="text-gray-600 leading-relaxed mb-6">
        On peut donc faire fonctionner l&apos;équation à l&apos;envers.
        On cherche la volatilité théorique <InlineMath>{'\\sigma_{\\text{imp}}'}</InlineMath> qu&apos;il
        faut injecter dans la formule de Black-Scholes pour qu&apos;elle donne exactement
        le prix observé sur le marché :
      </p>

      {/* Formule encadrée */}
      <div className="bg-gray-50 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center">
        <BlockMath>{'C_{\\text{marché}} = BS\\!\\left(S,\\, K,\\, T,\\, r,\\, q,\\, \\sigma_{\\text{imp}}\\right)'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-10">
        Cette valeur est appelée la <strong>volatilité implicite</strong>. C&apos;est l&apos;opinion actuelle du marché sur le risque futur
        de l&apos;actif.
      </p>

      <div className="mt-6 mb-10 p-4 bg-amber-50 border border-amber-200 rounded-xl">
        <p className="text-sm font-semibold text-amber-800 uppercase tracking-wide mb-2">Calibration : l'algorithme de Newton-Raphson pour trouver la vol impli</p>
        <p className="text-gray-700 text-sm">
          D&apos;un point de vue quantitatif, comme il n&apos;existe pas de formule mathématique pour isoler <InlineMath>{'\\sigma_{imp}'}</InlineMath>, l&apos;extraction de la volatilité implicite nécessite un solveur numérique. On peut utiliser l&apos;algorithme de Newton-Raphson : en s&apos;appuyant sur la sensibilité du prix à la volatilité (le Vega), l&apos;ordinateur ajuste itérativement le <InlineMath>{'\\sigma_{imp}'}</InlineMath> théorique jusqu&apos;à retomber parfaitement sur la cotation du marché.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 2 — Le smile et le skew
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="smile-skew" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-24">
        2. L&apos;observation du marché : le smile et le skew
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Si l&apos;hypothèse de Black-Scholes était vraie, toutes les options sur un même
        sous-jacent (peu importe leur strike ou leur échéance) devraient afficher la même
        volatilité implicite. Or, depuis le krach de 1987, les traders ont constaté que
        ce n&apos;est pas le cas.
      </p>
      <p className="text-gray-600 leading-relaxed mb-6">
        En traçant la volatilité implicite en fonction du strike pour une maturité donnée,
        on observe une courbe convexe dont la forme dépend du sous-jacent.
      </p>

      {/* Deux boîtes bleues côte à côte */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex-1">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
            Le skew actions
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            Sur les indices boursiers (CAC 40, S&amp;P 500), les puts avec des strikes très bas
            s&apos;échangent à des prix très élevés. Les gérants de portefeuille paient des
            fortunes pour s&apos;assurer contre les baisses extrêmes. En inversant BS, cela
            donne une volatilité implicite très élevée pour les petits strikes. La courbe
            est <strong>décroissante</strong> : plus le strike est bas, plus la vol est haute.
            Le smile est en forme de luge, cette asymétrie s&apos;appelle le <strong>skew</strong>.
            Le skew ou la pente du smile est plus prononcé sur les indices que sur les actions individuelles,
            car les indices sont plus sensibles aux crashes systémiques (la vol est plus basse ATM mais plus haute sur les Puts profonds).
          </p>
          {/* SVG skew actions — descend jusqu'à ATM puis remonte légèrement à droite */}
          <svg viewBox="0 0 280 120" className="w-full mt-4" aria-hidden="true">
            {/* Axes */}
            <line x1="30" y1="10" x2="30" y2="95" stroke="#9ca3af" strokeWidth="1" />
            <line x1="30" y1="95" x2="265" y2="95" stroke="#9ca3af" strokeWidth="1" />
            {/* Ligne ATM pointillée */}
            <line x1="147" y1="10" x2="147" y2="95" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3 3" />
            {/* Courbe : part haut gauche, descend vers ATM, remonte légèrement à droite */}
            <path d="M 38 18 C 75 30, 115 60, 147 72 C 178 82, 215 76, 255 68" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
            {/* Label axe Y */}
            <text x="33" y="15" fontSize="9" fill="#6b7280" fontFamily="sans-serif">σ_impl</text>
            {/* Labels sous l'axe X */}
            <text x="55" y="108" fontSize="8" fill="#6b7280" fontFamily="sans-serif" textAnchor="middle">OTM Put</text>
            <text x="147" y="108" fontSize="8" fill="#6b7280" fontFamily="sans-serif" textAnchor="middle">ATM</text>
            <text x="228" y="108" fontSize="8" fill="#6b7280" fontFamily="sans-serif" textAnchor="middle">OTM Call</text>
          </svg>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex-1">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
            Le smile forex
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            Sur les devises, la courbe forme un vrai sourire en U (d'où le terme "smile"). Les strikes extrêmes
            (à la hausse comme à la baisse) ont une volatilité implicite plus forte que à la
            monnaie. La symétrie s&apos;explique par la nature réciproque des paires
            de devises : un krach EUR/USD est un rally USD/EUR.
            Attention il n'est pas parfaitement symétrique, il se penche vers la devise la plus demandée
            (ou vers celle qui a le taux le plus faible dans le cas des Carry Trades).
          </p>
          {/* SVG smile forex — courbe en U légèrement asymétrique (gauche un peu plus haut) */}
          <svg viewBox="0 0 280 120" className="w-full mt-4" aria-hidden="true">
            {/* Axes */}
            <line x1="30" y1="10" x2="30" y2="95" stroke="#9ca3af" strokeWidth="1" />
            <line x1="30" y1="95" x2="265" y2="95" stroke="#9ca3af" strokeWidth="1" />
            {/* Ligne ATM pointillée */}
            <line x1="147" y1="10" x2="147" y2="95" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3 3" />
            {/* Courbe smile en U asymétrique — gauche légèrement plus haut */}
            <path d="M 38 22 C 70 68, 110 82, 147 84 S 210 72, 255 30" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
            {/* Label axe Y */}
            <text x="33" y="15" fontSize="9" fill="#6b7280" fontFamily="sans-serif">σ_impl</text>
            {/* Labels sous l'axe X */}
            <text x="55" y="108" fontSize="8" fill="#6b7280" fontFamily="sans-serif" textAnchor="middle">OTM Put</text>
            <text x="147" y="108" fontSize="8" fill="#6b7280" fontFamily="sans-serif" textAnchor="middle">ATM</text>
            <text x="228" y="108" fontSize="8" fill="#6b7280" fontFamily="sans-serif" textAnchor="middle">OTM Call</text>
          </svg>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 3 — La nappe de volatilité
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="nappe-volatilite" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-24">
        3. La nappe de volatilité
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        La volatilité implicite ne dépend pas seulement du strike <InlineMath>K</InlineMath>, elle
        dépend aussi du temps restant avant l&apos;échéance <InlineMath>T</InlineMath>. Plus la
        maturité est lointaine, plus le smile a tendance à s&apos;aplatir : le marché anticipe
        un retour à la moyenne sur le long terme.
      </p>
      <p className="text-gray-600 leading-relaxed mb-6">
        En croisant ces deux dimensions, on cartographie ainsi le risque
        sous la forme d&apos;une surface en 3D appelée la <strong>nappe de volatilité</strong>{' '}
        (<em>volatility surface</em>) :
      </p>

      <ul className="text-gray-600 text-sm leading-relaxed space-y-2 mb-6 pl-5 list-none">
        <li>
          <span className="text-gray-400 mr-2">—</span>
          Axe X : le strike <InlineMath>K</InlineMath>
        </li>
        <li>
          <span className="text-gray-400 mr-2">—</span>
          Axe Y : la maturité <InlineMath>T</InlineMath>
        </li>
        <li>
          <span className="text-gray-400 mr-2">—</span>
          Axe Z : la volatilité implicite <InlineMath>{'\\sigma_{\\text{imp}}(K, T)'}</InlineMath>
        </li>
      </ul>

      <p className="text-gray-600 leading-relaxed mb-8">
        La nappe de volatilité est la représentation spatiale de la
        fonction <InlineMath>{'\\sigma_{\\text{imp}}(K, T)'}</InlineMath> observée sur le marché
        à un instant <InlineMath>t</InlineMath>. C&apos;est le tableau de bord fondamental d'un
        trader d&apos;options.
      </p>

      {/* ── Composant interactif nappe 3D ── */}
      <p className="text-gray-600 leading-relaxed mb-4">
        La nappe ci-dessous représente une surface de volatilité typique d&apos;un indice actions —
        le skew prononcé sur les puts OTM est clairement visible. Cliquer et glisser pour
        l&apos;explorer sous tous les angles.
      </p>
      <VolSurfaceWrapper />
      <p className="text-gray-400 text-xs text-center mt-1 mb-8">
        Cliquer et glisser pour faire tourner la nappe
      </p>

      {/* Sous-section contraintes d'arbitrage */}
      <h3 className="text-lg font-semibold text-gray-900 mt-10 mb-4">
        Les contraintes d&apos;arbitrage
      </h3>

      <p className="text-gray-600 leading-relaxed mb-5">
        Une nappe de volatilité n&apos;est pas libre. Pour être cohérente avec l&apos;absence
        d&apos;arbitrage, elle doit respecter deux contraintes fondamentales :
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex-1">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
            Absence d&apos;arbitrage calendar spread
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            À strike fixé, la volatilité implicite doit être croissante en <InlineMath>T</InlineMath>{' '}
            (ou plus précisément, la variance totale <InlineMath>{'\\sigma^2 T'}</InlineMath> doit
            être croissante). Si ce n&apos;est pas le cas, on peut construire un portefeuille
            d&apos;options de maturités différentes (calendar spread) qui génère un profit certain.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex-1">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
            Absence d&apos;arbitrage butterfly
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            À maturité fixée, la nappe doit être convexe en <InlineMath>K</InlineMath>.
            Mathématiquement, <InlineMath>{'\\partial^2 C / \\partial K^2 \\geq 0'}</InlineMath> pour
            tout <InlineMath>K</InlineMath>, ce qui correspond à une densité de probabilité
            positive. Une nappe non convexe autoriserait un arbitrage par achat/vente de
            trois options à strikes différents (butterfly spread).
          </p>
        </div>
      </div>

      <p className="text-gray-600 leading-relaxed mb-10">
        En pratique, les nappes brutes extraites des prix de marché ne vérifient pas
        toujours ces contraintes. Quand un pricer institutionnel affiche une nappe de volatilité,
        il ne relie pas bêtement les points du marché. L'algorithme prend les prix cotés,
        trouve la meilleure surface en utilisant des modèles de lissage (SVI, SSVI, filtre de Kalman)
        pour construire des nappes propres (lisse et sans arbitrage) avant tout pricing. Donc ce sont ces nappes
        qui seront injectées dans le modèle de Dupire pour valoriser les produits exotiques complexes des clients.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 4 — Dupire
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="dupire" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-24">
        4. La réponse mathématique : la volatilité locale de Dupire (1994)
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Face à cette nappe de volatilité, la finance quantitative faisait face à un
        problème concret : comment pricer des options exotiques si Black-Scholes est
        faux ? On ne peut pas injecter plusieurs volatilités implicites dans une seule
        équation de diffusion.
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        La solution a été apportée par le mathématicien français Bruno Dupire qui dit
        qu'il existe un processus de diffusion unique qui reproduit exactement toute la
        nappe de volatilité observée sur le marché.
      </p>
      <p className="text-gray-600 leading-relaxed mb-6">
        Il abandonne la volatilité constante <InlineMath>{'\\sigma'}</InlineMath> et introduit une{' '}
        <strong>volatilité locale</strong> <InlineMath>{'\\sigma_L'}</InlineMath>, fonction
        déterministe du prix et du temps :
      </p>

      {/* Formule GBM Dupire */}
      <div className="bg-gray-50 border border-gray-300 rounded-xl px-8 py-6 mb-8 text-center">
        <BlockMath>{'dS_t = \\mu S_t \\, dt + \\sigma_L(S_t,\\, t) \\, S_t \\, dW_t'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        <strong>La formule de Dupire</strong>
      </p>
      <p className="text-gray-600 leading-relaxed mb-6">
        Dupire prouve que cette volatilité locale peut être extraite directement des prix
        d&apos;options observés sur la nappe. La formule complète (avec taux sans risque{' '}
        <InlineMath>r</InlineMath> et dividende continu <InlineMath>q</InlineMath>) s&apos;écrit :
      </p>

      {/* Formule Dupire */}
      <div className="bg-gray-50 border border-gray-300 rounded-xl px-8 py-6 mb-8 text-center">
        <BlockMath>{'\\sigma_L^2(K, T) = \\frac{\\dfrac{\\partial C}{\\partial T} + (r - q)\\, K\\, \\dfrac{\\partial C}{\\partial K} + q\\, C}{\\dfrac{1}{2}\\, K^2\\, \\dfrac{\\partial^2 C}{\\partial K^2}}'}</BlockMath>
      </div>

      {/* Deux boîtes bleues côte à côte */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex-1">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
            Le numérateur
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            <InlineMath>{'\\partial C / \\partial T'}</InlineMath> est le déclin temporel des
            options sur la nappe (lié au Theta). Le terme{' '}
            <InlineMath>{'(r - q)\\, K\\, \\partial C / \\partial K'}</InlineMath> est une correction
            de coût de portage. Ensemble, ils capturent la dynamique temporelle de la nappe.
            Côté Calendar.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex-1">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
            Le dénominateur
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            <InlineMath>{'\\tfrac{1}{2} K^2\\, \\partial^2 C / \\partial K^2'}</InlineMath> est
            proportionnel à la densité de probabilité risque-neutre de{' '}
            <InlineMath>S_T</InlineMath> au niveau <InlineMath>K</InlineMath> (formule de
            Breeden-Litzenberger). C&apos;est la courbure de la nappe en strike (convexité du strike).
            Côté Butterfly.
          </p>
        </div>
      </div>

      <p className="text-gray-600 leading-relaxed mb-10">
        Grâce à cette formule, si on dispose d&apos;une nappe lissée et sans arbitrage,
        on peut extraire <InlineMath>{'\\sigma_L'}</InlineMath> en chaque point, l&apos;injecter dans
        une simulation Monte Carlo, et pricer n&apos;importe quel produit
        exotique en garantissant une calibration parfaite aux prix vanilles du marché.
      </p>

      {/* ── Lien quiz ── */}
      <div className="mt-10 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-gray-700">
        Un quiz sur le Module 6 sera bientôt disponible.
      </div>

      {/* ── Navigation Précédent / Suivant ── */}
      <div className="flex justify-between mt-12 pt-6 border-t border-gray-300">
        <a href="/cours/module-3-grecques/arbitrage-theta-gamma" className="text-blue-600 hover:underline text-sm">
          ← Arbitrage Theta-Gamma
        </a>
        <a href="/cours/module-6-volatilite/vol-stochastique" className="text-blue-600 hover:underline text-sm">
          Vol stochastique →
        </a>
      </div>

    </article>
  );
}
