import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import config from "../config";
import { datasets } from "../utils/api_samples";

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

function fetchDatasets() {
  if (config.isFake) {
    console.log("fetching datasets");
    return Promise.resolve(DatasetsSchema.parse(datasets));
  }
  return Promise.reject({ message: "TODO" });
}

export function useDatasets(): [unknown, undefined | Dataset[]] {
  const { error, data } = useQuery({
    queryKey: ["/datasets"],
    queryFn: fetchDatasets,
  });
  return [error, data];
}
