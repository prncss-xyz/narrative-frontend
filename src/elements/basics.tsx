import styled from "@emotion/styled";
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

const custom = system({
  gap: { property: "gap", scale: "space" },
  textDecoration: true,
});

export const Img = styled.img(
  border,
  space,
  layout,
)

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
  custom
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
  return (
    <Box
      as="h1"
      my={4}
      textAlign="center"
      fontWeight="normal"
      fontSize={4}
      {...props}
    >
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
  return (
    <Box
      as="h2"
      my={3}
      color="gray1"
      fontWeight="bold"
      fontSize={3}
      {...props}
    >
      {children}
    </Box>
  );
}

export function H3({
  children,
  ...props
}: {
  children: React.ReactNode;
  [prop: string]: unknown; // TODO: could be more restrictive
}) {
  return (
    <Box
      as="h3"
      my={1}
      color="gray1"
      fontWeight="normal"
      textDecoration="underline"
      fontSize={2}
      {...props}
    >
      {children}
    </Box>
  );
}

export function ActionBox({
  children,
  ...props
}: {
  children: React.ReactNode;
  [prop: string]: unknown; // TODO: could be more restrictive
}) {
  return (
    <Box
      my={1}
      color="gray1"
      backgroundColor="gray3"
      py={1}
      px={2}
      {...props}
    >
      {children}
    </Box>
  );
}


export function OverlayActionBox({
  children,
  ...props
}: {
  children: React.ReactNode;
  [prop: string]: unknown; // TODO: could be more restrictive
}) {
  return (
    <Box
      my={1}
      color="gray1"
      backgroundColor="white"
      py={1}
      px={2}
      {...props}
    >
      {children}
    </Box>
  );
}
