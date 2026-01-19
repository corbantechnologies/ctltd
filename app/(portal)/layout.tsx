import Navbar from "@/components/portal/Navbar";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#EFE5D9]">
      <Navbar />
      <main className="p-6">{children}</main>
      <footer className="text-center text-black/40 text-xs mt-12">
        <p>Copyright © {new Date().getFullYear()} Corban Technologies LTD. All rights reserved.</p>
      </footer>
    </div>
  );
}
