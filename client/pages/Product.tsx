import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartItem } from "@shared/api";
import { ShoppingBag, Heart, Share2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

const allProducts: Product[] = [
  {
    id: "1",
    name: "Luxury Wave Wig",
    category: "Wigs",
    price: 1400,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fd25120501a4543f48a86c5a6177513db%2F41706eba63d840329f095a5a7c8f8b6d?format=webp&width=800&height=1200",
    description:
      "Silky smooth waves with natural volume. Perfect for everyday elegance and special occasions.",
  },
  {
    id: "2",
    name: "Body Wave Collection",
    category: "Wigs",
    price: 1800,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fd25120501a4543f48a86c5a6177513db%2F5f6dfc8fba804577a13caa8bf14ff37d?format=webp&width=800&height=1200",
    description:
      "Stunning body waves with a soft, natural appearance. Versatile styling options included.",
  },
  {
    id: "3",
    name: "Deep Wave Luxury",
    category: "Wigs",
    price: 2000,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fd25120501a4543f48a86c5a6177513db%2F3eb3a8b6671d44d58ef5a2d3cb0f7693?format=webp&width=800&height=1200",
    description:
      "Rich, defined waves with premium quality. Creates a glamorous, voluminous look.",
  },
  {
    id: "4",
    name: "Straight Elegance Wig",
    category: "Wigs",
    price: 1400,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fd25120501a4543f48a86c5a6177513db%2F78a5987a4f9f4cb0ba098db998bd385a?format=webp&width=800&height=1200",
    description:
      "Sleek and sophisticated straight wig. Perfect for a polished, professional look.",
  },
  {
    id: "5",
    name: "Curly Crown Wig",
    category: "Wigs",
    price: 2100,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fd25120501a4543f48a86c5a6177513db%2Fd3aaa19d36544854b30082dbae88b145?format=webp&width=800&height=1200",
    description:
      "Bouncy, luxurious curls with incredible texture. Makes a bold, confident statement.",
  },
  {
    id: "6",
    name: "Blonde Bombshell",
    category: "Wigs",
    price: 2500,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fd25120501a4543f48a86c5a6177513db%2F47c9539baf284d66ab6cd9a6c8004184?format=webp&width=800&height=1200",
    description:
      "Premium blonde wig with silky straight hair. Elegant and timeless style.",
  },
  {
    id: "7",
    name: "Textured Wave Bundle",
    category: "Wigs",
    price: 1750,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fd25120501a4543f48a86c5a6177513db%2F290180c53b584193815d52ad3ba5d6fc?format=webp&width=800&height=1200",
    description:
      "Beautiful textured waves with natural appeal. Versatile for any occasion.",
  },
  {
    id: "8",
    name: "Voluminous Curls",
    category: "Wigs",
    price: 2800,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fd25120501a4543f48a86c5a6177513db%2F6dc55635ba0540e7b7b6ccdd6854ea7b?format=webp&width=800&height=1200",
    description:
      "Ultra-luxurious full curls with maximum volume. Premium quality for everyday glamour.",
  },
];

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-foreground/70 mb-6">
              Product not found
            </p>
            <Link
              to="/shop"
              className="inline-block px-8 py-3 bg-foreground text-background font-bold tracking-widest text-sm uppercase hover:bg-luxury-gold hover:text-foreground transition-all duration-300"
            >
              Back to Shop
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    };

    const existingCart = localStorage.getItem("beats_by_siba_cart");
    const cartItems = existingCart ? JSON.parse(existingCart) : [];

    const existingItemIndex = cartItems.findIndex(
      (item: CartItem) => item.id === product.id
    );

    if (existingItemIndex > -1) {
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      cartItems.push(cartItem);
    }

    localStorage.setItem("beats_by_siba_cart", JSON.stringify(cartItems));

    setIsAdded(true);
    setTimeout(() => {
      navigate("/cart");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <Link
            to="/shop"
            className="text-sm text-foreground/70 hover:text-foreground mb-8 inline-block"
          >
            ← Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Image */}
            <div className="bg-luxury-beige aspect-[3/4] overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-4">
                {product.name}
              </h1>

              <p className="text-sm text-foreground/60 font-medium tracking-widest mb-6">
                {product.category}
              </p>

              <div className="mb-8 pb-8 border-b border-luxury-beige">
                <p className="text-4xl font-bold text-luxury-gold mb-4">
                  R{product.price.toLocaleString()}
                </p>
                <p className="text-foreground/70 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Product Features */}
              <div className="mb-8 pb-8 border-b border-luxury-beige">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Why You'll Love It
                </h3>
                <ul className="space-y-3 text-foreground/70">
                  <li className="flex gap-3">
                    <span className="text-luxury-gold">✓</span>
                    <span>100% premium human hair</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-luxury-gold">✓</span>
                    <span>Naturally soft and durable</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-luxury-gold">✓</span>
                    <span>Flawless, natural appearance</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-luxury-gold">✓</span>
                    <span>Versatile styling options</span>
                  </li>
                </ul>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-foreground mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-foreground/20">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-luxury-beige transition-colors"
                    >
                      −
                    </button>
                    <span className="px-6 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 hover:bg-luxury-beige transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-4 font-bold tracking-widest text-sm uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                    isAdded
                      ? "bg-luxury-gold text-foreground"
                      : "bg-foreground text-background hover:bg-luxury-gold hover:text-foreground"
                  }`}
                >
                  <ShoppingBag size={20} />
                  {isAdded ? "Added to Cart" : "Add to Cart"}
                </button>

                <div className="flex gap-3">
                  <button className="flex-1 py-3 border-2 border-foreground text-foreground font-bold tracking-widest text-sm uppercase hover:bg-foreground hover:text-background transition-all duration-300 flex items-center justify-center gap-2">
                    <Heart size={20} />
                    <span className="hidden sm:inline">Wishlist</span>
                  </button>
                  <button className="flex-1 py-3 border-2 border-foreground text-foreground font-bold tracking-widest text-sm uppercase hover:bg-foreground hover:text-background transition-all duration-300 flex items-center justify-center gap-2">
                    <Share2 size={20} />
                    <span className="hidden sm:inline">Share</span>
                  </button>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="mt-8 p-6 bg-luxury-beige/20">
                <h4 className="font-bold text-foreground mb-2">
                  Free Shipping on Orders Over R500
                </h4>
                <p className="text-sm text-foreground/70">
                  Orders are carefully packaged and shipped within 1-2 business
                  days.
                </p>
              </div>
            </div>
          </div>

          {/* Care Guide */}
          <section className="bg-luxury-beige/20 p-8 mb-16">
            <h2 className="text-3xl font-bold font-display text-foreground mb-6">
              Hair Care Guide
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3">
                  Washing & Conditioning
                </h3>
                <p className="text-foreground/70">
                  Use cool water and sulfate-free products. Gently shampoo and
                  condition, then air dry or blow dry on low heat. Avoid hot
                  water to preserve color and texture.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3">
                  Styling & Storage
                </h3>
                <p className="text-foreground/70">
                  Use heat-styling tools on low to medium heat settings. Store
                  on a wig stand or in a cool, dry place. Brush gently with a
                  wide-tooth comb to prevent tangling.
                </p>
              </div>
            </div>
          </section>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold font-display text-foreground mb-8">
                You Might Also Like
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    to={`/product/${relatedProduct.id}`}
                    className="group"
                  >
                    <div className="relative bg-luxury-beige aspect-[3/4] overflow-hidden mb-4">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                    </div>
                    <h3 className="text-lg font-bold font-display text-foreground group-hover:text-luxury-gold transition-colors mb-1">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-sm text-foreground/60 mb-2">
                      {relatedProduct.category}
                    </p>
                    <p className="text-lg font-bold text-luxury-gold">
                      R{relatedProduct.price.toLocaleString()}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
