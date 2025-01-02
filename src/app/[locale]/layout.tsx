import '@/styles/global.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { Toaster } from 'react-hot-toast';

import { Providers } from '@/provider/Providers';
import { AppConfig } from '@/utils/AppConfig';

const aeonik = localFont({
  src: '../../../public/fonts/Aeonik/Aeonik-Regular.otf',
});

export const metadata: Metadata = {
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

type RootLayoutProps = {
  children: React.ReactNode;
  params: { locale: 'en' | 'fr' | 'pol' };
};

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = params;

  if (!AppConfig.locales.includes(locale)) {
    notFound();
  }

  // Dynamically import translations based on the locale
  const messages = (await import(`../../locales/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <body className={aeonik.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            {children}
            <Toaster position="top-right" />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
