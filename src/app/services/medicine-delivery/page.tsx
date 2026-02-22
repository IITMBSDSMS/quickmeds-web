
export default function MedicineDeliveryPage() {
  return (
    <section className="relative bg-gradient-to-br from-green-50 via-white to-green-50 py-28 px-6 overflow-hidden">
      {/* Decorative illustration */}
      <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block opacity-25">
        <svg width="420" height="420" viewBox="0 0 200 200" fill="none">
          <rect x="40" y="60" width="120" height="80" rx="20" stroke="#22c55e" strokeWidth="4" />
          <path d="M100 60v80" stroke="#22c55e" strokeWidth="4" />
          <circle cx="100" cy="100" r="12" fill="#22c55e" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Medicine Delivery in 30 Minutes
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Order essential medicines and medical supplies and get them delivered
            to your doorstep quickly from verified pharmacies.
          </p>

          <ul className="mt-10 space-y-4 text-gray-700">
            <li>✔ Upload prescription securely</li>
            <li>✔ Verified local pharmacies</li>
            <li>✔ Real-time order tracking</li>
            <li>✔ Emergency priority delivery</li>
          </ul>

          <div className="mt-14">
            <h2 className="text-2xl font-bold text-gray-900">
              How It Works
            </h2>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="rounded-2xl border bg-white p-6">
                <p className="text-sm text-gray-500">Step 1</p>
                <h3 className="mt-1 font-semibold text-gray-900">
                  Upload Prescription
                </h3>
                <p className="mt-2 text-gray-600 text-sm">
                  Upload a valid prescription securely through our platform.
                </p>
              </div>

              <div className="rounded-2xl border bg-white p-6">
                <p className="text-sm text-gray-500">Step 2</p>
                <h3 className="mt-1 font-semibold text-gray-900">
                  Pharmacy Confirmation
                </h3>
                <p className="mt-2 text-gray-600 text-sm">
                  Nearby verified pharmacies accept and prepare your order.
                </p>
              </div>

              <div className="rounded-2xl border bg-white p-6">
                <p className="text-sm text-gray-500">Step 3</p>
                <h3 className="mt-1 font-semibold text-gray-900">
                  Fast Delivery
                </h3>
                <p className="mt-2 text-gray-600 text-sm">
                  Your medicines are delivered to your doorstep within 30 minutes.
                </p>
              </div>
            </div>
          </div>

          <a
            href="/services/medicine-delivery/order"
            className="inline-flex items-center gap-3 mt-12 bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg transition-transform hover:scale-105"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="7" width="18" height="10" rx="5" />
              <path d="M12 7v10" />
            </svg> Order Medicines Now
          </a>
        </div>

        {/* Right illustration block */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="rounded-3xl bg-green-100 p-16">
            <svg width="180" height="180" viewBox="0 0 200 200" fill="none">
              <rect x="50" y="80" width="100" height="60" rx="30" fill="#22c55e" />
              <path d="M100 60v80" stroke="white" strokeWidth="10" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}