import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { buyOrders } from "../utils/apiSamples";
import { apiURL } from "../utils/apiURL";

const isFake = import.meta.env.VITE_FAKE;

export const BuyOrderSchema = z.object({
  id: z.string(), // FIX: docs says its a number
  name: z.string(),
  createdAt: z.date(),
  datasetIds: z.array(z.number()),
  countries: z.array(z.string()),
  budget: z.number(),
});

function toDate(value: unknown) {
  if (typeof value === "string") {
    return new Date(value);
  }
  throw Error("Expected type 'string'");
}

function processDate(rawBuyOrder: object) {
  return Object.fromEntries(
    Object.entries(rawBuyOrder).map(([key, value]) => [
      key,
      key === "createdAt" ? toDate(value) : value,
    ])
  );
}

function processDates(rawBuyOrders: object[]) {
  return rawBuyOrders.map((rawBuyOrder) => processDate(rawBuyOrder));
}

export type BuyOrder = z.infer<typeof BuyOrderSchema>;

const BuyOrdersSchema = z.array(BuyOrderSchema);

async function fetchBuyOrders(): Promise<BuyOrder[]> {
  let json: object[];
  if (isFake) {
    return Promise.resolve(BuyOrdersSchema.parse(processDates(buyOrders)));
  } else {
    const response = await fetch(apiURL + "buy-orders");
    json = await response.json();
  }
  return BuyOrdersSchema.parse(processDates(json));
}

export function useBuyOrders(): BuyOrder[] | undefined {
  const { error, data } = useQuery({
    queryKey: ["buy-orders"],
    queryFn: fetchBuyOrders,
  });
  if (error) throw error;
  return data;
}

async function fetchBuyOrder(id: string): Promise<BuyOrder> {
  let json: object;
  if (isFake) {
    console.log("fetching buyorder", id);
    const buyOrder = buyOrders.find((b) => b.id === id);
    if (!buyOrder) throw new Error(`Buy order ${id} do not exists.`);
    json = buyOrder;
  } else {
    const response: unknown = await fetch(apiURL + `buy-orders/${id}`);
    json: object = await response.json();
  }
  return BuyOrderSchema.parse(processDate(json));
}

export function useBuyOrder(id: string): BuyOrder | undefined {
  const { error, data } = useQuery({
    queryKey: [`buy-order/${id}`],
    queryFn: () => fetchBuyOrder(id),
  });
  if (error) throw error;
  return data;
}

export interface ProBuyOrder {
  name: string;
  datasetIds: number[];
  countries: string[];
  budget: number;
}

async function createBuyOrder(proBuyOrder: ProBuyOrder) {
  const order: {
    name: string;
    createdAt: string; // will be stringified
    datasetIds: number[];
    countries: string[];
    budget: number;
  } = { ...proBuyOrder, createdAt: new Date().toJSON() };
  if (isFake) {
    console.log("creating buyorder", order);
    return BuyOrderSchema.parse(processDate({ ...order, id: "1" }));
  }
  const response = await fetch(apiURL + "buy-orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  const json = await response.json();
  return BuyOrderSchema.parse(processDate(json));
}

export function useCreateBuyOrder() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createBuyOrder,
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      queryClient.invalidateQueries({ queryKey: [] });
    },
  });
  if (mutation.error) throw mutation.error;
  return mutation;
}

async function deleteBuyOrder(id: string): Promise<BuyOrder> {
  let json;
  if (isFake) {
    console.log("deleting buyorder", id);
    const buyOrder = buyOrders.find((b) => b.id === id);
    if (!buyOrder) throw new Error(`Buy order ${id} do not exists.`);
    json = buyOrder;
  } else {
    const response = await fetch(apiURL + `buy-orders/${id}`, {
      method: "DELETE",
    });
    json = await response.json();
  }
  return BuyOrderSchema.parse(processDate(json));
}

export function useDeleteBuyOrder() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteBuyOrder,
    onSuccess: (buyOrder: any) => {
      queryClient.invalidateQueries({
        queryKey: ["buy-orders", `buy-order/${buyOrder.id}`],
      });
    },
  });
  if (mutation.error) throw mutation.error;
  return mutation;
}

async function updateBuyOrder(buyOrder: BuyOrder): Promise<BuyOrder> {
  if (isFake) {
    console.log("updating buyorder", buyOrder);
    return buyOrder;
  }
  const response = await fetch(apiURL + `buy-orders/${buyOrder.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...buyOrder, id: undefined }),
  });
  const json = await response.json();
  return BuyOrderSchema.parse(processDate(json));
}

export function useUpdateBuyOrder() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateBuyOrder,
    onSuccess: (buyOrder: any) => {
      queryClient.invalidateQueries({
        queryKey: ["buy-orders", `buy-order/${buyOrder.id}`],
      });
    },
  });
  if (mutation.error) throw mutation.error;
  return mutation;
}
