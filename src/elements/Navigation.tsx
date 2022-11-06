import { useTheme } from "@emotion/react";
import { NavLink } from "react-router-dom";
import { Flex, Box } from "./shared";

export default function Navigation() {
  const theme = useTheme() as any;
  return (
    <Flex
      py={3}
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
        <NavLink to="/buy-orders">Buy Orders</NavLink>
      </Box>
      <Box mx={4}>
        <NavLink to="/datasets">Datasets</NavLink>
      </Box>
    </Flex>
  );
}
