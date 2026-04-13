"use client";
import Image from "next/image";
import Link from "next/link";
import { Ambulance } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "../assets/hero-medical.png";

export default function Hero() {
  return (
    <section className="bg-white pt-16">
      {/* Top announcement bar */}
      <div className="bg-brand-greenLight border-b border-brand-green/20 py-2.5 px-4 text-center">
        <p className="text-sm font-medium text-brand-greenDark">
          🚑 Emergency Dispatch Service — Now Live in select cities &nbsp;
          <Link href="/emergency" className="font-bold underline hover:no-underline">
            Request now →
          </Link>
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 bg-brand-greenLight text-brand-greenDark text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border border-brand-green/30">
            <span className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
            Trusted by patients across India
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-brand-navy leading-[1.2] tracking-tight">
            Healthcare Help{" "}
            <span className="text-brand-green">When You Need</span>{" "}
            It Most
          </h1>

          <p className="mt-5 text-lg text-textSecondary leading-relaxed max-w-xl">
            QuickMeds connects you to the nearest hospital with available beds,
            delivers medicines to your door in 30 minutes, and lets you
            consult a doctor online — all in one place.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/emergency">
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-emergency hover:bg-red-700 text-white px-7 py-3.5 rounded-xl text-base font-semibold shadow-sm transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                Emergency Help
              </motion.button>
            </Link>

            <Link href="/services/medicine-delivery">
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-brand-green hover:bg-brand-greenDark text-white px-7 py-3.5 rounded-xl text-base font-semibold shadow-sm transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
                Order Medicines
              </motion.button>
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-10 pt-8 border-t border-gray-100 grid grid-cols-3 gap-6">
            {[
              { num: "30 min", label: "Medicine Delivery" },
              { num: "500+", label: "Hospital Partners" },
              { num: "24/7", label: "Doctor Availability" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-brand-navy">{stat.num}</p>
                <p className="text-xs text-textMuted mt-0.5 leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — Hero Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="relative flex justify-center"
        >
          {/* Soft green background blob */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[380px] h-[380px] bg-brand-greenLight rounded-full opacity-60" />
          </div>

          {/* Floating info cards */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-8 -left-4 md:left-0 bg-white rounded-2xl shadow-card-hover p-4 flex items-center gap-3 z-10 border border-gray-100 hidden sm:flex"
          >
            <div className="w-10 h-10 bg-emergencyLight rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-emergency" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="text-xs text-textMuted font-medium">Ambulance ETA</p>
              <p className="text-sm font-bold text-brand-navy">4 mins away</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-12 -right-2 md:right-0 bg-white rounded-2xl shadow-card-hover p-4 flex items-center gap-3 z-10 border border-gray-100 hidden sm:flex"
          >
            <div className="w-10 h-10 bg-brand-greenLight rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="text-xs text-textMuted font-medium">Medicine Delivered</p>
              <p className="text-sm font-bold text-brand-navy">In 28 minutes</p>
            </div>
          </motion.div>

          <Image
            src={heroImage}
            alt="Doctor assisting patient — QuickMeds emergency care"
            className="relative z-10 w-full max-w-md object-contain drop-shadow-sm"
            priority
          />
        </motion.div>

      </div>

      {/* Trust logos / Partners strip */}
      <div className="border-t border-gray-100 bg-surface py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12 text-center">
          <p className="text-xs font-semibold text-textMuted uppercase tracking-widest">Partnered with</p>
          <div className="flex items-center gap-8 flex-wrap justify-center">
            {["Apollo Hospitals", "Medanta", "Max Healthcare", "Fortis"].map((name) => (
              <span key={name} className="text-sm font-semibold text-textSecondary opacity-60 hover:opacity-100 transition-opacity">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}