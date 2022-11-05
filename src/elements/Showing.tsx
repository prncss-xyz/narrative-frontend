import { Flex, Box } from "./shared";
import { countryString } from "../utils/countryString";
import { Overlay } from "./Overlay";
import { Clickable } from "./Clickable";
import { useState } from "react";
import { CountrySelector, useCountrySelectorList } from "./CountrySelector";

function Select({
  overlayVisible,
  setOverlayVisible,
}: {
  overlayVisible: boolean;
  setOverlayVisible: (state: boolean) => void;
}) {
  return (
    <Overlay
      visible={overlayVisible}
      onClickOutside={() => setOverlayVisible(false)}
    >
      <CountrySelector />
    </Overlay>
  );
}

export function Showing({
  count,
}: {
  count: number;
}) {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const countries = useCountrySelectorList();
  return (
    <>
      <Select
        overlayVisible={overlayVisible}
        setOverlayVisible={setOverlayVisible}
      />
      <Clickable onClick={() => setOverlayVisible(true)}>
        <Flex color="gray1">
          <Box>Showing</Box>
          <Box color="black" fontWeight="bold">
            &nbsp;{count}&nbsp;
          </Box>
          <Box>results from</Box>
          <Box color="black" fontWeight="bold">
            &nbsp;{countryString(countries)}&nbsp;
          </Box>
        </Flex>
      </Clickable>
    </>
  );
}
