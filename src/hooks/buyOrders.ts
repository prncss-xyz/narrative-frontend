import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { apiURL } from "../utils/apiURL";

/**
 * schema representing a BuyOrder
 * used for run time check
 */
export const BuyOrderSchema = z.object({
  id: z.string(), // FIX: docs says its a number
  name: z.string(),
  createdAt: z.date(),
  datasetIds: z.array(z.number()),
  countries: z.array(z.string()),
  budget: z.number(),
});

// after parsing JSON, createdAt will need to be converted from string to Date
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
  const response = await fetch(apiURL + "buy-orders");
  const json = await response.json();
  return BuyOrdersSchema.parse(processDates(json));
}

/**
 * fetch all buy orders
 */
export function useBuyOrders(): BuyOrder[] | undefined {
  const { error, data } = useQuery({
    queryKey: ["buy-orders"],
    queryFn: fetchBuyOrders,
  });
  if (error) throw error;
  return data;
}

async function fetchBuyOrder(id: string): Promise<BuyOrder> {
  const response = await fetch(apiURL + `buy-orders/${id}`);
  const json = await response.json();
  return BuyOrderSchema.parse(processDate(json));
}

/**
 * fetch selected buy order
 */
export function useBuyOrder(id: string): BuyOrder | undefined {
  const { error, data } = useQuery({
    queryKey: [`buy-order/${id}`],
    queryFn: () => fetchBuyOrder(id),
  });
  if (error) throw error;
  return data;
}

/**
 * parts of the buyOrder at creation
 */
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
  const response = await fetch(apiURL + "buy-orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  const json = await response.json();
  return BuyOrderSchema.parse(processDate(json));
}

/**
 * mutation to create a buy order,
 * returns the full buyOrder (with id and createdAt)
 */
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
  const response = await fetch(apiURL + `buy-orders/${id}`, {
    method: "DELETE",
  });
  const json = await response.json();
  return BuyOrderSchema.parse(processDate(json));
}

/**
 * mutation to delete a buy order
 * returns the deleted buy order
 */
export function useDeleteBuyOrder() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteBuyOrder,
    onSuccess: (buyOrder: any) =>
      queryClient.invalidateQueries({
        queryKey: [
          "buy-orders",
          `buy-order/${BuyOrderSchema.parse(buyOrder).id}`,
        ],
      }),
  });
  if (mutation.error) throw mutation.error;
  return mutation;
}

async function updateBuyOrder(buyOrder: BuyOrder): Promise<BuyOrder> {
  const response = await fetch(apiURL + `buy-orders/${buyOrder.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...buyOrder, id: undefined }),
  });
  const json = await response.json();
  return BuyOrderSchema.parse(processDate(json));
}

/**
 * mutation to update a buy order
 * returns the updated buy order
 */
export function useUpdateBuyOrder() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateBuyOrder,
    onSuccess: (buyOrder: any) =>
      queryClient.invalidateQueries({
        queryKey: [
          "buy-orders",
          `buy-order/${BuyOrderSchema.parse(buyOrder).id}`,
        ],
      }),
  });
  if (mutation.error) throw mutation.error;
  return mutation;
}
