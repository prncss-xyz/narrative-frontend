import { ReactNode } from "react";
import { Flex, OverlayActionBox } from "./basics";
import { Clickable } from "./Clickable";
import { Overlay } from "./Overlay";

export function Confirm({
  overlayVisible,
  setOverlayVisible,
  handler,
  children,
}: {
  overlayVisible: boolean;
  setOverlayVisible: (state: boolean) => void;
  handler: () => void;
  children: ReactNode;
}) {
  return (
    <Overlay
      visible={overlayVisible}
      onClickOutside={() => setOverlayVisible(false)}
    >
      {children}
      <Flex mt={4} gap={2} justifyContent="flex-end">
        <Clickable onClick={handler}>
          <OverlayActionBox>Yes</OverlayActionBox>
        </Clickable>
        <Clickable onClick={() => setOverlayVisible(false)}>
          <OverlayActionBox>No</OverlayActionBox>
        </Clickable>
      </Flex>
    </Overlay>
  );
}
