import { Link } from "react-router-dom";
import { ActionBox, Box, Flex, Grid } from "../elements/basics";
import { GlobalCountryList } from "../elements/GlobalCountrySelection";
import { Loading } from "../elements/Loading";
import { BuyOrder, useBuyOrders } from "../hooks/buyOrders";
import { Country, useCountries } from "../hooks/countries";
import { useDatasets } from "../hooks/datasets";

function BuyOrderItem({ name, value }: { name: string; value: string }) {
  return (
    <Flex px={2} py={3} backgroundColor="gray2" flexDirection="column">
      <Box color="gray1" pb={1} textDecoration="underline">
        {name}
      </Box>
      <Box>{value}</Box>
    </Flex>
  );
}

function BuyOrderList({ buyOrders }: { buyOrders: BuyOrder[] }) {
  return (
    <Grid gridTemplateColumns={"auto auto auto"} gridRowGap="3">
      {buyOrders.flatMap((buyOrder) => [
        <div key={`${buyOrder.id}-name`}>
          <Link to={`/view-buy-order/${buyOrder.id}`}>
            <BuyOrderItem name="Order name" value={buyOrder.name} />
          </Link>
        </div>,
        <div key={`${buyOrder.id}-createdAt`}>
          <Link to={`/view-buy-order/${buyOrder.id}`}>
            <BuyOrderItem
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
            <BuyOrderItem
              name="Forecasted Records"
              value={(1000).toLocaleString()}
            />
          </Link>
        </div>,
      ])}
    </Grid>
  );
}

function Resolved({
  buyOrders,
  countries,
}: {
  buyOrders: BuyOrder[];
  countries: Country[];
}) {
  return (
    <>
      <Flex justifyContent="center">
        <Flex flexDirection="column">
          <GlobalCountryList count={buyOrders.length} countries={countries} />
          <BuyOrderList buyOrders={buyOrders} />
        </Flex>
      </Flex>
      <Box mt={6} />
      <Flex justifyContent="center">
        <Link to={"/new-buy-order"}>
          <ActionBox backgroundColor="gray2">New Order</ActionBox>
        </Link>
      </Flex>
    </>
  );
}

function Fetch() {
  const datasets = useDatasets();
  const countries = useCountries();
  const buyOrders = useBuyOrders();
  if (!datasets || !countries || !buyOrders) return <Loading />;
  return <Resolved buyOrders={buyOrders} countries={countries} />;
}

export default function BuyOrderListPage() {
  return <Fetch />;
}
