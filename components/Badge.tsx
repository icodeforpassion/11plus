import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type BadgeProps = {
  children: ReactNode;
  variant?: 'success' | 'info' | 'warning';
  className?: string;
};

export function Badge({ children, variant = 'info', className }: BadgeProps) {
  const styles: Record<typeof variant, string> = {
    success: 'bg-green-100 text-green-800',
    info: 'bg-blue-100 text-blue-800',
    warning: 'bg-amber-100 text-amber-800'
  };
  return (
    <span className={twMerge('inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold', styles[variant], className)}>
      {children}
    </span>
  );
}
