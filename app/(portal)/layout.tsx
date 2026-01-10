import Navbar from "@/components/portal/Navbar";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="p-6">{children}</main>
    </div>
  );
}
