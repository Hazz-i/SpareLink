import DashboardLayout from "@/layouts/dashboard-layout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { route } from "ziggy-js";

export default function Settings({ user }: { user: any }) {
  const { data, setData, post, processing, errors, wasSuccessful } = useForm({
    name: user?.name ?? "",
    email: user?.email ?? "",
    password: "",
  });

  useEffect(() => {
    if (wasSuccessful) {
      alert("Pengaturan akun disimpan.");
    }
  }, [wasSuccessful]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    post("/dashboard/settings");
  }

  return (
    <DashboardLayout>
      <Head title="Settings" />
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-lg font-semibold mb-4">Pengaturan Akun</div>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Nama</label>
              <input
                value={data.name}
                onChange={(e)=>setData('name', e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 focus:ring-2 focus:ring-orange-500 outline-none"
              />
              {errors.name && <div className="text-red-400 text-sm mt-1">{errors.name}</div>}
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Email</label>
              <input
                type="email"
                value={data.email}
                onChange={(e)=>setData('email', e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 focus:ring-2 focus:ring-orange-500 outline-none"
              />
              {errors.email && <div className="text-red-400 text-sm mt-1">{errors.email}</div>}
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Password Baru <span className="text-gray-500">(opsional)</span>
              </label>
              <input
                type="password"
                value={data.password}
                onChange={(e)=>setData('password', e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="Minimal 8 karakter"
              />
              {errors.password && <div className="text-red-400 text-sm mt-1">{errors.password}</div>}
            </div>

            <button
              type="submit"
              disabled={processing}
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-5 py-2 rounded-lg"
            >
              {processing ? "Menyimpan..." : "Simpan"}
            </button>
          </form>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-lg font-semibold mb-4">Keluar</div>
          <p className="text-gray-400 mb-4">
            Klik tombol di bawah untuk keluar dari dashboard.
          </p>

          <Link
            href={route('logout') as string}
            method="post"
            as="button"
            className="bg-neutral-800 hover:bg-neutral-700 text-red-400 font-semibold px-5 py-2 rounded-lg"
          >
            Logout
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
