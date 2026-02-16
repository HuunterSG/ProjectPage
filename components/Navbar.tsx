"use client";
import { useShop } from '@/context/ShopContext';
import { ShoppingCart, Menu, X, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

export default function Navbar() {
  const { cart, toggleCart, isPro, logout } = useShop();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuVars: Variants = {
    initial: { scaleY: 0 },
    animate: { scaleY: 1, transition: { duration: 0.5, ease: [0.12, 0, 0.39, 0] } },
    exit: { scaleY: 0, transition: { delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  const containerVars: Variants = {
    initial: { transition: { staggerChildren: 0.09, staggerDirection: -1 } },
    open: { transition: { delayChildren: 0.3, staggerChildren: 0.09, staggerDirection: 1 } },
  };

  const linkVars: Variants = {
    initial: { y: "30vh", transition: { duration: 0.5, ease: [0.37, 0, 0.63, 1] } },
    open: { y: 0, transition: { duration: 0.7, ease: [0, 0.55, 0.45, 1] } },
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 border-b border-transparent ${scrolled ? 'bg-black/80 backdrop-blur-md py-2 border-zinc-900' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO */}
        <Link href="/" className="relative z-50 group flex items-center gap-2">
          <div className="relative w-12 h-12 md:w-14 md:h-14 overflow-hidden rounded border border-transparent group-hover:border-red-600 transition-colors">
            <Image 
              src="/logo.png"      // Asegúrate de que el archivo se llame así en la carpeta public
              alt="EA Matrix" 
              fill                 // <--- ¡ESTO ES LO QUE FALTABA!
              className="object-contain" 
            />
          </div>
        </Link>

        {/* ACCIONES */}
        <div className="flex items-center gap-6 z-50">
          {/* Carrito */}
          <button onClick={toggleCart} className="relative group text-white hover:text-red-500 transition">
            <ShoppingCart className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
          
          {/* Menú Hamburguesa */}
          <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-red-500 transition focus:outline-none">
             {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* MENÚ DESPLEGABLE */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-black origin-top h-screen w-full z-40 flex flex-col justify-center items-center"
          >
            <motion.div
              variants={containerVars}
              initial="initial"
              animate="open"
              exit="initial"
              className="flex flex-col gap-6 text-center"
            >
              {[
                { name: "Inicio", href: "/" },
                { name: "Catálogo", href: "/catalogo" },
                { name: "Contacto", href: "https://wa.me/5492235568383" },
              ].map((link, index) => (
                <div key={index} className="overflow-hidden">
                  <motion.div variants={linkVars}>
                    <Link 
                      href={link.href} 
                      onClick={() => setIsOpen(false)}
                      className="text-4xl md:text-6xl font-black text-white tracking-tighter hover:text-red-600 transition-colors uppercase"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                </div>
              ))}

              {/* Botón Tallerista / Logout */}
              <div className="overflow-hidden pt-8 border-t border-zinc-900 w-full mt-4">
                <motion.div variants={linkVars}>
                  {isPro ? (
                    <button 
                      onClick={() => { logout(); setIsOpen(false); }}
                      className="flex items-center gap-2 text-red-500 text-xl font-bold mx-auto hover:text-red-400"
                    >
                      <LogOut size={24} /> Cerrar Sesión Pro
                    </button>
                  ) : (
                    <Link 
                      href="/talleristas" 
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 text-zinc-400 text-xl font-bold mx-auto hover:text-white"
                    >
                      <User size={24} /> Acceso Tallerista
                    </Link>
                  )}
                </motion.div>
              </div>
            </motion.div>
            
            <div className="absolute bottom-10 text-zinc-600 text-xs tracking-widest uppercase">
              Mar del Plata • Argentina
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}