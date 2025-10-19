import { Metadata } from 'next';
import Script from 'next/script';
import { buildCanonical } from '../../../../../lib/seo';

const learningOutcomes = [
  'Simplify improper and mixed fractions confidently.',
  'Add and subtract with different denominators using the lowest common multiple.',
  'Convert fractions to decimals and percentages for everyday contexts.',
  'Tackle multi-step word problems with calm, confidence-first strategies.'
];

const sessionFeatures = [
  'Adaptive templates that flex difficulty based on recent attempts.',
  'Worked solutions with visual fraction bars for every generated question.',
  'Confidence cues that highlight effort streaks instead of raw scores.',
  'Printable recap PDF to discuss together during family review time.'
];

export const metadata: Metadata = {
  title: '11+ Maths Fractions Practice | ElevenSpark',
  description:
    'Targeted 11+ fractions practice for UK learners. Fresh adaptive questions, supportive feedback, and guidance for families — no pass guarantees, just confidence.',
  alternates: {
    canonical: buildCanonical('/11-plus/maths/fractions')
  }
};

export default function FractionsLandingPage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://elevenspark.example.com';
  const courseStructured = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: '11+ Fractions Confidence Course',
    description:
      'Adaptive fractions practice with step-by-step explanations designed to support Year 5 and Year 6 learners preparing for the 11+.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'ElevenSpark',
      url: base
    }
  };

  const breadcrumbStructured = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${base}/`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '11+ Maths',
        item: `${base}/11-plus/maths`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Fractions Practice',
        item: `${base}/11-plus/maths/fractions`
      }
    ]
  };

  return (
    <article className="space-y-8">
      <Script id="fractions-course" type="application/ld+json">
        {JSON.stringify(courseStructured)}
      </Script>
      <Script id="fractions-breadcrumb" type="application/ld+json">
        {JSON.stringify(breadcrumbStructured)}
      </Script>
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">11+ Maths Focus</p>
        <h1 className="text-4xl font-heading font-semibold text-text">Fractions without the fear</h1>
        <p className="text-slate-600">
          ElevenSpark generates new fractions questions every session using deterministic templates. Learners build calm mastery —
          we celebrate progress and effort, never promising a guaranteed pass.
        </p>
      </header>
      <section className="grid gap-6 rounded-3xl bg-white p-6 shadow-sm md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-heading font-semibold text-text">What your child will practise</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {learningOutcomes.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span aria-hidden="true" className="mt-1 text-amber-500">
                  ★
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-heading font-semibold text-text">Why it feels supportive</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {sessionFeatures.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span aria-hidden="true" className="mt-1 text-blue-500">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="space-y-3 rounded-3xl border border-dashed border-primary/40 bg-blue-50 p-6 text-sm text-slate-700">
        <h2 className="text-lg font-semibold text-primary">Session structure</h2>
        <p>10-question quick bursts or 25-question deep dives with immediate worked solutions.</p>
        <p>Adaptive engine keeps 60% of prompts on developing fraction skills, 30% on recent wins, 10% exploratory stretch.</p>
        <p>Parents see accurate time-on-task plus discussion prompts for the week in the dashboard and weekly email.</p>
      </section>
      <footer className="space-y-2 rounded-3xl bg-amber-50 p-6 text-sm text-slate-700">
        <p>
          Confidence spotlight: celebrate each fractional success, even when the answer needs a retry. ElevenSpark nudges learners to
          reflect and try again with supportive hints.
        </p>
        <p className="text-xs text-slate-500">
          Data stays in the UK/EU on Firebase. Families can export or delete learning records at any time.
        </p>
      </footer>
    </article>
  );
}
