import { describe, it, expect } from 'vitest';
import { mulberry32, seededShuffle } from '../lib/rng';

describe('mulberry32', () => {
  it('is deterministic for the same seed', () => {
    const randA = mulberry32(42);
    const randB = mulberry32(42);
    expect(Array.from({ length: 5 }, () => randA())).toEqual(Array.from({ length: 5 }, () => randB()));
  });
});

describe('seededShuffle', () => {
  it('shuffles deterministically', () => {
    const arr = [1, 2, 3, 4];
    expect(seededShuffle(10, arr)).toEqual(seededShuffle(10, arr));
  });
});
