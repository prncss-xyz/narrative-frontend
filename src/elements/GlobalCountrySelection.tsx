import { Flex, Box, H3 } from "./basics";
import { Overlay } from "./Overlay";
import { Clickable } from "./Clickable";
import { createContext, useContext, useState } from "react";
import { Country } from "../hooks/countries";
import { RoundedButton } from "./RoundedButton";
import { TogglingSelector } from "./TogglingSelector";

type State = string[];

const Context = createContext<null | [null | State, (state: State) => void]>(
  null
);

export function countryString(countries: Country[], activeCountries: string[]) {
  const activeCountryNames = countries
    .filter(({ countryCode }) => activeCountries.includes(countryCode))
    .map(({ name }) => name)
    .sort();
  if (activeCountryNames.length === 0) return "none";
  const last = activeCountryNames.at(-1);
  const rest = activeCountryNames.slice(0, -1);
  return [rest.join(", "), last].join(" & ");
}

export function CountrySelectorContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeCountries, setActiveCountries] = useState<null | string[]>(null);
  return (
    <Context.Provider value={[activeCountries, setActiveCountries]}>
      {children}
    </Context.Provider>
  );
}

export function useGlobalCountyList(
  countries: Country[]
): [State, (state: State) => void] {
  const context = useContext(Context);
  if (!context)
    throw new Error(
      "CountrySelector should always be used inside CountrySelectorContext"
    );
  let [activeCountries, setActiveCountries] = context;
  activeCountries ??= countries.map((country) => country.countryCode);
  return [activeCountries, setActiveCountries];
}

export function sortCountriesByName(countries: Country[]) {
  return [...countries].sort((a, b) =>
    a.name < b.name ? -1 : a.name > b.name ? 1 : 0
  );
}

export function GlobalCountryList({
  count,
  countries,
}: {
  count: number;
  countries: Country[];
}) {
  const [overlayVisible, setOverlayVisible] = useState(false);
  countries = sortCountriesByName(countries);
  const [activeCountries, setActiveCountries] = useGlobalCountyList(countries);
  return (
    <>
      <Overlay
        visible={overlayVisible}
        onClickOutside={() => setOverlayVisible(false)}
      >
        <Box>
          <H3>Included countries</H3>
          <Flex gap={3}>
            <TogglingSelector
              state={activeCountries}
              setState={setActiveCountries}
              items={countries.map((country) => ({
                key: country.countryCode,
                toElem: (props) => (
                  <RoundedButton {...props}>{country.name}</RoundedButton>
                ),
              }))}
            />
          </Flex>
        </Box>
      </Overlay>
      <Clickable onClick={() => setOverlayVisible(true)}>
        <Flex color="gray1">
          <Box>Showing</Box>
          <Box color="black" fontWeight="bold">
            &nbsp;{count}&nbsp;
          </Box>
          <Box>results from</Box>
          <Box color="black" fontWeight="bold">
            &nbsp;{countryString(countries, activeCountries)}&nbsp;
          </Box>
        </Flex>
      </Clickable>
    </>
  );
}
