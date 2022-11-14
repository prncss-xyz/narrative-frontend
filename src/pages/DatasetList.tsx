import { useState } from "react";
import { Box, Flex, Grid, H2, H3, Img } from "../elements/basics";
import { Clickable } from "../elements/Clickable";
import {
  countryString,
  GlobalCountrySelectionSummary,
  GlobalCountrySelector,
  useGlobalCountyList,
} from "../elements/GlobalCountrySelection";
import { Loading } from "../elements/Loading";
import { Overlay } from "../elements/Overlay";
import { Country, useCountries } from "../hooks/countries";
import { Dataset, useDatasets } from "../hooks/datasets";
import {
  availableRecordCountForDataset,
  includedCountries,
  selectedDatasets,
} from "../utils/logic";

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
      p={2}
      width={5}
      minHeight={5}
      flexDirection="column"
      backgroundColor="tone3"
    >
      <Flex flexDirection="row">
        <Box maxHeight={3} minWidth={3} backgroundColor="tone1">
          <Img
            src={dataset.thumbnailUrl}
            width={3}
            height={3}
            alt="dataset thumbnail"
          />
        </Box>
        <H2 px={2} width="100%" textAlign="center">
          {dataset.label}
        </H2>
      </Flex>
      <Flex flexDirection="column">
        <H3>Dataset Description</H3>
        <Box>{dataset.description}</Box>
      </Flex>
      <Flex flexDirection="column" justifyContent="space-between">
        <H3 my={0}>Included countries</H3>
        <Box>
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

function Resolved({
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
            gridRowGap={2}
            gridColumnGap={2}
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

function Fetch() {
  const datasets = useDatasets();
  const countries = useCountries();
  if (!datasets || !countries) return <Loading />;
  return <Resolved datasets={datasets} countries={countries} />;
}

export default function DatasetListPage() {
  return <Fetch />;
}
