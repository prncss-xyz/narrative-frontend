import { z } from "zod";
import { buyOrders } from "../utils/samples.test";

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

export function useBuyOrder(id: string) {
  const buyOrder = buyOrders.find((b) => b.id === id);
  if (!buyOrder) return Promise.resolve(null);
  return Promise.resolve(BuyOrderSchema.parse(processDate(buyOrder)));
}

export function useBuyOrders() {
  return Promise.resolve(BuyOrdersSchema.parse(processDates(buyOrders)));
}

