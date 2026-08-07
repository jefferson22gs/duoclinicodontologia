import React from 'react';
import { WifiOff, Wifi, RefreshCw } from 'lucide-react';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const { isOnline, wasOffline } = useOnlineStatus();

  if (isOnline && !wasOffline) {
    return null;
  }

  return (
    <div
      className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-md w-[calc(100vw-2rem)] px-4 py-3 rounded-2xl shadow-xl border backdrop-blur-md transition-all duration-300 animate-in slide-in-from-top"
      role="status"
      aria-live="polite"
    >
      {!isOnline ? (
        <div className="bg-[#1D1D1B]/95 text-white border-[#B08D57]/40 p-3 rounded-xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-amber-500/20 text-amber-400 rounded-lg shrink-0">
              <WifiOff size={18} />
            </div>
            <p className="text-xs text-[#E5DEC9] leading-tight">
              Você está offline. Algumas mídias e serviços externos ficarão disponíveis quando a conexão retornar.
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            type="button"
            className="inline-flex items-center gap-1 bg-[#B08D57] hover:bg-[#977747] text-white text-[11px] font-semibold py-1.5 px-2.5 rounded-lg shrink-0 transition-colors"
          >
            <RefreshCw size={12} />
            <span>Tentar novamente</span>
          </button>
        </div>
      ) : (
        <div className="bg-emerald-950/90 text-emerald-100 border-emerald-500/40 p-2.5 rounded-xl flex items-center justify-center gap-2">
          <Wifi size={16} className="text-emerald-400" />
          <p className="text-xs font-semibold">Conexão restabelecida.</p>
        </div>
      )}
    </div>
  );
};
