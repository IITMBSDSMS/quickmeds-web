"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import mapImage from "../assets/map-placeholder.png";

export default function EmergencyPage() {
  return (
    <section className="fixed inset-0 z-50 bg-red-50 flex items-center justify-center px-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">

        {/* SOS ICON */}
        <motion.div
          className="mx-auto w-24 h-24 rounded-full bg-red-600 text-white flex items-center justify-center text-3xl font-bold"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          SOS
        </motion.div>

        {/* STATUS TEXT */}
        <motion.h1
          className="mt-8 text-2xl md:text-3xl font-bold text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Finding the nearest ambulance…
        </motion.h1>

        <p className="mt-4 text-gray-600">
          Please stay calm. We are locating the fastest available ambulance near you.
        </p>

        <p className="mt-2 text-sm text-green-600 font-medium">
          📍 Location detected. Sharing live coordinates with ambulance.
        </p>

        {/* LOADING DOTS */}
        <motion.div
          className="flex justify-center gap-2 mt-6"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        >
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
        </motion.div>

        {/* MAP PREVIEW */}
        <div className="mt-10 rounded-xl overflow-hidden border relative">
          <Image
            src={mapImage}
            alt="Finding nearest ambulance"
            className="w-full"
            priority
          />
          <motion.div
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow"
            initial={{ x: "-20%" }}
            animate={{ x: "120%" }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            🚑 Ambulance
          </motion.div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:108"
            className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition"
          >
            Call Ambulance
          </a>
          <a
            href="tel:112"
            className="bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            Call Hospital
          </a>
        </div>

        {/* STATUS BAR */}
        <motion.div
          className="mt-8 h-3 w-full bg-gray-200 rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-red-600"
            initial={{ width: "0%" }}
            animate={{ width: "75%" }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
        </motion.div>

        <p className="mt-3 text-sm text-gray-500">
          ETA will be shown shortly…
        </p>
      </div>
    </section>
  );
}