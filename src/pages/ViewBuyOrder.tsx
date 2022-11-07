import { Link, useNavigate, useParams } from "react-router-dom";
import {
  CountrySelector,
  CountrySelectorContext,
} from "../elements/CountrySelector";
import { ActionBox, Box, Flex, H1, H3 } from "../elements/shared";
import { BuyOrder, BuyOrderSchema, useBuyOrder } from "../hooks/buyOrders";
import { Mode } from "../utils/mode";
import { BuyOrderLayout } from "../elements/BuyOrderLayout";
import { DatasetsSmall } from "../elements/DatasetsSmall";
import { Clickable } from "../elements/Clickable";
import { useState } from "react";
import { Confirm } from "../elements/Confirm";
import { BuyOrderForm } from "../elements/BuyOrderForm";

function deleteOrder(id: string) {
  // TODO:
  console.log("TODO", id);
}

function Actions({ buyOrder }: { buyOrder: BuyOrder }) {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const navigate = useNavigate();
  const deleteHandler = () => {
    deleteOrder(buyOrder.id);
    navigate("/buy-orders");
  };
  return (
    <>
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

function ViewBuyOrderValidate() {
  const { id } = useParams();
  if (!id)
    return (
      <Box>
        URL should specify an <i>id</i> parameter
      </Box>
    );
  const buyOrder = useBuyOrder(id);
  if (!buyOrder)
    return (
      <>
        <Box>
          Order with id <i>{id}</i> do not seem to exist.
        </Box>
      </>
    );
  return (
    <BuyOrderForm
      disabled
      buyOrder={buyOrder}
      toActions={(result) => {
        return <Actions buyOrder={BuyOrderSchema.parse(result)} />;
      }}
    />
  );
}

export default function ViewBuyOrder() {
  return (
    <>
      <H1>Buy Order Details</H1>
      <ViewBuyOrderValidate />
    </>
  );
}
