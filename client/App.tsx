import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Placeholder pageName="Shop" />} />
          <Route path="/product/:id" element={<Placeholder pageName="Product Details" />} />
          <Route path="/about" element={<Placeholder pageName="About Us" />} />
          <Route path="/hair-care" element={<Placeholder pageName="Hair Care Guide" />} />
          <Route path="/faqs" element={<Placeholder pageName="FAQs" />} />
          <Route path="/contact" element={<Placeholder pageName="Contact" />} />
          <Route path="/cart" element={<Placeholder pageName="Shopping Cart" />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
