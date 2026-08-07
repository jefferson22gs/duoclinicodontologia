import React, { useRef, useEffect, useState, useCallback } from 'react';
import { mediaAssets } from '../data/mediaAssets';
import { Compass, Pause, Play, Sparkles } from 'lucide-react';

export const GlobalTourBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafId = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isPausedByUser, setIsPausedByUser] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTimeFormatted, setCurrentTimeFormatted] = useState('00:00');
  const [durationFormatted, setDurationFormatted] = useState('01:30');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [saveData, setSaveData] = useState(false);

  // Check reduced motion & data saver preferences
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    // Check navigator connection saveData
    if ('connection' in navigator && (navigator as any).connection?.saveData) {
      setSaveData(true);
    }

    return () => motionQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // Format seconds into MM:SS
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds <= 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Synchronize whole page scroll with video currentTime
  const syncScrollToVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration || isNaN(video.duration) || isPausedByUser || prefersReducedMotion || saveData) {
      return;
    }

    const scrollY = window.scrollY || window.pageYOffset || 0;
    const docHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const winHeight = window.innerHeight || 1;
    const maxScroll = Math.max(docHeight - winHeight, 1);

    const rawProgress = scrollY / maxScroll;
    const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);

    const targetTime = clampedProgress * (video.duration - 0.1);

    // Only set currentTime if difference is noticeable (> 0.04s) to avoid micro-stuttering
    if (Math.abs(video.currentTime - targetTime) > 0.04) {
      video.currentTime = targetTime;
    }

    // Throttled UI state updates for progress indicator
    if (Math.abs(clampedProgress - progress) > 0.01) {
      setProgress(clampedProgress);
      setCurrentTimeFormatted(formatTime(targetTime));
    }
  }, [isPausedByUser, prefersReducedMotion, saveData, progress]);

  // RequestAnimationFrame loop on scroll / resize
  useEffect(() => {
    const loop = () => {
      syncScrollToVideo();
      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [syncScrollToVideo]);

  // Handle Video Metadata Loaded
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      setIsLoaded(true);
      setDurationFormatted(formatTime(video.duration));
      syncScrollToVideo();
    }
  };

  const handleError = () => {
    setHasError(true);
  };

  const toggleUserPause = () => {
    setIsPausedByUser((prev) => !prev);
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-[100dvh] z-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Background Static Blur Fill (Poster) */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 filter blur-3xl opacity-40 transition-opacity duration-1000"
        style={{ backgroundImage: `url(${mediaAssets.clinic.recepcaoPrincipal})` }}
      />

      {/* Main Single Tour Video Instance */}
      {!hasError && !prefersReducedMotion && !saveData ? (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Desktop Portal Framing with Soft Gradient Masking */}
          <div className="relative w-full h-full max-w-[760px] md:w-[clamp(480px,46vw,760px)] mx-auto flex items-center justify-center">
            <video
              ref={videoRef}
              src={mediaAssets.videos.tourClinicaScroll}
              poster={mediaAssets.clinic.recepcaoPrincipal}
              muted
              playsInline
              preload="metadata"
              onLoadedMetadata={handleLoadedMetadata}
              onError={handleError}
              className="w-full h-full object-cover md:object-contain transition-opacity duration-700"
              style={{
                opacity: isLoaded ? 0.85 : 0.4,
                WebkitMaskImage:
                  'radial-gradient(circle at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0.8) 80%, rgba(0,0,0,0) 100%)',
                maskImage:
                  'radial-gradient(circle at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0.8) 80%, rgba(0,0,0,0) 100%)',
              }}
            />
          </div>
        </div>
      ) : (
        /* Fallback Static Poster Image */
        <img
          src={mediaAssets.clinic.recepcaoPrincipal}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30 filter brightness-90"
        />
      )}

      {/* Global Atmosphere Lighting & Radial Champagne Scrims */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#181613]/80 via-transparent to-[#181613]/90 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(24,22,19,0.65)_100%)] pointer-events-none" />

      {/* Subtle Noise / Texture Glow Layer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#B08D57]/10 via-transparent to-[#D8C5A5]/10 pointer-events-none mix-blend-overlay" />

      {/* Discrete Interactive Controls (Fixed Pointer Events Enabled on Control Badges) */}
      <div className="absolute bottom-6 right-6 z-20 pointer-events-auto flex items-center gap-3">
        {/* Toggle Pause / Resume Motion Button */}
        <button
          onClick={toggleUserPause}
          type="button"
          className="bg-[#1D1D1B]/80 hover:bg-[#1D1D1B] text-[#D8C5A5] hover:text-white px-3.5 py-2 rounded-full text-xs font-semibold backdrop-blur-md border border-white/15 shadow-xl transition-all flex items-center gap-2"
          title={isPausedByUser ? 'Retomar animação no fundo' : 'Pausar animação no fundo'}
          aria-label={isPausedByUser ? 'Retomar fundo animado' : 'Pausar fundo animado'}
        >
          {isPausedByUser ? (
            <>
              <Play size={13} fill="currentColor" />
              <span className="hidden sm:inline">Retomar Fundo</span>
            </>
          ) : (
            <>
              <Pause size={13} fill="currentColor" />
              <span className="hidden sm:inline">Pausar Fundo</span>
            </>
          )}
        </button>

        {/* Discrete Time / Progress Tag */}
        <div className="hidden md:flex items-center gap-2 bg-[#1D1D1B]/80 px-3.5 py-2 rounded-full text-[11px] font-mono text-[#D8C5A5] backdrop-blur-md border border-white/15 shadow-xl">
          <Compass size={13} className="text-[#B08D57]" />
          <span>TOUR DUOCLINIC • {currentTimeFormatted} / {durationFormatted}</span>
        </div>
      </div>
    </div>
  );
};
