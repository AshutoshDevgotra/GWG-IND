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
        <head><meta name="facebook-domain-verification" content="jvmxewrxcmz4z577s2uv19cwdm31zl" /></head>
        <nav className="fixed w-full bg-primary/90 backdrop-blur-sm z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <a href="/" className="text-black text-xl font-bold">GwG</a>
              </div>
              <div className="flex items-center space-x-4">
                <a href="/services" className="text-black hover:text-black/80">Services</a>
                <a href="/pricing" className="text-black hover:text-black/80">Pricing</a>
                <a href="/careers" className="text-black hover:text-black/80">Careers</a>
                <a href="/interns" className="text-black hover:text-black/80">Interns</a>
                <a href="/broucher" className="text-black hover:text-black/80">Broucher</a>
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