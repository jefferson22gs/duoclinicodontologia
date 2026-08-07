import React from 'react';
import { clinicConfig } from '../data/clinicData';
import { Sparkles, ExternalLink, HeartHandshake, MessageSquare, ShieldCheck, Home, Baby } from 'lucide-react';

export const Reviews: React.FC = () => {
  const valuePillars = [
    {
      icon: HeartHandshake,
      title: 'Atendimento Acolhedor',
      description: 'Consultas conduziadas com paciência, escuta atenta e respeito ao ritmo de cada paciente.'
    },
    {
      icon: MessageSquare,
      title: 'Explicações Claras',
      description: 'Orientação detalhada e transparente sobre o planejamento de cada etapa do tratamento.'
    },
    {
      icon: ShieldCheck,
      title: 'Cuidado em Cada Etapa',
      description: 'Prioridade absoluta para o conforto físico e emocional durante os procedimentos.'
    },
    {
      icon: Home,
      title: 'Ambiente Organizado',
      description: 'Instalações higienizadas, recepção confortável e estrutura física na Cidade Nova em Indaiatuba.'
    },
    {
      icon: Baby,
      title: 'Atenção com Crianças e Famílias',
      description: 'Linguagem lúdica e adaptação especial para o atendimento de crianças sem traumas.'
    }
  ];

  return (
    <section id="avaliacoes" className="py-24 bg-[#F7F3EC] relative border-b border-[#25231F]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B08D57] mb-3">
            <Sparkles size={14} />
            <span>Valores &amp; Experiência do Paciente</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1D1D1B]">
            O que os pacientes mais valorizam
          </h2>
          <p className="mt-4 text-base text-[#25231F]/80 leading-relaxed max-w-2xl mx-auto">
            Entre os temas recorrentes nas experiências compartilhadas estão o acolhimento, a atenção durante o atendimento e a clareza nas orientações.
          </p>
        </div>

        {/* Thematic Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {valuePillars.map((pillar, idx) => {
            const IconComp = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-[#FFFDF9] p-8 rounded-3xl border border-[#25231F]/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#F7F3EC] text-[#B08D57] flex items-center justify-center mb-5">
                    <IconComp size={22} />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1D1D1B] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#25231F]/75 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Discreet Note & Google Link CTA */}
        <div className="text-center space-y-4">
          <p className="text-xs text-[#25231F]/60 italic">
            Síntese de temas recorrentes. Consulte as avaliações no perfil oficial da clínica.
          </p>
          <div>
            <a
              href={clinicConfig.googleMapDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FFFDF9] hover:bg-[#EEE6DB] text-[#1D1D1B] border border-[#25231F]/20 px-6 py-3.5 rounded-full font-semibold text-xs uppercase tracking-wider shadow-sm transition-all"
            >
              <span>Ver avaliações no Google</span>
              <ExternalLink size={14} className="text-[#B08D57]" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

