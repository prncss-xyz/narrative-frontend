export function Clickable({
  onClick,
  children,
  ...props
}: {
  onClick: () => void;
  children: React.ReactNode;
  [prop: string]: unknown; // TODO: could be more restrictive
}) {
  return (
    <button
      css={{
        border: "0px",
        background: "transparent",
        padding: "0px",
        cursor: "pointer",
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
