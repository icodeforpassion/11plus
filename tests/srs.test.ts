import { describe, it, expect } from 'vitest';
import { initialCardState, reviewCard } from '../lib/srs';

describe('SM-2 review', () => {
  it('schedules first review for next day', () => {
    const initial = initialCardState(new Date('2024-01-01'));
    expect(initial.intervalDays).toBe(0);
  });

  it('increases interval when quality high', () => {
    const initial = initialCardState(new Date('2024-01-01'));
    const reviewed = reviewCard(initial, 5, new Date('2024-01-01'));
    expect(reviewed.intervalDays).toBeGreaterThan(0);
  });
});
