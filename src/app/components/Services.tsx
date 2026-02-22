import React from "react";
import Link from "next/link";

export default function Services() {
  return (
    <section id="services" className="bg-white py-28 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Our Core Services
        </h2>
        <p className="mt-4 text-lg text-gray-500">
          QuickMeds provides fast, reliable healthcare services when every second matters.
        </p>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          <Link href="/services/emergency-hospitals" className="block">
            <div className="group cursor-pointer rounded-3xl border border-gray-200 bg-white p-10 transition-shadow hover:shadow-lg">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 13h18M5 13v6h14v-6M7 13V9h10v4" />
                  <path d="M9 19a2 2 0 104 0" />
                  <path d="M10 11h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Emergency Hospital Coordination
              </h3>
              <p className="mt-3 text-gray-500 leading-relaxed">
                Instantly connect with nearby hospitals and ensure bed availability before arrival.
              </p>
            </div>
          </Link>

          <Link href="/services/medicine-delivery" className="block">
            <div className="group cursor-pointer rounded-3xl border border-gray-200 bg-white p-10 transition-shadow hover:shadow-lg">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="7" width="18" height="10" rx="5" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Medicine Delivery (30 Minutes)
              </h3>
              <p className="mt-3 text-gray-500 leading-relaxed">
                Get essential medicines and medical supplies delivered to your doorstep fast.
              </p>
            </div>
          </Link>

          <Link href="/services/doctor-consultation" className="block">
            <div className="group cursor-pointer rounded-3xl border border-gray-200 bg-white p-10 transition-shadow hover:shadow-lg">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c1.5-4 14.5-4 16 0" />
                  <path d="M12 12v4M10 14h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Online Doctor Consultation
              </h3>
              <p className="mt-3 text-gray-500 leading-relaxed">
                Consult certified doctors online anytime, anywhere from your home.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}