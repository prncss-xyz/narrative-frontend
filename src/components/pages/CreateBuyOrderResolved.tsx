import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useCreateBuyOrder } from "../../hooks/buyOrders";
import { Country } from "../../hooks/countries";
import { Dataset } from "../../hooks/datasets";
import { ActionBox, Flex } from "../basics";
import { BuyOrderForm, BuyOrderContents } from "../BuyOrderForm";
import { Clickable } from "../Clickable";
import { useGlobalCountryList } from "../GlobalCountrySelection";

function Actions({ result }: { result: BuyOrderContents }) {
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

export function CreateBuyOrderResolved({
  datasets,
  countries,
}: {
  datasets: Dataset[];
  countries: Country[];
}) {
  const [globalActiveCountries] = useGlobalCountryList(countries);
  const [activeCountryCodes] = useState<string[]>(globalActiveCountries);
  const [formBuyOrder, setFormBuyOrder] = useState<BuyOrderContents>({
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
