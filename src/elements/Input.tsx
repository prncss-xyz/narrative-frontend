export function identityString(valueString: string) {
  return valueString;
}

export function positve(valueString: string) {
  const value = Number(valueString);
  if (value >= 0) return value;
  return;
}

// type="number" behehaves too weird
export function Input<T>({
  placeholder,
  value,
  setValue,
  disabled,
  convert,
}: {
  placeholder: string;
  value: T;
  setValue: (value: T) => void;
  disabled?: boolean;
  convert: (value: string) => T | undefined;
}) {
  const handleChange = ({
    currentTarget: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const value_ = convert(value);
    if (value_) setValue(value_);
  };
  return (
    <>
      {disabled ? (
        <div css={{ display: "inline" }}>{String(value)}</div>
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          value={String(value)}
          onChange={handleChange}
        />
      )}
    </>
  );
}
