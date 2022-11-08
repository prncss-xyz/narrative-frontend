import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ActionBox, Box, Flex } from "../elements/basics";
import { BuyOrderForm } from "../elements/BuyOrderForm";
import { Clickable } from "../elements/Clickable";
import { Confirm } from "../elements/Confirm";
import { Loading } from "../elements/Loading";
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
      {mutation.isSuccess && <Navigate to="/buy-order-list" />}
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
      toActions={(result) => {
        return <Actions buyOrder={BuyOrderSchema.parse(result)} />;
      }}
    />
  );
}

function Fetch({ id }: { id: string }) {
  const [datasetsError, datasets] = useDatasets();
  const [countriesError, countries] = useCountries();
  const [buyOrderError, buyOrder] = useBuyOrder(id);
  if (datasetsError) throw datasetsError;
  if (countriesError) throw countriesError;
  if (buyOrderError) throw buyOrderError;
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
