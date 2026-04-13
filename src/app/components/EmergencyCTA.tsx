"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Hospital, Ambulance, Pill, Stethoscope, AlertTriangle } from "lucide-react";

export default function EmergencyCTA() {
  return (
    <section className="bg-white section-pad">
      <div className="container-max">
        <div className="bg-emergency rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            {/* Left content */}
            <div className="p-10 md:p-14">
              <div className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                24/7 Emergency Line Active
              </div>

              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-white leading-tight"
              >
                In a medical emergency,
                <br />
                <span className="text-red-200">every second matters.</span>
              </motion.h2>

              <p className="mt-5 text-red-100 text-base leading-relaxed max-w-md">
                Don&apos;t wait on hold. QuickMeds instantly connects you to the nearest
                ambulance and confirms hospital bed availability — so you get
                the right care, fast.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/emergency"
                  className="inline-flex items-center justify-center gap-2.5 bg-white text-emergency hover:bg-red-50 font-bold px-8 py-4 rounded-xl text-base transition-all"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                  Request Emergency Help
                </Link>
                <a
                  href="tel:108"
                  className="inline-flex items-center justify-center gap-2.5 border-2 border-white/50 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl text-base transition-all"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  Call 108 Directly
                </a>
              </div>
            </div>

            {/* Right — visual / info tiles */}
            <div className="hidden lg:flex items-center justify-center p-10 gap-4 flex-wrap">
              {[
                { icon: <Hospital className="w-8 h-8" />, label: "500+ Hospitals", sub: "Bed availability confirmed" },
                { icon: <Ambulance className="w-8 h-8" />, label: "Ambulance Dispatch", sub: "Average 6 min response" },
                { icon: <Pill className="w-8 h-8" />, label: "Medicine Delivery", sub: "30 min or less" },
                { icon: <Stethoscope className="w-8 h-8" />, label: "Online Doctors", sub: "Available right now" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 w-44 text-left"
                >
                  <span className="text-2xl block mb-2">{item.icon}</span>
                  <p className="text-white font-bold text-sm">{item.label}</p>
                  <p className="text-red-200 text-xs mt-1">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky emergency bar */}
      <div className="fixed bottom-4 inset-x-4 z-50 md:hidden">
        <Link
          href="/emergency"
          className="flex items-center justify-center gap-2 bg-emergency text-white py-4 rounded-xl text-base font-bold shadow-lg active:scale-95 transition-transform"
        >
          <AlertTriangle className="w-5 h-5 flex-shrink-0" /> Emergency Help — Tap Here
        </Link>
      </div>
    </section>
  );
}