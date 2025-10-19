import { ReactNode } from 'react';
import { Navigation } from '../../../components/Navigation';
import { Footer } from '../../../components/Footer';

export default function ElevenPlusLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="mx-auto max-w-5xl px-4 py-16 space-y-8">{children}</main>
      <Footer />
    </div>
  );
}
