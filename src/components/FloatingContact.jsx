import React, { useState } from 'react';
import { MessageCircle, Phone, X, Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import './FloatingContact.css';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="floating-contact">
      <div className={`floating-menu ${isOpen ? 'open' : ''}`}>
        <a href="https://wa.me/8801768436319" target="_blank" rel="noreferrer" className="floating-item whatsapp">
          <FaWhatsapp size={20} />
          <span className="tooltip">WhatsApp</span>
        </a>
        <a href="tel:+8801768436319" className="floating-item phone">
          <Phone size={20} />
          <span className="tooltip">Call Us</span>
        </a>
        <a href="mailto:brownsinteriorstudio@gmail.com" className="floating-item mail">
          <Mail size={20} />
          <span className="tooltip">Email</span>
        </a>
      </div>
      
      <button className="floating-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
