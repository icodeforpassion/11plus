import { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-primary text-white hover:bg-blue-600 focus-visible:ring-primary',
    secondary: 'bg-white text-primary border border-primary hover:bg-blue-50 focus-visible:ring-primary',
    ghost: 'bg-transparent text-primary hover:bg-blue-50 focus-visible:ring-primary'
  };

  return <button className={twMerge(base, variants[variant], className)} {...props} />;
}
