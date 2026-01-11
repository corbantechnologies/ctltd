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
    </div>
  );
}
