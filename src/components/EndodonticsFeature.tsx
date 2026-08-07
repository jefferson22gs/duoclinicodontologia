import React, { useRef, useState, useEffect } from 'react';
import { Shield, Sparkles, CheckCircle, HelpCircle, Calendar, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { mediaAssets } from '../data/mediaAssets';

interface EndodonticsFeatureProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const EndodonticsFeature: React.FC<EndodonticsFeatureProps> = ({ onOpenBooking }) => {
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
    <section id="endodontia" className="py-24 bg-[#1D1D1B]/80 backdrop-blur-md text-white relative overflow-hidden">
      {/* Background Subtle Gradient & Light Radial */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B08D57]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B08D57]/20 border border-[#B08D57]/30 text-xs font-semibold uppercase tracking-widest text-[#D8C5A5]">
              <Sparkles size={14} />
              <span>Especialidade de Destaque • Dr. Gabriel Murakami</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-white">
              Tratamento de canal com <span className="italic text-[#D8C5A5]">técnica</span>, clareza e cuidado.
            </h2>

            <p className="text-base sm:text-lg text-white/85 leading-relaxed font-normal">
              Quando a parte interna do dente é afetada, agir no momento certo pode aliviar os sintomas e ajudar a preservar o dente natural. Na DuoClinic, cada caso começa com diagnóstico criterioso, explicação transparente e planejamento individualizado.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-[#D8C5A5] font-semibold text-sm">
                  <CheckCircle size={16} />
                  <span>Alívio Efetivo de Dor</span>
                </div>
                <p className="text-xs text-white/70">
                  Diagnóstico rápido de pulpites e dores agudas para restabelecer seu conforto.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-[#D8C5A5] font-semibold text-sm">
                  <Shield size={16} />
                  <span>Preservação do Dente</span>
                </div>
                <p className="text-xs text-white/70">
                  Prioridade absoluta para salvar a raiz e a estrutura natural dos seus dentes.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-[#D8C5A5] font-semibold text-sm">
                  <CheckCircle size={16} />
                  <span>Tecnologia Aplicada</span>
                </div>
                <p className="text-xs text-white/70">
                  Instrumentação mecanizada e localizadores apicais para máxima precisão.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-[#D8C5A5] font-semibold text-sm">
                  <CheckCircle size={16} />
                  <span>Acompanhamento Próximo</span>
                </div>
                <p className="text-xs text-white/70">
                  Suporte direto após a sessão para garantir uma recuperação serena.
                </p>
              </div>
            </div>

            {/* Informational Disclaimer */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3 text-xs text-white/70">
              <HelpCircle size={18} className="text-[#D8C5A5] shrink-0 mt-0.5" />
              <span>
                <strong>Nota ética importante:</strong> A indicação do tratamento de canal depende de avaliação clínica e exames complementares como radiografia periapical.
              </span>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenBooking('Tratamento de Canal (Endodontia)')}
                className="bg-[#B08D57] hover:bg-[#977747] text-white px-7 py-3.5 rounded-full font-semibold text-sm shadow-xl transition-all inline-flex items-center gap-2"
              >
                <Calendar size={18} />
                <span>Agendar Avaliação de Endodontia</span>
              </button>
            </div>
          </div>

          {/* Right Visual Video Frame (tratamento_canal.mp4) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-white/5 p-4 shadow-2xl">
              <div 
                className="relative aspect-[9/16] max-h-[500px] mx-auto rounded-2xl overflow-hidden bg-black cursor-pointer shadow-xl group"
                onClick={togglePlay}
              >
                <video
                  ref={videoRef}
                  src={mediaAssets.videos.tratamentoCanal}
                  poster={mediaAssets.clinic.consultorioDetalhe}
                  playsInline
                  muted={isMuted}
                  preload="metadata"
                  className="w-full h-full object-cover"
                  onEnded={() => setIsPlaying(false)}
                />

                {/* Sound Toggle */}
                <button
                  onClick={toggleMute}
                  className="absolute top-4 right-4 bg-black/60 text-white p-2.5 rounded-full backdrop-blur-md border border-white/20 hover:bg-black/80 transition-colors z-20"
                  aria-label={isMuted ? "Ativar som do vídeo" : "Mutar vídeo"}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>

                {/* Play Overlay */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity z-10">
                    <div className="w-16 h-16 rounded-full bg-[#B08D57] text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <Play size={28} className="ml-1" />
                    </div>
                  </div>
                )}

                <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md p-3 rounded-xl border border-white/10 text-xs text-white z-20">
                  <span className="text-[#B08D57] font-semibold uppercase text-[10px] tracking-wider block mb-1">
                    Vídeo Demonstrativo
                  </span>
                  <p className="text-white/90 font-medium">Cuidados &amp; Precisão no Tratamento de Canal</p>
                </div>
              </div>

              <div className="mt-4 text-center text-xs text-white/70">
                <span className="text-[#D8C5A5] font-serif italic">
                  "Salvar um dente natural é o maior objetivo da nossa Endodontia."
                </span>
                <div className="text-white/80 font-semibold mt-1">
                  Dr. Gabriel Mitsuo Murakami • Especialista
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
