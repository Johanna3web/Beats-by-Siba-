import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Order } from "@shared/api";
import { CheckCircle } from "lucide-react";

export default function OrderConfirmation() {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!orderNumber) return;

    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${orderNumber}`);
        if (!response.ok) {
          throw new Error("Order not found");
        }
        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load order details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderNumber]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-gold mx-auto"></div>
            <p className="mt-4 text-foreground/70">Loading your order...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-6">{error || "Order not found"}</p>
            <Link
              to="/"
              className="inline-block px-8 py-3 bg-foreground text-background font-bold tracking-widest text-sm uppercase hover:bg-luxury-gold hover:text-foreground transition-all duration-300"
            >
              Return Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const shippingAddress = order.shippingAddress;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          {/* Success Message */}
          <div className="text-center mb-16">
            <CheckCircle size={64} className="text-luxury-gold mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-4">
              Order Confirmed!
            </h1>
            <p className="text-lg text-foreground/70 mb-8">
              Thank you for your purchase. Your order has been received and is
              being processed.
            </p>
            <p className="text-sm text-foreground/60">
              A confirmation email has been sent to{" "}
              <strong>{order.shippingAddress.email}</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            {/* Order Details */}
            <div className="lg:col-span-2">
              <div className="bg-luxury-beige/20 p-8 mb-8">
                <h2 className="text-2xl font-bold font-display text-foreground mb-6">
                  Order Details
                </h2>

                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div>
                    <p className="text-sm text-foreground/60 mb-1">
                      Order Number
                    </p>
                    <p className="text-xl font-bold text-foreground">
                      {order.orderNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60 mb-1">
                      Tracking Number
                    </p>
                    <p className="text-xl font-bold text-foreground">
                      {order.trackingNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60 mb-1">
                      Order Date
                    </p>
                    <p className="text-foreground">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60 mb-1">Status</p>
                    <p className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium">
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </p>
                  </div>
                </div>

                <div className="border-t border-luxury-beige pt-8">
                  <h3 className="text-lg font-bold text-foreground mb-6">
                    Order Items
                  </h3>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-luxury-beige">
                        <th className="text-left py-3 text-sm font-bold text-foreground/70">
                          Product
                        </th>
                        <th className="text-center py-3 text-sm font-bold text-foreground/70">
                          Qty
                        </th>
                        <th className="text-right py-3 text-sm font-bold text-foreground/70">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item) => (
                        <tr
                          key={item.id}
                          className="border-b border-luxury-beige/30"
                        >
                          <td className="py-4 text-foreground">{item.name}</td>
                          <td className="py-4 text-center">{item.quantity}</td>
                          <td className="py-4 text-right font-semibold">
                            R{(item.price * item.quantity).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="border-t border-luxury-beige mt-8 pt-8">
                  <div className="flex justify-between mb-4">
                    <span className="text-foreground/70">Subtotal</span>
                    <span className="font-semibold">R{order.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-foreground/70">Shipping</span>
                    <span className={order.shippingCost === 0 ? "text-luxury-gold font-semibold" : "font-semibold"}>
                      {order.shippingCost === 0
                        ? "Free"
                        : `R${order.shippingCost.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between mb-6 pb-6 border-b border-luxury-beige">
                    <span className="text-foreground/70">Tax</span>
                    <span className="font-semibold">R{Math.round(order.tax).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="font-bold text-foreground">Total</span>
                    <span className="font-bold text-luxury-gold">
                      R{Math.round(order.total).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to={`/track-order/${order.orderNumber}`}
                  className="flex-1 text-center px-6 py-3 bg-foreground text-background font-bold tracking-widest text-sm uppercase hover:bg-luxury-gold hover:text-foreground transition-all duration-300"
                >
                  Track Order
                </Link>
                <Link
                  to="/shop"
                  className="flex-1 text-center px-6 py-3 border-2 border-foreground text-foreground font-bold tracking-widest text-sm uppercase hover:bg-foreground hover:text-background transition-all duration-300"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <div className="bg-luxury-beige/30 p-8 sticky top-24">
                <h3 className="text-lg font-bold text-foreground mb-6">
                  Shipping Address
                </h3>

                <p className="text-foreground mb-1 font-semibold">
                  {shippingAddress.firstName} {shippingAddress.lastName}
                </p>
                <p className="text-foreground/70 mb-4">
                  {shippingAddress.address}
                </p>
                <p className="text-foreground/70 mb-1">
                  {shippingAddress.city}, {shippingAddress.state}{" "}
                  {shippingAddress.zipCode}
                </p>
                <p className="text-foreground/70 mb-6">
                  {shippingAddress.country}
                </p>

                <div className="border-t border-luxury-beige pt-6">
                  <h4 className="text-sm font-bold text-foreground/60 mb-3">
                    CONTACT INFORMATION
                  </h4>
                  <p className="text-foreground/70 mb-1">
                    <span className="text-foreground/60">Email:</span>{" "}
                    {shippingAddress.email}
                  </p>
                  <p className="text-foreground/70">
                    <span className="text-foreground/60">Phone:</span>{" "}
                    {shippingAddress.phone}
                  </p>
                </div>

                <p className="text-xs text-foreground/60 mt-6 italic">
                  If you need to make any changes to your order, please contact
                  our customer support team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
