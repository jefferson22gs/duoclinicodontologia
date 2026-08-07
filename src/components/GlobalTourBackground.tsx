import React, { useRef, useEffect, useState, useCallback } from 'react';
import { mediaAssets } from '../data/mediaAssets';
import { Compass, Pause, Play, WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const GlobalTourBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Engine Refs (Transient state - NO React re-renders during scroll)
  const targetProgressRef = useRef<number>(0);
  const rafScheduledRef = useRef<boolean>(false);
  const pendingSeekRef = useRef<number | null>(null);
  const scrollMaxRef = useRef<number>(1);
  const isSeekingRef = useRef<boolean>(false);

  const { isOnline } = useOnlineStatus();

  // Component UI State
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isPausedByUser, setIsPausedByUser] = useState(false);
  const [isClinicalVideoPlaying, setIsClinicalVideoPlaying] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [saveData, setSaveData] = useState(false);

  // Detect mobile device & viewport size
  useEffect(() => {
    const checkMobile = () => {
      const isMobileWidth = window.innerWidth < 768;
      const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
      setIsMobileDevice(isMobileWidth || isCoarsePointer);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Detect motion preferences & data saver
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    if (
      'connection' in navigator &&
      (navigator as unknown as { connection?: { saveData?: boolean } }).connection?.saveData
    ) {
      setSaveData(true);
    }

    return () => motionQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // Calculate scroll limits safely (Only on resize / layout change)
  const updateScrollMax = useCallback(() => {
    const docHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      1
    );
    const winHeight = window.innerHeight || 1;
    scrollMaxRef.current = Math.max(docHeight - winHeight, 1);
  }, []);

  useEffect(() => {
    updateScrollMax();

    const handleResize = () => updateScrollMax();
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    // ResizeObserver for dynamic content height changes
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => updateScrollMax());
      resizeObserver.observe(document.body);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [updateScrollMax]);

  // Listen for Clinical Video Playback Events (Dual-Video Protection)
  useEffect(() => {
    const handleClinicalVideoState = (e: Event) => {
      const customEvent = e as CustomEvent<{ isPlaying: boolean }>;
      const isPlaying = customEvent.detail?.isPlaying ?? false;
      setIsClinicalVideoPlaying(isPlaying);

      const video = videoRef.current;
      if (video && isPlaying && !video.paused) {
        video.pause();
      }
    };

    window.addEventListener('duoclinic-clinical-video-state', handleClinicalVideoState);
    return () => {
      window.removeEventListener('duoclinic-clinical-video-state', handleClinicalVideoState);
    };
  }, []);

  // Core Video Frame Update (Called via RAF on scroll demand - ZERO infinite loops)
  const processFrameUpdate = useCallback(() => {
    rafScheduledRef.current = false;

    const video = videoRef.current;
    if (
      !video ||
      isPausedByUser ||
      isClinicalVideoPlaying ||
      document.hidden ||
      !isOnline ||
      prefersReducedMotion ||
      saveData
    ) {
      return;
    }

    const duration = video.duration;
    if (!duration || isNaN(duration) || video.readyState < 2) {
      return;
    }

    const targetTime = Math.min(Math.max(targetProgressRef.current * duration, 0), duration - 0.05);

    // Tolerance check (>= 0.12 seconds to prevent micro-seeks)
    if (Math.abs(video.currentTime - targetTime) < 0.12) {
      return;
    }

    // Concurrent Seek Guard
    if (video.seeking || isSeekingRef.current) {
      pendingSeekRef.current = targetTime;
      return;
    }

    try {
      isSeekingRef.current = true;
      if ('fastSeek' in video && typeof video.fastSeek === 'function') {
        video.fastSeek(targetTime);
      } else {
        video.currentTime = targetTime;
      }
      pendingSeekRef.current = null;
    } catch {
      isSeekingRef.current = false;
    }
  }, [isPausedByUser, isClinicalVideoPlaying, isOnline, prefersReducedMotion, saveData]);

  // Handle Seek Completion Event
  const handleSeeked = () => {
    isSeekingRef.current = false;
    const video = videoRef.current;

    if (pendingSeekRef.current !== null && video) {
      const nextTarget = pendingSeekRef.current;
      pendingSeekRef.current = null;

      if (Math.abs(video.currentTime - nextTarget) >= 0.12) {
        try {
          isSeekingRef.current = true;
          if ('fastSeek' in video && typeof video.fastSeek === 'function') {
            video.fastSeek(nextTarget);
          } else {
            video.currentTime = nextTarget;
          }
        } catch {
          isSeekingRef.current = false;
        }
      }
    }
  };

  // Passive Scroll Listener (Demand-driven RAF scheduling)
  useEffect(() => {
    if (isPausedByUser || isClinicalVideoPlaying || !isOnline || prefersReducedMotion || saveData) {
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      targetProgressRef.current = Math.min(Math.max(scrollY / scrollMaxRef.current, 0), 1);

      if (!rafScheduledRef.current) {
        rafScheduledRef.current = true;
        requestAnimationFrame(processFrameUpdate);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger initial calculation once
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [
    isPausedByUser,
    isClinicalVideoPlaying,
    isOnline,
    prefersReducedMotion,
    saveData,
    processFrameUpdate,
  ]);

  // Visibility change listener
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && videoRef.current) {
        videoRef.current.pause();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const handleLoadedMetadata = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  const toggleUserPause = () => {
    setIsPausedByUser((prev) => !prev);
  };

  const videoSource = isMobileDevice
    ? mediaAssets.videos.tourClinicaScrollMobile
    : mediaAssets.videos.tourClinicaScrollDesktop;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-[100dvh] z-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Background Poster Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 transition-opacity duration-1000"
        style={{ backgroundImage: `url(${mediaAssets.clinic.recepcaoPrincipal})` }}
      />

      {/* Video Background Layer */}
      {isOnline && !hasError && !prefersReducedMotion && !saveData ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full max-w-[760px] md:w-[clamp(480px,46vw,760px)] mx-auto flex items-center justify-center">
            <video
              ref={videoRef}
              src={videoSource}
              poster={mediaAssets.clinic.recepcaoPrincipal}
              muted
              playsInline
              preload="metadata"
              onLoadedMetadata={handleLoadedMetadata}
              onSeeked={handleSeeked}
              onError={handleError}
              className="w-full h-full object-cover md:object-contain transition-opacity duration-700"
              style={{
                opacity: isLoaded ? (isClinicalVideoPlaying ? 0.2 : 0.8) : 0.4,
                ...(isMobileDevice
                  ? {}
                  : {
                      WebkitMaskImage:
                        'radial-gradient(circle at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0.8) 80%, rgba(0,0,0,0) 100%)',
                      maskImage:
                        'radial-gradient(circle at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0.8) 80%, rgba(0,0,0,0) 100%)',
                    }),
              }}
            />
          </div>
        </div>
      ) : (
        /* Fallback Static Poster Image */
        <img
          src={mediaAssets.clinic.recepcaoPrincipal}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-25 filter brightness-90"
        />
      )}

      {/* Global Scrims */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#181613]/85 via-[#181613]/50 to-[#181613]/90 pointer-events-none" />

      {/* Controls positioned at bottom-left to avoid FloatingWhatsApp collision (bottom-right) */}
      <div className="absolute bottom-6 left-6 z-20 pointer-events-auto flex items-center gap-3">
        {!isOnline ? (
          <div className="flex items-center gap-2 bg-[#1D1D1B]/90 px-3.5 py-2 rounded-full text-xs text-[#D8C5A5] backdrop-blur-md border border-[#B08D57]/30 shadow-xl">
            <WifiOff size={14} className="text-amber-400" />
            <span>Vídeo em segundo plano pausado offline.</span>
          </div>
        ) : (
          <>
            <button
              onClick={toggleUserPause}
              type="button"
              className="bg-[#1D1D1B]/85 hover:bg-[#1D1D1B] text-[#D8C5A5] hover:text-white px-3.5 py-2 rounded-full text-xs font-semibold border border-white/15 shadow-xl transition-all flex items-center gap-2 focus:ring-2 focus:ring-[#B08D57]"
              title={isPausedByUser ? 'Retomar fundo animado' : 'Pausar fundo animado'}
              aria-label={isPausedByUser ? 'Retomar fundo animado' : 'Pausar fundo animado'}
            >
              {isPausedByUser ? (
                <>
                  <Play size={13} fill="currentColor" />
                  <span>Retomar Fundo</span>
                </>
              ) : (
                <>
                  <Pause size={13} fill="currentColor" />
                  <span>Pausar Fundo</span>
                </>
              )}
            </button>

            <div className="hidden lg:flex items-center gap-2 bg-[#1D1D1B]/85 px-3.5 py-2 rounded-full text-[11px] font-mono text-[#D8C5A5] border border-white/15 shadow-xl">
              <Compass size={13} className="text-[#B08D57]" />
              <span>TOUR DUOCLINIC</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
