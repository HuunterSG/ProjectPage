"use client";
import { MessageCircle } from 'lucide-react';

export function WhatsAppBtn() {
  return (
    <a
      href="https://wa.me/5492235568383" // <--- ¡No olvides poner tu número real!
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.5)] hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
    >
      <MessageCircle size={32} fill="white" className="group-hover:rotate-12 transition-transform" />
      <span className="absolute right-full mr-4 bg-white text-black px-3 py-1 rounded text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
        ¡Consultanos!
      </span>
    </a>
  );
}