// Layout partagé pour toutes les pages /cours/**
// Ajoute la sidebar de navigation à gauche du contenu
// KaTeX CSS importé ici une seule fois pour toutes les pages de cours

import 'katex/dist/katex.min.css';
import CoursClientLayout from './components/CoursClientLayout';

export default function CoursLayout({ children }) {
  return <CoursClientLayout>{children}</CoursClientLayout>;
}
