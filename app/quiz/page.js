// Page /quiz — Index des quiz par module
// Même structure visuelle que /cours

import Link from 'next/link';

// quizEndpoint : endpoint réel du quiz quand il diffère du numéro affiché
// (les slugs /quiz/module-X ne changent pas malgré le renumérotage des modules)
const quizModules = [
  {
    number: "01",
    title: "Calcul stochastique",
    pages: "Mouvement Brownien · Lemme d'Itô · Girsanov & Risque-Neutre",
    questions: 8,
  },
  {
    number: "02",
    title: "Pricing",
    pages: "Équation de Black-Scholes · Formule de Black-Scholes · Modèles de diffusion · Monte-Carlo",
    questions: 12,
  },
  {
    number: "03",
    title: "The Greeks",
    pages: "L'essentiel des Greeks · Quelques démonstrations · Arbitrage Theta-Gamma",
    questions: 10,
  },
  {
    number: "04",
    title: "Fixed Income I",
    pages: "Obligations & Bases · Duration & Convexité · Fwd Rate Agreement · Interest Rate Swap",
    questions: 10,
  },
  {
    number: "05",
    title: "Fixed Income II",
    pages: "Cap & Floor · Bond Options & Swaptions · CMS · Convertible Bond · Range Accrual · Modèle de taux",
    questions: 10,
  },
  {
    number: "06",
    title: "Fixed Income III",
    pages: "FX Swap · CDS · Inflation Swap · TRS",
    questions: 10,
  },
  {
    number: "07",
    title: "Produits Equity",
    pages: "Vanilles & Combinaisons · Options exotiques · Produits structurés",
    questions: 10,
  },
  {
    number: "08",
    title: "Volatilité",
    pages: "Vol implicite & Nappes · Vol stochastique · Variance Swap & VIX · Skew Delta",
    questions: 12,
    quizEndpoint: "/quiz/module-6",
  },
  {
    number: "09",
    title: "Quanto & FX",
    pages: "Corrélation Indice & FX · Options Quanto & Composite",
    questions: 10,
    quizEndpoint: "/quiz/module-7",
  },
  {
    number: "10",
    title: "Macro",
    pages: "Fonctionnement de la Fed · Politique monétaire",
    questions: 10,
    quizEndpoint: "/quiz/module-8",
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
            
          </p>
        </div>

        {/* Grille des quiz */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {quizModules.map((module) => {
            const isAvailable = ["01", "02", "03", "08", "09", "10"].includes(module.number);
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

                {/* Sous-pages */}
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {module.pages}
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

            const href = module.quizEndpoint || (module.number === "01" ? "/quiz/module-1" : `/quiz/module-${parseInt(module.number)}`);

            return isAvailable ? (
              <Link key={module.number} href={href} className="block">
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
