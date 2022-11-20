import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { apiURL } from "../utils/apiURL";

const StoredDataSchema = z.object({
  datasetId: z.number(),
  recordCount: z.number(),
});

const CountrySchema = z.object({
  countryCode: z.string(),
  name: z.string(),
  storedData: z.array(StoredDataSchema),
});

export type Country = z.infer<typeof CountrySchema>;

const CountriesSchema = z.array(CountrySchema);

async function fetchCountries(): Promise<Country[]> {
  const response = await fetch(apiURL + "countries");
  const json = await response.json();
  return CountriesSchema.parse(json);
}

/**
 * fetch the list of countries
 */
export function useCountries(): Country[] | undefined {
  const { error, data } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });
  if (error) throw error;
  return data;
}
