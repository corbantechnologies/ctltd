"use client";

import "./globals.css";
import GrainOverlay from "@/components/landing/GrainOverlay";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import WhatsAppButton from "@/components/landing/WhatsAppButton";

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
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
