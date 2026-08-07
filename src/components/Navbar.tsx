import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, Instagram } from 'lucide-react';
import { clinicConfig } from '../data/clinicData';
import { mediaAssets } from '../data/mediaAssets';
import { PWAInstallButton } from './pwa/PWAInstallButton';

interface NavbarProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll and Escape key handling for mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'A DuoClinic', href: '#a-duoclinic' },
    { label: 'Tratamentos', href: '#especialidades' },
    { label: 'Vídeos', href: '#em-movimento' },
    { label: 'Profissionais', href: '#profissionais' },
    { label: 'Estrutura', href: '#estrutura' },
    { label: 'Contato', href: '#contato' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 pt-[env(safe-area-inset-top,0px)] ${
          isScrolled
            ? 'bg-[#FFFDF9]/90 backdrop-blur-md shadow-sm border-b border-[#25231F]/10 py-3'
            : 'bg-gradient-to-b from-[#181613]/80 via-[#181613]/40 to-transparent py-4 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Brand Header */}
            <a
              href="#inicio"
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#B08D57] rounded-md p-1"
              aria-label="DuoClinic Odontologia - Página Inicial"
            >
              <img
                src={mediaAssets.brand.logo}
                alt="Logo DuoClinic Odontologia Indaiatuba"
                className="w-10 h-10 sm:w-11 sm:h-11 object-cover rounded-xl border border-white/20 shadow-sm"
              />
              <div className="flex flex-col">
                <span className={`font-serif text-2xl sm:text-3xl tracking-widest font-bold leading-none ${isScrolled ? 'text-[#1D1D1B]' : 'text-white'}`}>
                  DUO<span className="text-[#B08D57]">CLINIC</span>
                </span>
                <span className={`text-[9px] sm:text-[10px] tracking-[0.22em] uppercase font-medium mt-1 ${isScrolled ? 'text-[#25231F]/70' : 'text-white/80'}`}>
                  Odontologia • Indaiatuba
                </span>
              </div>
            </a>

            {/* Desktop Nav Links (xl:flex) */}
            <nav className="hidden xl:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-xs xl:text-sm font-medium transition-colors hover:text-[#B08D57] ${
                    isScrolled ? 'text-[#25231F]' : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop Right CTAs */}
            <div className="hidden xl:flex items-center gap-3">
              <PWAInstallButton variant="navbar" />

              <a
                href={clinicConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full transition-colors ${
                  isScrolled ? 'text-[#25231F] hover:bg-[#EEE6DB]' : 'text-white hover:bg-white/10'
                }`}
                aria-label="Siga a DuoClinic no Instagram"
              >
                <Instagram size={18} />
              </a>
              
              <button
                onClick={() => onOpenBooking()}
                type="button"
                className="inline-flex items-center gap-2 bg-[#B08D57] hover:bg-[#977747] text-white px-5 py-2.5 rounded-full text-xs xl:text-sm font-semibold transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B08D57]"
              >
                <Calendar size={16} />
                <span>Agendar Avaliação</span>
              </button>
            </div>

            {/* Mobile / Tablet Hamburger Button (below xl) */}
            <div className="flex xl:hidden items-center gap-2.5">
              <PWAInstallButton variant="navbar" />

              <button
                onClick={() => onOpenBooking()}
                type="button"
                className="bg-[#B08D57] text-white px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm"
              >
                <Calendar size={14} />
                <span className="hidden sm:inline">Agendar</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                type="button"
                className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#B08D57] ${
                  isScrolled ? 'text-[#25231F]' : 'text-white'
                }`}
                aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu de navegação'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden" role="dialog" aria-modal="true" aria-label="Menu de navegação">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#FFFDF9] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#25231F]/10 pt-[env(safe-area-inset-top,0px)]">
                <div className="flex items-center gap-2.5">
                  <img
                    src={mediaAssets.brand.logo}
                    alt="Logo DuoClinic"
                    className="w-9 h-9 object-cover rounded-lg border border-[#25231F]/10"
                  />
                  <div className="flex flex-col">
                    <span className="font-serif text-2xl font-bold tracking-widest text-[#1D1D1B]">
                      DUO<span className="text-[#B08D57]">CLINIC</span>
                    </span>
                    <span className="text-[9px] tracking-[0.2em] uppercase font-semibold text-[#25231F]/60">
                      Odontologia Indaiatuba
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  type="button"
                  className="p-2 text-[#25231F] hover:text-[#B08D57] rounded-full focus:outline-none focus:ring-2 focus:ring-[#B08D57]"
                  aria-label="Fechar menu"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-medium text-[#25231F] hover:text-[#B08D57] py-2 border-b border-[#25231F]/5"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#25231F]/10 flex flex-col gap-3">
              <PWAInstallButton variant="drawer" onInstalled={() => setMobileMenuOpen(false)} />

              <a
                href={`tel:${clinicConfig.contact.whatsappRaw}`}
                className="flex items-center gap-3 text-sm text-[#25231F] hover:text-[#B08D57]"
              >
                <div className="p-2 rounded-full bg-[#EEE6DB]">
                  <Phone size={16} className="text-[#B08D57]" />
                </div>
                <div>
                  <div className="text-xs text-[#25231F]/60">Atendimento telefônico</div>
                  <div className="font-semibold">{clinicConfig.contact.phoneFormatted}</div>
                </div>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                type="button"
                className="w-full bg-[#B08D57] text-white py-3 rounded-full font-semibold text-center shadow-md flex items-center justify-center gap-2"
              >
                <Calendar size={18} />
                <span>Agendar Avaliação WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
