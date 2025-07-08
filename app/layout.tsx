import './globals.css';
import { Inter } from 'next/font/google';
import { AuthButton } from '@/components/auth-button';
import { Toaster } from 'sonner';
import Image from 'next/image';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="facebook-domain-verification" content="jvmxewrxcmz4z577s2uv19cwdm31zl" />
        <link rel="icon" href="/favicon.ico" />
        <title>Grow With Garry</title>
      </head>

      <body className={inter.className}>
        <nav className="fixed w-full bg-black backdrop-blur-md shadow-lg z-50 border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              
              {/* Logo with link to homepage */}
              <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.png" alt="GwG Logo" width={40} height={40} className='rounded-full' />
              </Link>

              {/* Navbar Links */}
              <div className="flex items-center space-x-4 bg text-white">
                <a href="/services" className="text-white">Services</a>
                <a href="/pricing" className="text-white">Pricing</a>
                <a href="/careers" className="text-white">Careers</a>
                <a href="/interns" className="text-white">Interns</a>
                <a href="/broucher" className="text-white">Broucher</a>
                
                <AuthButton/>              
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
