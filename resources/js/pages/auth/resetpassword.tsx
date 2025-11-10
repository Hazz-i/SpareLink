import { Head, Link, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { route } from "ziggy-js";

export default function ResetPassword({ token, email }: { token: string; email: string }) {
  const { data, setData, post, processing, errors } = useForm({
    token,
    email: email || "",
    password: "",
    password_confirmation: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("password.update"));
  };

  return (
    <AppLayout>
      <Head title="Buat Password Baru" />
      <section className="min-h-[80vh] flex items-center justify-center bg-neutral-950 px-6">
        <div className="bg-neutral-900 border border-neutral-700 rounded-2xl shadow-xl w-full max-w-md p-8">
          <h1 className="text-2xl font-bold text-orange-500 mb-2 text-center">Buat Password Baru</h1>

          <form onSubmit={submit} className="space-y-5">
            <input type="hidden" value={data.token} />
            <div>
              <label className="block text-sm text-gray-300 mb-1">Email</label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">Password Baru</label>
              <input
                type="password"
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
                className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">Konfirmasi Password</label>
              <input
                type="password"
                value={data.password_confirmation}
                onChange={(e) => setData("password_confirmation", e.target.value)}
                className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
            >
              {processing ? "Memproses..." : "Simpan Password"}
            </button>
          </form>

          <p className="text-gray-400 text-sm mt-6 text-center">
            Kembali ke{" "}
            <Link href={route("login")} className="text-orange-500 hover:text-orange-400">Masuk</Link>
          </p>
        </div>
      </section>
    </AppLayout>
  );
}
