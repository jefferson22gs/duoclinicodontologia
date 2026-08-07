import React from 'react';
import { Download, CheckCircle2 } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'navbar' | 'drawer' | 'footer' | 'floating';
  className?: string;
  onInstalled?: () => void;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'navbar',
  className = '',
  onInstalled,
}) => {
  const { isInstalled, isInstallable, triggerInstall, installedSuccess } = usePWAInstall();

  if (isInstalled) {
    if (installedSuccess) {
      return (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-800/90 text-white text-xs font-semibold shadow-sm animate-in fade-in">
          <CheckCircle2 size={14} />
          <span>App Instalado!</span>
        </div>
      );
    }
    return null;
  }

  if (!isInstallable) {
    return null;
  }

  const handleInstallClick = async () => {
    await triggerInstall();
    if (onInstalled) onInstalled();
  };

  if (variant === 'drawer') {
    return (
      <button
        onClick={handleInstallClick}
        type="button"
        className={`w-full flex items-center justify-center gap-2 bg-[#1D1D1B] hover:bg-[#2A2925] text-[#D8C5A5] hover:text-white py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all border border-[#B08D57]/30 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B08D57] ${className}`}
        aria-label="Instalar aplicativo DuoClinic"
      >
        <Download size={16} className="text-[#B08D57]" />
        <span>Instalar App DuoClinic</span>
      </button>
    );
  }

  if (variant === 'footer') {
    return (
      <button
        onClick={handleInstallClick}
        type="button"
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1D1D1B] hover:bg-[#2A2925] text-[#D8C5A5] text-xs font-semibold border border-[#B08D57]/40 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B08D57] ${className}`}
        aria-label="Instalar DuoClinic como Aplicativo"
      >
        <Download size={14} className="text-[#B08D57]" />
        <span>Instalar App DuoClinic</span>
      </button>
    );
  }

  if (variant === 'floating') {
    return (
      <div className={`fixed bottom-20 left-4 z-30 animate-in slide-in-from-bottom duration-300 ${className}`}>
        <button
          onClick={handleInstallClick}
          type="button"
          className="flex items-center gap-2.5 bg-[#1D1D1B] text-[#FFFDF9] hover:text-[#D8C5A5] px-4 py-2.5 rounded-full shadow-xl border border-[#B08D57]/50 text-xs font-semibold transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#B08D57]"
          aria-label="Baixar e Instalar App DuoClinic"
        >
          <div className="p-1 rounded-full bg-[#B08D57] text-white">
            <Download size={13} />
          </div>
          <span>Instalar App</span>
        </button>
      </div>
    );
  }

  // Navbar default variant
  return (
    <button
      onClick={handleInstallClick}
      type="button"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1D1D1B]/80 hover:bg-[#1D1D1B] text-[#D8C5A5] border border-[#B08D57]/40 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[#B08D57] ${className}`}
      aria-label="Instalar aplicativo DuoClinic no seu dispositivo"
    >
      <Download size={14} className="text-[#B08D57]" />
      <span className="hidden sm:inline">Instalar App</span>
    </button>
  );
};
