import Link from "next/link";

export default function EmergencyHospitalService() {
  return (
    <div className="pt-16 bg-white min-h-screen">
      {/* Page Header */}
      <div className="bg-red-50 border-b border-red-100 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-textMuted mb-3">
            <Link href="/" className="hover:text-brand-navy">Home</Link>
            <span>/</span>
            <span className="text-textPrimary">Emergency Hospitals</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-emergencyLight text-emergency text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <span className="w-2 h-2 bg-emergency rounded-full animate-pulse" />
            24/7 Emergency Service
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-navy">Emergency Hospital Routing</h1>
          <p className="mt-3 text-lg text-textSecondary max-w-xl">
            We find the nearest hospital with a confirmed available bed and get your ambulance there — all before you arrive.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          {/* How it works */}
          <h2 className="text-2xl font-bold text-brand-navy mb-6">How Emergency Routing Works</h2>
          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "Trigger an SOS",
                desc: "Press the Emergency Help button or call 108. We get your location immediately.",
              },
              {
                step: "2",
                title: "Ambulance Dispatched",
                desc: "The nearest available ambulance is notified with your live GPS location.",
              },
              {
                step: "3",
                title: "Hospital Confirmed",
                desc: "We call ahead to confirm a bed is available so there are no delays on arrival.",
              },
            ].map((s) => (
              <div key={s.step} className="card p-6 flex items-start gap-4">
                <div className="w-10 h-10 bg-emergencyLight text-emergency rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {s.step}
                </div>
                <div>
                  <h3 className="font-bold text-brand-navy">{s.title}</h3>
                  <p className="text-sm text-textSecondary mt-1 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/emergency"
            className="inline-flex items-center gap-2 mt-10 btn-emergency text-base px-8 py-4"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            Get Emergency Help Now
          </Link>
        </div>

        <div className="hidden lg:flex items-center justify-center">
          <div className="bg-red-50 rounded-3xl p-14 w-full max-w-sm flex items-center justify-center">
            <div className="w-36 h-36 bg-emergency rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}