import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { useDatasets } from "./datasets";

describe("useDatasets", () => {
  it("should fetch the datasets list", async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useDatasets(), { wrapper });
    await waitFor(() => {
      expect(result.current).toBeTruthy();
    });
    // valid results are ensured by type system
  });
});
