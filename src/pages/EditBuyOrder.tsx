import { useParams } from "react-router-dom";
import { Box, H1 } from "../elements/shared";
import { useBuyOrder } from "../hooks/buyOrders";

export default function EditBuyOrder() {
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
        <Box>Order with id {id} do not seem to exist.</Box>
      </>
    );
  return (
    <>
      <H1>Buy Order Details</H1>
    </>
  );
}
