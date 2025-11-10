import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import SpareAskWidget from '@/components/SpareAskWidget';

interface LandingProps {
  hero: { title: string; subtitle: string; ctaPrimary: string; ctaSecondary: string };
  features: { title: string; desc: string }[];
}

export default function Landing({ hero, features }: LandingProps) {
  return (
    <AppLayout>
      <Head title="Beranda" />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              {hero.title}
            </h1>
            <p className="mt-4 text-gray-400 text-lg">{hero.subtitle}</p>
            <div className="mt-8 flex gap-4">
              <Link
                href="/bengkel"
                className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
              >
                {hero.ctaPrimary}
              </Link>
              <Link
                href="/katalog"
                className="border border-orange-500 text-orange-400 px-6 py-3 rounded-lg font-semibold hover:bg-orange-600/10 transition"
              >
                {hero.ctaSecondary}
              </Link>
            </div>
          </div>

          <div className="hidden md:flex justify-center">
            <img
              src="/images/hero-motor.png"
              alt="Motor Illustration"
              className="w-[400px] drop-shadow-[0_0_25px_rgba(255,115,0,0.4)]"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-orange-500 text-center mb-12">
            Kenapa Pilih MotoLink?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-neutral-800 rounded-2xl border border-neutral-700 hover:border-orange-500 transition"
              >
                <div className="font-semibold text-lg text-white">{feature.title}</div>
                <p className="text-gray-400 mt-2 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-500 text-white text-center">
        <h3 className="text-3xl font-bold mb-3">Chat Langsung dengan Asisten Bengkel!</h3>
        <p className="text-orange-100 mb-8">Tanyakan suku cadang, booking servis, atau estimasi biaya langsung dari chatbot kami.</p>
        <Link
          href="/chatbot"
          className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-lg hover:bg-orange-100 transition"
        >
          Buka Chatbot
        </Link>
      </section>
      <SpareAskWidget />
    </AppLayout>
  );
}
