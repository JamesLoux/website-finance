// Page d'accueil — Header et Footer sont gérés par le layout global
import Hero from "./components/Hero";
import Themes from "./components/Themes";

export default function Home() {
  return (
    <>
      <Hero />
      <Themes />
    </>
  );
}
