export function intersects<T>(as: T[], bs: T[]): boolean {
  return as.some((a) => bs.includes(a));
}

function normalize<T>(state: T[]): T[] {
  return state.sort().filter((value: T, i) => value !== state[i - 1]);
}

function add<T>(state: T[], value: T): T[] {
  return normalize([...state, value]);
}

function remove<T>(state: T[], value: T): T[] {
  return normalize(state.filter((value_) => value !== value_));
}

export function setInArray<T>(state: T[], value: T, status: boolean): T[] {
  if (status) {
    return normalize(add(state, value));
  }
  return normalize(remove(state, value));
}
