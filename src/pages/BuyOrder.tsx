import { Link, useNavigate, useParams } from "react-router-dom";
import {
  CountrySelector,
  CountrySelectorContext,
} from "../elements/CountrySelector";
import { ActionBox, Box, Flex, H1, H3 } from "../elements/shared";
import { useBuyOrder } from "../hooks/buyOrders";
import { Mode } from "../utils/mode";
import { BuyOrderLayout } from "../elements/BuyOrderLayout";
import { DatasetsSmall } from "../elements/DatasetsSmall";
import { Clickable } from "../elements/Clickable";
import { useState } from "react";
import { Confirm } from "../elements/Confirm";

function deleteOrder(id: string) {
  // TODO:
  console.log("TODO", id);
}

function Actions() {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) throw new Error("There should be an id here");
  const deleteHandler = () => {
    deleteOrder(id);
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
        <Link to={`/edit-buy-order/${id}`}>
          <ActionBox>Edit order</ActionBox>
        </Link>
        <Clickable onClick={() => setOverlayVisible(true)}>
          <ActionBox>Delete Order</ActionBox>
        </Clickable>
      </Flex>
    </>
  );
}

export default function BuyOrder() {
  const mode = Mode.View;
  const { id } = useParams();
  if (!id)
    return (
      <Box>
        URL should specify an <i>id</i> parameter
      </Box>
    );
  const buyOrder = useBuyOrder(id);
  if (!buyOrder)
    return (
      <>
        <H1>Buy Order Details</H1>
        <Box>
          Order with id <i>{id}</i> do not seem to exist.
        </Box>
      </>
    );
  return (
    <>
      <H1>Buy Order Details</H1>
      <CountrySelectorContext init={[]}>
        <BuyOrderLayout
          grid={
            <>
              <Box>
                <H3>Order name</H3>
                {buyOrder.name}
              </Box>
              <Box>
                <H3>Order budget</H3>${buyOrder.budget}
              </Box>
              <Box>
                <H3>Date Created</H3>
                {buyOrder.createdAt.toLocaleString([], {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
                {}
              </Box>
              <Box>
                <H3>Forecasted Records</H3>
                {`${0} of ${0} available records`}
              </Box>
            </>
          }
          datasets={<DatasetsSmall />}
          countrySelector={<CountrySelector mode={mode} />}
          actionBox={<Actions />}
        />
      </CountrySelectorContext>
    </>
  );
}
