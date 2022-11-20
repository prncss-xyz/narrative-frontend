import { Country } from "../hooks/countries";
import { Dataset } from "../hooks/datasets";
import { setPresenceInArray } from "../utils/arrays";
import {
  availableRecordCountForDatasets,
  forcastedRecordCount,
} from "../utils/logic";
import { convertMoney, normalizeMoney } from "../utils/money";
import { Box, Flex, Grid, H3 } from "./basics";
import { DatasetItemSmall } from "./DataItemSmall";
import { Input } from "./Input";
import { ToggleButton } from "./ToggleButton";

export type BuyOrderContents = {
  id?: string;
  name: string;
  createdAt?: Date;
  datasetIds: number[];
  countries: string[];
  budget: number;
};

/**
 * The common component to view/edit a buyOrder
 * buOrder.id and buyOrder.createdAt will be undefined to create a new buyOrder
 * setBuyOrder wil be undefined for viewing (readonly)
 * child component is used to place buttons a the bottom of the form
 */
export function BuyOrderForm({
  buyOrder,
  setBuyOrder,
  datasets,
  countries,
  children,
}: {
  buyOrder: BuyOrderContents;
  setBuyOrder?: (BuyOrder: BuyOrderContents) => void;
  datasets: Dataset[];
  countries: Country[];
  children: React.ReactNode;
}) {
  const forcasted = forcastedRecordCount(countries, datasets, buyOrder);
  const available = availableRecordCountForDatasets(
    countries,
    datasets,
    buyOrder.countries
  );
  const disabled = setBuyOrder === undefined;
  return (
    <Flex justifyContent="center">
      <Flex
        width={6}
        gap={3}
        flexDirection="column"
        px={4}
        py={3}
        backgroundColor="bgMid"
      >
        <Grid
          gridTemplateRows={"1fr 1fr"}
          gridTemplateColumns={"1fr 1fr"}
          gridRowGap={3}
          gridColumnGap={3}
        >
          <Box>
            <H3>Order name</H3>
            <Input
              py="0px"
              px={setBuyOrder ? 0 : 1}
              width="100%"
              borderStyle="none"
              maxHeight={1}
              placeholder="name"
              value={buyOrder.name}
              converter={String}
              setValue={
                setBuyOrder
                  ? (name) => setBuyOrder({ ...buyOrder, name })
                  : undefined
              }
            />
          </Box>
          <Box>
            {buyOrder.createdAt ? (
              <>
                <H3>Date Created</H3>
                <Box height={1} p="0px" alignItems="baseline">
                  {buyOrder.createdAt.toLocaleString([], {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
                </Box>
              </>
            ) : (
              <Box />
            )}
          </Box>
          <Box>
            <H3>Order budget</H3>
            <Flex alignItems="baseline">
              <Box>$</Box>
              <Input
                borderStyle="none"
                width="100%"
                maxHeight={1}
                py="0px"
                px={setBuyOrder ? 0 : 1}
                ml={setBuyOrder ? 2 : 0}
                placeholder="budget"
                value={buyOrder.budget}
                normalizer={normalizeMoney}
                converter={convertMoney}
                setValue={
                  setBuyOrder
                    ? (budget) => setBuyOrder({ ...buyOrder, budget })
                    : undefined
                }
              />
            </Flex>
          </Box>
          <Box>
            <H3>Forecasted Records</H3>
            <Box height={1} p="0px" alignItems="baseline">
              {`${forcasted} of ${available} available records`}
            </Box>
          </Box>
        </Grid>
        <Box>
          <H3>Included datasets</H3>
          <Grid
            gridTemplateColumns={"1fr 1fr"}
            alignItems="start"
            gridRowGap={3}
            gridColumnGap={3}
          >
            {datasets.map((dataset) => (
              <div key={dataset.id}>
                <DatasetItemSmall
                  dataset={dataset}
                  // To make this scalable, we would need to introduce
                  // the kind of abstraction provided by
                  // https://github.com/akheron/optics-ts
                  active={buyOrder.datasetIds.includes(dataset.id)}
                  setActive={
                    disabled
                      ? undefined
                      : (status) =>
                          setBuyOrder({
                            ...buyOrder,
                            datasetIds: setPresenceInArray(
                              buyOrder.datasetIds,
                              dataset.id,
                              status
                            ),
                          })
                  }
                />
              </div>
            ))}
          </Grid>
        </Box>
        <Box>
          <H3>Included countries</H3>
          <Flex gap={3}>
            {countries.map((country) => (
              <div key={country.countryCode}>
                <ToggleButton
                  active={buyOrder.countries.includes(country.countryCode)}
                  setActive={(status) =>
                    setBuyOrder
                      ? setBuyOrder({
                          ...buyOrder,
                          countries: setPresenceInArray(
                            buyOrder.countries,
                            country.countryCode,
                            status
                          ),
                        })
                      : undefined
                  }
                >
                  {country.name}
                </ToggleButton>
              </div>
            ))}
          </Flex>
        </Box>
        <Box mt={5} />
        {children}
      </Flex>
    </Flex>
  );
}
