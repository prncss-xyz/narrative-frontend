import { Box, Flex, Grid, H1, H2, Img } from "../elements/basics";
import { GlobalCountryList } from "../elements/GlobalCountrySelection";
import { Loading } from "../elements/Loading";
import { Country, useCountries } from "../hooks/countries";
import { Dataset, useDatasets } from "../hooks/datasets";

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
        <H2>Dataset Description</H2>
        <Box>{dataset.description}</Box>
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
  return (
    <Flex flexDirection="row" justifyContent="center">
      <Box>
        <GlobalCountryList count={datasets.length} countries={countries} />
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
  );
}

function Fetch() {
  const [datasetsError, datasets] = useDatasets();
  const [countriesError, countries] = useCountries();
  if (datasetsError) throw datasetsError;
  if (countriesError) throw countriesError;
  if (!datasets || !countries) return <Loading />;
  return <Resolved datasets={datasets} countries={countries} />;
}

export default function DatasetListPage() {
  return <Fetch />;
}
