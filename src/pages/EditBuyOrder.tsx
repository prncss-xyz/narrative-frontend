import { useNavigate, useParams } from "react-router-dom";
import { BuyOrderForm } from "../elements/BuyOrderForm";
import { Clickable } from "../elements/Clickable";
import { ActionBox, Box, Flex, H1 } from "../elements/shared";
import { BuyOrder, BuyOrderSchema, useBuyOrder } from "../hooks/buyOrders";

function Actions({ buyOrder }: { buyOrder: BuyOrder }) {
  const navigate = useNavigate();
  const saveHandler = () => {
    console.log("save id", buyOrder.id); //TODO:
    navigate("/buy-order-list");
  };
  return (
    <Flex justifyContent="center">
      <Clickable onClick={saveHandler}>
        <ActionBox>Save</ActionBox>
      </Clickable>
    </Flex>
  );
}

function EditBuyOrderValidate() {
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
      buyOrder={buyOrder}
      toActions={(result) => {
        return <Actions buyOrder={BuyOrderSchema.parse(result)} />;
      }}
    />
  );
}

export default function EditBuyOrder() {
  return (
    <>
      <H1>Edit Buy Order</H1>
      <EditBuyOrderValidate />
    </>
  );
}
