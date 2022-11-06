import { Link, useNavigate, useParams } from "react-router-dom";
import { CountrySelector } from "../elements/CountrySelector";
import { Clickable } from "../elements/Clickable";
import { ActionBox, Box, Flex, Grid, H3, Img } from "../elements/shared";
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

function ActionsEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) throw new Error("There should be an id here");
  const saveHandler = () => {
    console.log("save id"); //TODO:
    navigate("/buy-orders");
  };
  return (
    <Flex justifyContent="center">
      <Clickable onClick={saveHandler}>
        <ActionBox>Save</ActionBox>
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
  return (
    <Flex justifyContent="center">
      <Clickable onClick={newHandler}>
        <ActionBox>Create Order</ActionBox>
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
  return (
    <Flex p={1} flexDirection="row" backgroundColor="gray3" gap={2}>
      <Flex minWidth={1} flexDirection="column" justifyContent="center">
        <Img
          src={dataset.thumbnailUrl}
          width={1}
          height={1}
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
  const createdAt = buyOrder ? new Date(buyOrder.createdAt) : new Date();
  return (
    <>
      <Flex justifyContent="center">
        <Flex flexDirection="column" width={6}>
          <Box px={4} py={3} backgroundColor="gray25">
            <Grid
              gridTemplateColumns={"1fr 1fr"}
              alignItems="start"
              gridRowGap={2}
              gridColumnGap={2}
            >
              <Box>
                <H3>Order name</H3>
                {buyOrder?.name ?? ""}
              </Box>
              <Box>
                <H3>Order budget</H3>${buyOrder?.budget ?? ""}
              </Box>
              <Box>
                <H3>Date Created</H3>
                {createdAt.toLocaleString([], {
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
              <H3>Included datasets</H3>
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
