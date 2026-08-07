import React, { useState } from 'react';
import { clinicConfig } from '../data/clinicData';
import { Sparkles, ChevronDown, HelpCircle, MessageCircle, Search } from 'lucide-react';

interface FaqProps {
  onOpenBooking: () => void;
}

export const Faq: React.FC<FaqProps> = ({ onOpenBooking }) => {
  const [openId, setOpenId] = useState<string>('faq-1');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredFaqs = clinicConfig.faqs.filter(f => 
    f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  return (
    <section id="duvidas" className="py-24 bg-[#F7F3EC] relative border-t border-[#25231F]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B08D57] mb-3">
            <Sparkles size={14} />
            <span>Perguntas Frequentes</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1D1D1B]">
            Dúvidas comuns respondidas com <span className="italic text-[#B08D57]">clareza</span>
          </h2>
          <p className="mt-4 text-base text-[#25231F]/70">
            Encontre respostas diretas para os principais questionamentos sobre tratamentos e atendimento.
          </p>

          {/* Search Input */}
          <div className="mt-8 relative max-w-md mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#25231F]/40" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar dúvida (ex: canal, convênio, criança)..."
              className="w-full bg-[#FFFDF9] border border-[#25231F]/15 rounded-full pl-11 pr-4 py-3 text-sm text-[#25231F] focus:outline-none focus:ring-2 focus:ring-[#B08D57] shadow-sm"
            />
          </div>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-[#FFFDF9] rounded-2xl border border-[#25231F]/10 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-[#B08D57]"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif font-bold text-lg text-[#1D1D1B]">
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-full bg-[#F7F3EC] text-[#B08D57] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-[#25231F]/80 leading-relaxed border-t border-[#25231F]/5 pt-4 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center p-8 bg-[#FFFDF9] rounded-2xl border text-sm text-[#25231F]/60">
              Nenhuma pergunta encontrada com esse termo. Entre em contato diretamente no WhatsApp!
            </div>
          )}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-12 text-center p-8 bg-[#FFFDF9] rounded-3xl border border-[#B08D57]/30 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#EEE6DB] text-[#B08D57] flex items-center justify-center mx-auto">
            <HelpCircle size={22} />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#1D1D1B]">
            Tem alguma outra dúvida específica?
          </h3>
          <p className="text-xs text-[#25231F]/70 max-w-md mx-auto">
            Nossa equipe está disponível pelo WhatsApp para esclarecer detalhes sobre horários, tratamentos ou localização.
          </p>
          <button
            onClick={onOpenBooking}
            className="bg-[#B08D57] hover:bg-[#977747] text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md transition-all inline-flex items-center gap-2"
          >
            <MessageCircle size={16} />
            <span>Falar com a Equipe no WhatsApp</span>
          </button>
        </div>

      </div>
    </section>
  );
};
