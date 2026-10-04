import React, { useState } from 'react';
import { FAQS, TESTIMONIALS } from '../data/diseasesData';
import { ChevronDown, HelpCircle, MessageSquareQuote, Star, ShieldCheck } from 'lucide-react';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faq" className="py-20 bg-[#F8FAF8] text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Farmer Testimonials Sub-section */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold">
              <MessageSquareQuote className="w-3.5 h-3.5 text-emerald-600" />
              <span>Grower Testimonials & Impact</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-slate-900">
              Trusted by <span className="text-emerald-700">Sri Lankan Farmers</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              See how AgriCare LK empowers local commercial growers and home gardeners with instant actionable disease remedies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {TESTIMONIALS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(item.rating)].map((_, r) => (
                        <Star key={r} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {item.crop}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                    "{item.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <span className="text-3xl">{item.avatar}</span>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">{item.name}</h4>
                    <span className="text-[11px] text-slate-500">{item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-3xl mx-auto text-left">
          <div className="text-center space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Got Questions?</span>
            </div>
            <h2 className="text-3xl font-black font-heading tracking-tight text-slate-900">
              Frequently Asked <span className="text-emerald-700">Questions</span>
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-bold text-sm sm:text-base text-slate-900 hover:text-emerald-700 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 ml-2 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-emerald-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
