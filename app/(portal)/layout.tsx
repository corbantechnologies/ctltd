import Navbar from "@/components/portal/Navbar";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="p-6 flex-1">{children}</main>
      <footer className="text-center text-black/40 text-xs mt-12 pb-6">
        <p>Copyright © {new Date().getFullYear()} Corban Technologies LTD. All rights reserved.</p>
      </footer>
    </div>
  );
}
