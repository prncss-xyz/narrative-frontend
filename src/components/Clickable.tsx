import { Box } from "./basics";

export function Clickable({
  onClick,
  children,
  disabled,
  ...props
}: {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  [prop: string]: unknown; // TODO: could be more restrictive
}) {
  return (
    <Box>
      <Box
        as="button"
        backgroundColor="inherit"
        borderStyle="none"
        padding="0px"
        height="100%"
        cursor={disabled ? undefined : "pointer"}
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        {children}
      </Box>
    </Box>
  );
}
