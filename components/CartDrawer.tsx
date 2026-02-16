// Copiar en: /components/CartDrawer.tsx
"use client";
import { useShop } from '@/context/ShopContext';
import { X, Trash2, CreditCard } from 'lucide-react';

export default function CartDrawer() {
  const { isCartOpen, toggleCart, cart, removeFromCart, total, isPro } = useShop();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={toggleCart}></div>
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-zinc-950 border-l border-zinc-800 shadow-2xl flex flex-col">
        <div className="p-5 flex justify-between items-center border-b border-zinc-800">
          <h2 className="text-xl font-bold text-white">Carrito {isPro ? '(Mayorista)' : ''}</h2>
          <button onClick={toggleCart} className="text-zinc-400 hover:text-white"><X /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4 items-center bg-zinc-900/50 p-3 rounded-lg">
               <div className="w-16 h-16 bg-zinc-800 rounded bg-cover bg-center" style={{backgroundImage: `url(${item.image})`}}></div>
               <div className="flex-1">
                 <h4 className="text-white font-medium text-sm">{item.name}</h4>
                 <p className="text-yellow-400 font-bold">${(isPro ? item.priceWholesale : item.priceRetail).toLocaleString()}</p>
                 <span className="text-xs text-zinc-500">Cantidad: {item.quantity}</span>
               </div>
               <button onClick={() => removeFromCart(item.id)} className="text-red-500"><Trash2 size={18} /></button>
            </div>
          ))}
        </div>
        <div className="p-5 border-t border-zinc-800 bg-zinc-900">
          <div className="flex justify-between items-center mb-4 text-white text-lg font-bold">
            <span>Total:</span>
            <span>${total.toLocaleString()}</span>
          </div>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2">
            <CreditCard size={20} /> Pagar
          </button>
        </div>
      </div>
    </div>
  );
}