// Page d'accueil — point d'entrée principal du site
// Assemble tous les composants dans l'ordre d'affichage

import Header from "./components/Header";
import Hero from "./components/Hero";
import Themes from "./components/Themes";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      {/* Barre de navigation en haut */}
      <Header />

      {/* Section d'accroche */}
      <Hero />

      {/* Grille des thématiques financières */}
      <Themes />

      {/* Pied de page avec liens */}
      <Footer />
    </>
  );
}
