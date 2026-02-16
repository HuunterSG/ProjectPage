// Copiar en: /components/ProductCard.tsx
"use client";
import { Product } from '@/lib/data';
import { useShop } from '@/context/ShopContext';
import { ShoppingBag } from 'lucide-react';
import Image from 'next/image';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, isPro } = useShop();
  const currentPrice = isPro ? product.priceWholesale : product.priceRetail;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);
  };

  return (
    <div className="group bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-yellow-500/50 transition duration-300">
      <div className="relative aspect-square overflow-hidden bg-zinc-800">
        {isPro && (
           <div className="absolute top-2 left-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded z-10">
             PRECIO MAYORISTA
           </div>
        )}
        <Image 
          src={product.image} 
          alt={product.name} 
          fill
          className="object-cover group-hover:scale-105 transition duration-500"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white truncate">{product.name}</h3>
        <p className="text-zinc-400 text-sm mb-3">{product.category}</p>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col">
             {isPro && (
                <span className="text-xs text-zinc-500 line-through">
                  {formatPrice(product.priceRetail)}
                </span>
             )}
             <span className="text-xl font-bold text-yellow-400">
               {formatPrice(currentPrice)}
             </span>
          </div>
          
          <button 
            onClick={() => addToCart(product)}
            className="bg-white text-black p-2 rounded-full hover:bg-yellow-400 transition shadow-lg active:scale-95"
          >
            <ShoppingBag size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}