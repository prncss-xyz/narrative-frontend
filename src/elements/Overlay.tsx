import { useClickOutside } from "../hooks/clickOutside";
import { Box, Flex } from "./shared";

export function Overlay({
  visible,
  onClickOutside,
  children,
  ...props
}: {
  visible: boolean;
  onClickOutside: () => void;
  children: React.ReactNode;
  [prop: string]: unknown; // TODO: could be more restrictive
}) {
  const ref = useClickOutside(onClickOutside);
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
            color="black"
            flexDirection="column"
          >
            <Box
              ref={ref}
              backgroundColor="gray3"
              p={2}
              border="solid"
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
