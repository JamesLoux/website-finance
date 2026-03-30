// Composant Footer : pied de page avec liens de contact et de profil
// Les URLs sont des placeholders à remplacer par les vraies adresses

export default function Footer() {
  return (
    <footer id="footer" className="bg-white border-t border-gray-200 py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Nom du site dans le footer */}
        <span className="text-sm font-semibold text-gray-700">
          Finance according to James
        </span>

        {/* Liens vers profil LinkedIn et CV */}
        <div className="flex gap-6 text-sm font-medium">

          {/* Lien LinkedIn — remplacer "#" par l'URL du profil */}
          <a
            href="#"
            className="text-blue-600 hover:underline flex items-center gap-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Icône LinkedIn (SVG inline, pas de dépendance externe) */}
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM7.12 20.45H4.02V9h3.1v11.45zM5.57 7.72a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6zM20.45 20.45h-3.1v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67h-3.1V9h2.97v1.56h.04c.41-.78 1.42-1.6 2.92-1.6 3.12 0 3.7 2.06 3.7 4.73v6.76z" />
            </svg>
            LinkedIn
          </a>

          {/* Lien CV — remplacer "#" par le lien vers le PDF du CV */}
          <a
            href="#"
            className="text-blue-600 hover:underline flex items-center gap-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Icône document */}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h5l5 5v11a2 2 0 01-2 2z"
              />
            </svg>
            CV
          </a>

        </div>

        {/* Mention légale */}
        <span className="text-xs text-gray-400">© {new Date().getFullYear()} James</span>

      </div>
    </footer>
  );
}
