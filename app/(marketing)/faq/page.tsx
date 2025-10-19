import { Metadata } from 'next';
import Script from 'next/script';
import { Navigation } from '../../../components/Navigation';
import { Footer } from '../../../components/Footer';

const faqs = [
  {
    question: 'Do you guarantee a pass?',
    answer: 'No. ElevenSpark focuses on building confidence and core skills. Exam results depend on many factors outside our control.'
  },
  {
    question: 'How fresh are the questions?',
    answer: 'Each session uses seeded templates to generate new variations, with cooldowns to prevent repeats within 30 days.'
  },
  {
    question: 'Can parents manage multiple children?',
    answer: 'Yes, parent accounts can create and manage multiple child profiles, each with personalised recommendations.'
  },
  {
    question: 'Is ElevenSpark compliant with GDPR?',
    answer: 'We host on Firebase with EU data residency, provide data export/delete options, and use role-based access controls.'
  }
];

export const metadata: Metadata = {
  title: 'FAQ | ElevenSpark',
  description: 'Answers to common questions about ElevenSpark—our adaptive 11+ practice platform for UK families.',
  alternates: {
    canonical: 'https://elevenspark.example.com/faq'
  }
};

export default function FAQPage() {
  const faqStructured = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <div className="min-h-screen bg-background">
      <Script id="faq-schema" type="application/ld+json">
        {JSON.stringify(faqStructured)}
      </Script>
      <Navigation />
      <main className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-4xl font-heading font-semibold text-text">Frequently asked questions</h1>
        <dl className="mt-10 space-y-8">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <dt className="text-lg font-semibold text-text">{faq.question}</dt>
              <dd className="mt-2 text-slate-600">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </main>
      <Footer />
    </div>
  );
}
