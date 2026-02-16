"use client";
import { getProducts, Product } from '@/lib/data'; // Importa la nueva función
import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { useShop } from '@/context/ShopContext';
import { motion } from 'framer-motion';
import { ArrowRight, Star, ShieldCheck, Truck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const { isPro } = useShop();
  const [products, setProducts] = useState<Product[]>([]); // Estado para guardar productos

  // Cargar productos al iniciar
  useEffect(() => {
    async function load() {
      const data = await getProducts();
      setProducts(data);
    }
    load();
  }, []);

  // Solo mostramos los primeros 4 productos como "Destacados"
  const featuredProducts = products.filter(p => isPro ? true : !p.isProOnly).slice(0, 4);
  return (
    <div className="bg-black">
      
      {/* HERO SECTION */}
      <section className="relative h-[90vh] w-full flex items-center overflow-hidden">
        {/* Fondo con Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10"></div>
          <Image 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920" 
            alt="Hero Background" 
            fill 
            className="object-cover animate-slow-zoom opacity-60"
          />
        </div>

        {/* Contenido Hero */}
        <div className="relative z-20 container mx-auto px-6 md:px-12 flex flex-col justify-center h-full">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-red-600 font-bold tracking-[0.3em] text-sm md:text-base mb-4 block">
              ESTÉTICA AUTOMOTRIZ PROFESIONAL
            </span>
            <h1 className="text-5xl md:text-8xl font-black text-white leading-none mb-6 italic">
              EA <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900">MATRIX</span>
            </h1>
            <p className="text-zinc-300 text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
              Suministros de detailing de alto rendimiento para quienes buscan la perfección en cada reflejo.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4">
              <Link href="/catalogo" className="bg-red-600 text-white px-8 py-4 rounded font-bold hover:bg-red-700 transition flex items-center justify-center gap-2">
                Ver Catálogo Completo <ArrowRight size={20} />
              </Link>
              <Link href="/talleristas" className="border border-white/30 text-white px-8 py-4 rounded font-bold hover:bg-white/10 transition text-center">
                Soy Tallerista
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECCIÓN SOBRE NOSOTROS (Visible en Desktop y Mobile) */}
      <section className="py-24 bg-zinc-950">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center gap-16">
            {/* Texto */}
            <div className="flex-1">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Más que productos, <span className="text-red-600">pasión por el detalle.</span></h2>
              <p className="text-zinc-400 mb-6 text-lg leading-relaxed">
                En <strong>EA Matrix</strong>, entendemos que el detailing no es solo lavar un auto; es un arte. Nacimos en Mar del Plata con la misión de proveer a los profesionales y entusiastas las herramientas más avanzadas del mercado.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-white font-medium">
                  <ShieldCheck className="text-red-600" /> Garantía de calidad oficial
                </li>
                <li className="flex items-center gap-3 text-white font-medium">
                  <Truck className="text-red-600" /> Envíos a todo el país
                </li>
                <li className="flex items-center gap-3 text-white font-medium">
                  <Star className="text-red-600" /> Asesoramiento técnico especializado
                </li>
              </ul>
            </div>
            {/* Imagen Ilustrativa */}
            <div className="flex-1 w-full h-[400px] relative rounded-2xl overflow-hidden shadow-2xl border border-zinc-800">
               <Image 
                 src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=800" 
                 alt="Detailing Process" 
                 fill 
                 className="object-cover hover:scale-105 transition duration-700"
               />
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN PRODUCTOS DESTACADOS */}
      <section className="py-24 px-6 md:px-12 bg-black">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-12">
             <div>
               <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Más Vendidos</h2>
               <div className="h-1 w-20 bg-red-600"></div>
             </div>
             <Link href="/catalogo" className="hidden md:flex items-center gap-2 text-red-500 hover:text-red-400 font-bold transition">
               Ver todos los productos <ArrowRight size={18} />
             </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
             <Link href="/catalogo" className="inline-block border border-zinc-700 text-white px-6 py-3 rounded-full hover:bg-zinc-900 transition">
               Ver Catálogo Completo
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
}