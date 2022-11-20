import { useState } from "react";
import { Link } from "react-router-dom";
import { BuyOrder } from "../../hooks/buyOrders";
import { Country } from "../../hooks/countries";
import { Dataset } from "../../hooks/datasets";
import { forcastedRecordCount } from "../../utils/logic";
import { ActionBox, Box, Flex, Grid, H3 } from "../basics";
import { Clickable } from "../Clickable";
import {
  GlobalCountrySelectionSummary,
  GlobalCountrySelector,
  useGlobalCountryList,
} from "../GlobalCountrySelection";
import { Overlay } from "../Overlay";

function BuyOrderField({ name, value }: { name: string; value: string }) {
  return (
    <Flex px={2} py={3} backgroundColor="bgDark" flexDirection="column">
      <H3>{name}</H3>
      <Box>{value}</Box>
    </Flex>
  );
}

function buyOrderItem(
  countries: Country[],
  datasets: Dataset[],
  buyOrder: BuyOrder
) {
  const forcasted = forcastedRecordCount(countries, datasets, buyOrder);
  return [
    <div key={`${buyOrder.id}-name`}>
      <Link to={`/view-buy-order/${buyOrder.id}`}>
        <BuyOrderField name="Order name" value={buyOrder.name} />
      </Link>
    </div>,
    <div key={`${buyOrder.id}-createdAt`}>
      <Link to={`/view-buy-order/${buyOrder.id}`}>
        <BuyOrderField
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
        <BuyOrderField
          name="Forecasted Records"
          value={
            forcasted.toLocaleString() +
            " " +
            (forcasted === 1 ? "record" : "records")
          }
        />
      </Link>
    </div>,
  ];
}

function BuyOrderList({
  buyOrders,
  countries,
  datasets,
  ...props
}: {
  buyOrders: BuyOrder[];
  countries: Country[];
  datasets: Dataset[];
  [prop: string]: unknown; // TODO: could be more restrictive
}) {
  return (
    <Grid gridTemplateColumns={"auto auto auto"} gridRowGap="3" {...props}>
      {buyOrders.flatMap((buyOrder) =>
        buyOrderItem(countries, datasets, buyOrder)
      )}
    </Grid>
  );
}

export function BuyOrderListResolved({
  buyOrders,
  countries,
  datasets,
}: {
  buyOrders: BuyOrder[];
  countries: Country[];
  datasets: Dataset[];
}) {
  const [overlayVisible, setOverlayvisible] = useState(false);
  const [activeCountryCode] = useGlobalCountryList(countries);
  const relevantBuyOrders = buyOrders.filter((buyOrder) =>
    buyOrder.countries.some((countryCode) =>
      activeCountryCode.includes(countryCode)
    )
  );
  return (
    <>
      <Overlay
        visible={overlayVisible}
        setVisible={() => setOverlayvisible(false)}
      >
        <GlobalCountrySelector countries={countries} />
      </Overlay>
      <Flex justifyContent="center">
        <Flex flexDirection="column" width={6}>
          <Clickable onClick={() => setOverlayvisible(true)}>
            <GlobalCountrySelectionSummary
              count={relevantBuyOrders.length}
              countries={countries}
            />
          </Clickable>
          <BuyOrderList
            countries={countries}
            datasets={datasets}
            buyOrders={relevantBuyOrders}
          />
        </Flex>
      </Flex>
      <Box mt={6} />
      <Flex justifyContent="center">
        <Link to={"/new-buy-order"}>
          <ActionBox backgroundColor="bgDark" color="muted">
            New Order
          </ActionBox>
        </Link>
      </Flex>
    </>
  );
}
