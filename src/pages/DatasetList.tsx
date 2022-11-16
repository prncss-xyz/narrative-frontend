import { Loading } from "../components/Loading";
import { DatasetListResolved } from "../components/pages/DatasetListResolved";
import { useCountries } from "../hooks/countries";
import { useDatasets } from "../hooks/datasets";

function Fetch() {
  const datasets = useDatasets();
  const countries = useCountries();
  if (!datasets || !countries) return <Loading />;
  return <DatasetListResolved datasets={datasets} countries={countries} />;
}

export default function DatasetListPage() {
  return <Fetch />;
}
