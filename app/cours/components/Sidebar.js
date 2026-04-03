// Sidebar de navigation des cours
// Deux sections : navigation globale (8 modules) + table des matières de la page en cours
// La TOC est générée automatiquement depuis les balises h2[id] de la page

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

// Navigation complète des cours — à mettre à jour si les slugs changent
const modules = [
  {
    number: '01',
    title: 'Calcul stochastique',
    slug: 'module-1-calcul-stochastique',
    sousPages: [
      { title: 'Mouvement brownien', slug: 'mouvement-brownien' },
      { title: "Lemme d'Itô", slug: 'lemme-ito' },
      { title: 'Girsanov & risque-neutre', slug: 'girsanov-risque-neutre' },
    ],
  },
  {
    number: '02',
    title: 'Pricing',
    slug: 'module-2-pricing',
    sousPages: [
      { title: 'Équation de Black-Scholes', slug: 'equation-black-scholes' },
      { title: 'Formule de Black-Scholes', slug: 'probabilites-d1-d2' },
      { title: 'Modèles de diffusion', slug: 'modeles-diffusion' },
    ],
  },
  {
    number: '03',
    title: 'The Greeks',
    slug: 'module-3-grecques',
    sousPages: [
      { title: "L'essentiel des Greeks", slug: 'grecques-premier-ordre' },
      { title: 'Quelques démonstrations', slug: 'grecques-second-ordre' },
      { title: 'Arbitrage Theta-Gamma', slug: 'arbitrage-theta-gamma' },
    ],
  },
  {
    number: '04',
    title: 'Taux & Crédit',
    slug: 'module-4-taux-credit',
    sousPages: [
      { title: 'Swaps & flux', slug: 'swaps-flux' },
      { title: 'Produits de courbe', slug: 'produits-courbe' },
      { title: 'Modèles de taux', slug: 'modeles-taux' },
    ],
  },
  {
    number: '05',
    title: 'Produits Equity',
    slug: 'module-5-produits-equity',
    sousPages: [
      { title: 'Vanilles & combinaisons', slug: 'vanilles-combinaisons' },
      { title: 'Options exotiques', slug: 'options-exotiques' },
      { title: 'Produits structurés', slug: 'produits-structures' },
    ],
  },
  {
    number: '06',
    title: 'Volatilité',
    slug: 'module-6-volatilite',
    sousPages: [
      { title: 'Variance swap', slug: 'variance-swap' },
      { title: 'Vol locale & stochastique', slug: 'vol-locale-stochastique' },
    ],
  },
  {
    number: '07',
    title: 'Quanto & FX',
    slug: 'module-7-quanto-fx',
    sousPages: [
      { title: 'Options quanto', slug: 'options-quanto' },
      { title: 'Options composites', slug: 'options-composites' },
    ],
  },
  {
    number: '08',
    title: 'Macro',
    slug: 'module-8-macro',
    sousPages: [
      { title: 'Plomberie de la Fed', slug: 'plomberie-fed' },
      { title: 'Gestion des réserves', slug: 'gestion-reserves' },
      { title: 'Politique monétaire', slug: 'politique-monetaire' },
    ],
  },
];

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  // Set des slugs ouverts — plusieurs modules peuvent être ouverts simultanément
  const [openSlugs, setOpenSlugs] = useState(() => {
    const active = modules.find((m) => pathname.startsWith(`/cours/${m.slug}`));
    return new Set(active ? [active.slug] : []);
  });

  const toggle = (slug) =>
    setOpenSlugs((prev) => {
      const next = new Set(prev);
      next.has(slug) ? next.delete(slug) : next.add(slug);
      return next;
    });

  return (
    <aside
      className={[
        // Base : panneau blanc avec scroll
        'w-72 shrink-0 bg-white border-r border-gray-300 overflow-y-auto',
        // Desktop : sticky sous le header, hauteur calculée
        'lg:sticky lg:top-[57px] lg:h-[calc(100vh-57px)] lg:translate-x-0 lg:z-auto',
        // Mobile : panneau fixe qui glisse depuis la gauche
        'fixed top-0 bottom-0 left-0 z-30 transition-transform duration-200',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      ].join(' ')}
    >
      {/* Bouton fermer — mobile uniquement */}
      <div className="lg:hidden flex justify-end p-3 border-b border-gray-100">
        <button
          onClick={onClose}
          className="p-2 rounded-md hover:bg-gray-100"
          aria-label="Fermer la navigation"
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="px-3 py-5">

        {/* ── Navigation des modules ── */}
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3 px-2">
          Cours
        </p>

        <nav>
          {modules.map((module) => {
            const moduleBase = `/cours/${module.slug}`;
            const isActiveModule = pathname.startsWith(moduleBase);
            const isOpen = openSlugs.has(module.slug);

            return (
              <div key={module.slug} className="mb-1">
                {/* Titre du module — bouton accordéon */}
                <button
                  onClick={() => toggle(module.slug)}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm font-medium text-left transition-colors duration-150 hover:bg-blue-50 ${
                    isActiveModule ? 'text-blue-700' : 'text-gray-700'
                  }`}
                >
                  <span
                    className={`text-xs font-bold w-5 shrink-0 ${
                      isActiveModule ? 'text-blue-400' : 'text-gray-300'
                    }`}
                  >
                    {module.number}
                  </span>
                  <span className="flex-1">{module.title}</span>
                  {/* Chevron */}
                  <svg
                    className={`w-3.5 h-3.5 shrink-0 text-gray-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-90' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Sous-pages — animation fondu + glissement */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <ul className="ml-7 mt-0.5 space-y-0.5">
                    {module.sousPages.map((sp) => {
                      const href = `${moduleBase}/${sp.slug}`;
                      const isActive = pathname === href;
                      return (
                        <li key={sp.slug}>
                          <Link
                            href={href}
                            onClick={onClose}
                            className={`block px-2 py-1 text-sm rounded-md transition-colors ${
                              isActive
                                ? 'text-blue-600 bg-blue-50 font-medium'
                                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                            }`}
                          >
                            {sp.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </nav>


      </div>
    </aside>
  );
}
