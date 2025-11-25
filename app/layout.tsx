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
          Corban Technologies LTD | FinTech & Digital Infrastructure
        </title>
        <meta
          name="description"
          content="Secure SACCO platforms, enterprise cloud, cybersecurity, and AI solutions for East Africa."
        />
      </head>
      <body className="min-h-screen bg-[#0F172A] text-white antialiased">
        <GrainOverlay />
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
