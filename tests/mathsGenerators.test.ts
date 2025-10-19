import { describe, it, expect } from 'vitest';
import { mathsTemplates } from '../lib/generators/maths';

describe('maths generators', () => {
  it('produce consistent output for same seed', () => {
    const template = mathsTemplates.find((t) => t.id === 'maths.fractions.simplify');
    expect(template).toBeDefined();
    const first = template!.generate(1234);
    const second = template!.generate(1234);
    expect(second).toEqual(first);
  });

  it('includes at least 25 templates', () => {
    expect(mathsTemplates.length).toBeGreaterThanOrEqual(25);
  });
});
