export default function AProposPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12">

      {/* Fil d'Ariane */}
      <nav className="text-sm text-gray-500 mb-8">
        <a href="/" className="hover:text-blue-600">Accueil</a>
        <span className="mx-2">›</span>
        <span className="text-gray-700">À propos</span>
      </nav>

      {/* En-tête */}
      <h1 className="text-4xl font-bold text-gray-900 mb-2">À propos</h1>
      <p className="text-lg text-gray-500 mb-10">James du Peloux : Ingénieur Mathématiques Appliquées en Finance de marché</p>

      {/* Intro */}
      <p className="text-gray-600 leading-relaxed mb-12">
        Ce site est une base de connaissances en finance de marché, mais aussi une façon de montrer comment je raisonne sur le sujet. L&apos;objectif est de l'expliquer simplement pour me faire des fiches de révisions, mais aussi pour faire profiter ceux qui veulent apprendre en profondeur sur le domaine. 
      </p>

      {/* Travaux */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Travaux</h2>
      <div className="flex flex-col md:flex-row gap-4 mb-12">

        <div className="flex-1 bg-white border border-gray-300 rounded-xl p-6 flex flex-col">
          <span className="inline-block bg-blue-50 text-blue-700 border border-blue-100 rounded-full px-3 py-0.5 text-xs font-medium mb-3 self-start">
            Projet de fin d&apos;études · 2025
          </span>
          <p className="font-semibold text-gray-900 mb-2">Pricing des options américaines via l&apos;algorithme de Longstaff-Schwartz</p>
          <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">
            Implémentation de l&apos;algorithme LSM classique, extensions Quasi-Monte Carlo (suites de Sobol), réduction de dimension par Brownian Bridge et PCA. Comparaison avec méthodes PDE (PSOR).
          </p>
          <a
            href="/docs/rapport-pfe.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 font-medium hover:underline"
          >
            Lire le rapport →
          </a>
        </div>

        <div className="flex-1 bg-white border border-gray-300 rounded-xl p-6 flex flex-col">
          <span className="inline-block bg-blue-50 text-blue-700 border border-blue-100 rounded-full px-3 py-0.5 text-xs font-medium mb-3 self-start">
            Rapport de stage · 2025-2026
          </span>
          <p className="font-semibold text-gray-900 mb-2">Analyste Quantitatif Valorisation — Société Générale CIB</p>
          <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">
            Modélisation de la structure par terme des dividendes, analyses économétriques des DivSwaps, Calibration SABR.
          </p>
          <div>
            <a
              href="/docs/rapport-stage.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 font-medium hover:underline"
            >
              Lire le rapport →
            </a>
            
          </div>
        </div>

      </div>

      
      {/* Expérience */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Expérience</h2>

      <div className="bg-white border border-gray-300 rounded-xl p-6 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
          <div>
            <p className="font-semibold text-gray-900">Société Générale CIB — La Défense</p>
            <p className="text-blue-600 text-sm font-medium">Analyste Quantitatif Valorisation</p>
          </div>
          <p className="text-sm text-gray-500 mt-1 sm:mt-0 sm:text-right">Sep 2025 – Mar 2026</p>
        </div>
        <ul className="space-y-1.5">
          <li className="text-sm text-gray-600 flex gap-2">
            <span className="text-gray-400 mt-0.5">–</span>
            <span>Modèle de structure par terme des dividendes via Filtre de Kalman (Python)</span>
          </li>
          <li className="text-sm text-gray-600 flex gap-2">
            <span className="text-gray-400 mt-0.5">–</span>
            <span>Étude économétrique des DivSwaps, volatilité SABR, backtesting de stratégies</span>
          </li>
          <li className="text-sm text-gray-600 flex gap-2">
            <span className="text-gray-400 mt-0.5">–</span>
            <span>Automatisation des reports IPV et outils de monitoring des paramètres de marché (EQD, FIC)</span>
          </li>
        </ul>
      </div>


      
      {/* Formation */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Formation</h2>
      <div className="flex flex-col gap-4 mb-12">

        <div className="bg-white border border-gray-300 rounded-xl p-6">
          <p className="text-sm text-blue-600 font-medium uppercase tracking-wide mb-1">2026 – 2027</p>
          <p className="font-semibold text-gray-900 mb-1">Université Paris-Saclay, Évry</p>
          <p className="text-gray-600 text-sm mb-3">Master 2 Finance et Gestion des Risques</p>
          <p className="text-xs text-gray-500 leading-relaxed max-w-lg">
            Modules : Calcul stochastique, Modélisation des taux et produits structurés, Asset pricing, Méthodes numériques et machine learning en Python, Fixed Income, Économétrie financière.
          </p>
        </div>

        <div className="bg-white border border-gray-300 rounded-xl p-6">
          <p className="text-sm text-blue-600 font-medium uppercase tracking-wide mb-1">2025</p>
          <p className="font-semibold text-gray-900 mb-1">CY Tech (ex-EISTI), Cergy</p>
          <p className="text-gray-600 text-sm mb-3">Ingénieur Génie Mathématiques Appliquées, Option Modélisation Mathématiques pour la Finance</p>
          <p className="text-xs text-gray-500 leading-relaxed max-w-lg">
            Modules : Finance quantitative, Fixed Income, Instruments financiers, Pricing des dérivés, Calibration et modélisation, Processus stochastiques, Grands risques et Valeurs extrêmes.
          </p>
        </div>

        <div className="bg-white border border-gray-300 rounded-xl p-6">
          <p className="text-sm text-blue-600 font-medium uppercase tracking-wide mb-1">2024</p>
          <p className="font-semibold text-gray-900 mb-1">Brunel University London</p>
          <p className="text-gray-600 text-sm mb-3">MSc Finance — Exchange Program</p>
          <p className="text-xs text-gray-500 leading-relaxed max-w-lg">
            Modules : Interest rate theory, Time series modelling, Machine learning, Big data analysis.
          </p>
        </div>

      </div>


      {/* Contact */}
      <div className="bg-gray-50 border border-gray-300 rounded-xl p-6 mt-10">
        <p className="text-gray-700 mb-3">Me contacter pour des suggestions, question sur le contenu ou une opportunité professionnelle :</p>
        <p className="text-sm text-gray-600">
          <a href="mailto:jamesdupeloux@gmail.com" className="text-blue-600 hover:underline">
            jamesdupeloux@gmail.com
          </a>
          <span className="mx-2 text-gray-400">·</span>
          <a
            href="https://www.linkedin.com/in/james-du-peloux-433473231/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            LinkedIn
          </a>
        </p>
      </div>

    </article>
  );
}
