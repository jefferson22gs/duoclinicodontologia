import React from 'react';
import { ShieldCheck, Wind, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';
import { mediaAssets } from '../data/mediaAssets';

export const Structure: React.FC = () => {
  const structureCards = [
    {
      title: 'Central Própria de Esterilização',
      description: 'Rigor absoluto de biossegurança com ciclo completo de esterilização e embalagens seladas.',
      icon: ShieldCheck
    },
    {
      title: 'Ambiente Climatizado & Aconchegante',
      description: 'Salas de atendimento com iluminação suave, temperatura agradável e atmosfera serena.',
      icon: Wind
    },
    {
      title: 'Equipamentos Clínicos Organizados',
      description: 'Consultórios equipados para oferecer tratamentos com precisão, agilidade e controle.',
      icon: Cpu
    },
    {
      title: 'Conforto e Ergonomia na Cadeira',
      description: 'Cadeiras anatômicas que oferecem excelente apoio muscular durante o atendimento.',
      icon: Sparkles
    }
  ];

  return (
    <section id="estrutura" className="py-24 bg-[#FFFDF9]/90 backdrop-blur-md relative border-b border-[#25231F]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
          
          {/* Left Description Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B08D57]">
              <Sparkles size={14} />
              <span>Infraestrutura e Biossegurança</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1D1D1B] leading-tight">
              Estrutura moderna para um <span className="italic text-[#B08D57]">cuidado seguro.</span>
            </h2>

            <p className="text-base text-[#25231F]/85 leading-relaxed font-normal">
              A tecnologia na DuoClinic serve para tornar seu atendimento mais ágil, preciso e previsível. Nosso consultório une equipamentos clínicos modernos a um rigoroso protocolo de esterilização próprio.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-[#25231F]/85">
                <CheckCircle2 size={18} className="text-[#B08D57]" />
                <span>Central própria de esterilização com controle físico e químico</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#25231F]/85">
                <CheckCircle2 size={18} className="text-[#B08D57]" />
                <span>Suporte próprio de apoio e lavanderia para barreira sanitária total</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#25231F]/85">
                <CheckCircle2 size={18} className="text-[#B08D57]" />
                <span>Foco de luz cirúrgico e LED articulado com iluminação sem sombras</span>
              </div>
            </div>
          </div>

          {/* Right Dual Images Layout (consultorio_principal + consultorio_detalhe) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-8 relative rounded-3xl overflow-hidden border border-[#25231F]/10 shadow-2xl bg-stone-100">
              <img
                src={mediaAssets.clinic.consultorioPrincipal}
                alt="Consultório odontológico principal com equipamentos tecnológicos na DuoClinic Indaiatuba"
                className="w-full h-[380px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1B]/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white text-xs space-y-1">
                <div className="font-serif italic text-base text-[#D8C5A5]">
                  "Limpeza, organização e luz pensadas para você se sentir em paz."
                </div>
                <div className="text-white/80">
                  Consultório Principal • DuoClinic Indaiatuba
                </div>
              </div>
            </div>

            <div className="sm:col-span-4 relative rounded-3xl overflow-hidden border border-[#25231F]/10 shadow-xl bg-stone-100 sm:mt-6">
              <img
                src={mediaAssets.clinic.consultorioDetalhe}
                alt="Detalhes tecnológicos e de higiene do consultório DuoClinic"
                className="w-full h-[380px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1B]/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-3 right-3 text-white text-[11px]">
                <span className="font-semibold text-[#D8C5A5]">Biossegurança</span>
                <p className="text-white/90">Esterilização rigorosa</p>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {structureCards.map((card, i) => {
            const IconComponent = card.icon;
            return (
              <div
                key={i}
                className="bg-[#F7F3EC]/90 p-6 rounded-2xl border border-[#25231F]/10 hover:border-[#B08D57]/40 transition-all space-y-3 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FFFDF9] text-[#B08D57] flex items-center justify-center shadow-sm">
                  <IconComponent size={22} />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1D1D1B]">
                  {card.title}
                </h3>
                <p className="text-xs text-[#25231F]/80 leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
