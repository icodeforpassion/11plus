import { Metadata } from 'next';
import { Navigation } from '../../components/Navigation';
import { Footer } from '../../components/Footer';

export const metadata: Metadata = {
  title: 'Accessibility Statement | ElevenSpark',
  description: 'ElevenSpark accessibility commitments for WCAG 2.2 AA.'
};

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="mx-auto max-w-3xl space-y-6 px-4 py-16 text-sm text-slate-600">
        <h1 className="text-3xl font-heading font-semibold text-text">Accessibility statement</h1>
        <p>
          ElevenSpark aims to meet WCAG 2.2 AA. We provide keyboard-friendly navigation, visible focus states, high contrast
          colours, and respect for reduced motion preferences. Our content is written in clear English with en-GB spelling.
        </p>
        <p>
          If you encounter any barriers, please contact accessibility@elevenspark.com. We respond within five working days and
          log all accessibility requests in our audit trail.
        </p>
      </main>
      <Footer />
    </div>
  );
}
