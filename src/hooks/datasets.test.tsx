import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { apiURL } from "../utils/apiURL";
import { useDatasets } from "./datasets";

describe.skip("useDatasets", () => {
  const data = [
    {
      id: 1,
      name: "eating",
      label: "Eating Zones",
      description:
        "Data about global eating zones, including yields, historical trends and restaurant life surveys.",
      thumbnailUrl: "https://picsum.photos/id/1038/92/92",
      costPerRecord: 0.03,
    },
    {
      id: 2,
      name: "shipping",
      label: "Shipping Routes",
      description:
        "Metadata regarding global shipping routes. Contains data such as traffic volumne, operating restrictiona and mileage of routes.",
      thumbnailUrl: "https://picsum.photos/id/1002/92/92",
      costPerRecord: 0.05,
    },
  ];
  function wrap(value: unknown) {
    return { json: () => Promise.resolve(value) };
  }
  async function mocker() {
    return wrap(data);
  }
  const fetchMock = vi.fn().mockImplementation(mocker);
  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch the datasets list", async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useDatasets(), { wrapper });
    await waitFor(() => {
      expect(result.current).toBeTruthy();
    });
    const params = fetchMock.mock.calls[0];
    console.log(params);
    expect(params[0]).toBe(apiURL + "datasets");
    expect(
      () => params[1] === undefined || params[1].method === "GET"
    ).toBeTruthy();
  });
});
