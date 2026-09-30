import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { RfqDrawer } from "./components/layout/RfqDrawer";
import { HomePage } from "./pages/HomePage";
import { AboutUsPage } from "./pages/AboutUsPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { ProductsListPage } from "./pages/ProductsListPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { IndustryPage } from "./pages/IndustryPage";
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
      <div className="flex min-h-screen flex-col bg-navy-950 text-ink selection:bg-[#ed145b] selection:text-white">
        {/* Navigation Bar */}
        <Navbar onOpenRfq={() => handleOpenRfq()} />

        {/* Primary Page Content */}
        <main id="main-content" className="flex-1">
          <Routes>
            {/* 1. Home */}
            <Route path="/" element={<HomePage onOpenRfq={handleOpenRfq} />} />

            {/* 2. About Us - Official route from novasbd.com */}
            <Route path="/aboutus" element={<AboutUsPage />} />
            <Route path="/about" element={<Navigate to="/aboutus" replace />} />

            {/* 3. Projects - Official route from novasbd.com */}
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:_id" element={<ProjectDetailPage onOpenRfq={handleOpenRfq} />} />
            <Route path="/projects/:id" element={<ProjectDetailPage onOpenRfq={handleOpenRfq} />} />

            {/* 4. Products - Official category & item routes from novasbd.com */}
            <Route path="/products/:category_id" element={<ProductsListPage onOpenRfq={handleOpenRfq} />} />
            <Route path="/product/:_id" element={<ProductDetailPage onOpenRfq={handleOpenRfq} />} />
            <Route path="/product/:id" element={<ProductDetailPage onOpenRfq={handleOpenRfq} />} />
            {/* Legacy catalogue redirects */}
            <Route path="/catalogue" element={<Navigate to="/products/all" replace />} />
            <Route path="/catalogue/:id" element={<ProductDetailPage onOpenRfq={handleOpenRfq} />} />

            {/* 5. Industry / Consultancy / Defence - Official route from novasbd.com */}
            <Route path="/industry/:category_id" element={<IndustryPage onOpenRfq={handleOpenRfq} />} />
            <Route path="/sectors" element={<Navigate to="/industry/defence" replace />} />
            <Route path="/sectors/:category_id" element={<IndustryPage onOpenRfq={handleOpenRfq} />} />

            {/* 6. Contact - Official route from novasbd.com */}
            <Route path="/contact" element={<ContactPage />} />

            {/* Catch-all fallback */}
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
