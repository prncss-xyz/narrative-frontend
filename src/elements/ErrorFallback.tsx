import { Box } from "./basics";

interface Error {
  message: string;
}

export function ErrorFallback({ error }: { error: Error }) {
  // TODO: could send log to server
  console.error(error);
  return (
    <Box role="alert">
      <Box fontSize={3}>Something went wrong.</Box>
      <pre>{error.message}</pre>
    </Box>
  );
}
