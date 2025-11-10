import { Link } from '@inertiajs/react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-neutral-900 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-orange-500 font-extrabold text-2xl tracking-tight">
          SpareLink
        </Link>

        <nav className="hidden md:flex space-x-8 text-sm font-medium">
          <Link href="/" className="hover:text-orange-400 transition">Beranda</Link>
          <Link href="/katalog" className="hover:text-orange-400 transition">Katalog</Link>
          <Link href="/bengkel" className="hover:text-orange-400 transition">Bengkel</Link>
          <Link href="/faq" className="hover:text-orange-400 transition">FAQ</Link>
        </nav>

        <div className="flex items-center space-x-3">
          <Link href="/login" className="text-gray-300 hover:text-orange-400 text-sm">Masuk</Link>
          <Link
            href="/register"
            className="bg-orange-500 text-sm text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
          >
            Daftar
          </Link>
        </div>
      </div>
    </header>
  );
}
