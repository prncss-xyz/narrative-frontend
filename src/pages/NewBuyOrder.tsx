import { useNavigate } from "react-router-dom";
import { BuyOrderLayout } from "../elements/BuyOrderLayout";
import { Clickable } from "../elements/Clickable";
import {
  CountrySelector,
  CountrySelectorContext,
} from "../elements/CountrySelector";
import { DatasetsSmall } from "../elements/DatasetsSmall";
import { ActionBox, Box, Flex, H1, H3 } from "../elements/shared";
import { Mode } from "../utils/mode";

function Actions() {
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

export default function NewBuyOrder() {
  const mode = Mode.View;
  const now = new Date();
  return (
    <div>
      <H1>New Buy Order</H1>
      <CountrySelectorContext init={[]}>
        <BuyOrderLayout
          grid={
            <>
              <Box>
                <H3>Order name</H3>
              </Box>
              <Box>
                <H3>Order budget</H3>${0}
              </Box>
              <Box>
                <H3>Date Created</H3>
                {now.toLocaleString([], {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
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
    </div>
  );
}
