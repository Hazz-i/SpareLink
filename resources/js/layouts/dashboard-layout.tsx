import { Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import { PropsWithChildren } from "react";
import FlashMessage from "@/components/FlashMessage";

type FlashType = { message?: string; type?: "success" | "error" | "info" };

export default function DashboardLayout({ children }: PropsWithChildren) {
  const { url, props } = usePage();
  const flash = (props as any).flash as FlashType;

  const isActive = (path: string) => (url as string).startsWith(path);

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-900 border-r border-neutral-800 hidden md:flex md:flex-col">
        <div className="px-6 py-4 border-b border-neutral-800">
          <Link href="/" className="text-2xl font-extrabold text-orange-500">
            SpareLink
          </Link>
          <div className="text-xs text-gray-400">Admin Dashboard</div>
        </div>

        <nav className="p-3 space-y-1">
          <Link
            href="/dashboard"
            className={`block px-4 py-2 rounded-lg ${
              isActive("/dashboard") &&
              !(url as string).includes("/spareparts") &&
              !(url as string).includes("/settings")
                ? "bg-orange-600 text-white"
                : "hover:bg-neutral-800"
            }`}
          >
            Dashboard
          </Link>

          <Link
            href="/dashboard/spareparts"
            className={`block px-4 py-2 rounded-lg ${
              isActive("/dashboard/spareparts")
                ? "bg-orange-600 text-white"
                : "hover:bg-neutral-800"
            }`}
          >
            Sparepart
          </Link>

          <Link
            href="/dashboard/settings"
            className={`block px-4 py-2 rounded-lg ${
              isActive("/dashboard/settings")
                ? "bg-orange-600 text-white"
                : "hover:bg-neutral-800"
            }`}
          >
            Settings
          </Link>
        </nav>

        {/* Logout tombol langsung (Inertia akan handle method POST) */}
        <div className="mt-auto p-3">
          <Link
            as="button"
            method="post"
            href={route("logout") as string}
            className="w-full text-left px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-red-400"
          >
            Logout
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col relative">
        {/* Topbar */}
        <header className="h-14 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between px-4 md:px-6">
          <div className="font-semibold">Dashboard</div>
          <div className="text-sm text-gray-400">
            Tema: <span className="text-orange-500">SpareLink</span>
          </div>
        </header>

        <main className="p-4 md:p-6">{children}</main>

        <FlashMessage message={flash?.message} type={flash?.type ?? "success"} />
      </div>
    </div>
  );
}
