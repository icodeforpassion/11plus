import Link from 'next/link';
import { Card } from './Card';
import { Badge } from './Badge';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: '£14/mo',
    description: 'Single child access with weekly reports.',
    features: ['7-day free trial', 'Adaptive maths & vocabulary', 'Weekly parent summary email'],
    checkout: process.env.NEXT_PUBLIC_LS_STARTER_URL || '#'
  },
  {
    id: 'family',
    name: 'Family',
    price: '£24/mo',
    description: 'Up to 3 child profiles plus parent dashboard export.',
    features: ['Everything in Starter', 'Family streak challenges', 'PDF exports for insights'],
    checkout: process.env.NEXT_PUBLIC_LS_FAMILY_URL || '#',
    highlighted: true
  },
  {
    id: 'annual',
    name: 'Annual',
    price: '£199/yr',
    description: 'Best value for year-round prep.',
    features: ['Two months free', 'Priority support', 'Early access to new question banks'],
    checkout: process.env.NEXT_PUBLIC_LS_ANNUAL_URL || '#'
  }
];

export function PricingTable() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {plans.map((plan) => (
        <Card key={plan.id} className={`flex h-full flex-col gap-4 ${plan.highlighted ? 'border-primary shadow-lg' : ''}`}>
          {plan.highlighted && <Badge variant="success">Popular</Badge>}
          <div>
            <h3 className="text-xl font-semibold text-text">{plan.name}</h3>
            <p className="mt-1 text-3xl font-bold text-primary">{plan.price}</p>
            <p className="mt-2 text-sm text-slate-600">{plan.description}</p>
          </div>
          <ul className="space-y-2 text-sm text-slate-600">
            {plan.features.map((feature) => (
              <li key={feature}>• {feature}</li>
            ))}
          </ul>
          <Link
            href={plan.checkout}
            className="mt-auto inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Start trial
          </Link>
          <p className="text-xs text-slate-500">Cancel anytime. No exam pass guarantees.</p>
        </Card>
      ))}
    </div>
  );
}
