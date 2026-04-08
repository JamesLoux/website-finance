// Page /cours — Index des 8 modules de cours
// Chaque carte renvoie vers le module correspondant (pages à créer)

import Link from "next/link";

const modules = [
  {
    number: "01",
    slug: "module-1-calcul-stochastique",
    title: "Calcul stochastique",
    description:
      "Mouvement brownien, lemme d'Itô et changement de mesure de Girsanov. Les fondations mathématiques du pricing moderne.",
    sousPages: ["Mouvement brownien", "Lemme d'Itô", "Girsanov & risque-neutre"],
  },
  {
    number: "02",
    slug: "module-2-pricing",
    title: "Pricing",
    description:
      "Équation de Black-Scholes, modèles de diffusion et interprétation probabiliste de d1 et d2. Comment valoriser un dérivé de façon rigoureuse.",
    sousPages: ["Équation de Black-Scholes", "Formule de Black-Scholes", "Modèles de diffusion", "Simulation de Monte-Carlo"],
  },
  {
    number: "03",
    slug: "module-3-grecques",
    title: "The Greeks",
    description:
      "Delta, Gamma, Theta, Vega — les sensibilités d'un portefeuille d'options. Indispensables pour mesurer et gérer le risque en trading.",
    sousPages: ["L'essentiel des Greeks", "Quelques démonstrations", "Arbitrage Theta-Gamma"],
  },
  {
    number: "04",
    slug: "module-4-taux-credit",
    title: "Taux & Crédit",
    description:
      "Swaps de taux, produits de courbe et modèles de taux courts. Les instruments fondamentaux des marchés de taux.",
    sousPages: ["Swaps & flux", "Produits de courbe", "Modèles de taux"],
  },
  {
    number: "05",
    slug: "module-5-produits-equity",
    title: "Produits Equity",
    description:
      "Options vanilles, stratégies de combinaisons, exotiques et produits structurés. Les briques de base de l'equity dérivé.",
    sousPages: ["Vanilles & combinaisons", "Options exotiques", "Produits structurés"],
  },
  {
    number: "06",
    slug: "module-6-volatilite",
    title: "Volatilité",
    description:
      "Vol implicite, nappes, modèles stochastiques, variance swaps et skew. Un concept central en finance de marché, décrypté en profondeur.",
    sousPages: ["Vol implicite et nappes", "Vol stochastique", "Variance Swap & VIX", "Skew Delta"],
  },
  {
    number: "07",
    slug: "module-7-quanto-fx",
    title: "Quanto & FX",
    description:
      "Options quanto et options composites. Pricing et couverture en présence d'un risque de change.",
    sousPages: ["Options quanto", "Options composites"],
  },
  {
    number: "08",
    slug: "module-8-macro",
    title: "Macro",
    description:
      "Plomberie de la Fed, gestion des réserves et politique monétaire. Comprendre les mécanismes qui pilotent les marchés.",
    sousPages: ["Plomberie de la Fed", "Gestion des réserves", "Politique monétaire"],
  },
];

export default function CoursPage() {
  return (
    <div className="bg-gray-50 min-h-full py-16 px-6">
      <div className="max-w-5xl mx-auto">

        {/* En-tête */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Cours</h1>
          <p className="text-gray-500 max-w-2xl">
            8 modules progressifs, du calcul stochastique aux produits exotiques.
            Chaque module est décomposé en 2 à 3 sous-chapitres.
          </p>
        </div>

        {/* Grille des modules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {modules.map((module) => (
            <div
              key={module.slug}
              className="bg-white border border-gray-300 rounded-xl p-6 hover:shadow-md hover:border-blue-300 transition-all flex flex-col"
            >
              {/* Numéro + titre */}
              <div className="flex items-start gap-4 mb-3">
                <span className="text-2xl font-bold text-blue-100 leading-none select-none">
                  {module.number}
                </span>
                <h2 className="text-lg font-semibold text-gray-900">{module.title}</h2>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                {module.description}
              </p>

              {/* Sous-pages */}
              <ul className="flex flex-wrap gap-2 mt-auto">
                {module.sousPages.map((sp) => (
                  <li
                    key={sp}
                    className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                  >
                    {sp}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
