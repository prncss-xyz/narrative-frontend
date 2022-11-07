import { Country } from "../hooks/countries";
import { Box } from "./shared";

export function CountryButton({
  country: { name },
  active,
  disabled,
  onClick,
}: {
  country: Country;
  active?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
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
      {name}
    </Box>
  );
}
