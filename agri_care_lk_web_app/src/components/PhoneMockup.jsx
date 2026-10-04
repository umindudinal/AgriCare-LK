import React, { useState, useEffect } from 'react';
import { Camera, Image as ImageIcon, ShieldCheck, RefreshCw, ChevronDown, Check, ArrowLeft, Info, Sparkles, X, Leaf, Cpu, Server, Languages } from 'lucide-react';

export default function PhoneMockup({ activeScreen = 'home', initialCrop = 'chili' }) {
  const [currentScreen, setCurrentScreen] = useState(activeScreen);
  const [selectedCrop, setSelectedCrop] = useState(initialCrop); // 'tomato', 'chili', 'brinjal'
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Synchronize when parent prop activeScreen changes
  useEffect(() => {
    setCurrentScreen(activeScreen);
  }, [activeScreen]);

  // Exact UI and Content Data for the 3 Crops matching the uploaded screenshots
  const cropData = {
    chili: {
      id: 'chili',
      cropName: 'මිරිස් (Chili)',
      emoji: '🌶️',
      partnerBadge: '🌶️ මිරිස් වගා සහකරු',
      partnerTitle: 'මිරිස් වගාව සුරකිමු',
      categoryBadge: 'රෝග කාණ්ඩ 7ක්',
      scannerTitle: 'මිරිස් ගස පරීක්ෂා කිරීම',
      addPhotoPrompt: 'මිරිස් ගසක ඡායාරූපයක් එක් කරන්න',
      subPrompt: 'පැහැදිලි ඡායාරූපයක් ලබාදීමෙන් වඩාත් නිවැරදි AI විශ්ලේෂණයක් ලබාගත හැක.',
      gradient: 'from-[#E64A19] via-[#D84315] to-[#BF360C]',
      accentColor: '#D84315',
      borderColor: 'border-[#D84315]',
      cardBorderColor: 'border-[#ffccbc]',
      lightBg: 'bg-[#D84315]/10',
      lightBorder: 'border-[#D84315]/30',
      textColor: 'text-[#D84315]',
      badgeBg: 'bg-[#fbe9e7]',
      cameraGradient: 'from-[#D84315] to-[#E65100]',
      sampleDisease: 'Chili Anthracnose (කරල් කුණුවීම)',
      sampleScientific: 'Colletotrichum capsici',
      sampleImage: '/samples/chili_chili_fruit_rot.jpg',
      organicTip: 'රෝගී කරල් ක්ෂේත්‍රයෙන් ඉවත් කරන්න. 5% කොහොඹ ඇට සාරය (NSKE) හෝ කොහොඹ තෙල් ඉසින්න.',
      chemicalTip: 'Captan 50% WP (වතුර 10L ට ග්‍රෑම් 25) හෝ Mancozeb 80% WP යොදන්න.',
      symptoms: 'කරල් මත ගිලුණු දුඹුරු/කළු ලප ඇතිවීම සහ කේන්ද්‍රීය දිලීර බීජාණු වළලු හටගැනීම.'
    },
    brinjal: {
      id: 'brinjal',
      cropName: 'වම්බටු (Brinjal)',
      emoji: '🍆',
      partnerBadge: '🍆 වම්බටු වගා සහකරු',
      partnerTitle: 'වම්බටු වගාව සුරකිමු',
      categoryBadge: 'රෝග කාණ්ඩ 5ක්',
      scannerTitle: 'වම්බටු ගස පරීක්ෂා කිරීම',
      addPhotoPrompt: 'වම්බටු ගසේ ඡායාරූපයක් එක් කරන්න',
      subPrompt: 'පැහැදිලි ඡායාරූපයක් ලබාදීමෙන් වඩාත් නිවැරදි AI විශ්ලේෂණයක් ලබාගත හැක.',
      gradient: 'from-[#6A1B9A] via-[#4A148C] to-[#38006B]',
      accentColor: '#6A1B9A',
      borderColor: 'border-[#6A1B9A]',
      cardBorderColor: 'border-[#e1bee7]',
      lightBg: 'bg-[#6A1B9A]/10',
      lightBorder: 'border-[#6A1B9A]/30',
      textColor: 'text-[#6A1B9A]',
      badgeBg: 'bg-[#f3e5f5]',
      cameraGradient: 'from-[#6A1B9A] to-[#8E24AA]',
      sampleDisease: 'Shoot & Fruit Borer (කරල් හා දළු විදින පණුවා)',
      sampleScientific: 'Leucinodes orbonalis',
      sampleImage: '/samples/brinjal_brinjal_shoot_and_fruit_borer.jpg',
      organicTip: 'ලුසින්ලියෝර් (Lucinlure) ෆෙරමෝන් උගුල් (අක්කරයකට 8-10) සවි කරන්න. පණු හානි වූ දළු කපා විනාශ කරන්න.',
      chemicalTip: 'Chlorantraniliprole 18.5% SC (Coragen 3ml/10L) හෝ Spinosad 45% SC මාරුවෙන් මාරුවට යොදන්න.',
      symptoms: 'ලා දළු මැලවීම, ගෙඩි වල සිදුරු හෑරීම සහ අසූචි රැඳී ඇතුළත කුණුවීම.'
    },
    tomato: {
      id: 'tomato',
      cropName: 'තක්කාලි (Tomato)',
      emoji: '🍅',
      partnerBadge: '🍅 තක්කාලි වගා සහකරු',
      partnerTitle: 'තක්කාලි වගාව සුරකිමු',
      categoryBadge: 'රෝග කාණ්ඩ 10ක්',
      scannerTitle: 'තක්කාලි ගස පරීක්ෂා කිරීම',
      addPhotoPrompt: 'තක්කාලි ගසේ ඡායාරූපයක් එක් කරන්න',
      subPrompt: 'පැහැදිලි ඡායාරූපයක් ලබාදීමෙන් වඩාත් නිවැරදි AI විශ්ලේෂණයක් ලබාගත හැක.',
      gradient: 'from-[#2E7D32] via-[#1B5E20] to-[#0D3813]',
      accentColor: '#0F5A29',
      borderColor: 'border-[#2E7D32]',
      cardBorderColor: 'border-[#c8e6c9]',
      lightBg: 'bg-[#2E7D32]/10',
      lightBorder: 'border-[#2E7D32]/30',
      textColor: 'text-[#0F5A29]',
      badgeBg: 'bg-[#e8f5e9]',
      cameraGradient: 'from-[#0F5A29] to-[#2E7D32]',
      sampleDisease: 'Tomato Late Blight (තක්කාලි අංගමාරය)',
      sampleScientific: 'Phytophthora infestans',
      sampleImage: '/samples/tomato_late_blight.jpg',
      organicTip: '5% කොහොඹ ඇට සාරය හෝ 1% බෝඩෝ මිශ්‍රණය වර්ෂාවට පෙර පත්‍ර මත ඉසින්න.',
      chemicalTip: 'Mancozeb 80% WP (වතුර 10L ට 30g) හෝ Metalaxyl + Mancozeb දිලීර නාශක යොදන්න.',
      symptoms: 'පත්‍ර මත දිය පොඟවුණු අඳුරු දුඹුරු ලප සහ අධික තෙතමනය යටතේ සුදු පැහැ දිලීර වර්ධනය.'
    }
  };

  const currentCrop = cropData[selectedCrop] || cropData.chili;

  return (
    <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[340px]">
      
      {/* Samsung Galaxy S24 Ultra - Signature Squared Titanium Frame */}
      <div className="relative rounded-[16px] p-[10px] bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.25)] ring-1 ring-slate-900">
        
        {/* S24 Ultra Titanium Chamfer Edge Highlights */}
        <div className="absolute inset-0 rounded-[16px] border border-white/15 pointer-events-none"></div>

        {/* Right Side Buttons (Volume Rocker + Power Key) */}
        <div className="absolute -right-[7px] top-24 w-[4px] h-12 bg-gradient-to-b from-slate-600 to-slate-800 rounded-r-xs shadow-xs"></div>
        <div className="absolute -right-[7px] top-40 w-[4px] h-8 bg-gradient-to-b from-slate-600 to-slate-800 rounded-r-xs shadow-xs"></div>

        {/* Side Antenna Band Lines */}
        <div className="absolute -left-[1px] top-16 w-[2px] h-1.5 bg-slate-500/80"></div>
        <div className="absolute -left-[1px] bottom-16 w-[2px] h-1.5 bg-slate-500/80"></div>
        <div className="absolute -right-[1px] top-16 w-[2px] h-1.5 bg-slate-500/80"></div>
        <div className="absolute -right-[1px] bottom-16 w-[2px] h-1.5 bg-slate-500/80"></div>

        {/* Flat Infinity Screen Container with Razor Bezels & S24 Ultra Boxy Corners */}
        <div className="relative w-full h-[620px] rounded-[10px] bg-[#F3F7F3] overflow-hidden flex flex-col select-none text-slate-800 border border-black shadow-inner">
          
          {/* S24 Ultra Status Bar with Centered Punch-Hole Camera */}
          <div className="w-full bg-[#064e28] text-white px-4 pt-2 pb-1.5 flex items-center justify-between text-[11px] font-semibold z-30 relative border-b border-white/10">
            {/* Left Status: Time */}
            <div className="flex items-center gap-1.5 pl-1">
              <span className="font-bold text-[11px] tracking-tight">09:41</span>
            </div>

            {/* S24 Ultra Infinity-O Centered Punch-Hole Selfie Camera */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2 w-[11px] h-[11px] bg-black rounded-full ring-[1.5px] ring-black/40 shadow-inner flex items-center justify-center">
              <div className="w-[3.5px] h-[3.5px] bg-[#1a237e] rounded-full opacity-80"></div>
            </div>

            {/* Right Status: 5G, Battery Percentage */}
            <div className="flex items-center gap-1.5 pr-1 text-[10px]">
              <span className="text-[9px] font-bold text-white/90">5G</span>
              <div className="flex items-center gap-0.5">
                <span className="text-[9px] font-bold text-white">98%</span>
                <div className="w-4 h-2.5 border border-white/80 rounded-[2px] p-[1px] flex items-center">
                  <div className="w-full h-full bg-emerald-300 rounded-[1px]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* App Top Bar - Deep Green as shown in the screenshot */}
          <div className="w-full bg-[#064e28] text-white px-3.5 py-2.5 flex items-center justify-between shadow-md z-20">
            {currentScreen === 'info' ? (
              <div className="flex items-center gap-2.5 w-full">
                <button
                  onClick={() => setCurrentScreen('home')}
                  className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all"
                  title="ආපසු (Back)"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <span className="font-bold text-[15px] tracking-tight text-white">
                  ඇප් එක ගැන (About App)
                </span>
              </div>
            ) : currentScreen !== 'home' ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentScreen('home')}
                    className="p-1 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all"
                    title="ආපසු"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <span className="font-black text-[14px] text-white">
                    {currentScreen === 'scanner' ? 'AI Scanner' : 'AI Result'}
                  </span>
                </div>
                <button
                  onClick={() => setCurrentScreen('info')}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white/90 hover:text-white hover:bg-white/20 transition-all"
                  title="About App"
                >
                  <Info className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-white/25 flex items-center justify-center text-white shadow-xs">
                    <Leaf className="w-4 h-4 fill-white" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-[15px] tracking-tight text-white">AgriCare LK</span>
                    <span className="bg-white/25 text-white text-[9px] font-black px-2 py-0.5 rounded-full border border-white/10 tracking-wide">
                      AI PRO 2.0
                    </span>
                  </div>
                </div>

                {/* Right Info Icon */}
                <button
                  onClick={() => setCurrentScreen('info')}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white/90 hover:text-white hover:bg-white/20 transition-all"
                  title="About App"
                >
                  <Info className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* SCREEN CONTENT AREA */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-3.5 space-y-3 relative text-left bg-[#F3F7F3]">
            
            {/* 1. HOME SCREEN (EXACT MATCH TO UPLOADED SCREENSHOTS) */}
            {currentScreen === 'home' && (
              <div className="space-y-3 animate-in fade-in duration-200">
                
                {/* 1. Crop Partner Hero Banner Card */}
                <div className={`p-3.5 rounded-2xl bg-gradient-to-r ${currentCrop.gradient} text-white shadow-md relative overflow-hidden transition-all duration-300`}>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1 pr-2">
                      <div className="inline-flex items-center gap-1 bg-white/25 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-2xs">
                        <span>{currentCrop.partnerBadge}</span>
                      </div>
                      <h4 className="text-[17px] font-black leading-tight tracking-tight mt-1">{currentCrop.partnerTitle}</h4>
                      <p className="text-[10.5px] text-white/90 leading-tight">
                        ඡායාරූපයක් යොමුකර ක්ෂණික AI රෝග විනිශ්චය ලබාගන්න.
                      </p>
                    </div>
                    
                    {/* Floating Crop Emoji Circle Badge */}
                    <div className="w-12 h-12 shrink-0 rounded-full bg-white/25 backdrop-blur-xs flex items-center justify-center text-2xl shadow-inner border border-white/20">
                      {currentCrop.emoji}
                    </div>
                  </div>

                  {/* Header Stats Strip inside banner */}
                  <div className="mt-3 pt-2 bg-black/20 rounded-xl px-2 py-1.5 flex items-center justify-around text-center text-white">
                    <div>
                      <span className="block text-[10px] font-black text-amber-300">⚡ 2Sec AI</span>
                      <span className="text-[8.5px] text-white/90 font-medium">විශ්ලේෂණය</span>
                    </div>
                    <div className="w-px h-5 bg-white/20"></div>
                    <div>
                      <span className="block text-[10px] font-black text-amber-300">🇱🇰 100%</span>
                      <span className="text-[8.5px] text-white/90 font-medium">සිංහලෙන්ම</span>
                    </div>
                    <div className="w-px h-5 bg-white/20"></div>
                    <div>
                      <span className="block text-[10px] font-black text-amber-300">🛡️ 99%</span>
                      <span className="text-[8.5px] text-white/90 font-medium">නිරවද්‍යතාව</span>
                    </div>
                  </div>
                </div>

                {/* 2. Crop Selector Area */}
                <div className="space-y-1.5 relative">
                  <div className="flex justify-between items-center px-0.5">
                    <span className="text-[12px] font-bold text-slate-800 tracking-tight">
                      එළවළු / වගාව තෝරන්න (Select...
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${currentCrop.badgeBg} ${currentCrop.textColor} border ${currentCrop.lightBorder}`}>
                      {currentCrop.categoryBadge}
                    </span>
                  </div>

                  {/* Dropdown Container Card */}
                  <div className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`w-full bg-white rounded-2xl border-2 ${currentCrop.borderColor} p-2.5 px-3.5 flex items-center justify-between shadow-xs hover:shadow-md transition-all active:scale-[0.99] text-left`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{currentCrop.emoji}</span>
                        <div>
                          <div className="font-black text-[13.5px] text-slate-900 leading-tight">
                            {currentCrop.cropName}
                          </div>
                          <div className="text-[10px] text-slate-500 font-medium leading-tight">
                            {currentCrop.categoryBadge}
                          </div>
                        </div>
                      </div>
                      <ChevronDown className={`w-5 h-5 ${currentCrop.textColor} transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Interactive Dropdown Menu Popover */}
                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl border border-slate-200 shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                        {Object.values(cropData).map((crop) => (
                          <button
                            key={crop.id}
                            onClick={() => {
                              setSelectedCrop(crop.id);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full p-2.5 px-3.5 flex items-center justify-between transition-all text-left border-b border-slate-100 last:border-b-0 ${
                              selectedCrop === crop.id
                                ? `${crop.badgeBg} font-bold`
                                : 'hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="text-xl">{crop.emoji}</span>
                              <div>
                                <span className="block text-[12.5px] font-black text-slate-900 leading-tight">
                                  {crop.cropName}
                                </span>
                                <span className="text-[9.5px] text-slate-500 font-medium">
                                  {crop.categoryBadge}
                                </span>
                              </div>
                            </div>
                            {selectedCrop === crop.id && (
                              <Check className={`w-4 h-4 ${crop.textColor} font-bold`} />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. Section Title */}
                <div className="pt-0.5">
                  <h5 className="text-[13px] font-bold text-slate-900 tracking-tight">
                    {currentCrop.scannerTitle}
                  </h5>
                </div>

                {/* 4. Center Photo Target Area Card */}
                <div
                  onClick={() => setCurrentScreen('scanner')}
                  className={`w-full bg-white rounded-3xl border-2 ${currentCrop.cardBorderColor} hover:${currentCrop.borderColor} p-5 flex flex-col items-center justify-center text-center shadow-xs hover:shadow-md transition-all cursor-pointer group`}
                >
                  {/* Circular Viewfinder Center Icon */}
                  <div className={`w-16 h-16 rounded-full ${currentCrop.lightBg} border ${currentCrop.lightBorder} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-inner`}>
                    <div className="relative w-8 h-8 flex items-center justify-center">
                      <div className={`w-7 h-7 border-2 ${currentCrop.borderColor} rounded-md border-dashed flex items-center justify-center`}>
                        <div className={`w-2 h-2 rounded-full ${currentCrop.borderColor} bg-current`}></div>
                      </div>
                    </div>
                  </div>

                  {/* Add Photo Prompt Text */}
                  <h4 className="font-bold text-[13.5px] text-slate-900 leading-snug max-w-[230px]">
                    {currentCrop.addPhotoPrompt}
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-1.5 leading-relaxed max-w-[220px]">
                    {currentCrop.subPrompt}
                  </p>
                </div>

                {/* 5. Bottom Two Action Buttons */}
                <div className="flex items-center gap-2.5 pt-0.5">
                  {/* Camera Button */}
                  <button
                    onClick={() => setCurrentScreen('scanner')}
                    className={`flex-1 py-2.5 px-3 rounded-2xl bg-gradient-to-r ${currentCrop.cameraGradient} text-white font-bold text-[12px] flex items-center justify-center gap-2 shadow-sm hover:opacity-95 active:scale-95 transition-all`}
                  >
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                      <Camera className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span>කැමරාව</span>
                  </button>

                  {/* Gallery Button */}
                  <button
                    onClick={() => setCurrentScreen('result')}
                    className="flex-1 py-2.5 px-3 rounded-2xl bg-[#0288D1] hover:bg-[#0277BD] text-white font-bold text-[12px] flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
                  >
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                      <ImageIcon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span>ගැලරිය</span>
                  </button>
                </div>

              </div>
            )}

            {/* 2. SCANNER SCREEN (Interactive Live Scan Demo) */}
            {currentScreen === 'scanner' && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="relative w-full h-[400px] rounded-2xl overflow-hidden bg-black shadow-inner">
                  <img
                    src={currentCrop.sampleImage}
                    alt="Scanning plant"
                    className="w-full h-full object-cover opacity-85"
                  />

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70"></div>

                  {/* Viewfinder Target Bounding Box */}
                  <div className="absolute inset-6 border-2 border-dashed border-white/70 rounded-2xl flex flex-col justify-between p-3 pointer-events-none">
                    <div className="flex justify-between">
                      <div className="w-4 h-4 border-t-2 border-l-2 border-emerald-400"></div>
                      <div className="w-4 h-4 border-t-2 border-r-2 border-emerald-400"></div>
                    </div>

                    {/* Animated Laser Line */}
                    <div className="relative w-full">
                      <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#34d399] animate-pulse"></div>
                    </div>

                    <div className="flex justify-between">
                      <div className="w-4 h-4 border-b-2 border-l-2 border-emerald-400"></div>
                      <div className="w-4 h-4 border-b-2 border-r-2 border-emerald-400"></div>
                    </div>
                  </div>

                  {/* Top Scan Status Pill */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5 whitespace-nowrap">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>AI විශ්ලේෂණය වෙමින් පවතී...</span>
                  </div>

                  {/* Bottom Controls */}
                  <div className="absolute bottom-3 inset-x-3 flex items-center justify-around">
                    <button
                      onClick={() => setCurrentScreen('home')}
                      className="px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-[10px] font-bold"
                    >
                      නැවත
                    </button>
                    <button
                      onClick={() => setCurrentScreen('result')}
                      className={`w-12 h-12 rounded-full border-3 border-white bg-gradient-to-r ${currentCrop.cameraGradient} shadow-lg flex items-center justify-center text-white transition-transform active:scale-90`}
                    >
                      <Camera className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCurrentScreen('result')}
                      className="px-3 py-1.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold shadow-xs"
                    >
                      තහවුරු
                    </button>
                  </div>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
                  <p className="text-[10px] text-slate-600 font-medium">
                    රෝගී පත්‍රයේ කොටස රාමුව තුළට ගෙන ඡායාරූපය ලබාගන්න.
                  </p>
                </div>
              </div>
            )}

            {/* 3. RESULT SCREEN (Interactive AI Diagnosis Result) */}
            {currentScreen === 'result' && (
              <div className="space-y-2.5 animate-in fade-in duration-200">
                {/* Result Leaf Thumbnail with Status */}
                <div className="relative h-32 rounded-2xl overflow-hidden shadow-sm">
                  <img
                    src={currentCrop.sampleImage}
                    alt="Diagnosis result"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-2 left-2.5 right-2.5 flex justify-between items-end text-white">
                    <div>
                      <span className="bg-red-600 text-[8px] font-black uppercase px-1.5 py-0.5 rounded-md tracking-wider">
                        රෝගය හඳුනාගැනිණි
                      </span>
                      <h5 className="font-bold text-[12px] mt-0.5 leading-tight">{currentCrop.sampleDisease}</h5>
                      <span className="text-[9px] text-white/80 italic">{currentCrop.sampleScientific}</span>
                    </div>
                    <span className="text-2xl">{currentCrop.emoji}</span>
                  </div>
                </div>

                {/* AI Confidence Meter Card */}
                <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-bold text-slate-700 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      AI නිරවද්‍යතා ප්‍රතිශතය:
                    </span>
                    <span className="font-black text-emerald-700 text-xs">99.1%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-full w-[99.1%]"></div>
                  </div>
                </div>

                {/* Symptoms Box */}
                <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-900 block">රෝග ලක්ෂණ (Symptoms):</span>
                  <p className="text-[9.5px] text-slate-600 leading-snug">
                    {currentCrop.symptoms}
                  </p>
                </div>

                {/* Treatment Accordion Cards */}
                <div className="bg-emerald-50/90 p-2.5 rounded-xl border border-emerald-200 space-y-0.5">
                  <span className="text-[10px] font-bold text-emerald-900 flex items-center gap-1">
                    🌿 කාබනික පිළියම් (Organic):
                  </span>
                  <p className="text-[9px] text-emerald-800 leading-snug font-medium">
                    {currentCrop.organicTip}
                  </p>
                </div>

                <div className="bg-orange-50/90 p-2.5 rounded-xl border border-orange-200 space-y-0.5">
                  <span className="text-[10px] font-bold text-orange-950 flex items-center gap-1">
                    🧪 රසායනික විසඳුම් (Chemical):
                  </span>
                  <p className="text-[9px] text-orange-900 leading-snug font-medium">
                    {currentCrop.chemicalTip}
                  </p>
                </div>

                <button
                  onClick={() => setCurrentScreen('home')}
                  className="w-full py-2 rounded-xl bg-[#064e28] hover:bg-[#086333] text-white font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>නැවත පරීක්ෂා කරන්න (New Test)</span>
                </button>
              </div>
            )}

            {/* 4. ABOUT APP SCREEN (EXACT REPLICA OF THE 2 SCREENSHOTS) */}
            {currentScreen === 'info' && (
              <div className="space-y-4 animate-in fade-in duration-200 pb-2">
                
                {/* Main Hero Green Container */}
                <div className="w-full p-5 rounded-[24px] bg-gradient-to-br from-[#0F5A29] via-[#2E7D32] to-[#388E3C] text-white shadow-lg text-center relative overflow-hidden">
                  {/* Large Center Circle with Leaf */}
                  <div className="w-16 h-16 mx-auto rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center shadow-inner mb-3 border border-white/20">
                    <Leaf className="w-9 h-9 text-white fill-white" />
                  </div>

                  <h3 className="text-2xl font-black tracking-tight text-white">AgriCare LK</h3>
                  
                  {/* Version Pill */}
                  <div className="inline-block bg-white/25 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full mt-1.5 border border-white/10">
                    v2.0.0 (Smart Agro AI Pro Edition)
                  </div>

                  {/* Subtitle description */}
                  <p className="text-[12px] text-white/95 leading-relaxed mt-3 max-w-[240px] mx-auto font-normal">
                    ශ්‍රී ලංකා කෘෂිකර්මාන්තය උදෙසා නිර්මාණය කළ AI ශාක සෞඛ්‍ය සහකරු
                  </p>
                </div>

                {/* 3 Diagnostic Badges Row */}
                <div className="grid grid-cols-3 gap-2">
                  {/* AI Engine */}
                  <div className="bg-white rounded-2xl p-2.5 text-center border border-purple-200/80 shadow-xs flex flex-col items-center justify-center">
                    <div className="w-6 h-6 rounded-lg bg-purple-50 flex items-center justify-center text-purple-700 mb-1">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">AI Engine</span>
                    <span className="text-[11px] font-bold text-purple-700 mt-0.5">Ready ⚡</span>
                  </div>

                  {/* Backend API */}
                  <div className="bg-white rounded-2xl p-2.5 text-center border border-green-200/80 shadow-xs flex flex-col items-center justify-center">
                    <div className="w-6 h-6 rounded-lg bg-green-50 flex items-center justify-center text-green-700 mb-1">
                      <Server className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">Backend API</span>
                    <span className="text-[10.5px] font-bold text-green-700 mt-0.5">Connected 🟢</span>
                  </div>

                  {/* Language */}
                  <div className="bg-white rounded-2xl p-2.5 text-center border border-blue-200/80 shadow-xs flex flex-col items-center justify-center">
                    <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center text-blue-700 mb-1">
                      <Languages className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">Language</span>
                    <span className="text-[10px] font-bold text-blue-700 mt-0.5">100% සිංහල 🇱🇰</span>
                  </div>
                </div>

                {/* Supported Crops Section */}
                <div className="space-y-2.5">
                  <h4 className="text-[13.5px] font-black text-slate-900 tracking-tight">
                    සහය දක්වන වගාවන් (Supported Crops)
                  </h4>

                  {/* Tomato and Chili 2-Column Row */}
                  <div className="grid grid-cols-2 gap-2">
                    {/* Tomato Card */}
                    <div className="bg-white rounded-2xl p-3 border border-emerald-300/70 shadow-xs space-y-2">
                      <div className="flex items-start gap-1.5">
                        <span className="text-xl">🍅</span>
                        <div>
                          <h5 className="font-bold text-[12px] text-slate-900 leading-tight">තක්කාලි වගාව</h5>
                          <span className="text-[9.5px] font-bold text-emerald-700">රෝග කාණ්ඩ 10ක්</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {['Bacterial Spot', 'Early Blight', 'Late Blight', 'Leaf Mold', 'Healthy'].map((tag, i) => (
                          <span key={i} className="bg-emerald-50 text-emerald-800 text-[8.5px] font-semibold px-1.5 py-0.5 rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Chili Card */}
                    <div className="bg-white rounded-2xl p-3 border border-orange-300/70 shadow-xs space-y-2">
                      <div className="flex items-start gap-1.5">
                        <span className="text-xl">🌶️</span>
                        <div>
                          <h5 className="font-bold text-[12px] text-slate-900 leading-tight">මිරිස් වගාව</h5>
                          <span className="text-[9.5px] font-bold text-orange-700">රෝග කාණ්ඩ 7ක්</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <span className="bg-orange-50 text-orange-800 text-[8.5px] font-semibold px-1.5 py-0.5 rounded-md w-full">
                          Fruit Rot (කරල් කුණුවීම)
                        </span>
                        {['Leaf Curl', 'Leaf Spot', 'Whitefly', 'Healthy'].map((tag, i) => (
                          <span key={i} className="bg-orange-50 text-orange-800 text-[8.5px] font-semibold px-1.5 py-0.5 rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Brinjal Full Width Card */}
                  <div className="bg-white rounded-2xl p-3 border border-purple-300/70 shadow-xs space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-xl">🍆</span>
                      <div>
                        <h5 className="font-bold text-[12px] text-slate-900 leading-tight">වම්බටු වගාව (Brinjal)</h5>
                        <span className="text-[9.5px] font-bold text-purple-700">රෝග කාණ්ඩ 5ක්</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {['Fruit Cracking (ගෙඩි පිපිරීම)', 'Phomopsis Blight', 'Shoot & Fruit Borer', 'Wet Rot', 'Healthy Fruit'].map((tag, i) => (
                        <span key={i} className="bg-purple-50 text-purple-800 text-[8.5px] font-semibold px-1.5 py-0.5 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* How It Works Section Card */}
                <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-xs space-y-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <h4 className="font-black text-[13px] text-slate-900 tracking-tight">
                      භාවිතා කරන ආකාරය (How It Works)
                    </h4>
                  </div>

                  {/* Step 1 */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#0F5A29] text-white font-bold text-[10.5px] flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <h5 className="font-bold text-[12px] text-slate-900 leading-tight">වගාව තෝරන්න</h5>
                      <p className="text-[10px] text-slate-600 leading-snug mt-0.5">
                        තක්කාලි (🍅), මිරිස් (🌶️) හෝ වම්බටු (🍆) බෝගය තෝරන්න.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#0F5A29] text-white font-bold text-[10.5px] flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <h5 className="font-bold text-[12px] text-slate-900 leading-tight">AI විශ්ලේෂණය</h5>
                      <p className="text-[10px] text-slate-600 leading-snug mt-0.5">
                        Keras CNN AI Models මගින් රෝගී තත්ත්වය තත්පර 2කින් හඳුනාගනී.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#0F5A29] text-white font-bold text-[10.5px] flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <h5 className="font-bold text-[12px] text-slate-900 leading-tight">උපදෙස් සහ ප්‍රතිකාර</h5>
                      <p className="text-[10px] text-slate-600 leading-snug mt-0.5">
                        සිංහලෙන්ම රෝග ලක්ෂණ, කාබනික සහ රසායනික ප්‍රතිකාර ලබාගන්න.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Section */}
                <div className="pt-2 text-center space-y-1">
                  <Leaf className="w-5 h-5 text-[#0F5A29] fill-[#0F5A29] mx-auto" />
                  <div className="font-bold text-[11.5px] text-slate-800">
                    Agri Care • Smart Agro Sri Lanka
                  </div>
                  <div className="text-[9.5px] text-slate-500 pb-1">
                    Copyright © 2026. All Rights Reserved.
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* Samsung Galaxy S24 Ultra Android Gesture Bar at Bottom */}
          <div className="w-full bg-[#F3F7F3] pb-1.5 pt-1 flex justify-center items-center">
            <div className="w-28 h-[3px] bg-slate-400/80 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
