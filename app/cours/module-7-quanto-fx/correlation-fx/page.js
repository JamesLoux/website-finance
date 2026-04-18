import Link from 'next/link'
import { InlineMath, BlockMath } from '../../../components/Math'

export const metadata = {
  title: 'Corrélation Indice et FX — Module 7 | Finance according to James',
  description: 'Corrélation vs Bêta, volatilité d\'indice, corrélation implicite et trading de dispersion.',
}

export default function CorrelationFX() {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">

      {/* Fil d'Ariane */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/cours" className="hover:text-blue-600">Cours</Link>
        <span className="mx-2">/</span>
        <span>Module 7 — Quanto & FX</span>
        <span className="mx-2">/</span>
        <span className="text-gray-700 font-medium">Corrélation Indice et FX</span>
      </nav>

      <h1 className="text-4xl font-bold text-gray-900 mb-6">Corrélation Indice et FX</h1>

      <p className="text-gray-600 leading-relaxed mb-10">
        Dès qu'un portefeuille contient plus d'un actif, la volatilité individuelle ne suffit plus.
        Il faut mesurer comment les actifs interagissent entre eux. La corrélation n'est pas seulement
        un outil de mesure du risque, c'est un <strong> paramètre de marché</strong>. Cette page pose les bases mathématiques nécessaires pour
        comprendre la volatilité d'indice, la corrélation implicite, et zoom sur la stratégie de dispersion
        qui en découle et qui permet de l'isoler.
      </p>

      {/* ── Section 1 ── */}
      <h2 id="correlation-beta" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        1. Corrélation et Bêta
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        La corrélation et le Bêta sont deux métriques souvent confondues, car elles sont liées. Leur relation :
      </p>

      <div className="bg-gray-100 px-8 py-6 rounded-xl my-6 text-center">
        <BlockMath>{'\\beta_{A,B} = \\rho_{A,B} \\times \\frac{\\sigma_A}{\\sigma_B}'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        La <strong className="text-gray-800">corrélation</strong> <InlineMath>{'\\rho_{X,Y}'}</InlineMath> est
        une mesure de dépendance linéaire comprise entre −1 et 1. Elle se construit à partir de la covariance,
        normalisée par le produit des écarts-types pour être comparable quelle que soit l'unité de mesure :
      </p>

      <div className="bg-gray-100 px-8 py-6 rounded-xl my-6 text-center">
        <BlockMath>{'\\rho_{X,Y} = \\frac{\\text{Cov}(X,Y)}{\\sigma_X \\sigma_Y} = \\frac{\\mathbb{E}[XY] - \\mathbb{E}[X]\\mathbb{E}[Y]}{\\sqrt{\\mathbb{E}[X^2] - (\\mathbb{E}[X])^2}\\;\\sqrt{\\mathbb{E}[Y^2] - (\\mathbb{E}[Y])^2}}'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        La covariance est au coeur de tout ce qui suit. Sa propriété clé est la <strong className="text-gray-800">bilinéarité</strong> :
        on peut sortir les constantes et les sommes de la fonction, exactement comme dans une multiplication ordinaire.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6">
        <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-2">Linéarité de la covariance</p>
        <div className="text-center">
          <BlockMath>{'\\text{Cov}(aX,\\, bY + Z) = ab\\cdot\\text{Cov}(X,Y) + a\\cdot\\text{Cov}(X,Z)'}</BlockMath>
        </div>
        <p className="text-gray-600 text-sm mt-3">
          C'est exclusivement grâce à cette propriété que l'on peut décomposer la variance d'un portefeuille
          en sommant ses composants individuels. Toute la suite en dépend.
        </p>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        Le <strong className="text-gray-800">Bêta</strong> prend la corrélation directionnelle et lui applique
        le ratio des volatilités. Il répond à une question différente : si le marché monte de 1%, de combien
        l'actif va-t-il bouger en moyenne ? Quand un actif est beaucoup plus volatil que son benchmark,
        le Bêta intègre cet effet de levier et peut dépasser 1, même si la corrélation reste modérée.
      </p>

      {/* ── Section 2 ── */}
      <h2 id="demonstration-indice-fx" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        2. Démonstration : corrélation indice-FX
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        En salle des marchés, un pricer connaît souvent la corrélation de chaque action individuelle
        avec une devise (la correl entre Nvidia et l'EUR/USD), mais il a besoin d'en déduire la
        corrélation globale de l'indice avec cette même devise. Voici la démonstration simple en quatre étapes,
        en s'appuyant sur la linéarité de la covariance.
      </p>

      {/* Étape 1 */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Étape 1 — Rendement de l'indice</p>
        <p className="text-gray-600 leading-relaxed mb-3">
          En première approximation, le rendement d'un indice est la somme pondérée (par le facteur de pondération <InlineMath>{'w_i'}</InlineMath>, qui représente le poids de l'actif <InlineMath>{'S_i'}</InlineMath> dans l'indice) des rendements
          de ses <InlineMath>{'N'}</InlineMath> composants :
        </p>
        <div className="bg-gray-100 px-6 py-4 rounded-xl text-center">
          <BlockMath>{'\\frac{dI}{I} \\approx \\sum_{i=1}^{N} w_i\\, \\frac{dS_i}{S_i}'}</BlockMath>
        </div>
      </div>

      {/* Étape 2 */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Étape 2 — Covariance avec le taux de change</p>
        <p className="text-gray-600 leading-relaxed mb-3">
          On cherche la covariance entre le rendement de l'indice et celui du taux de change. Par linéarité,
          la somme sort de la covariance :
        </p>
        
        <BlockMath>{'\\text{Cov}\\!\\left(\\frac{dI}{I},\\frac{dFX}{FX}\\right) = \\sum_{i=1}^{N} w_i\\cdot\\text{Cov}\\!\\left(\\frac{dS_i}{S_i},\\frac{dFX}{FX}\\right)'}</BlockMath>
        
      </div>

      {/* Étape 3 */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Étape 3 — Passage aux corrélations</p>
        <p className="text-gray-600 leading-relaxed mb-3">
          On remplace chaque covariance par sa définition <InlineMath>{'\\text{Cov}(A,B) = \\rho_{A,B}\\cdot\\sigma_A\\cdot\\sigma_B'}</InlineMath> :
        </p>
        
        <BlockMath>{'\\rho_{I,FX}\\cdot\\sigma_I\\cdot\\sigma_{FX} = \\sum_{i=1}^{N} w_i\\cdot\\rho_{i,FX}\\cdot\\sigma_i\\cdot\\sigma_{FX}'}</BlockMath>
        
      </div>

      {/* Étape 4 */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Étape 4 — Simplification et résultat</p>
        <p className="text-gray-600 leading-relaxed mb-3">
          La volatilité du taux de change <InlineMath>{'\\sigma_{FX}'}</InlineMath> apparaît des deux côtés
          et se simplifie car elle n'est dépendant de la somme. On isole la corrélation indice-FX :
        </p>
        <div className="bg-gray-100 px-8 py-6 rounded-xl text-center">
          <BlockMath>{'\\rho_{I,FX} = \\sum_{i=1}^{N} w_i\\cdot\\rho_{i,FX}\\cdot\\frac{\\sigma_i}{\\sigma_I}'}</BlockMath>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
        <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-2">Interprétation</p>
        <p className="text-gray-700 leading-relaxed text-sm">
          La corrélation macroéconomique entre un indice et une devise n'est pas une simple moyenne pondérée
          des corrélations individuelles de ses composants avec cette devise. Elle est aussi pondérée par la vol de ses composants (le ratio <InlineMath>{'\\sigma_i / \\sigma_I'}</InlineMath>).
          Si une action est beaucoup plus volatile que les autres composants de l'indice, sa corrélation individuelle avec la devise
          aura un impact plus important sur la corrélation globale.
        </p>
      </div>

      {/* ── Section 3 ── */}
      <h2 id="volatilite-indice" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        3. Volatilité d'un indice et corrélation implicite
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        La variance d'un indice composé de <InlineMath>{'N'}</InlineMath> actions n'est pas la simple somme
        des variances individuelles. Elle dépend des poids <InlineMath>{'w_i'}</InlineMath> et de toutes
        les corrélations croisées <InlineMath>{'\\rho_{ij}'}</InlineMath> entre chaque paire d'actions :
      </p>

      <BlockMath>{'\\sigma_I^2 = \\text{Var}(I) = \\text{Cov}\\!\\left(\\sum_{i=1}^{N} w_i S_i,\\; \\sum_{j=1}^{N} w_j S_j\\right)'}{'= \\sum_{i=1}^{N}\\sum_{j=1}^{N} w_i\\, w_j\\; \\text{Cov}(S_i, S_j)'}{'= \\sum_{i=1}^{N}\\sum_{j=1}^{N} w_i\\, w_j\\, \\rho_{ij}\\, \\sigma_i\\, \\sigma_j'}</BlockMath>
       
      <div className="bg-gray-100 px-8 py-6 rounded-xl my-6">
        
        <BlockMath>{'\\sigma_I = \\sqrt{\\sum_{i=1}^{N}\\sum_{j=1}^{N} w_i\\, w_j\\, \\rho_{ij}\\, \\sigma_i\\, \\sigma_j}'} </BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        Puisque les actions ne sont jamais toutes parfaitement corrélées entre elles, leurs mouvements
        se compensent partiellement. C'est le principe fondamental de la diversification de Markowitz,
        et il entraîne cette inégalité :
      </p>

      <div className="bg-gray-100 px-8 py-6 rounded-xl my-6 text-center">
        <BlockMath>{'\\sigma_I \\leq \\sum_{i=1}^{N} w_i\\, \\sigma_i'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        La vol de l'indice est toujours inférieure ou égale à la moyenne pondérée des volatilités
        individuelles. L'égalité n'est atteinte que dans le cas extrême où toutes les actions sont
        parfaitement corrélées (<InlineMath>{'\\rho_{ij} = 1'}</InlineMath> pour toutes les paires).
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6">
        <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-2">Corrélation implicite</p>
        <p className="text-gray-700 leading-relaxed text-sm">
          De la même manière qu'on extrait la volatilité implicite de Black-Scholes, les quants extraient
          la <strong>corrélation implicite</strong> en regardant simultanément le prix des options sur
          l'indice (<InlineMath>{'\\sigma_I'}</InlineMath>) et sur les actions individuelles (<InlineMath>{'\\sigma_i'}</InlineMath>).
          Le niveau de corrélation <InlineMath>{'\\rho'}</InlineMath> que le marché anticipe pour le futur
          est ainsi coté en permanence, et peut être tradé.
        </p>
      </div>

      {/* ── Section 4 ── */}
      <h2 id="trading-dispersion" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        4. Le trading de dispersion
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Si on veut trader la correlation on doit exploiter la différence entre la volatilité de l'indice
        et celle de ses composants. La stratégie la plus commune pour isoler et parier sur la corrélation s'appelle
        la <strong className="text-gray-800">dispersion</strong>. Un trade de dispersion consiste à être
        short sur la corrélation, cherchant à ce qu'elle tombent à -1 :
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-3">Jambe 1 — Vendre l'indice</p>
          <p className="text-gray-700 text-sm leading-relaxed">
            Vendre un Straddle (Call + Put ATM) sur l'indice. On encaisse une prime importante.
            On est short la volatilité de l'indice.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-3">Jambe 2 — Acheter les actions</p>
          <p className="text-gray-700 text-sm leading-relaxed">
            Acheter des Straddles sur les principales actions de l'indice, en respectant les poids <InlineMath>{'w_i'}</InlineMath>.
            On est long sur la vol individuelle.
          </p>
        </div>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        Le portefeuille est calibré pour être Delta Neutre et Vega Neutre. Le seul facteur de P&L restant est la corrélation réalisée, dont on veut qu'elle soit plus basse que celle implicitée/attendue dans les cours des options achetées et vendues.
        Le tableau suivant montre le P&L des deux jambes selon le niveau de corrélation réalisée :
      </p>

      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-300">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Scénario</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Jambe indice (vendue)</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Jambe actions (achetée)</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">P&L global</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="py-3 px-4 text-gray-700 font-medium">Actions dispersées<br/><span className="text-gray-400 font-normal text-xs">Corrélation réalisée basse</span></td>
              <td className="py-3 px-4 text-gray-600">L'indice bouge peu. Le Straddle vendu expire sans valeur. On conserve la prime.</td>
              <td className="py-3 px-4 text-gray-600">Forte volatilité individuelle. Puts et Calls ITM massifs. Gains importants.</td>
              <td className="py-3 px-4 font-semibold text-green-700">Positif</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-3 px-4 text-gray-700 font-medium">Actions corrélées<br/><span className="text-gray-400 font-normal text-xs">Corrélation réalisée haute</span></td>
              <td className="py-3 px-4 text-gray-600">L'indice s'effondre. Le Straddle vendu est massivement ITM. Pertes importantes.</td>
              <td className="py-3 px-4 text-gray-600">Toutes les actions chutent ensemble. Les Puts individuels gagnent, mais moins que la perte sur l'indice.</td>
              <td className="py-3 px-4 font-semibold text-red-700">Négatif</td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-gray-700 font-medium">Volatilité flat<br/><span className="text-gray-400 font-normal text-xs">Ni dispersion, ni krach</span></td>
              <td className="py-3 px-4 text-gray-600">Straddle vendu expire sans valeur. Prime conservée.</td>
              <td className="py-3 px-4 text-gray-600">Straddles achetés expirent sans valeur. Primes perdues.</td>
              <td className="py-3 px-4 font-semibold text-gray-500">Faiblement négatif</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
        <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-2">L'intuition de la dispersion</p>
        <p className="text-gray-700 leading-relaxed text-sm">
          Le scénario idéal est une saison de résultats (Earnings Season) agitée :
          certaines entreprises s'effondrent, d'autres explosent à la hausse, mais l'indice reste stable
          car les mouvements s'annulent. La correl est à -1. La jambe vendue ne coûte rien, la jambe achetée rapporte tout.
        </p>
      </div>

      {/* ── Quiz ── */}
      <div className="mt-10 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-gray-700">
        Le quiz du Module 7 est disponible — <a href="/quiz/module-7" className="text-blue-600 hover:underline font-medium">S&apos;entraîner →</a>
      </div>

      {/* ── Navigation ── */}
      <div className="flex justify-between mt-12 pt-6 border-t border-gray-300">
        <a href="/cours/module-6-volatilite/skew-delta" className="text-blue-600 hover:underline text-sm">
          ← Skew Delta
        </a>
        <a href="/cours/module-7-quanto-fx/options-quanto" className="text-blue-600 hover:underline text-sm">
          Options Quanto →
        </a>
      </div>

    </article>
  )
}
