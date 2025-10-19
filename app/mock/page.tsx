import Link from 'next/link';
import { Metadata } from 'next';
import { buildCanonical } from '../../lib/seo';

const mockOptions = [
  {
    subject: 'Maths mock',
    href: '/mock/maths',
    summary: 'Number sense, fractions, reasoning, and data handling with timed pacing tips.'
  },
  {
    subject: 'English mock',
    href: '/mock/english',
    summary: 'Synonyms, antonyms, cloze, and comprehension prompts with reflective feedback.'
  }
];

export const metadata: Metadata = {
  title: '11+ Mock Sessions | ElevenSpark',
  description: 'Try gentle 11+ mock sessions for maths and English with confidence-boosting feedback and no pass promises.',
  alternates: {
    canonical: buildCanonical('/mock')
  }
};

export default function MockIndexPage() {
  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto max-w-4xl space-y-6">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Timed practice</p>
          <h1 className="text-4xl font-heading font-semibold text-text">Confidence-first mock sessions</h1>
          <p className="text-slate-600">
            Each mock draws on the same deterministic templates as regular practice, generating fresh combinations each time. Feedback
            celebrates progress; no exam pass guarantee is given.
          </p>
        </header>
        <div className="grid gap-6 md:grid-cols-2">
          {mockOptions.map((option) => (
            <div key={option.href} className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-text">{option.subject}</h2>
              <p className="mt-2 text-sm text-slate-600">{option.summary}</p>
              <Link href={option.href} className="mt-4 inline-flex items-center text-sm font-semibold text-primary hover:text-blue-700">
                View details
              </Link>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500">
          Tip: practise mindfulness or breathing before a mock to keep the experience positive.
        </p>
      </div>
    </div>
  );
}
