"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import heroImage from "../assets/hero-medical.png";

export default function Hero() {
  return (
    <section className="bg-green-50 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-green-600">
            Saving Lives When Seconds Matter
          </h1>

          <p className="mt-6 text-lg text-gray-700">
            QuickMeds ensures patients reach the right hospital with available
            beds, delivers medicines in 30 minutes, and provides online doctor
            consultation.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link href="/emergency">
              <motion.button
                className="bg-red-600 text-white px-8 py-4 rounded-xl text-lg transition relative overflow-hidden"
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                  <span className="absolute w-full h-full rounded-xl bg-red-500/30 animate-ping"></span>
                  <span className="absolute w-full h-full rounded-xl bg-red-500/20 animate-pulse"></span>
                </span>
                <span className="relative z-10 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M3 7h11v7H3V7zm12 1h3.586L21 10.414V14h-6V8zM7 20a2 2 0 110-4 2 2 0 010 4zm10 0a2 2 0 110-4 2 2 0 010 4zM6 9h5v3H6V9z" />
                  </svg>
                  <span>Emergency Help</span>
                </span>
              </motion.button>
            </Link>

            <motion.button
              className="bg-green-600 text-white px-8 py-4 rounded-xl text-lg transition"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
            >
              <span className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M4.22 19.78a4.5 4.5 0 006.36 0l9.2-9.2a4.5 4.5 0 00-6.36-6.36l-9.2 9.2a4.5 4.5 0 000 6.36zm1.41-1.41a2.5 2.5 0 010-3.54l4.6-4.6 3.54 3.54-4.6 4.6a2.5 2.5 0 01-3.54 0z" />
                </svg>
                <span>Order Medicines</span>
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <Image
            src={heroImage}
            alt="Emergency medical assistance"
            className="max-w-md w-full"
            priority
          />
        </motion.div>

      </div>
    </section>
  );
}