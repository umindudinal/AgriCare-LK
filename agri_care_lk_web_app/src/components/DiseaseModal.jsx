import React from 'react';
import { X, ShieldCheck, AlertTriangle, CheckCircle2, Leaf, FlaskConical, Info, Sparkles } from 'lucide-react';

export default function DiseaseModal({ disease, onClose }) {
  if (!disease) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-left my-8">
        
        {/* Modal Top Header with Photo */}
        <div className="relative h-56 sm:h-64 w-full bg-slate-900 overflow-hidden">
          <img
            src={disease.sampleImage}
            alt={disease.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/20"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all z-10"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20">
              {disease.cropEmoji} {disease.cropName}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-black uppercase text-white ${
                disease.severity === 'healthy'
                  ? 'bg-emerald-600'
                  : disease.severity === 'high'
                  ? 'bg-red-600'
                  : 'bg-amber-600'
              }`}
            >
              {disease.severity === 'healthy' ? 'Healthy Foliage' : disease.severity === 'high' ? 'High Severity' : 'Moderate Severity'}
            </span>
          </div>

          {/* Title on image */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="text-xl sm:text-2xl font-black font-heading leading-tight drop-shadow-md">
              {disease.name}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-300">
              <span className="italic text-emerald-300 font-semibold">{disease.scientificName}</span>
            </div>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Symptoms Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Info className="w-4 h-4 text-emerald-700" />
              <span>Symptoms & Field Identification:</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              {disease.symptoms}
            </p>
          </div>

          {/* Organic Treatments */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-900">
              <Leaf className="w-4 h-4 text-emerald-600" />
              <span>Organic & Eco-Friendly Cultural Remedies:</span>
            </div>
            <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 space-y-2">
              {disease.organicTreatments.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-emerald-950">
                  <span className="flex h-5 w-5 rounded-full bg-emerald-200 text-emerald-900 font-bold items-center justify-center text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chemical Treatments */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-orange-950">
              <FlaskConical className="w-4 h-4 text-orange-600" />
              <span>Recommended Chemical Treatments & Exact Dosages:</span>
            </div>
            <div className="bg-orange-50/70 p-4 rounded-2xl border border-orange-200 space-y-2">
              {disease.chemicalTreatments.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-orange-950">
                  <span className="flex h-5 w-5 rounded-full bg-orange-200 text-orange-900 font-bold items-center justify-center text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Prevention Tips */}
          {disease.prevention && (
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950 flex items-start gap-2.5">
              <span className="text-lg">🛡️</span>
              <div>
                <strong className="block font-bold text-amber-900 mb-0.5">Preventative Agronomy Practices:</strong>
                <span>{disease.prevention}</span>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">AgriCare LK Expert Knowledge Base</span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold rounded-xl transition-all"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
}
