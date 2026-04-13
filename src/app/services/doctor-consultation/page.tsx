import Link from "next/link";
import { CheckCircle2, Lock, ClipboardList, Repeat } from "lucide-react";

export default function DoctorConsultationService() {
  return (
    <div className="pt-16 bg-white min-h-screen">
      {/* Page Header */}
      <div className="bg-blue-50 border-b border-blue-100 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-textMuted mb-3">
            <Link href="/" className="hover:text-brand-navy">Home</Link>
            <span>/</span>
            <span className="text-textPrimary">Doctor Consultation</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            Doctors available now
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-navy">Talk to a Doctor Online</h1>
          <p className="mt-3 text-lg text-textSecondary max-w-xl">
            Consult experienced, verified doctors from the comfort of your home.
            Available via video or chat, anytime you need.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <ul className="space-y-4 mb-12">
            {[
              { icon: <CheckCircle2 className="w-6 h-6 text-brand-green" />, text: "Verified & experienced doctors" },
              { icon: <Lock className="w-6 h-6 text-brand-navy" />, text: "Secure video and chat sessions" },
              { icon: <ClipboardList className="w-6 h-6 text-blue-500" />, text: "Digital prescriptions sent instantly" },
              { icon: <Repeat className="w-6 h-6 text-brand-navy" />, text: "Follow-up care and support" },
            ].map((item) => (
              <li key={item.text} className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-border">
                <span className="text-xl">{item.icon}</span>
                <span className="text-textSecondary font-medium">{item.text}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold text-brand-navy mb-6">3 Simple Steps</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { step: "1", title: "Choose a Doctor", desc: "Browse by specialty and availability." },
              { step: "2", title: "Consult Online", desc: "Connect instantly through secure video or chat." },
              { step: "3", title: "Get Prescription", desc: "Receive your digital prescription immediately." },
            ].map((s) => (
              <div key={s.step} className="card p-5">
                <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold mb-3">
                  {s.step}
                </div>
                <h3 className="font-bold text-brand-navy">{s.title}</h3>
                <p className="text-sm text-textSecondary mt-1 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <Link
            href="/services/doctor-consultation/book"
            className="inline-flex items-center gap-2 mt-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            Book a Consultation
          </Link>
        </div>

        <div className="hidden lg:flex items-center justify-center">
          <div className="bg-blue-50 rounded-3xl p-12 w-full max-w-sm">
            <div className="bg-white rounded-2xl shadow-card p-8 text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <h3 className="font-bold text-brand-navy text-lg">Dr. is Online</h3>
              <p className="text-sm text-textMuted mt-1">Ready to consult now</p>
              <div className="mt-4 bg-green-50 text-brand-greenDark text-sm font-semibold px-4 py-2 rounded-full inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" /> Available Now
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}