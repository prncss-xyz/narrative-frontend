import { Link, useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@emotion/react";
import {
  CountrySelector,
  CountrySelectorContext,
} from "../elements/CountrySelector";
import { Clickable } from "../elements/Clickable";
import { Box, H1, Flex, H2 } from "../elements/shared";
import { useBuyOrder } from "../hooks/buyOrders";
import { useState } from "react";
import { Overlay } from "../elements/Overlay";

function useId() {
  const { id } = useParams();
  if (!id)
    throw new Error(
      "This should not happen as there is another route called when id is not defined"
    );
  return id;
}

function deleteOrder(id: string) {
  // TODO:
  console.log("TODO", id);
}

function Confirm({
  overlayVisible,
  setOverlayVisible,
}: {
  overlayVisible: boolean;
  setOverlayVisible: (state: boolean) => void;
}) {
  const theme = useTheme() as any;
  const id = useId();
  const navigate = useNavigate();
  const deleteHandler = () => {
    deleteOrder(id);
    navigate("/buy-orders");
  };

  return (
    <Overlay
      visible={overlayVisible}
      onClickOutside={() => setOverlayVisible(false)}
    >
      <Box>Do you really want to delete this order?</Box>
      <Flex
        mt={4}
        css={{
          justifyContent: "flex-end",
          gap: theme.space[2],
        }}
      >
        <Clickable onClick={deleteHandler}>
          <Box css={theme.styles.overlayActionButton}>Yes</Box>
        </Clickable>
        <Clickable onClick={() => setOverlayVisible(false)}>
          <Box css={theme.styles.overlayActionButton}>No</Box>
        </Clickable>
      </Flex>
    </Overlay>
  );
}

export default function EditBuyOrder() {
  const theme = useTheme() as any;
  const [overlayVisible, setOverlayVisible] = useState(false);
  const { id } = useParams();
  if (!id)
    throw new Error(
      "This should not happen as there is another route called when id is not defined"
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
      <CountrySelectorContext init={[]}>
        <Confirm
          overlayVisible={overlayVisible}
          setOverlayVisible={setOverlayVisible}
        />
        <H1>Buy Order Details</H1>
        <Flex justifyContent="center">
          <Flex flexDirection="column" width={theme.space[9]}>
            <Box px={4} py={3} backgroundColor="gray25">
              <Box>
                <H2>Order name</H2>
                {buyOrder.name}
              </Box>
              <Box>
                <H2>Order budget</H2>${buyOrder.budget}
              </Box>
              <Box>
                <H2>Date Created</H2>
                {new Date(buyOrder.createdAt).toLocaleString([], {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
                {}
              </Box>
              <Box>
                <H2>Forecasted Records</H2>
                {`${0} of ${0} available records`}
              </Box>
              <Box>
                <H2>Included datasets</H2>
              </Box>
              <CountrySelector />
              <Flex
                mt={5}
                css={{
                  justifyContent: "flex-end",
                  gap: theme.space[2],
                }}
              >
                <Link to={`/edit-buy-order/${id}`}>
                  <Box css={theme.styles.actionButton}>Edit Order</Box>
                </Link>
                <Clickable onClick={() => setOverlayVisible(true)}>
                  <Box css={theme.styles.actionButton}>Delete Order</Box>
                </Clickable>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </CountrySelectorContext>
    </>
  );
}
