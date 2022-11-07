import { Box, Flex, Grid, H1, H3, Img } from "../elements/shared";
import { GlobalCountryList } from "../elements/GlobalCountrySelection";
import { Country, useCountries } from "../hooks/countries";
import { Dataset, useDatasets } from "../hooks/datasets";
import React from "react";
import { Await } from "react-router-dom";

function DatasetItem({ dataset }: { dataset: Dataset }) {
  const available = 4500; // TODO:
  return (
    <Flex
      p={2}
      width={5}
      minHeight={5}
      flexDirection="column"
      backgroundColor="gray2"
    >
      <Flex flexDirection="row">
        <Box minWidth={3} backgroundColor="gray3">
          <Img
            src={dataset.thumbnailUrl}
            width={3}
            height={3}
            alt="dataset thumbnail"
          />
        </Box>
        <Box px={2} width="100%" textAlign="center">
          {dataset.label}
        </Box>
      </Flex>
      <Flex flexDirection="column">
        <H3>Dataset Description</H3>
        <Box>{dataset.description}</Box>
      </Flex>
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <H3 my={0}>Cost Per Record</H3>
        <Box>${dataset.costPerRecord}</Box>
      </Flex>
      <Flex flexDirection="row" justifyContent="space-between">
        <H3 my={0}>Available Records</H3>
        <Box>{`${available} records`}</Box>
      </Flex>
    </Flex>
  );
}

function DatasetListFetch() {
  const datasetsPromise = useDatasets();
  const countriesPromise = useCountries();
  const resolve = Promise.all([datasetsPromise, countriesPromise]);
  return (
    <React.Suspense>
      <Await
        resolve={resolve}
        children={([datasets, countries]: [Dataset[], Country[]]) => (
          <Flex flexDirection="row" justifyContent="center">
            <Box>
              <GlobalCountryList
                count={datasets.length}
                countries={countries}
              />
              <Grid
                gridTemplateColumns={"auto auto"}
                alignItems="start"
                gridRowGap={2}
                gridColumnGap={2}
              >
                {datasets.map((dataset) => (
                  <div key={dataset.id}>
                    <DatasetItem dataset={dataset} />
                  </div>
                ))}
              </Grid>
            </Box>
          </Flex>
        )}
      />
    </React.Suspense>
  );
}

export default function DatasetList() {
  return (
    <>
      <H1>Datasets</H1>
      <DatasetListFetch />
    </>
  );
}
