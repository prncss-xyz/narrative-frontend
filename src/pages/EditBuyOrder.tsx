import { Navigate, useParams } from "react-router-dom";
import { ActionBox, Box, Flex } from "../elements/basics";
import { BuyOrderForm } from "../elements/BuyOrderForm";
import { Clickable } from "../elements/Clickable";
import { Loading } from "../elements/Loading";
import {
  BuyOrder,
  BuyOrderSchema,
  useBuyOrder,
  useUpdateBuyOrder,
} from "../hooks/buyOrders";
import { Country, useCountries } from "../hooks/countries";
import { Dataset, useDatasets } from "../hooks/datasets";

function Actions({ buyOrder }: { buyOrder: BuyOrder }) {
  const mutation = useUpdateBuyOrder();
  return (
    <>
      {mutation.isSuccess && <Navigate to="/buy-order-list" />}
      <Flex justifyContent="center">
        <Clickable onClick={() => mutation.mutate(buyOrder)}>
          <ActionBox>Save</ActionBox>
        </Clickable>
      </Flex>
    </>
  );
}

function Resolved({
  buyOrder,
  datasets,
  countries,
}: {
  buyOrder: BuyOrder;
  datasets: Dataset[];
  countries: Country[];
}) {
  return (
    <BuyOrderForm
      buyOrder={buyOrder}
      datasets={datasets}
      countries={countries}
      toActions={(result) => {
        return <Actions buyOrder={BuyOrderSchema.parse(result)} />;
      }}
    />
  );
}

function Fetch({ id }: { id: string }) {
  const [datasetsError, datasets] = useDatasets();
  const [countriesError, countries] = useCountries();
  const [buyOrderError, buyOrder] = useBuyOrder(id);
  if (datasetsError) throw datasetsError;
  if (countriesError) throw countriesError;
  if (buyOrderError) throw buyOrderError;
  if (!datasets || !countries || !buyOrder) return <Loading />;
  return (
    <Resolved buyOrder={buyOrder} countries={countries} datasets={datasets} />
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
