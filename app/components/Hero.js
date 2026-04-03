// Composant Hero : section d'accroche en haut de la page d'accueil
// C'est la première chose que voit le visiteur

import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-5xl mx-auto text-center">

        {/* Étiquette de contexte */}
        <span className="inline-block text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-1 rounded-full mb-6 tracking-wide uppercase">
          Finance de marché
        </span>

        {/* Titre principal du site */}
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight mb-6 text-center">
          Finance according to James
        </h1>

        {/* Description d'accueil */}
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Bienvenue en salle des marchés ! J&apos;ai décidé de réunir tout mon savoir sur ce sujet
          passionnant dans un seul endroit. De nombreux concepts seront expliqués avec rigueur
          et pédagogie !
        </p>

        {/* Appel à l'action — renvoie vers la page des cours */}
        <div className="mt-10">
          <Link
            href="/cours"
            className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Explorer les cours
          </Link>
        </div>

      </div>
    </section>
  );
}
