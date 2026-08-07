import React, { useState } from 'react';
import { mediaAssets } from '../data/mediaAssets';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const localGalleryItems = [
    {
      id: 'gal-1',
      title: 'Recepção Principal DuoClinic',
      category: 'clinica',
      imageUrl: mediaAssets.clinic.recepcaoPrincipal,
      caption: 'Balcão curvo iluminado com acabamento acolhedor e lounge confortável.',
    },
    {
      id: 'gal-2',
      title: 'Consultório de Atendimento',
      category: 'tratamento',
      imageUrl: mediaAssets.clinic.consultorioPrincipal,
      caption: 'Consultório equipado com cadeira ergonômica e tecnologia de ponta.',
    },
    {
      id: 'gal-3',
      title: 'Lounge de Espera Aconchegante',
      category: 'clinica',
      imageUrl: mediaAssets.clinic.recepcaoHorizontal,
      caption: 'Ambiente silencioso, aromatizado e com cantinho do café especial.',
    },
    {
      id: 'gal-4',
      title: 'Precisão e Biossegurança',
      category: 'tratamento',
      imageUrl: mediaAssets.clinic.consultorioDetalhe,
      caption: 'Equipamentos modernos e controle rigoroso de esterilização.',
    },
    {
      id: 'gal-5',
      title: 'Odontopediatria Lúdica',
      category: 'infantil',
      imageUrl: mediaAssets.pediatric.bocaGigante,
      caption: 'Atendimento infantil leve, divertido e focado no bem-estar dos pequenos.',
    },
    {
      id: 'gal-6',
      title: 'Espaço Infantil & Super Heróis',
      category: 'infantil',
      imageUrl: mediaAssets.pediatric.superHerois,
      caption: 'Detalhes lúdicos para acolher a garotada com carinho e sem traumas.',
    },
    {
      id: 'gal-7',
      title: 'Dr. Gabriel Mitsuo Murakami',
      category: 'atendimento',
      imageUrl: mediaAssets.professionals.drGabriel,
      caption: 'Especialista em Endodontia e preservação dental na DuoClinic.',
    },
    {
      id: 'gal-8',
      title: 'Dra. Giovana Basso Pastorello',
      category: 'atendimento',
      imageUrl: mediaAssets.professionals.draGiovana,
      caption: 'Especialista em Dentística Estética e clínica geral integral.',
    },
  ];

  const categories = [
    { id: 'todos', label: 'Todas as Fotos' },
    { id: 'clinica', label: 'A Clínica' },
    { id: 'tratamento', label: 'Consultório & Estrutura' },
    { id: 'infantil', label: 'Odontopediatria' },
    { id: 'atendimento', label: 'Corpo Clínico' },
  ];

  const filteredItems = activeCategory === 'todos'
    ? localGalleryItems
    : localGalleryItems.filter(item => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  const prevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section id="estrutura-galeria" className="py-24 bg-[#FFFDF9]/90 backdrop-blur-md relative border-b border-[#25231F]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B08D57] mb-3">
            <Sparkles size={14} />
            <span>Tour Visual</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1D1D1B]">
            Galeria DuoClinic Indaiatuba
          </h2>
          <p className="mt-4 text-base text-[#25231F]/80">
            Conheça a recepção, consultórios, detalhes de biossegurança e ambiente acolhedor da nossa clínica.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#B08D57] text-white shadow-md'
                  : 'bg-[#F7F3EC] text-[#25231F]/80 hover:bg-[#EEE6DB]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative rounded-3xl overflow-hidden border border-[#25231F]/10 shadow-md hover:shadow-2xl transition-all cursor-pointer bg-[#F7F3EC]"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold">{item.title}</h3>
                    <p className="text-xs text-white/80 mt-1">{item.caption}</p>
                  </div>
                  <div className="p-2 rounded-full bg-white/20 backdrop-blur-md shrink-0">
                    <Maximize2 size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {currentItem && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 text-white/80 hover:text-white bg-white/10 rounded-full"
            aria-label="Fechar galeria"
          >
            <X size={24} />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 sm:left-8 p-3 text-white/80 hover:text-white bg-white/10 rounded-full"
            aria-label="Imagem anterior"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 sm:right-8 p-3 text-white/80 hover:text-white bg-white/10 rounded-full"
            aria-label="Próxima imagem"
          >
            <ChevronRight size={28} />
          </button>

          <div className="max-w-4xl w-full text-center text-white space-y-4">
            <img
              src={currentItem.imageUrl}
              alt={currentItem.title}
              className="max-h-[75vh] w-auto mx-auto rounded-2xl object-contain shadow-2xl border border-white/20"
            />
            <div>
              <h3 className="font-serif text-2xl font-bold">{currentItem.title}</h3>
              <p className="text-sm text-white/80 mt-1">{currentItem.caption}</p>
              <div className="text-xs text-[#D8C5A5] mt-2">
                {(lightboxIndex ?? 0) + 1} de {filteredItems.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
