import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';
import { Badge } from '../../../components/Badge';
import { buildCanonical } from '../../../lib/seo';

const subjectConfig = {
  maths: {
    title: 'Maths Mock',
    description:
      '45-minute adaptive paper covering number, fractions, reasoning, and word problems to build confidence without exam pressure.',
    skills: ['Number & arithmetic', 'Fractions and percentages', 'Worded problem solving', 'Speed-distance-time'],
    helper: 'Maths mocks focus on reasoning and accuracy. Celebrate steady growth after each set.'
  },
  english: {
    title: 'English Mock',
    description:
      '45-minute verbal reasoning mix with synonyms, antonyms, cloze, homophones, and comprehension prompts. Encourages thoughtful reading.',
    skills: ['Synonyms & antonyms', 'Cloze inference', 'Homophones in context', 'Short comprehension reflections'],
    helper: 'English mocks highlight vocabulary range and pacing. Discuss new words afterwards to reinforce learning.'
  }
} as const;

type SubjectKey = keyof typeof subjectConfig;

type PageProps = {
  params: {
    subject: SubjectKey;
  };
};

export function generateStaticParams() {
  return Object.keys(subjectConfig).map((subject) => ({ subject }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const config = subjectConfig[params.subject];
  if (!config) {
    return {
      title: 'Mock Session | ElevenSpark'
    };
  }

  return {
    title: `${config.title} Practice | ElevenSpark`,
    description: config.description,
    alternates: {
      canonical: buildCanonical(`/mock/${params.subject}`)
    }
  } satisfies Metadata;
}

export default function MockSubjectPage({ params }: PageProps) {
  const config = subjectConfig[params.subject];
  if (!config) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto max-w-3xl space-y-8">
        <Card className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-heading font-semibold text-text">{config.title}</h1>
            <Badge variant="info">45 minutes</Badge>
          </div>
          <p className="text-sm text-slate-600">{config.description}</p>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Focus areas</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
              {config.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
          <Button className="w-full md:w-auto">Begin timed mock</Button>
          <p className="text-xs text-slate-500">{config.helper}</p>
          <p className="text-xs text-slate-500">
            ElevenSpark builds confidence and steady progress — we never guarantee an exam pass.
          </p>
        </Card>
      </div>
    </div>
  );
}
