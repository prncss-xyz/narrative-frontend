import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import {
  border,
  space,
  layout,
  color,
  flexbox,
  grid,
  typography,
  system,
} from "styled-system";

const textTransform = system({ textTransform: true });

export const Box = styled.div(
  {
    boxSizing: "border-box",
    minWidth: 0,
  },
  border,
  space,
  layout,
  color,
  flexbox,
  grid,
  typography,
  textTransform
);

export const Flex = styled(Box)({ display: "flex" });

export const Grid = styled(Box)({ display: "grid" });

export function H1({
  children,
  ...props
}: {
  children: React.ReactNode;
  [prop: string]: unknown; // TODO: could be more restrictive
}) {
  const theme = useTheme() as any;
  return (
    <Box as="h1" my={4} {...theme.styles.h1} {...props}>
      {children}
    </Box>
  );
}

export function H2({
  children,
  ...props
}: {
  children: React.ReactNode;
  [prop: string]: unknown; // TODO: could be more restrictive
}) {
  const theme = useTheme() as any;
  return (
    <Box as="h2" my={1} {...theme.styles.h2} {...props}>
      {children}
    </Box>
  );
}
