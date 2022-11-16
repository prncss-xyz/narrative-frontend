import { Box } from "./basics";

export function RoundedButton({
  active,
  disabled,
  onClick,
  children,
  ...props
}: {
  active?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
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
      onClick={disabled ? undefined : onClick}
      cursor={disabled ? undefined : "pointer"}
      {...props}
    >
      {children}
    </Box>
  );
}