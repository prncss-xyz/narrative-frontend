import { Await, Link, useNavigate, useParams } from "react-router-dom";
import { ActionBox, Box, Flex, H1 } from "../elements/shared";
import { BuyOrder, BuyOrderSchema, useBuyOrder } from "../hooks/buyOrders";
import { Clickable } from "../elements/Clickable";
import { useState } from "react";
import { Confirm } from "../elements/Confirm";
import { BuyOrderForm } from "../elements/BuyOrderForm";
import { Country, useCountries } from "../hooks/countries";
import { Dataset, useDatasets } from "../hooks/datasets";
import React from "react";

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

function ViewBuyOrderFetch({ id }: { id: string }) {
  const buyOrderPromise = useBuyOrder(id);
  const datasetsPromise = useDatasets();
  const countriesPromise = useCountries();
  const resolve = Promise.all([
    buyOrderPromise,
    datasetsPromise,
    countriesPromise,
  ]);
  return (
    <React.Suspense>
      <Await
        resolve={resolve}
        children={([buyOrder, datasets, countries]: [
          BuyOrder | null,
          Dataset[],
          Country[]
        ]) => {
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
              datasets={datasets}
              countries={countries}
              toActions={(result) => {
                return <Actions buyOrder={BuyOrderSchema.parse(result)} />;
              }}
            />
          );
        }}
      />
    </React.Suspense>
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
  return <ViewBuyOrderFetch id={id} />;
}

export default function ViewBuyOrder() {
  return (
    <>
      <H1>Buy Order Details</H1>
      <ViewBuyOrderValidate />
    </>
  );
}
