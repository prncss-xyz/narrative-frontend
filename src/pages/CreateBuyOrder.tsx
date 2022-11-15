import { useState } from "react";
import { Navigate } from "react-router-dom";
import { ActionBox, Flex } from "../components/basics";
import { BuyOrderForm, FormBuyOrder } from "../components/BuyOrderForm";
import { Clickable } from "../components/Clickable";
import { useGlobalCountyList } from "../components/GlobalCountrySelection";
import { Loading } from "../components/Loading";
import { useCreateBuyOrder } from "../hooks/buyOrders";
import { Country, useCountries } from "../hooks/countries";
import { Dataset, useDatasets } from "../hooks/datasets";

function Actions({ result }: { result: FormBuyOrder }) {
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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [globalActiveCountries] = useGlobalCountyList(countries);
  const [activeCountryCodes] = useState<string[]>(globalActiveCountries);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [formBuyOrder, setFormBuyOrder] = useState<FormBuyOrder>({
    name: "",
    datasetIds: [],
    budget: 0,
    countries: activeCountryCodes,
  });
  return (
    <BuyOrderForm
      buyOrder={formBuyOrder}
      setBuyOrder={setFormBuyOrder}
      datasets={datasets}
      countries={countries}
    >
      <Actions result={formBuyOrder} />
    </BuyOrderForm>
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
