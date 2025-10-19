import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonical } from '../../../../lib/seo';

const topics = [
  {
    title: 'Fractions',
    description: 'Simplifying, equivalent forms, and multi-step reasoning with supportive explanations.',
    href: '/11-plus/maths/fractions'
  },
  {
    title: 'Number & Arithmetic',
    description: 'Two- and three-digit operations with BODMAS, factors, and mental maths warm-ups.',
    href: '/practice/maths'
  },
  {
    title: 'Problem Solving',
    description: 'Word problems that combine measures, ratios, and logical reasoning.',
    href: '/mock/maths'
  }
];

export const metadata: Metadata = {
  title: '11+ Maths Practice Topics | ElevenSpark',
  description: 'Explore ElevenSpark maths coverage with adaptive question templates for fractions, arithmetic, and reasoning.',
  alternates: {
    canonical: buildCanonical('/11-plus/maths')
  }
};

export default function MathsOverviewPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">11+ Maths Overview</p>
        <h1 className="text-4xl font-heading font-semibold text-text">Adaptive maths journeys for Years 5–6</h1>
        <p className="text-slate-600">
          ElevenSpark keeps maths practice encouraging. Sessions balance developing topics with maintenance and gentle stretch, so
          learners grow confidence without burnout.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-3">
        {topics.map((topic) => (
          <div key={topic.title} className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-text">{topic.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{topic.description}</p>
            <Link
              href={topic.href}
              className="mt-4 inline-flex items-center text-sm font-semibold text-primary hover:text-blue-700"
            >
              View practice
            </Link>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500">
        We focus on core understanding and confidence. ElevenSpark does not guarantee a pass — we provide steady, supportive practice.
      </p>
    </article>
  );
}
