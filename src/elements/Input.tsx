import { Box } from "./basics";

// type="number" behehaves too weird
export function Input({
  placeholder,
  value,
  setValue,
  disabled,
  validate,
}: {
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  disabled?: boolean;
  validate: (value: string) => unknown;
}) {
  const handleChange = ({
    currentTarget: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (validate(value)) setValue(value);
  };
  return (
    <>
      {disabled ? (
        <Box display="inline">{String(value)}</Box>
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      )}
    </>
  );
}
