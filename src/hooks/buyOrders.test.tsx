import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import { apiURL } from "../utils/apiURL";
import {
  ProBuyOrder,
  useBuyOrder,
  useBuyOrders,
  useCreateBuyOrder,
  useDeleteBuyOrder,
  useUpdateBuyOrder,
} from "./buyOrders";

describe("useBuyOrder", () => {
  it.skip("should permform a complete cycle of create, update, get, delete, get maintaining consistant values", async () => {
    const data1: ProBuyOrder = {
      name: "test name",
      datasetIds: [1],
      countries: ["CA"],
      budget: 3,
    };
    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    const { result: result1 } = renderHook(() => useCreateBuyOrder(), {
      wrapper,
    });

    // create
    act(() => {
      result1.current.mutate(data1);
    });
    await waitFor(() => expect(result1.current.data).toBeTruthy());
    if (!result1.current.data) throw new Error("Faulty test logic.");
    const { id, createdAt } = result1.current.data;

    // update
    const { result: result2 } = renderHook(() => useUpdateBuyOrder(), {
      wrapper,
    });
    const data2 = { ...data1, id, createdAt, name: "test name modified" };
    act(() => {
      result2.current.mutate(data2);
    });
    await waitFor(() => expect(result2.current.data).toBeTruthy());

    // get
    const { result: result3 } = renderHook(() => useBuyOrder(id), { wrapper });
    await waitFor(() => expect(result3.current).toBeTruthy());
    if (!result3?.current) throw new Error("Faulty test logic.");
    expect(result3.current).toEqual(data2);

    // delete
    const { result: result4 } = renderHook(() => useDeleteBuyOrder(), {
      wrapper,
    });
    act(() => {
      result4.current.mutate(id);
    });
    await waitFor(() => expect(result4.current.data).toBeTruthy());

    // get
    const { result: result5 } = renderHook(() => useBuyOrders(), { wrapper });
    await waitFor(() => expect(result5.current).toBeTruthy());
    expect(result5.current?.find((buyOrder) => buyOrder.id === id)).toBeFalsy();
  });
});

describe.skip("useBuyOrders", () => {
  it("should fetch a buyOrders list", async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useBuyOrders(), { wrapper });
    await waitFor(() => {
      expect(result.current).toBeTruthy();
    });
    // valid results are ensured by type system
  });
});
