import React, { useState } from 'react';
import { SeoHead } from './components/SeoHead';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandIntro } from './components/BrandIntro';
import { AboutClinic } from './components/AboutClinic';
import { Services } from './components/Services';
import { GlobalTourBackground } from './components/GlobalTourBackground';
import { ClinicalVideoShowcase } from './components/ClinicalVideoShowcase';
import { Professionals } from './components/Professionals';
import { EndodonticsFeature } from './components/EndodonticsFeature';
import { PediatricSection } from './components/PediatricSection';
import { Structure } from './components/Structure';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { ProcessTimeline } from './components/ProcessTimeline';
import { Reviews } from './components/Reviews';
import { Gallery } from './components/Gallery';
import { Faq } from './components/Faq';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AppointmentModal } from './components/AppointmentModal';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string | undefined>(undefined);

  const handleOpenBooking = (serviceName?: string) => {
    setSelectedServiceForBooking(serviceName);
    setBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingModalOpen(false);
    setSelectedServiceForBooking(undefined);
  };

  return (
    <div className="min-h-screen text-[#25231F] font-sans antialiased overflow-x-hidden relative bg-[#181613]">
      {/* Dynamic SEO Meta & Schema.org JSON-LD */}
      <SeoHead />

      {/* Global Scroll-Synced Video Background (Single Instance of tour_clinica.mp4) */}
      <GlobalTourBackground />

      {/* Skip to Main Content Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-[#B08D57] text-white px-4 py-2 rounded-md text-sm font-semibold shadow-lg"
      >
        Pular para o conteúdo principal
      </a>

      {/* 1. Header Navbar */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Content Sections Flow */}
      <main id="main-content" className="relative z-10">
        {/* 2. Hero Premium */}
        <Hero onOpenBooking={handleOpenBooking} />

        {/* 3. Manifesto e Apresentação da Clínica */}
        <BrandIntro />
        <AboutClinic />

        {/* 4. Principais Tratamentos */}
        <Services onOpenBooking={handleOpenBooking} />

        {/* 5. Casos Clínicos em Movimento (tratamento_canal.mp4 e cirurgia_siso.mp4) */}
        <ClinicalVideoShowcase onOpenBooking={handleOpenBooking} />

        {/* 6. Profissionais */}
        <Professionals onOpenBooking={handleOpenBooking} />

        {/* 7. Endodontia e Odontopediatria */}
        <EndodonticsFeature onOpenBooking={handleOpenBooking} />
        <PediatricSection onOpenBooking={handleOpenBooking} />

        {/* 8. Estrutura e Diferenciais Comprovados */}
        <Structure />
        <BeforeAfterSlider onOpenBooking={handleOpenBooking} />

        {/* 9. Jornada do Paciente */}
        <ProcessTimeline onOpenBooking={() => handleOpenBooking()} />

        {/* 10. Avaliações e Temas Recorrentes Verificados */}
        <Reviews />

        {/* 11. Galeria Compacta */}
        <Gallery />

        {/* 12. Perguntas Frequentes */}
        <Faq onOpenBooking={() => handleOpenBooking()} />

        {/* 13. Contato e Mapa */}
        <ContactSection />
      </main>

      {/* Rodapé */}
      <Footer />

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp onOpenBooking={() => handleOpenBooking()} />

      {/* Reusable Appointment Booking Modal */}
      <AppointmentModal
        isOpen={bookingModalOpen}
        onClose={handleCloseBooking}
        preselectedService={selectedServiceForBooking}
      />
    </div>
  );
}
