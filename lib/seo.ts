export function buildCanonical(path: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://elevenspark.example.com';
  return `${base}${path}`;
}
