import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

interface FloatingWhatsAppProps {
  onOpenBooking: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ onOpenBooking }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isPastThreshold = window.scrollY > 200;
      setVisible((prev) => (prev !== isPastThreshold ? isPastThreshold : prev));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 group">
      {/* Desktop Hover Tooltip */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#1D1D1B] text-white text-xs font-medium py-1.5 px-3 rounded-lg shadow-xl border border-white/10 hidden sm:block">
        Falar no WhatsApp DuoClinic
      </div>

      {/* Main WhatsApp Button */}
      <button
        onClick={onOpenBooking}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-2xl transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-300 flex items-center justify-center"
        aria-label="Agendar avaliação no WhatsApp da DuoClinic"
      >
        <MessageCircle size={28} fill="white" className="text-white" />
      </button>
    </div>
  );
};
