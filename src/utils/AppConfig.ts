import type { LocalePrefix } from 'next-intl/routing';

const localePrefix: LocalePrefix = 'always';

export type Locale = 'en' | 'fr' | 'pol';

export const AppConfig = {
  name: 'Ascent-U',
  title: 'Ascent-U',
  description: 'Ascent-U description',
  locales: ['en', 'fr', 'pol'] as Locale[],
  defaultLocale: 'en' as const,
  localePrefix,
} as const;
