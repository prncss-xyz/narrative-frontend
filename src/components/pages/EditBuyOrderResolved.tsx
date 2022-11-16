import { useState } from "react";
import { Navigate } from "react-router-dom";
import {
  BuyOrder,
  BuyOrderSchema,
  useUpdateBuyOrder,
} from "../../hooks/buyOrders";
import { Country } from "../../hooks/countries";
import { Dataset } from "../../hooks/datasets";
import { ActionBox, Flex } from "../basics";
import { BuyOrderForm, FormBuyOrder } from "../BuyOrderForm";
import { Clickable } from "../Clickable";

function Actions({ buyOrder }: { buyOrder: BuyOrder }) {
  const mutation = useUpdateBuyOrder();
  return (
    <>
      {mutation.data && <Navigate to="/buy-order-list" />}
      <Flex justifyContent="center">
        <Clickable onClick={() => mutation.mutate(buyOrder)}>
          <ActionBox>Save</ActionBox>
        </Clickable>
      </Flex>
    </>
  );
}

export function EditBuyOrderResolved({
  buyOrder,
  datasets,
  countries,
}: {
  buyOrder: BuyOrder;
  datasets: Dataset[];
  countries: Country[];
}) {
  const [formBuyOrder, setFormBuyOrder]: [
    FormBuyOrder,
    (s: FormBuyOrder) => void
  ] = useState<FormBuyOrder>(buyOrder);
  return (
    <BuyOrderForm
      buyOrder={formBuyOrder}
      setBuyOrder={setFormBuyOrder}
      datasets={datasets}
      countries={countries}
    >
      <Actions buyOrder={BuyOrderSchema.parse(formBuyOrder)} />
    </BuyOrderForm>
  );
}
