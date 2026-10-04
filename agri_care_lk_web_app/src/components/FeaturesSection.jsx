import React from 'react';
import { Cpu, ShieldCheck, Leaf, Globe, Database, Zap, Sparkles, Layers, Lock } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: Cpu,
      title: 'MobileNetV2 Deep Learning AI',
      desc: 'High-speed edge neural network models that classify intricate leaf spots, viral distortions, and fungal lesions with 99%+ diagnostic accuracy.',
      badge: 'Computer Vision AI',
      color: 'emerald'
    },
    {
      icon: Layers,
      title: 'Multi-Crop Neural Pipelines',
      desc: 'Separate, specialized transfer-learning classification heads trained specifically for Tomato 🍅, Chili 🌶️, and Brinjal 🍆 crop families.',
      badge: 'Multi-Model Architecture',
      color: 'orange'
    },
    {
      icon: Leaf,
      title: 'Dual-Care Strategy (Organic & Chemical)',
      desc: 'Prioritizes soil-friendly organic and biological interventions first, while providing precise chemical pesticide and fungicide dosages when critical.',
      badge: 'Holistic Agronomy',
      color: 'green'
    },
    {
      icon: Zap,
      title: 'Instant 2-Second Turnaround',
      desc: 'Capture a leaf on the field and receive immediate disease classification, confidence scores, and action plans within 2 seconds.',
      badge: 'Real-time Inference',
      color: 'amber'
    },
    {
      icon: Database,
      title: 'Structured Treatment Knowledge Base',
      desc: 'Integrated with an enterprise-grade agronomic database providing symptomology, pathogen biology, and preventive farming tips.',
      badge: 'SQL Knowledge Pipeline',
      color: 'blue'
    },
    {
      icon: Lock,
      title: '100% Free & Privacy-Focused',
      desc: 'Zero subscription fees, no intrusive ads, and no complicated user sign-up walls. Built freely for the Sri Lankan agricultural community.',
      badge: 'Free & Open',
      color: 'purple'
    }
  ];

  return (
    <section id="features" className="py-20 bg-emerald-50/40 text-slate-900 relative overflow-hidden">
      {/* Soft background accents */}
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-green-200/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Core Agricultural Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-slate-900">
            Why Choose <span className="text-emerald-700">AgriCare LK</span>?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Combining state-of-the-art computer vision models with certified plant pathology knowledge to safeguard harvests.
          </p>
        </div>

        {/* Feature Cards Grid (Clean Light Theme) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white hover:bg-white/95 border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all hover:scale-102 space-y-4 group"
              >
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white transition-all shadow-2xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                    {feat.badge}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 font-heading group-hover:text-emerald-700 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
