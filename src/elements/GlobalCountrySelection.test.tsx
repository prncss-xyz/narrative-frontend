import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRef } from "react";
import { act } from "react-dom/test-utils";
import {
  CountrySelectorContext,
  GlobalCountrySelection,
  useGlobalCountyList,
} from "./GlobalCountrySelection";

export const countries = [
  {
    countryCode: "US",
    name: "United States",
    storedData: [
      { datasetId: 1, recordCount: 500 },
      { datasetId: 2, recordCount: 0 },
      { datasetId: 3, recordCount: 2500 },
      { datasetId: 4, recordCount: 750 },
      { datasetId: 5, recordCount: 50 },
      { datasetId: 6, recordCount: 1000 },
    ],
  },
  {
    countryCode: "GB",
    name: "United Kingdom",
    storedData: [
      { datasetId: 1, recordCount: 0 },
      { datasetId: 2, recordCount: 1250 },
      { datasetId: 3, recordCount: 2000 },
      { datasetId: 4, recordCount: 1500 },
      { datasetId: 5, recordCount: 500 },
      { datasetId: 6, recordCount: 500 },
    ],
  },
];

function Container(spy: (activeCountryCodes: string[]) => void) {
  const activeCountryCodes = useGlobalCountyList(countries);
  // spy(activeCountryCodes);
  return (
    <CountrySelectorContext>
      <GlobalCountrySelection count={3} countries={countries} />;
    </CountrySelectorContext>
  );
}

describe.todo("GlobalCountrySelection", async () => {
  const { container } = render(
    <CountrySelectorContext>
      <GlobalCountrySelection count={3} countries={countries} />;
    </CountrySelectorContext>
  );
  it("should match snapshot", () => {
    expect(container).toMatchSnapshot();
  });
  it("should not be invisible", () => {
    expect(() => {
      screen.getByText("United States");
    }).toThrowError();
  });
  await userEvent.click(screen.getByText("Showing"));
  await screen.findByText("United States");
  // const s1 = JSON.stringify(screen.getByText("United States"));
  await userEvent.click(screen.getByText("United States"));
});
