import { Metadata } from 'next';
import { Navigation } from '../../components/Navigation';
import { Footer } from '../../components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | ElevenSpark',
  description: 'How ElevenSpark handles personal data in compliance with GDPR.'
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="mx-auto max-w-3xl space-y-6 px-4 py-16 text-sm text-slate-600">
        <h1 className="text-3xl font-heading font-semibold text-text">Privacy policy</h1>
        <p>
          ElevenSpark stores learner progress securely within Firebase (EU region). Parents can request data export or deletion
          by emailing privacy@elevenspark.com. We collect only the data needed to deliver adaptive practice and billing. Data
          is never sold or shared with advertisers.
        </p>
        <p>
          Authentication is powered by Firebase Auth with encrypted passwords. All data access is role-based. Analytics uses
          cookieless measurement where possible and honours cookie consent preferences.
        </p>
        <p>
          Questions? Contact privacy@elevenspark.com. Policy last reviewed January 2024.
        </p>
      </main>
      <Footer />
    </div>
  );
}
