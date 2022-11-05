import { z } from "zod";
import { datasets } from "../utils/samples.test";

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

export function useDataset(id: number) {
  const dataset = datasets.find((b) => b.id === id);
  if (!dataset) return undefined;
  return DatasetsSchema.parse(dataset);
}

export function useDatasets() {
  return DatasetsSchema.parse(datasets);
}
