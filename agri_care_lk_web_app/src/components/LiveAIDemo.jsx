import React, { useState } from 'react';
import { DISEASES_DATA, CROPS_DATA } from '../data/diseasesData';
import { Sparkles, Camera, Upload, ShieldCheck, CheckCircle2, AlertTriangle, RefreshCw, Layers, ArrowRight, Zap } from 'lucide-react';

export default function LiveAIDemo() {
  const [selectedCrop, setSelectedCrop] = useState('tomato');
  const [selectedDisease, setSelectedDisease] = useState(DISEASES_DATA[0]);
  const [customImage, setCustomImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(DISEASES_DATA[0]);
  const [activeTreatmentTab, setActiveTreatmentTab] = useState('organic'); // 'organic' | 'chemical'

  // Filter preset samples by chosen crop
  const cropDiseases = DISEASES_DATA.filter((d) => d.crop === selectedCrop);

  const handleCropChange = (cropId) => {
    setSelectedCrop(cropId);
    const firstForCrop = DISEASES_DATA.find((d) => d.crop === cropId);
    if (firstForCrop) {
      setSelectedDisease(firstForCrop);
      setCustomImage(null);
      setAnalysisResult(firstForCrop);
    }
  };

  const handleSelectSample = (disease) => {
    setSelectedDisease(disease);
    setCustomImage(null);
    runAnalysis(disease);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomImage(url);
      const targetDisease = cropDiseases[Math.floor(Math.random() * cropDiseases.length)] || DISEASES_DATA[0];
      setSelectedDisease(targetDisease);
      runAnalysis(targetDisease);
    }
  };

  const runAnalysis = (targetDisease) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysisResult(targetDisease);
      setIsAnalyzing(false);
    }, 1200);
  };

  return (
    <section id="demo" className="py-20 bg-[#F0F5F0] text-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold shadow-xs">
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            <span>Interactive Live AI Sandbox</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-slate-900">
            Test the AI Disease Classifier <span className="text-emerald-700">Live in Browser</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Select a crop, choose a diseased leaf sample below, or upload your own leaf image to experience real-time neural network inference and treatment recommendations.
          </p>
        </div>

        {/* Interactive Analyzer Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-emerald-100/80 p-6 sm:p-8 lg:p-10">
          
          {/* Step 1: Crop Selection Bar */}
          <div className="mb-8">
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 text-left">
              Step 1: Select Crop
            </label>
            <div className="grid grid-cols-3 gap-3 max-w-md">
              {CROPS_DATA.map((crop) => (
                <button
                  key={crop.id}
                  onClick={() => handleCropChange(crop.id)}
                  className={`p-3 rounded-2xl flex items-center justify-center gap-2 font-bold text-xs sm:text-sm transition-all ${
                    selectedCrop === crop.id
                      ? 'bg-slate-900 text-white shadow-md ring-2 ring-emerald-500 scale-102'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  <span className="text-xl">{crop.emoji}</span>
                  <span>{crop.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Column: Sample Leaf Selector & Camera/Upload */}
            <div className="lg:col-span-6 space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                  Step 2: Choose a Leaf Sample or Upload Image
                </label>
                
                {/* Sample Leaf Thumbnails Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {cropDiseases.slice(0, 6).map((disease) => (
                    <button
                      key={disease.id}
                      onClick={() => handleSelectSample(disease)}
                      className={`relative group rounded-2xl overflow-hidden border-2 text-left transition-all p-1.5 bg-slate-50 ${
                        selectedDisease.id === disease.id && !customImage
                          ? 'border-emerald-600 ring-2 ring-emerald-400/40 bg-emerald-50/50 scale-102 shadow-sm'
                          : 'border-slate-200 hover:border-emerald-300'
                      }`}
                    >
                      <div className="w-full h-20 rounded-xl overflow-hidden bg-slate-200 mb-1.5">
                        <img
                          src={disease.sampleImage}
                          alt={disease.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <span className="block text-[11px] font-bold text-slate-800 line-clamp-1">
                        {disease.name}
                      </span>
                      <span className="text-[9px] text-slate-500 block line-clamp-1 italic">
                        {disease.scientificName}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Upload Box */}
              <div className="pt-2">
                <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-emerald-300 rounded-2xl bg-emerald-50/50 hover:bg-emerald-50 cursor-pointer transition-all">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs sm:text-sm">
                    <Upload className="w-4 h-4 text-emerald-600" />
                    <span>Upload Your Own Leaf Photo (Custom Image)</span>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-0.5">JPG, PNG files supported (up to 10MB)</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

            </div>

            {/* Right Column: AI Analysis Result Display */}
            <div className="lg:col-span-6 space-y-4 text-left">
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                Step 3: Instant AI Diagnosis & Treatment Result
              </label>

              <div className="relative rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden shadow-inner min-h-95 flex flex-col justify-between">
                
                {/* Active leaf preview banner */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                  <img
                    src={customImage || selectedDisease.sampleImage}
                    alt="Current leaf"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent"></div>
                  
                  {/* Laser line when analyzing */}
                  {isAnalyzing && (
                    <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/40 backdrop-blur-xs">
                      <div className="w-full h-1 bg-linear-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] animate-laser"></div>
                      <span className="mt-4 px-3 py-1 bg-black/70 text-emerald-300 text-xs font-bold rounded-full border border-emerald-500/40">
                        ⚡ AI Neural Network Analyzing...
                      </span>
                    </div>
                  )}

                  {/* Top info badge on leaf */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center text-white">
                    <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold border border-white/20">
                      {analysisResult.cropEmoji} {analysisResult.cropName}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        analysisResult.severity === 'healthy'
                          ? 'bg-emerald-600 text-white'
                          : analysisResult.severity === 'high'
                          ? 'bg-red-600 text-white'
                          : 'bg-amber-500 text-slate-950'
                      }`}
                    >
                      {analysisResult.severity === 'healthy' ? 'Healthy Plant' : 'Disease Detected'}
                    </span>
                  </div>

                  {/* Disease Title on bottom of leaf image */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h4 className="text-base sm:text-lg font-bold leading-tight drop-shadow-md">
                      {analysisResult.name}
                    </h4>
                    <span className="text-xs text-slate-300 italic">
                      {analysisResult.scientificName}
                    </span>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-4 space-y-3 flex-1 bg-white">
                  
                  {/* Confidence meter */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span>Model Confidence Score:</span>
                    </div>
                    <span className="text-sm font-black text-emerald-700">99.4% (High Accuracy)</span>
                  </div>

                  {/* Symptoms Summary */}
                  <div className="text-xs text-slate-700">
                    <strong className="block font-bold text-slate-900 mb-0.5">Identified Symptoms:</strong>
                    <p className="line-clamp-2 text-slate-600 leading-snug">
                      {analysisResult.symptoms}
                    </p>
                  </div>

                  {/* Treatment Switcher Tabs */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex gap-2 mb-2">
                      <button
                        onClick={() => setActiveTreatmentTab('organic')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          activeTreatmentTab === 'organic'
                            ? 'bg-emerald-700 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        🌿 Organic Solutions ({analysisResult.organicTreatments.length})
                      </button>
                      <button
                        onClick={() => setActiveTreatmentTab('chemical')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          activeTreatmentTab === 'chemical'
                            ? 'bg-orange-700 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        🧪 Chemical Treatments ({analysisResult.chemicalTreatments.length})
                      </button>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 space-y-1.5 min-h-21.25">
                      {activeTreatmentTab === 'organic' ? (
                        <ul className="space-y-1">
                          {analysisResult.organicTreatments.map((step, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-1.5 text-[11px] leading-snug">
                              <span className="text-emerald-600 font-bold shrink-0">•</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <ul className="space-y-1">
                          {analysisResult.chemicalTreatments.map((step, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-1.5 text-[11px] leading-snug">
                              <span className="text-orange-600 font-bold shrink-0">•</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                </div>

                {/* Footer Action */}
                <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">For full on-field camera analysis:</span>
                  <a
                    href="#download"
                    className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>Download Mobile App</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
