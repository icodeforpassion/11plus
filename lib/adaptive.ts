import { seededShuffle } from './rng';

type SkillStat = {
  topicKey: string;
  theta: number;
  lastPractisedAt?: string;
  subject: 'maths' | 'english';
};

export function selectNextTopics(skills: SkillStat[], count: number, seed: number, subject?: 'maths' | 'english') {
  const defaults: SkillStat[] = [
    { topicKey: 'number-arithmetic', theta: 1200, subject: 'maths' },
    { topicKey: 'fractions', theta: 1200, subject: 'maths' },
    { topicKey: 'decimals-percentages', theta: 1200, subject: 'maths' },
    { topicKey: 'ratio-proportion', theta: 1200, subject: 'maths' },
    { topicKey: 'synonyms', theta: 1200, subject: 'english' },
    { topicKey: 'antonyms', theta: 1200, subject: 'english' },
    { topicKey: 'cloze', theta: 1200, subject: 'english' }
  ];
  if (!skills.length) {
    const pool = subject ? defaults.filter((item) => item.subject === subject) : defaults;
    return pool.slice(0, count);
  }
  const sorted = [...skills].sort((a, b) => (a.theta ?? 1200) - (b.theta ?? 1200));
  const weakest = sorted.slice(0, Math.max(1, Math.round(count * 0.6)));
  const maintenance = seededShuffle(seed, sorted.slice(weakest.length)).slice(0, Math.max(1, Math.round(count * 0.3)));
  const newTopics = seededShuffle(seed + 99, sorted.slice(weakest.length + maintenance.length)).slice(0, Math.max(1, count - weakest.length - maintenance.length));
  return [...weakest, ...maintenance, ...newTopics].slice(0, count);
}
