import { Box } from "./basics";

/*
 * a simple toggling button
 * when setActive is undefined, the button is readonly
 */
export function ToggleButton({
  active,
  setActive,
  children,
  ...props
}: {
  active: boolean;
  setActive?: (b: boolean) => void;
  children: React.ReactNode;
  [prop: string]: unknown; // TODO: could be more restrictive
}) {
  return (
    <Box
      as="button"
      px={2}
      py={1}
      height={1}
      borderStyle="solid"
      borderColor={active ? "black" : "muted"}
      color={active ? "text" : "muted"}
      backgroundColor={active ? "accent" : "bgLight"}
      fontSize={0}
      borderRadius={3}
      onClick={setActive ? () => setActive(!active) : undefined}
      cursor={setActive ? undefined : "pointer"}
      {...props}
    >
      {children}
    </Box>
  );
}
