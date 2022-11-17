import { ProBuyOrder } from "../hooks/buyOrders";
import { Country } from "../hooks/countries";
import { Dataset } from "../hooks/datasets";
import { intersects } from "./arrays";

function getRecordCount(country: Country, dataset: Dataset): number {
  const data = country.storedData.find((data) => data.datasetId === dataset.id);
  if (!data) throw new Error("datasetId inconsistency");
  return data.recordCount;
}

export function includedCountries(
  countries: Country[],
  dataset: Dataset
): Country[] {
  return countries.filter((country) => getRecordCount(country, dataset) > 0);
}

export function availableRecordCountForDataset(
  countries: Country[],
  dataset: Dataset,
  activeCountries: string[]
): number {
  return countries
    .filter((country) => activeCountries.includes(country.countryCode))
    .map((country) => getRecordCount(country, dataset))
    .reduce((a, b) => a + b, 0);
}

export function availableRecordCountForDatasets(
  countries: Country[],
  datasets: Dataset[],
  activeCountries: string[]
): number {
  return datasets
    .map((dataset) =>
      availableRecordCountForDataset(countries, dataset, activeCountries)
    )
    .reduce((a, b) => a + b, 0);
}

export function selectedDatasets(
  countries: Country[],
  datasets: Dataset[],
  selectedCountryCodes: string[]
): Dataset[] {
  return datasets.filter((dataset) =>
    intersects(
      selectedCountryCodes,
      includedCountries(countries, dataset).map(
        (country) => country.countryCode
      )
    )
  );
}

export function forcastedRecordCount(
  countries: Country[],
  datasets: Dataset[],
  buyOrder: ProBuyOrder
): number {
  let cummulCost = 0;
  let forcasted = 0;
  datasets = [...datasets].sort((a, b) => a.costPerRecord - b.costPerRecord);
  for (const dataset of datasets) {
    if (!buyOrder.datasetIds.includes(dataset.id)) continue;
    const available = availableRecordCountForDataset(
      countries,
      dataset,
      buyOrder.countries
    );
    const amount = Math.min(
      available,
      Math.floor((buyOrder.budget - cummulCost) / dataset.costPerRecord)
    );
    forcasted += amount;
    cummulCost += amount * dataset.costPerRecord;
  }
  return forcasted;
}
