import { Loading } from "../components/Loading";
import { CreateBuyOrderResolved } from "../components/pages/CreateBuyOrderResolved";
import { useCountries } from "../hooks/countries";
import { useDatasets } from "../hooks/datasets";

function Fetch() {
  const datasets = useDatasets();
  const countries = useCountries();
  if (!datasets || !countries) return <Loading />;
  return <CreateBuyOrderResolved countries={countries} datasets={datasets} />;
}

export default function CreateBuyOrderPage() {
  return <Fetch />;
}
