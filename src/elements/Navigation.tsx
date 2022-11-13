import { useTheme } from "@emotion/react";
import { NavLink } from "react-router-dom";
import { Box, Flex } from "./basics";

export function Navigation() {
  const theme: any = useTheme();
  return (
    <Flex
      py={3}
      backgroundColor="gray1"
      color="gray2"
      zIndex={10}
      position="sticky"
      top="0px"
      css={{
        "& .active": {
          fontWeight: "bold",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
          color: theme.colors.white,
        },
      }}
    >
      <Box mx={4}>
        <NavLink to="/buy-order-list">Buy Orders</NavLink>
      </Box>
      <Box mx={4}>
        <NavLink to="/dataset-list">Datasets</NavLink>
      </Box>
    </Flex>
  );
}
