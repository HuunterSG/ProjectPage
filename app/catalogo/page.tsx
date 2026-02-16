"use client";
import { getProducts, Product } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { useShop } from '@/context/ShopContext';
import { useState, useEffect } from 'react';

export default function CatalogoPage() {
  const { isPro } = useShop();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      // 1. Buscamos los productos reales en Supabase
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    }
    load();
  }, []);

  // 2. Filtramos según el rol
  const visibleProducts = products.filter(p => isPro ? true : !p.isProOnly);

  return (
    <div className="bg-black min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 border-l-4 border-red-600 pl-4">
          Catálogo Completo
        </h1>
        
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {visibleProducts.length > 0 ? (
              visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-zinc-500">No hay productos disponibles por ahora.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}