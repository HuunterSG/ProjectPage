import { supabase } from './supabase';

export interface Product {
  id: string;
  name: string;
  description: string;
  priceRetail: number;    // En DB se llama price_retail
  priceWholesale: number; // En DB se llama price_wholesale
  image: string;
  category: string;
  isProOnly?: boolean;    // En DB se llama is_pro_only
}

// Función para traer productos REALES
export async function getProducts() {
  console.log("📡 Intentando conectar a Supabase...");

  const { data, error } = await supabase
    .from('products')
    .select('*');

  if (error) {
    console.error("❌ ERROR CRÍTICO DE SUPABASE:", error.message);
    console.error("Detalles:", error);
    return [];
  }

  console.log("✅ Conexión exitosa. Productos encontrados:", data?.length);
  
  if (!data || data.length === 0) {
    console.warn("⚠️ Conectó bien, pero la tabla está vacía o bloqueada por RLS.");
  }

  return data.map((p: any) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    priceRetail: p.price_retail,
    priceWholesale: p.price_wholesale,
    image: p.image_url || p.image, // Por si acaso usaste uno u otro nombre
    category: p.category,
    isProOnly: p.is_pro_only
  }));
}