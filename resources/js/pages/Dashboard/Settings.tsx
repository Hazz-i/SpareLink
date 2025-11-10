import DashboardLayout from "@/layouts/dashboard-layout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { route } from "ziggy-js";

export default function Settings({ user }: { user: any }) {
  const { data, setData, post, processing, errors, wasSuccessful, reset } = useForm({
    name: user?.name ?? "",
    email: user?.email ?? "",
    password: "",
  });

  const [showPwd, setShowPwd] = useState(false);

  useEffect(() => {
    if (wasSuccessful) {
      reset("password");
      setShowPwd(false);
    }
  }, [wasSuccessful, reset]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    post("/dashboard/settings", { preserveScroll: true });
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
                onChange={(e) => setData("name", e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 focus:ring-2 focus:ring-orange-500 outline-none"
              />
              {errors.name && <div className="text-red-400 text-sm mt-1">{errors.name}</div>}
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">Email</label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 focus:ring-2 focus:ring-orange-500 outline-none"
              />
              {errors.email && <div className="text-red-400 text-sm mt-1">{errors.email}</div>}
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Password Baru <span className="text-gray-500">(opsional)</span>
              </label>

              {/* input + toggle eye */}
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  value={data.password}
                  onChange={(e) => setData("password", e.target.value)}
                  className="w-full pr-12 px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Minimal 8 karakter"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute inset-y-0 right-0 px-3 grid place-items-center text-gray-400 hover:text-gray-200"
                  aria-label={showPwd ? "Sembunyikan password" : "Tampilkan password"}
                  title={showPwd ? "Sembunyikan" : "Tampilkan"}
                >
                  {showPwd ? (
                    // eye-off
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.58 10.58a2 2 0 102.84 2.84" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.68 16.68A9.5 9.5 0 013 12s2.5-6.5 9-6.5a8.5 8.5 0 015.5 2" />
                    </svg>
                  ) : (
                    // eye
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>

              {errors.password && <div className="text-red-400 text-sm mt-1">{errors.password}</div>}
            </div>

            <button
              type="submit"
              disabled={processing}
              className="bg-orange-600 hover:bg-orange-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-5 py-2 rounded-lg"
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
            href={route("logout") as string}
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
