import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: "1",
    category: "Hair Quality",
    question: "What type of hair do you sell?",
    answer:
      "We specialize exclusively in 100% premium human hair. Our collection includes high-quality hair in various textures: straight, body wave, loose wave, deep wave, and curly styles. Each piece is carefully sourced for softness, durability, and a flawless natural finish.",
  },
  {
    id: "2",
    category: "Hair Quality",
    question: "Is the hair 100% human hair?",
    answer:
      "Yes! All Beats by Siba hair is 100% authentic, premium human hair. We do not mix synthetic fibers with our products. This ensures you get the natural look, feel, and styling flexibility that comes with genuine human hair.",
  },
  {
    id: "3",
    category: "Hair Quality",
    question: "How long does the hair last?",
    answer:
      "With proper care and maintenance, our premium human hair can last 6-12 months or longer. The longevity depends on how frequently you wear it, how well you care for it, and the styling methods you use. Regular conditioning, gentle handling, and proper storage significantly extend the lifespan of your hair.",
  },
  {
    id: "4",
    category: "Hair Care",
    question: "Can the hair be dyed, bleached, or heat styled?",
    answer:
      "Yes! Since our hair is 100% human hair, it can be dyed, bleached, highlighted, and heat styled just like natural hair on your head. However, we recommend:\n\n• Using professional-grade products\n• Working with a experienced stylist for best results\n• Applying deep conditioning treatments before and after coloring\n• Using heat protectant sprays when heat styling\n• Limiting heat exposure to preserve the hair's longevity",
  },
  {
    id: "5",
    category: "Hair Care",
    question: "How should I care for my hair to maintain quality?",
    answer:
      "Proper care is essential for longevity:\n\n• Wash with sulfate-free shampoo and conditioner\n• Use lukewarm or cool water (avoid hot water)\n• Deep condition weekly or every 2 weeks\n• Apply leave-in conditioner regularly\n• Use heat protectant sprays before styling\n• Avoid excessive heat styling\n• Sleep with your hair in a protective style or bonnet\n• Store properly when not in use\n\nFor detailed instructions, see our Hair Care Guide page.",
  },
  {
    id: "6",
    category: "Shipping",
    question: "How long does shipping take?",
    answer:
      "We offer fast and reliable shipping throughout South Africa:\n\n• Order Processing: 1-2 business days\n• Shipping Time: 2-5 business days (depending on location)\n• Total: 3-7 business days from order placement\n• Free shipping on orders over R500\n• Standard shipping: R50 (orders under R500)\n\nYou'll receive a tracking number via email once your package ships, allowing you to monitor your delivery in real-time.",
  },
  {
    id: "7",
    category: "Shipping",
    question: "Do you offer international shipping?",
    answer:
      "Currently, we primarily ship within South Africa. For international orders or special requests, please contact us at johannasegoapa@gmail.com or call 064 709 9067 to discuss options and pricing.",
  },
  {
    id: "8",
    category: "Returns & Exchanges",
    question: "Do you offer returns or exchanges?",
    answer:
      "We stand behind the quality of our products:\n\n• 7-Day Return/Exchange Policy: If you receive a defective item or are unsatisfied with your purchase, you have 7 days from delivery to request a return or exchange\n• Condition: Hair must be unworn, unwashed, and in original packaging\n• Process: Contact us with your order number and photos of the issue\n• Refund/Exchange: We'll arrange a return and process your refund or send a replacement\n\nFor specific concerns, please reach out to johannasegoapa@gmail.com.",
  },
  {
    id: "9",
    category: "Orders & Tracking",
    question: "How can I track my order?",
    answer:
      "Tracking your order is easy:\n\n1. Order Confirmation: You'll receive a confirmation email with your order number immediately\n2. Shipping Notification: Once your package ships, you'll receive an email with a tracking number\n3. Live Tracking: Use our 'Track Your Order' page to monitor real-time shipment status\n4. Enter your order number to see:\n   - Current shipping status (Processing, Shipped, Delivered)\n   - Estimated delivery date\n   - Current package location\n   - Detailed timeline of all updates",
  },
  {
    id: "10",
    category: "Orders & Tracking",
    question: "What should I do if my order doesn't arrive?",
    answer:
      "If your order doesn't arrive within the estimated timeframe:\n\n1. Check your tracking number for the current status\n2. Allow a few extra days as delays can happen\n3. Contact us immediately at johannasegoapa@gmail.com or call 064 709 9067\n4. Provide your order number and tracking number\n5. We'll investigate with our courier and find a solution\n\nWe're committed to resolving any shipping issues quickly.",
  },
  {
    id: "11",
    category: "Payment",
    question: "What payment methods do you accept?",
    answer:
      "We accept secure payments through Stripe, including:\n\n• Credit Cards (Visa, Mastercard, American Express)\n• Debit Cards\n• Digital Wallets\n\nAll transactions are encrypted and secure. Your payment information is never stored on our servers.",
  },
  {
    id: "12",
    category: "Installation",
    question: "Can the hair be installed professionally?",
    answer:
      "Absolutely! Our premium human hair is perfect for professional installation, including:\n\n• Sew-in installations\n• Glue-in applications\n• Wig styling and customization\n• Braids with extensions\n• Closure and frontal installations\n\nWe recommend working with experienced stylists who specialize in human hair. They can ensure proper installation for comfort and longevity.",
  },
];

export default function FAQs() {
  const [activeId, setActiveId] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    "all",
    ...Array.from(new Set(faqs.map((faq) => faq.category))),
  ];

  const filteredFAQs =
    selectedCategory === "all"
      ? faqs
      : faqs.filter((faq) => faq.category === selectedCategory);

  const toggleFAQ = (id: string) => {
    setActiveId(activeId === id ? "" : id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-luxury-beige/30 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-foreground/70">
              Find answers to common questions about our products and services
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
                {category === "all" ? "All" : category}
              </button>
            ))}
          </div>

          {/* FAQs List */}
          <div className="max-w-3xl mx-auto space-y-4">
            {filteredFAQs.map((faq) => (
              <div
                key={faq.id}
                className="border border-luxury-beige overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-luxury-beige/10 transition-colors"
                >
                  <div className="text-left flex-1">
                    <h3 className="text-lg font-bold font-display text-foreground">
                      {faq.question}
                    </h3>
                    <p className="text-sm text-foreground/60 mt-1">
                      {faq.category}
                    </p>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`flex-shrink-0 ml-4 text-luxury-gold transition-transform duration-300 ${
                      activeId === faq.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Answer */}
                {activeId === faq.id && (
                  <div className="px-6 py-6 bg-luxury-beige/5 border-t border-luxury-beige">
                    <div className="prose prose-sm max-w-none text-foreground/80 whitespace-pre-line leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Additional Help Section */}
          <div className="mt-16 max-w-3xl mx-auto bg-luxury-beige/20 p-8 text-center">
            <h2 className="text-2xl font-bold font-display text-foreground mb-4">
              Didn't Find Your Answer?
            </h2>
            <p className="text-foreground/70 mb-6">
              Can't find the answer you're looking for? Our customer support team
              is here to help!
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-foreground text-background font-bold tracking-widest text-sm uppercase hover:bg-luxury-gold hover:text-foreground transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
