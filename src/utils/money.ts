export function convertMoney(value: string): number | undefined {
  if (value.endsWith(".")) value = value.slice(0, -1);
  const num = Number(value);
  if (num >= 0) return num;
  return;
}

export function normalizeMoney(value: string) {
  const index = value.indexOf(".");
  if (index === -1) return value;
  return value.slice(0, index + 3);
}
