import React, { useState, useEffect } from 'react';
import { Calendar, ChevronRight, Star, ShieldCheck, Heart, Clock, Sparkles } from 'lucide-react';
import { clinicConfig } from '../data/clinicData';
import { mediaAssets } from '../data/mediaAssets';

interface HeroProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width - 0.5) * 8; // Subtle tilt
    const y = ((clientY - top) / height - 0.5) * -8;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section 
      id="inicio" 
      className="relative min-h-[95vh] flex items-center pt-28 pb-16 overflow-hidden bg-gradient-to-b from-[#181613]/85 via-[#181613]/70 to-[#181613]/85 backdrop-blur-sm"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Soft Lighting Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#B08D57]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#D8C5A5]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Main Hero Copy Column */}
          <div className="lg:col-span-7 space-y-6 text-white">
            
            {/* 1. Eyebrow Identificação */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-medium text-[#D8C5A5]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B08D57] animate-pulse" />
              <span>DuoClinic • Odontologia em Indaiatuba</span>
            </div>

            {/* 2. Headline H1 */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.15] tracking-tight text-white max-w-3xl">
              Cuidado preciso para cada detalhe do seu <span className="italic text-[#D8C5A5]">sorriso.</span>
            </h1>

            {/* 3. Subtitle */}
            <p className="text-base sm:text-lg text-white/90 font-normal max-w-2xl leading-relaxed">
              Atendimento odontológico individualizado, realizado com atenção, transparência e respeito a cada paciente.
            </p>

            {/* 4. Main CTA & 5. Secondary CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={() => onOpenBooking()}
                type="button"
                className="inline-flex items-center justify-center gap-3 bg-[#B08D57] hover:bg-[#977747] text-white px-7 py-4 rounded-full font-semibold text-base shadow-xl transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B08D57]"
              >
                <Calendar size={18} />
                <span>Agendar avaliação pelo WhatsApp</span>
              </button>

              <a
                href="#em-movimento"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm px-6 py-4 rounded-full font-medium text-base transition-all text-center"
              >
                <span>Conhecer a clínica em vídeo</span>
                <ChevronRight size={16} />
              </a>
            </div>

            {/* Schedule Note */}
            <div className="flex items-center gap-2 text-xs text-white/70 pt-1">
              <Clock size={14} className="text-[#B08D57]" />
              <span>{clinicConfig.contact.hoursWeekdays}</span>
            </div>

            {/* Real Clinic Brand Badge */}
            <div className="pt-4 border-t border-white/15 flex items-center gap-4 bg-white/5 p-3.5 rounded-2xl border border-white/10">
              <img 
                src={mediaAssets.hero.premiumLogo}
                alt="Selo de Qualidade e Estrutura DuoClinic Odontologia Indaiatuba"
                className="w-14 h-14 object-cover rounded-xl border border-white/20 shadow-md shrink-0"
              />
              <div className="text-xs text-white/80">
                <div className="font-bold text-white text-sm">DuoClinic Odontologia</div>
                <p className="text-white/70">Estrutura física própria em Indaiatuba • Rua Paul Harris, 494, Cidade Nova</p>
              </div>
            </div>

            {/* 6. Trust Badges Grid */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="flex items-center gap-2 bg-white/5 p-3 rounded-2xl border border-white/10">
                <div className="p-2 rounded-full bg-[#B08D57]/20 text-[#D8C5A5] shrink-0">
                  <Star size={16} fill="#B08D57" className="text-[#B08D57]" />
                </div>
                <div>
                  <div className="font-bold text-white text-xs">Avaliações</div>
                  <div className="text-white/70 text-[11px]">Disponíveis no Google</div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/5 p-3 rounded-2xl border border-white/10">
                <div className="p-2 rounded-full bg-[#B08D57]/20 text-[#D8C5A5] shrink-0">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <div className="font-semibold text-white">Especializada</div>
                  <div className="text-white/70 text-[11px]">Endodontia e Canal</div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/5 p-3 rounded-2xl border border-white/10">
                <div className="p-2 rounded-full bg-[#B08D57]/20 text-[#D8C5A5] shrink-0">
                  <Heart size={16} />
                </div>
                <div>
                  <div className="font-semibold text-white">Individualizado</div>
                  <div className="text-white/70 text-[11px]">Atendimento atento</div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/5 p-3 rounded-2xl border border-white/10">
                <div className="p-2 rounded-full bg-[#B08D57]/20 text-[#D8C5A5] shrink-0">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <div className="font-semibold text-white">Organizado</div>
                  <div className="text-white/70 text-[11px]">Ambiente sereno</div>
                </div>
              </div>
            </div>

            {/* 7. Mobile Integrated 3D Hero Concept Image (Positioned at the end of mobile column) */}
            <div className="block lg:hidden my-6 relative rounded-2xl overflow-hidden border border-white/20 bg-white/5 backdrop-blur-md p-3">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black/40">
                <img
                  src={mediaAssets.hero.sorriso3d}
                  alt="Modelo 3D conceitual de sorriso perfeito DuoClinic"
                  className="w-full h-full object-contain p-2"
                />
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-[#D8C5A5] border border-white/20 text-[10px] uppercase font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <Sparkles size={12} className="text-[#B08D57]" />
                  <span>Imagem conceitual</span>
                </div>
              </div>
            </div>

          </div>

          {/* Desktop Column: 3D Sorriso Hero Concept Card with Discrete Interactive Motion */}
          <div className="hidden lg:block lg:col-span-5">
            <div 
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl p-6 text-white transition-transform duration-200 ease-out"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg)`
              }}
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-black/50 mb-4 border border-white/10 flex items-center justify-center p-4 group">
                <img
                  src={mediaAssets.hero.sorriso3d}
                  alt="Visão 3D Odontologia de Alta Precisão DuoClinic"
                  className="w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Discrete Label Badge */}
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-[#D8C5A5] border border-white/20 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                  <Sparkles size={14} className="text-[#B08D57]" />
                  <span>Imagem conceitual</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-xs bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10">
                  <span className="text-[#B08D57] font-semibold uppercase text-[10px] tracking-wider mb-1 block">
                    Atenção em Cada Detalhe
                  </span>
                  <p className="text-white/90 font-medium">Cuidado planejado de forma individual</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <p className="font-serif italic text-[#D8C5A5] text-base">
                  "Dois olhares integrados para um cuidado completo do seu sorriso."
                </p>
                <div className="flex items-center justify-between text-xs text-white/70 pt-2 border-t border-white/10">
                  <span>Dr. Gabriel Murakami</span>
                  <span>Dra. Giovana Pastorello</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
