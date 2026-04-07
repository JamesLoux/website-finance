'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function TableOfContents() {
  const pathname = usePathname();
  const [toc, setToc] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const headings = document.querySelectorAll('h2[id]');
      setToc(Array.from(headings).map((h) => ({
        id: h.id,
        text: h.textContent.replace(/^\d+\.\s*/, ''),
      })));
    }, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (toc.length === 0) return null;

  return (
    <aside className="hidden xl:block w-64 shrink-0 sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto py-8 pl-6 pr-2 border-l border-gray-300">
      <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-3 px-2">
        Sur cette page
      </p>
      <div className="border-t border-gray-300 mb-3" />
      <ul className="space-y-0.5">
        {toc.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="block px-2 py-1 text-sm text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-md transition-colors"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
