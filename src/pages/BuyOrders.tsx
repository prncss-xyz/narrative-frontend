import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
import { Box, Flex, H1 } from "../elements/shared";
import { Showing } from "../elements/Showing";
import { BuyOrder, useBuyOrders } from "../hooks/buyOrders";

function OrderRow({ name, value }: { name: string; value: string }) {
  return (
    <Flex flexDirection="column">
      <Box color="gray1" pb={1} css={{ textDecoration: "underline" }}>
        {name}
      </Box>
      <Box>{value}</Box>
    </Flex>
  );
}

function BuyOrderItem({ buyOrder }: { buyOrder: BuyOrder }) {
  const theme = useTheme() as any;
  return (
    <Link to={`/buy-order/${buyOrder.id}`}>
      <Flex
        backgroundColor="gray2"
        my={2}
        px={2}
        py={3}
        css={{ gap: theme.space[5] }}
      >
        <OrderRow name="Order name" value={buyOrder.name} />
        <OrderRow
          name="Date Created"
          value={new Date(buyOrder.createdAt).toLocaleString([], {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })}
        />
        <OrderRow name="Forecasted Records" value={(1000).toLocaleString()} />
      </Flex>
    </Link>
  );
}

export default function BuyOrdersList() {
  const countries = ["United States", "Canada"];
  const buyOrders = useBuyOrders();
  const orderCount = buyOrders.length;
  const theme = useTheme() as any;
  return (
    <>
      <H1>Your Buy Orders</H1>
      <Flex justifyContent='center'>
        <Flex flexDirection="column" width={theme.space[9]}>
          <Showing count={orderCount} countries={countries} />
          {buyOrders.map((b) => (
            <div key={b.id}>
              <BuyOrderItem buyOrder={b} />
            </div>
          ))}
        </Flex>
      </Flex>
    </>
  );
}
