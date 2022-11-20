import { useTheme } from "@emotion/react";
import { NavLink } from "react-router-dom";
import { Box, Flex } from "./basics";

/*
 * The navigation bar appearing on top of every page
 */
export function Navigation() {
  const theme: any = useTheme();
  return (
    <Flex
      py={3}
      backgroundColor="navbar"
      color="bgDark"
      zIndex={10}
      position="sticky"
      top="0px"
      gap={4}
      css={{
        "& .active": {
          fontWeight: "bold",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,
          color: theme.colors.accent,
        },
      }}
    >
      <Box />
      <Box>
        <NavLink to="/buy-order-list">Buy Orders</NavLink>
      </Box>
      <Box>
        <NavLink to="/dataset-list">Datasets</NavLink>
      </Box>
    </Flex>
  );
}
