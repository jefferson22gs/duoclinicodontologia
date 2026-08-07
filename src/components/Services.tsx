import React, { useState } from 'react';
import { clinicConfig } from '../data/clinicData';
import { Service } from '../types/clinic';
import { 
  Activity, Stethoscope, Sparkles, Gem, Maximize2, Sun, 
  Scissors, Smile, ShieldCheck, CheckCircle2, ChevronRight, X, Calendar 
} from 'lucide-react';

interface ServicesProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return <Activity size={24} />;
      case 'Stethoscope': return <Stethoscope size={24} />;
      case 'Sparkles': return <Sparkles size={24} />;
      case 'Gem': return <Gem size={24} />;
      case 'Maximize2': return <Maximize2 size={24} />;
      case 'Sun': return <Sun size={24} />;
      case 'Scissors': return <Scissors size={24} />;
      case 'Smile': return <Smile size={24} />;
      case 'ShieldCheck': return <ShieldCheck size={24} />;
      case 'CheckCircle2': return <CheckCircle2 size={24} />;
      default: return <Sparkles size={24} />;
    }
  };

  const categories = [
    { id: 'todos', label: 'Todas as Especialidades' },
    { id: 'endodontia', label: 'Endodontia (Canal)' },
    { id: 'estetica', label: 'Estética Dental' },
    { id: 'clinica_geral', label: 'Clínica Geral & Preventiva' },
    { id: 'cirurgia', label: 'Cirurgias & Sisos' }
  ];

  const filteredServices = activeCategory === 'todos'
    ? clinicConfig.services
    : clinicConfig.services.filter(s => s.category === activeCategory || (activeCategory === 'clinica_geral' && s.category === 'preventiva'));

  return (
    <section id="especialidades" className="py-24 bg-[#FFFDF9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B08D57] mb-3">
            <Sparkles size={14} />
            <span>Atendimento Especializado</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1D1D1B]">
            Tratamentos planejados para a sua <span className="italic text-[#B08D57]">saúde e estética.</span>
          </h2>
          <p className="mt-4 text-base text-[#25231F]/70">
            Conheça as principais especialidades oferecidas na DuoClinic Indaiatuba com transparência e foco na preservação do seu sorriso natural.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#B08D57] text-white shadow-md'
                  : 'bg-[#F7F3EC] text-[#25231F]/80 hover:bg-[#EEE6DB]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-[#F7F3EC] p-8 rounded-3xl border border-[#25231F]/5 hover:border-[#B08D57]/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#FFFDF9] text-[#B08D57] border border-[#25231F]/5 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  {renderIcon(service.iconName)}
                </div>

                <div className="text-xs font-semibold text-[#B08D57] uppercase tracking-wider mb-2">
                  {service.category.replace('_', ' ')}
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#1D1D1B] mb-3 group-hover:text-[#B08D57] transition-colors">
                  {service.title}
                </h3>

                <p className="text-sm text-[#25231F]/75 leading-relaxed mb-6">
                  {service.shortDescription}
                </p>

                <div className="space-y-2 mb-8">
                  {service.benefits.slice(0, 3).map((b, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#25231F]/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#25231F]/10 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedService(service)}
                  className="text-xs font-semibold text-[#1D1D1B] hover:text-[#B08D57] flex items-center gap-1"
                >
                  <span>Detalhes completos</span>
                  <ChevronRight size={14} />
                </button>

                <button
                  onClick={() => onOpenBooking(service.title)}
                  className="bg-[#B08D57] hover:bg-[#977747] text-white px-4 py-2 rounded-full text-xs font-semibold shadow-sm transition-all"
                >
                  Agendar
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FFFDF9] rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto border border-[#B08D57]/30">
            
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-6 right-6 p-2 text-[#25231F]/60 hover:text-[#25231F] bg-[#F7F3EC] rounded-full"
              aria-label="Fechar modal"
            >
              <X size={20} />
            </button>

            <div className="w-16 h-16 rounded-2xl bg-[#F7F3EC] text-[#B08D57] flex items-center justify-center mb-6">
              {renderIcon(selectedService.iconName)}
            </div>

            <div className="text-xs font-semibold text-[#B08D57] uppercase tracking-wider mb-1">
              Especialidade DuoClinic
            </div>

            <h3 className="font-serif text-3xl font-bold text-[#1D1D1B] mb-4">
              {selectedService.title}
            </h3>

            <p className="text-base text-[#25231F]/80 leading-relaxed mb-6">
              {selectedService.fullDescription}
            </p>

            <div className="mb-6">
              <h4 className="font-semibold text-sm text-[#1D1D1B] uppercase tracking-wider mb-3">
                Benefícios e diferenciais:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedService.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2 bg-[#F7F3EC] p-3 rounded-xl text-xs text-[#25231F]">
                    <CheckCircle2 size={16} className="text-[#B08D57] shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-[#EEE6DB]/50 rounded-2xl text-xs text-[#25231F]/80 mb-6">
              <strong>Agendamento:</strong> A indicação e o plano final dependem de avaliação clínica individualizada.
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  const s = selectedService.title;
                  setSelectedService(null);
                  onOpenBooking(s);
                }}
                className="w-full bg-[#B08D57] hover:bg-[#977747] text-white py-3.5 rounded-full font-semibold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Calendar size={16} />
                <span>Agendar Avaliação para {selectedService.title}</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
