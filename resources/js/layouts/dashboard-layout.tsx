import { Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  const { url } = usePage();
  const isActive = (path: string) => (url as string).startsWith(path);

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-900 border-r border-neutral-800 hidden md:flex md:flex-col">
        <div className="px-6 py-4 border-b border-neutral-800">
          <Link href="/" className="text-2xl font-extrabold text-orange-500">SpareLink</Link>
          <div className="text-xs text-gray-400">Admin Dashboard</div>
        </div>

        <nav className="p-3 space-y-1">
          <Link
            href="/dashboard"
            className={`block px-4 py-2 rounded-lg ${isActive('/dashboard') && !(url as string).includes('/spareparts') && !(url as string).includes('/settings')
              ? 'bg-orange-600 text-white' : 'hover:bg-neutral-800'}`}
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/spareparts"
            className={`block px-4 py-2 rounded-lg ${isActive('/dashboard/spareparts')
              ? 'bg-orange-600 text-white' : 'hover:bg-neutral-800'}`}
          >
            Sparepart
          </Link>
          <Link
            href="/dashboard/settings"
            className={`block px-4 py-2 rounded-lg ${isActive('/dashboard/settings')
              ? 'bg-orange-600 text-white' : 'hover:bg-neutral-800'}`}
          >
            Settings
          </Link>
        </nav>

        <form method="post" action={route('logout') as string} className="mt-auto p-3">
          {/* @ts-ignore – Inertia will hijack this with method spoofing in Blade root if using Link; simple form works too */}
          <input type="hidden" name="_token" value={(document.querySelector('meta[name="csrf-token]') as any)?.content} />
          <Link
            as="button"
            method="post"
            href={route('logout') as string}
            className="w-full text-left px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-red-400"
          >
            Logout
          </Link>
        </form>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-14 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between px-4 md:px-6">
          <div className="md:hidden">
            {/* bisa tambah drawer bila perlu */}
          </div>
          <div className="font-semibold">Dashboard</div>
          <div className="text-sm text-gray-400">Tema: <span className="text-orange-500">SpareLink</span></div>
        </header>

        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
