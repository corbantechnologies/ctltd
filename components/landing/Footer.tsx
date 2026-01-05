import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-corporate-secondary border-t border-slate-200 pt-24 pb-12 overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-corporate-primary to-transparent opacity-30"></div>

      <div className="mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        {/* Company Info */}
        <div className="space-y-6">
          <Link
            href="/"
            className="inline-block transition-transform hover:scale-105"
          >
            <Image
              src="/logo.png"
              alt="Corban Technologies Logo"
              width={160}
              height={40}
              className="h-9 w-auto object-contain"
            />
          </Link>
          <p className="text-black text-sm leading-relaxed max-w-xs font-bold">
            Designing and deploying world-class digital infrastructure that
            powers the future of finance and enterprise in East Africa.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://x.com/corbantechltd"
              className="p-2.5 rounded-full bg-white border border-slate-200 text-black hover:bg-corporate-primary hover:text-white hover:border-corporate-primary transition-all shadow-md"
            >
              <Twitter className="w-4 h-4" />
            </a>

            <a
              href="https://github.com/corbantechnologies"
              className="p-2.5 rounded-full bg-white border border-slate-200 text-black hover:bg-corporate-primary hover:text-white hover:border-corporate-primary transition-all shadow-md"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-black font-black mb-6 tracking-widest uppercase text-xs">
            Company
          </h4>
          <ul className="space-y-4">
            {["Products", "Offers", "Contact", "About"].map((item) => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="text-black hover:text-corporate-primary text-sm font-black transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Solutions */}
        <div>
          <h4 className="text-black font-black mb-6 tracking-widest uppercase text-xs">
            Solutions
          </h4>
          <ul className="space-y-4">
            {[
              { name: "SACCO Platform", href: "/products/sacco-platform" },
              { name: "Web & Mobile Dev", href: "/services" },
              { name: "Cloud Infrastructure", href: "/services" },
              { name: "Cybersecurity", href: "/services" },
            ].map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-black hover:text-corporate-primary text-sm font-black transition-colors"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h4 className="text-black font-black mb-6 tracking-widest uppercase text-xs">
            Office
          </h4>
          <div className="space-y-4">
            <div className="flex items-start gap-4 text-black group">
              <MapPin className="w-5 h-5 text-corporate-primary shrink-0 group-hover:scale-110 transition-transform" />
              <div className="text-sm">
                <p className="font-extrabold text-black">
                  Corban Innovation Hub
                </p>
                <p className="font-bold">Mombasa, Kenya</p>
                <p className="text-xs font-bold opacity-60 uppercase">
                  P.O. Box 10541-80101
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-black group">
              <Mail className="w-5 h-5 text-corporate-primary shrink-0 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-black">info@corbantechnologies.org</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto px-6 mt-20 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 text-black">
        <p className="text-xs font-black">
          © {currentYear} Corban Technologies LTD. All rights reserved.
        </p>
        <div className="flex items-center gap-8">
          <a
            href="/privacy"
            className="hover:text-corporate-primary text-xs font-black transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="hover:text-corporate-primary text-xs font-black transition-colors"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
