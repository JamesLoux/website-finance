// Composant Header : barre de navigation principale, affichée sur toutes les pages
// Le lien actif est mis en bleu automatiquement selon la page courante

'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Cours", href: "/cours" },
  { label: "Simulateur", href: "/simulateur" },
  { label: "Quiz", href: "/quiz" },
  { label: "À propos", href: "/a-propos" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-gray-300 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Nom du site — cliquable, renvoie à l'accueil */}
        <Link href="/" className="text-xl font-bold text-blue-600 tracking-tight hover:opacity-80 transition-opacity">
          Finance according to James
        </Link>

        {/* Navigation principale */}
        <nav>
          <ul className="flex gap-6 text-sm font-medium">
            {navLinks.map(({ label, href }) => {
              // Lien actif : exact pour l'accueil, préfixe pour les autres pages
              const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={
                      isActive
                        ? "text-blue-600 font-semibold"
                        : "text-gray-600 hover:text-blue-600 transition-colors"
                    }
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

      </div>
    </header>
  );
}
