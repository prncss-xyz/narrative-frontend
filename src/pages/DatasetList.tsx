import { Box, Flex, Grid, H2, Img } from "../elements/basics";
import {
  countryString,
  GlobalCountryList,
  useGlobalCountyList,
} from "../elements/GlobalCountrySelection";
import { Loading } from "../elements/Loading";
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
        <H2>Dataset Description</H2>
        <Box>{dataset.description}</Box>
      </Flex>
      <Flex flexDirection="column" justifyContent="space-between">
        <H2 my={0}>Included countries</H2>
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
        <H2 my={0}>Cost Per Record</H2>
        <Box>${dataset.costPerRecord}</Box>
      </Flex>
      <Flex flexDirection="row" justifyContent="space-between">
        <H2 my={0}>Available Records</H2>
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
  return (
    <Flex flexDirection="row" justifyContent="center">
      <Box>
        <GlobalCountryList count={selected.length} countries={countries} />
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
