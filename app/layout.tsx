"use client";

import './globals.css';
import { Inter } from 'next/font/google';
import { AuthButton } from '@/components/auth-button';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="fixed w-full bg-primary/90 backdrop-blur-sm z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <a href="/" className="text-white text-xl font-bold">GwG</a>
              </div>
              <div className="flex items-center space-x-4">
                <a href="/services" className="text-white hover:text-white/80">Services</a>
                <a href="/pricing" className="text-white hover:text-white/80">Pricing</a>
                <AuthButton />

                
              </div>
            </div>
          </div>
        </nav>
        <main className="pt-16">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}