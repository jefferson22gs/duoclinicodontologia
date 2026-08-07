import React from 'react';
import { CheckCircle2, MapPin, Coffee, Volume2, Sparkles } from 'lucide-react';
import { mediaAssets } from '../data/mediaAssets';

export const AboutClinic: React.FC = () => {
  return (
    <section id="a-duoclinic" className="py-24 bg-[#FFFDF9]/90 backdrop-blur-md relative border-b border-[#25231F]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Editorial Local Images Layout */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              
              {/* Primary Local Image: Recepção Principal */}
              <div className="rounded-3xl overflow-hidden shadow-xl border border-[#25231F]/10 transform -rotate-1 hover:rotate-0 transition-transform duration-500 bg-stone-100">
                <img
                  src={mediaAssets.clinic.recepcaoPrincipal}
                  alt="Recepção principal acolhedora com balcão iluminado da DuoClinic em Indaiatuba"
                  className="w-full h-[380px] object-cover"
                />
              </div>

              {/* Secondary Local Image: Recepção Horizontal */}
              <div className="rounded-3xl overflow-hidden shadow-xl border border-[#25231F]/10 mt-8 transform rotate-1 hover:rotate-0 transition-transform duration-500 bg-stone-100">
                <img
                  src={mediaAssets.clinic.recepcaoHorizontal}
                  alt="Lounge de espera e recepção confortável da DuoClinic em Indaiatuba"
                  className="w-full h-[380px] object-cover"
                />
              </div>

            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-6 bg-[#F7F3EC] border border-[#B08D57]/30 p-4 rounded-2xl shadow-xl flex items-center gap-3 text-xs font-medium text-[#25231F]">
              <div className="w-10 h-10 rounded-full bg-[#B08D57] text-white flex items-center justify-center font-serif text-lg font-bold shadow-md">
                DC
              </div>
              <div>
                <div className="font-bold text-sm text-[#1D1D1B]">Cidade Nova • Indaiatuba</div>
                <div className="text-[#25231F]/70">Rua Paul Harris, 494</div>
              </div>
            </div>
          </div>

          {/* Right Text Column */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B08D57]">
              <Sparkles size={14} />
              <span>A DuoClinic</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1D1D1B] leading-tight">
              Um ambiente pensado para receber você <span className="italic text-[#B08D57]">com calma.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#25231F]/85 leading-relaxed font-normal">
              Da recepção ao consultório, cada detalhe da DuoClinic foi planejado para transmitir conforto, organização e segurança. Um espaço contemporâneo, acolhedor e preparado para uma experiência odontológica mais tranquila.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 bg-[#F7F3EC]/80 p-4 rounded-2xl border border-[#25231F]/5 shadow-sm">
                <CheckCircle2 size={18} className="text-[#B08D57] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm text-[#1D1D1B]">Orientação transparente</div>
                  <div className="text-xs text-[#25231F]/70">Explicação didática antes de cada decisão.</div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#F7F3EC]/80 p-4 rounded-2xl border border-[#25231F]/5 shadow-sm">
                <CheckCircle2 size={18} className="text-[#B08D57] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm text-[#1D1D1B]">Plano individualizado</div>
                  <div className="text-xs text-[#25231F]/70">Foco nas suas reais necessidades biológicas e estéticas.</div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#F7F3EC]/80 p-4 rounded-2xl border border-[#25231F]/5 shadow-sm">
                <Coffee size={18} className="text-[#B08D57] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm text-[#1D1D1B]">Lounge de recepção</div>
                  <div className="text-xs text-[#25231F]/70">Cantinho do café, ar-condicionado e ambiente sereno.</div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#F7F3EC]/80 p-4 rounded-2xl border border-[#25231F]/5 shadow-sm">
                <MapPin size={18} className="text-[#B08D57] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm text-[#1D1D1B]">Localização em Indaiatuba</div>
                  <div className="text-xs text-[#25231F]/70">Cidade Nova, com facilidade de estacionamento ao redor.</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#EEE6DB]/70 rounded-2xl border border-[#B08D57]/30 text-xs text-[#25231F]/90 flex items-center gap-3">
              <Volume2 size={18} className="text-[#B08D57] shrink-0" />
              <span>
                <strong>Atendimento sem correria:</strong> reservamos o tempo necessário para tirar todas as suas dúvidas com serenidade.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
