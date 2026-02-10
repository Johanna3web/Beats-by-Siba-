import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Shop: [
      { label: "Wigs", href: "/shop?category=wigs" },
      { label: "Bundles", href: "/shop?category=bundles" },
      { label: "Closures", href: "/shop?category=closures" },
      { label: "Frontals", href: "/shop?category=frontals" },
    ],
    Company: [
      { label: "About Us", href: "/about" },
      { label: "Hair Care Guide", href: "/hair-care" },
      { label: "FAQs", href: "/faqs" },
      { label: "Contact", href: "/contact" },
    ],
    Legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Shipping & Returns", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div>
            <h3 className="text-2xl font-bold font-display mb-4 text-luxury-champagne">
              Beats by Siba
            </h3>
            <p className="text-sm text-background/80 mb-6">Hair Edition</p>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-background/70 hover:text-luxury-champagne transition-colors duration-300"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-bold tracking-widest mb-4 text-luxury-champagne uppercase">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-background/70 hover:text-luxury-champagne transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 pt-8">
          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm text-background/70">
              © {currentYear} Beats by Siba. Designed with confidence. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
