import { Navigate } from "react-router-dom";
import { ActionBox, Box, Flex, H1 } from "../elements/basics";
import { BuyOrderForm, BuyOrderFormResult } from "../elements/BuyOrderForm";
import { Clickable } from "../elements/Clickable";
import { useCreateBuyOrder } from "../hooks/buyOrders";
import { Country, useCountries } from "../hooks/countries";
import { Dataset, useDatasets } from "../hooks/datasets";

function Actions({ result }: { result: BuyOrderFormResult }) {
  const mutation = useCreateBuyOrder();
  return (
    <>
      {mutation.isSuccess && <Navigate to="/buy-order-list" />}
      <Flex justifyContent="center">
        <Clickable onClick={() => mutation.mutate(result)}>
          <ActionBox>Create Order</ActionBox>
        </Clickable>
      </Flex>
    </>
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
    <BuyOrderForm
      datasets={datasets}
      countries={countries}
      toActions={(result) => <Actions result={result} />}
    />
  );
}

function Fetch() {
  const [datasetsError, datasets] = useDatasets();
  const [countriesError, countries] = useCountries();
  const error = datasetsError ?? countriesError;
  if (error)
    return <Box>{"An error has occurred: " + (error as any).message}</Box>;
  if (!datasets || !countries) return <></>;
  return (
    <>
      <Resolved countries={countries} datasets={datasets} />
    </>
  );
}

export default function CreateBuyOrderPage() {
  return (
    <>
      <H1>Order name</H1>
      <Fetch />
    </>
  );
}