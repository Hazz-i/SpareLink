import DashboardLayout from "@/layouts/dashboard-layout";
import { Head, useForm } from "@inertiajs/react";
import { useMemo, useState } from "react";

type Item = { id:number; name:string; brand:string; price:number; stock:number };

export default function Spareparts({ items }: { items: Item[] }) {
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () => items.filter(i =>
      i.name.toLowerCase().includes(q.toLowerCase()) ||
      i.brand.toLowerCase().includes(q.toLowerCase())
    ),
    [q, items]
  );

  return (
    <DashboardLayout>
      <Head title="Sparepart" />
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Daftar Sparepart</h1>
        <input
          value={q}
          onChange={e=>setQ(e.target.value)}
          placeholder="Cari nama/brand..."
          className="px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-neutral-800">
        <table className="w-full text-sm">
          <thead className="bg-neutral-900 text-gray-400">
            <tr>
              <th className="text-left p-3">Nama</th>
              <th className="text-left p-3">Brand</th>
              <th className="text-right p-3">Harga</th>
              <th className="text-right p-3">Stok</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800 bg-neutral-950">
            {filtered.map((it) => (
              <tr key={it.id} className="hover:bg-neutral-900/60">
                <td className="p-3 text-white">{it.name}</td>
                <td className="p-3 text-gray-300">{it.brand}</td>
                <td className="p-3 text-right text-gray-200">
                  Rp {it.price.toLocaleString('id-ID')}
                </td>
                <td className="p-3 text-right">
                  <span className={`px-2 py-1 rounded-md text-xs ${it.stock <= 5 ? 'bg-red-500/20 text-red-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                    {it.stock}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <a href="#" className="text-orange-400 hover:text-orange-300">Ubah</a>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="p-6 text-center text-gray-400">Tidak ada data.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
