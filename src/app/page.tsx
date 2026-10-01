import React from "react";
import Navbar from "@/components/Navbar";
import HeroEditorial from "@/components/HeroEditorial";
import ServicePillars from "@/components/ServicePillars";
import FAQSection from "@/components/FAQSection";
import PortfolioShowcase from "@/components/PortfolioShowcase";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroEditorial />
      <ServicePillars />
      <FAQSection />
      <PortfolioShowcase />
      <Footer />
    </main>
  );
}
