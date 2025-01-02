import { Providers } from '@/provider/ThemeProvider';
import { AppConfig } from '@/utils/AppConfig';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={AppConfig.defaultLocale} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
