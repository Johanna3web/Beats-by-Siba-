import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { OrderTracking } from "@shared/api";
import { Search, CheckCircle2, Circle, Package, Truck } from "lucide-react";

export default function TrackOrder() {
  const [orderNumber, setOrderNumber] = useState("");
  const [tracking, setTracking] = useState<OrderTracking | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;

    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const response = await fetch(
        `/api/orders/${orderNumber.toUpperCase()}/tracking`
      );

      if (!response.ok) {
        throw new Error("Order not found. Please check your order number.");
      }

      const data = await response.json();
      setTracking(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to retrieve tracking info"
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Package className="w-6 h-6" />;
      case "shipped":
        return <Truck className="w-6 h-6" />;
      case "delivered":
        return <CheckCircle2 className="w-6 h-6" />;
      default:
        return <Circle className="w-6 h-6" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "text-blue-600 bg-blue-50";
      case "shipped":
        return "text-orange-600 bg-orange-50";
      case "delivered":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const isCompleted = (status: string, currentStatus: string) => {
    const statusOrder = ["processing", "shipped", "delivered"];
    return statusOrder.indexOf(status) <= statusOrder.indexOf(currentStatus);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-4">
              Track Your Order
            </h1>
            <p className="text-lg text-foreground/70">
              Enter your order number to track your package in real-time
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-2xl mx-auto mb-12">
            <form onSubmit={handleSearch} className="relative">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="Enter your order number (e.g., ORD-XXXXX-XXXXX)"
                  className="flex-1 px-6 py-4 border-2 border-foreground/20 focus:outline-none focus:border-luxury-gold text-foreground placeholder-foreground/40"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-4 bg-foreground text-background font-bold tracking-widest text-sm uppercase hover:bg-luxury-gold hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
                >
                  <Search size={18} />
                  <span className="hidden sm:inline">Track</span>
                </button>
              </div>
            </form>

            {/* Error Message */}
            {error && searched && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* Tracking Details */}
          {tracking && (
            <div className="max-w-4xl mx-auto">
              {/* Order Header */}
              <div className="bg-luxury-beige/20 p-8 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <p className="text-sm text-foreground/60 mb-1">
                      Order Number
                    </p>
                    <p className="text-lg font-bold text-foreground">
                      {tracking.orderNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60 mb-1">
                      Tracking Number
                    </p>
                    <p className="text-lg font-bold text-foreground">
                      {tracking.trackingNumber || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60 mb-1">Status</p>
                    <p
                      className={`inline-block px-4 py-2 rounded font-semibold text-sm ${getStatusColor(tracking.status)}`}
                    >
                      {tracking.status.charAt(0).toUpperCase() +
                        tracking.status.slice(1)}
                    </p>
                  </div>
                </div>

                {tracking.estimatedDelivery && (
                  <div className="border-t border-luxury-beige pt-6">
                    <p className="text-sm text-foreground/60 mb-1">
                      Estimated Delivery
                    </p>
                    <p className="text-foreground font-semibold">
                      {new Date(tracking.estimatedDelivery).toLocaleDateString(
                        "en-US",
                        { weekday: "long", year: "numeric", month: "long", day: "numeric" }
                      )}
                    </p>
                  </div>
                )}
              </div>

              {/* Timeline */}
              <div className="bg-white border border-luxury-beige p-8 mb-8">
                <h2 className="text-2xl font-bold font-display text-foreground mb-8">
                  Shipment Timeline
                </h2>

                <div className="space-y-8">
                  {tracking.updates.map((update, index) => {
                    const completed = isCompleted(update.status, tracking.status);
                    const isLatest = index === tracking.updates.length - 1;

                    return (
                      <div key={index} className="relative">
                        {/* Timeline Line */}
                        {!isLatest && (
                          <div
                            className={`absolute left-3 top-12 w-0.5 h-12 ${
                              completed
                                ? "bg-luxury-gold"
                                : "bg-foreground/10"
                            }`}
                          />
                        )}

                        {/* Timeline Item */}
                        <div className="flex gap-6">
                          <div
                            className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                              completed
                                ? "bg-luxury-gold text-foreground"
                                : "bg-foreground/10 text-foreground/40"
                            }`}
                          >
                            {getStatusIcon(update.status)}
                          </div>

                          <div className="flex-1 pb-4">
                            <h3 className="text-lg font-bold text-foreground mb-1">
                              {update.status.charAt(0).toUpperCase() +
                                update.status.slice(1)}
                            </h3>
                            <p className="text-foreground/70 mb-2">
                              {update.message}
                            </p>
                            <p className="text-sm text-foreground/50">
                              {new Date(update.timestamp).toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "short",
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Current Location */}
              {tracking.currentLocation && (
                <div className="bg-luxury-champagne/10 border border-luxury-champagne/30 p-8 mb-8">
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    Current Location
                  </h3>
                  <p className="text-foreground/70">
                    {tracking.currentLocation}
                  </p>
                </div>
              )}

              {/* Help Section */}
              <div className="bg-luxury-beige/20 p-8">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Need Help?
                </h3>
                <p className="text-foreground/70 mb-4">
                  If you have any questions about your order or tracking, please
                  don't hesitate to contact our customer support team.
                </p>
                <p className="text-sm text-foreground/60">
                  Email: <strong>support@beatsbysiba.com</strong>
                </p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!tracking && searched && !loading && (
            <div className="text-center py-16">
              <p className="text-lg text-foreground/70 mb-8">
                No tracking information available. Please check your order number
                and try again.
              </p>
              <button
                onClick={() => setSearched(false)}
                className="px-8 py-3 bg-foreground text-background font-bold tracking-widest text-sm uppercase hover:bg-luxury-gold hover:text-foreground transition-all duration-300"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Initial State */}
          {!searched && (
            <div className="text-center py-16">
              <p className="text-lg text-foreground/70">
                Enter your order number above to view tracking details
              </p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-gold mx-auto mb-4"></div>
              <p className="text-foreground/70">Loading tracking information...</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
