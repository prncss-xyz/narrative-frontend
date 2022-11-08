import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { buyOrders } from "../utils/api_samples";
import config from "../config";

// TODO: preprocess

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

export const BuyOrdersSchema = z.array(BuyOrderSchema);

export type BuyOrders = z.infer<typeof BuyOrdersSchema>;

function fetchBuyOrders() {
  if (config.isFake) {
    console.log("fetching buyorders");
    return Promise.resolve(BuyOrdersSchema.parse(processDates(buyOrders)));
  }
  return Promise.reject({ message: "TODO" });
}

export function useBuyOrders(): [unknown, undefined | BuyOrder[]] {
  const { error, data } = useQuery({
    queryKey: ["/buy-orders"],
    queryFn: fetchBuyOrders,
  });
  return [error, data];
}

function fetchBuyOrder(id: string) {
  if (config.isFake) {
    console.log("fetching buyorder", id);
    const buyOrder = buyOrders.find((b) => b.id === id);
    if (!buyOrder) return Promise.reject(`Buy order ${id} do net exits.`);
    return Promise.resolve(BuyOrderSchema.parse(processDate(buyOrder)));
  }
  return Promise.reject({ message: "TODO" });
}

export function useBuyOrder(id: string): [unknown, undefined | BuyOrder] {
  const { error, data } = useQuery({
    queryKey: [`/buy-order/${id}`],
    queryFn: () => fetchBuyOrder(id),
  });
  return [error, data];
}

export interface ProBuyOrder {
  name: string;
  datasetIds: number[];
  countries: string[];
  budget: number;
}

function createBuyOrder(proBuyOrder: ProBuyOrder) {
  const order = { ...proBuyOrder, createdAt: new Date() };
  if (config.isFake) {
    console.log("creating buyorder", order);
    return Promise.resolve(order);
  }
  return Promise.reject({ message: "TODO" });
}

export function useCreateBuyOrder() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createBuyOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [] });
    },
  });
  return mutation;
}

function deleteBuyOrder(id: string) {
  if (config.isFake) {
    console.log("deleting buyorder", id);
    return Promise.resolve(id);
  }
  return Promise.reject({ message: "TODO" });
}

export function useDeleteBuyOrder() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteBuyOrder,
    onSuccess: (id) => {
      queryClient.invalidateQueries({
        queryKey: ["/buy-orders", `/buy-order/${id}`],
      });
    },
  });
  return mutation;
}

function updateBuyOrder(buyOrder: BuyOrder) {
  if (config.isFake) {
    console.log("updating buyorder", buyOrder);
    return Promise.resolve(buyOrder);
  }
  return Promise.reject({ message: "TODO" });
}

export function useUpdateBuyOrder() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateBuyOrder,
    onSuccess: (buyOrder) => {
      queryClient.invalidateQueries({
        queryKey: ["/buy-orders", `/buy-order/${buyOrder.id}`],
      });
    },
  });
  return mutation;
}
