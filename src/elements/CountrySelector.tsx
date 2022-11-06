import { createContext, ReactNode, useContext, useReducer } from "react";
import { Country, useCountries } from "../hooks/countries";
import { Clickable } from "./Clickable";
import { Box, Flex, H3 } from "./shared";
import { Mode } from "../utils/mode";

function normalize<T>(a: T[]) {
  a.sort();
  return a.filter((value, index, a_) => index === 0 || a_[index - 1] !== value);
}

type State = string[];
type Action =
  | { type: "ADD"; countryCode: string }
  | { type: "REMOVE"; countryCode: string };
type Dispatch = (a: Action) => void;

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "ADD":
      return normalize([...state, action.countryCode]);
    case "REMOVE":
      return state.filter((countryCode) => countryCode !== action.countryCode);
  }
}

export function CountryButton({
  country: { name, countryCode },
  active,
  dispatch,
  mode,
}: {
  country: Country;
  active: boolean;
  dispatch: Dispatch;
  mode: Mode;
}) {
  return (
    <Clickable
      disabled={mode === Mode.View}
      onClick={() => dispatch({ type: active ? "REMOVE" : "ADD", countryCode })}
    >
      <Box
        p={1}
        backgroundColor={active ? "white" : "gray3"}
        border="solid"
        borderRadius={3}
      >
        {name}
      </Box>
    </Clickable>
  );
}

const Context = createContext<[State, Dispatch] | null>(null);

export function CountrySelectorContext({
  children,
  init,
}: {
  children: ReactNode;
  init?: string[];
}) {
  const countries = useCountries();
  if (init === undefined) {
    init = normalize(countries.map((country) => country.countryCode));
  }
  const [state, dispatch] = useReducer(reducer, init);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
}

export function useCountrySelectorList() {
  const context = useContext(Context);
  if (!context)
    throw new Error(
      "useCountrySelectorList should always be used inside CountrySelectorContext"
    );
  const [state] = context;
  const countries = useCountries();
  countries.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
  return countries
    .filter((country) => state.includes(country.countryCode))
    .map((country) => country.name);
}

export function CountrySelector({ mode }: { mode: Mode }) {
  const countries = useCountries();
  countries.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
  const context = useContext(Context);
  if (!context)
    throw new Error(
      "CountrySelector should always be used inside CountrySelectorContext"
    );
  const [state, dispatch] = context;
  return (
    <Box>
      <H3>Included countries</H3>
      <Flex gap={3}>
        {countries.map((country) => (
          <div key={country.countryCode}>
            <CountryButton
              country={country}
              active={state.includes(country.countryCode)}
              dispatch={dispatch}
              mode={mode}
            />
          </div>
        ))}
      </Flex>
    </Box>
  );
}
