import React from "react";
import Navbar from "@/components/Navbar";
import HeroEditorial from "@/components/HeroEditorial";
import ServicePillars from "@/components/ServicePillars";
import BusinessSolutions from "@/components/BusinessSolutions";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroEditorial />
      <ServicePillars />
      <BusinessSolutions />
      <FAQSection />
      <Footer />
    </main>
  );
}
