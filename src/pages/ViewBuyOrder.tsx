import { useParams } from "react-router-dom";
import { Loading } from "../components/Loading";
import { ViewBuyOrderResolved } from "../components/pages/ViewBuyOrderResolved";
import { useBuyOrder } from "../hooks/buyOrders";
import { useCountries } from "../hooks/countries";
import { useDatasets } from "../hooks/datasets";

function Fetch({ id }: { id: string }) {
  const datasets = useDatasets();
  const countries = useCountries();
  const buyOrder = useBuyOrder(id);
  if (!datasets || !countries || !buyOrder) return <Loading />;
  return (
    <ViewBuyOrderResolved
      buyOrder={buyOrder}
      countries={countries}
      datasets={datasets}
    />
  );
}

function Validate() {
  const { id } = useParams();
  if (!id)
    throw new Error("There should be an id parameter (check the router)");
  return <Fetch id={id} />;
}

export default function ViewBuyOrderPage() {
  return <Validate />;
}
