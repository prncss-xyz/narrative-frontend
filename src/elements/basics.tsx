import styled from "@emotion/styled";
import {
  border,
  color,
  flexbox,
  grid,
  layout,
  space,
  system,
  typography,
} from "styled-system";

const custom = system({
  gap: { property: "gap", scale: "space" },
  left: { property: "left", scale: "space" },
  top: { property: "top", scale: "space" },
  textDecoration: true,
  cursor: true,
  position: true,
});

export const Img = styled.img(border, space, layout);

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
      fontSize={5}
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
      color="tone4"
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
    <Box my={1} color="tone4" backgroundColor="tone1" py={1} px={2} {...props}>
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
    <Box my={1} color="tone4" backgroundColor="tone0" py={1} px={2} {...props}>
      {children}
    </Box>
  );
}
