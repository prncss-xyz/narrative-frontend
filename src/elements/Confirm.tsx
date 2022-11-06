import { useTheme } from "@emotion/react";
import { ReactNode } from "react";
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
  const theme = useTheme() as any;
  return (
    <Overlay
      visible={overlayVisible}
      onClickOutside={() => setOverlayVisible(false)}
    >
      {children}
      <Flex
        mt={4}
        css={{
          justifyContent: "flex-end",
          gap: theme.space[2],
        }}
      >
        <Clickable onClick={handler}>
          <Box css={theme.styles.overlayActionButton}>Yes</Box>
        </Clickable>
        <Clickable onClick={() => setOverlayVisible(false)}>
          <Box css={theme.styles.overlayActionButton}>No</Box>
        </Clickable>
      </Flex>
    </Overlay>
  );
}
import { Box, Flex } from "./shared";
