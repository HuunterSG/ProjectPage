// Copiar en: /app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ShopProvider } from "@/context/ShopContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import { WhatsAppBtn } from "@/components/WhatsAppBtn";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jarvis Detailing",
  description: "Productos Premium",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-black text-white antialiased">
        <ShopProvider>
          <Navbar />
          <CartDrawer />
          <main className="min-h-screen">
             {children}
          </main>
          <WhatsAppBtn /> {/* <--- Agregado */}
          <Footer />      {/* <--- Agregado */}
        </ShopProvider>
      </body>
    </html>
  );
}