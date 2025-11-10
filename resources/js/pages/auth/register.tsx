import { Head, Link, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { route } from "ziggy-js";

export default function Register() {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("register"));
  };

  return (
    <AppLayout>
      <Head title="Daftar" />
      <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 px-6">
        <div className="bg-neutral-900 border border-neutral-700 rounded-2xl shadow-xl w-full max-w-md p-8">
          <h1 className="text-3xl font-bold text-orange-500 mb-2 text-center">Daftar</h1>
          <p className="text-gray-400 text-center mb-8">Buat akun baru dan nikmati fitur SpareLink</p>

          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Nama</label>
              <input
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="Nama lengkap"
                required
              />
              {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">Email</label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="email@domain.com"
                required
              />
              {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">Password</label>
              <input
                type="password"
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
                className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="••••••••"
                required
              />
              {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">Konfirmasi Password</label>
              <input
                type="password"
                value={data.password_confirmation}
                onChange={(e) => setData("password_confirmation", e.target.value)}
                className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
            >
              {processing ? "Memproses..." : "Daftar"}
            </button>
          </form>

          <p className="text-gray-400 text-sm mt-6 text-center">
            Sudah punya akun?{" "}
            <Link href={route("login")} className="text-orange-500 hover:text-orange-400 font-medium">
              Masuk
            </Link>
          </p>
        </div>
      </section>
    </AppLayout>
  );
}
