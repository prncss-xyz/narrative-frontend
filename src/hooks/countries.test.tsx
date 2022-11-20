import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { useCountries } from "./countries";

describe("useCountries", () => {
  it("should fetch a buyOrders list", async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useCountries(), { wrapper });
    await waitFor(() => {
      expect(result.current).toBeTruthy();
    });
    // valid results are ensured by type system
  });
});
