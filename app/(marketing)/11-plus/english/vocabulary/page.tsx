import { Metadata } from 'next';
import Script from 'next/script';
import { buildCanonical } from '../../../../../lib/seo';

const practiceHighlights = [
  '200+ curated vocabulary entries mapped to 11+ frequency lists.',
  'SM-2 spaced repetition scheduling so tricky terms return at the right time.',
  'Contextual cloze sentences with British English spellings and friendly feedback.',
  'Audio-safe prompts and dyslexia-aware typography guidance.'
];

const parentTakeaways = [
  'Weekly summaries with suggested conversation starters and word games.',
  'Visibility into time-on-task and daily streaks without comparison tables.',
  'Exportable PDF glossaries to revisit together during revision time.'
];

export const metadata: Metadata = {
  title: '11+ English Vocabulary Practice | ElevenSpark',
  description:
    'Daily vocabulary training for the 11+ using spaced repetition and fresh question templates. Built to grow confidence rather than promise a pass.',
  alternates: {
    canonical: buildCanonical('/11-plus/english/vocabulary')
  }
};

export default function VocabularyLandingPage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://elevenspark.example.com';
  const courseStructured = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: '11+ Vocabulary Confidence Course',
    description:
      'Spaced repetition vocabulary journeys covering synonyms, antonyms, cloze prompts, and homophones tailored for UK 11+ exams.',
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
        name: '11+ English',
        item: `${base}/11-plus/english`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Vocabulary Practice',
        item: `${base}/11-plus/english/vocabulary`
      }
    ]
  };

  return (
    <article className="space-y-8">
      <Script id="vocab-course" type="application/ld+json">
        {JSON.stringify(courseStructured)}
      </Script>
      <Script id="vocab-breadcrumb" type="application/ld+json">
        {JSON.stringify(breadcrumbStructured)}
      </Script>
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">11+ English Focus</p>
        <h1 className="text-4xl font-heading font-semibold text-text">Vocabulary that sticks</h1>
        <p className="text-slate-600">
          ElevenSpark blends SM-2 spaced repetition with adaptive question templates so each session feels fresh. We reinforce word
          confidence and curiosity — never pass guarantees.
        </p>
      </header>
      <section className="grid gap-6 rounded-3xl bg-white p-6 shadow-sm md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-heading font-semibold text-text">Inside each daily session</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {practiceHighlights.map((item) => (
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
          <h2 className="text-2xl font-heading font-semibold text-text">Support for parents and carers</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {parentTakeaways.map((item) => (
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
        <h2 className="text-lg font-semibold text-primary">Spaced repetition rhythm</h2>
        <p>Daily due cards blend review and new discoveries (60/30/10 rule) so vocabulary strengthens gently.</p>
        <p>Learners hear positive reinforcement for effort streaks and can replay explanations with reduced motion when preferred.</p>
        <p>Audio cues and font recommendations keep accessibility needs, including dyslexia support, front and centre.</p>
      </section>
      <footer className="space-y-2 rounded-3xl bg-amber-50 p-6 text-sm text-slate-700">
        <p>
          Encourage your child to use new words in context during the week. ElevenSpark shares prompts in weekly summaries to spark
          conversations at the dinner table.
        </p>
        <p className="text-xs text-slate-500">
          Subscriptions start with a 7-day free trial and can be cancelled anytime. Data requests are handled promptly in line with
          GDPR.
        </p>
      </footer>
    </article>
  );
}
