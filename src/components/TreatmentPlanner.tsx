import React, { useState } from 'react';
import { Calendar, ArrowRight, Check, Activity, Sparkles, Sun, Smile, ShieldAlert } from 'lucide-react';
import { clinicConfig } from '../data/clinicData';

export const TreatmentPlanner: React.FC = () => {
  const [selectedGoal, setSelectedGoal] = useState<string>('canal');

  const goals = [
    {
      id: 'canal',
      title: 'Dor de dente ou Tratamento de Canal',
      subtitle: 'Alívio imediato, diagnóstico de sensibilidade e tratamento de canal com microscopia.',
      icon: Activity,
      recommended: 'Tratamento de Canal (Endodontia)',
      doctor: 'Dr. Gabriel Mitsuo Murakami',
      doctorSpecialty: 'Especialista em Endodontia',
      estimatedPhases: '1 a 2 sessões focadas no alívio de dor',
      whatsappMsg: 'Olá! Encontrei a DuoClinic pelo site e preciso de uma avaliação para dor de dente / tratamento de canal com o Dr. Gabriel.'
    },
    {
      id: 'estetica',
      title: 'Facetas e Transformação do Sorriso',
      subtitle: 'Harmonização conservadora em resina composta para dentes desalinhados, diastemas ou manchados.',
      icon: Sparkles,
      recommended: 'Facetas & Restaurações em Resina',
      doctor: 'Dra. Giovana Basso Pastorello',
      doctorSpecialty: 'Pós-graduada em Dentística',
      estimatedPhases: 'Planejamento + Execução em resina',
      whatsappMsg: 'Olá! Encontrei a DuoClinic pelo site e gostaria de agendar uma avaliação para facetas em resina com a Dra. Giovana.'
    },
    {
      id: 'clareamento',
      title: 'Dentes mais claros e iluminados',
      subtitle: 'Clareamento supervisionado para remover amarelado mantendo a sensibilidade controlada.',
      icon: Sun,
      recommended: 'Clareamento Dental Supervisionado',
      doctor: 'Dra. Giovana Basso Pastorello',
      doctorSpecialty: 'Clínica Geral e Estética',
      estimatedPhases: 'Sessão em consultório ou moldeira sob medida',
      whatsappMsg: 'Olá! Encontrei a DuoClinic pelo site e gostaria de saber mais sobre o clareamento dental.'
    },
    {
      id: 'limpeza',
      title: 'Limpeza, Prevenção e Check-up',
      subtitle: 'Remoção de tártaro, jato de bicarbonato e avaliação integral da saúde bucal.',
      icon: Check,
      recommended: 'Profilaxia e Avaliação Integral',
      doctor: 'Dra. Giovana & Dr. Gabriel',
      doctorSpecialty: 'Clínica Geral Preventiva',
      estimatedPhases: '1 consulta de rotina preventiva',
      whatsappMsg: 'Olá! Gostaria de agendar uma limpeza dental e avaliação geral na DuoClinic Indaiatuba.'
    },
    {
      id: 'infantil',
      title: 'Consulta de Odontopediatria (Crianças)',
      subtitle: 'Atendimento calmo e lúdico para cuidar do sorriso dos pequenos sem traumas.',
      icon: Smile,
      recommended: 'Odontopediatria e Prevenção Infantil',
      doctor: 'Atendimento Humanizado Lúdico',
      doctorSpecialty: 'Cuidado para Crianças',
      estimatedPhases: 'Consulta adaptativa e preventiva',
      whatsappMsg: 'Olá! Gostaria de agendar uma consulta odontopediátrica para meu filho(a) na DuoClinic.'
    },
    {
      id: 'siso',
      title: 'Extração de Siso ou Cirurgia',
      subtitle: 'Remoção segura de sisos inclusos com acompanhamento pós-operatório atencioso.',
      icon: ShieldAlert,
      recommended: 'Avaliação e Extração de Siso',
      doctor: 'Dr. Gabriel & Equipe Cirúrgica',
      doctorSpecialty: 'Cirurgia Oral Minor',
      estimatedPhases: 'Avaliação radiográfica + Cirurgia planejada',
      whatsappMsg: 'Olá! Gostaria de agendar uma avaliação para extração de siso na DuoClinic.'
    }
  ];

  const current = goals.find(g => g.id === selectedGoal) || goals[0];

  const handleBooking = () => {
    const encoded = encodeURIComponent(current.whatsappMsg);
    window.open(`https://wa.me/${clinicConfig.contact.whatsappRaw}?text=${encoded}`, '_blank');
  };

  return (
    <section className="py-20 bg-[#F7F3EC] border-y border-[#25231F]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B08D57] mb-3">
            <Sparkles size={14} />
            <span>Guia Interativo de Tratamento</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1D1D1B]">
            Qual é o seu objetivo principal hoje?
          </h2>
          <p className="mt-4 text-base text-[#25231F]/70">
            Selecione a sua necessidade principal para ver a recomendação personalizada e agendar diretamente no WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Options List */}
          <div className="lg:col-span-7 space-y-3">
            {goals.map((goal) => {
              const IconComp = goal.icon;
              const isSelected = goal.id === selectedGoal;

              return (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id)}
                  className={`w-full text-left p-5 rounded-2xl transition-all border flex items-start gap-4 ${
                    isSelected
                      ? 'bg-[#FFFDF9] border-[#B08D57] shadow-md ring-1 ring-[#B08D57]'
                      : 'bg-[#FFFDF9]/60 hover:bg-[#FFFDF9] border-[#25231F]/10'
                  }`}
                >
                  <div className={`p-3 rounded-xl shrink-0 ${isSelected ? 'bg-[#B08D57] text-white' : 'bg-[#EEE6DB] text-[#25231F]'}`}>
                    <IconComp size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-base text-[#1D1D1B]">{goal.title}</div>
                    <div className="text-xs text-[#25231F]/70 mt-1">{goal.subtitle}</div>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-[#B08D57] text-white flex items-center justify-center shrink-0 mt-1">
                      <Check size={14} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Recommendation Card */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-[#FFFDF9] p-8 rounded-3xl border border-[#B08D57]/30 shadow-xl space-y-6">
              
              <div className="inline-block bg-[#EEE6DB] text-[#B08D57] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Tratamento Recomendado
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-[#1D1D1B] leading-snug">
                  {current.recommended}
                </h3>
                <p className="text-xs text-[#25231F]/70 mt-2">
                  {current.subtitle}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#25231F]/10 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-[#25231F]/60">Profissional responsável:</span>
                  <span className="font-semibold text-[#1D1D1B]">{current.doctor}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#25231F]/60">Especialidade:</span>
                  <span className="text-[#B08D57] font-medium">{current.doctorSpecialty}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#25231F]/60">Fluxo estimado:</span>
                  <span className="text-[#1D1D1B] font-medium">{current.estimatedPhases}</span>
                </div>
              </div>

              <div className="p-4 bg-[#F7F3EC] rounded-2xl border border-[#25231F]/5 text-xs text-[#25231F]/80">
                <strong>Atendimento em Indaiatuba:</strong> Cidade Nova • Segunda a sexta, 08h às 18h.
              </div>

              <button
                onClick={handleBooking}
                className="w-full bg-[#B08D57] hover:bg-[#977747] text-white py-4 rounded-full font-semibold text-base shadow-lg transition-all flex items-center justify-center gap-2 group"
              >
                <Calendar size={18} />
                <span>Agendar Este Tratamento</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
