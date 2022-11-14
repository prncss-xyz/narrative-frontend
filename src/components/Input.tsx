import { Box, InputRaw } from "./basics";

// type="number" behehaves too weird
export function Input({
  placeholder,
  value,
  setValue,
  disabled,
  validate,
  ...props
}: {
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  disabled?: boolean;
  validate: (value: string) => unknown;
  [prop: string]: unknown; // TODO: could be more restrictive
}) {
  const handleChange = ({
    currentTarget: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (validate(value)) setValue(value);
  };
  return (
    <>
      {disabled ? (
        <Box display="inline" {...props}>
          {String(value)}
        </Box>
      ) : (
        <InputRaw
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          {...props}
        />
      )}
    </>
  );
}
