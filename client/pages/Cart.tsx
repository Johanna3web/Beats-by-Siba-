import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartItem } from "@shared/api";

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isEmpty, setIsEmpty] = useState(true);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("beats_by_siba_cart");
    if (savedCart) {
      const items = JSON.parse(savedCart);
      setCartItems(items);
      setIsEmpty(items.length === 0);
    }
  }, []);

  // Save cart to localStorage
  const saveCart = (items: CartItem[]) => {
    localStorage.setItem("beats_by_siba_cart", JSON.stringify(items));
    setCartItems(items);
    setIsEmpty(items.length === 0);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    saveCart(updated);
  };

  const removeItem = (id: string) => {
    const updated = cartItems.filter((item) => item.id !== id);
    saveCart(updated);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shippingCost = subtotal > 0 ? (subtotal > 100 ? 0 : 15) : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-12">
            Shopping Cart
          </h1>

          {isEmpty ? (
            <div className="text-center py-16">
              <p className="text-lg text-foreground/70 mb-8">
                Your cart is empty. Start shopping to add items!
              </p>
              <Link
                to="/shop"
                className="inline-block px-8 py-3 bg-foreground text-background font-bold tracking-widest text-sm uppercase hover:bg-luxury-gold hover:text-foreground transition-all duration-300"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-6 pb-6 border-b border-luxury-beige"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 md:w-32 md:h-32 object-cover bg-luxury-beige"
                      />

                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-foreground mb-1">
                          {item.name}
                        </h3>
                        <p className="text-luxury-gold font-semibold mb-4">
                          ${item.price.toFixed(2)}
                        </p>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-foreground/20">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-luxury-beige transition-colors"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-4 font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-luxury-beige transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-red-500 hover:bg-red-50 transition-colors ml-auto"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-bold text-foreground">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <div className="bg-luxury-beige/30 p-8 sticky top-24">
                  <h3 className="text-2xl font-bold font-display text-foreground mb-6">
                    Order Summary
                  </h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-foreground/70">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-foreground/70">
                      <span>Shipping</span>
                      <span className={subtotal > 100 ? "text-luxury-gold" : ""}>
                        {subtotal > 100 ? "Free" : `$${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    {subtotal > 100 && (
                      <p className="text-sm text-luxury-gold">
                        ✓ Free shipping on orders over $100!
                      </p>
                    )}
                    <div className="flex justify-between text-foreground/70">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-luxury-beige pt-4 flex justify-between text-lg font-bold text-foreground">
                      <span>Total</span>
                      <span className="text-luxury-gold">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Link
                    to="/checkout"
                    className="block w-full text-center px-6 py-3 bg-foreground text-background font-bold tracking-widest text-sm uppercase hover:bg-luxury-gold hover:text-foreground transition-all duration-300 mb-4"
                  >
                    Proceed to Checkout
                  </Link>

                  <Link
                    to="/shop"
                    className="block w-full text-center px-6 py-3 border-2 border-foreground text-foreground font-bold tracking-widest text-sm uppercase hover:bg-foreground hover:text-background transition-all duration-300"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
