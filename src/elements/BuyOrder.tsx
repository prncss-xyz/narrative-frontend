import { Link, useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { CountrySelector } from "../elements/CountrySelector";
import { Clickable } from "../elements/Clickable";
import { Box, Flex, Grid, H2 } from "../elements/shared";
import { useBuyOrder } from "../hooks/buyOrders";
import { useState } from "react";
import { Mode } from "../utils/mode";
import { Confirm } from "./Confirm";
import { Dataset, useDatasets } from "../hooks/datasets";

function deleteOrder(id: string) {
  // TODO:
  console.log("TODO", id);
}

function ActionsView() {
  const theme = useTheme() as any;
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
      <Flex
        justifyContent="flex-end"
        gap={2}
        css={{
          // gap: theme.space[2],
        }}
      >
        <Link to={`/edit-buy-order/${id}`}>
          <Box css={theme.styles.actionButton}>Edit Order</Box>
        </Link>
        <Clickable onClick={() => setOverlayVisible(true)}>
          <Box css={theme.styles.actionButton}>Delete Order</Box>
        </Clickable>
      </Flex>
    </>
  );
}

function ActionsEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) throw new Error("There should be an id here");
  const saveHandler = () => {
    console.log("save id"); //TODO:
    navigate("/buy-orders");
  };
  const theme = useTheme() as any;
  return (
    <Flex justifyContent="center">
      <Clickable onClick={saveHandler}>
        <Box css={theme.styles.actionButton}>Save</Box>
      </Clickable>
    </Flex>
  );
}

function ActionsNew() {
  const navigate = useNavigate();
  const newHandler = () => {
    console.log("new order"); //TODO:
    navigate("/buy-orders");
  };
  const theme = useTheme() as any;
  return (
    <Flex justifyContent="center">
      <Clickable onClick={newHandler}>
        <Box css={theme.styles.actionButton}>Create Order</Box>
      </Clickable>
    </Flex>
  );
}

function Actions({ mode }: { mode: Mode }) {
  switch (mode) {
    case Mode.New:
      return <ActionsNew />;
    case Mode.View:
      return <ActionsView />;
    case Mode.Edit:
      return <ActionsEdit />;
  }
}

function DatasetItem({ dataset }: { dataset: Dataset }) {
  const theme = useTheme() as any;
  const imgSide = theme.space[4];
  return (
    <Flex
      p={1}
      flexDirection="row"
      backgroundColor="gray3"
      css={{ gap: theme.space[2] }}
    >
      <Flex minWidth={imgSide} flexDirection="column" justifyContent="center">
        <img
          src={dataset.thumbnailUrl}
          width={imgSide}
          height={imgSide}
          alt="dataset thumbnail"
        />
      </Flex>
      <Flex flexDirection="column">
        <Box>{dataset.label}</Box>
        <Box color="gray1">${dataset.costPerRecord} per record</Box>
      </Flex>
    </Flex>
  );
}

function Datasets() {
  const dataSets = useDatasets();
  return (
    <Box>
      <Grid
        gridTemplateColumns={"1fr 1fr"}
        alignItems="start"
        gridRowGap={2}
        gridColumnGap={2}
      >
        {dataSets.map((dataset) => (
          <div key={dataset.id}>
            <DatasetItem dataset={dataset} />
          </div>
        ))}
      </Grid>
    </Box>
  );
}

export function BuyOrder({ mode }: { mode: Mode }) {
  const theme = useTheme() as any;
  const { id } = useParams();
  let buyOrder;
  if (mode !== Mode.New) {
    if (!id)
      return (
        <Box>
          URL should specify an <i>id</i> parameter
        </Box>
      );
    buyOrder = useBuyOrder(id);
    if (!buyOrder)
      return (
        <Box>
          Order with id <i>{id}</i> do not seem to exist.
        </Box>
      );
  }
  const createdAt = buyOrder ? new Date(buyOrder?.createdAt) : new Date();
  return (
    <>
      <Flex justifyContent="center">
        <Flex flexDirection="column" width={theme.space[9]}>
          <Box px={4} py={3} backgroundColor="gray25">
            <Grid
              gridTemplateColumns={"1fr 1fr"}
              alignItems="start"
              gridRowGap={2}
              gridColumnGap={2}
            >
              <Box>
                <H2>Order name</H2>
                {buyOrder?.name ?? ""}
              </Box>
              <Box>
                <H2>Order budget</H2>${buyOrder?.budget ?? ""}
              </Box>
              <Box>
                <H2>Date Created</H2>
                {createdAt.toLocaleString([], {
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
              <H2>Included datasets</H2>
            </Grid>

            <Datasets />
            <CountrySelector mode={mode} />
            <Box mt={5}>
              <Actions mode={mode} />
            </Box>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
