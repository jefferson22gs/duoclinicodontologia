import React, { useState, useEffect, useRef } from 'react';
import { clinicConfig } from '../data/clinicData';
import { X, Send, ShieldCheck } from 'lucide-react';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  preselectedService
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(preselectedService || 'Avaliação Geral');
  const [preferredDoctor, setPreferredDoctor] = useState('Sem preferência');
  const [preferredTime, setPreferredTime] = useState('Manhã (08h às 12h)');
  const [notes, setNotes] = useState('');

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
    }
  }, [preselectedService]);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const msg = `Olá! Encontrei a DuoClinic pelo site e gostaria de agendar uma avaliação.

*Nome:* ${name || 'Não informado'}
*Telefone:* ${phone || 'Não informado'}
*Tratamento:* ${service}
*Profissional:* ${preferredDoctor}
*Período preferido:* ${preferredTime}
*Observação:* ${notes || 'Sem observações'}`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${clinicConfig.contact.whatsappRaw}?text=${encoded}`, '_blank');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="appointment-modal-title"
    >
      <div
        ref={modalRef}
        className="bg-[#FFFDF9] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-[#B08D57]/30 max-h-[90vh] overflow-y-auto"
      >
        
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#25231F]/60 hover:text-[#25231F] bg-[#F7F3EC] rounded-full focus:outline-none focus:ring-2 focus:ring-[#B08D57]"
          aria-label="Fechar janela de agendamento"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#EEE6DB] text-[#B08D57] flex items-center justify-center font-serif font-bold text-lg">
            DC
          </div>
          <div>
            <h2 id="appointment-modal-title" className="font-serif text-2xl font-bold text-[#1D1D1B]">
              Agendar Avaliação
            </h2>
            <div className="text-xs text-[#25231F]/60">DuoClinic Odontologia • Indaiatuba</div>
          </div>
        </div>

        <p className="text-xs text-[#25231F]/80 mb-6 bg-[#F7F3EC] p-3 rounded-xl border border-[#25231F]/5">
          Preencha abaixo para direcionar sua solicitação diretamente para nossa recepção no WhatsApp.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label htmlFor="modal-name" className="block text-xs font-semibold text-[#1D1D1B] uppercase tracking-wider mb-1">
              Seu Nome Completo *
            </label>
            <input
              id="modal-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Ana Souza"
              className="w-full bg-[#F7F3EC] border border-[#25231F]/15 rounded-xl px-4 py-2.5 text-sm text-[#25231F] focus:outline-none focus:ring-2 focus:ring-[#B08D57]"
            />
          </div>

          <div>
            <label htmlFor="modal-phone" className="block text-xs font-semibold text-[#1D1D1B] uppercase tracking-wider mb-1">
              WhatsApp com DDD *
            </label>
            <input
              id="modal-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(19) 99999-9999"
              className="w-full bg-[#F7F3EC] border border-[#25231F]/15 rounded-xl px-4 py-2.5 text-sm text-[#25231F] focus:outline-none focus:ring-2 focus:ring-[#B08D57]"
            />
          </div>

          <div>
            <label htmlFor="modal-service" className="block text-xs font-semibold text-[#1D1D1B] uppercase tracking-wider mb-1">
              Tratamento Desejado
            </label>
            <select
              id="modal-service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full bg-[#F7F3EC] border border-[#25231F]/15 rounded-xl px-4 py-2.5 text-sm text-[#25231F] focus:outline-none focus:ring-2 focus:ring-[#B08D57]"
            >
              <option value="Avaliação Geral">Avaliação Geral / Check-up Inicial</option>
              <option value="Tratamento de Canal (Endodontia)">Tratamento de Canal (Endodontia)</option>
              <option value="Facetas e Estética em Resina">Facetas e Restaurações em Resina</option>
              <option value="Fechamento de Diastema">Fechamento de Diastema</option>
              <option value="Clareamento Dental">Clareamento Dental Supervisionado</option>
              <option value="Extração de Siso">Extração de Siso / Cirurgia</option>
              <option value="Limpeza / Profilaxia">Limpeza e Profilaxia</option>
              <option value="Odontopediatria">Odontopediatria (Atendimento Infantil)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="modal-doctor" className="block text-xs font-semibold text-[#1D1D1B] uppercase tracking-wider mb-1">
                Profissional
              </label>
              <select
                id="modal-doctor"
                value={preferredDoctor}
                onChange={(e) => setPreferredDoctor(e.target.value)}
                className="w-full bg-[#F7F3EC] border border-[#25231F]/15 rounded-xl px-3 py-2 text-xs text-[#25231F] focus:outline-none focus:ring-2 focus:ring-[#B08D57]"
              >
                <option value="Sem preferência">Sem preferência</option>
                <option value="Dr. Gabriel Mitsuo Murakami">Dr. Gabriel Murakami</option>
                <option value="Dra. Giovana Basso Pastorello">Dra. Giovana Pastorello</option>
              </select>
            </div>

            <div>
              <label htmlFor="modal-time" className="block text-xs font-semibold text-[#1D1D1B] uppercase tracking-wider mb-1">
                Período Preferido
              </label>
              <select
                id="modal-time"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full bg-[#F7F3EC] border border-[#25231F]/15 rounded-xl px-3 py-2 text-xs text-[#25231F] focus:outline-none focus:ring-2 focus:ring-[#B08D57]"
              >
                <option value="Manhã (08h às 12h)">Manhã (08h às 12h)</option>
                <option value="Tarde (13h às 18h)">Tarde (13h às 18h)</option>
                <option value="Qualquer horário">Qualquer horário disponível</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="modal-notes" className="block text-xs font-semibold text-[#1D1D1B] uppercase tracking-wider mb-1">
              Observação de Agendamento (Opcional)
            </label>
            <input
              id="modal-notes"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Preferência por terça-feira..."
              className="w-full bg-[#F7F3EC] border border-[#25231F]/15 rounded-xl px-4 py-2 text-xs text-[#25231F] focus:outline-none focus:ring-2 focus:ring-[#B08D57]"
            />
            <span className="text-[11px] text-[#25231F]/60 mt-1 block">
              Não envie informações clínicas ou dados sensíveis por este formulário.
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-[#B08D57] hover:bg-[#977747] text-white py-3.5 rounded-full font-semibold text-sm shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
          >
            <Send size={16} />
            <span>Confirmar Agendamento no WhatsApp</span>
          </button>

          <div className="text-[11px] text-[#25231F]/50 text-center flex items-center justify-center gap-1 pt-1">
            <ShieldCheck size={12} className="text-[#B08D57]" />
            <span>Atendimento humano de Segunda a Sexta, 08h às 18h.</span>
          </div>

        </form>

      </div>
    </div>
  );
};

