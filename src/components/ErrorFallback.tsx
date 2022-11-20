import { Box } from "./basics";

interface Error {
  message: string;
}

/**
 * component used to display error messages
 * could be the place to send logs to server
 */
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
