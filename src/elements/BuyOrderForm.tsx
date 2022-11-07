import { useState } from "react";
import { BuyOrder } from "../hooks/buyOrders";
import { useCountries } from "../hooks/countries";
import { useDatasets } from "../hooks/datasets";
import { DatasetItemSmall } from "./DataItemSmall";
import { Input, identityString, positve } from "./Input";
import { RoundedButton } from "./RoundedButton";
import { Box, Flex, Grid, H3 } from "./shared";
import { TogglingSelector } from "./TogglingSelector";

// export interface BuyOrderFormResult {
export type BuyOrderFormResult = {
  id?: string;
  name: string;
  createdAt?: Date;
  datasetIds: number[];
  countries: string[];
  budget: number;
};

export function BuyOrderForm({
  disabled,
  buyOrder,
  toActions,
}: {
  disabled?: boolean;
  buyOrder?: BuyOrder;
  toActions: (result: BuyOrderFormResult) => React.ReactNode;
}) {
  const countries = useCountries();
  const datasets = useDatasets();
  const [activeDatasets, setActiveDatasets] = useState<number[]>([]);
  const [activeCountries, setActiveCountries] = useState<string[]>([]);
  const [name, setName] = useState(buyOrder?.name ?? "");
  const [budget, setBudget] = useState(buyOrder?.budget ?? 0);
  const result: BuyOrderFormResult = {
    ...buyOrder,
    name,
    budget,
    datasetIds: activeDatasets,
    countries: activeCountries,
  };
  return (
    <Flex justifyContent="center">
      <Flex flexDirection="column" width={6}>
        <Box px={4} py={3} backgroundColor="gray25">
          <Grid
            gridTemplateColumns={"1fr 1fr"}
            alignItems="start"
            gridRowGap={2}
            gridColumnGap={2}
          >
            <Box>
              <H3>Order name</H3>
              <Input
                disabled={disabled}
                convert={identityString}
                placeholder="name"
                value={name}
                setValue={setName}
              />
            </Box>
            <Box>
              {buyOrder && (
                <>
                  <H3>Date Created</H3>
                  {buyOrder.createdAt.toLocaleString([], {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
                </>
              )}
            </Box>
            <Box>
              <H3>Order budget</H3>
              $&nbsp;
              <Input
                disabled={disabled}
                convert={positve}
                placeholder="budget"
                value={budget}
                setValue={setBudget}
              />
            </Box>
            <Box>
              <H3>Forecasted Records</H3>
              {`${0} of ${0} available records`}
            </Box>
          </Grid>
          <Box mt={4} />
          <H3>Included datasets</H3>
          <Grid
            gridTemplateColumns={"1fr 1fr"}
            alignItems="start"
            gridRowGap={2}
            gridColumnGap={2}
          >
            <TogglingSelector
              disabled={disabled}
              state={activeDatasets}
              setState={setActiveDatasets}
              items={datasets.map((dataset) => ({
                key: dataset.id,
                toElem: (props) => (
                  <DatasetItemSmall dataset={dataset} {...props} />
                ),
              }))}
            />
          </Grid>
          <Box mt={4} />
          <H3>Included countries</H3>
          <Flex gap={3}>
            <TogglingSelector
              disabled={disabled}
              state={activeCountries}
              setState={setActiveCountries}
              items={countries.map((country) => ({
                key: country.countryCode,
                toElem: (props) => (
                  <RoundedButton {...props}>{country.name}</RoundedButton>
                ),
              }))}
            />
          </Flex>
          <Box mt={6} />
          {toActions(result)}
        </Box>
      </Flex>
    </Flex>
  );
}
