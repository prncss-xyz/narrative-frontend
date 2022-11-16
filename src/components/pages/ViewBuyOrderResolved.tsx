import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { BuyOrder, useDeleteBuyOrder } from "../../hooks/buyOrders";
import { Country } from "../../hooks/countries";
import { Dataset } from "../../hooks/datasets";
import { Box, Flex, ActionBox } from "../basics";
import { BuyOrderForm } from "../BuyOrderForm";
import { Clickable } from "../Clickable";
import { Confirm } from "../Confirm";

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

export function ViewBuyOrderResolved({
  buyOrder,
  datasets,
  countries,
}: {
  buyOrder: BuyOrder;
  datasets: Dataset[];
  countries: Country[];
}) {
  return (
    <BuyOrderForm buyOrder={buyOrder} datasets={datasets} countries={countries}>
      <Actions buyOrder={buyOrder} />
    </BuyOrderForm>
  );
}
