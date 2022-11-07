import { Box } from "./shared";

export function RoundedButton({
  active,
  disabled,
  onClick,
  children,
}: {
  active?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
  children: React.ReactNode;
}) {
  return (
    <Box
      as="button"
      p={1}
      border={"solid"}
      borderColor={active ? undefined : "gray3"}
      color={active ? undefined : "gray1"}
      backgroundColor={active ? "white" : "gray3"}
      borderRadius={3}
      onClick={disabled ? undefined : onClick}
      css={{
        cursor: disabled ? undefined : "pointer",
      }}
    >
      {children}
    </Box>
  );
}
