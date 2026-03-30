// Composant Themes : section présentant les grandes thématiques du site
// Affiche une grille de cartes, une par sujet couvert

import ThemeCard from "./ThemeCard";

// Liste des thématiques avec leur icône et description
const themes = [
  {
    icon: "📐",
    title: "Options",
    description:
      "Calls, puts, stratégies de couverture et de spéculation. Comprendre comment fonctionnent les droits d'acheter ou de vendre un actif à un prix fixé.",
  },
  {
    icon: "🔗",
    title: "Produits dérivés",
    description:
      "Futures, forwards, swaps — des instruments dont la valeur dépend d'un actif sous-jacent. Exploration des mécanismes et des usages en finance de marché.",
  },
  {
    icon: "🧮",
    title: "Greeks",
    description:
      "Delta, Gamma, Theta, Vega, Rho : les indicateurs de sensibilité des options. Indispensables pour mesurer et gérer le risque d'un portefeuille d'options.",
  },
  {
    icon: "💰",
    title: "Pricing",
    description:
      "Black-Scholes, modèles binomiaux, Monte Carlo — comment valoriser un dérivé de façon rigoureuse en tenant compte du temps, du taux et de la volatilité.",
  },
  {
    icon: "📊",
    title: "Volatilité",
    description:
      "Volatilité historique, implicite, smile et surface de vol. Un concept central en finance de marché, souvent mal compris, décrypté en détail.",
  },
];

export default function Themes() {
  return (
    <section id="thematiques" className="bg-gray-50 py-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* En-tête de la section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Thématiques</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Chaque sujet est abordé de façon progressive, du concept fondamental
            aux applications concrètes sur les marchés.
          </p>
        </div>

        {/* Grille de cartes — 1 colonne sur mobile, 2 sur tablette, 3 sur desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme) => (
            <ThemeCard
              key={theme.title}
              icon={theme.icon}
              title={theme.title}
              description={theme.description}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
