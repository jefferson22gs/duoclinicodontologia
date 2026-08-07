// Dispatch global events when clinical videos play or pause
export const notifyClinicalVideoState = (isPlaying: boolean) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('duoclinic-clinical-video-state', {
        detail: { isPlaying },
      })
    );
  }
};
