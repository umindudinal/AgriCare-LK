import React from 'react';
import { X, QrCode, Download, Smartphone, CheckCircle2, ArrowRight } from 'lucide-react';

export default function QRModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 sm:p-8 text-center space-y-4 border border-slate-200 my-8">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
          <QrCode className="w-6 h-6" />
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-black font-heading text-slate-900">
            Scan with Your Camera
          </h3>
          <p className="text-xs text-slate-600">
            Scan this QR code with your smartphone camera to download the AgriCare LK APK directly to your device.
          </p>
        </div>

        {/* Dynamic SVG QR Code Simulation */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center justify-center">
          <div className="p-3 bg-white rounded-xl shadow-xs border border-slate-200">
            <svg
              className="w-48 h-48 text-slate-900"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              {/* Corner 1 */}
              <rect x="5" y="5" width="26" height="26" rx="4" fill="#0F5A29" />
              <rect x="9" y="9" width="18" height="18" rx="2" fill="white" />
              <rect x="13" y="13" width="10" height="10" rx="1" fill="#0F5A29" />

              {/* Corner 2 */}
              <rect x="69" y="5" width="26" height="26" rx="4" fill="#0F5A29" />
              <rect x="73" y="9" width="18" height="18" rx="2" fill="white" />
              <rect x="77" y="13" width="10" height="10" rx="1" fill="#0F5A29" />

              {/* Corner 3 */}
              <rect x="5" y="69" width="26" height="26" rx="4" fill="#0F5A29" />
              <rect x="9" y="73" width="18" height="18" rx="2" fill="white" />
              <rect x="13" y="77" width="10" height="10" rx="1" fill="#0F5A29" />

              {/* Center Icon Background */}
              <rect x="38" y="38" width="24" height="24" rx="4" fill="#0F5A29" />
              <circle cx="50" cy="50" r="8" fill="white" />
              <circle cx="50" cy="50" r="4" fill="#16a34a" />

              {/* QR Pattern Blocks */}
              <rect x="36" y="8" width="6" height="6" rx="1" />
              <rect x="46" y="12" width="8" height="6" rx="1" />
              <rect x="58" y="6" width="6" height="6" rx="1" />
              <rect x="36" y="22" width="8" height="6" rx="1" />
              <rect x="50" y="24" width="6" height="8" rx="1" />
              
              <rect x="8" y="38" width="6" height="8" rx="1" />
              <rect x="18" y="44" width="8" height="6" rx="1" />
              <rect x="8" y="54" width="6" height="6" rx="1" />
              <rect x="22" y="56" width="6" height="8" rx="1" />

              <rect x="68" y="38" width="8" height="6" rx="1" />
              <rect x="82" y="42" width="6" height="8" rx="1" />
              <rect x="72" y="52" width="6" height="6" rx="1" />
              <rect x="84" y="56" width="6" height="8" rx="1" />

              <rect x="38" y="68" width="8" height="6" rx="1" />
              <rect x="50" y="72" width="6" height="8" rx="1" />
              <rect x="60" y="68" width="8" height="6" rx="1" />
              <rect x="38" y="82" width="6" height="8" rx="1" />
              <rect x="50" y="86" width="8" height="6" rx="1" />
              <rect x="64" y="82" width="6" height="8" rx="1" />
              <rect x="76" y="72" width="6" height="6" rx="1" />
              <rect x="86" y="78" width="8" height="8" rx="1" />
            </svg>
          </div>
          <span className="text-[10px] text-slate-500 font-bold mt-2">
            AgriCare LK v2.0.0 (Release Package)
          </span>
        </div>

        {/* Direct link button */}
        <div className="space-y-2">
          <a
            href="/downloads/agricare-lk-v2.0.0.apk"
            download="AgriCare-LK-v2.0.0.apk"
            className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download APK Directly</span>
          </a>

          <button
            onClick={onClose}
            className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-700"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
