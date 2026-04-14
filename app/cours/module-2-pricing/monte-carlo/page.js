import { InlineMath, BlockMath } from '@/app/components/Math'
import MonteCarloChart from '@/app/cours/components/MonteCarloChart'

export const metadata = {
  title: 'Simulation de Monte-Carlo | Module 2 — Pricing',
}

export default function MonteCarlo() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">

      {/* Fil d'Ariane */}
      <nav className="text-sm text-gray-500 mb-6">
        <span>Cours</span>
        <span className="mx-2">›</span>
        <span>Module 2 — Pricing</span>
        <span className="mx-2">›</span>
        <span className="text-gray-900">Simulation de Monte-Carlo</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Simulation de Monte-Carlo
      </h1>
      <p className="text-gray-600 mb-10">
        La méthode de Monte-Carlo est une technique numérique qui utilise
        l'échantillonnage aléatoire pour obtenir des résultats déterministes.
        En finance, elle est l'outil de référence pour pricer des produits
        trop complexes pour utiliser une formule fermée comme celle de Black-Scholes.
      </p>

      {/* Section 1 */}
      <h2 id="intuition" className="text-2xl font-semibold text-gray-900 mt-10 mb-4">
        L'intuition : approximer π par le hasard
      </h2>
      <p className="text-gray-600 mb-4">
        Pour comprendre Monte-Carlo, on utilise classiquement l'expérience
        du jet de fléchettes. Imaginons un quart de cercle de rayon{' '}
        <InlineMath>{'R = 1'}</InlineMath> inscrit dans un carré de côté{' '}
        <InlineMath>{'L = 1'}</InlineMath>.
      </p>
      <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
        <li>Aire du carré : <InlineMath>{'A_{\\text{carré}} = 1'}</InlineMath></li>
        <li>Aire du quart de cercle : <InlineMath>{'A_{\\text{cercle}} = \\dfrac{\\pi}{4}'}</InlineMath></li>
      </ul>
      <p className="text-gray-600 mb-4">
        Si l'on tire uniformément <InlineMath>{'M'}</InlineMath> points{' '}
        <InlineMath>{'(x, y)'}</InlineMath> dans le carré, la proportion
        de points vérifiant <InlineMath>{'x^2 + y^2 \\leq 1'}</InlineMath>{' '}
        tend vers le ratio des aires :
      </p>
      <BlockMath>{'\\frac{M_{\\text{dedans}}}{M_{\\text{total}}} \\approx \\frac{\\pi}{4} \\implies \\pi \\approx 4 \\times \\frac{M_{\\text{dedans}}}{M_{\\text{total}}}'}</BlockMath>
      <p className="text-gray-600 mt-4">
        Le hasard, répété à grande échelle, permet de calculer une intégrale
        complexe. C'est exactement ce principe que l'on applique au pricing.
      </p>

      {/* Section 2 */}
      <h2 id="pricing" className="text-2xl font-semibold text-gray-900 mt-10 mb-4">
        Application au pricing
      </h2>
      <p className="text-gray-600 mb-4">
        Le prix d'un dérivé est l'espérance actualisée de son payoff sous
        la mesure risque-neutre <InlineMath>{'\\mathbb{Q}'}</InlineMath>,
        vue dans le chapitre Girsanov :
      </p>
      <BlockMath>{'V_0 = e^{-rT} \\, \\mathbb{E}^{\\mathbb{Q}}[\\Phi(S_T)]'}</BlockMath>
      <p className="text-gray-600 mt-4 mb-4">
        Puisque l'on connaît la solution exacte de l'EDS du GBM, on simule
        directement la valeur finale <InlineMath>{'S_T'}</InlineMath> pour
        chaque scénario <InlineMath>{'i'}</InlineMath>, sans avoir besoin
        d'un schéma d'approximation.
      </p>

      {/* Encadré schéma exact */}
      <div className="bg-gray-50 border border-gray-300 rounded-xl p-6 mb-6">
        <p className="text-sm font-semibold text-gray-700 mb-3">
          Schéma exact (GBM sous <InlineMath>{'\\mathbb{Q}'}</InlineMath>)
        </p>
        <BlockMath>{'S_T^{(i)} = S_0 \\exp\\!\\left( \\left( r - \\tfrac{1}{2}\\sigma^2 \\right) T + \\sigma \\sqrt{T} \\, Z^{(i)} \\right)'}</BlockMath>
        <p className="text-gray-600 text-sm mt-3">
          où <InlineMath>{'Z^{(i)} \\sim \\mathcal{N}(0,1)'}</InlineMath> est
          un tirage indépendant à chaque scénario.
        </p>
      </div>
      <p className="text-gray-600">
        Les trois termes de l'exposant jouent chacun un rôle précis : le
        drift <InlineMath>{'rT'}</InlineMath> reflète la croissance
        risque-neutre, l'ajustement <InlineMath>{'-\\tfrac{1}{2}\\sigma^2 T'}</InlineMath>{' '}
        corrige la convexité de l'exponentielle (héritage du lemme d'Itô),
        et le choc <InlineMath>{'\\sigma\\sqrt{T}\\,Z'}</InlineMath> introduit
        l'aléa.
      </p>

      {/* Section 3 */}
      <h2 id="algorithme" className="text-2xl font-semibold text-gray-900 mt-10 mb-4">
        Algorithme et code
      </h2>
      <p className="text-gray-600 mb-4">
        La procédure suit trois étapes systématiques, quelle que soit
        la complexité du produit :
      </p>
      <ol className="list-decimal list-inside text-gray-600 mb-6 space-y-2">
        <li><span className="font-medium text-gray-900">Génération</span> — tirer <InlineMath>{'M'}</InlineMath> variables normales <InlineMath>{'Z^{(i)}'}</InlineMath></li>
        <li><span className="font-medium text-gray-900">Payoff</span> — calculer <InlineMath>{'S_T^{(i)}'}</InlineMath> puis <InlineMath>{'\\Phi(S_T^{(i)})'}</InlineMath> pour chaque scénario</li>
        <li><span className="font-medium text-gray-900">Moyenne actualisée</span> — <InlineMath>{'\\hat{V}_0 = e^{-rT} \\cdot \\frac{1}{M} \\sum_{i=1}^{M} \\Phi(S_T^{(i)})'}</InlineMath></li>
      </ol>

      <p className="text-gray-600 mb-3">
        En Python, cela tient en quelques lignes :
      </p>
      <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 mb-2 overflow-x-auto">
        <pre className="text-sm text-gray-800 font-mono leading-relaxed">{`import numpy as np

def monte_carlo_call(S0, K, T, r, sigma, M):
    # 1. Tirage des variables normales
    Z = np.random.standard_normal(M)

    # 2. Simulation exacte de ST (schéma GBM)
    ST = S0 * np.exp((r - 0.5 * sigma**2) * T + sigma * np.sqrt(T) * Z)

    # 3. Payoff du Call européen
    payoffs = np.maximum(ST - K, 0)

    # 4. Moyenne actualisée
    return np.exp(-r * T) * np.mean(payoffs)

# 1 million de simulations
print(monte_carlo_call(S0=100, K=100, T=1, r=0.05, sigma=0.2, M=1_000_000))`}
        </pre>
      </div>
      <p className="text-gray-500 text-sm mb-4">
        Avec <InlineMath>{'M = 10^6'}</InlineMath> simulations, le résultat
        converge vers le prix Black-Scholes à moins de 0,05 € près.
      </p>

      {/* Section 4 */}
      <h2 id="convergence" className="text-2xl font-semibold text-gray-900 mt-10 mb-4">
        Convergence et intervalle de confiance
      </h2>
      <p className="text-gray-600 mb-4">
        Pour un professionnel, un prix Monte-Carlo doit s'accompagner d'un intervalle de
        confiance. D'après le théorème central limite,
        l'erreur d'estimation suit une loi normale d'écart-type :
      </p>
      <BlockMath>{'\\epsilon = \\frac{\\sigma_{\\text{payoff}}}{\\sqrt{M}}'}</BlockMath>
      <p className="text-gray-600 mt-4 mb-4">
        La convergence est en <InlineMath>{'1/\\sqrt{M}'}</InlineMath>,
        donc pour gagner une décimale de précision il faut multiplier le
        nombre de simulations par 100. L'intervalle de confiance à 95 % s'écrit :
      </p>
      <BlockMath>{'\\hat{V}_0 \\pm 1{,}96 \\cdot \\epsilon'}</BlockMath>
      <p className="text-gray-600 mt-4">
        Le prix réel se trouve dans cet intervalle avec 95 % de certitude.
        C'est ce que le simulateur ci-dessous rend visible : en augmentant{' '}
        <InlineMath>{'M'}</InlineMath>, l'estimation MC se rapproche
        progressivement du prix Black-Scholes exact.
      </p>

      {/* Section 5 — Simulateur */}
      <h2 id="simulateur" className="text-2xl font-semibold text-gray-900 mt-10 mb-4">
        Simulateur
      </h2>
      <p className="text-gray-600 mb-6">
        Les trajectoires simulées de <InlineMath>{'S_t'}</InlineMath> sont
        affichées. Juste en dessous, le prix Monte-Carlo estimé est comparé
        au prix Black-Scholes exact : la convergence devient visible en
        augmentant le nombre de chemins.
      </p>
      <MonteCarloChart />

      {/* Section 6 */}
      <h2 id="quand-utiliser" className="text-2xl font-semibold text-gray-900 mt-10 mb-4">
        Quand utiliser Monte-Carlo ?
      </h2>
      <p className="text-gray-600 mb-6">
        Monte-Carlo est plus lent que Black-Scholes pour un Call européen
        standard, mais il devient indispensable dès que la formule fermée
        n'existe plus sur les produits complexes.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="font-semibold text-gray-900 mb-2">Quand Monte-Carlo s'impose</p>
          <ul className="text-gray-600 text-sm space-y-1 list-disc list-inside">
            <li>Options path-dependent (asiatiques, barrières)</li>
            <li>Modèles à plusieurs facteurs de risque corrélés</li>
            <li>Produits structurés à payoff complexe</li>
            <li>Modèles de volatilité stochastique (Heston)</li>
          </ul>
        </div>
        <div className="bg-gray-50 border border-gray-300 rounded-xl p-5">
          <p className="font-semibold text-gray-900 mb-2">Limites</p>
          <ul className="text-gray-600 text-sm space-y-1 list-disc list-inside">
            <li>Lent pour les produits simples</li>
            <li>Convergence lente : erreur en <InlineMath>{'1/\\sqrt{M}'}</InlineMath></li>
          </ul>
        </div>
      </div>
      <p className="text-gray-600">
        Pour les options path-dependent, le schéma change : on ne simule
        plus seulement <InlineMath>{'S_T'}</InlineMath> mais toute la
        trajectoire <InlineMath>{'(S_{t_1}, S_{t_2}, \\ldots, S_T)'}</InlineMath>{' '}
        en plusieurs pas de temps. C'est ce qui sera abordé dans le
        Module 5 sur les produits exotiques.
      </p>

      {/* Lien quiz */}
      <div className="mt-10 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-gray-700">
        Le quiz du Module 2 est disponible — <a href="/quiz/module-2" className="text-blue-600 hover:underline font-medium">S&apos;entraîner →</a>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-12 pt-6 border-t border-gray-300">
        <a href="/cours/module-2-pricing/modeles-diffusion"
           className="text-blue-600 hover:underline text-sm">
          ← Modèles de diffusion
        </a>
        <a href="/cours/module-3-grecques/grecques-premier-ordre"
           className="text-blue-600 hover:underline text-sm">
          L'essentiel des Greeks →
        </a>
      </div>

    </div>
  )
}
