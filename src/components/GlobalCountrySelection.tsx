import { createContext, useContext, useState } from "react";
import { Country } from "../hooks/countries";
import { setInArray } from "../utils/arrays";
import { Box, Flex, H3 } from "./basics";
import { ToggleButton } from "./ToggleButton";
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

export function GlobalCountrySelector({
  countries,
  ...props
}: {
  countries: Country[];
  [prop: string]: unknown; // TODO: could be more restrictive
}) {
  countries = sortCountriesByName(countries);
  const [activeCountryCodes, setActiveCountryCodes] =
    useGlobalCountyList(countries);
  return (
    <Box>
      <H3>Included countries</H3>
      <Flex gap={3} {...props}>
        {countries.map((country) => (
          <div key={country.countryCode}>
            <ToggleButton
              active={activeCountryCodes.includes(country.countryCode)}
              setActive={(status) =>
                // status
                setActiveCountryCodes(
                  // activeCountryCodes
                  setInArray(activeCountryCodes, country.countryCode, status)
                )
              }
            >
              {country.name}
            </ToggleButton>
          </div>
        ))}
      </Flex>
    </Box>
  );
}

export function GlobalCountrySelectionSummary({
  count,
  countries,
  ...props
}: {
  count: number;
  countries: Country[];
  [prop: string]: unknown; // TODO: could be more restrictive
}) {
  countries = sortCountriesByName(countries);
  const [activeCountryCodes, setActiveCountryCodes] =
    useGlobalCountyList(countries);
  return (
    <Flex
      justifyItems="start"
      flexWrap="wrap"
      color="muted"
      alignItems="baseline"
      pb={2}
      textAlign="left"
      columnGap="0.4em"
      {...props}
    >
      <Box display="inline">Showing</Box>
      <Box display="inline" color="text" fontWeight="bold">
        {count}
      </Box>
      <Box display="inline">{count === 1 ? "result" : "results"} from</Box>
      <Box display="inline" color="text" fontWeight="bold">
        {countryString(countries, activeCountryCodes)}
      </Box>
    </Flex>
  );
}
