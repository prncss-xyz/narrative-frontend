import { useState } from "react";
import { Country } from "../../hooks/countries";
import { Dataset } from "../../hooks/datasets";
import {
  availableRecordCountForDataset,
  includedCountries,
  selectedDatasets,
} from "../../utils/logic";
import { Box, Flex, Grid, H2, H3, Img } from "../basics";
import { Clickable } from "../Clickable";
import {
  countryString,
  GlobalCountrySelectionSummary,
  GlobalCountrySelector,
  useGlobalCountyList,
} from "../GlobalCountrySelection";
import { Overlay } from "../Overlay";

function DatasetItem({
  dataset,
  countries,
}: {
  dataset: Dataset;
  countries: Country[];
}) {
  const [activeCountryCodes] = useGlobalCountyList(countries);
  const available = availableRecordCountForDataset(
    countries,
    dataset,
    activeCountryCodes
  );
  return (
    <Flex
      p={3}
      gap={2}
      width={5}
      minHeight={5}
      flexDirection="column"
      backgroundColor="bgDark"
    >
      <Flex flexDirection="row" gap={2}>
        <Box maxHeight={3} minWidth={3} backgroundColor="bgLight">
          <Img
            src={dataset.thumbnailUrl}
            width={3}
            height={3}
            alt="dataset thumbnail"
          />
        </Box>
        <Flex alignItems="center" width="100%">
          <H2 my={0} width="100%">
            {dataset.label}
          </H2>
        </Flex>
      </Flex>
      <Flex flexDirection="column">
        <H3>Dataset Description</H3>
        <Box fontSize={1}>{dataset.description}</Box>
      </Flex>
      <Flex flexDirection="column" justifyContent="space-between">
        <H3 my={0}>Included countries</H3>
        <Box fontSize={1}>
          {countryString(
            countries,
            includedCountries(countries, dataset).map(
              (country) => country.countryCode
            )
          )}
        </Box>
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

export function DatasetListResolved({
  datasets,
  countries,
}: {
  datasets: Dataset[];
  countries: Country[];
}) {
  const [activeCountryCodes] = useGlobalCountyList(countries);
  const selected = selectedDatasets(countries, datasets, activeCountryCodes);
  const [overlayVisible, setOverlayvisible] = useState(false);
  return (
    <>
      <Overlay
        visible={overlayVisible}
        setVisible={() => setOverlayvisible(false)}
      >
        <GlobalCountrySelector countries={countries} />
      </Overlay>
      <Flex flexDirection="row" justifyContent="center">
        <Box>
          <Clickable onClick={() => setOverlayvisible(true)}>
            <GlobalCountrySelectionSummary
              count={selected.length}
              countries={countries}
            />
          </Clickable>
          <Grid
            gridTemplateColumns={"auto auto"}
            alignItems="start"
            gridRowGap={4}
            gridColumnGap={4}
          >
            {selected.map((dataset) => (
              <div key={dataset.id}>
                <DatasetItem dataset={dataset} countries={countries} />
              </div>
            ))}
          </Grid>
        </Box>
      </Flex>
    </>
  );
}
