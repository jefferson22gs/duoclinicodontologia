import React, { useEffect, useRef, useState } from 'react';
import { mediaAssets } from '../data/mediaAssets';

export const ScrollVideoBackground: React.FC = () => {
  const videoRefBg = useRef<HTMLVideoElement | null>(null);
  const videoRefFg = useRef<HTMLVideoElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const targetTimeRef = useRef<number>(0);
  const currentTimeRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const bgVideo = videoRefBg.current;
    const fgVideo = videoRefFg.current;
    if (!bgVideo && !fgVideo) return;

    const activeVideo = fgVideo || bgVideo;
    if (!activeVideo) return;

    let isSeeking = false;

    const handleLoadedMetadata = () => {
      if (activeVideo.duration && !isNaN(activeVideo.duration)) {
        setIsLoaded(true);
      }
    };

    const handleError = () => {
      setHasError(true);
    };

    activeVideo.addEventListener('loadedmetadata', handleLoadedMetadata);
    activeVideo.addEventListener('error', handleError);

    if (activeVideo.readyState >= 1 && activeVideo.duration) {
      setIsLoaded(true);
    }

    // Scroll calculation and smooth frame interpolation
    const updateTargetTime = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const progress = Math.min(Math.max(window.scrollY / scrollable, 0), 1);
      const duration = activeVideo.duration || 1;
      targetTimeRef.current = progress * duration;
    };

    const renderLoop = () => {
      const target = targetTimeRef.current;
      const current = currentTimeRef.current;
      const diff = target - current;

      // Smooth interpolation
      if (Math.abs(diff) > 0.001) {
        currentTimeRef.current = current + diff * 0.15;
        const newTime = currentTimeRef.current;

        if (bgVideo && bgVideo.readyState >= 2 && !isSeeking) {
          try {
            bgVideo.currentTime = newTime;
          } catch (e) {
            // Ignore potential seeking race conditions
          }
        }
        if (fgVideo && fgVideo.readyState >= 2 && !isSeeking) {
          try {
            fgVideo.currentTime = newTime;
          } catch (e) {
            // Ignore potential seeking race conditions
          }
        }
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('scroll', updateTargetTime, { passive: true });
    window.addEventListener('resize', updateTargetTime, { passive: true });
    updateTargetTime();
    renderLoop();

    return () => {
      window.removeEventListener('scroll', updateTargetTime);
      window.removeEventListener('resize', updateTargetTime);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      if (activeVideo) {
        activeVideo.removeEventListener('loadedmetadata', handleLoadedMetadata);
        activeVideo.removeEventListener('error', handleError);
      }
    };
  }, []);

  if (hasError) {
    return (
      <div 
        className="fixed inset-0 z-[-10] pointer-events-none bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${mediaAssets.clinic.recepcaoPrincipal})` }}
      />
    );
  }

  return (
    <div 
      className="fixed inset-0 z-[-10] pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Layer 1: Ambient Fullscreen Blurred Fill (Desktop & Mobile) */}
      <video
        ref={videoRefBg}
        src={mediaAssets.videos.tourClinica}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover filter blur-2xl opacity-20 scale-110 transition-opacity duration-1000"
      />

      {/* Layer 2: Main Focused Vertical Video (Centered on Desktop, Fullcover on Mobile) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-[500px] md:max-w-[480px] lg:max-w-[520px] h-full flex items-center justify-center px-2">
          <video
            ref={videoRefFg}
            src={mediaAssets.videos.tourClinica}
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover md:object-contain rounded-3xl opacity-35 md:opacity-40 transition-opacity duration-1000 shadow-2xl"
          />

          {/* Side Soft Gradient Edge Masks for Seamless Blending */}
          <div className="hidden md:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F7F3EC] to-transparent pointer-events-none" />
          <div className="hidden md:block absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#F7F3EC] to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#F7F3EC] to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F7F3EC] to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Global Soft Vignette & Ivory Light Coating to preserve WCAG contrast */}
      <div className="absolute inset-0 bg-[#F7F3EC]/75 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1D1D1B]/40 via-transparent to-[#1D1D1B]/30 pointer-events-none" />
    </div>
  );
};
