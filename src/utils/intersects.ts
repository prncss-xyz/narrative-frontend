export function intersects<T>(as: T[], bs: T[]): boolean {
  return as.some((a) => bs.includes(a));
}
