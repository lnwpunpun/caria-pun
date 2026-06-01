import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SUT-CARIA — Advisory & Curriculum Platform',
  description: 'แพลตฟอร์มให้คำแนะนำการศึกษาและแสดงข้อมูลหลักสูตรของมหาวิทยาลัยเทคโนโลยีสุรนารี (SUT)',
  keywords: ['career', 'advisory', 'SUT', 'curriculum', 'digital career', 'SUT-CARIA'],
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
