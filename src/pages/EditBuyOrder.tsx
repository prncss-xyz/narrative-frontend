import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { ActionBox, Box, Flex } from "../components/basics";
import { BuyOrderForm, FormBuyOrder } from "../components/BuyOrderForm";
import { Clickable } from "../components/Clickable";
import { Loading } from "../components/Loading";
import {
  BuyOrder,
  BuyOrderSchema,
  useBuyOrder,
  useUpdateBuyOrder,
} from "../hooks/buyOrders";
import { Country, useCountries } from "../hooks/countries";
import { Dataset, useDatasets } from "../hooks/datasets";

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

function Resolved({
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

function Fetch({ id }: { id: string }) {
  const datasets = useDatasets();
  const countries = useCountries();
  const buyOrder = useBuyOrder(id);
  if (!datasets || !countries || !buyOrder) return <Loading />;
  return (
    <Resolved buyOrder={buyOrder} countries={countries} datasets={datasets} />
  );
}

function Validate() {
  const { id } = useParams();
  if (!id)
    return (
      <Box>
        URL should specify an <i>id</i> parameter
      </Box>
    );
  return <Fetch id={id} />;
}

export default function EditBuyOrderPage() {
  return <Validate />;
}
