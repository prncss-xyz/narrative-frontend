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
  validate: (value: string) => any;
}) {
  const handleChange = ({
    currentTarget: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (validate(value)) setValue(value);
  };
  return (
    <>
      {disabled ? (
        <div css={{ display: "inline" }}>{String(value)}</div>
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
