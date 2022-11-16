import { useParams } from "react-router-dom";
import { Box } from "../components/basics";
import { Loading } from "../components/Loading";
import { EditBuyOrderResolved } from "../components/pages/EditBuyOrderResolved";
import { useBuyOrder } from "../hooks/buyOrders";
import { useCountries } from "../hooks/countries";
import { useDatasets } from "../hooks/datasets";

function Fetch({ id }: { id: string }) {
  const datasets = useDatasets();
  const countries = useCountries();
  const buyOrder = useBuyOrder(id);
  if (!datasets || !countries || !buyOrder) return <Loading />;
  return (
    <EditBuyOrderResolved
      buyOrder={buyOrder}
      countries={countries}
      datasets={datasets}
    />
  );
}

function Validate() {
  const { id } = useParams();
  if (!id)
    return (
      <Box>
        URL should specify an <i>id</i> parameter
      </Box>
    );
  return <Fetch id={id} />;
}

export default function EditBuyOrderPage() {
  return <Validate />;
}
