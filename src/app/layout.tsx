import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeSync from "@/components/layout/ThemeSync";

const inter = Inter({ subsets: ["latin"] });

// Referans Tagline: Türkiye'nin Yeni Nesil Akademik Öğrenme Platformu • MEB 2026-2027
export const metadata: Metadata = {
  title: "Cognito - Türkiye'nin Yeni Nesil Akademik Öğrenme Platformu • Lise Akademik Programı",
  description: "Güncel lise akademik standartlarına tam uyumlu, akıllı eksik teşhis motoru ve kazanım takip sistemi ile yeni nesil akademik eğitim platformu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var s = localStorage.getItem('cognito-storage');
                var t = 'dark';
                if (s) {
                  var p = JSON.parse(s);
                  if (p && p.state && p.state.user && p.state.user.settings && p.state.user.settings.theme) {
                    t = p.state.user.settings.theme;
                  }
                }
                if (t === 'light') {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                  document.documentElement.setAttribute('data-theme', 'light');
                } else {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              } catch (e) {
                document.documentElement.classList.add('dark');
              }
            `,
          }}
        />
      </head>
      <body
        className={`${inter.className} min-h-screen bg-[#0f172a] text-[#f8fafc] antialiased selection:bg-[#1cb0f6]/30 selection:text-[#1cb0f6] transition-colors duration-200`}
      >
        <ThemeSync />
        {children}
      </body>
    </html>
  );
}
