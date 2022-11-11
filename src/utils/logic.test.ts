import { describe, expect, it } from "vitest";
import { Dataset } from "../hooks/datasets";
import {
  availableRecordCountForDatasets,
  forcastedRecordCount,
  includedCountries,
  selectedDatasets,
} from "./logic";

const dataset1: Dataset = {
  id: 1,
  name: "Name 1",
  label: "label 1",
  description: "set 1",
  thumbnailUrl: "https://picsum.photos/id/1038/92/92",
  costPerRecord: 5,
};
const dataset2: Dataset = {
  id: 2,
  name: "Name 2",
  label: "label 2",
  description: "set 2",
  thumbnailUrl: "https://picsum.photos/id/1038/92/92",
  costPerRecord: 1,
};

const datasets: Dataset[] = [dataset1, dataset2];

const us = {
  countryCode: "US",
  name: "United States",
  storedData: [
    { datasetId: 1, recordCount: 50 },
    { datasetId: 2, recordCount: 0 },
  ],
};
const ca = {
  countryCode: "CA",
  name: "Canada",
  storedData: [
    { datasetId: 1, recordCount: 10 },
    { datasetId: 2, recordCount: 10 },
  ],
};
const fr = {
  countryCode: "FR",
  name: "France",
  storedData: [
    { datasetId: 1, recordCount: 0 },
    { datasetId: 2, recordCount: 10 },
  ],
};
const countries = [us, ca, fr];

describe("includedCountries", () => {
  it("should return the countries having a least one record for provided dataset", () => {
    expect(includedCountries(countries, dataset1)).toEqual([us, ca]);
  });
  it("should throw on invelid datasetId reference", () => {
    expect(() => {
      includedCountries(countries, {
        id: 5,
        name: "Name 2",
        label: "label 2",
        description: "set 2",
        thumbnailUrl: "https://picsum.photos/id/1038/92/92",
        costPerRecord: 1,
      });
    }).toThrowError("datasetId inconsistency");
  });
});
describe("availableRecordCountForDatasets", () => {
  it("should compute the amount of available record for provided countries", () => {
    expect(availableRecordCountForDatasets(countries, datasets, ["CA"])).toBe(
      20
    );
    expect(availableRecordCountForDatasets(countries, datasets, ["US"])).toBe(
      50
    );
    expect(
      availableRecordCountForDatasets(countries, datasets, ["CA", "FR"])
    ).toBe(30);
    expect(availableRecordCountForDatasets(countries, datasets, [])).toBe(0);
  });
});
describe("selectedDatasets", () => {
  it("should select datasets not empty for one provided country", () => {
    expect(selectedDatasets(countries, datasets, ["US"])).toEqual([dataset1]);
    expect(selectedDatasets(countries, datasets, ["CA"])).toEqual([
      dataset1,
      dataset2,
    ]);
    expect(selectedDatasets(countries, datasets, ["US", "FR"])).toEqual([
      dataset1,
      dataset2,
    ]);
  });
});
describe("forcastedRecordCount", () => {
  it("sould compute the amount of record one can buy respected the order parametes", () => {
    expect(
      forcastedRecordCount(countries, datasets, {
        name: "Test buy order",
        datasetIds: [1, 2],
        countries: ["US"],
        budget: 30,
      })
    ).toBe(6);
    expect(
      forcastedRecordCount(countries, datasets, {
        name: "Test buy order",
        datasetIds: [2],
        countries: ["CA", "FR"],
        budget: 600,
      })
    ).toBe(20);
  });
});
