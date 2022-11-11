import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { apiURL } from "../utils/apiURL";
import { useCountries } from "./countries";

describe("useCountries", () => {
  const data = [
    {
      countryCode: "FR",
      name: "France",
      storedData: [
        { datasetId: 1, recordCount: 500 },
        { datasetId: 2, recordCount: 0 },
        { datasetId: 3, recordCount: 2500 },
        { datasetId: 4, recordCount: 750 },
        { datasetId: 5, recordCount: 50 },
        { datasetId: 6, recordCount: 1000 },
      ],
    },
    {
      countryCode: "GB",
      name: "United Kingdom",
      storedData: [
        { datasetId: 1, recordCount: 0 },
        { datasetId: 2, recordCount: 1250 },
        { datasetId: 3, recordCount: 2000 },
        { datasetId: 4, recordCount: 1500 },
        { datasetId: 5, recordCount: 500 },
        { datasetId: 6, recordCount: 500 },
      ],
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

  it.skip("should fetch the countries list", async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useCountries(), { wrapper });
    await waitFor(() => {
      expect(result.current).toBeTruthy();
    });
    const params = fetchMock.mock.calls[0];
    expect(params[0]).toBe(apiURL + "countries");
    expect(
      () => params[1] === undefined || params[1].method === "GET"
    ).toBeTruthy();
  });
});
