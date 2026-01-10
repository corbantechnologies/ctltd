"use client";

import "./globals.css";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import WhatsAppButton from "@/components/landing/WhatsAppButton";
import NextAuthProvider from "@/providers/NextAuthProvider";
import TanstackQueryProvider from "@/providers/TanstackQueryProvider";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <title>
          Corban Technologies LTD | Technology Solutions – Mombasa, Kenya
        </title>
        <meta
          name="description"
          content="SACCO platforms, cloud, cybersecurity, IoT, AI, web & mobile development — full-stack technology partner based in Mombasa, Kenya."
        />
      </head>
      <body className="min-h-screen selection:bg-corporate-primary selection:text-white antialiased">
        <Toaster position="top-center" />
        <NextAuthProvider>
          <TanstackQueryProvider>
            <Navbar />
            <main className="relative">{children}</main>
            <Footer />
            <WhatsAppButton />
          </TanstackQueryProvider>
        </NextAuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
