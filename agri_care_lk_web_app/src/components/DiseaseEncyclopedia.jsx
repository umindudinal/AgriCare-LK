import React, { useState } from 'react';
import { DISEASES_DATA, CROPS_DATA } from '../data/diseasesData';
import { Search, Filter, BookOpen, ChevronRight, Leaf, FlaskConical, ShieldCheck, Sparkles } from 'lucide-react';
import DiseaseModal from './DiseaseModal';

export default function DiseaseEncyclopedia() {
  const [selectedCropFilter, setSelectedCropFilter] = useState('all'); // 'all' | 'tomato' | 'chili' | 'brinjal'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalDisease, setActiveModalDisease] = useState(null);

  // Filter diseases based on crop and search query
  const filteredDiseases = DISEASES_DATA.filter((disease) => {
    const matchesCrop = selectedCropFilter === 'all' || disease.crop === selectedCropFilter;
    const matchesSearch =
      disease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disease.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disease.symptoms.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCrop && matchesSearch;
  });

  return (
    <section id="encyclopedia" className="py-20 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span>22+ Plant Pathologies Catalog</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-slate-900">
            Plant Pathology & <span className="text-emerald-700">Treatment Database</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Search symptoms, biological classifications, organic cultural controls, and chemical pesticide formulations for Tomato, Chili, and Brinjal crops.
          </p>
        </div>

        {/* Filters and Search Bar Container */}
        <div className="bg-slate-50 p-4 sm:p-6 rounded-3xl border border-slate-200/80 mb-10 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            
            {/* Crop Tabs */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <button
                onClick={() => setSelectedCropFilter('all')}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                  selectedCropFilter === 'all'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                All Crops ({DISEASES_DATA.length})
              </button>
              {CROPS_DATA.map((crop) => (
                <button
                  key={crop.id}
                  onClick={() => setSelectedCropFilter(crop.id)}
                  className={`px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all ${
                    selectedCropFilter === crop.id
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  <span>{crop.emoji}</span>
                  <span>{crop.name.split(' ')[0]} ({crop.diseaseCount})</span>
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search disease by name or symptom..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all placeholder:text-slate-400"
              />
            </div>

          </div>
        </div>

        {/* Disease Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {filteredDiseases.map((disease) => (
            <div
              key={disease.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Image */}
              <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                <img
                  src={disease.sampleImage}
                  alt={disease.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/20"></div>

                {/* Top Badge */}
                <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                  <span className="bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white border border-white/20">
                    {disease.cropEmoji} {disease.cropName}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase text-white ${
                      disease.severity === 'healthy'
                        ? 'bg-emerald-600'
                        : disease.severity === 'high'
                        ? 'bg-red-600'
                        : 'bg-amber-600'
                    }`}
                  >
                    {disease.severity === 'healthy' ? 'Healthy' : disease.severity === 'high' ? 'High Risk' : 'Moderate'}
                  </span>
                </div>

                {/* Bottom title on image */}
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <h3 className="font-bold text-sm sm:text-base leading-tight drop-shadow-sm">
                    {disease.name}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-xs text-slate-500 font-medium">
                    <span className="block text-[11px] italic text-emerald-800">{disease.scientificName}</span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {disease.symptoms}
                  </p>
                </div>

                {/* Treatment indicators & Action button */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                    <span className="flex items-center gap-1 text-emerald-700" title="Organic Treatments">
                      <Leaf className="w-3.5 h-3.5" />
                      <span>{disease.organicTreatments.length}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-orange-700" title="Chemical Treatments">
                      <FlaskConical className="w-3.5 h-3.5" />
                      <span>{disease.chemicalTreatments.length}</span>
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveModalDisease(disease)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs transition-all"
                  >
                    <span>View Treatment Guide</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Empty Search Result Fallback */}
        {filteredDiseases.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-3xl border border-slate-200">
            <p className="text-slate-500 font-bold text-sm">
              No disease matches found for "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCropFilter('all');
              }}
              className="mt-3 px-4 py-2 bg-emerald-700 text-white font-bold text-xs rounded-xl"
            >
              Show All Diseases
            </button>
          </div>
        )}

      </div>

      {/* Disease Detail Modal */}
      {activeModalDisease && (
        <DiseaseModal
          disease={activeModalDisease}
          onClose={() => setActiveModalDisease(null)}
        />
      )}
    </section>
  );
}
