import { z } from "zod";
import { countries } from "../utils/samples.test";

const StoredDataSchema = z.object({
  datasetId: z.number(),
  recordCount: z.number(),
});

export type StoredData = z.infer<typeof StoredDataSchema>;

const CountrySchema = z.object({
  countryCode: z.string(),
  name: z.string(),
  storedData: z.array(StoredDataSchema),
});

export type Country = z.infer<typeof CountrySchema>;

const CountriesSchema = z.array(CountrySchema);

export function useCountries() {
  return CountriesSchema.parse(countries);
}
