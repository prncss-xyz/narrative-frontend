/**
 * whether two arrays have a common element
 */
export function intersects<T>(as: T[], bs: T[]): boolean {
  return as.some((a) => bs.includes(a));
}

/**
 * returns a sorted and deduped copy of a list
 */
function normalize<T>(state: T[]): T[] {
  return state.sort().filter((value: T, i) => value !== state[i - 1]);
}

/**
 * retruns a normalized copy of an array with value added
 */
function add<T>(state: T[], value: T): T[] {
  return normalize([...state, value]);
}

/**
 * retruns a normalized copy of an array with value remove
 */
function remove<T>(state: T[], value: T): T[] {
  return normalize(state.filter((value_) => value !== value_));
}

/**
 * sets the presence or absence of a value in array
 * @param state - incomming array
 * @param value - target value
 * @param status - wether this value should be included in the resultion array
 * @returns a normalized copy
 */
export function setPresenceInArray<T>(
  state: T[],
  value: T,
  status: boolean
): T[] {
  if (status) {
    return normalize(add(state, value));
  }
  return normalize(remove(state, value));
}
