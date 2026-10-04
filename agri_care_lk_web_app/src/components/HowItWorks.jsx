import React from 'react';
import { Camera, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Smartphone } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      emoji: '🌱',
      title: 'Select Your Crop',
      subtitle: 'Tomato, Chili or Brinjal',
      desc: 'Open the app and select your target crop: Tomato (🍅), Chili (🌶️), or Brinjal (🍆). The AI instantly switches its active classification model.'
    },
    {
      step: '02',
      emoji: '📸',
      title: 'Snap Leaf Photo',
      subtitle: 'Camera Viewfinder or Gallery',
      desc: 'Position the affected leaf or fruit within the on-screen guideline frame under natural lighting and take a clear picture.'
    },
    {
      step: '03',
      emoji: '💊',
      title: 'Get Instant Diagnosis',
      subtitle: 'Actionable Treatment Plans',
      desc: 'In under 2 seconds, receive precise disease identification with confidence scores and both Organic & Chemical treatment instructions.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Simple 3-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-slate-900">
            How <span className="text-emerald-700">AgriCare LK Works</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Designed for swift, effortless field operation without requiring technical expertise.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="relative bg-slate-50 hover:bg-emerald-50/50 rounded-3xl p-8 border border-slate-200/80 hover:border-emerald-300 transition-all duration-300 text-left space-y-4 shadow-sm hover:shadow-md group"
            >
              {/* Step number badge */}
              <div className="flex justify-between items-center">
                <span className="text-3xl p-3 bg-white rounded-2xl shadow-xs border border-slate-200 group-hover:scale-110 transition-transform">
                  {item.emoji}
                </span>
                <span className="text-3xl font-black text-slate-200 group-hover:text-emerald-200 transition-colors font-heading">
                  {item.step}
                </span>
              </div>

              <div className="space-y-1.5 pt-2">
                <h3 className="text-xl font-black font-heading text-slate-900">
                  {item.title}
                </h3>
                <h4 className="text-xs font-semibold text-emerald-700">
                  {item.subtitle}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                  {item.desc}
                </p>
              </div>

              {/* Connecting arrow indicator */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-20">
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-400">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
