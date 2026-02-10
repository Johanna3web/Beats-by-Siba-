import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleCheckout } from "./routes/checkout";
import {
  handleConfirmPayment,
  handleGetOrder,
  handleGetOrderTracking,
} from "./routes/orders";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Payment routes
  app.post("/api/checkout", handleCheckout);
  app.post("/api/confirm-payment", handleConfirmPayment);

  // Order routes
  app.get("/api/orders/:orderNumber", handleGetOrder);
  app.get("/api/orders/:orderNumber/tracking", handleGetOrderTracking);

  return app;
}
