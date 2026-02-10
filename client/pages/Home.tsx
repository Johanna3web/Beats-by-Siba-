import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: "Luxury Wave Bundle",
      category: "Bundles",
      price: "$299",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    },
    {
      id: 2,
      name: "Silk Closure",
      category: "Closures",
      price: "$179",
      image: "https://images.unsplash.com/photo-1502449871298-f8122fdf96b8?w=400&h=500&fit=crop",
    },
    {
      id: 3,
      name: "Premium Frontal",
      category: "Frontals",
      price: "$249",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
    },
    {
      id: 4,
      name: "Ombre Wave Wig",
      category: "Wigs",
      price: "$349",
      image: "https://images.unsplash.com/photo-1516575334481-f410a007b9fd?w=400&h=500&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-luxury-cream via-background to-luxury-beige">
            <div className="absolute inset-0 bg-black/5"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
            <div className="mb-8">
              <h1 className="text-6xl md:text-7xl font-bold font-display text-foreground mb-4">
                Beats by Siba
              </h1>
              <p className="text-xl md:text-2xl text-luxury-gold font-light tracking-widest">
                Hair Edition
              </p>
            </div>

            <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Hair Edition is all about premium, high quality hair made to elevate
              your look. Our collections are carefully sourced for softness,
              longevity, and a flawless natural finish. Whether you're going for
              everyday beauty or full glam, our hair delivers luxury you can see
              and feel.
            </p>

            <p className="text-base md:text-lg text-foreground/60 mb-12 italic">
              At Beats by Siba, quality is the standard and confidence is the
              result.
            </p>

            <Link
              to="/shop"
              className="inline-block px-12 py-4 bg-foreground text-background font-bold tracking-widest text-sm uppercase hover:bg-luxury-gold hover:text-foreground transition-all duration-300 transform hover:scale-105"
            >
              Shop Now
            </Link>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-10 right-10 w-32 h-32 border border-luxury-gold/20 rotate-45"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 border border-luxury-champagne/30 rounded-full"></div>
        </section>

        {/* Featured Collections */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-4">
                Featured Collections
              </h2>
              <div className="w-20 h-1 bg-luxury-gold mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group overflow-hidden transition-transform duration-300 hover:scale-105"
                >
                  <div className="relative bg-luxury-beige aspect-[3/4] overflow-hidden mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                  </div>

                  <h3 className="text-lg font-display font-bold text-foreground mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {product.category}
                  </p>
                  <p className="text-lg font-bold text-luxury-gold">
                    {product.price}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Values Section */}
        <section className="py-20 bg-luxury-beige/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  title: "Premium Quality",
                  description:
                    "Carefully sourced for softness and longevity, every piece meets our luxury standards.",
                },
                {
                  title: "Flawless Finish",
                  description:
                    "Achieve a natural look that turns heads. From everyday to glam, we've got you covered.",
                },
                {
                  title: "Confidence Delivered",
                  description:
                    "Feel empowered and beautiful. Our hair is designed to make you shine.",
                },
              ].map((value, idx) => (
                <div key={idx} className="text-center">
                  <h3 className="text-2xl font-bold font-display text-foreground mb-4">
                    {value.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-foreground text-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-luxury-champagne mb-6">
              Ready to Elevate Your Look?
            </h2>
            <p className="text-lg text-background/80 mb-8 max-w-2xl mx-auto">
              Explore our full collection of premium hair products and find the
              perfect match for your style.
            </p>
            <Link
              to="/shop"
              className="inline-block px-10 py-3 bg-luxury-gold text-foreground font-bold tracking-widest text-sm uppercase hover:bg-luxury-champagne transition-all duration-300 transform hover:scale-105"
            >
              Browse Collection
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
