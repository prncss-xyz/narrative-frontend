import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { apiURL } from "../utils/apiURL";

const DatasetSchema = z.object({
  id: z.number(),
  name: z.string(),
  label: z.string(),
  description: z.string(),
  thumbnailUrl: z.string(),
  costPerRecord: z.number(), // dollars and cents USD (e.g. 250.05)
});

export type Dataset = z.infer<typeof DatasetSchema>;

const DatasetsSchema = z.array(DatasetSchema);

async function fetchDatasets(): Promise<Dataset[]> {
  const response = await fetch(apiURL + "datasets");
  const json = await response.json();
  return DatasetsSchema.parse(json);
}

/**
 * fetch the list of datasets
 */
export function useDatasets(): Dataset[] | undefined {
  const { error, data } = useQuery({
    queryKey: ["datasets"],
    queryFn: fetchDatasets,
  });
  if (error) throw error;
  return data;
}
