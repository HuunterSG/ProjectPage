import { Mail, MapPin, Instagram, Phone } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        
        {/* Columna 1: Marca */}
        <div>
          <h3 className="text-2xl font-black text-white mb-4 italic tracking-tighter">
            EA<span className="text-red-600">MATRIX</span>
          </h3>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
            Especialistas en estética vehicular. Proveemos los mejores insumos para que logres acabados de exhibición.
          </p>
        </div>

        {/* Columna 2: Enlaces Rápidos */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Navegación</h4>
          <ul className="space-y-3 text-zinc-400 text-sm">
            <li><Link href="/" className="hover:text-red-500 transition">Inicio</Link></li>
            <li><Link href="/catalogo" className="hover:text-red-500 transition">Catálogo Completo</Link></li>
            <li><Link href="/talleristas" className="hover:text-red-500 transition">Acceso Tallerista</Link></li>
          </ul>
        </div>

        {/* Columna 3: Contacto */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contacto</h4>
          <ul className="space-y-4 text-zinc-400 text-sm">
            <li className="flex items-center gap-3">
              <MapPin className="text-red-600" size={18} />
              <span>Mar del Plata, Buenos Aires</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-red-600" size={18} />
              <span>+54 9 223 556-8383</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-red-600" size={18} />
              <span>contacto@eamatrix.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center border-t border-zinc-900 pt-8 text-zinc-600 text-xs">
        © 2026 EA Matrix Detailing Supply. Todos los derechos reservados.
      </div>
    </footer>
  );
}