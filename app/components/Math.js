// Composants de rendu mathématique — utilisent KaTeX côté serveur
// InlineMath : formule dans le texte
// BlockMath  : formule centrée sur sa propre ligne

import katex from 'katex';

// Normalise children en string (gère les cas où JSX passe un tableau)
function toLatex(children) {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.join('');
  return String(children);
}

export function InlineMath({ children }) {
  const html = katex.renderToString(toLatex(children), {
    throwOnError: false,
    output: 'html',
  });
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export function BlockMath({ children }) {
  const html = katex.renderToString(toLatex(children), {
    throwOnError: false,
    output: 'html',
    displayMode: true,
  });
  return (
    <div className="my-6 overflow-x-auto" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
