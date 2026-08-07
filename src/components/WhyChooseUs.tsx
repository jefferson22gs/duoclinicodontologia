import React from 'react';
import { HeartHandshake, ClipboardList, Shield, Sparkles, Home, MessageSquare } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      title: 'Escuta & Atendimento Humanizado',
      description: 'Consultas sem pressa para você expressar suas dúvidas, expectativas e histórico de saúde com acolhimento.',
      icon: HeartHandshake
    },
    {
      title: 'Planejamento Individualizado',
      description: 'Tratamentos estruturados etapa por etapa de acordo com suas necessidades clínicas e estéticas reais.',
      icon: ClipboardList
    },
    {
      title: 'Especialista em Endodontia',
      description: 'Atuação do Dr. Gabriel focada no salvamento do dente natural e no alívio preciso de sintomas de dor.',
      icon: Shield
    },
    {
      title: 'Estética com Naturalidade',
      description: 'Dra. Giovana atua com lentes e restaurações em resina em perfeita harmonia com suas características.',
      icon: Sparkles
    },
    {
      title: 'Ambiente Limpo & Acolhedor',
      description: 'Esterilização própria rigorosa e consultório na Cidade Nova em Indaiatuba com atmosfera serena.',
      icon: Home
    },
    {
      title: 'Orientações Transparentes',
      description: 'Sem surpresas: explicamos cada procedimento, pós-operatório e custo com clareza antes de iniciar.',
      icon: MessageSquare
    }
  ];

  return (
    <section className="py-24 bg-[#FFFDF9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B08D57] mb-3">
            <Sparkles size={14} />
            <span>Nossos Pilares</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1D1D1B]">
            Por que escolher a <span className="italic text-[#B08D57]">DuoClinic?</span>
          </h2>
          <p className="mt-4 text-base text-[#25231F]/70">
            Compromisso com a sua saúde bucal através de princípios éticos, segurança clínica e respeito absoluto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((p, idx) => {
            const IconComp = p.icon;
            return (
              <div
                key={idx}
                className="bg-[#F7F3EC] p-8 rounded-3xl border border-[#25231F]/5 hover:border-[#B08D57]/30 transition-all space-y-4 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FFFDF9] text-[#B08D57] flex items-center justify-center shadow-sm">
                  <IconComp size={22} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1D1D1B]">
                  {p.title}
                </h3>
                <p className="text-sm text-[#25231F]/75 leading-relaxed font-normal">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
