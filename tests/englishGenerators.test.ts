import { describe, it, expect } from 'vitest';
import { englishTemplates } from '../lib/generators/english';
import { WORD_BANK } from '../lib/generators/english/wordBank';

describe('english generators', () => {
  it('cover all required topics', () => {
    const topics = new Set(englishTemplates.map((t) => t.topicKey));
    ['synonyms', 'antonyms', 'cloze', 'homophones', 'prefixes', 'suffixes', 'spellings', 'analogies', 'odd-one-out'].forEach(
      (topic) => expect(topics.has(topic)).toBe(true)
    );
  });

  it('has at least 200 vocabulary entries', () => {
    expect(WORD_BANK.length).toBeGreaterThanOrEqual(200);
  });
});
