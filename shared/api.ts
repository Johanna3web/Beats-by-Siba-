/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

// Cart Types
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
}

// Order Types
export type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId?: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  status: OrderStatus;
  trackingNumber?: string;
  stripePaymentIntentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderTracking {
  orderId: string;
  orderNumber: string;
  status: OrderStatus;
  trackingNumber?: string;
  estimatedDelivery?: string;
  currentLocation?: string;
  updates: {
    status: OrderStatus;
    message: string;
    timestamp: string;
  }[];
}

// Payment Types
export interface CheckoutSession {
  clientSecret: string;
  publishableKey: string;
}

export interface CreateCheckoutRequest {
  items: CartItem[];
  shippingAddress: ShippingAddress;
  shippingCost: number;
  tax: number;
}

export interface CreateCheckoutResponse {
  clientSecret: string;
  publishableKey: string;
}

export interface ConfirmPaymentRequest {
  paymentIntentId: string;
  orderData: {
    items: CartItem[];
    shippingAddress: ShippingAddress;
    subtotal: number;
    shippingCost: number;
    tax: number;
    total: number;
  };
}

export interface ConfirmPaymentResponse {
  success: boolean;
  order: Order;
}

// Email Types
export interface OrderConfirmationEmail {
  to: string;
  orderNumber: string;
  order: Order;
}

export interface DemoResponse {
  message: string;
}
