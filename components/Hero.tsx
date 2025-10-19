import Link from 'next/link';
import { Badge } from './Badge';

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-16 text-center md:flex-row md:items-center md:text-left">
        <div className="flex-1 space-y-6">
          <Badge variant="info">Fresh 11+ practice daily</Badge>
          <h1 className="text-4xl font-heading font-semibold tracking-tight text-text md:text-5xl">
            Make 11+ learning fun, not stressful.
          </h1>
          <p className="text-lg text-slate-600">
            ElevenSpark keeps practice engaging with adaptive maths and vocabulary sessions that build confidence without
            promising pass results.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Start Free for 7 Days
            </Link>
            <Link
              href="#parent-dashboard"
              className="inline-flex items-center justify-center rounded-full border border-primary px-5 py-3 text-sm font-semibold text-primary hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              See Parent Dashboard
            </Link>
          </div>
          <p className="text-sm text-slate-500">No credit card required for the trial. Cancel anytime.</p>
        </div>
        <div className="flex-1">
          <div className="rounded-3xl border border-primary/20 bg-white p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-primary">Confidence-first practice</h2>
            <ul className="mt-4 space-y-3 text-left text-sm text-slate-600">
              <li>✅ Adaptive sets that favour growth areas</li>
              <li>✅ Worked solutions after every question</li>
              <li>✅ Friendly streaks and badges to keep momentum</li>
              <li>✅ Parent updates each week via email</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
