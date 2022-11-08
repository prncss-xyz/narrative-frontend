import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import config from "../config";
import { countries } from "../utils/api_samples";

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

function fetchCountries() {
  if (config.isFake) {
    console.log("fetching countries");
    return Promise.resolve(CountriesSchema.parse(countries));
  }
  return Promise.reject({ message: "TODO" });
}

export function useCountries(): [unknown, undefined | Country[]] {
  const { error, data } = useQuery({
    queryKey: ["/countries"],
    queryFn: fetchCountries,
  });
  return [error, data];
}
