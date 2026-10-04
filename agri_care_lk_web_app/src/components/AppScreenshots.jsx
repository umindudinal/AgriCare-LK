import React, { useState } from 'react';
import { SCREENSHOTS_DATA } from '../data/screenshotsData';
import { Sparkles, CheckCircle2, Maximize2, Smartphone, ShieldCheck, ChevronRight, ArrowRight } from 'lucide-react';
import PhoneMockup from './PhoneMockup';

export default function AppScreenshots() {
  const [selectedTab, setSelectedTab] = useState(0);

  const activeData = SCREENSHOTS_DATA[selectedTab];

  return (
    <section id="screenshots" className="py-20 bg-slate-50/80 text-slate-900 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold">
            <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
            <span>Mobile App UI Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-slate-900">
            AgriCare LK <span className="text-emerald-700">App Screens & Interfaces</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Explore the clean, intuitive mobile app crafted for high field usability by growers, agronomists, and researchers.
          </p>
        </div>

        {/* Screen Tabs Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {SCREENSHOTS_DATA.map((screen, idx) => (
            <button
              key={screen.id}
              onClick={() => setSelectedTab(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                selectedTab === idx
                  ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/25 scale-102'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <span>{idx + 1}.</span>
              <span>{screen.title.split('&')[0]}</span>
            </button>
          ))}
        </div>

        {/* Detailed Showcase Box (Clean Light Theme) */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Interactive Phone Screen Display */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-300/30 to-teal-200/20 rounded-full blur-2xl pointer-events-none"></div>
                <PhoneMockup
                  activeScreen={activeData.mockupType === 'scanner' ? 'scanner' : activeData.mockupType === 'result' || activeData.mockupType === 'treatments' ? 'result' : 'home'}
                  initialCrop={selectedTab === 1 ? 'chili' : selectedTab === 2 ? 'brinjal' : 'tomato'}
                />
              </div>
            </div>

            {/* Right: Feature Description & Details */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{activeData.badge}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black font-heading text-slate-900">
                  {activeData.title}
                </h3>
                <h4 className="text-sm font-semibold text-emerald-700">
                  {activeData.subtitle}
                </h4>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {activeData.description}
              </p>

              {/* Bullet points of features */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Key Capabilities & Highlights:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeData.features.map((feature, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs font-semibold text-slate-700 leading-snug">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation controls between screenshots */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  disabled={selectedTab === 0}
                  onClick={() => setSelectedTab((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 transition-all border border-slate-200"
                >
                  ← Previous Screen
                </button>

                <span className="text-xs text-slate-500 font-bold">
                  {selectedTab + 1} / {SCREENSHOTS_DATA.length}
                </span>

                <button
                  disabled={selectedTab === SCREENSHOTS_DATA.length - 1}
                  onClick={() => setSelectedTab((prev) => Math.min(SCREENSHOTS_DATA.length - 1, prev + 1))}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-600 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-all flex items-center gap-1 shadow-sm"
                >
                  <span>Next Screen</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
