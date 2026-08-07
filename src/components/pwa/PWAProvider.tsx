import React, { createContext, useContext } from 'react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { IOSInstallInstructions } from './IOSInstallInstructions';
import { PWAUpdatePrompt } from './PWAUpdatePrompt';
import { OfflineIndicator } from './OfflineIndicator';

interface PWAContextType {
  isInstalled: boolean;
  isInstallable: boolean;
  isIOS: boolean;
  triggerInstall: () => Promise<void>;
}

const PWAContext = createContext<PWAContextType | undefined>(undefined);

export const PWAProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pwaInstall = usePWAInstall();

  return (
    <PWAContext.Provider
      value={{
        isInstalled: pwaInstall.isInstalled,
        isInstallable: pwaInstall.isInstallable,
        isIOS: pwaInstall.isIOS,
        triggerInstall: pwaInstall.triggerInstall,
      }}
    >
      {children}
      <OfflineIndicator />
      <PWAUpdatePrompt />
      <IOSInstallInstructions
        isOpen={pwaInstall.showIOSModal}
        onClose={() => pwaInstall.setShowIOSModal(false)}
      />
    </PWAContext.Provider>
  );
};

export const usePWA = () => {
  const context = useContext(PWAContext);
  if (!context) {
    throw new Error('usePWA must be used within a PWAProvider');
  }
  return context;
};
