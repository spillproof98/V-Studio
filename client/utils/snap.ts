export const GRID_SIZE = 0.1; // seconds (100ms)

export function snap(value: number): number {
  return Math.round(value / GRID_SIZE) * GRID_SIZE;
}
