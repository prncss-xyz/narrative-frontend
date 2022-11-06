import { useNavigate, useParams } from "react-router-dom";
import { BuyOrderLayout } from "../elements/BuyOrderLayout";
import { Clickable } from "../elements/Clickable";
import {
  CountrySelector,
  CountrySelectorContext,
} from "../elements/CountrySelector";
import { DatasetsSmall } from "../elements/DatasetsSmall";
import { ActionBox, Box, Flex, H1, H3 } from "../elements/shared";
import { useBuyOrder } from "../hooks/buyOrders";
import { Mode } from "../utils/mode";

function Actions({ id }: { id: string }) {
  const navigate = useNavigate();
  const saveHandler = () => {
    console.log("save id", id); //TODO:
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

export default function BuyOrder() {
  const mode = Mode.Edit;
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
                {buyOrder?.name ?? ""}
              </Box>
              <Box>
                <H3>Order budget</H3>${buyOrder?.budget ?? ""}
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
          actionBox={<Actions id={id} />}
        />
      </CountrySelectorContext>
    </>
  );
}
