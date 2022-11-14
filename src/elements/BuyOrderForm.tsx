import { useState } from "react";
import { BuyOrder } from "../hooks/buyOrders";
import { Country } from "../hooks/countries";
import { Dataset } from "../hooks/datasets";
import {
  availableRecordCountForDatasets,
  forcastedRecordCount,
} from "../utils/logic";
import { Box, Flex, Grid, H3 } from "./basics";
import { DatasetItemSmall } from "./DataItemSmall";
import { useGlobalCountyList } from "./GlobalCountrySelection";
import { Input } from "./Input";
import { RoundedButton } from "./RoundedButton";
import { TogglingSelector } from "./TogglingSelector";

function validateMoney(value: string) {
  if (value.match(/\..../)) return false; // no more than 2 decimals
  if (Number(value) >= 0) return true; // a number that is positve
  return false;
}

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
  datasets,
  countries,
  toActions,
}: {
  disabled?: boolean;
  buyOrder?: BuyOrder;
  datasets: Dataset[];
  countries: Country[];
  toActions: (result: BuyOrderFormResult) => React.ReactNode;
}) {
  const [activeDatasets, setActiveDatasets] = useState<number[]>(
    buyOrder?.datasetIds ?? []
  );
  const [globalActiveCountries] = useGlobalCountyList(countries);
  const [activeCountryCodes, setActiveCountryCodes] = useState<string[]>(
    buyOrder?.countries ?? globalActiveCountries
  );
  const [name, setName] = useState(buyOrder?.name ?? "");
  const [budget, setBudget] = useState(String(buyOrder?.budget ?? 0));
  const result: BuyOrderFormResult = {
    ...buyOrder,
    name,
    budget: Number(budget),
    datasetIds: activeDatasets,
    countries: activeCountryCodes,
  };
  const forcasted = forcastedRecordCount(countries, datasets, result);
  const available = availableRecordCountForDatasets(
    countries,
    datasets,
    result.countries
  );

  return (
    <Flex justifyContent="center">
      <Flex flexDirection="column" width={6}>
        <Box px={4} py={3} backgroundColor="tone2">
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
                validate={() => true}
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
                validate={validateMoney}
                placeholder="budget"
                value={budget}
                setValue={setBudget}
              />
            </Box>
            <Box>
              <H3>Forecasted Records</H3>
              {`${forcasted} of ${available} available records`}
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
              state={activeCountryCodes}
              setState={setActiveCountryCodes}
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
          <Box mt={6} />
          {toActions(result)}
        </Box>
      </Flex>
    </Flex>
  );
}
