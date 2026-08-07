import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { RefreshCw, X, CheckCircle, WifiOff } from 'lucide-react';

export const PWAUpdatePrompt: React.FC = () => {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      if (r) {
        setInterval(() => {
          r.update();
        }, 60 * 60 * 1000); // Check for update every hour
      }
    },
    onRegisterError(error) {
      console.warn('SW registration failed:', error);
    },
  });

  const closePrompt = () => {
    setNeedRefresh(false);
    setOfflineReady(false);
  };

  const handleUpdate = () => {
    // Check if user is filling out a form in the current document
    const activeInputs = document.querySelectorAll('input:not([type="hidden"]), textarea');
    let hasFilledInput = false;
    activeInputs.forEach((input) => {
      if ((input as HTMLInputElement).value && (input as HTMLInputElement).value.trim() !== '') {
        hasFilledInput = true;
      }
    });

    if (hasFilledInput) {
      const confirmReload = window.confirm(
        'Existe um formulário com dados preenchidos. Deseja atualizar o aplicativo agora e recarregar a página?'
      );
      if (!confirmReload) return;
    }

    updateServiceWorker(true);
  };

  if (!needRefresh && !offlineReady) {
    return null;
  }

  return (
    <div
      className="fixed bottom-6 right-4 sm:right-6 z-50 max-w-sm w-[calc(100vw-2rem)] bg-[#1D1D1B] text-white p-4 rounded-2xl shadow-2xl border border-[#B08D57]/40 animate-in slide-in-from-bottom duration-300"
      role="region"
      aria-live="polite"
      aria-label="Notificação do Aplicativo DuoClinic"
    >
      {needRefresh ? (
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#B08D57] text-white shrink-0">
                <RefreshCw size={18} className="animate-spin-slow" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-[#FFFDF9]">
                  Nova versão disponível
                </h3>
                <p className="text-xs text-[#E5DEC9]">
                  Uma atualização da DuoClinic está pronta.
                </p>
              </div>
            </div>
            <button
              onClick={closePrompt}
              type="button"
              className="p-1 text-white/60 hover:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B08D57]"
              aria-label="Dispensar notificação de atualização"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleUpdate}
              type="button"
              className="flex-1 bg-[#B08D57] hover:bg-[#977747] text-white text-xs font-semibold py-2 px-3 rounded-xl transition-all text-center focus:outline-none focus:ring-2 focus:ring-white"
            >
              Atualizar agora
            </button>
            <button
              onClick={closePrompt}
              type="button"
              className="bg-white/10 hover:bg-white/20 text-white/90 text-xs font-medium py-2 px-3 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              Mais tarde
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <CheckCircle size={18} />
            </div>
            <p className="text-xs font-medium text-[#FFFDF9]">
              DuoClinic disponível para acesso rápido.
            </p>
          </div>
          <button
            onClick={closePrompt}
            type="button"
            className="p-1 text-white/60 hover:text-white rounded-lg focus:outline-none"
            aria-label="Fechar avisos"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
