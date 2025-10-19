import { mulberry32, seededShuffle } from '../../rng';
import { GeneratorResult } from '../types';

export type MathsTemplate = {
  id: string;
  topicKey: string;
  difficulty: number;
  templateType: 'NUMERIC' | 'MCQ' | 'CLOZE';
  generate: (seed: number) => GeneratorResult;
};

function toMCQ(seed: number, answer: number | string, distractors: Array<number | string>) {
  const options = seededShuffle(seed, [answer, ...distractors]).map((o) => String(o));
  return { choices: options, canonicalAnswer: String(answer) };
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export const mathsTemplates: MathsTemplate[] = [
  {
    id: 'maths.arithmetic.multiplySubtract',
    topicKey: 'number-arithmetic',
    difficulty: 2,
    templateType: 'NUMERIC',
    generate(seed) {
      const rand = mulberry32(seed);
      const a = Math.floor(rand() * 88) + 12;
      const b = Math.floor(rand() * 11) + 2;
      const c = (Math.floor(rand() * 9) + 1) * 10;
      const result = a * b - c;
      return {
        stem: `Compute ${a} × ${b} - ${c}.`,
        canonicalAnswer: String(result),
        explanation: `${a} × ${b} = ${a * b}. Subtract ${c} to get ${result}.`,
        difficulty: 2
      };
    }
  },
  {
    id: 'maths.arithmetic.missingNumber',
    topicKey: 'number-arithmetic',
    difficulty: 2,
    templateType: 'NUMERIC',
    generate(seed) {
      const rand = mulberry32(seed + 10);
      const x = Math.floor(rand() * 90) + 10;
      const y = Math.floor(rand() * 40) + 10;
      const z = x + y;
      return {
        stem: `Fill the missing number: ${x} + □ = ${z}.`,
        canonicalAnswer: String(y),
        explanation: `Subtract ${x} from ${z}: ${z} - ${x} = ${y}.`,
        difficulty: 1
      };
    }
  },
  {
    id: 'maths.bodmas.orderOfOps',
    topicKey: 'number-arithmetic',
    difficulty: 3,
    templateType: 'NUMERIC',
    generate(seed) {
      const rand = mulberry32(seed + 20);
      const a = Math.floor(rand() * 8) + 2;
      const b = Math.floor(rand() * 10) + 3;
      const c = Math.floor(rand() * 6) + 2;
      const result = a * (b + c);
      return {
        stem: `Evaluate ${a} × (${b} + ${c}).`,
        canonicalAnswer: String(result),
        explanation: `${b} + ${c} = ${b + c}. Multiply by ${a} to get ${result}.`,
        difficulty: 3
      };
    }
  },
  {
    id: 'maths.fractions.simplify',
    topicKey: 'fractions',
    difficulty: 2,
    templateType: 'NUMERIC',
    generate(seed) {
      const rand = mulberry32(seed + 30);
      let numerator = Math.floor(rand() * 40) + 20;
      let denominator = Math.floor(rand() * 50) + 30;
      const divisor = gcd(numerator, denominator);
      numerator /= divisor;
      denominator /= divisor;
      const original = `${numerator * divisor}/${denominator * divisor}`;
      return {
        stem: `Simplify ${original}.`,
        canonicalAnswer: `${numerator}/${denominator}`,
        explanation: `Divide numerator and denominator by ${divisor} to get ${numerator}/${denominator}.`,
        difficulty: 2
      };
    }
  },
  {
    id: 'maths.fractions.addition',
    topicKey: 'fractions',
    difficulty: 3,
    templateType: 'NUMERIC',
    generate(seed) {
      const rand = mulberry32(seed + 31);
      const a = Math.floor(rand() * 6) + 2;
      const b = Math.floor(rand() * 6) + 3;
      const c = Math.floor(rand() * 6) + 2;
      const d = Math.floor(rand() * 6) + 3;
      const lcm = (a * c) / gcd(a, c);
      const numerator = b * (lcm / a) + d * (lcm / c);
      const divisor = gcd(numerator, lcm);
      return {
        stem: `Add ${b}/${a} + ${d}/${c}.`,
        canonicalAnswer: `${numerator / divisor}/${lcm / divisor}`,
        explanation: `LCM of denominators is ${lcm}. Convert and add to get ${numerator}/${lcm}, simplify to ${numerator / divisor}/${lcm / divisor}.`,
        difficulty: 3
      };
    }
  },
  {
    id: 'maths.decimals.percentOf',
    topicKey: 'decimals-percentages',
    difficulty: 2,
    templateType: 'MCQ',
    generate(seed) {
      const rand = mulberry32(seed + 40);
      const base = Math.floor(rand() * 821) + 80;
      const percents = [5, 10, 12.5, 20, 25, 33.33, 50, 75];
      const percent = percents[Math.floor(rand() * percents.length)];
      const answer = Number((base * (percent / 100)).toFixed(2));
      const distractors = [answer * 2, Number((answer * 0.5).toFixed(2)), Number((base * ((percent + 5) / 100)).toFixed(2))];
      const { choices, canonicalAnswer } = toMCQ(seed, answer, distractors);
      return {
        stem: `Find ${percent}% of ${base}.`,
        choices,
        canonicalAnswer,
        explanation: `${percent}% × ${base} = ${base} × ${percent / 100} = ${answer}.`,
        difficulty: 2
      };
    }
  },
  {
    id: 'maths.decimals.percentChange',
    topicKey: 'decimals-percentages',
    difficulty: 3,
    templateType: 'NUMERIC',
    generate(seed) {
      const rand = mulberry32(seed + 41);
      const original = Math.floor(rand() * 400) + 200;
      const change = [10, 12, 15, 20][Math.floor(rand() * 4)];
      const increased = original + Math.round((original * change) / 100);
      return {
        stem: `A jumper costs £${original}. It increases by ${change}%. What is the new price?`,
        canonicalAnswer: String(increased),
        explanation: `Increase is ${original} × ${change}% = ${Math.round((original * change) / 100)}. New price ${original} + increase = £${increased}.`,
        difficulty: 3
      };
    }
  },
  {
    id: 'maths.ratio.shareMoney',
    topicKey: 'ratio-proportion',
    difficulty: 2,
    templateType: 'NUMERIC',
    generate(seed) {
      const rand = mulberry32(seed + 50);
      const r1 = Math.floor(rand() * 4) + 2;
      const r2 = Math.floor(rand() * 4) + 3;
      const totalUnits = r1 + r2;
      const total = totalUnits * (Math.floor(rand() * 15) + 4);
      const share1 = (total / totalUnits) * r1;
      return {
        stem: `Share £${total} in the ratio ${r1}:${r2}. How much does the first person receive?`,
        canonicalAnswer: String(share1),
        explanation: `Total units ${totalUnits}. Each unit is £${total / totalUnits}. First share is ${r1} units = £${share1}.`,
        difficulty: 2
      };
    }
  },
  {
    id: 'maths.ratio.recipeScale',
    topicKey: 'ratio-proportion',
    difficulty: 3,
    templateType: 'NUMERIC',
    generate(seed) {
      const rand = mulberry32(seed + 51);
      const serves = [2, 4, 5][Math.floor(rand() * 3)];
      const flour = Math.floor(rand() * 150) + 150;
      const target = serves * 2;
      const scaled = (flour / serves) * target;
      return {
        stem: `A recipe for ${serves} people uses ${flour}g of flour. How much flour is needed for ${target} people?`,
        canonicalAnswer: `${scaled}g`,
        explanation: `Per person flour is ${flour / serves}g. Multiply by ${target} to get ${scaled}g.`,
        difficulty: 3
      };
    }
  },
  {
    id: 'maths.factors.lcm',
    topicKey: 'factors-multiples',
    difficulty: 2,
    templateType: 'NUMERIC',
    generate(seed) {
      const rand = mulberry32(seed + 60);
      const x = Math.floor(rand() * 25) + 6;
      const y = Math.floor(rand() * 25) + 6;
      const lcm = (x * y) / gcd(x, y);
      return {
        stem: `Find the LCM of ${x} and ${y}.`,
        canonicalAnswer: String(lcm),
        explanation: `Prime factors show LCM ${lcm}.`,
        difficulty: 2
      };
    }
  },
  {
    id: 'maths.factors.hcf',
    topicKey: 'factors-multiples',
    difficulty: 2,
    templateType: 'NUMERIC',
    generate(seed) {
      const rand = mulberry32(seed + 61);
      const x = Math.floor(rand() * 40) + 20;
      const y = Math.floor(rand() * 40) + 20;
      const h = gcd(x, y);
      return {
        stem: `Find the HCF of ${x} and ${y}.`,
        canonicalAnswer: String(h),
        explanation: `Highest common factor is ${h}.`,
        difficulty: 2
      };
    }
  },
  {
    id: 'maths.algebra.solveLinear',
    topicKey: 'intro-algebra',
    difficulty: 3,
    templateType: 'NUMERIC',
    generate(seed) {
      const rand = mulberry32(seed + 70);
      const a = Math.floor(rand() * 7) + 2;
      const x = Math.floor(rand() * 9) + 2;
      const b = Math.floor(rand() * 11) + 3;
      const c = a * x + b;
      return {
        stem: `Solve: ${a}x + ${b} = ${c}.`,
        canonicalAnswer: String(x),
        explanation: `${a}x = ${c} - ${b} = ${c - b}. Divide by ${a} to get x = ${x}.`,
        difficulty: 3
      };
    }
  },
  {
    id: 'maths.algebra.substitution',
    topicKey: 'intro-algebra',
    difficulty: 3,
    templateType: 'NUMERIC',
    generate(seed) {
      const rand = mulberry32(seed + 71);
      const x = Math.floor(rand() * 5) + 2;
      const y = Math.floor(rand() * 4) + 1;
      return {
        stem: `If x = ${x} and y = ${y}, evaluate 3x + 2y.`,
        canonicalAnswer: String(3 * x + 2 * y),
        explanation: `3×${x} = ${3 * x}, 2×${y} = ${2 * y}. Sum = ${3 * x + 2 * y}.`,
        difficulty: 2
      };
    }
  },
  {
    id: 'maths.sequences.nextTerm',
    topicKey: 'sequences',
    difficulty: 1,
    templateType: 'NUMERIC',
    generate(seed) {
      const rand = mulberry32(seed + 80);
      const start = Math.floor(rand() * 40) + 5;
      const diff = Math.floor(rand() * 8) + 2;
      return {
        stem: `Find the next term: ${start}, ${start + diff}, ${start + diff * 2}, ?`,
        canonicalAnswer: String(start + diff * 3),
        explanation: `This is an arithmetic sequence with difference ${diff}. Next term is ${start} + 3×${diff} = ${start + diff * 3}.`,
        difficulty: 1
      };
    }
  },
  {
    id: 'maths.sequences.nthTerm',
    topicKey: 'sequences',
    difficulty: 4,
    templateType: 'NUMERIC',
    generate(seed) {
      const rand = mulberry32(seed + 81);
      const a = Math.floor(rand() * 6) + 2;
      const b = Math.floor(rand() * 9) + 1;
      const n = Math.floor(rand() * 5) + 4;
      const nth = a * n + b;
      return {
        stem: `Given the sequence with nth term ${a}n + ${b}, find the ${n}th term.`,
        canonicalAnswer: String(nth),
        explanation: `Substitute n=${n}: ${a}×${n} + ${b} = ${nth}.`,
        difficulty: 4
      };
    }
  },
  {
    id: 'maths.measures.speedDistance',
    topicKey: 'measures',
    difficulty: 3,
    templateType: 'NUMERIC',
    generate(seed) {
      const rand = mulberry32(seed + 90);
      const speed = Math.floor(rand() * 50) + 30;
      const time = Math.floor(rand() * 4) + 2;
      const distance = speed * time;
      return {
        stem: `A car travels at ${speed} km/h for ${time} hours. How far does it travel?`,
        canonicalAnswer: `${distance} km`,
        explanation: `Distance = speed × time = ${speed} × ${time} = ${distance} km.`,
        difficulty: 3
      };
    }
  },
  {
    id: 'maths.measures.timeConversion',
    topicKey: 'measures',
    difficulty: 2,
    templateType: 'NUMERIC',
    generate(seed) {
      const rand = mulberry32(seed + 91);
      const minutes = (Math.floor(rand() * 8) + 2) * 15;
      return {
        stem: `Convert ${minutes} minutes to hours.`,
        canonicalAnswer: `${minutes / 60} hours`,
        explanation: `${minutes} ÷ 60 = ${minutes / 60} hours.`,
        difficulty: 1
      };
    }
  },
  {
    id: 'maths.area.rectangle',
    topicKey: 'area-perimeter',
    difficulty: 1,
    templateType: 'NUMERIC',
    generate(seed) {
      const rand = mulberry32(seed + 100);
      const w = Math.floor(rand() * 9) + 3;
      const h = Math.floor(rand() * 7) + 4;
      return {
        stem: `Find the perimeter of a rectangle ${w} cm by ${h} cm.`,
        canonicalAnswer: `${2 * (w + h)} cm`,
        explanation: `Perimeter = 2×(${w} + ${h}) = ${2 * (w + h)} cm.`,
        difficulty: 1
      };
    }
  },
  {
    id: 'maths.area.triangle',
    topicKey: 'area-perimeter',
    difficulty: 2,
    templateType: 'NUMERIC',
    generate(seed) {
      const rand = mulberry32(seed + 101);
      const base = Math.floor(rand() * 12) + 6;
      const height = Math.floor(rand() * 10) + 5;
      const area = 0.5 * base * height;
      return {
        stem: `Find the area of a triangle with base ${base} cm and height ${height} cm.`,
        canonicalAnswer: `${area} cm²`,
        explanation: `Area = 1/2 × base × height = 0.5 × ${base} × ${height} = ${area} cm².`,
        difficulty: 2
      };
    }
  },
  {
    id: 'maths.volume.cuboid',
    topicKey: 'volume-surface-area',
    difficulty: 2,
    templateType: 'NUMERIC',
    generate(seed) {
      const rand = mulberry32(seed + 110);
      const l = Math.floor(rand() * 6) + 3;
      const w = Math.floor(rand() * 6) + 2;
      const h = Math.floor(rand() * 6) + 2;
      const volume = l * w * h;
      return {
        stem: `Find the volume of a cuboid ${l} cm × ${w} cm × ${h} cm.`,
        canonicalAnswer: `${volume} cm³`,
        explanation: `Volume = ${l} × ${w} × ${h} = ${volume} cm³.`,
        difficulty: 2
      };
    }
  },
  {
    id: 'maths.volume.cylinder',
    topicKey: 'volume-surface-area',
    difficulty: 4,
    templateType: 'NUMERIC',
    generate(seed) {
      const rand = mulberry32(seed + 111);
      const radius = Math.floor(rand() * 5) + 3;
      const height = Math.floor(rand() * 10) + 5;
      const volume = Number((Math.PI * radius * radius * height).toFixed(2));
      return {
        stem: `Calculate the volume of a cylinder with radius ${radius} cm and height ${height} cm (use π ≈ 3.14).`,
        canonicalAnswer: `${volume} cm³`,
        explanation: `Volume = πr²h = 3.14 × ${radius}² × ${height} ≈ ${volume} cm³.`,
        difficulty: 4
      };
    }
  },
  {
    id: 'maths.angles.line',
    topicKey: 'angles-shapes',
    difficulty: 1,
    templateType: 'NUMERIC',
    generate(seed) {
      const rand = mulberry32(seed + 120);
      const angle = Math.floor(rand() * 70) + 30;
      return {
        stem: `Angles on a straight line sum to 180°. If one angle is ${angle}°, find the other.`,
        canonicalAnswer: `${180 - angle}°`,
        explanation: `180° − ${angle}° = ${180 - angle}°.`,
        difficulty: 1
      };
    }
  },
  {
    id: 'maths.angles.triangle',
    topicKey: 'angles-shapes',
    difficulty: 2,
    templateType: 'NUMERIC',
    generate(seed) {
      const rand = mulberry32(seed + 121);
      const a = Math.floor(rand() * 60) + 40;
      const b = Math.floor(rand() * 50) + 30;
      const c = 180 - a - b;
      return {
        stem: `In a triangle, two angles are ${a}° and ${b}°. Find the third angle.`,
        canonicalAnswer: `${c}°`,
        explanation: `Triangle angles sum to 180°. 180° − (${a}° + ${b}°) = ${c}°.`,
        difficulty: 2
      };
    }
  },
  {
    id: 'maths.data.mean',
    topicKey: 'data-handling',
    difficulty: 2,
    templateType: 'NUMERIC',
    generate(seed) {
      const rand = mulberry32(seed + 130);
      const numbers = Array.from({ length: 5 }, () => Math.floor(rand() * 20) + 5);
      const sum = numbers.reduce((acc, curr) => acc + curr, 0);
      const mean = Number((sum / numbers.length).toFixed(1));
      return {
        stem: `Find the mean of ${numbers.join(', ')}.`,
        canonicalAnswer: String(mean),
        explanation: `Total ${sum} ÷ 5 = ${mean}.`,
        difficulty: 2
      };
    }
  },
  {
    id: 'maths.data.range',
    topicKey: 'data-handling',
    difficulty: 1,
    templateType: 'NUMERIC',
    generate(seed) {
      const rand = mulberry32(seed + 131);
      const numbers = Array.from({ length: 6 }, () => Math.floor(rand() * 20) + 1);
      const max = Math.max(...numbers);
      const min = Math.min(...numbers);
      return {
        stem: `Find the range of ${numbers.join(', ')}.`,
        canonicalAnswer: String(max - min),
        explanation: `Range = ${max} − ${min} = ${max - min}.`,
        difficulty: 1
      };
    }
  },
  {
    id: 'maths.word.multiStep',
    topicKey: 'word-problems',
    difficulty: 4,
    templateType: 'NUMERIC',
    generate(seed) {
      const rand = mulberry32(seed + 140);
      const apples = Math.floor(rand() * 20) + 20;
      const cost = Math.floor(rand() * 40) + 60;
      const sold = Math.floor(rand() * apples);
      const priceEach = Math.floor(rand() * 3) + 2;
      const revenue = sold * priceEach;
      const spent = Math.round((cost / 100) * apples);
      const profit = revenue - spent;
      return {
        stem: `A stall buys ${apples} apples at £${(cost / 100).toFixed(2)} each and sells ${sold} apples for £${priceEach} each. What is the profit?`,
        canonicalAnswer: `£${profit}`,
        explanation: `Cost = ${apples} × £${(cost / 100).toFixed(2)} = £${spent}. Revenue = ${sold} × £${priceEach} = £${revenue}. Profit = £${revenue} − £${spent} = £${profit}.`,
        difficulty: 4
      };
    }
  },
  {
    id: 'maths.word.timeTable',
    topicKey: 'word-problems',
    difficulty: 3,
    templateType: 'NUMERIC',
    generate(seed) {
      const rand = mulberry32(seed + 141);
      const train = Math.floor(rand() * 90) + 60;
      const depart = Math.floor(rand() * 6) + 6;
      const arrive = depart + Math.floor(train / 60);
      const minutes = train % 60;
      return {
        stem: `A train leaves at ${depart}:00 and takes ${train} minutes. What time does it arrive?`,
        canonicalAnswer: `${arrive}:${minutes.toString().padStart(2, '0')}`,
        explanation: `${train} minutes = ${Math.floor(train / 60)} hours ${minutes} minutes. Arrival ${depart}:${'00'} + time = ${arrive}:${minutes
          .toString()
          .padStart(2, '0')}.`,
        difficulty: 3
      };
    }
  }
];
