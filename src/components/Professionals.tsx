import React from 'react';
import { clinicConfig } from '../data/clinicData';
import { mediaAssets } from '../data/mediaAssets';
import { Sparkles, Check, Calendar } from 'lucide-react';

interface ProfessionalsProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const Professionals: React.FC<ProfessionalsProps> = ({ onOpenBooking }) => {
  const getProfessionalPhoto = (id: string) => {
    if (id === 'dr-gabriel') return mediaAssets.professionals.drGabriel;
    if (id === 'dra-giovana') return mediaAssets.professionals.draGiovana;
    return mediaAssets.professionals.drGabriel;
  };

  return (
    <section id="profissionais" className="py-24 bg-[#F7F3EC]/90 backdrop-blur-md relative border-b border-[#25231F]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B08D57] mb-3">
            <Sparkles size={14} />
            <span>Corpo Clínico</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1D1D1B]">
            À frente da DuoClinic Indaiatuba
          </h2>
          <p className="mt-4 text-base text-[#25231F]/80">
            Dois profissionais dedicados a combinar técnica rigorosa, pós-graduações e um acolhimento genuíno para o seu sorriso.
          </p>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {clinicConfig.professionals.map((doc) => {
            const photoUrl = getProfessionalPhoto(doc.id);
            return (
              <div
                key={doc.id}
                className="bg-[#FFFDF9]/95 rounded-3xl p-8 border border-[#25231F]/10 shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center mb-6">
                    {/* Photo Column */}
                    <div className="sm:col-span-5 relative">
                      <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-[#25231F]/10 shadow-md bg-stone-100">
                        <img
                          src={photoUrl}
                          alt={`Foto oficial de ${doc.name}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {doc.badge && (
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#B08D57] text-white px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap shadow-md">
                          {doc.badge}
                        </div>
                      )}
                    </div>

                    {/* Info Header Column */}
                    <div className="sm:col-span-7 space-y-2">
                      <div className="text-xs font-semibold uppercase tracking-wider text-[#B08D57]">
                        {doc.specialty}
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-[#1D1D1B]">
                        {doc.name}
                      </h3>
                      <p className="text-xs text-[#25231F]/70 font-medium">
                        {doc.role} {doc.cro && `• ${doc.cro}`}
                      </p>
                      <div className="w-12 h-0.5 bg-[#B08D57]/40 rounded-full my-2" />
                    </div>
                  </div>

                  <p className="text-sm text-[#25231F]/85 leading-relaxed mb-6 font-normal">
                    {doc.bio}
                  </p>

                  <div className="space-y-2 mb-8 bg-[#F7F3EC] p-4 rounded-2xl border border-[#25231F]/5">
                    <div className="text-xs font-bold text-[#1D1D1B] uppercase tracking-wider mb-2">
                      Principais áreas de atuação:
                    </div>
                    {doc.focus.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#25231F]/80">
                        <Check size={14} className="text-[#B08D57] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#25231F]/10">
                  <button
                    onClick={() => onOpenBooking(`Consulta com ${doc.name}`)}
                    className="w-full bg-[#B08D57] hover:bg-[#977747] text-white py-3.5 rounded-full text-xs font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar size={15} />
                    <span>Agendar Consulta com {doc.name.split(' ')[0]} {doc.name.split(' ')[1]}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
