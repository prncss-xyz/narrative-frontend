import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useCreateBuyOrder } from "../../hooks/buyOrders";
import { Country } from "../../hooks/countries";
import { Dataset } from "../../hooks/datasets";
import { ActionBox, Flex } from "../basics";
import { BuyOrderForm, FormBuyOrder } from "../BuyOrderForm";
import { Clickable } from "../Clickable";
import { useGlobalCountyList } from "../GlobalCountrySelection";

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

export function CreateBuyOrderResolved({
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
