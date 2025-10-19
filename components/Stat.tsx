import { ReactNode } from 'react';
import { Card } from './Card';

interface StatProps {
  label: string;
  value: ReactNode;
  helper?: string;
}

export function Stat({ label, value, helper }: StatProps) {
  return (
    <Card className="space-y-2">
      <p className="text-sm text-slate-500">{label}</p>
      <div className="text-3xl font-semibold text-text">{value}</div>
      {helper && <p className="text-sm text-slate-500">{helper}</p>}
    </Card>
  );
}
