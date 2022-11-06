import { BuyOrder } from "../elements/BuyOrder";
import { CountrySelectorContext } from "../elements/CountrySelector";
import { H1 } from "../elements/shared";
import { Mode } from "../utils/mode";

export default function NewBuyOrder() {
  return (
    <div>
      <H1>New Buy Order</H1>
      <CountrySelectorContext init={[]}>
        <BuyOrder mode={Mode.New} />
      </CountrySelectorContext>
    </div>
  );
}
