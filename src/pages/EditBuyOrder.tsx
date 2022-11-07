import { Await, useNavigate, useParams } from "react-router-dom";
import { BuyOrderForm } from "../elements/BuyOrderForm";
import { Clickable } from "../elements/Clickable";
import { ActionBox, Box, Flex, H1 } from "../elements/shared";
import { BuyOrder, BuyOrderSchema, useBuyOrder } from "../hooks/buyOrders";
import { Country, useCountries } from "../hooks/countries";
import { Dataset, useDatasets } from "../hooks/datasets";
import React from "react";

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

function EditBuyOrderFetch({ id }: { id: string }) {
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

function EditBuyOrderValidate() {
  const { id } = useParams();
  if (!id)
    return (
      <Box>
        URL should specify an <i>id</i> parameter
      </Box>
    );
  return <EditBuyOrderFetch id={id} />;
}

export default function EditBuyOrder() {
  return (
    <>
      <H1>Edit Buy Order</H1>
      <EditBuyOrderValidate />
    </>
  );
}
