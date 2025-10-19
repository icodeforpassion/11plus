import { describe, it, expect } from 'vitest';
import { updateElo } from '../lib/elo';

describe('ELO update', () => {
  it('increases rating after correct answer', () => {
    const result = updateElo(1200, 3, true);
    expect(result).toBeGreaterThan(1200);
  });

  it('decreases rating after incorrect answer', () => {
    const result = updateElo(1200, 3, false);
    expect(result).toBeLessThan(1200);
  });
});
