import React, { useState } from 'react';
import { Download, QrCode, Smartphone, ShieldCheck, CheckCircle2, AlertTriangle, FileCode, Check, Copy, ArrowRight } from 'lucide-react';

export default function DownloadSection({ onOpenQR }) {
  const [downloadInitiated, setDownloadInitiated] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    setDownloadInitiated(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + '/downloads/agricare-lk-v2.0.0.apk');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="download" className="py-20 bg-gradient-to-b from-emerald-50/80 via-white to-emerald-50/50 text-slate-900 relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold">
            <Download className="w-3.5 h-3.5 text-emerald-700 animate-bounce" />
            <span>Official Release Download Center</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-slate-900">
            Download <span className="text-emerald-700">AgriCare LK Mobile App</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Install on any Android smartphone to diagnose plant pathologies in the field without delay.
          </p>
        </div>

        {/* Main Download Card (Clean Light Theme) */}
        <div className="bg-white border border-emerald-200/90 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-emerald-900/5 max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: App Icon & Details */}
            <div className="md:col-span-7 space-y-5 text-center md:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                <img
                  src="/app-icon.png"
                  alt="AgriCare LK App Icon"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl shadow-lg border-2 border-emerald-500/40 object-cover"
                />
                <div>
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <h3 className="text-2xl font-black font-heading text-slate-900">AgriCare LK</h3>
                    <span className="bg-emerald-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md">
                      PRO 2.0
                    </span>
                  </div>
                  <span className="text-xs text-emerald-700 font-semibold block mt-0.5">
                    com.agricare.lk.app
                  </span>
                  <div className="flex items-center gap-2 text-xs text-slate-600 mt-1 justify-center sm:justify-start">
                    <span className="text-amber-500 font-bold">⭐⭐⭐⭐⭐ 4.9/5.0</span>
                    <span>•</span>
                    <span className="text-emerald-700 font-bold">100% Free & Open</span>
                  </div>
                </div>
              </div>

              {/* Specs Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-left">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block font-medium">Latest Release:</span>
                  <span className="text-xs font-bold text-slate-900">v2.0.0 (Production)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block font-medium">Package Size:</span>
                  <span className="text-xs font-bold text-slate-900">~32.4 MB</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-500 block font-medium">Requirements:</span>
                  <span className="text-xs font-bold text-slate-900">Android 8.0+</span>
                </div>
              </div>

              {/* Download Action */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href="/downloads/agricare-lk-v2.0.0.apk"
                  download="AgriCare-LK-v2.0.0.apk"
                  onClick={handleDownload}
                  className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-emerald-700 via-emerald-600 to-green-600 hover:from-emerald-600 hover:to-green-500 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-emerald-700/20 hover:scale-102 active:scale-98 transition-all"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Android APK (32MB)</span>
                </a>

                <button
                  onClick={onOpenQR}
                  className="px-4 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl border border-slate-200 transition-all flex items-center justify-center gap-2 text-sm"
                  title="Show QR Code"
                >
                  <QrCode className="w-5 h-5 text-emerald-700" />
                  <span>QR Code</span>
                </button>
              </div>

              {downloadInitiated && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Download started! Follow the installation steps below.</span>
                </div>
              )}

            </div>

            {/* Right Column: QR Code Container */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-3">
              <span className="text-xs font-bold text-slate-700">
                Scan with Smartphone Camera:
              </span>
              
              <div
                onClick={onOpenQR}
                className="p-3 bg-white rounded-2xl shadow-md border border-slate-200 cursor-pointer hover:scale-105 transition-transform"
                title="Click to enlarge QR Code"
              >
                <svg className="w-36 h-36 text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                  <rect x="5" y="5" width="26" height="26" rx="4" fill="#0F5A29" />
                  <rect x="9" y="9" width="18" height="18" rx="2" fill="white" />
                  <rect x="13" y="13" width="10" height="10" rx="1" fill="#0F5A29" />
                  <rect x="69" y="5" width="26" height="26" rx="4" fill="#0F5A29" />
                  <rect x="73" y="9" width="18" height="18" rx="2" fill="white" />
                  <rect x="77" y="13" width="10" height="10" rx="1" fill="#0F5A29" />
                  <rect x="5" y="69" width="26" height="26" rx="4" fill="#0F5A29" />
                  <rect x="9" y="73" width="18" height="18" rx="2" fill="white" />
                  <rect x="13" y="77" width="10" height="10" rx="1" fill="#0F5A29" />
                  <rect x="38" y="38" width="24" height="24" rx="4" fill="#0F5A29" />
                  <circle cx="50" cy="50" r="7" fill="white" />
                  <circle cx="50" cy="50" r="4" fill="#16a34a" />
                  <rect x="36" y="8" width="6" height="6" />
                  <rect x="46" y="14" width="8" height="6" />
                  <rect x="36" y="22" width="8" height="6" />
                  <rect x="8" y="38" width="6" height="8" />
                  <rect x="18" y="44" width="8" height="6" />
                  <rect x="68" y="38" width="8" height="6" />
                  <rect x="82" y="42" width="6" height="8" />
                  <rect x="38" y="68" width="8" height="6" />
                  <rect x="50" y="72" width="6" height="8" />
                  <rect x="64" y="82" width="6" height="8" />
                </svg>
              </div>

              <button
                onClick={handleCopyLink}
                className="text-[11px] text-emerald-700 hover:text-emerald-800 font-bold inline-flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Download Link Copied!' : 'Copy Direct Download Link'}</span>
              </button>
            </div>

          </div>
        </div>

        {/* Installation Step-by-Step Card Guide */}
        <div className="max-w-4xl mx-auto text-left space-y-6">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-emerald-700" />
            <h3 className="text-xl font-bold font-heading text-slate-900">
              How to Install the APK on Your Android Device
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: '1',
                title: 'Download APK',
                desc: 'Click "Download APK" above to save the installation package to your device storage.'
              },
              {
                step: '2',
                title: 'Open Downloaded File',
                desc: 'Tap the download notification or locate AgriCare-LK-v2.0.0.apk in your Downloads folder.'
              },
              {
                step: '3',
                title: 'Allow Permissions',
                desc: 'If prompted by Android security, toggle "Allow from this source" or "Install Unknown Apps".'
              },
              {
                step: '4',
                title: 'Install & Launch',
                desc: 'Tap "Install" to complete setup, then launch AgriCare LK to begin scanning crops.'
              }
            ].map((stepItem, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl p-4.5 space-y-2 hover:shadow-md transition-all shadow-xs"
              >
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center border border-emerald-300">
                  {stepItem.step}
                </div>
                <h4 className="font-bold text-sm text-slate-900">{stepItem.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{stepItem.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 text-xs text-emerald-950 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>100% Safe & Verified — No malware, telemetry tracking, or unnecessary device permissions.</span>
            </div>
            <a
              href="https://github.com/umindudinal/AgriCare-LK"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1"
            >
              <span>View GitHub Source Code</span>
              <span>→</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
