import React from 'react';
import { Navbar } from '../components/landing/Navbar';
import { Hero } from '../components/landing/Hero';
import { FeaturesSection } from '../components/landing/FeaturesSection';
import { HowItWorks } from '../components/landing/HowItWorks';
import { Testimonials } from '../components/landing/Testimonials';
import { Footer } from '../components/landing/Footer';

export const HomePage: React.FC<{ onAuthNavigate: () => void }> = ({ onAuthNavigate }) => {
  const scrollTo = (id: string) => {
    if (id === "top") window.scrollTo({ top: 0, behavior: "smooth" });
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 transition-colors duration-700">
      <Navbar onAuthNavigate={onAuthNavigate} onScrollTo={scrollTo} />
      <Hero />
      <FeaturesSection />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </div>
  );
};