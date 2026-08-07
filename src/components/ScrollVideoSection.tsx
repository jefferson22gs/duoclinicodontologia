import React, { useRef, useEffect, useState } from 'react';
import { mediaAssets } from '../data/mediaAssets';
import { Sparkles, MapPin, ShieldCheck, Compass } from 'lucide-react';

interface ScrollVideoSectionProps {
  onOpenBooking?: (serviceName?: string) => void;
}

export const ScrollVideoSection: React.FC<ScrollVideoSectionProps> = ({ onOpenBooking }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rafId = useRef<number | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Four narrative milestones
  const narrativeMoments = [
    {
      id: 1,
      title: 'Um ambiente pensado para acolher',
      subtitle: 'Estrutura aconchegante e atmosfera serena no coração da Cidade Nova em Indaiatuba.',
      badge: 'Acolhimento & Paz',
      range: [0.0, 0.22]
    },
    {
      id: 2,
      title: 'Estrutura organizada e atendimento cuidadoso',
      subtitle: 'Lounge espaçoso e recepção preparada para receber você sem correria.',
      badge: 'Organização & Cuidado',
      range: [0.25, 0.48]
    },
    {
      id: 3,
      title: 'Precisão em cada etapa',
      subtitle: 'Consultórios modernos e central própria de esterilização para sua total segurança.',
      badge: 'Biossegurança & Tecnologia',
      range: [0.52, 0.75]
    },
    {
      id: 4,
      title: 'Conheça a DuoClinic',
      subtitle: 'Endodontia especializada, estética dental e um atendimento verdadeiramente humano.',
      badge: 'DuoClinic Indaiatuba',
      range: [0.78, 1.0]
    }
  ];

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Intersection Observer to detect when section is in viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Sync scroll position with video currentTime
  useEffect(() => {
    if (!isVisible || hasError || prefersReducedMotion) return;

    const updateVideoTime = () => {
      const section = sectionRef.current;
      const video = videoRef.current;

      if (section && video && video.duration && !isNaN(video.duration)) {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const totalScrollable = rect.height - windowHeight;

        if (totalScrollable > 0) {
          // Calculate normalized progress inside section [0, 1]
          const rawProgress = -rect.top / totalScrollable;
          const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);

          setProgress(clampedProgress);

          const targetTime = clampedProgress * video.duration;
          // Smooth interpolation for current time
          if (Math.abs(video.currentTime - targetTime) > 0.04) {
            video.currentTime = targetTime;
          }
        }
      }

      rafId.current = requestAnimationFrame(updateVideoTime);
    };

    rafId.current = requestAnimationFrame(updateVideoTime);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [isVisible, hasError, prefersReducedMotion]);

  // Handle video loaded metadata
  const handleLoadedMetadata = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <section
      ref={sectionRef}
      id="tour-clinica"
      className="relative min-h-[280vh] sm:min-h-[350vh] bg-[#1D1D1B] text-white"
    >
      {/* Sticky 100vh Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* Video Media Asset (z-0) */}
        {!hasError ? (
          <video
            ref={videoRef}
            src={mediaAssets.videos.tourClinica}
            poster={mediaAssets.clinic.recepcaoPrincipal}
            playsInline
            muted
            preload="metadata"
            onLoadedMetadata={handleLoadedMetadata}
            onError={handleError}
            className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700"
            style={{ opacity: isLoaded ? 1 : 0.7 }}
          />
        ) : (
          /* Fallback Poster Image if Video Fails */
          <img
            src={mediaAssets.clinic.recepcaoPrincipal}
            alt="Tour visual pela recepção e estrutura da DuoClinic em Indaiatuba"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}

        {/* Translucent Readability Scrims & Overlays (z-1) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/60 z-1 pointer-events-none" />
        <div className="absolute inset-0 bg-black/20 z-1 pointer-events-none" />

        {/* Top Floating Indicator */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-[#D8C5A5] flex items-center gap-2 shadow-lg">
          <Compass size={14} className="text-[#B08D57] animate-spin" style={{ animationDuration: '8s' }} />
          <span>Tour Guiado • Arraste para explorar</span>
        </div>

        {/* Dynamic Narrative Overlay Text Steps (z-10) */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {narrativeMoments.map((moment) => {
            const isActive = progress >= moment.range[0] && progress <= moment.range[1];

            return (
              <div
                key={moment.id}
                className={`transition-all duration-700 transform ${
                  isActive
                    ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto block'
                    : 'opacity-0 translate-y-8 scale-95 pointer-events-none hidden'
                }`}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B08D57] text-white text-xs font-bold uppercase tracking-widest shadow-lg mb-4">
                  <Sparkles size={14} />
                  <span>{moment.badge}</span>
                </div>

                <h3 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white leading-tight drop-shadow-md">
                  {moment.title}
                </h3>

                <p className="mt-4 text-base sm:text-xl text-white/90 font-normal max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
                  {moment.subtitle}
                </p>

                {moment.id === 4 && onOpenBooking && (
                  <div className="mt-8">
                    <button
                      onClick={() => onOpenBooking('Tour Guiado e Consulta DuoClinic')}
                      className="bg-[#B08D57] hover:bg-[#977747] text-white px-8 py-4 rounded-full font-semibold text-base shadow-2xl transition-all hover:scale-105"
                    >
                      Agendar Visita &amp; Avaliação no WhatsApp
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Progress Bar & Address Badge */}
        <div className="absolute bottom-6 inset-x-6 z-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/80 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
            <MapPin size={14} className="text-[#B08D57]" />
            <span>Rua Paul Harris, 494 — Cidade Nova, Indaiatuba</span>
          </div>

          {/* Interactive Progress Indicator Bar */}
          <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
            <span className="text-[10px] uppercase font-bold text-[#D8C5A5]">Progresso do Tour</span>
            <div className="w-28 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#B08D57] transition-all duration-150"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
            <span className="text-[11px] font-mono font-semibold">{Math.round(progress * 100)}%</span>
          </div>
        </div>

      </div>
    </section>
  );
};
