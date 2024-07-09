import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alvadorn PS",
  description: "Aplicativo desenvolvido para o processo seletivo da empresa Alvadorn Consultoria feito por Agustin Castillo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="p-10 min-h-screen">
        {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
