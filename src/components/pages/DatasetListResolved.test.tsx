import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FormBuyOrder } from "../BuyOrderForm";
import { CountrySelectorContext } from "../GlobalCountrySelection";
import { DatasetListResolved } from "./DatasetListResolved";

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

export const datasets = [
  {
    id: 1,
    name: "fishing",
    label: "Fishing Zones",
    description:
      "Data about global fishing zones, including yields, historical trends and ocean life surveys.",
    thumbnailUrl: "https://picsum.photos/id/1038/92/92",
    costPerRecord: 0.03,
  },
  {
    id: 2,
    name: "shipping",
    label: "Shipping Routes",
    description:
      "Metadata regarding global shipping routes. Contains data such as traffic volumne, operating restrictiona and mileage of routes.",
    thumbnailUrl: "https://picsum.photos/id/1002/92/92",
    costPerRecord: 0.05,
  },
  {
    id: 3,
    name: "ports",
    label: "Ports of Entry",
    description: "Detailed information about ports related to cargo shipping.",
    thumbnailUrl: "https://picsum.photos/id/1026/92/92",
    costPerRecord: 0.02,
  },
  {
    id: 4,
    name: "ocean",
    label: "Ocean Measurements",
    description:
      "Detailed measurements of many ocean locations, including LAT/LON, temperature, humidity and precipitation.",
    thumbnailUrl: "https://picsum.photos/id/1024/92/92",
    costPerRecord: 0.01,
  },
  {
    id: 5,
    name: "weather",
    label: "Weather and Climate",
    description: "Historical averages and trends of oceanographic climate.",
    thumbnailUrl: "https://picsum.photos/id/135/92/92",
    costPerRecord: 0.04,
  },
];

describe("BuyOrderForm", () => {
  it("should render correctly", () => {
    const queryClient = new QueryClient();
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <CountrySelectorContext>
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <DatasetListResolved
                    countries={countries}
                    datasets={datasets}
                  />
                }
              ></Route>
            </Routes>
          </Router>
        </CountrySelectorContext>
      </QueryClientProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
