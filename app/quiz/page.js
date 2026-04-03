// Page /quiz — Index des quiz par module
// Même structure visuelle que /cours

import Link from 'next/link';

const quizModules = [
  {
    number: "01",
    title: "Calcul stochastique",
    description: "Teste ta compréhension du mouvement brownien, du lemme d'Itô et du changement de mesure.",
    questions: 12,
  },
  {
    number: "02",
    title: "Pricing",
    description: "Black-Scholes, modèles de diffusion, interprétation de d1 et d2 : es-tu capable de pricer une option ?",
    questions: 15,
  },
  {
    number: "03",
    title: "The Greeks",
    description: "Delta hedging, Gamma scalping, arbitrage Theta-Gamma — maîtrises-tu les sensibilités ?",
    questions: 14,
  },
  {
    number: "04",
    title: "Taux & Crédit",
    description: "Swaps de taux, courbe des taux, modèles de taux courts. Quiz orienté produits de taux.",
    questions: 10,
  },
  {
    number: "05",
    title: "Produits Equity",
    description: "Options vanilles, exotiques, produits structurés — connais-tu les briques de l'equity dérivé ?",
    questions: 13,
  },
  {
    number: "06",
    title: "Volatilité",
    description: "Variance swap, vol locale vs stochastique, smile de volatilité. Un sujet redoutable.",
    questions: 10,
  },
  {
    number: "07",
    title: "Quanto & FX",
    description: "Options quanto, options composites et gestion du risque de change.",
    questions: 8,
  },
  {
    number: "08",
    title: "Macro",
    description: "Fed, réserves, politique monétaire — comprends-tu les forces qui meuvent les marchés ?",
    questions: 10,
  },
];

export default function QuizPage() {
  return (
    <div className="bg-gray-50 min-h-full py-16 px-6">
      <div className="max-w-5xl mx-auto">

        {/* En-tête */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Quiz</h1>
          <p className="text-gray-500 max-w-2xl">
            Un quiz par module pour tester et consolider tes connaissances.
            Les questions sont progressives, du fondamental au technique.
          </p>
        </div>

        {/* Grille des quiz */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {quizModules.map((module) => {
            const isAvailable = module.number === "01";
            const card = (
              <div className={`bg-white border rounded-xl p-6 transition-all flex flex-col h-full ${
                isAvailable
                  ? 'border-gray-300 hover:shadow-md hover:border-blue-300 cursor-pointer'
                  : 'border-gray-300'
              }`}>
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

                {/* Nombre de questions + badge */}
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xs text-gray-400">{module.questions} questions</span>
                  {isAvailable ? (
                    <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full font-medium">
                      Commencer →
                    </span>
                  ) : (
                    <span className="text-xs bg-amber-50 text-amber-600 border border-amber-200 px-3 py-1 rounded-full font-medium">
                      Bientôt disponible
                    </span>
                  )}
                </div>
              </div>
            );

            return isAvailable ? (
              <Link key={module.number} href="/quiz/module-1" className="block">
                {card}
              </Link>
            ) : (
              <div key={module.number}>{card}</div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
