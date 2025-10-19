import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonical } from '../../../lib/seo';

const pathways = [
  {
    title: 'Maths Confidence',
    description: 'Adaptive number, fractions, and problem-solving practice that adjusts with every attempt.',
    href: '/11-plus/maths'
  },
  {
    title: 'English & Vocabulary',
    description: 'Spaced repetition vocabulary journeys with cloze, analogies, and reading prompts.',
    href: '/11-plus/english'
  }
];

export const metadata: Metadata = {
  title: '11+ Practice Pathways | ElevenSpark',
  description: 'Discover the ElevenSpark approach to 11+ maths and English preparation with confidence-first messaging and adaptive sessions.',
  alternates: {
    canonical: buildCanonical('/11-plus')
  }
};

export default function ElevenPlusIndexPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">11+ Preparation</p>
        <h1 className="text-4xl font-heading font-semibold text-text">Confidence-first 11+ support</h1>
        <p className="text-slate-600">
          ElevenSpark is built for UK families seeking structured, low-pressure preparation. Fresh questions appear every session,
          dashboards stay simple, and no pass guarantee is ever promised.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {pathways.map((pathway) => (
          <div key={pathway.title} className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-heading font-semibold text-text">{pathway.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{pathway.description}</p>
            <Link
              href={pathway.href}
              className="mt-4 inline-flex items-center text-sm font-semibold text-primary hover:text-blue-700"
            >
              Explore pathway
            </Link>
          </div>
        ))}
      </div>
      <section className="rounded-3xl bg-amber-50 p-6 text-sm text-slate-700">
        <h2 className="text-lg font-semibold text-primary">Built for families</h2>
        <p>
          Parents manage profiles, view weekly summaries, and can export or delete data anytime. Students earn gentle badges and streaks
          that stay private within the family.
        </p>
        <p className="mt-3 text-xs text-slate-500">Firebase hosting keeps costs low and data secure within the UK/EU.</p>
      </section>
    </article>
  );
}
