interface TrendSparklineProps {
  data: number[];
  width?: number;
  height?: number;
  stroke?: string;
  ariaLabel: string;
}

export function TrendSparkline({ data, width = 160, height = 64, stroke = '#3B82F6', ariaLabel }: TrendSparklineProps) {
  if (!data.length) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1 || 1)) * width;
      const normalised = (value - min) / (max - min || 1);
      const y = height - normalised * height;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg role="img" aria-label={ariaLabel} width={width} height={height} viewBox={`0 0 ${width} ${height}`}
      className="text-primary">
      <polyline fill="none" stroke={stroke} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" points={points} />
    </svg>
  );
}
