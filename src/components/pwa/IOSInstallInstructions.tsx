import React, { useEffect, useRef } from 'react';
import { X, Share, PlusSquare, Smartphone } from 'lucide-react';

interface IOSInstallInstructionsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IOSInstallInstructions: React.FC<IOSInstallInstructionsProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ios-install-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-md bg-[#FFFDF9] rounded-3xl shadow-2xl border border-[#B08D57]/20 p-6 sm:p-8 text-[#25231F] space-y-6 overflow-hidden"
      >
        {/* Top bar with close button */}
        <div className="flex items-center justify-between border-b border-[#25231F]/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#1D1D1B] text-[#B08D57]">
              <Smartphone size={22} />
            </div>
            <div>
              <h2 id="ios-install-title" className="font-serif text-xl font-bold text-[#1D1D1B]">
                Instale a DuoClinic no iOS
              </h2>
              <p className="text-xs text-[#25231F]/70">No iPhone ou iPad via Safari</p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-2 text-[#25231F]/60 hover:text-[#1D1D1B] hover:bg-[#EEE6DB] rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#B08D57]"
            aria-label="Fechar instruções"
          >
            <X size={20} />
          </button>
        </div>

        {/* Instructions Steps */}
        <div className="space-y-4">
          <p className="text-xs sm:text-sm text-[#25231F]/80 leading-relaxed">
            Para instalar o aplicativo da <strong className="text-[#1D1D1B]">DuoClinic</strong> na sua tela de início sem ocupar memória da App Store, siga os passos abaixo:
          </p>

          <div className="space-y-3 pt-2">
            {/* Step 1 */}
            <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#F7F3EC] border border-[#25231F]/5">
              <div className="w-8 h-8 rounded-full bg-[#B08D57] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                1
              </div>
              <div className="text-xs sm:text-sm text-[#25231F]">
                Toque no ícone de <strong className="text-[#1D1D1B]">Compartilhar</strong> na barra de ferramentas do Safari.
                <div className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#25231F]/10 text-xs text-[#B08D57] font-medium">
                  <Share size={14} /> <span>Compartilhar</span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#F7F3EC] border border-[#25231F]/5">
              <div className="w-8 h-8 rounded-full bg-[#B08D57] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                2
              </div>
              <div className="text-xs sm:text-sm text-[#25231F]">
                Role o menu de opções para baixo e selecione <strong className="text-[#1D1D1B]">Adicionar à Tela de Início</strong>.
                <div className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#25231F]/10 text-xs text-[#1D1D1B] font-medium">
                  <PlusSquare size={14} className="text-[#B08D57]" /> <span>Adicionar à Tela de Início</span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#F7F3EC] border border-[#25231F]/5">
              <div className="w-8 h-8 rounded-full bg-[#B08D57] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                3
              </div>
              <div className="text-xs sm:text-sm text-[#25231F]">
                Toque em <strong className="text-[#1D1D1B]">Adicionar</strong> no canto superior direito para confirmar.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Button */}
        <div className="pt-2">
          <button
            onClick={onClose}
            type="button"
            className="w-full bg-[#1D1D1B] hover:bg-[#2A2925] text-white font-semibold py-3 px-4 rounded-xl text-sm transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-[#B08D57]"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
