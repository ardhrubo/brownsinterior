import React, { useState } from 'react';
import { MessageCircle, Phone, X, Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { getWhatsAppUrl } from '../data/siteData';
import './FloatingContact.css';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="floating-contact">
      <div className={`floating-menu ${isOpen ? 'open' : ''}`}>
        <a href={getWhatsAppUrl()} target="_blank" rel="noreferrer" className="floating-item whatsapp">
          <FaWhatsapp size={20} />
          <span className="tooltip">WhatsApp</span>
        </a>
        <a href="tel:+8801768436319" className="floating-item phone">
          <Phone size={20} />
          <span className="tooltip">Call Us</span>
        </a>
        <a href="mailto:info@brownsinterior.com" className="floating-item mail">
          <Mail size={20} />
          <span className="tooltip">Email</span>
        </a>
      </div>
      
      <button
        type="button"
        className="floating-toggle"
        aria-label={isOpen ? 'Close contact menu' : 'Open quick contact options'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
