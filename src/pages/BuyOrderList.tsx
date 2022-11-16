import { Loading } from "../components/Loading";
import { BuyOrderListResolved } from "../components/pages/BuyOrderListResolved";
import { useBuyOrders } from "../hooks/buyOrders";
import { useCountries } from "../hooks/countries";
import { useDatasets } from "../hooks/datasets";

function Fetch() {
  const datasets = useDatasets();
  const countries = useCountries();
  const buyOrders = useBuyOrders();
  if (!datasets || !countries || !buyOrders) return <Loading />;
  return (
    <BuyOrderListResolved
      buyOrders={buyOrders}
      countries={countries}
      datasets={datasets}
    />
  );
}

export default function BuyOrderListPage() {
  return <Fetch />;
}
