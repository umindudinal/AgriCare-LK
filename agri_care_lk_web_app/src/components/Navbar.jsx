import React, { useState, useEffect } from 'react';
import { Download, QrCode, Menu, X, Sparkles, Smartphone, ShieldCheck, Leaf, Zap, HelpCircle, CheckCircle2, ChevronRight } from 'lucide-react';

export default function Navbar({ onOpenQR, onDownloadClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section scrollspy
      const sections = ['features', 'screenshots', 'demo', 'how-it-works', 'faq', 'download'];
      const scrollPos = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          return;
        }
      }
      setActiveSection('home');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features', id: 'features', icon: Sparkles },
    { label: 'Screenshots', href: '#screenshots', id: 'screenshots', icon: Smartphone },
    { label: 'Live Demo', href: '#demo', id: 'demo', icon: Zap },
    { label: 'How It Works', href: '#how-it-works', id: 'how-it-works', icon: CheckCircle2 },
    { label: 'FAQ', href: '#faq', id: 'faq', icon: HelpCircle },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-2.5 sm:py-3'
          : 'py-3.5 sm:py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Modern Floating Glassmorphism Container */}
        <div
          className={`flex items-center justify-between px-4 sm:px-5 py-2.5 rounded-2xl transition-all duration-300 ${
            scrolled
              ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-emerald-950/5 border border-slate-200/90'
              : 'bg-white/75 backdrop-blur-md border border-white/80 shadow-sm'
          }`}
        >
          {/* Brand Logo & Badges */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src="/app-icon.png"
                alt="AgriCare LK Logo"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl shadow-sm border-2 border-emerald-500 group-hover:scale-105 transition-transform object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div
                style={{ display: 'none' }}
                className="w-10 h-10 rounded-2xl bg-emerald-700 text-white items-center justify-center font-bold"
              >
                <Leaf className="w-5 h-5 text-emerald-300" />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-600 border-2 border-white"></span>
              </span>
            </div>

            <div className="flex flex-col text-left">
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 font-heading">
                  AgriCare <span className="text-emerald-700">LK</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 bg-emerald-100/90 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  <span>AI PRO 2.0</span>
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-500 -mt-0.5">
                AI Plant Health Companion
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links with Active Scroll Indicator */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/80">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-white text-emerald-800 shadow-xs border border-slate-200/60 font-black'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-white/60'
                  }`}
                >
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={onOpenQR}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all border border-slate-200 shadow-2xs"
              title="Scan QR Code with Phone Camera"
            >
              <QrCode className="w-3.5 h-3.5 text-emerald-700" />
              <span>QR Code</span>
            </button>

            <a
              href="#download"
              onClick={onDownloadClick}
              className="relative group overflow-hidden inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-700 via-emerald-600 to-green-600 text-white text-xs sm:text-sm font-extrabold rounded-xl shadow-md shadow-emerald-700/20 hover:shadow-lg hover:shadow-emerald-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Download className="w-4 h-4 animate-bounce" />
              <span>Download APK</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex sm:hidden items-center gap-1.5">
            <a
              href="#download"
              onClick={onDownloadClick}
              className="p-2 bg-emerald-700 text-white rounded-xl shadow-sm"
              title="Download APK"
            >
              <Download className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-emerald-700 hover:bg-slate-100 rounded-xl focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

      </div>

      {/* Mobile Drawer (Clean Light Glassmorphism) */}
      {mobileMenuOpen && (
        <div className="lg:hidden max-w-7xl mx-auto px-4 mt-2">
          <div className="bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-3xl p-5 space-y-3 shadow-2xl text-left animate-in slide-in-from-top-2 duration-200">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                Menu Navigation
              </span>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                v2.0 Pro Edition
              </span>
            </div>

            <div className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-emerald-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-emerald-600" />
                      <span>{link.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </a>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQR();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-sm border border-slate-200"
              >
                <QrCode className="w-4 h-4 text-emerald-700" />
                <span>Scan QR Code with Phone</span>
              </button>

              <a
                href="#download"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onDownloadClick) onDownloadClick();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-700 via-emerald-600 to-green-600 text-white font-extrabold rounded-xl text-sm shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Download AgriCare LK APK (32MB)</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
