import { createContext, useContext, useState } from "react";
import { Country } from "../hooks/countries";
import { Box, Flex, H3 } from "./basics";
import { Clickable } from "./Clickable";
import { Overlay } from "./Overlay";
import { RoundedButton } from "./RoundedButton";
import { TogglingSelector } from "./TogglingSelector";

type CountryCodes = string[];

const Context = createContext<
  null | [null | CountryCodes, (state: CountryCodes) => void]
>(null);

export function countryString(
  countries: Country[],
  activeCountryCodes: string[]
) {
  const activeCountryNames = countries
    .filter(({ countryCode }) => activeCountryCodes.includes(countryCode))
    .map(({ name }) => name)
    .sort();
  if (activeCountryNames.length === 0) return "none";
  if (activeCountryNames.length === 1) return activeCountryNames[0];
  const last = activeCountryNames.at(-1);
  const rest = activeCountryNames.slice(0, -1);
  return [rest.join(", "), last].join(" & ");
}

export function CountrySelectorContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeCountryCodes, setActiveCountryCodes] = useState<null | string[]>(
    null
  );
  return (
    <Context.Provider value={[activeCountryCodes, setActiveCountryCodes]}>
      {children}
    </Context.Provider>
  );
}

export function useGlobalCountyList(
  countries: Country[]
): [CountryCodes, (state: CountryCodes) => void] {
  const context = useContext(Context);
  if (!context)
    throw new Error(
      "CountrySelector should always be used inside CountrySelectorContext"
    );
  // eslint-disable-next-line prefer-const
  let [activeCountryCodes, setActiveCountryCodes] = context;
  activeCountryCodes ??= countries.map((country) => country.countryCode);
  return [activeCountryCodes, setActiveCountryCodes];
}

export function sortCountriesByName(countries: Country[]) {
  return [...countries].sort((a, b) =>
    a.name < b.name ? -1 : a.name > b.name ? 1 : 0
  );
}

export function GlobalCountrySelector({ countries }: { countries: Country[] }) {
  countries = sortCountriesByName(countries);
  const [activeCountryCodes, setActiveCountryCodes] =
    useGlobalCountyList(countries);
  return (
    <Box>
      <H3>Included countries</H3>
      <Flex gap={3}>
        <TogglingSelector
          state={activeCountryCodes}
          setState={setActiveCountryCodes}
          items={countries.map((country) => ({
            key: country.countryCode,
            toElem: (props) => (
              <RoundedButton {...props}>{country.name}</RoundedButton>
            ),
          }))}
        />
      </Flex>
    </Box>
  );
}

export function GlobalCountrySelectionSummary({
  count,
  countries,
}: {
  count: number;
  countries: Country[];
}) {
  countries = sortCountriesByName(countries);
  const [activeCountryCodes, setActiveCountryCodes] =
    useGlobalCountyList(countries);
  return (
    <Flex color="tone4">
      <Box>Showing</Box>
      <Box color="text" fontWeight="bold">
        &nbsp;{count}&nbsp;
      </Box>
      <Box>results from</Box>
      <Box color="text" fontWeight="bold">
        &nbsp;{countryString(countries, activeCountryCodes)}&nbsp;
      </Box>
    </Flex>
  );
}
