import { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import WhatsAppButton from "@/components/landing/WhatsAppButton";

export const metadata: Metadata = {
  title: {
    template: "%s | Corban Technologies LTD",
    default: "Corban Technologies LTD | Enterprise Software & Cloud Infrastructure",
  },
  description:
    "Mombasa & Nairobi enterprise technology partner. We build and cloud-host mission-critical core banking, SME accounting, omnichannel retail, marketing engines, and scalable enterprise software across East Africa.",
  keywords: [
    "Corban Technologies",
    "Corban Technologies LTD",
    "Enterprise Software Kenya",
    "SACCO Core Banking",
    "Manna Books Accounting",
    "eTIMS POS Kenya",
    "Cloud Infrastructure Mombasa",
    "M-Pesa Daraja Integration",
  ],
  authors: [{ name: "Corban Technologies LTD", url: "https://www.corbantechnologies.org" }],
  alternates: {
    canonical: "https://www.corbantechnologies.org",
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://www.corbantechnologies.org",
    title: "Corban Technologies LTD | Enterprise Software & Cloud Infrastructure",
    description:
      "Designing, engineering, and cloud-hosting world-class digital infrastructure that powers the future of finance, retail, and enterprise in East Africa.",
    siteName: "Corban Technologies LTD",
  },
  twitter: {
    card: "summary_large_image",
    title: "Corban Technologies LTD | Enterprise Software & Cloud Infrastructure",
    description:
      "Designing, engineering, and cloud-hosting world-class digital infrastructure that powers the future of finance, retail, and enterprise in East Africa.",
    creator: "@corbantechltd",
    site: "@corbantechltd",
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
      <WhatsAppButton />
    </>
  );
}
