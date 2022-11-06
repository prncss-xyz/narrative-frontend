import React from "react";
import { Box, Flex, Grid, H3 } from "../elements/shared";

export function BuyOrderLayout({
  grid,
  datasets,
  countrySelector,
  actionBox,
}: {
  grid: React.ReactNode;
  datasets: React.ReactNode;
  countrySelector: React.ReactNode;
  actionBox: React.ReactNode;
}) {
  return (
    <Flex justifyContent="center">
      <Flex flexDirection="column" width={6}>
        <Box px={4} py={3} backgroundColor="gray25">
          <Grid
            gridTemplateColumns={"1fr 1fr"}
            alignItems="start"
            gridRowGap={2}
            gridColumnGap={2}
          >
            {grid}
          </Grid>
          <Box mt={4} />
          <H3>Included datasets</H3>
          {datasets}
          <Box mt={4} />
          {countrySelector}
          <Box mt={6} />
          {actionBox}
        </Box>
      </Flex>
    </Flex>
  );
}
