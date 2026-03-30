// Composant Header : affiché en haut de chaque page
// Contient le nom du site et la barre de navigation

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Nom du site */}
        <span className="text-xl font-bold text-blue-600 tracking-tight">
          Finance according to James
        </span>

        {/* Navigation principale */}
        <nav>
          <ul className="flex gap-6 text-sm font-medium text-gray-600">
            <li>
              <a href="#thematiques" className="hover:text-blue-600 transition-colors">
                Thématiques
              </a>
            </li>
            <li>
              <a href="#footer" className="hover:text-blue-600 transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </nav>

      </div>
    </header>
  );
}
