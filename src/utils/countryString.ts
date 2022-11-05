// TODO: test

export function countryString(countries: string[]) {
  if (countries.length === 0) return "none";
  const last = countries.at(-1);
  const rest = countries.slice(0, -1);
  return [rest.join(", "), last].join(" & ");
}
