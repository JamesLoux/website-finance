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
    questions: 8,
  },
  {
    number: "05",
    title: "Fixed Income II",
    pages: "Cap & Floor · Swaptions · CMS · Convertible · Range Accrual · Modèles de taux",
    questions: 12,
  },
  {
    number: "06",
    title: "Fixed Income III",
    pages: "FX Swap · CDS · Inflation Swap · TRS",
    questions: 12,
    quizEndpoint: "/quiz/module-6-fixed-income-3",
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
    <>
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: -1,
      backgroundColor: '#ffffff',
      backgroundImage: [
        'linear-gradient(rgba(37,99,235,0.10) 1px, transparent 1px)',
        'linear-gradient(90deg, rgba(37,99,235,0.10) 1px, transparent 1px)',
        'linear-gradient(rgba(37,99,235,0.045) 1px, transparent 1px)',
        'linear-gradient(90deg, rgba(37,99,235,0.045) 1px, transparent 1px)',
      ].join(', '),
      backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
      pointerEvents: 'none',
    }} />
    <div className="min-h-full py-12 px-6">
      <div className="max-w-3xl mx-auto">

        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz</h1>
          <p className="text-sm text-gray-500">
            Un quiz par module pour tester et consolider ses connaissances.
          </p>
        </div>

        {/* Liste des quiz — 1 par ligne, format compact */}
        <div className="flex flex-col gap-2">
          {quizModules.map((module) => {
            const isAvailable = ["01", "02", "03", "04", "05", "06", "08", "09", "10"].includes(module.number);
            const card = (
              <div className={`bg-white border rounded-lg px-5 h-[52px] flex items-center gap-4 transition-all overflow-hidden ${
                isAvailable
                  ? 'border-gray-300 hover:border-blue-300 hover:shadow-sm cursor-pointer'
                  : 'border-gray-200'
              }`}>
                {/* Numéro */}
                <span className="text-sm font-bold text-blue-200 w-7 flex-shrink-0 select-none">
                  {module.number}
                </span>

                {/* Titre */}
                <span className={`text-sm font-semibold flex-shrink-0 w-40 ${isAvailable ? 'text-gray-900' : 'text-gray-400'}`}>
                  {module.title}
                </span>

                {/* Sous-pages */}
                <span className="text-xs text-gray-400 flex-1 hidden sm:block line-clamp-2">
                  {module.pages}
                </span>

                {/* Nombre de questions */}
                <span className="text-xs text-gray-400 flex-shrink-0 w-24 text-right hidden sm:block">
                  {module.questions} questions
                </span>

                {/* Badge */}
                {isAvailable ? (
                  <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full font-medium flex-shrink-0">
                    Commencer →
                  </span>
                ) : (
                  <span className="text-xs bg-amber-50 text-amber-600 border border-amber-200 px-3 py-1 rounded-full font-medium flex-shrink-0">
                    Bientôt
                  </span>
                )}
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
    </>
  );
}
