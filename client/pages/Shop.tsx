import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartItem } from "@shared/api";
import { ShoppingBag } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

const products: Product[] = [
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

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [addedToCart, setAddedToCart] = useState<string>("");

  const categories = ["all", "Wigs", "Bundles", "Closures", "Frontals"];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    };

    const existingCart = localStorage.getItem("beats_by_siba_cart");
    const cartItems = existingCart ? JSON.parse(existingCart) : [];

    const existingItemIndex = cartItems.findIndex(
      (item: CartItem) => item.id === product.id
    );

    if (existingItemIndex > -1) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      cartItems.push(cartItem);
    }

    localStorage.setItem("beats_by_siba_cart", JSON.stringify(cartItems));

    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(""), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Shop Header */}
        <div className="bg-luxury-beige/30 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-4">
              Our Collections
            </h1>
            <p className="text-lg text-foreground/70">
              Discover our premium selection of luxury hair products
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {/* Category Filter */}
          <div className="mb-12 flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 font-medium tracking-wide text-sm uppercase transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-foreground text-background"
                    : "border-2 border-foreground text-foreground hover:bg-foreground hover:text-background"
                }`}
              >
                {category === "all" ? "All Products" : category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group">
                  {/* Product Image */}
                  <Link
                    to={`/product/${product.id}`}
                    className="relative bg-luxury-beige aspect-[3/4] overflow-hidden mb-4 block"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(product);
                      }}
                      className={`absolute bottom-4 right-4 p-3 transition-all duration-300 transform ${
                        addedToCart === product.id
                          ? "bg-luxury-gold text-foreground scale-110"
                          : "bg-foreground text-background hover:bg-luxury-gold hover:text-foreground opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      <ShoppingBag size={20} />
                    </button>
                  </Link>

                  {/* Product Info */}
                  <Link
                    to={`/product/${product.id}`}
                    className="block group/text"
                  >
                    <h3 className="text-lg font-bold font-display text-foreground mb-1 group-hover/text:text-luxury-gold transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-sm text-foreground/60 mb-3">
                    {product.category}
                  </p>

                  <p className="text-xl font-bold text-luxury-gold">
                    R{product.price.toLocaleString()}
                  </p>

                  {addedToCart === product.id && (
                    <p className="text-sm text-luxury-gold mt-2 font-semibold">
                      ✓ Added to cart
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-foreground/70">
                No products found in this category.
              </p>
            </div>
          )}
        </div>

        {/* Info Section */}
        <section className="bg-luxury-beige/30 py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  title: "Premium Quality",
                  description:
                    "All our hair is 100% human hair, carefully sourced and tested for quality.",
                },
                {
                  title: "Natural Appearance",
                  description:
                    "Every piece is crafted to deliver a flawless, natural look that blends seamlessly.",
                },
                {
                  title: "Expert Support",
                  description:
                    "Our team is here to help you find the perfect hair and provide care guidance.",
                },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <h3 className="text-xl font-bold font-display text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-foreground/70">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
