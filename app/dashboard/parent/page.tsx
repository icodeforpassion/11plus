"use client";

import { Metadata } from 'next';
import { Card } from '../../../components/Card';
import { ResponsiveTable } from '../../../components/ResponsiveTable';
import { TrendSparkline } from '../../../components/TrendSparkline';
import { Button } from '../../../components/Button';
import { buildParentSummaryPdf } from '../../../lib/pdf';

export const metadata: Metadata = {
  title: 'Parent Dashboard | ElevenSpark'
};

const mockChildren = [
  {
    id: 'child1',
    name: 'Asha',
    weekMinutes: 145,
    accuracyTrend: [70, 74, 78, 81, 83],
    strengths: ['Synonyms', 'Number - BODMAS'],
    focus: ['Fractions - simplifying', 'Ratios - sharing'],
    accuracyByTopic: [
      ['Fractions', '72%'],
      ['Percentages', '79%'],
      ['Synonyms', '88%'],
      ['Analogies', '81%']
    ]
  }
];

async function handleExport(child: (typeof mockChildren)[number]) {
  const pdf = buildParentSummaryPdf({
    childName: child.name,
    weekOf: 'This Week',
    accuracyByTopic: child.accuracyByTopic.map(([topic, accuracy]) => ({ topic, accuracy: Number(accuracy.replace('%', '')) })),
    minutesPracticed: child.weekMinutes,
    notes: `Celebrate progress in ${child.strengths.join(', ')} and revisit ${child.focus.join(', ')} for confidence.`
  });
  pdf.save(`${child.name}-weekly-summary.pdf`);
}

export default function ParentDashboard() {
  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-heading font-semibold text-text">Parent overview</h1>
          <p className="text-sm text-slate-600">
            Track confidence-building progress for each child. We highlight strengths and gentle focus areas — no pass
            guarantees, just steady growth.
          </p>
        </header>
        {mockChildren.map((child) => (
          <Card key={child.id} className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-text">{child.name}</h2>
                <p className="text-sm text-slate-500">{child.weekMinutes} mins practised this week</p>
              </div>
              <Button
                onClick={() => {
                  handleExport(child);
                }}
              >
                Export PDF summary
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-text">Weekly accuracy trend</h3>
                <TrendSparkline data={child.accuracyTrend} ariaLabel={`${child.name} accuracy trend`} />
                <div>
                  <h4 className="text-sm font-semibold text-text">Strengths</h4>
                  <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">
                    {child.strengths.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text">Focus next</h4>
                  <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">
                    {child.focus.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-text">Accuracy by topic</h3>
                <ResponsiveTable headers={['Topic', 'Accuracy']} rows={child.accuracyByTopic} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
"use client";
