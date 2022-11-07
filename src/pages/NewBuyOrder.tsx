import React from "react";
import { Await, useNavigate } from "react-router-dom";
import { BuyOrderForm, BuyOrderFormResult } from "../elements/BuyOrderForm";
import { Clickable } from "../elements/Clickable";
import { ActionBox, Flex, H1 } from "../elements/shared";
import { Country, useCountries } from "../hooks/countries";
import { Dataset, useDatasets } from "../hooks/datasets";

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

function EditBuyOrderFetch() {
  const datasetsPromise = useDatasets();
  const countriesPromise = useCountries();
  const resolve = Promise.all([datasetsPromise, countriesPromise]);

  return (
    <React.Suspense>
      <Await
        resolve={resolve}
        children={([datasets, countries]: [Dataset[], Country[]]) => (
          <BuyOrderForm
            datasets={datasets}
            countries={countries}
            toActions={(result) => {
              return <Actions result={result} />;
            }}
          />
        )}
      />
    </React.Suspense>
  );
}

export default function EditBuyOrder() {
  return (
    <>
      <H1>Order name</H1>
      <EditBuyOrderFetch />
    </>
  );
}
