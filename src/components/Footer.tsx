import React from 'react';
import { clinicConfig } from '../data/clinicData';
import { mediaAssets } from '../data/mediaAssets';
import { Instagram, MapPin, Phone, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1D1D1B] text-white pt-16 pb-12 border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={mediaAssets.brand.logo}
                alt="Logo DuoClinic Odontologia Indaiatuba"
                className="w-12 h-12 object-cover rounded-xl border border-white/20 shadow-md"
              />
              <div className="flex flex-col">
                <span className="font-serif text-3xl tracking-widest font-bold leading-none text-white">
                  DUO<span className="text-[#B08D57]">CLINIC</span>
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase font-medium text-[#D8C5A5] mt-1">
                  Odontologia • Indaiatuba
                </span>
              </div>
            </div>

            <p className="font-serif italic text-sm text-[#D8C5A5] max-w-sm">
              "Dois olhares. Um só cuidado: o seu sorriso."
            </p>

            <p className="text-xs text-white/60 leading-relaxed max-w-sm">
              Odontologia moderna em Indaiatuba combinando Endodontia especializada, dentística estética, odontopediatria, avaliação preventiva e atendimento humano.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#B08D57]">
              Navegação
            </div>
            <ul className="space-y-2 text-xs text-white/80">
              <li><a href="#inicio" className="hover:text-[#B08D57] transition-colors">Início</a></li>
              <li><a href="#a-duoclinic" className="hover:text-[#B08D57] transition-colors">A DuoClinic</a></li>
              <li><a href="#especialidades" className="hover:text-[#B08D57] transition-colors">Especialidades</a></li>
              <li><a href="#endodontia" className="hover:text-[#B08D57] transition-colors">Endodontia</a></li>
              <li><a href="#odontopediatria" className="hover:text-[#B08D57] transition-colors">Odontopediatria</a></li>
              <li><a href="#profissionais" className="hover:text-[#B08D57] transition-colors">Profissionais</a></li>
              <li><a href="#estrutura" className="hover:text-[#B08D57] transition-colors">Estrutura</a></li>
              <li><a href="#avaliacoes" className="hover:text-[#B08D57] transition-colors">Avaliações</a></li>
              <li><a href="#contato" className="hover:text-[#B08D57] transition-colors">Contato</a></li>
            </ul>
          </div>

          {/* Professionals & CRO */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#B08D57]">
              Corpo Clínico
            </div>
            <div className="space-y-2 text-xs text-white/80">
              <div>
                <div className="font-semibold text-white">Dr. Gabriel Mitsuo Murakami</div>
                <div className="text-[11px] text-white/60">Cirurgião-Dentista | Especialista em Endodontia</div>
              </div>
              <div className="pt-2 border-t border-white/10">
                <div className="font-semibold text-white">Dra. Giovana Basso Pastorello</div>
                <div className="text-[11px] text-white/60">Cirurgiã-Dentista | Em Especialização em Dentística</div>
                <div className="text-[10px] text-[#D8C5A5]">CRO/SP 158.568</div>
              </div>
            </div>
          </div>

          {/* Location & Legal */}
          <div className="lg:col-span-3 space-y-3 text-xs text-white/80">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#B08D57]">
              Dados da Clínica
            </div>
            <div className="flex items-start gap-2">
              <MapPin size={14} className="text-[#B08D57] shrink-0 mt-0.5" />
              <span>{clinicConfig.address.fullAddress}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-[#B08D57] shrink-0" />
              <span>{clinicConfig.contact.phoneFormatted}</span>
            </div>
            <div className="flex items-center gap-2">
              <Instagram size={14} className="text-[#B08D57] shrink-0" />
              <a href={clinicConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {clinicConfig.instagramHandle}
              </a>
            </div>
            <div className="pt-2 text-[11px] text-white/50 space-y-0.5">
              <div>CNPJ: {clinicConfig.legal.cnpj}</div>
              <div>CNES: {clinicConfig.legal.cnes}</div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            &copy; {currentYear} {clinicConfig.name}. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Indaiatuba — São Paulo</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck size={12} className="text-[#B08D57]" />
              Atendimento em Conformidade com LGPD
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
