import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AppScreenshots from './components/AppScreenshots';
import LiveAIDemo from './components/LiveAIDemo';
import FeaturesSection from './components/FeaturesSection';
import HowItWorks from './components/HowItWorks';
import DownloadSection from './components/DownloadSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import QRModal from './components/QRModal';

export default function App() {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  const handleOpenQR = () => {
    setIsQRModalOpen(true);
  };

  const handleCloseQR = () => {
    setIsQRModalOpen(false);
  };

  const handleDownloadClick = () => {
    const downloadEl = document.getElementById('download');
    if (downloadEl) {
      downloadEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF8] text-slate-900 selection:bg-emerald-500 selection:text-white antialiased">
      {/* Top Navbar */}
      <Navbar
        onOpenQR={handleOpenQR}
        onDownloadClick={handleDownloadClick}
      />

      {/* Hero Section with Interactive Live Phone Mockup */}
      <main className="flex-1">
        <HeroSection
          onOpenQR={handleOpenQR}
          onDownloadClick={handleDownloadClick}
        />

        {/* 1. App Screenshots Showcase */}
        <AppScreenshots />

        {/* 2. Live Interactive AI Demo (Leaf Scanner Tester) */}
        <LiveAIDemo />

        {/* 3. Core Features & Deep Tech */}
        <FeaturesSection />

        {/* 4. How It Works (3 Steps) */}
        <HowItWorks />

        {/* 5. Download Center (Direct APK & Install Guide) */}
        <DownloadSection onOpenQR={handleOpenQR} />

        {/* 6. FAQs & Farmer Testimonials */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global QR Code Modal */}
      <QRModal
        isOpen={isQRModalOpen}
        onClose={handleCloseQR}
      />
    </div>
  );
}
