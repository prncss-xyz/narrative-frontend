import { fireEvent, render, screen } from "@testing-library/react";
import {
  CountrySelectorContext,
  GlobalCountrySelector,
  useGlobalCountryList,
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

function Tester() {
  const [countryCodes] = useGlobalCountryList(countries);
  return (
    <>
      <div>
        {countryCodes.map((countryCode) => (
          <div key={countryCode}>{countryCode}</div>
        ))}
      </div>
      <GlobalCountrySelector count={3} countries={countries} />
    </>
  );
}

describe("GlobalCountrySelection", () => {
  it("should toggle country when clicked", () => {
    const { container } = render(
      <CountrySelectorContext>
        <Tester />
      </CountrySelectorContext>
    );
    screen.getByText("US");
    fireEvent.click(screen.getByText("United States"));
    expect(container).toMatchSnapshot();
    expect(() => {
      screen.getByText("US");
    }).toThrow();
  });
});
