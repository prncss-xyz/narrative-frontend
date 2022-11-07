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
    <button
      css={{
        border: "0px",
        background: "transparent",
        padding: "0px",
        cursor: disabled ? undefined : "pointer",
      }}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
