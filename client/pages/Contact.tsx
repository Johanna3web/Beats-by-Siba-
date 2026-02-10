import { useState } from "react";
import { useForm } from "react-hook-form";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // In a real app, this would send to an API endpoint
      // For now, we'll simulate a submission
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Form submitted:", data);
      setSubmitStatus("success");
      reset();

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } catch (error) {
      setSubmitStatus("error");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: "064 709 9067",
      description: "Available for calls and WhatsApp",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: "johannasegoapa@gmail.com",
      description: "Respond within 24 hours",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Response Time",
      details: "24 Hours",
      description: "We aim to respond to all inquiries within one business day",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-luxury-beige/30 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Have questions about our products or need support? We're here to
              help. Reach out anytime and we'll get back to you promptly.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {/* Contact Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, idx) => (
              <div
                key={idx}
                className="bg-white border border-luxury-beige p-8 text-center"
              >
                <div className="text-luxury-gold mb-4 flex justify-center">
                  {info.icon}
                </div>
                <h3 className="text-lg font-bold font-display text-foreground mb-2">
                  {info.title}
                </h3>
                <p className="text-lg font-semibold text-foreground mb-2">
                  {info.details}
                </p>
                <p className="text-sm text-foreground/60">{info.description}</p>
              </div>
            ))}
          </div>

          {/* Contact Form & Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold font-display text-foreground mb-8">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    className="w-full px-4 py-3 border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                    placeholder="Your Name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address *
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className="w-full px-4 py-3 border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <input
                    {...register("phone")}
                    className="w-full px-4 py-3 border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                    placeholder="(064) 709-9067"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Subject *
                  </label>
                  <select
                    {...register("subject", {
                      required: "Subject is required",
                    })}
                    className="w-full px-4 py-3 border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                  >
                    <option value="">Select a subject</option>
                    <option value="product">Product Inquiry</option>
                    <option value="order">Order Assistance</option>
                    <option value="shipping">Shipping Question</option>
                    <option value="return">Return / Exchange</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <textarea
                    {...register("message", {
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters",
                      },
                    })}
                    className="w-full px-4 py-3 border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-luxury-gold resize-none"
                    placeholder="Your message here..."
                    rows={6}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded">
                    <p className="text-green-800 text-sm">
                      ✓ Thank you! Your message has been sent successfully.
                      We'll get back to you within 24 hours.
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded">
                    <p className="text-red-800 text-sm">
                      ✗ Something went wrong. Please try again or contact us
                      directly.
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-foreground text-background font-bold tracking-widest text-sm uppercase hover:bg-luxury-gold hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Quick Help & FAQs */}
            <div>
              <h2 className="text-3xl font-bold font-display text-foreground mb-8">
                Quick Help
              </h2>

              <div className="space-y-6">
                {[
                  {
                    title: "Product Questions",
                    description:
                      "Learn about our hair types, quality, and styles. Check our FAQs for detailed answers.",
                    link: "/faqs",
                    linkText: "View FAQs",
                  },
                  {
                    title: "Hair Care Tips",
                    description:
                      "Get expert guidance on caring for your premium hair to maximize longevity.",
                    link: "/hair-care",
                    linkText: "View Hair Care Guide",
                  },
                  {
                    title: "Track Your Order",
                    description:
                      "Check the status of your shipment using your order number.",
                    link: "/track-order",
                    linkText: "Track Order",
                  },
                  {
                    title: "Shop Our Collection",
                    description:
                      "Browse our full range of premium wigs, bundles, closures, and frontals.",
                    link: "/shop",
                    linkText: "Shop Now",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="bg-luxury-beige/20 p-6">
                    <h3 className="text-lg font-bold font-display text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-foreground/70 text-sm mb-4">
                      {item.description}
                    </p>
                    <a
                      href={item.link}
                      className="text-luxury-gold font-semibold text-sm hover:text-luxury-champagne transition-colors"
                    >
                      {item.linkText} →
                    </a>
                  </div>
                ))}
              </div>

              {/* Business Hours */}
              <div className="mt-8 bg-luxury-champagne/10 p-6 border border-luxury-champagne/30">
                <h3 className="text-lg font-bold font-display text-foreground mb-4">
                  Customer Support Hours
                </h3>
                <p className="text-foreground/70 text-sm mb-3">
                  We respond to all inquiries within 24 business hours.
                </p>
                <p className="text-sm text-foreground/60">
                  📧 Email: Available 24/7
                </p>
                <p className="text-sm text-foreground/60">
                  📱 Phone/WhatsApp: Available during business hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
