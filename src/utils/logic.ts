import { BuyOrder } from "../hooks/buyOrders";

export interface Dataset {
  id: number;
  name: string;
  label: string;
  description: string;
  thumbnailUrl: string;
  costPerRecord: number; // dollars and cents USD (e.g. 250.05)
}

export interface StoredData {
  datasetId: number;
  recordCount: number;
}

export interface Country {
  countryCode: string;
  name: string;
  storedData: StoredData[];
}

/**
 * Only show Buy Orders that contain at least one country currently selected in the Country Selection Control.
 * @param countries - the globally configure the list of countries reflected in the Buy Order Listing and Datasets pages
 * @returns list of their current Buy Orders
 */
export function prepareOrder(
  buyOrder: BuyOrder,
  countries: Country[],
  datasets: Dataset[]
) {
  const filteredCountries = countries.filter((country) =>
    buyOrder.countries.includes(country.countryCode)
  );
  const sortedDatasets = datasets.filter((dataset) =>
    buyOrder.datasetIds.includes(dataset.id)
  );
  sortedDatasets.sort((a, b) => a.costPerRecord - b.costPerRecord);
  let totalCost = 0;
  let forcasted = 0;
  let available = 0;
  let orderDatasetsIds: number[] = [];
  for (const dataset of sortedDatasets) {
    let first = true;
    for (const country of filteredCountries) {
      const dataForCountry = country.storedData.find(
        (d) => d.datasetId === dataset.id
      );
      if (dataForCountry) {
        const amount = Math.min(
          Math.floor((buyOrder.budget - totalCost) / dataset.costPerRecord),
          dataForCountry.recordCount
        );
        forcasted += amount;
        available += dataForCountry.recordCount;
        totalCost += amount * dataset.costPerRecord;
        // Avoid entering same dataset twice
        if (first) {
          orderDatasetsIds.push(dataset.id);
          first = false;
        }
      }
    }
  }
  return {
    totalCost,
    available,
    forcasted,
    orderDatasetsIds,
  };
}
