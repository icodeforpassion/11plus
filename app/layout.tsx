import './globals.css';
import { Metadata } from 'next';
import { Poppins, Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { GA } from '../components/GA';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-heading' });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });

export const metadata: Metadata = {
  title: 'ElevenSpark | Adaptive 11+ Practice for Maths & English Vocabulary',
  description:
    'ElevenSpark delivers fresh 11+ maths and English vocabulary practice every session, helping UK families build confidence with adaptive learning.',
  metadataBase: new URL('https://elevenspark.example.com'),
  openGraph: {
    title: 'ElevenSpark',
    description: 'Make 11+ learning fun, not stressful with adaptive practice and simple dashboards.',
    url: 'https://elevenspark.example.com',
    siteName: 'ElevenSpark',
    type: 'website'
  },
  alternates: {
    canonical: 'https://elevenspark.example.com'
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB" className={`${poppins.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-background text-text">
        <GA />
        {children}
      </body>
    </html>
  );
}
