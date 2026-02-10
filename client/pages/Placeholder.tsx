import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface PlaceholderProps {
  pageName: string;
}

export default function Placeholder({ pageName }: PlaceholderProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 flex items-center justify-center py-20">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-4">
              {pageName}
            </h1>
            <div className="w-20 h-1 bg-luxury-gold mx-auto mb-8"></div>
          </div>

          <p className="text-lg text-foreground/70 mb-8">
            This page is coming soon. Let us know if you'd like us to build this
            section of the site!
          </p>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              In the meantime, explore our other sections:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="px-8 py-3 bg-foreground text-background font-bold tracking-widest text-sm uppercase hover:bg-luxury-gold hover:text-foreground transition-all duration-300"
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="px-8 py-3 border-2 border-foreground text-foreground font-bold tracking-widest text-sm uppercase hover:bg-foreground hover:text-background transition-all duration-300"
              >
                Shop
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
