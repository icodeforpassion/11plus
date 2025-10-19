export function expectedScore(theta: number, difficulty: number) {
  const diffRating = difficultyToRating(difficulty);
  return 1 / (1 + Math.pow(10, (diffRating - theta) / 400));
}

export function updateElo(theta: number, difficulty: number, correct: boolean, k = 16) {
  const expected = expectedScore(theta, difficulty);
  const outcome = correct ? 1 : 0;
  return theta + k * (outcome - expected);
}

export function difficultyToRating(difficulty: number) {
  return 1200 + (difficulty - 3) * 100;
}
