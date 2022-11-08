import { Box } from "./basics";

export function ErrorFallback({ error }: { error: any }) {
  // TODO: could send log to server
  console.error(error);
  return (
    <Box role="alert">
      <Box fontSize={3}>Something went wrong.</Box>
      <pre>{error?.message}</pre>
    </Box>
  );
}
