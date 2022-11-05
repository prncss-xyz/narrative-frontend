import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
import { Box, Flex, Grid, H1 } from "../elements/shared";
import { Showing } from "../elements/Showing";
import { BuyOrder, useBuyOrders } from "../hooks/buyOrders";

function OrderRow({ name, value }: { name: string; value: string }) {
  return (
    <Flex px={2} py={3} backgroundColor="gray2" flexDirection="column">
      <Box color="gray1" pb={1} css={{ textDecoration: "underline" }}>
        {name}
      </Box>
      <Box>{value}</Box>
    </Flex>
  );
}

function BuyOrderItem({ buyOrders }: { buyOrders: BuyOrder[] }) {
  // const url = `/buy-order/${buyOrder.id}`;
  return (
    <Grid gridTemplateColumns={"auto auto auto"} gridRowGap="3">
      {buyOrders.flatMap((buyOrder) => [
        <div key={`${buyOrder.id}-name`}>
          <Link to={`/buy-order/${buyOrder.id}`}>
            <OrderRow name="Order name" value={buyOrder.name} />
          </Link>
        </div>,
        <div key={`${buyOrder.id}-createdAt`}>
          <Link to={`/buy-order/${buyOrder.id}`}>
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
          <Link to={`/buy-order/${buyOrder.id}`}>
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

export default function BuyOrdersList() {
  const buyOrders = useBuyOrders();
  const orderCount = buyOrders.length;
  const theme = useTheme() as any;
  return (
    <>
      <H1>Your Buy Orders</H1>
      <Flex justifyContent="center">
        <Flex flexDirection="column" width={theme.space[9]}>
          <Showing count={orderCount} />
          <BuyOrderItem buyOrders={buyOrders} />
        </Flex>
      </Flex>
    </>
  );
}
