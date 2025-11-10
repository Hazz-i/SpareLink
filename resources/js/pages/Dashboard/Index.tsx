import DashboardLayout from "@/layouts/dashboard-layout";
import { Head } from "@inertiajs/react";

export default function Index({ stats, recent }: { stats: {label:string;value:number}[]; recent: {name:string;action:string;time:string}[] }) {
  return (
    <DashboardLayout>
      <Head title="Dashboard" />

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
            <div className="text-gray-400 text-sm">{s.label}</div>
            <div className="text-3xl font-extrabold text-white mt-2">{s.value}</div>
          </div>
        ))}
      </div>

      {/* 2 cols */}
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {/* Aktivitas */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
          <div className="font-semibold text-white mb-3">Aktivitas Terbaru</div>
          <ul className="space-y-3">
            {recent.map((r, i) => (
              <li key={i} className="flex items-center justify-between bg-neutral-800/60 rounded-lg px-3 py-2">
                <div>
                  <div className="text-white">{r.name}</div>
                  <div className="text-xs text-gray-400">{r.action}</div>
                </div>
                <div className="text-xs text-gray-500">{r.time}</div>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA cepat */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl p-6 text-white">
          <div className="text-xl font-bold">Tambahkan Sparepart Baru</div>
          <p className="text-orange-100 mt-2">Percepat manajemen katalog kamu.</p>
          <a href="/dashboard/spareparts" className="inline-block mt-4 bg-white text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-100">
            Buka List Sparepart
          </a>
        </div>
      </div>
    </DashboardLayout>
  );
}
