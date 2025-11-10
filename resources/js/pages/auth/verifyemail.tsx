import { Head, Link, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { route } from "ziggy-js";

export default function VerifyEmail() {
  const { post, processing } = useForm({});

  const resend = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("verification.send"));
  };

  return (
    <AppLayout>
      <Head title="Verifikasi Email" />
      <section className="min-h-[60vh] flex items-center justify-center bg-neutral-950 px-6">
        <div className="bg-neutral-900 border border-neutral-700 rounded-2xl shadow-xl w-full max-w-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-orange-500 mb-2">Verifikasi Email</h1>
          <p className="text-gray-400 mb-6">
            Kami telah mengirim tautan verifikasi ke email Anda. Jika belum menerima,
            klik tombol di bawah untuk kirim ulang.
          </p>

          <form onSubmit={resend}>
            <button
              type="submit"
              disabled={processing}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg transition"
            >
              {processing ? "Mengirim..." : "Kirim Ulang Email Verifikasi"}
            </button>
          </form>

          <p className="text-gray-400 text-sm mt-6">
            Salah email?{" "}
            <Link href={route("logout")} method="post" as="button" className="text-orange-500 hover:text-orange-400">
              Keluar
            </Link>
          </p>
        </div>
      </section>
    </AppLayout>
  );
}
