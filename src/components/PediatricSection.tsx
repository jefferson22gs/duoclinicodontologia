import React from 'react';
import { Smile, Heart, ShieldCheck, Sparkles, Calendar, Star } from 'lucide-react';
import { mediaAssets } from '../data/mediaAssets';

interface PediatricSectionProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const PediatricSection: React.FC<PediatricSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="odontopediatria" className="py-24 bg-[#FFFDF9]/90 backdrop-blur-md relative border-b border-[#25231F]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Images (bocaGigante + superHerois) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-12 gap-4">
            
            {/* Main Featured Image: Boca Gigante */}
            <div className="sm:col-span-7 relative rounded-3xl overflow-hidden border border-[#25231F]/10 shadow-2xl bg-amber-50/50">
              <img
                src={mediaAssets.pediatric.bocaGigante}
                alt="Atendimento lúdico infantil de Odontopediatria na DuoClinic Indaiatuba"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1B]/75 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white text-xs space-y-1">
                <div className="bg-[#B08D57] text-white px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block mb-1">
                  Abordagem Lúdica
                </div>
                <div className="font-serif italic text-base text-[#D8C5A5]">
                  "Cuidar do sorriso desde a infância sem medo ou trauma."
                </div>
              </div>
            </div>

            {/* Secondary Image: Super Heróis */}
            <div className="sm:col-span-5 relative rounded-3xl overflow-hidden border border-[#25231F]/10 shadow-xl bg-amber-50/50 sm:mt-8">
              <img
                src={mediaAssets.pediatric.superHerois}
                alt="Detalhes lúdicos e super heróis no consultório infantil DuoClinic"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1B]/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-[11px]">
                <span className="font-bold text-[#D8C5A5] block">Ambiente Amigável</span>
                <p className="text-white/90">Paciência e acolhimento para os pequenos</p>
              </div>
            </div>

          </div>

          {/* Right Column: Copy & Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B08D57]/15 border border-[#B08D57]/30 text-xs font-semibold uppercase tracking-widest text-[#B08D57]">
              <Smile size={14} />
              <span>Odontopediatria • Cuidado Infantil</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1D1D1B] leading-tight">
              Acolhimento e carinho para os <span className="italic text-[#B08D57]">primeiros sorrisos.</span>
            </h2>

            <p className="text-base text-[#25231F]/85 leading-relaxed font-normal">
              A experiência da infância molda a relação com a saúde bucal para a vida toda. Na DuoClinic, o atendimento infantil é planejado com linguagem lúdica, tempo generoso e um ambiente preparado para transformar a consulta em um momento leve e positivo.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#F7F3EC]/90 border border-[#25231F]/5 space-y-1 shadow-sm">
                <div className="flex items-center gap-2 text-[#B08D57] font-semibold text-sm">
                  <Smile size={16} />
                  <span>Consultas Lúdicas</span>
                </div>
                <p className="text-xs text-[#25231F]/70">
                  Apresentação dos instrumentos de forma divertida e sem correria.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F7F3EC]/90 border border-[#25231F]/5 space-y-1 shadow-sm">
                <div className="flex items-center gap-2 text-[#B08D57] font-semibold text-sm">
                  <Heart size={16} />
                  <span>Prevenção &amp; Orientação</span>
                </div>
                <p className="text-xs text-[#25231F]/70">
                  Instrução de escovação, aplicação de flúor e orientação atenciosa aos pais.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F7F3EC]/90 border border-[#25231F]/5 space-y-1 shadow-sm">
                <div className="flex items-center gap-2 text-[#B08D57] font-semibold text-sm">
                  <ShieldCheck size={16} />
                  <span>Desenvolvimento Bucal</span>
                </div>
                <p className="text-xs text-[#25231F]/70">
                  Acompanhamento da erupção dos dentes de leite e trocas da dentição.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F7F3EC]/90 border border-[#25231F]/5 space-y-1 shadow-sm">
                <div className="flex items-center gap-2 text-[#B08D57] font-semibold text-sm">
                  <Star size={16} />
                  <span>Crescer sem Trauma</span>
                </div>
                <p className="text-xs text-[#25231F]/70">
                  Criação de memórias afetivas felizes no consultório odontológico.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onOpenBooking('Odontopediatria e Cuidado Infantil')}
                className="bg-[#B08D57] hover:bg-[#977747] text-white px-7 py-3.5 rounded-full font-semibold text-sm shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center gap-2"
              >
                <Calendar size={18} />
                <span>Agendar Consulta Infantil no WhatsApp</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
