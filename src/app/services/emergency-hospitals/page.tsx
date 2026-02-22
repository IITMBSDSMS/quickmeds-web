export default function EmergencyHospitalService() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-green-50 px-6 py-28">
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Emergency Hospital Coordination
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            QuickMeds ensures patients reach the right hospital with confirmed bed
            availability during critical emergencies.
          </p>

          {/* How it works */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-lg">1. Trigger Emergency</h3>
              <p className="mt-2 text-gray-600">
                Press the phone power button 3 times or tap Emergency Help.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-lg">2. Ambulance Dispatch</h3>
              <p className="mt-2 text-gray-600">
                Nearby ambulances are notified instantly with your live location.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-lg">3. Hospital Coordination</h3>
              <p className="mt-2 text-gray-600">
                We confirm bed availability and route you to the right hospital.
              </p>
            </div>
          </div>

          {/* CTA */}
          <a
            href="/emergency"
            className="inline-flex mt-12 items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-full text-lg font-semibold"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4" />
              <path d="M12 16h.01" />
            </svg>
            Get Emergency Help Now
          </a>
        </div>
        <div className="hidden lg:flex items-center justify-center">
          <div className="rounded-3xl bg-red-100 p-16">
            <svg width="180" height="180" viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="60" stroke="#ef4444" strokeWidth="10" />
              <path d="M100 60v80" stroke="#ef4444" strokeWidth="10" />
              <path d="M60 100h80" stroke="#ef4444" strokeWidth="10" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}