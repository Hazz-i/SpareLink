export default function Footer() {
  return (
    <footer className="bg-neutral-900 border-t border-neutral-800 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <h3 className="text-orange-500 font-bold text-lg">SpareLink</h3>
          <p className="text-gray-400 mt-3">
            Platform informasi bengkel & katalog sparepart dengan chatbot interaktif.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-orange-400">Navigasi</h4>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/" className="hover:text-orange-400">Beranda</a></li>
            <li><a href="/katalog" className="hover:text-orange-400">Katalog</a></li>
            <li><a href="/bengkel" className="hover:text-orange-400">Bengkel</a></li>
            <li><a href="/faq" className="hover:text-orange-400">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-orange-400">Hubungi Kami</h4>
          <p className="text-gray-400">support@sparelink.id</p>
          <p className="text-gray-400 mt-1">Jl. Mataram No. 21, Yogyakarta</p>
        </div>
      </div>

      <div className="text-center text-gray-500 text-xs mt-10">
        © {new Date().getFullYear()} SpareLink. All rights reserved.
      </div>
    </footer>
  );
}
