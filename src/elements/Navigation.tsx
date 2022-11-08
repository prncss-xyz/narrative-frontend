import { useTheme } from "@emotion/react";
import { NavLink } from "react-router-dom";
import { Flex, Box } from "./basics";

export default function Navigation() {
  const theme = useTheme() as any;
  return (
    <Flex
      py={3}
      mb={4}
      backgroundColor="gray1"
      color="gray2"
      css={{
        zIndex: 10,
        position: "sticky",
        top: "0",
        "& .active": {
          fontWeight: "bold",
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
