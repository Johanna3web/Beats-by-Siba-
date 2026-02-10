import fs from "fs/promises";
import path from "path";
import { Order } from "@shared/api";

const ORDERS_FILE = path.join(process.cwd(), "data", "orders.json");

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(path.dirname(ORDERS_FILE), { recursive: true });
  } catch (error) {
    // Directory might already exist
  }
}

// Generate unique order number
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

// Get all orders from file
export async function getOrCreateOrdersFile(): Promise<Order[]> {
  await ensureDataDir();

  try {
    const data = await fs.readFile(ORDERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    // File doesn't exist, return empty array
    return [];
  }
}

// Save order to file
export async function saveOrder(order: Order): Promise<void> {
  await ensureDataDir();

  const orders = await getOrCreateOrdersFile();
  orders.push(order);

  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2));
}

// Get order by order number
export async function getOrder(orderNumber: string): Promise<Order | null> {
  const orders = await getOrCreateOrdersFile();
  return orders.find((order) => order.orderNumber === orderNumber) || null;
}

// Update order status
export async function updateOrderStatus(
  orderNumber: string,
  status: Order["status"],
): Promise<Order | null> {
  const orders = await getOrCreateOrdersFile();
  const index = orders.findIndex((order) => order.orderNumber === orderNumber);

  if (index === -1) {
    return null;
  }

  orders[index].status = status;
  orders[index].updatedAt = new Date().toISOString();

  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2));

  return orders[index];
}
