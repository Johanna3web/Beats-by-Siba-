import { RequestHandler } from "express";
import {
  ConfirmPaymentRequest,
  ConfirmPaymentResponse,
  Order,
  OrderTracking,
} from "@shared/api";
import {
  generateOrderNumber,
  getOrCreateOrdersFile,
  saveOrder,
  getOrder,
} from "../utils/orders";
import { sendOrderConfirmationEmail } from "../utils/email";

// Confirm payment and create order
export const handleConfirmPayment: RequestHandler<
  unknown,
  ConfirmPaymentResponse,
  ConfirmPaymentRequest
> = async (req, res) => {
  try {
    const { paymentIntentId, orderData } = req.body;

    // Generate order number
    const orderNumber = generateOrderNumber();

    // Create order object
    const order: Order = {
      id: paymentIntentId,
      orderNumber,
      items: orderData.items,
      shippingAddress: orderData.shippingAddress,
      subtotal: orderData.subtotal,
      shippingCost: orderData.shippingCost,
      tax: orderData.tax,
      total: orderData.total,
      status: "processing",
      trackingNumber: `TRACK-${orderNumber}`,
      stripePaymentIntentId: paymentIntentId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save order
    await saveOrder(order);

    // Send confirmation email
    await sendOrderConfirmationEmail({
      to: orderData.shippingAddress.email,
      orderNumber: order.orderNumber,
      order,
    });

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Payment confirmation error:", error);
    res.status(500).json({ success: false, error: "Failed to create order" });
  }
};

// Get order by order number
export const handleGetOrder: RequestHandler = async (req, res) => {
  try {
    const { orderNumber } = req.params;

    const order = await getOrder(orderNumber);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Get order error:", error);
    res.status(500).json({ error: "Failed to retrieve order" });
  }
};

// Get order tracking info
export const handleGetOrderTracking: RequestHandler = async (req, res) => {
  try {
    const { orderNumber } = req.params;

    const order = await getOrder(orderNumber);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Mock tracking data - in production this would come from a shipping API
    const tracking: OrderTracking = {
      orderId: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      trackingNumber: order.trackingNumber,
      estimatedDelivery: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      currentLocation: "In Transit",
      updates: [
        {
          status: "processing",
          message: "Order received and processing",
          timestamp: order.createdAt,
        },
        ...(order.status !== "processing"
          ? [
              {
                status: "shipped" as const,
                message: "Package shipped",
                timestamp: new Date(
                  Date.now() - 2 * 24 * 60 * 60 * 1000,
                ).toISOString(),
              },
            ]
          : []),
        ...(order.status === "delivered"
          ? [
              {
                status: "delivered" as const,
                message: "Package delivered",
                timestamp: new Date().toISOString(),
              },
            ]
          : []),
      ],
    };

    res.json(tracking);
  } catch (error) {
    console.error("Get tracking error:", error);
    res.status(500).json({ error: "Failed to retrieve tracking" });
  }
};
