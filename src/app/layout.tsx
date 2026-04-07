import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Meal Explorer — Discover Recipes by Ingredient',
    template: '%s | Meal Explorer',
  },
  description:
    'Browse thousands of recipes organised by ingredient. Powered by TheMealDB.',
  keywords: ['recipes', 'meal', 'ingredient', 'food', 'cooking'],
  openGraph: {
    type: 'website',
    title: 'Meal Explorer',
    description: 'Discover recipes by ingredient.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased flex flex-col">
        {/* Global nav */}
        <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-3">
            <a href="/" className="flex items-center gap-2 font-semibold text-zinc-100 hover:text-amber-400 transition-colors">
              <span className="text-xl">🍽️</span>
              <span className="text-sm tracking-tight">Meal Explorer</span>
            </a>
          </div>
        </header>

        <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          {children}
        </main>

        <footer className="border-t border-zinc-800/60 py-6 text-center text-xs text-zinc-600">
          Data from{' '}
          <a
            href="https://www.themealdb.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-amber-400 transition-colors"
          >
            TheMealDB
          </a>
        </footer>
      </body>
    </html>
  );
}
