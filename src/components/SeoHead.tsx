import React, { useEffect } from 'react';
import { clinicConfig } from '../data/clinicData';

export const SeoHead: React.FC = () => {
  useEffect(() => {
    // Inject Schema.org JSON-LD dynamically
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": ["Dentist", "LocalBusiness", "MedicalBusiness"],
          "@id": "https://duoclinicindaiatuba.com.br/#dentist",
          "name": clinicConfig.name,
          "alternateName": clinicConfig.brandName,
          "url": "https://duoclinicindaiatuba.com.br",
          "logo": "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600",
          "image": "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200",
          "telephone": clinicConfig.contact.phoneFormatted,
          "email": clinicConfig.contact.email,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": `${clinicConfig.address.street}, ${clinicConfig.address.number}, ${clinicConfig.address.room}`,
            "addressLocality": clinicConfig.address.city,
            "addressRegion": clinicConfig.address.state,
            "postalCode": clinicConfig.address.cep,
            "addressCountry": "BR"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": clinicConfig.address.geo.latitude,
            "longitude": clinicConfig.address.geo.longitude
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "08:00",
              "closes": "18:00"
            }
          ],
          "priceRange": "$$",
          "sameAs": [
            clinicConfig.instagramUrl
          ]
        },
        {
          "@type": "Person",
          "name": "Dr. Gabriel Mitsuo Murakami",
          "jobTitle": "Cirurgião-Dentista, Especialista em Endodontia",
          "worksFor": { "@id": "https://duoclinicindaiatuba.com.br/#dentist" },
          "description": "Especialista em Endodontia e preservação dental na DuoClinic Indaiatuba."
        },
        {
          "@type": "Person",
          "name": "Dra. Giovana Basso Pastorello",
          "jobTitle": "Cirurgiã-Dentista",
          "identifier": "CRO/SP 158.568",
          "worksFor": { "@id": "https://duoclinicindaiatuba.com.br/#dentist" },
          "description": "Cirurgiã-dentista, em especialização em Dentística, atuando em clínica geral e estética dental."
        },
        {
          "@type": "FAQPage",
          "mainEntity": clinicConfig.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'json-ld-duoclinic';
    script.text = JSON.stringify(schemaData);
    
    const existing = document.getElementById('json-ld-duoclinic');
    if (existing) {
      existing.remove();
    }
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('json-ld-duoclinic');
      if (el) el.remove();
    };
  }, []);

  return null;
};
