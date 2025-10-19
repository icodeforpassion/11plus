import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonical } from '../../../../lib/seo';

const tracks = [
  {
    title: 'Vocabulary',
    description: 'Synonyms, antonyms, homophones, and definitions with SM-2 spaced repetition.',
    href: '/11-plus/english/vocabulary'
  },
  {
    title: 'Verbal Reasoning',
    description: 'Analogies, cloze, and odd-one-out questions that promote thoughtful reading.',
    href: '/practice/english'
  },
  {
    title: 'Timed Mock',
    description: '45-minute English mock designed to encourage pacing and strategy reflection.',
    href: '/mock/english'
  }
];

export const metadata: Metadata = {
  title: '11+ English Practice Topics | ElevenSpark',
  description: 'Adaptive English and verbal reasoning preparation that grows vocabulary confidence without exam pressure.',
  alternates: {
    canonical: buildCanonical('/11-plus/english')
  }
};

export default function EnglishOverviewPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">11+ English Overview</p>
        <h1 className="text-4xl font-heading font-semibold text-text">Daily vocabulary and reasoning boosts</h1>
        <p className="text-slate-600">
          Our English practice encourages curiosity about language. Learners meet new words, revisit favourites, and receive gentle
          nudges to reflect on context.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-3">
        {tracks.map((track) => (
          <div key={track.title} className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-text">{track.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{track.description}</p>
            <Link
              href={track.href}
              className="mt-4 inline-flex items-center text-sm font-semibold text-primary hover:text-blue-700"
            >
              View practice
            </Link>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500">
        We celebrate growth in vocabulary and comprehension. ElevenSpark avoids pressure-filled guarantees, focusing on solid foundations.
      </p>
    </article>
  );
}
