import { Box, Flex, H1, H2 } from "../elements/shared";
import { Showing } from "../elements/Showing";
import { Dataset, useDatasets } from "../hooks/datasets";
import { useTheme } from "@emotion/react";

function DatasetItem({ dataset }: { dataset: Dataset }) {
  const available = 4500; // TODO:
  const theme = useTheme() as any;
  const imgSide = theme.space[6];
  return (
    <Flex
      p={2}
      width={theme.space[8]}
      minHeight={theme.space[8]}
      flexDirection="column"
      backgroundColor="gray2"
    >
      <Flex flexDirection="row">
        <Box minWidth={imgSide} backgroundColor="gray3">
          <img
            src={dataset.thumbnailUrl}
            width={imgSide}
            height={imgSide}
            alt="dataset thumbnail"
          />
        </Box>
        <Box
          px={2}
          width="100%"
          css={{
            textAlign: "center",
          }}
        >
          {dataset.label}
        </Box>
      </Flex>
      <Flex flexDirection="column">
        <H2>Dataset Description</H2>
        <Box>{dataset.description}</Box>
      </Flex>
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <H2 my={0}>Cost Per Record</H2>
        <Box css={{}}>${dataset.costPerRecord}</Box>
      </Flex>
      <Flex flexDirection="row" justifyContent="space-between">
        <H2 my={0}>Available Records</H2>
        <Box>{`${available} records`}</Box>
      </Flex>
    </Flex>
  );
}

export default function Datasets() {
  const countries = ["United States", "Canada"];
  const dataSets = useDatasets();
  const orderCount = dataSets.length;
  const theme = useTheme() as any;
  return (
    <div>
      <H1>Datasets</H1>
      <Showing count={orderCount} countries={countries} />
      <Flex flexDirection="column" css={{ gap: theme.space[2] }}>
        {dataSets.map((dataset) => (
          <div key={dataset.id}>
            <DatasetItem dataset={dataset} />
          </div>
        ))}
      </Flex>
    </div>
  );
}
