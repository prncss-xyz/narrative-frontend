import { Navigate } from "react-router-dom";
import { ActionBox, Box, Flex } from "../components/basics";
import { BuyOrderForm, BuyOrderFormResult } from "../components/BuyOrderForm";
import { Clickable } from "../components/Clickable";
import { Loading } from "../components/Loading";
import { useCreateBuyOrder } from "../hooks/buyOrders";
import { Country, useCountries } from "../hooks/countries";
import { Dataset, useDatasets } from "../hooks/datasets";

function Actions({ result }: { result: BuyOrderFormResult }) {
  const mutation = useCreateBuyOrder();
  return (
    <>
      {mutation.data && <Navigate to="/buy-order-list" />}
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
  const datasets = useDatasets();
  const countries = useCountries();
  if (!datasets || !countries) return <Loading />;
  return <Resolved countries={countries} datasets={datasets} />;
}

export default function CreateBuyOrderPage() {
  return <Fetch />;
}
