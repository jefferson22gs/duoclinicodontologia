// Central Media Assets Registry for DuoClinic
// All static assets located in /public/assets/

export const ENABLE_AUTHORIZED_RESULTS = false;

export interface MediaAssets {
  brand: {
    logo: string;
  };
  hero: {
    sorriso3d: string;
    premiumLogo: string;
  };
  clinic: {
    recepcaoPrincipal: string;
    consultorioPrincipal: string;
    recepcaoHorizontal: string;
    consultorioDetalhe: string;
  };
  professionals: {
    drGabriel: string;
    draGiovana: string;
  };
  pediatric: {
    bocaGigante: string;
    superHerois: string;
  };
  resultsConditional: {
    enabled: boolean;
    beforeAfter1: string;
    beforeAfter2: string;
  };
  videos: {
    tourClinica: string;
    tourClinicaScroll: string;
    tourClinicaScrollMobile: string;
    tourClinicaScrollDesktop: string;
    tratamentoCanal: string;
    cirurgiaSiso: string;
  };
}

export const mediaAssets: MediaAssets = {
  brand: {
    logo: '/assets/brand/logo_duoclinic.jpg',
  },
  hero: {
    sorriso3d: '/assets/hero/sorriso_3d_duoclinic_hero.png',
    premiumLogo: '/assets/hero/clinica_premium_logo.jpg',
  },
  clinic: {
    recepcaoPrincipal: '/assets/clinic/recepcao_principal.jpg',
    consultorioPrincipal: '/assets/clinic/consultorio_principal.jpg',
    recepcaoHorizontal: '/assets/clinic/recepcao_horizontal.jpg',
    consultorioDetalhe: '/assets/clinic/consultorio_detalhe.jpg',
  },
  professionals: {
    drGabriel: '/assets/professionals/dr_gabriel.jpg',
    draGiovana: '/assets/professionals/dra_giovana.jpg',
  },
  pediatric: {
    bocaGigante: '/assets/pediatric/odontopediatria_boca_gigante.jpg',
    superHerois: '/assets/pediatric/odontopediatria_super_herois.jpg',
  },
  resultsConditional: {
    enabled: ENABLE_AUTHORIZED_RESULTS,
    beforeAfter1: '/assets/results_conditional/sorriso_antes_depois_01.jpg',
    beforeAfter2: '/assets/results_conditional/sorriso_antes_depois_02.jpg',
  },
  videos: {
    tourClinica: '/assets/videos/tour_clinica.mp4',
    tourClinicaScroll: '/assets/videos/tour_clinica_scroll.mp4',
    tourClinicaScrollMobile: '/assets/videos/tour_clinica_scroll_mobile.mp4',
    tourClinicaScrollDesktop: '/assets/videos/tour_clinica_scroll_desktop.mp4',
    tratamentoCanal: '/assets/videos/tratamento_canal.mp4',
    cirurgiaSiso: '/assets/videos/cirurgia_siso.mp4',
  },
};
