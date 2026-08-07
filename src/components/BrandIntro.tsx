import React from 'react';
import { Sparkles } from 'lucide-react';

export const BrandIntro: React.FC = () => {
  return (
    <section className="py-20 bg-[#F7F3EC]/85 backdrop-blur-md relative overflow-hidden border-b border-[#25231F]/10">
      {/* Decorative Gold Curved Ambient Lines */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#B08D57]/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#B08D57]/5 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57] mb-6">
          <Sparkles size={14} />
          <span>Propósito DuoClinic</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#1D1D1B] leading-tight mb-8">
          Dois olhares. Um só cuidado: <span className="italic text-[#B08D57]">o seu sorriso.</span>
        </h2>

        <div className="w-16 h-0.5 bg-[#B08D57] mx-auto mb-8 rounded-full opacity-60" />

        <p className="text-base sm:text-xl text-[#25231F]/80 font-normal leading-relaxed max-w-3xl mx-auto">
          A DuoClinic nasceu da união entre especialidades complementares e um mesmo jeito de cuidar: escutar com atenção, planejar com clareza e tratar cada pessoa com respeito, técnica e sensibilidade.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto pt-8 border-t border-[#25231F]/10">
          <div className="bg-[#FFFDF9] p-6 rounded-2xl border border-[#25231F]/5 shadow-sm">
            <div className="text-2xl font-serif text-[#B08D57] font-semibold mb-2">01. Escuta Atenta</div>
            <p className="text-sm text-[#25231F]/70">
              Entendemos suas necessidades, receios e histórico antes de qualquer procedimento.
            </p>
          </div>

          <div className="bg-[#FFFDF9] p-6 rounded-2xl border border-[#25231F]/5 shadow-sm">
            <div className="text-2xl font-serif text-[#B08D57] font-semibold mb-2">02. Planejamento Claro</div>
            <p className="text-sm text-[#25231F]/70">
              Explicamos todas as fases do seu tratamento sem jargões e com transparência total.
            </p>
          </div>

          <div className="bg-[#FFFDF9] p-6 rounded-2xl border border-[#25231F]/5 shadow-sm">
            <div className="text-2xl font-serif text-[#B08D57] font-semibold mb-2">03. Precisão Técnica</div>
            <p className="text-sm text-[#25231F]/70">
              Endodontia especializada e estética dental integradas com o rigor que você merece.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
