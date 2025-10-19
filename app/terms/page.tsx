import { Metadata } from 'next';
import { Navigation } from '../../components/Navigation';
import { Footer } from '../../components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Use | ElevenSpark',
  description: 'Terms for using ElevenSpark services.'
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="mx-auto max-w-3xl space-y-6 px-4 py-16 text-sm text-slate-600">
        <h1 className="text-3xl font-heading font-semibold text-text">Terms of use</h1>
        <p>
          ElevenSpark provides educational content for practice and confidence building. We do not guarantee exam results.
          Parents are responsible for supervising usage by children under 18. Subscriptions renew automatically unless cancelled
          before the renewal date.
        </p>
        <p>
          Users agree not to share account access or reverse engineer the platform. We may update content and pricing with 30
          days notice. Disputes fall under the jurisdiction of England and Wales.
        </p>
      </main>
      <Footer />
    </div>
  );
}
