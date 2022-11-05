import { z } from "zod";
import { buyOrders } from "../utils/samples.test";

// TODO: preprocess

const BuyOrderSchema = z.object({
  id: z.string(), // FIX: docs says its a number
  name: z.string(),
  createdAt: z.string(),
  datasetIds: z.array(z.number()),
  countries: z.array(z.string()),
  budget: z.number(),
});

export type BuyOrder = z.infer<typeof BuyOrderSchema>;

const BuyOrdersSchema = z.array(BuyOrderSchema);

export type BuyOrders = z.infer<typeof BuyOrdersSchema>;

export function useBuyOrder(id: string) {
  const buyOrder = buyOrders.find((b) => b.id === id);
  if (!buyOrder) return undefined;
  return BuyOrderSchema.parse(buyOrder);
}

export function useBuyOrders() {
  return BuyOrdersSchema.parse(buyOrders);
}
