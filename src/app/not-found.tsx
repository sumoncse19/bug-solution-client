'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const translations = {
  en: {
    title: '404',
    heading: 'Page Not Found',
    description: "Sorry, we couldn't find the page you're looking for.",
    button: 'Return Home',
  },
  fr: {
    title: '404',
    heading: 'Page Non Trouvée',
    description: "Désolé, nous n'avons pas trouvé la page que vous cherchez.",
    button: "Retour à l'Accueil",
  },
  // Add more languages as needed
};

export default function RootNotFound() {
  const pathname = usePathname();
  const lang = pathname?.split('/')[1] || 'en';
  const t = translations[lang as keyof typeof translations] || translations.en;

  useEffect(() => {
    // Push the language-specific not-found path to browser history
    const notFoundPath = lang === 'en' ? '/not-found' : `/${lang}/not-found`;
    window.history.pushState(null, '', notFoundPath);
  }, [pathname, lang]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
        padding: '0 1rem',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '300px',
          height: '300px',
          marginBottom: '2rem',
        }}
      >
        <Image
          src="/assets/images/not-found.jpg"
          alt="404 Not Found"
          width={300}
          height={300}
        />
      </div>
      <h2
        style={{
          fontSize: '2rem',
          fontWeight: 'semibold',
          marginBottom: '1rem',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {t.heading}
      </h2>
      <p
        style={{
          fontSize: '1.5rem',
          marginBottom: '2rem',
          textAlign: 'center',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {t.description}
      </p>
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          fontWeight: 'semibold',
          backgroundColor: '#000091',
          color: 'white',
          borderRadius: '0.375rem',
          textDecoration: 'none',
          transition: 'background-color 0.2s',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        Go back home
      </Link>
    </div>
  );
}
