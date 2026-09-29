import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { RfqDrawer } from "./components/layout/RfqDrawer";
import { HomePage } from "./pages/HomePage";
import { SectorsPage } from "./pages/SectorsPage";
import { SectorDetailPage } from "./pages/SectorDetailPage";
import { CataloguePage } from "./pages/CataloguePage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { Product, Vessel } from "./types";

// Scroll to top automatically when navigating between pages
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  const [rfqOpen, setRfqOpen] = useState(false);
  const [rfqInitialItem, setRfqInitialItem] = useState<Product | Vessel | null>(null);

  const handleOpenRfq = (item?: Product | Vessel) => {
    setRfqInitialItem(item || null);
    setRfqOpen(true);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-navy-950 text-ink selection:bg-amber-signal selection:text-navy-950">
        {/* Navigation Bar */}
        <Navbar onOpenRfq={() => handleOpenRfq()} />

        {/* Primary Page Content */}
        <main id="main-content" className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage onOpenRfq={handleOpenRfq} />} />
            <Route path="/sectors" element={<SectorsPage />} />
            <Route path="/sectors/:slug" element={<SectorDetailPage onOpenRfq={handleOpenRfq} />} />
            <Route path="/catalogue" element={<CataloguePage onOpenRfq={handleOpenRfq} />} />
            <Route path="/catalogue/:id" element={<ProductDetailPage onOpenRfq={handleOpenRfq} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<HomePage onOpenRfq={handleOpenRfq} />} />
          </Routes>
        </main>

        {/* Global Slide-Over RFQ Drawer */}
        <RfqDrawer
          open={rfqOpen}
          onOpenChange={setRfqOpen}
          initialItem={rfqInitialItem}
        />

        {/* Institutional Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
