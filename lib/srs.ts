export interface SrsCardState {
  ease: number;
  intervalDays: number;
  dueAt: string;
  lapses: number;
}

type Quality = 0 | 1 | 2 | 3 | 4 | 5;

export function reviewCard(state: SrsCardState, quality: Quality, reviewedAt = new Date()): SrsCardState {
  const ease = Math.max(130, state.ease + (quality < 3 ? -20 : quality === 3 ? 0 : quality === 4 ? 10 : 20));
  let interval = state.intervalDays;
  if (quality < 3) {
    interval = 1;
  } else if (state.intervalDays === 0) {
    interval = 1;
  } else if (state.intervalDays === 1) {
    interval = 6;
  } else {
    interval = Math.round(state.intervalDays * (ease / 100));
  }
  const dueDate = new Date(reviewedAt);
  dueDate.setDate(dueDate.getDate() + interval);
  return {
    ease,
    intervalDays: interval,
    dueAt: dueDate.toISOString(),
    lapses: quality < 3 ? state.lapses + 1 : state.lapses
  };
}

export function initialCardState(reviewedAt = new Date()): SrsCardState {
  const dueAt = new Date(reviewedAt);
  dueAt.setDate(dueAt.getDate() + 1);
  return { ease: 250, intervalDays: 0, dueAt: dueAt.toISOString(), lapses: 0 };
}
