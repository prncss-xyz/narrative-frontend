import { fireEvent, render, screen } from "@testing-library/react";
import {
  CountrySelectorContext,
  GlobalCountrySelector,
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
      <GlobalCountrySelector count={3} countries={countries} />;
    </CountrySelectorContext>
  );
}

// TODO:
describe.todo("GlobalCountrySelection", () => {
  it("should be visible", () => {
    const { container } = render(
      <CountrySelectorContext>
        <GlobalCountrySelector count={3} countries={countries} />
      </CountrySelectorContext>
    );
    expect(container).toMatchSnapshot();
    expect(() => {
      screen.getByText("United States");
    }).toThrowError();
    fireEvent.click(screen.getByText("Showing"));
    // const s1 = JSON.stringify(screen.getByText("United States"));
    fireEvent.click(screen.getByText("United States"));
  });
});
