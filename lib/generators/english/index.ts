import { mulberry32, seededShuffle } from '../../rng';
import { GeneratorResult } from '../types';
import { WORD_BANK } from './wordBank';

type EnglishTemplate = {
  id: string;
  topicKey: string;
  difficulty: number;
  templateType: 'MCQ' | 'CLOZE';
  generate: (seed: number) => GeneratorResult;
};

function randomWord(seed: number, filter?: (entry: (typeof WORD_BANK)[number]) => boolean) {
  const rand = mulberry32(seed);
  const pool = filter ? WORD_BANK.filter(filter) : WORD_BANK;
  const index = Math.floor(rand() * pool.length);
  return pool[index];
}

const homophones = [
  { sentence: 'Please ____ your hand if you know the answer.', answer: 'raise', options: ['raze', 'raise', 'rays'] },
  { sentence: 'They could not decide which road to ____.', answer: 'take', options: ['take', 'tack', 'tache'] },
  { sentence: 'The knight wore armour to protect his ____.', answer: 'waist', options: ['waist', 'waste', 'waistt'] },
  { sentence: 'We went to the park with ____ friends.', answer: 'their', options: ['their', "they're", 'there'] },
  { sentence: 'She read the story aloud before going to ____.', answer: 'bed', options: ['bed', 'bede', 'bead'] }
];

const prefixes = [
  { base: 'appear', prefix: 'dis', meaning: 'not' },
  { base: 'kind', prefix: 'un', meaning: 'not' },
  { base: 'behave', prefix: 'mis', meaning: 'wrongly' },
  { base: 'cycle', prefix: 're', meaning: 'again' }
];

const suffixes = [
  { base: 'hope', suffix: 'ful', meaning: 'full of' },
  { base: 'care', suffix: 'less', meaning: 'without' },
  { base: 'enjoy', suffix: 'ment', meaning: 'action/result' },
  { base: 'educate', suffix: 'tion', meaning: 'process' }
];

const analogies = [
  { left: 'Hot', relation: 'is to', middle: 'Cold', answer: 'Warm : Cool', distractors: ['Ice : Freeze', 'Wet : Rain'] },
  { left: 'Teacher', relation: 'guides', middle: 'Pupil', answer: 'Coach : Team', distractors: ['Nurse : School', 'Chef : Recipe'] },
  { left: 'Bee', relation: 'makes', middle: 'Honey', answer: 'Spider : Web', distractors: ['Cat : Bark', 'Cow : Wool'] },
  { left: 'Night', relation: 'opposite of', middle: 'Day', answer: 'Asleep : Awake', distractors: ['High : Tall', 'Left : Straight'] }
];

const oddOneOutSets = [
  ['triangle', 'square', 'circle', 'banana'],
  ['violin', 'flute', 'drum', 'ladder'],
  ['scarlet', 'crimson', 'azure', 'ruby'],
  ['lion', 'tiger', 'leopard', 'sparrow']
];

function makeChoices(seed: number, correct: string, rest: string[]) {
  return seededShuffle(seed, [correct, ...rest]);
}

export const englishTemplates: EnglishTemplate[] = [
  {
    id: 'english.synonym.v1',
    topicKey: 'synonyms',
    difficulty: 2,
    templateType: 'MCQ',
    generate(seed) {
      const word = randomWord(seed, (entry) => entry.syn.length >= 2);
      const [syn1] = word.syn;
      const distractors = seededShuffle(seed + 2, WORD_BANK.filter((entry) => entry.pos === word.pos && entry.word !== word.word).map((entry) => entry.word)).slice(0, 3);
      const options = makeChoices(seed + 3, syn1, distractors);
      return {
        stem: `Select the closest meaning to "${word.word}".`,
        choices: options,
        canonicalAnswer: syn1,
        explanation: `${word.word} means ${word.meaning}, so "${syn1}" is the closest synonym.`,
        difficulty: 2
      };
    }
  },
  {
    id: 'english.antonym.v1',
    topicKey: 'antonyms',
    difficulty: 3,
    templateType: 'MCQ',
    generate(seed) {
      const word = randomWord(seed + 10, (entry) => entry.ant.length >= 1);
      const ant = word.ant[0];
      const distractors = seededShuffle(seed + 11, WORD_BANK.filter((entry) => entry.pos === word.pos && entry.word !== word.word).map((entry) => entry.word)).slice(0, 3);
      const choices = makeChoices(seed + 12, ant, distractors);
      return {
        stem: `Which word is closest to the opposite of "${word.word}"?`,
        choices,
        canonicalAnswer: ant,
        explanation: `${word.word} means ${word.meaning}. The opposite is "${ant}".`,
        difficulty: 3
      };
    }
  },
  {
    id: 'english.cloze.v1',
    topicKey: 'cloze',
    difficulty: 2,
    templateType: 'CLOZE',
    generate(seed) {
      const word = randomWord(seed + 20, (entry) => entry.pos === 'adj');
      const sentence = `The ${word.word} student completed the project.`;
      const distractors = seededShuffle(seed + 21, WORD_BANK.filter((entry) => entry.pos === 'adj' && entry.word !== word.word).map((entry) => entry.word)).slice(0, 3);
      const choices = makeChoices(seed + 22, word.word, distractors);
      return {
        stem: sentence.replace(word.word, '_____'),
        choices,
        canonicalAnswer: word.word,
        explanation: `${word.word} fits because it means ${word.meaning}.`,
        difficulty: 2
      };
    }
  },
  {
    id: 'english.homophone.v1',
    topicKey: 'homophones',
    difficulty: 1,
    templateType: 'MCQ',
    generate(seed) {
      const item = homophones[seed % homophones.length];
      const choices = makeChoices(seed + 30, item.answer, item.options.filter((opt) => opt !== item.answer));
      return {
        stem: item.sentence,
        choices,
        canonicalAnswer: item.answer,
        explanation: `Use "${item.answer}" because it matches the sentence meaning.`,
        difficulty: 1
      };
    }
  },
  {
    id: 'english.prefix.v1',
    topicKey: 'prefixes',
    difficulty: 2,
    templateType: 'MCQ',
    generate(seed) {
      const item = prefixes[seed % prefixes.length];
      const correct = `${item.prefix}${item.base}`;
      const distractors = prefixes
        .filter((p) => p !== item)
        .map((p) => `${p.prefix}${item.base}`)
        .concat(`${item.prefix}${item.base}e`)
        .slice(0, 3);
      const choices = makeChoices(seed + 40, correct, distractors);
      return {
        stem: `Add the prefix meaning "${item.meaning}" to "${item.base}".`,
        choices,
        canonicalAnswer: correct,
        explanation: `Prefix ${item.prefix}- means ${item.meaning}, so ${item.base} becomes ${correct}.`,
        difficulty: 2
      };
    }
  },
  {
    id: 'english.suffix.v1',
    topicKey: 'suffixes',
    difficulty: 2,
    templateType: 'MCQ',
    generate(seed) {
      const item = suffixes[seed % suffixes.length];
      const correct = `${item.base}${item.suffix}`;
      const distractors = suffixes
        .filter((s) => s !== item)
        .map((s) => `${item.base}${s.suffix}`)
        .concat(`${item.base}${item.suffix}e`)
        .slice(0, 3);
      const choices = makeChoices(seed + 50, correct, distractors);
      return {
        stem: `Add the suffix meaning "${item.meaning}" to "${item.base}".`,
        choices,
        canonicalAnswer: correct,
        explanation: `Suffix ${item.suffix} means ${item.meaning}, so ${item.base} becomes ${correct}.`,
        difficulty: 2
      };
    }
  },
  {
    id: 'english.spelling.v1',
    topicKey: 'spellings',
    difficulty: 2,
    templateType: 'MCQ',
    generate(seed) {
      const word = randomWord(seed + 60);
      const incorrect = [`${word.word}e`, word.word.replace(/e$/, ''), word.word.replace(/able$/, 'ible')].filter((opt) => opt && opt !== word.word);
      const choices = makeChoices(seed + 61, word.word, incorrect.slice(0, 3));
      return {
        stem: `Choose the correct British spelling.`,
        choices,
        canonicalAnswer: word.word,
        explanation: `The correct en-GB spelling is ${word.word}.`,
        difficulty: 2
      };
    }
  },
  {
    id: 'english.analogy.v1',
    topicKey: 'analogies',
    difficulty: 3,
    templateType: 'MCQ',
    generate(seed) {
      const item = analogies[seed % analogies.length];
      const choices = makeChoices(seed + 70, item.answer, item.distractors);
      return {
        stem: `${item.left} : ${item.middle} :: ?`,
        choices,
        canonicalAnswer: item.answer,
        explanation: `${item.left} ${item.relation} ${item.middle}, so ${item.answer}.`,
        difficulty: 3
      };
    }
  },
  {
    id: 'english.oddOneOut.v1',
    topicKey: 'odd-one-out',
    difficulty: 2,
    templateType: 'MCQ',
    generate(seed) {
      const set = oddOneOutSets[seed % oddOneOutSets.length];
      const odd = set.find((word) => !['triangle', 'square', 'circle', 'violin', 'flute', 'drum', 'scarlet', 'crimson', 'ruby', 'lion', 'tiger', 'leopard'].includes(word)) || set[0];
      const choices = makeChoices(seed + 80, odd, set.filter((item) => item !== odd));
      return {
        stem: `Which is the odd one out?`,
        choices,
        canonicalAnswer: odd,
        explanation: `${odd} does not belong in the group of the other related items.`,
        difficulty: 2
      };
    }
  }
];
