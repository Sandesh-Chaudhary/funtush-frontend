/**
 * Trekker Layout
 */
import { TrekkerTopbar } from "@/components/trekker/layout/trekkers";


export default function TrekkerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
   return (
    <div className="flex min-h-screen flex-col bg-neutral-50">

      {/* ── Top Navigation ── */}
      <TrekkerTopbar />

      {/* ── Main Content Area ── */}
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

    </div>
  );
}
