import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return <div className={twMerge('rounded-2xl border border-slate-200 bg-white p-6 shadow-sm', className)}>{children}</div>;
}
