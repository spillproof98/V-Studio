import { create } from "zustand";

type HistoryState<T> = {
  past: T[];
  present: T | null;
  future: T[];
};

type HistoryStore<T = any> = {
  history: HistoryState<T>;
  set: (next: T) => void;
  undo: () => T | null;
  redo: () => T | null;
};

export const useHistoryStore = create<HistoryStore>((set, get) => ({
  history: {
    past: [],
    present: null,
    future: [],
  },

  set: (next) =>
    set((s) => ({
      history: {
        past: s.history.present
          ? [...s.history.past, s.history.present]
          : s.history.past,
        present: next,
        future: [],
      },
    })),

  undo: () => {
    const { history } = get();
    if (!history.past.length) return null;

    const previous = history.past.at(-1)!;

    set({
      history: {
        past: history.past.slice(0, -1),
        present: previous,
        future: history.present
          ? [history.present, ...history.future]
          : history.future,
      },
    });

    return previous;
  },

  redo: () => {
    const { history } = get();
    if (!history.future.length) return null;

    const next = history.future[0];

    set({
      history: {
        past: history.present
          ? [...history.past, history.present]
          : history.past,
        present: next,
        future: history.future.slice(1),
      },
    });

    return next;
  },
}));
