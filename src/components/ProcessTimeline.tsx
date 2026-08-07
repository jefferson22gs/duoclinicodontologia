import React from 'react';
import { Sparkles, Calendar, MessageCircle } from 'lucide-react';

interface ProcessTimelineProps {
  onOpenBooking: () => void;
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ onOpenBooking }) => {
  const steps = [
    {
      num: '01',
      title: 'Agendamento',
      desc: 'Contato simples e rápido via WhatsApp para escolher o melhor horário para você.'
    },
    {
      num: '02',
      title: 'Avaliação & Escuta',
      desc: 'Consulta dedicada a entender sua queixa, dúvidas e rotina de saúde com calma.'
    },
    {
      num: '03',
      title: 'Diagnóstico',
      desc: 'Exame clínico detalhado e análise de exames radiográficos para precisão.'
    },
    {
      num: '04',
      title: 'Plano de Tratamento',
      desc: 'Apresentação das alternativas, etapas estimadas e orçamento transparente.'
    },
    {
      num: '05',
      title: 'Realização do Cuidado',
      desc: 'Execução do procedimento com anestesia eficiente e máxima biossegurança.'
    },
    {
      num: '06',
      title: 'Acompanhamento',
      desc: 'Suporte pós-atendimento pelo WhatsApp e lembretes para retornos periódicos.'
    }
  ];

  return (
    <section className="py-24 bg-[#F7F3EC] relative border-t border-[#25231F]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B08D57] mb-3">
            <Sparkles size={14} />
            <span>Jornada do Paciente</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1D1D1B]">
            Como funciona o seu atendimento na <span className="italic text-[#B08D57]">DuoClinic</span>
          </h2>
          <p className="mt-4 text-base text-[#25231F]/70">
            Passo a passo organizado para que você se sinta no controle e seguro em todas as etapas.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-[#FFFDF9] p-8 rounded-3xl border border-[#25231F]/10 shadow-sm relative overflow-hidden group hover:border-[#B08D57]/40 transition-all"
            >
              <div className="text-4xl font-serif font-bold text-[#B08D57]/30 group-hover:text-[#B08D57] transition-colors mb-4">
                {step.num}
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1D1D1B] mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-[#25231F]/75 leading-relaxed font-normal">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={onOpenBooking}
            className="bg-[#B08D57] hover:bg-[#977747] text-white px-8 py-4 rounded-full font-semibold text-sm shadow-lg transition-all inline-flex items-center gap-2"
          >
            <MessageCircle size={18} />
            <span>Iniciar o Passo 01: Agendar pelo WhatsApp</span>
          </button>
        </div>

      </div>
    </section>
  );
};
