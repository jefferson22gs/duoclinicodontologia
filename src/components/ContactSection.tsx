import React, { useState } from 'react';
import { clinicConfig } from '../data/clinicData';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Navigation, ShieldCheck } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    phone: '',
    treatment: 'Avaliação Geral',
    message: '',
    consent: false
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      alert('Por favor, aceite os termos de uso dos dados para prosseguir.');
      return;
    }

    const text = `Olá! Meu nome é *${formData.nome}* (${formData.phone}).
Gostaria de agendar uma avaliação para: *${formData.treatment}*.
Mensagem: ${formData.message || 'Sem observações adicionais.'}`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${clinicConfig.contact.whatsappRaw}?text=${encoded}`, '_blank');
    setFormSubmitted(true);
  };

  return (
    <section id="contato" className="py-24 bg-[#FFFDF9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Contact Info & Map Column */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B08D57] mb-3">
                <MapPin size={14} />
                <span>Localização &amp; Contato</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1D1D1B]">
                Venha conhecer a <span className="italic text-[#B08D57]">DuoClinic</span>
              </h2>
              <p className="mt-3 text-base text-[#25231F]/70">
                Estamos localizados no coração da Cidade Nova em Indaiatuba — SP, em um ambiente tranquilo e de fácil acesso.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="bg-[#F7F3EC] p-5 rounded-2xl border border-[#25231F]/5 space-y-2">
                <div className="flex items-center gap-2 text-[#B08D57] font-semibold text-xs uppercase tracking-wider">
                  <MapPin size={16} />
                  <span>Endereço</span>
                </div>
                <div className="font-semibold text-sm text-[#1D1D1B]">
                  {clinicConfig.address.street}, {clinicConfig.address.number}, {clinicConfig.address.room}
                </div>
                <div className="text-xs text-[#25231F]/70">
                  {clinicConfig.address.neighborhood} — {clinicConfig.address.city}/{clinicConfig.address.state}
                </div>
                <div className="text-[11px] text-[#25231F]/50">
                  CEP {clinicConfig.address.cep}
                </div>
              </div>

              <div className="bg-[#F7F3EC] p-5 rounded-2xl border border-[#25231F]/5 space-y-2">
                <div className="flex items-center gap-2 text-[#B08D57] font-semibold text-xs uppercase tracking-wider">
                  <Phone size={16} />
                  <span>WhatsApp &amp; Telefone</span>
                </div>
                <div className="font-semibold text-sm text-[#1D1D1B]">
                  {clinicConfig.contact.phoneFormatted}
                </div>
                <div className="text-xs text-[#25231F]/70">
                  Atendimento direto com a equipe
                </div>
                <a
                  href={`https://wa.me/${clinicConfig.contact.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#B08D57] hover:underline pt-1"
                >
                  <MessageCircle size={12} />
                  <span>Iniciar conversa no WhatsApp</span>
                </a>
              </div>

              <div className="bg-[#F7F3EC] p-5 rounded-2xl border border-[#25231F]/5 space-y-2">
                <div className="flex items-center gap-2 text-[#B08D57] font-semibold text-xs uppercase tracking-wider">
                  <Clock size={16} />
                  <span>Horário de Funcionamento</span>
                </div>
                <div className="font-semibold text-sm text-[#1D1D1B]">
                  {clinicConfig.contact.hoursWeekdays}
                </div>
                <div className="text-xs text-[#25231F]/70">
                  Sábados, domingos e feriados: Fechado
                </div>
              </div>

              <div className="bg-[#F7F3EC] p-5 rounded-2xl border border-[#25231F]/5 space-y-2">
                <div className="flex items-center gap-2 text-[#B08D57] font-semibold text-xs uppercase tracking-wider">
                  <Mail size={16} />
                  <span>E-mail Público</span>
                </div>
                <div className="font-semibold text-sm text-[#1D1D1B] truncate">
                  {clinicConfig.contact.email}
                </div>
                <div className="text-xs text-[#25231F]/70">
                  Retorno em até 24h úteis
                </div>
              </div>

            </div>

            {/* Embedded Map Container */}
            <div className="rounded-3xl overflow-hidden border border-[#25231F]/10 shadow-lg bg-[#F7F3EC] relative">
              <iframe
                title="Localização da DuoClinic Odontologia em Indaiatuba"
                src={clinicConfig.googleMapEmbedUrl}
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
              <div className="p-4 bg-[#FFFDF9] flex items-center justify-between">
                <span className="text-xs text-[#25231F]/80 font-medium">
                  Rua Paul Harris, 494 — Cidade Nova, Indaiatuba
                </span>
                <a
                  href={clinicConfig.googleMapDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#B08D57] hover:bg-[#977747] text-white px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                >
                  <Navigation size={12} />
                  <span>Como Chegar</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-6 bg-[#F7F3EC] p-8 sm:p-10 rounded-3xl border border-[#25231F]/10 shadow-xl space-y-6">
            
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#B08D57]">
                Agendamento Rápido
              </span>
              <h3 className="font-serif text-3xl font-bold text-[#1D1D1B] mt-1">
                Solicite sua avaliação
              </h3>
              <p className="text-xs text-[#25231F]/70 mt-1">
                Preencha os campos para ser direcionado ao WhatsApp da clínica com sua solicitação.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label htmlFor="contact-nome" className="block text-xs font-semibold text-[#1D1D1B] uppercase tracking-wider mb-1">
                  Seu Nome Completo *
                </label>
                <input
                  id="contact-nome"
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Ex: Maria Silva"
                  className="w-full bg-[#FFFDF9] border border-[#25231F]/15 rounded-xl px-4 py-3 text-sm text-[#25231F] focus:outline-none focus:ring-2 focus:ring-[#B08D57]"
                />
              </div>

              <div>
                <label htmlFor="contact-phone" className="block text-xs font-semibold text-[#1D1D1B] uppercase tracking-wider mb-1">
                  WhatsApp / Telefone *
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(19) 99999-9999"
                  className="w-full bg-[#FFFDF9] border border-[#25231F]/15 rounded-xl px-4 py-3 text-sm text-[#25231F] focus:outline-none focus:ring-2 focus:ring-[#B08D57]"
                />
              </div>

              <div>
                <label htmlFor="contact-treatment" className="block text-xs font-semibold text-[#1D1D1B] uppercase tracking-wider mb-1">
                  Tratamento de Interesse
                </label>
                <select
                  id="contact-treatment"
                  value={formData.treatment}
                  onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                  className="w-full bg-[#FFFDF9] border border-[#25231F]/15 rounded-xl px-4 py-3 text-sm text-[#25231F] focus:outline-none focus:ring-2 focus:ring-[#B08D57]"
                >
                  <option value="Avaliação Geral">Avaliação Geral / Consulta Inicial</option>
                  <option value="Tratamento de Canal (Endodontia)">Tratamento de Canal (Endodontia)</option>
                  <option value="Facetas e Estética em Resina">Facetas e Estética em Resina</option>
                  <option value="Fechamento de Diastema">Fechamento de Diastema</option>
                  <option value="Clareamento Dental">Clareamento Dental</option>
                  <option value="Extração de Siso">Extração de Siso</option>
                  <option value="Limpeza / Profilaxia">Limpeza / Profilaxia</option>
                  <option value="Odontopediatria">Odontopediatria (Atendimento Infantil)</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-[#1D1D1B] uppercase tracking-wider mb-1">
                  Observação de Agendamento (Opcional)
                </label>
                <textarea
                  id="contact-message"
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Horário ou período de preferência..."
                  className="w-full bg-[#FFFDF9] border border-[#25231F]/15 rounded-xl px-4 py-3 text-sm text-[#25231F] focus:outline-none focus:ring-2 focus:ring-[#B08D57]"
                />
                <span className="text-[11px] text-[#25231F]/60 mt-1 block">
                  Não envie informações clínicas ou dados sensíveis por este formulário.
                </span>
              </div>

              {/* LGPD Consent */}
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="lgpd-consent"
                  required
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-0.5 rounded text-[#B08D57] focus:ring-[#B08D57]"
                />
                <label htmlFor="lgpd-consent" className="text-xs text-[#25231F]/70 leading-normal">
                  Concordo com o uso dos meus dados para retorno sobre este atendimento, em conformidade com a LGPD.
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#B08D57] hover:bg-[#977747] text-white py-4 rounded-full font-semibold text-sm shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Send size={16} />
                <span>Enviar e Abrir no WhatsApp</span>
              </button>

              <div className="text-[11px] text-[#25231F]/50 text-center pt-2 flex items-center justify-center gap-1">
                <ShieldCheck size={14} className="text-[#B08D57]" />
                <span>As informações deste site não substituem avaliação odontológica individual.</span>
              </div>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
};
