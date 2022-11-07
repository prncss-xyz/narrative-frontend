import { Link } from "react-router-dom";
import { Box, Flex, Grid, H1 } from "../elements/shared";
import { GlobalCountryList } from "../elements/GlobalCountrySelection";
import { BuyOrder, useBuyOrders } from "../hooks/buyOrders";
import { useCountries } from "../hooks/countries";

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

export default function BuyOrderList() {
  const buyOrders = useBuyOrders();
  const orderCount = buyOrders.length;
  const countries = useCountries();
  return (
    <>
      <H1>Your Buy Orders</H1>
      <Flex justifyContent="center">
        <Flex flexDirection="column">
          <GlobalCountryList count={orderCount} countries={countries} />
          <BuyOrderItem buyOrders={buyOrders} />
        </Flex>
      </Flex>
    </>
  );
}
