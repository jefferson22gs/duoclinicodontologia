import React, { useState, useRef, useEffect } from 'react';
import { mediaAssets } from '../data/mediaAssets';
import { Sparkles, Play, Pause, Volume2, VolumeX, Eye } from 'lucide-react';

interface LocalVideoCardProps {
  title: string;
  category: string;
  description: string;
  videoSrc: string;
  posterSrc: string;
}

const LocalVideoCard: React.FC<LocalVideoCardProps> = ({
  title,
  category,
  description,
  videoSrc,
  posterSrc
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && !video.paused) {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="bg-white/5 rounded-3xl p-4 border border-white/10 hover:border-[#B08D57] transition-all flex flex-col justify-between group">
      <div>
        <div 
          className="relative aspect-[9/16] rounded-2xl overflow-hidden mb-4 bg-black cursor-pointer shadow-xl"
          onClick={togglePlay}
        >
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterSrc}
            playsInline
            muted={isMuted}
            preload="metadata"
            className="w-full h-full object-cover"
            onEnded={() => setIsPlaying(false)}
          />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 bg-[#B08D57] text-white px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-md">
            {category}
          </div>

          {/* Sound Toggle Button */}
          <button
            onClick={toggleMute}
            className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full backdrop-blur-md border border-white/20 hover:bg-black/80 transition-colors"
            aria-label={isMuted ? "Ativar som do vídeo" : "Mutar vídeo"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* Central Play/Pause Overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity">
              <div className="w-16 h-16 rounded-full bg-[#B08D57] text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <Play size={28} className="ml-1" />
              </div>
            </div>
          )}

          {/* Floating Duration / Status */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
            <span className="font-serif italic text-[#D8C5A5]">{title}</span>
            <span className="flex items-center gap-1 text-[11px] text-white/80">
              {isPlaying ? <Pause size={12} /> : <Eye size={12} />}
              <span>{isPlaying ? 'Reproduzindo' : 'Assistir'}</span>
            </span>
          </div>
        </div>

        <h3 className="font-serif text-xl font-bold text-white mb-2 group-hover:text-[#D8C5A5] transition-colors">
          {title}
        </h3>
        <p className="text-xs text-white/75 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#D8C5A5] font-medium">
        <span>DuoClinic Odontologia</span>
        <button 
          onClick={togglePlay}
          className="hover:underline flex items-center gap-1"
        >
          {isPlaying ? 'Pausar' : 'Iniciar Vídeo'}
        </button>
      </div>
    </div>
  );
};

export const VideoShowcase: React.FC = () => {
  const localVideos = [
    {
      id: 'tour-clinica',
      title: 'Tour Guiado pela DuoClinic',
      category: 'Especial DuoClinic',
      description: 'Conheça nossa recepção aconchegante, lounge e consultórios modernos na Cidade Nova em Indaiatuba.',
      videoSrc: mediaAssets.videos.tourClinica,
      posterSrc: mediaAssets.clinic.recepcaoPrincipal,
    },
    {
      id: 'cirurgia-siso',
      title: 'Cirurgia de Siso com Cuidado',
      category: 'Cirurgia & Siso',
      description: 'Bastidores de um procedimento cirúrgico seguro, planejado e conduzido com anestesia eficiente e pós-operatório atencioso.',
      videoSrc: mediaAssets.videos.cirurgiaSiso,
      posterSrc: mediaAssets.clinic.consultorioPrincipal,
    },
    {
      id: 'tratamento-canal',
      title: 'Tratamento de Canal Moderno',
      category: 'Endodontia',
      description: 'O Dr. Gabriel Mitsuo explica a precisão do tratamento de canal para preservar o dente natural com conforto.',
      videoSrc: mediaAssets.videos.tratamentoCanal,
      posterSrc: mediaAssets.clinic.consultorioDetalhe,
    },
  ];

  return (
    <section className="py-24 bg-[#1D1D1B] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B08D57]/20 border border-[#B08D57]/30 text-xs font-semibold uppercase tracking-widest text-[#D8C5A5] mb-3">
            <Sparkles size={14} />
            <span>Por Dentro da DuoClinic</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
            Vídeos &amp; Bastidores em Indaiatuba
          </h2>
          <p className="mt-4 text-base text-white/80">
            Acompanhe nossos procedimentos, conheça a clínica por dentro e entenda o cuidado dedicado a cada atendimento.
          </p>
          <div className="mt-3 text-xs text-[#D8C5A5] italic font-serif">
            Dica: O vídeo do tour pela clínica também acompanha suavemente o seu movimento de navegação ao longo da página.
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {localVideos.map((item) => (
            <LocalVideoCard
              key={item.id}
              title={item.title}
              category={item.category}
              description={item.description}
              videoSrc={item.videoSrc}
              posterSrc={item.posterSrc}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
