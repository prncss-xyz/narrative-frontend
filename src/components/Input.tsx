import { useState } from "react";
import { Box, InputRaw } from "./basics";

function identity(s: string) {
  return s;
}

// type="number" behehaves too weird
export function Input<T>({
  placeholder,
  value,
  setValue,
  disabled,
  normalizer,
  converter,
  ...props
}: {
  placeholder: string;
  value: T;
  setValue: (value: T) => void;
  disabled?: boolean;
  normalizer?: (stringValue_: string) => string;
  converter: (stringValue_: string) => T | undefined;

  [prop: string]: unknown; // TODO: could be more restrictive
}) {
  const [stringValue, setStringValue] = useState(String(value));
  const n = normalizer || identity;
  const handleChange = ({
    currentTarget: { value: value_ },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const converted = converter(n(value_));
    if (converted === undefined) return;
    setValue(converted);
    setStringValue(value_);
  };
  return (
    <>
      {disabled ? (
        <Box display="inline" {...props}>
          {n(stringValue)}
        </Box>
      ) : (
        <InputRaw
          type="text"
          placeholder={placeholder}
          value={n(stringValue)}
          onChange={handleChange}
          {...props}
        />
      )}
    </>
  );
}
