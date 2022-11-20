import { useState } from "react";
import { Box, InputRaw } from "./basics";

function identity(s: string) {
  return s;
}

/**
 * a component that is either a form input or a Box
 * both are formated with extra props passed by
 * it is an input form when setValue is provided
 * when the form value is changed, it is first modified by normalizer if provided
 * then converter converts it or return undefined.
 * If undefined is return, change event is refused. If a value is provided
 * this is the new field value. This permits to keep an arbitrary typed value in sync
 * with a text fomr. (We avoid using input type="number" as it behaves in unuseful and
 * inconsistent maners.)
 */
export function Input<T>({
  placeholder,
  value,
  setValue,
  normalizer,
  converter,
  ...props
}: {
  placeholder: string;
  value: T;
  setValue?: (value: T) => void;
  normalizer?: (stringValue_: string) => string;
  converter: (stringValue_: string) => T | undefined;

  [prop: string]: unknown; // TODO: could be more restrictive
}) {
  const [stringValue, setStringValue] = useState(String(value));
  const n = normalizer || identity;
  const handleChange = ({
    currentTarget: { value: value_ },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (!setValue) throw new Error("Handler should not have been called here.");
    const converted = converter(n(value_));
    if (converted === undefined) return;
    setValue(converted);
    setStringValue(value_);
  };
  if (setValue)
    return (
      <InputRaw
        type="text"
        placeholder={placeholder}
        value={n(stringValue)}
        onChange={handleChange}
        {...props}
      />
    );
  return (
    <Box display="inline" {...props}>
      {n(stringValue)}
    </Box>
  );
}
