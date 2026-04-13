import Link from "next/link";
import { Lock, CheckCircle2, MapPin, AlertTriangle, Pill, Cross, Syringe, Stethoscope } from "lucide-react";

export default function MedicineDeliveryPage() {
  return (
    <div className="pt-16 bg-white min-h-screen">
      {/* Page Header */}
      <div className="bg-surface border-b border-border py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-textMuted mb-3">
            <Link href="/" className="hover:text-brand-navy">Home</Link>
            <span>/</span>
            <span className="text-textPrimary">Medicine Delivery</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-brand-greenLight text-brand-greenDark text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <span className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
            Delivered in 30 minutes
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-navy">Medicine at Your Door</h1>
          <p className="mt-3 text-lg text-textSecondary max-w-xl">
            Order from licensed pharmacies and get genuine medicines delivered fast. Upload your prescription or browse our online store.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          {/* Benefits */}
          <ul className="space-y-4">
            {[
              { icon: <Lock className="w-6 h-6 text-brand-navy" />, text: "Upload prescription securely" },
              { icon: <CheckCircle2 className="w-6 h-6 text-brand-green" />, text: "Medicines from verified, licensed pharmacies" },
              { icon: <MapPin className="w-6 h-6 text-blue-500" />, text: "Real-time order tracking to your door" },
              { icon: <AlertTriangle className="w-6 h-6 text-emergency" />, text: "Priority delivery for emergency medicines" },
            ].map((item) => (
              <li key={item.text} className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-border">
                <span className="text-xl">{item.icon}</span>
                <span className="text-textSecondary font-medium">{item.text}</span>
              </li>
            ))}
          </ul>

          {/* How it works */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-brand-navy mb-6">How It Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { step: "1", title: "Upload", desc: "Send us your doctor's prescription securely." },
                { step: "2", title: "Verify", desc: "A licensed pharmacy confirms and prepares your order." },
                { step: "3", title: "Delivered", desc: "Your medicines arrive within 30 minutes." },
              ].map((s) => (
                <div key={s.step} className="card p-5">
                  <div className="w-8 h-8 bg-brand-greenLight text-brand-greenDark rounded-full flex items-center justify-center text-sm font-bold mb-3">
                    {s.step}
                  </div>
                  <h3 className="font-bold text-brand-navy">{s.title}</h3>
                  <p className="text-sm text-textSecondary mt-1 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/services/medicine-delivery/order"
            className="inline-flex items-center gap-2 mt-10 btn-primary text-base px-8 py-4"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            Order Medicines Now
          </Link>
        </div>

        {/* Right illustration */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="bg-brand-greenLight rounded-3xl p-12 w-full max-w-sm">
            <div className="grid grid-cols-2 gap-4">
              {[
                { emoji: <Pill className="w-8 h-8 text-brand-green" />, label: "Medicines" },
                { emoji: <Cross className="w-8 h-8 text-emergency" />, label: "First Aid" },
                { emoji: <Syringe className="w-8 h-8 text-blue-500" />, label: "Injections" },
                { emoji: <Stethoscope className="w-8 h-8 text-brand-navy" />, label: "Equipment" },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-2xl p-6 flex flex-col items-center gap-2 shadow-card">
                  <span className="text-3xl">{item.emoji}</span>
                  <span className="text-sm font-semibold text-brand-navy">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}