import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ActionBox, Box, Flex } from "../components/basics";
import { BuyOrderForm } from "../components/BuyOrderForm";
import { Clickable } from "../components/Clickable";
import { Confirm } from "../components/Confirm";
import { Loading } from "../components/Loading";
import {
  BuyOrder,
  BuyOrderSchema,
  useBuyOrder,
  useDeleteBuyOrder,
} from "../hooks/buyOrders";
import { Country, useCountries } from "../hooks/countries";
import { Dataset, useDatasets } from "../hooks/datasets";

function Actions({ buyOrder }: { buyOrder: BuyOrder }) {
  const mutation = useDeleteBuyOrder();
  const [overlayVisible, setOverlayVisible] = useState(false);
  const deleteHandler = () => {
    mutation.mutate(buyOrder.id);
  };
  return (
    <>
      {mutation.data && <Navigate to="/buy-order-list" />}
      <Confirm
        overlayVisible={overlayVisible}
        setOverlayVisible={setOverlayVisible}
        handler={deleteHandler}
      >
        <Box>Do you really want to delete this order?</Box>
      </Confirm>
      <Flex justifyContent="flex-end" gap={2}>
        <Link to={`/edit-buy-order/${buyOrder.id}`}>
          <ActionBox>Edit order</ActionBox>
        </Link>
        <Clickable onClick={() => setOverlayVisible(true)}>
          <ActionBox>Delete Order</ActionBox>
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
  return (
    <BuyOrderForm
      disabled
      buyOrder={buyOrder}
      datasets={datasets}
      countries={countries}
    >
      <Actions buyOrder={buyOrder} />
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
    throw new Error("There should be an id parameter (check the router)");
  return <Fetch id={id} />;
}

export default function ViewBuyOrderPage() {
  return <Validate />;
}
