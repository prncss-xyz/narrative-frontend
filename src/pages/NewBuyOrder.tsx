import { useNavigate } from "react-router-dom";
import {  BuyOrderForm, BuyOrderFormResult } from "../elements/BuyOrderForm";
import { Clickable } from "../elements/Clickable";
import { ActionBox, Flex, H3 } from "../elements/shared";

function Actions({ result }: { result: BuyOrderFormResult }) {
  const navigate = useNavigate();
  const newHandler = () => {
    console.log("new order"); //TODO:
    navigate("/buy-order-list");
  };
  return (
    <Flex justifyContent="center">
      <Clickable onClick={newHandler}>
        <ActionBox>Create Order</ActionBox>
      </Clickable>
    </Flex>
  );
}

function EditBuyOrderValidate() {
  return (
    <BuyOrderForm
      toActions={(result) => {
        return <Actions result={result} />;
      }}
    />
  );
}

export default function EditBuyOrder() {
  return (
    <>
      <H3>Order name</H3>
      <EditBuyOrderValidate />
    </>
  );
}
