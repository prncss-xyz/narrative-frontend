import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { apiURL } from "../utils/apiURL";
import { datasets } from "../utils/apiSamples";

const isFake = import.meta.env.VITE_FAKE;
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

export type Datasets = z.infer<typeof DatasetsSchema>;

async function fetchDatasets(): Promise<Dataset[]> {
  let json: object;
  if (isFake) {
    console.log("fetching datasets");
    json = datasets;
  } else {
    const response = await fetch(apiURL + "datasets");
    json = await response.json();
  }
  return DatasetsSchema.parse(json);
}

export function useDatasets(): Dataset[] | undefined {
  const { error, data } = useQuery({
    queryKey: ["datasets"],
    queryFn: fetchDatasets,
  });
  if (error) throw error;
  return data;
}
