"use client";

import React, { createContext, useContext, useState } from 'react';
import { Product } from '@/lib/data';
import { checkCredentials } from '@/lib/vip-users';

interface CartItem extends Product {
  quantity: number;
}

interface ShopContextType {
  cart: CartItem[];
  isPro: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  activateProMode: (user: string, pass: string) => boolean;
  logout: () => void; // <--- Definido correctamente en la interfaz
  toggleCart: () => void;
  isCartOpen: boolean;
  total: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isPro, setIsPro] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Lógica de Login Blindado
  const activateProMode = (user: string, pass: string) => {
    const isValid = checkCredentials(user, pass);
    if (isValid) {
      setIsPro(true); // ¡Acceso concedido!
      return true;
    }
    return false; // Acceso denegado
  };

  // 👇 CORRECCIÓN: La función logout ahora abre y cierra correctamente
  const logout = () => {
    setIsPro(false);
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cart.reduce((acc, item) => {
    const price = isPro ? item.priceWholesale : item.priceRetail;
    return acc + price * item.quantity;
  }, 0);

  return (
    // 👇 IMPORTANTE: Agregamos 'logout' aquí abajo dentro de value
    <ShopContext.Provider value={{ cart, isPro, addToCart, removeFromCart, activateProMode, logout, toggleCart: () => setIsCartOpen(!isCartOpen), isCartOpen, total }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop debe usarse dentro de ShopProvider');
  return context;
};