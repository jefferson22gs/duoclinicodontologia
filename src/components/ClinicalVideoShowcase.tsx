import React, { useRef, useState, useEffect } from 'react';
import { mediaAssets } from '../data/mediaAssets';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, ShieldCheck, WifiOff, RefreshCw } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { notifyClinicalVideoState } from '../utils/videoEvents';

interface ClinicalVideoShowcaseProps {
  onOpenBooking?: (serviceName?: string) => void;
}

interface ClinicalVideo {
  id: string;
  title: string;
  description: string;
  src: string;
  poster: string;
  badge: string;
}

export const ClinicalVideoShowcase: React.FC<ClinicalVideoShowcaseProps> = () => {
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const { isOnline } = useOnlineStatus();

  const [playingId, setPlayingId] = useState<string | null>(null);
  const [mutedStates, setMutedStates] = useState<{ [key: string]: boolean }>({
    canal: true,
    siso: true,
  });

  const videos: ClinicalVideo[] = [
    {
      id: 'canal',
      title: 'Precisão no tratamento de canal',
      description: 'Registro do trabalho clínico em Endodontia realizado na DuoClinic com recursos voltados ao controle e conforto do paciente.',
      src: mediaAssets.videos.tratamentoCanal,
      poster: mediaAssets.clinic.consultorioDetalhe,
      badge: 'Endodontia na Prática'
    },
    {
      id: 'siso',
      title: 'Cuidado em procedimentos cirúrgicos',
      description: 'Registro de um procedimento cirúrgico realizado pela equipe clínica em ambiente estruturado e higienizado.',
      src: mediaAssets.videos.cirurgiaSiso,
      poster: mediaAssets.clinic.consultorioPrincipal,
      badge: 'Atuação Cirúrgica'
    }
  ];

  // Pause videos when scrolled out of viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            const videoEl = entry.target as HTMLVideoElement;
            if (videoEl && videoEl.pause) videoEl.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    Object.values(videoRefs.current).forEach((v) => {
      if (v) observer.observe(v as HTMLVideoElement);
    });

    return () => observer.disconnect();
  }, []);

  const handlePlayToggle = (id: string) => {
    if (!isOnline) return;

    const currentVideo = videoRefs.current[id];
    if (!currentVideo) return;

    if (playingId === id) {
      currentVideo.pause();
      setPlayingId(null);
      notifyClinicalVideoState(false);
    } else {
      Object.entries(videoRefs.current).forEach(([k, v]) => {
        if (k !== id && v) {
          (v as HTMLVideoElement).pause();
        }
      });
      currentVideo.play().then(() => {
        setPlayingId(id);
        notifyClinicalVideoState(true);
      }).catch(() => {
        // Handle autoplay block
      });
    }
  };

  const handleMuteToggle = (id: string) => {
    const video = videoRefs.current[id];
    if (video) {
      const nextMuted = !video.muted;
      video.muted = nextMuted;
      setMutedStates((prev) => ({ ...prev, [id]: nextMuted }));
    }
  };

  const handleFullscreen = (id: string) => {
    const video = videoRefs.current[id];
    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if ((video as unknown as { webkitRequestFullscreen?: () => void }).webkitRequestFullscreen) {
        (video as unknown as { webkitRequestFullscreen: () => void }).webkitRequestFullscreen();
      }
    }
  };

  return (
    <section id="em-movimento" className="py-20 sm:py-28 relative z-10 border-b border-[#25231F]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B08D57] bg-[#FFFDF9]/90 px-4 py-1.5 rounded-full border border-[#B08D57]/20 shadow-sm mb-4">
            <Sparkles size={14} />
            <span>Transparência Clínica</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1D1D1B] leading-tight">
            A DuoClinic em <span className="italic text-[#B08D57]">movimento</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#25231F]/80 font-normal leading-relaxed">
            Conheça de perto o cuidado, a estrutura e algumas etapas do nosso trabalho clínico diário em Indaiatuba.
          </p>
        </div>

        {/* Clinical Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {videos.map((vid) => {
            const isPlaying = playingId === vid.id;
            const isMuted = mutedStates[vid.id] ?? true;

            return (
              <div
                key={vid.id}
                className="bg-[#FFFDF9]/90 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-[#25231F]/10 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Video Container */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#181613] group shadow-inner">
                  {isOnline ? (
                    <video
                      ref={(el) => (videoRefs.current[vid.id] = el)}
                      src={vid.src}
                      poster={vid.poster}
                      muted={isMuted}
                      playsInline
                      preload="metadata"
                      onEnded={() => {
                        setPlayingId(null);
                        notifyClinicalVideoState(false);
                      }}
                      onPause={() => {
                        if (playingId === vid.id) {
                          setPlayingId(null);
                          notifyClinicalVideoState(false);
                        }
                      }}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={vid.poster}
                      alt={vid.title}
                      className="w-full h-full object-cover opacity-80 filter brightness-90"
                    />
                  )}

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 bg-[#181613]/80 backdrop-blur-md text-[#D8C5A5] text-[11px] font-semibold px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5 shadow-md">
                    <ShieldCheck size={13} className="text-[#B08D57]" />
                    <span>{vid.badge}</span>
                  </div>

                  {/* Offline Notice or Play Button */}
                  {!isOnline ? (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center space-y-2">
                      <WifiOff size={24} className="text-amber-400" />
                      <p className="text-xs text-[#E5DEC9] max-w-xs font-medium">
                        O vídeo estará disponível quando a conexão retornar.
                      </p>
                      <button
                        onClick={() => window.location.reload()}
                        type="button"
                        className="mt-1 inline-flex items-center gap-1.5 bg-[#B08D57] hover:bg-[#977747] text-white text-xs font-semibold py-1.5 px-3 rounded-full shadow-md transition-colors"
                      >
                        <RefreshCw size={12} />
                        <span>Tentar novamente</span>
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => handlePlayToggle(vid.id)}
                        type="button"
                        className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#B08D57]/90 hover:bg-[#B08D57] text-white flex items-center justify-center shadow-2xl transition-transform transform group-hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#D8C5A5]"
                        aria-label={isPlaying ? `Pausar vídeo ${vid.title}` : `Reproduzir vídeo ${vid.title}`}
                      >
                        {isPlaying ? (
                          <Pause size={28} fill="white" />
                        ) : (
                          <Play size={28} fill="white" className="ml-1" />
                        )}
                      </button>

                      <div className="absolute bottom-3 right-3 flex items-center gap-2">
                        <button
                          onClick={() => handleMuteToggle(vid.id)}
                          type="button"
                          className="w-9 h-9 rounded-full bg-[#181613]/80 hover:bg-[#181613] text-white flex items-center justify-center backdrop-blur-md border border-white/15 transition-all"
                          aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
                          title={isMuted ? 'Ativar som' : 'Desativar som'}
                        >
                          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        </button>

                        <button
                          onClick={() => handleFullscreen(vid.id)}
                          type="button"
                          className="w-9 h-9 rounded-full bg-[#181613]/80 hover:bg-[#181613] text-white flex items-center justify-center backdrop-blur-md border border-white/15 transition-all"
                          aria-label="Expandir vídeo em tela cheia"
                          title="Tela cheia"
                        >
                          <Maximize2 size={16} />
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Card Info */}
                <div className="mt-5 space-y-2">
                  <h3 className="font-serif text-2xl font-bold text-[#1D1D1B]">
                    {vid.title}
                  </h3>
                  <p className="text-sm text-[#25231F]/80 leading-relaxed">
                    {vid.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
