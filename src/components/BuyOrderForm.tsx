import { Country } from "../hooks/countries";
import { Dataset } from "../hooks/datasets";
import {
  availableRecordCountForDatasets,
  forcastedRecordCount,
} from "../utils/logic";
import { convertMoney, normalizeMoney } from "../utils/money";
import { Box, Flex, Grid, H3 } from "./basics";
import { DatasetItemSmall } from "./DataItemSmall";
import { Input } from "./Input";
import { RoundedButton } from "./RoundedButton";
import { TogglingSelector } from "./TogglingSelector";

// export interface BuyOrderFormResult {
export type FormBuyOrder = {
  id?: string;
  name: string;
  createdAt?: Date;
  datasetIds: number[];
  countries: string[];
  budget: number;
};

export function BuyOrderForm({
  buyOrder,
  setBuyOrder,
  datasets,
  countries,
  children,
}: {
  buyOrder: FormBuyOrder;
  setBuyOrder?: (BuyOrder: FormBuyOrder) => void;
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
              px={disabled ? 0 : 1}
              width="100%"
              borderStyle="none"
              maxHeight={1}
              disabled={disabled}
              placeholder="name"
              value={buyOrder.name}
              converter={String}
              setValue={(name) =>
                setBuyOrder && setBuyOrder({ ...buyOrder, name })
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
                px={disabled ? 0 : 1}
                ml={!disabled && 2}
                disabled={disabled}
                placeholder="budget"
                value={buyOrder.budget}
                normalizer={normalizeMoney}
                converter={convertMoney}
                setValue={(budget) =>
                  setBuyOrder && setBuyOrder({ ...buyOrder, budget })
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
            <TogglingSelector
              disabled={disabled}
              state={buyOrder.datasetIds}
              setState={(datasetIds) =>
                setBuyOrder && setBuyOrder({ ...buyOrder, datasetIds })
              }
              items={datasets.map((dataset) => ({
                key: dataset.id,
                toElem: (props) => (
                  <DatasetItemSmall dataset={dataset} {...props} />
                ),
              }))}
            />
          </Grid>
        </Box>
        <Box>
          <H3>Included countries</H3>
          <Flex gap={3}>
            <TogglingSelector
              disabled={disabled}
              state={buyOrder.countries}
              setState={(countries) =>
                setBuyOrder && setBuyOrder({ ...buyOrder, countries })
              }
              items={countries.map((country) => ({
                key: country.countryCode,
                toElem: (props) => (
                  <RoundedButton
                    {...props}
                    // eslint-disable-next-line react/prop-types
                    borderStyle={props.active ? "solid" : "none"}
                  >
                    {country.name}
                  </RoundedButton>
                ),
              }))}
            />
          </Flex>
        </Box>
        <Box mt={5} />
        {children}
      </Flex>
    </Flex>
  );
}
