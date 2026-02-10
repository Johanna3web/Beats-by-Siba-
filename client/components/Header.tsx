import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

export const Header = () => {
  const menuItems = [
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Hair Care", href: "/hair-care" },
    { label: "FAQs", href: "/faqs" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-luxury-beige">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="text-2xl font-bold text-foreground font-display">
              Beats by Siba
            </div>
            <div className="text-xs tracking-widest text-muted-foreground">
              Hair Edition
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm font-medium text-foreground hover:text-luxury-gold transition-colors duration-300 tracking-wide"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Cart Icon */}
          <Link
            to="/cart"
            className="flex items-center gap-2 text-foreground hover:text-luxury-gold transition-colors duration-300"
          >
            <ShoppingBag size={20} />
            <span className="hidden sm:inline text-sm font-medium">Cart</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
