"use client";
import { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { useRouter } from 'next/navigation';
import { Lock, User, Key, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TalleristasPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { activateProMode, isPro } = useShop();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activateProMode(username, password)) {
      router.push('/'); // Éxito: Vamos al catálogo
    } else {
      setError('Credenciales incorrectas. Acceso denegado.');
      // Efecto de vibración en el error (opcional)
    }
  };

  // Si ya está logueado, mostrar panel de bienvenida
  if (isPro) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          className="bg-zinc-900 border border-red-900/50 p-8 rounded-3xl w-full max-w-sm"
        >
          <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(220,38,38,0.4)]">
            <ShieldCheck className="text-white w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Acceso VIP Activo</h1>
          <p className="text-zinc-400 mb-8 text-sm">
            Bienvenido al área de profesionales de EA Matrix. Los precios mayoristas están habilitados.
          </p>
          <button 
            onClick={() => router.push('/catalogo')} 
            className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-200 transition"
          >
            Ir al Catálogo <ArrowRight size={20} />
          </button>
        </motion.div>
      </div>
    );
  }

  // Formulario de Login
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      
      {/* Fondo decorativo sutil */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-red-600/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-900 rounded-2xl mb-6 border border-zinc-800">
            <Lock className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">EA MATRIX <span className="text-red-600">PRO</span></h1>
          <p className="text-zinc-500 text-sm">
            Área exclusiva para talleristas autorizados.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Input Usuario */}
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-500 transition">
              <User size={20} />
            </div>
            <input
              type="text"
              placeholder="Usuario Asignado"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-red-600 focus:bg-zinc-900 transition placeholder:text-zinc-600 text-lg"
            />
          </div>

          {/* Input Contraseña */}
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-500 transition">
              <Key size={20} />
            </div>
            <input
              type="password"
              placeholder="Contraseña de Acceso"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-red-600 focus:bg-zinc-900 transition placeholder:text-zinc-600 text-lg"
            />
          </div>
          
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-red-900/20 border border-red-900/50 rounded-lg p-3"
            >
              <p className="text-red-500 text-sm text-center font-medium">{error}</p>
            </motion.div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-red-900/20 hover:opacity-90 active:scale-[0.98] transition-all mt-4"
          >
            Ingresar al Portal
          </button>
        </form>

        <p className="mt-8 text-center text-zinc-600 text-xs">
          ¿No tienes credenciales? <br />
          Contacta a administración para solicitar tu alta.
        </p>
      </motion.div>
    </div>
  );
}