import React from 'react';
import { Leaf, Heart, ShieldCheck, Code2, Smartphone, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white text-slate-700 border-t border-slate-200 pt-16 pb-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-200">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/app-icon.png"
                alt="AgriCare LK Logo"
                className="w-10 h-10 rounded-2xl border-2 border-emerald-500/40 object-cover shadow-xs"
              />
              <div>
                <span className="text-xl font-black font-heading text-slate-900">
                  AgriCare <span className="text-emerald-700">LK</span>
                </span>
                <span className="block text-[11px] text-slate-500 font-medium">
                  Smart Agro AI Diagnostic System • Sri Lanka
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
              An open-access agricultural intelligence platform engineered with TensorFlow Deep Learning (MobileNetV2), Node.js, and Microsoft SQL Server to protect Sri Lankan crops.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-800 font-bold">
              <span>🍅 Tomato (10 Classes)</span>
              <span>•</span>
              <span>🌶️ Chili (7 Classes)</span>
              <span>•</span>
              <span>🍆 Brinjal (5 Classes)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li>
                <a href="#features" className="hover:text-emerald-700 transition-colors">
                  Key Features
                </a>
              </li>
              <li>
                <a href="#screenshots" className="hover:text-emerald-700 transition-colors">
                  App Screenshots & UI
                </a>
              </li>
              <li>
                <a href="#demo" className="hover:text-emerald-700 transition-colors">
                  Live AI Leaf Sandbox
                </a>
              </li>
              <li>
                <a href="#download" className="hover:text-emerald-700 transition-colors">
                  Download APK (v2.0 Pro)
                </a>
              </li>
            </ul>
          </div>

          {/* Tech Stack & Credits */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Architecture & Stack
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-700">
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 font-medium">Flutter 3.x</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 font-medium">TensorFlow Keras</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 font-medium">MobileNetV2</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 font-medium">Node.js Express</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 font-medium">MS SQL Server</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 font-medium">React + Tailwind</span>
            </div>

            <div className="pt-2">
              <a
                href="https://github.com/umindudinal/AgriCare-LK"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all border border-slate-200"
              >
                <Code2 className="w-4 h-4 text-emerald-700" />
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5 text-center sm:text-left">
            <span>© {new Date().getFullYear()} AgriCare LK. Built with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for Sri Lankan Farmers 🇱🇰</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-all text-xs font-semibold border border-slate-200"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
