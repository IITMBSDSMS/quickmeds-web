"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Ambulance, Phone } from "lucide-react";
import mapImage from "../assets/map-placeholder.png";

export default function EmergencyPage() {
  return (
    <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center px-6 overflow-auto pt-16">
      <div className="max-w-xl w-full text-center py-10">

        {/* SOS Pulse Icon */}
        <motion.div
          className="mx-auto w-24 h-24 rounded-full bg-emergency flex items-center justify-center text-white font-black text-2xl shadow-lg relative"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          <div className="absolute inset-0 rounded-full bg-emergency opacity-30 animate-ping" />
          <span className="relative z-10">SOS</span>
        </motion.div>

        <motion.h1
          className="mt-8 text-3xl font-bold text-brand-navy"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Finding Nearest Ambulance...
        </motion.h1>

        <p className="mt-3 text-textSecondary">
          Please stay calm. We&apos;re locating the fastest available ambulance near you.
        </p>

        <p className="mt-2 text-sm text-brand-greenDark font-semibold bg-brand-greenLight px-4 py-2 rounded-full inline-block">
          📍 Location detected — sharing with ambulance
        </p>

        {/* Map preview */}
        <div className="mt-8 rounded-2xl overflow-hidden border border-gray-200 relative shadow-card">
          <Image
            src={mapImage}
            alt="Finding nearest ambulance on map"
            className="w-full"
            priority
          />
          <motion.div
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-emergency text-white px-3 py-1.5 rounded-full text-xs font-bold shadow"
            initial={{ x: "-20%" }}
            animate={{ x: "120%" }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          >
            <Ambulance className="w-4 h-4 flex-shrink-0" /> Ambulance
          </motion.div>
        </div>

        {/* Status bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs text-textMuted mb-2">
            <span>Locating...</span>
            <span>ETA: Calculating</span>
          </div>
          <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200">
            <motion.div
              className="h-full bg-emergency rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "80%" }}
              transition={{ duration: 5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="tel:108"
            className="btn-emergency flex items-center justify-center gap-2 text-base px-8 py-3.5"
          >
            <Phone className="w-5 h-5 flex-shrink-0" /> Call 108 — Ambulance
          </a>
          <Link
            href="/"
            className="btn-outline flex items-center justify-center gap-2 text-base px-8 py-3.5"
          >
            Cancel
          </Link>
        </div>

        <p className="mt-6 text-xs text-textMuted">
          If this is a life-threatening emergency, also call <strong>112</strong> for police assistance.
        </p>
      </div>
    </div>
  );
}