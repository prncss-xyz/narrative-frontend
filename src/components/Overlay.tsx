import { useClickOutside } from "../hooks/clickOutside";
import { Box, Flex } from "./basics";

/*
 * When visible is true, displays child component in overlay, shading what is behind
 * When clicking outside setVisble is called with value false
 */
export function Overlay({
  visible,
  setVisible,
  children,
  ...props
}: {
  visible: boolean;
  setVisible: () => void;
  children: React.ReactNode;
  [prop: string]: unknown; // TODO: could be more restrictive
}) {
  const ref = useClickOutside(setVisible);
  if (!visible) return null;
  return (
    <>
      <Box
        backgroundColor="black"
        css={{
          position: "fixed",
          left: "0px",
          top: "0px",
          zIndex: 10,
          opacity: "50%",
        }}
        height="100vh"
        width="100vw"
      />
      <Flex
        flexDirection="column"
        css={{
          position: "fixed",
          left: "0px",
          top: "0px",
          zIndex: 10,
        }}
        height="100vh"
        width="100vw"
      >
        <Flex justifyContent="center" height="100%" width="100%">
          <Flex
            justifyContent="center"
            alignItems="center"
            color="text"
            flexDirection="column"
          >
            <Box
              ref={ref}
              backgroundColor="bgLight"
              p={2}
              borderStyle="solid"
              {...props}
            >
              {children}
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
