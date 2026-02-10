import { RequestHandler } from "express";
import Stripe from "stripe";
import {
  CreateCheckoutRequest,
  CreateCheckoutResponse,
} from "@shared/api";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export const handleCheckout: RequestHandler<
  unknown,
  CreateCheckoutResponse,
  CreateCheckoutRequest
> = async (req, res) => {
  try {
    const { items, shippingAddress, shippingCost, tax } = req.body;

    // Calculate total
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal + shippingCost + tax;

    // Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // Convert to cents
      currency: "usd",
      metadata: {
        items: JSON.stringify(items),
        shippingAddress: JSON.stringify(shippingAddress),
        subtotal: subtotal.toString(),
        shippingCost: shippingCost.toString(),
        tax: tax.toString(),
      },
    });

    const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY || "";

    res.json({
      clientSecret: paymentIntent.client_secret || "",
      publishableKey,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ error: "Checkout failed" });
  }
};
