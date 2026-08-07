import React from 'react';
import { clinicConfig } from '../data/clinicData';
import { Instagram, ExternalLink, Sparkles } from 'lucide-react';

export const InstagramSection: React.FC = () => {
  const posts = [
    {
      title: 'Endodontia e Preservação Dental',
      tag: 'Saúde Oral',
      desc: 'Como o tratamento de canal previne a perda de dentes naturais e elimina infecções.',
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=600&auto=format&fit=crop'
    },
    {
      title: 'Facetas em Resina Composta',
      tag: 'Estética Dental',
      desc: 'Escultura direta para harmonizar o sorriso mantendo a estrutura original do dente.',
      image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=600&auto=format&fit=crop'
    },
    {
      title: 'Orientações para Sisos Inclusos',
      tag: 'Cirurgia',
      desc: 'Quando indicar a extração e como se preparar para um pós-operatório sem complicações.',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=600&auto=format&fit=crop'
    },
    {
      title: 'Primeira Consulta Infantil',
      tag: 'Odontopediatria',
      desc: 'Acolhimento especial para que as crianças aprendam a amar o cuidado com os dentes.',
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=600&auto=format&fit=crop'
    }
  ];

  return (
    <section className="py-24 bg-[#FFFDF9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B08D57] mb-3">
              <Instagram size={14} />
              <span>{clinicConfig.instagramHandle}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1D1D1B]">
              Informação, cuidado e <span className="italic text-[#B08D57]">sorrisos reais.</span>
            </h2>
          </div>

          <a
            href={clinicConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#B08D57] hover:bg-[#977747] text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md transition-all shrink-0 self-start md:self-auto"
          >
            <Instagram size={16} />
            <span>Acompanhar no Instagram</span>
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post, idx) => (
            <a
              key={idx}
              href={clinicConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#F7F3EC] rounded-3xl overflow-hidden border border-[#25231F]/10 hover:border-[#B08D57] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="aspect-square relative overflow-hidden bg-black">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                    {post.tag}
                  </div>
                  <div className="absolute bottom-3 right-3 p-2 rounded-full bg-white/20 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <Instagram size={16} />
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-serif font-bold text-lg text-[#1D1D1B] group-hover:text-[#B08D57] transition-colors mb-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#25231F]/70 leading-relaxed">
                    {post.desc}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 text-[11px] font-semibold text-[#B08D57] flex items-center gap-1">
                <span>Ver publicação no perfil</span>
                <ExternalLink size={12} />
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
