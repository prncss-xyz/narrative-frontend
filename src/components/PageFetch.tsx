import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { Box } from "./basics";

interface Error {
  message: string;
}

export function PageFetch<T>({
  queryFn,
  children,
}: {
  queryFn: () => Promise<T>;
  children: (t: T) => React.ReactNode;
}) {
  const { pathname } = useLocation();
  const { error, data } = useQuery({
    queryKey: [pathname],
    queryFn,
  });
  if (!data) return <></>;
  if (error)
    return <Box>{"An error has occurred: " + (error as Error).message}</Box>;
  return <>{children(data)}</>;
}
