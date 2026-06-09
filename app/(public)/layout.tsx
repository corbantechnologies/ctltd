import { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import WhatsAppButton from "@/components/landing/WhatsAppButton";

export const metadata: Metadata = {
  title: {
    template: "%s | Corban Technologies LTD",
    default: "Corban Technologies LTD | Future-Proof Digital Infrastructure",
  },
  description: "Mombasa's leading tech partner. We build the foundational infrastructure for modern financial operations, cloud systems, and scalable enterprise software across East Africa.",
  keywords: ["FinTech", "Cloud Infrastructure", "Enterprise Software", "Mombasa", "Kenya", "Digital Transformation", "SACCO Core Banking"],
  authors: [{ name: "Corban Technologies LTD" }],
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://corbantechnologies.org",
    title: "Corban Technologies LTD | Future-Proof Digital Infrastructure",
    description: "Designing and deploying world-class digital infrastructure that powers the future of finance and enterprise in East Africa.",
    siteName: "Corban Technologies LTD",
  },
  twitter: {
    card: "summary_large_image",
    title: "Corban Technologies LTD | Future-Proof Digital Infrastructure",
    description: "Designing and deploying world-class digital infrastructure that powers the future of finance and enterprise in East Africa.",
    creator: "@corbantechltd",
  },
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="w-full min-h-screen">
        {children}
      </main>
      <Footer />
      {/* <WhatsAppButton /> */}
    </>
  );
}
