import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Enterprise Onboarding | Corban Technologies LTD",
  description:
    "Get in touch with Corban Technologies LTD in Mombasa & Nairobi. Inquire about SACCO core banking deployments, SME accounting setup, retail POS, or telecom marketing engines.",
  alternates: {
    canonical: "https://www.corbantechnologies.org/contact",
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://www.corbantechnologies.org/contact",
    title: "Contact & Enterprise Onboarding | Corban Technologies LTD",
    description:
      "Get in touch with Corban Technologies LTD in Mombasa & Nairobi. Inquire about SACCO core banking deployments, SME accounting setup, retail POS, or telecom marketing engines.",
    siteName: "Corban Technologies LTD",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact & Enterprise Onboarding | Corban Technologies LTD",
    description:
      "Get in touch with Corban Technologies LTD in Mombasa & Nairobi for enterprise software deployment.",
    creator: "@corbantechltd",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
