import { Head, Link, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { route } from "ziggy-js";

export default function ForgotPassword() {
  const { data, setData, post, processing, errors } = useForm({ email: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("password.email"));
  };

  return (
    <AppLayout>
      <Head title="Lupa Password" />
      <section className="min-h-[80vh] flex items-center justify-center bg-neutral-950 px-6">
        <div className="bg-neutral-900 border border-neutral-700 rounded-2xl shadow-xl w-full max-w-md p-8">
          <h1 className="text-2xl font-bold text-orange-500 mb-2 text-center">Reset Password</h1>
          <p className="text-gray-400 text-center mb-6">Masukkan email untuk menerima tautan reset.</p>

          <form onSubmit={submit} className="space-y-5">
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

            <button
              type="submit"
              disabled={processing}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
            >
              {processing ? "Mengirim..." : "Kirim Link Reset"}
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
