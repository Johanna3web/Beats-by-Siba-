import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartItem, ShippingAddress } from "@shared/api";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

export default function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingAddress>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
    },
  });

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("beats_by_siba_cart");
    if (savedCart) {
      const items = JSON.parse(savedCart);
      if (items.length === 0) {
        navigate("/cart");
        return;
      }
      setCartItems(items);
    } else {
      navigate("/cart");
    }
  }, [navigate]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shippingCost = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.15;
  const total = subtotal + shippingCost + tax;

  const onSubmit = async (shippingAddress: ShippingAddress) => {
    setIsProcessing(true);
    setError("");

    try {
      // Step 1: Create checkout session with Stripe
      const checkoutResponse = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems,
          shippingAddress,
          shippingCost,
          tax,
        }),
      });

      if (!checkoutResponse.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { clientSecret: secret } = await checkoutResponse.json();
      setClientSecret(secret);

      // Step 2: Redirect to payment confirmation with intent ID
      // In a real app, you'd use Stripe Elements or Payment Element here
      // For now, we'll simulate a successful payment
      const paymentIntentId = secret.split("_secret_")[0];

      // Step 3: Confirm payment (simulated)
      const confirmResponse = await fetch("/api/confirm-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentIntentId,
          orderData: {
            items: cartItems,
            shippingAddress,
            subtotal,
            shippingCost,
            tax,
            total,
          },
        }),
      });

      if (!confirmResponse.ok) {
        throw new Error("Failed to confirm payment");
      }

      const { order } = await confirmResponse.json();

      // Clear cart
      localStorage.removeItem("beats_by_siba_cart");

      // Redirect to confirmation
      navigate(`/order-confirmation/${order.orderNumber}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred. Please try again.",
      );
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-12">
            Checkout
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Shipping Information */}
                <div className="bg-luxury-beige/20 p-8">
                  <h2 className="text-2xl font-bold font-display text-foreground mb-6">
                    Shipping Address
                  </h2>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        First Name *
                      </label>
                      <input
                        {...register("firstName", {
                          required: "First name is required",
                        })}
                        className="w-full px-4 py-2 border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                        placeholder="Jane"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Last Name *
                      </label>
                      <input
                        {...register("lastName", {
                          required: "Last name is required",
                        })}
                        className="w-full px-4 py-2 border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className="w-full px-4 py-2 border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                      placeholder="jane@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone *
                    </label>
                    <input
                      {...register("phone", { required: "Phone is required" })}
                      className="w-full px-4 py-2 border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                      placeholder="(555) 123-4567"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Address *
                    </label>
                    <input
                      {...register("address", {
                        required: "Address is required",
                      })}
                      className="w-full px-4 py-2 border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                      placeholder="123 Main St"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.address.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        City *
                      </label>
                      <input
                        {...register("city", { required: "City is required" })}
                        className="w-full px-4 py-2 border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                        placeholder="New York"
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.city.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        State *
                      </label>
                      <input
                        {...register("state", {
                          required: "State is required",
                        })}
                        className="w-full px-4 py-2 border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                        placeholder="NY"
                      />
                      {errors.state && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.state.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        ZIP Code *
                      </label>
                      <input
                        {...register("zipCode", {
                          required: "ZIP code is required",
                        })}
                        className="w-full px-4 py-2 border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                        placeholder="10001"
                      />
                      {errors.zipCode && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.zipCode.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Country *
                      </label>
                      <input
                        {...register("country", {
                          required: "Country is required",
                        })}
                        className="w-full px-4 py-2 border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                        placeholder="United States"
                      />
                      {errors.country && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.country.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Payment Section */}
                <div className="bg-luxury-beige/20 p-8">
                  <h2 className="text-2xl font-bold font-display text-foreground mb-6">
                    Payment Method
                  </h2>
                  <p className="text-sm text-foreground/70 mb-6">
                    Stripe integration will be processed securely. This is a
                    demo setup.
                  </p>

                  <div className="bg-blue-50 border border-blue-200 p-4 rounded mb-6">
                    <p className="text-sm text-blue-800">
                      💳 Demo Mode: Click "Complete Order" to simulate a
                      successful payment and see your order confirmation.
                    </p>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 p-4 rounded">
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full px-8 py-4 bg-foreground text-background font-bold tracking-widest text-sm uppercase hover:bg-luxury-gold hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isProcessing && (
                    <Loader2 size={20} className="animate-spin" />
                  )}
                  {isProcessing ? "Processing..." : "Complete Order"}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-luxury-beige/30 p-8 sticky top-24">
                <h3 className="text-2xl font-bold font-display text-foreground mb-6">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-8">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm text-foreground/70"
                    >
                      <span>
                        {item.name} x{item.quantity}
                      </span>
                      <span>
                        R{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t border-luxury-beige pt-4">
                  <div className="flex justify-between text-foreground/70">
                    <span>Subtotal</span>
                    <span>R{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-foreground/70">
                    <span>Shipping</span>
                    <span
                      className={shippingCost === 0 ? "text-luxury-gold" : ""}
                    >
                      {shippingCost === 0
                        ? "Free"
                        : `R${shippingCost.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-foreground/70">
                    <span>Tax</span>
                    <span>R{Math.round(tax).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-foreground pt-3 border-t border-luxury-beige">
                    <span>Total</span>
                    <span className="text-luxury-gold">
                      R{Math.round(total).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
