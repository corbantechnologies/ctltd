import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] border-t border-slate-800 py-16 mt-32">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-2xl font-bold">
            Corban<span className="text-teal-500">.</span>
          </h3>
          <p className="text-slate-400 mt-4">
            Digital infrastructure for East Africa’s financial future.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <Link href="/about" className="hover:text-teal-500">
                About
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-teal-500">
                Careers
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <Link href="/sacco-platform" className="hover:text-teal-500">
                SACCO Platform
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-teal-500">
                All Services
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <p className="text-slate-400">Mombasa, Kenya</p>
          <p className="text-teal-500 font-medium">+254 710 584581</p>
          <p className="text-slate-400">info@corbantechnologies.org</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} Corban Technologies LTD. All rights
        reserved.
      </div>
    </footer>
  );
}
