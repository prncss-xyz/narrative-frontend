import { Dataset, useDatasets } from "../hooks/datasets";
import { Box, Flex, Grid, Img } from "./shared";

function DatasetItem({ dataset }: { dataset: Dataset }) {
  return (
    <Flex p={1} flexDirection="row" backgroundColor="gray3" gap={2}>
      <Flex minWidth={1} flexDirection="column" justifyContent="center">
        <Img
          src={dataset.thumbnailUrl}
          width={1}
          height={1}
          alt="dataset thumbnail"
        />
      </Flex>
      <Flex flexDirection="column">
        <Box>{dataset.label}</Box>
        <Box color="gray1">${dataset.costPerRecord} per record</Box>
      </Flex>
    </Flex>
  );
}

export function DatasetsSmall() {
  const dataSets = useDatasets();
  return (
    <Box>
      <Grid
        gridTemplateColumns={"1fr 1fr"}
        alignItems="start"
        gridRowGap={2}
        gridColumnGap={2}
      >
        {dataSets.map((dataset) => (
          <div key={dataset.id}>
            <DatasetItem dataset={dataset} />
          </div>
        ))}
      </Grid>
    </Box>
  );
}
