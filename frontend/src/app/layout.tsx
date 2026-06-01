import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CARIA-GAP — AI Career Gap Analysis',
  description: 'ระบบวิเคราะห์ช่องว่างสมรรถนะและจับคู่อาชีพดิจิทัลด้วย AI ต่อยอดจากงานวิจัย CARIA (Scopus 2024)',
  keywords: ['career', 'gap analysis', 'AI', 'competency', 'digital career', 'CARIA'],
};

import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { Analytics } from '@vercel/analytics/next';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className="antialiased min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}
