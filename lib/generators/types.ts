export type GeneratorResult = {
  stem: string;
  choices?: string[];
  canonicalAnswer: string;
  explanation: string;
  difficulty: number;
};

export type Generator = (seed: number) => GeneratorResult;
