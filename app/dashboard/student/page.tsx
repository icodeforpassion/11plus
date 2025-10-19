"use client";

import { Metadata } from 'next';
import { Card } from '../../../components/Card';
import { ProgressRing } from '../../../components/ProgressRing';
import { ResponsiveTable } from '../../../components/ResponsiveTable';
import { Button } from '../../../components/Button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Student Dashboard | ElevenSpark'
};

const mockData = {
  streak: 8,
  xp: 1240,
  accuracy: 82,
  minutes: 145,
  nextRecommended: [
    { topic: 'Fractions', mode: 'Quick Practice', difficulty: 'Adaptive' },
    { topic: 'Synonyms', mode: 'Vocab SRS', difficulty: 'Due today' },
    { topic: 'Measures', mode: 'Mock Prep', difficulty: 'Stretch' }
  ],
  accuracyByTopic: [
    { topic: 'Fractions', accuracy: 74 },
    { topic: 'Percentages', accuracy: 81 },
    { topic: 'Synonyms', accuracy: 88 },
    { topic: 'Analogies', accuracy: 79 }
  ]
};

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-heading font-semibold text-text">Welcome back!</h1>
            <p className="text-sm text-slate-600">Your learning streak is growing — keep the confidence going.</p>
          </div>
          <Link
            href="/practice/maths"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Start a 10-question practice
          </Link>
        </header>
        <section className="grid gap-4 md:grid-cols-4" aria-label="Key stats">
          <Card className="space-y-2">
            <p className="text-sm text-slate-500">Streak</p>
            <p className="text-3xl font-semibold">{mockData.streak} days 🔥</p>
          </Card>
          <Card className="space-y-2">
            <p className="text-sm text-slate-500">XP earned</p>
            <p className="text-3xl font-semibold">{mockData.xp}</p>
          </Card>
          <Card className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Accuracy</p>
              <p className="text-3xl font-semibold">{mockData.accuracy}%</p>
            </div>
            <ProgressRing value={mockData.accuracy} label="Accuracy percentage" />
          </Card>
          <Card className="space-y-2">
            <p className="text-sm text-slate-500">Minutes this week</p>
            <p className="text-3xl font-semibold">{mockData.minutes}</p>
          </Card>
        </section>
        <section className="grid gap-6 md:grid-cols-2">
          <Card className="space-y-4">
            <h2 className="text-xl font-semibold text-text">Next recommended sessions</h2>
            <ul className="space-y-3 text-sm text-slate-600">
              {mockData.nextRecommended.map((item) => (
                <li key={item.topic} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span>
                    <strong>{item.topic}</strong> — {item.mode}
                  </span>
                  <span className="text-slate-500">{item.difficulty}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full" onClick={() => {}}>Practice similar questions</Button>
          </Card>
          <Card className="space-y-4">
            <h2 className="text-xl font-semibold text-text">Accuracy by topic</h2>
            <ResponsiveTable
              headers={['Topic', 'Accuracy']}
              rows={mockData.accuracyByTopic.map((item) => [item.topic, `${item.accuracy}%`])}
            />
          </Card>
        </section>
        <section>
          <Card className="space-y-4">
            <h2 className="text-xl font-semibold text-text">Keep your streak</h2>
            <p className="text-sm text-slate-600">
              Complete a session today to earn another spark badge. Remember, we focus on confidence and steady progress — no pass
              promises, just your personal best.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button>Start quick practice</Button>
              <Button variant="secondary">Review vocab due</Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
