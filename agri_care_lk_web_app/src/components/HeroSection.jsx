import React from 'react';
import { Download, QrCode, Sparkles, Zap, ShieldCheck, Layers, ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import { APP_STATS } from '../data/diseasesData';

export default function HeroSection({ onOpenQR, onDownloadClick }) {
  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-emerald-50/40 text-slate-900">
      {/* Background Decorative Gradients & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] bg-size-[28px_28px] opacity-10 pointer-events-none"></div>
      
      {/* Soft atmospheric blurred glowing orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Description & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs sm:text-sm font-bold shadow-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span>🇱🇰 #1 AI Plant Health Diagnostic Mobile App for Sri Lanka</span>
            </div>

            {/* Main Grand Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight font-heading leading-[1.2] text-slate-900">
              Smart Plant Care with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-emerald-600 to-green-600">
                Instant AI Diagnosis
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Powered by deep learning <strong>MobileNetV2 neural networks</strong> trained specifically on <strong>Tomato 🍅, Chili 🌶️, and Brinjal 🍆</strong> crops. Identify 22+ plant diseases from a single leaf photo and receive certified <strong>Organic</strong> and <strong>Chemical</strong> treatment recommendations.
            </p>

            {/* Supported Crops Quick Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              <span className="text-xs text-slate-500 font-semibold mr-1">Supported Crops:</span>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 shadow-2xs">
                <span>🍅 Tomato</span>
                <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.2 rounded font-extrabold">10 Classes</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-orange-50 border border-orange-200 text-xs font-bold text-orange-800 shadow-2xs">
                <span>🌶️ Chili</span>
                <span className="text-[10px] bg-orange-200 text-orange-900 px-1.5 py-0.2 rounded font-extrabold">7 Classes</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-50 border border-purple-200 text-xs font-bold text-purple-800 shadow-2xs">
                <span>🍆 Brinjal</span>
                <span className="text-[10px] bg-purple-200 text-purple-900 px-1.5 py-0.2 rounded font-extrabold">5 Classes</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-3">
              <a
                href="#download"
                onClick={onDownloadClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-emerald-700 via-emerald-600 to-green-600 hover:from-emerald-600 hover:to-green-500 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-emerald-700/25 hover:shadow-xl hover:shadow-emerald-600/35 hover:scale-102 active:scale-98 transition-all group"
              >
                <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                <div className="text-left">
                  <div className="text-[11px] font-medium text-emerald-100 uppercase tracking-wider">Android Mobile App</div>
                  <div className="text-sm sm:text-base font-black">Download APK (v2.0 Pro)</div>
                </div>
              </a>

              <a
                href="#demo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-300 transition-all hover:scale-102"
              >
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <span>Try Live AI Demo</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </a>

              <button
                onClick={onOpenQR}
                className="p-4 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 rounded-2xl border border-slate-200 shadow-sm transition-all"
                title="Scan QR code with smartphone camera"
              >
                <QrCode className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Guarantees / Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 text-xs font-semibold text-slate-600">
              <div className="flex items-center justify-center lg:justify-start gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Free Forever</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>No Registration Required</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-1.5 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified Agronomy Data</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Phone Mockup */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-sm">
              {/* Glowing aura under phone in light theme */}
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400/30 via-green-300/20 to-teal-200/30 rounded-full blur-3xl scale-95 pointer-events-none"></div>
              
              <PhoneMockup activeScreen="home" initialCrop="tomato" />
            </div>
          </div>

        </div>

        {/* Bottom Live Stats Bar (Clean Light Theme) */}
        <div className="mt-16 pt-8 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {APP_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white/90 hover:bg-white backdrop-blur-md rounded-2xl p-4 border border-slate-200/80 hover:border-emerald-300 shadow-xs hover:shadow-md text-center transition-all"
            >
              <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-green-600 font-heading">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                {stat.label}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5 font-medium">
                {stat.labelSub}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
