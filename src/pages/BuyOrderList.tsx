import { Await, Link } from "react-router-dom";
import React from "react";
import { Box, Flex, Grid, H1 } from "../elements/shared";
import { GlobalCountryList } from "../elements/GlobalCountrySelection";
import { BuyOrder, useBuyOrder, useBuyOrders } from "../hooks/buyOrders";
import { Country, useCountries } from "../hooks/countries";

function OrderRow({ name, value }: { name: string; value: string }) {
  return (
    <Flex px={2} py={3} backgroundColor="gray2" flexDirection="column">
      <Box color="gray1" pb={1} textDecoration="underline">
        {name}
      </Box>
      <Box>{value}</Box>
    </Flex>
  );
}

function BuyOrderItem({ buyOrders }: { buyOrders: BuyOrder[] }) {
  return (
    <Grid gridTemplateColumns={"auto auto auto"} gridRowGap="3">
      {buyOrders.flatMap((buyOrder) => [
        <div key={`${buyOrder.id}-name`}>
          <Link to={`/view-buy-order/${buyOrder.id}`}>
            <OrderRow name="Order name" value={buyOrder.name} />
          </Link>
        </div>,
        <div key={`${buyOrder.id}-createdAt`}>
          <Link to={`/view-buy-order/${buyOrder.id}`}>
            <OrderRow
              name="Date Created"
              value={new Date(buyOrder.createdAt).toLocaleString([], {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              })}
            />
          </Link>
        </div>,
        <div key={`${buyOrder.id}-forcasted`}>
          <Link to={`/view-buy-order/${buyOrder.id}`}>
            <OrderRow
              name="Forecasted Records"
              value={(1000).toLocaleString()}
            />
          </Link>
        </div>,
      ])}
    </Grid>
  );
}

function BuyOrderListFetch() {
  const buyOrdersPromise = useBuyOrders();
  const countriesPromise = useCountries();
  const resolve = Promise.all([buyOrdersPromise, countriesPromise]);
  return (
    <React.Suspense>
      <Await
        resolve={resolve}
        children={([buyOrders, countries]: [BuyOrder[], Country[]]) => (
          <Flex justifyContent="center">
            <Flex flexDirection="column">
              <GlobalCountryList
                count={buyOrders.length}
                countries={countries}
              />
              <BuyOrderItem buyOrders={buyOrders} />
            </Flex>
          </Flex>
        )}
      />
    </React.Suspense>
  );
}

export default function BuyOrderList() {
  return (
    <>
      <H1>Your Buy Orders</H1>
      <BuyOrderListFetch />
    </>
  );
}
