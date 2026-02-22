export default function DoctorConsultationService() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50 px-6 py-28">
      
      {/* Decorative illustration */}
      <div className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block opacity-25">
        <svg width="420" height="420" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="70" r="28" stroke="#3b82f6" strokeWidth="4" />
          <path
            d="M40 170c10-40 110-40 120 0"
            stroke="#3b82f6"
            strokeWidth="4"
            fill="none"
          />
          <path d="M100 98v32" stroke="#3b82f6" strokeWidth="4" />
          <path d="M84 114h32" stroke="#3b82f6" strokeWidth="4" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Online Doctor Consultation
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            Consult certified and experienced doctors online through video or chat,
            anytime and anywhere from the comfort of your home.
          </p>

          {/* Benefits */}
          <ul className="mt-10 space-y-4 text-gray-700">
            <li>✔ Certified & verified doctors</li>
            <li>✔ Secure video & chat consultation</li>
            <li>✔ Digital prescriptions</li>
            <li>✔ Follow-up support</li>
          </ul>

          {/* How it works */}
          <div className="mt-14">
            <h2 className="text-2xl font-bold text-gray-900">
              How It Works
            </h2>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Step 1</p>
                <h3 className="mt-1 font-semibold text-gray-900">
                  Choose Doctor
                </h3>
                <p className="mt-2 text-gray-600 text-sm">
                  Select a doctor based on specialization and availability.
                </p>
              </div>

              <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Step 2</p>
                <h3 className="mt-1 font-semibold text-gray-900">
                  Start Consultation
                </h3>
                <p className="mt-2 text-gray-600 text-sm">
                  Connect instantly via secure video or chat.
                </p>
              </div>

              <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Step 3</p>
                <h3 className="mt-1 font-semibold text-gray-900">
                  Get Prescription
                </h3>
                <p className="mt-2 text-gray-600 text-sm">
                  Receive a digital prescription and medical advice.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <a
            href="/services/doctor-consultation/book"
            className="inline-flex items-center gap-3 mt-12 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg transition-transform hover:scale-105"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="7" r="4" />
              <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
            </svg>
            Book Consultation
          </a>
        </div>

        {/* Right illustration card */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="rounded-3xl bg-blue-100 p-16">
            <svg width="180" height="180" viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="80" r="36" fill="#3b82f6" />
              <path d="M50 160c20-50 80-50 100 0" fill="#3b82f6" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}