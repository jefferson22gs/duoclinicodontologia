import React, { useState } from 'react';
import { clinicConfig } from '../data/clinicData';
import { mediaAssets } from '../data/mediaAssets';
import { Sparkles, Info, Sliders, Calendar } from 'lucide-react';

interface BeforeAfterSliderProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ onOpenBooking }) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [activeCaseIndex, setActiveCaseIndex] = useState<number>(0);

  // Mandatory Ethical & Authorization Constraint:
  // If authorized results are disabled, do NOT render or preload any before/after assets.
  if (!mediaAssets.resultsConditional.enabled) {
    return null;
  }

  const currentCase = clinicConfig.beforeAfterCases[activeCaseIndex] || clinicConfig.beforeAfterCases[0];

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  return (
    <section className="py-24 bg-[#F7F3EC]/90 backdrop-blur-md relative border-y border-[#25231F]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B08D57] mb-3">
            <Sparkles size={14} />
            <span>Casos Clínicos &amp; Estética</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1D1D1B]">
            Transformações planejadas com <span className="italic text-[#B08D57]">naturalidade.</span>
          </h2>
          <p className="mt-4 text-base text-[#25231F]/80">
            Arraste a barra para comparar o antes e depois dos procedimentos estéticos realizados com autorização na DuoClinic.
          </p>
        </div>

        {/* Case Switcher Tabs */}
        {clinicConfig.beforeAfterCases.length > 1 && (
          <div className="flex justify-center gap-3 mb-10">
            {clinicConfig.beforeAfterCases.map((c, idx) => (
              <button
                key={c.id}
                onClick={() => {
                  setActiveCaseIndex(idx);
                  setSliderPosition(50);
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
                  activeCaseIndex === idx
                    ? 'bg-[#B08D57] text-white shadow-md'
                    : 'bg-[#FFFDF9] text-[#25231F] hover:bg-[#EEE6DB]'
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>
        )}

        {/* Interactive Comparison Container */}
        <div className="max-w-4xl mx-auto bg-[#FFFDF9]/95 rounded-3xl p-6 sm:p-8 border border-[#25231F]/10 shadow-xl space-y-6">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-[#25231F]/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#B08D57]">
                {currentCase.procedure}
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#1D1D1B]">
                {currentCase.title}
              </h3>
            </div>
            <div className="text-xs text-[#25231F]/70 flex items-center gap-1.5 bg-[#F7F3EC] px-3 py-1.5 rounded-full">
              <Sliders size={14} className="text-[#B08D57]" />
              <span>Arraste para comparar</span>
            </div>
          </div>

          {/* Interactive Image Slider */}
          <div
            className="relative h-[320px] sm:h-[420px] rounded-2xl overflow-hidden cursor-ew-resize select-none touch-none border border-[#25231F]/10"
            onMouseMove={handleSliderMove}
            onTouchMove={handleSliderMove}
          >
            {/* After Image (Background) */}
            <img
              src={mediaAssets.resultsConditional.beforeAfter1}
              alt={`Depois - ${currentCase.title}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
              Depois
            </div>

            {/* Before Image (Clipped Overlay) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={mediaAssets.resultsConditional.beforeAfter2}
                alt={`Antes - ${currentCase.title}`}
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: '100%', height: '100%' }}
              />
              <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                Antes
              </div>
            </div>

            {/* Divider Line & Handle */}
            <div
              className="absolute inset-y-0 w-1 bg-white shadow-2xl z-10 flex items-center justify-center"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-9 h-9 rounded-full bg-[#B08D57] text-white shadow-lg flex items-center justify-center border-2 border-white -ml-[18px]">
                <Sliders size={16} />
              </div>
            </div>
          </div>

          <p className="text-sm text-[#25231F]/85 leading-relaxed font-normal">
            {currentCase.description}
          </p>

          {/* Mandatory Ethical Note */}
          <div className="p-4 bg-[#F7F3EC] rounded-2xl border border-[#25231F]/5 text-xs text-[#25231F]/80 flex items-start gap-2.5">
            <Info size={16} className="text-[#B08D57] shrink-0 mt-0.5" />
            <span>{currentCase.disclaimer}</span>
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={() => onOpenBooking(`Avaliação baseada no caso: ${currentCase.title}`)}
              className="bg-[#B08D57] hover:bg-[#977747] text-white px-6 py-3 rounded-full font-semibold text-xs uppercase tracking-wider shadow-md transition-all inline-flex items-center gap-2"
            >
              <Calendar size={15} />
              <span>Agendar Avaliação para o Meu Sorriso</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
