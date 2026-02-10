import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Droplet, Wind, Zap, Shield, Sparkles } from "lucide-react";

interface CareSection {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  content: string[];
}

const careSections: CareSection[] = [
  {
    title: "General Care Tips",
    subtitle: "Essential practices for all hair types",
    icon: <Shield className="w-8 h-8" />,
    content: [
      "Use only sulfate-free shampoos and conditioners to protect hair quality",
      "Wash in lukewarm or cool water, never hot water (damages cuticles and fades color)",
      "Apply deep conditioning treatments weekly or every 2 weeks",
      "Use heat protectant sprays before any heat styling",
      "Avoid excessive heat styling - use low to medium settings",
      "Sleep with your hair in a protective bonnet or silk pillowcase",
      "Detangle gently with a wide-tooth comb, starting from the ends",
      "Avoid chlorinated pools or salt water (if unavoidable, wet hair first with fresh water)",
      "Store hair on a wig stand or in a cool, dry place away from direct sunlight",
      "Never sleep in installed hair - remove and care for it properly",
    ],
  },
  {
    title: "Straight Hair Care",
    subtitle: "Maintaining sleek, polished locks",
    icon: <Wind className="w-8 h-8" />,
    content: [
      "Washing: Shampoo 1-2 times per week with sulfate-free products",
      "Conditioning: Always condition after shampooing, focusing on mid-lengths to ends",
      "Heat Styling: Use a flat iron on low to medium heat (300-350°F) with heat protectant",
      "Blow Drying: Use a nozzle attachment and brush for a smooth finish",
      "Straightening: If you want extra smoothness, use a flat iron on damp hair for best results",
      "Frizz Prevention: Apply anti-frizz serum or smoothing cream before styling",
      "Maintenance: Style 2-3 times per week maximum to preserve longevity",
      "Storage: Store loosely on a wig stand when not in use",
      "Touch-ups: Straighten as needed before wearing, not daily",
      "Longevity: With proper care, straight hair lasts 8-12 months",
    ],
  },
  {
    title: "Body Wave & Loose Wave Care",
    subtitle: "Keeping waves defined and beautiful",
    icon: <Droplet className="w-8 h-8" />,
    content: [
      "Washing: Wash 1-2 times per week in a braid or loose ponytail to maintain wave pattern",
      "Conditioning: Deep condition weekly to maintain softness and definition",
      "Detangling: Be extra gentle when detangling wet hair to preserve wave pattern",
      "Drying: Air dry or blow dry on low heat for best wave definition",
      "Wave Setting: Use wave-setting spray or mousse while damp to enhance wave pattern",
      "Styling: Avoid excessive brushing; use fingers to separate waves instead",
      "Re-waving: You can refresh waves with a curling iron or waver tool on low heat",
      "Frizz Control: Apply leave-in conditioner to prevent frizz and maintain waves",
      "Moisture: Keep waves moisturized with regular conditioning treatments",
      "Longevity: With proper care, waves last 7-10 months before they may relax slightly",
    ],
  },
  {
    title: "Curly & Deep Wave Care",
    subtitle: "Defining curls and avoiding frizz",
    icon: <Sparkles className="w-8 h-8" />,
    content: [
      "Washing: Wash 1-2 times per week in a loose braid to maintain curl pattern",
      "Conditioning: Deep condition every week to keep curls hydrated and defined",
      "Leave-in Conditioner: Use daily to maintain moisture and curl definition",
      "Curl Cream: Apply curl cream or gel to enhance and define curl pattern",
      "Scrunching: Gently scrunch hair upward while damp to encourage curl formation",
      "Drying: Air dry for best curl definition, or use a diffuser on low heat",
      "Frizz Prevention: Avoid brushing dry curls; use fingers or picks instead",
      "Re-curling: Refresh curls with a curling iron on low heat if needed",
      "Nighttime Care: Wrap curly hair in a silk scarf or bonnet while sleeping",
      "Longevity: With excellent moisture care, curls last 6-10 months before loosening",
    ],
  },
  {
    title: "Wig Care & Maintenance",
    subtitle: "Extending wig lifespan and keeping them beautiful",
    icon: <Zap className="w-8 h-8" />,
    content: [
      "Before First Wear: Wash and condition to remove manufacturing residue",
      "Washing: Wash every 7-10 wears or when hair feels dry or sticky",
      "Hand Washing Method: Use cool water, sulfate-free shampoo and conditioner",
      "Conditioning: Always deep condition after washing",
      "Wig Cap Cleaning: Wash the wig cap separately to prevent odor and buildup",
      "Drying: Air dry on a wig stand, never twist or wring out",
      "Styling: Use low heat when styling with tools",
      "Storage: Store on a wig stand in a cool, dry place away from sunlight",
      "Protection: Keep away from heat sources, direct sunlight, and moisture",
      "Longevity: Well-maintained wigs last 6-12 months of regular wear",
    ],
  },
  {
    title: "Installation & Removal",
    subtitle: "Protecting hair during wearing and removal",
    icon: <Shield className="w-8 h-8" />,
    content: [
      "Installation: Use quality glue or sew-in methods recommended by professionals",
      "Tension: Avoid tight installations that create tension on the hairline",
      "Duration: Don't wear the same installation longer than 6-8 weeks",
      "Daily Care: Moisturize the hairline and care for natural hair underneath",
      "Nighttime: Wrap hair to protect it while sleeping",
      "Removal: Have hair professionally removed to avoid damage",
      "Post-Removal Care: Deep condition natural hair after removal",
      "Rest Period: Allow natural hair to rest 2-3 weeks between installations",
      "Protective Styling: This helps protect both installed hair and natural hair",
      "Consultation: Work with experienced stylists who understand hair care",
    ],
  },
];

export default function HairCareGuide() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-luxury-beige/30 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-4">
              Hair Care Guide
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Learn how to properly care for your premium Beats by Siba hair to
              maximize longevity and keep it looking beautiful
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {/* Introduction */}
          <div className="max-w-3xl mx-auto mb-16 p-8 bg-luxury-beige/20">
            <h2 className="text-2xl font-bold font-display text-foreground mb-4">
              Why Hair Care Matters
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              Your premium human hair is an investment in your confidence and
              style. Proper care ensures your hair stays soft, shiny, and
              durable for months to come. The difference between hair that lasts
              3 months and 12 months comes down to care and maintenance. Follow
              these expert tips to maximize the lifespan of your Beats by Siba
              hair and keep it looking flawless.
            </p>
          </div>

          {/* Care Sections */}
          <div className="space-y-12">
            {careSections.map((section, idx) => (
              <div
                key={idx}
                className="bg-white border border-luxury-beige overflow-hidden"
              >
                {/* Section Header */}
                <div className="bg-luxury-beige/20 px-8 py-6 flex items-start gap-4">
                  <div className="text-luxury-gold flex-shrink-0 mt-1">
                    {section.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold font-display text-foreground">
                      {section.title}
                    </h2>
                    <p className="text-foreground/60 text-sm mt-1">
                      {section.subtitle}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <ul className="space-y-3">
                    {section.content.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex gap-4">
                        <span className="text-luxury-gold font-bold flex-shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span className="text-foreground/80 leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Reference */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold font-display text-foreground mb-8 text-center">
              Quick Care Reference
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "DO's",
                  items: [
                    "Use sulfate-free products",
                    "Wash in cool/lukewarm water",
                    "Deep condition weekly",
                    "Use heat protectant",
                    "Sleep in protective bonnet",
                    "Detangle gently with wide-tooth comb",
                    "Store on wig stand",
                  ],
                },
                {
                  title: "DON'Ts",
                  items: [
                    "Use hot water",
                    "Excessive heat styling",
                    "Sleep without protection",
                    "Tight pulling or yanking",
                    "Chlorine or salt water",
                    "Direct sunlight storage",
                    "Sleeping in installed hair",
                  ],
                },
              ].map((section, idx) => (
                <div key={idx} className="bg-luxury-beige/20 p-6">
                  <h3 className="text-xl font-bold font-display text-foreground mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.items.map((item, itemIdx) => (
                      <li
                        key={itemIdx}
                        className="flex gap-3 text-foreground/80"
                      >
                        <span className="text-luxury-gold font-bold flex-shrink-0">
                          {section.title === "DO's" ? "✓" : "✗"}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Products Recommendation */}
          <div className="mt-16 max-w-3xl mx-auto bg-luxury-champagne/10 p-8 border border-luxury-champagne/30">
            <h3 className="text-2xl font-bold font-display text-foreground mb-4">
              Recommended Product Types
            </h3>
            <p className="text-foreground/70 mb-6">
              For best results with premium human hair, use these product types:
            </p>
            <ul className="space-y-2 text-foreground/80">
              <li>✓ Sulfate-free shampoo and conditioner</li>
              <li>✓ Deep conditioning treatments (weekly)</li>
              <li>✓ Leave-in conditioner</li>
              <li>✓ Heat protectant spray</li>
              <li>✓ Anti-frizz serum or smoothing cream</li>
              <li>✓ Wide-tooth comb (never regular brush)</li>
              <li>✓ Silk bonnet or pillowcase</li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="mt-16 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold font-display text-foreground mb-4">
              Questions About Hair Care?
            </h2>
            <p className="text-foreground/70 mb-6">
              Our team is here to help you get the most out of your Beats by
              Siba hair. Reach out anytime!
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
