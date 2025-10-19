import { Metadata } from 'next';
import { Card } from '../../components/Card';
import { ResponsiveTable } from '../../components/ResponsiveTable';
import { Button } from '../../components/Button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Admin Console | ElevenSpark'
};

const templateRows = [
  ['maths.percentOf.v1', 'Percentages', 'MCQ', '2'],
  ['english.synonym.v1', 'Synonyms', 'MCQ', '2'],
  ['maths.algebra.solveLinear', 'Intro Algebra', 'Numeric', '3']
];

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-heading font-semibold text-text">Admin tools</h1>
          <p className="text-sm text-slate-600">
            Manage question templates and vocabulary lists. Changes sync to Firestore and can be automated from Google Sheets
            using the Apps Script webhook.
          </p>
        </header>
        <Card className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-text">Question templates</h2>
            <Button>Add template</Button>
          </div>
          <ResponsiveTable headers={['ID', 'Topic', 'Type', 'Difficulty']} rows={templateRows} />
        </Card>
        <Card className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-text">Vocabulary sync</h2>
            <Link
              href="https://script.google.com"
              className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Open Apps Script
            </Link>
          </div>
          <p className="text-sm text-slate-600">
            Use the provided webhook endpoint to push CSV updates from Google Sheets, keeping the platform affordable without a
            paid CMS.
          </p>
        </Card>
      </div>
    </div>
  );
}
