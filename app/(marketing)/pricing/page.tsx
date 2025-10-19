import { Metadata } from 'next';
import { Navigation } from '../../../components/Navigation';
import { Footer } from '../../../components/Footer';
import { PricingTable } from '../../../components/PricingTable';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Pricing | ElevenSpark',
  description: 'Affordable 11+ practice plans with weekly updates and family options. Cancel anytime.',
  alternates: {
    canonical: 'https://elevenspark.example.com/pricing'
  }
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Script id="pricing-breadcrumb" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://elevenspark.example.com/' },
            { '@type': 'ListItem', position: 2, name: 'Pricing', item: 'https://elevenspark.example.com/pricing' }
          ]
        })}
      </Script>
      <Navigation />
      <main className="mx-auto max-w-6xl px-4 py-16">
        <header className="max-w-3xl space-y-4">
          <h1 className="text-4xl font-heading font-semibold text-text">Pricing that grows with your family</h1>
          <p className="text-slate-600">
            All plans include adaptive maths, vocabulary SRS, and gentle progress emails. Every subscription begins with a
            7-day free trial—cancel anytime from your dashboard.
          </p>
          <p className="text-sm text-slate-500">We build confidence and strong foundations. No pass guarantees.</p>
        </header>
        <div className="mt-10">
          <PricingTable />
        </div>
        <section className="mt-16 space-y-6">
          <h2 className="text-2xl font-semibold text-text">Included in every plan</h2>
          <ul className="grid gap-4 md:grid-cols-2">
            <li className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
              🔁 Dynamic maths question templates refreshed per session
            </li>
            <li className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
              📚 200+ vocabulary cards with spaced repetition scheduling
            </li>
            <li className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
              👪 Parent dashboard with PDF export and weekly summaries
            </li>
            <li className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
              🔒 GDPR-compliant data handling with easy export/delete
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
