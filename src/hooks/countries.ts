import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { apiURL } from "../utils/apiURL";
import { countries } from "../utils/apiSamples";

const isFake = import.meta.env.VITE_FAKE;
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

async function fetchCountries(): Promise<Country[]> {
  let json: object;
  if (isFake) {
    console.log("fetching countries");
    json = countries;
  } else {
    const response = await fetch(apiURL + "countries");
    json = await response.json();
  }
  return CountriesSchema.parse(json);
}

export function useCountries(): Country[] | undefined {
  const { error, data } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });
  if (error) throw error;
  return data;
}
