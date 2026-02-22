"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BookDoctorConsultation() {
  const router = useRouter();
  const [specialization, setSpecialization] = useState("");
  const [mode, setMode] = useState("video");

  const isValid = specialization !== "";

  const handleContinue = () => {
    if (!isValid) return;
    router.push("/services/doctor-consultation/book/doctor");
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 px-6 py-24">
      {/* Decorative background shapes */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-blue-100 opacity-40" />
      <div className="pointer-events-none absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-green-100 opacity-30" />
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900">
            Book Doctor Consultation
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Choose a specialization and consultation type to continue.
          </p>

          {/* Step 1 */}
          <div className="mt-10 rounded-2xl border bg-white p-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Step 1: Select Specialization
            </h2>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                "General Physician",
                "Dermatologist",
                "Cardiologist",
                "Pediatrician",
                "Gynecologist",
                "Orthopedic",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => setSpecialization(item)}
                  className={`border rounded-xl px-4 py-3 text-sm font-medium transition ${
                    specialization === item
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "hover:border-gray-400"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2 */}
          <div className="mt-10 rounded-2xl border bg-white p-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Step 2: Consultation Type
            </h2>

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => setMode("video")}
                className={`flex-1 border rounded-xl px-4 py-3 font-medium ${
                  mode === "video"
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "hover:border-gray-400"
                }`}
              >
                Video Consultation
              </button>

              <button
                onClick={() => setMode("chat")}
                className={`flex-1 border rounded-xl px-4 py-3 font-medium ${
                  mode === "chat"
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "hover:border-gray-400"
                }`}
              >
                Chat Consultation
              </button>
            </div>
          </div>

          {/* Continue */}
          <button
            disabled={!isValid}
            onClick={handleContinue}
            className={`mt-12 w-full py-4 rounded-full text-lg font-semibold ${
              isValid
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
        {/* Illustration */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="relative rounded-3xl bg-blue-100 p-16">
            <svg
              width="220"
              height="220"
              viewBox="0 0 200 200"
              fill="none"
            >
              <circle cx="100" cy="70" r="28" fill="#3b82f6" />
              <path
                d="M40 170c10-45 110-45 120 0"
                fill="#3b82f6"
              />
              <rect x="70" y="95" width="60" height="10" rx="5" fill="white" />
              <rect x="95" y="70" width="10" height="60" rx="5" fill="white" />
            </svg>
            <p className="mt-6 text-center text-sm text-blue-700 font-medium">
              Trusted Doctors • Secure Consultation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}