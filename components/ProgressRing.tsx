import { useMemo } from 'react';

interface ProgressRingProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export function ProgressRing({ value, size = 80, strokeWidth = 8, label }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const ariaLabel = useMemo(() => label ?? `${value}%`, [label, value]);

  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      width={size}
      height={size}
      className="text-primary"
      style={{ transform: 'rotate(-90deg)' }}
    >
      <circle
        stroke="#E5E7EB"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        stroke="currentColor"
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="fill-text"
        style={{ transform: 'rotate(90deg)' }}
      >
        {Math.round(value)}%
      </text>
    </svg>
  );
}
