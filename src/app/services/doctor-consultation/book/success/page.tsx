"use client";

import { useRouter } from "next/navigation";
import { useDoctorBooking } from "@/app/context/DoctorBookingContext";
import { useEffect, useState } from "react";

export default function BookingSuccessPage() {
  const router = useRouter();
  const { booking } = useDoctorBooking();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (!booking || Object.keys(booking).length === 0) {
      return;
    }

    if (!booking?.doctor) {
      router.replace("/services/doctor-consultation");
    }
  }, [booking, router]);

  if (!mounted) return null;

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 px-6">
      <div className="bg-white rounded-3xl shadow-xl p-12 max-w-2xl w-full text-center">
        
        {/* Success Icon */}
        <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-4xl font-extrabold text-gray-900">
          Booking Confirmed 🎉
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          Your consultation has been successfully scheduled.
        </p>

        {/* Booking Details */}
        <div className="mt-8 bg-green-50 rounded-xl p-6 text-left space-y-3">
          <p>
            <span className="font-semibold">Doctor:</span>{" "}
            {booking.doctor?.name}
          </p>

          <p>
            <span className="font-semibold">Specialization:</span>{" "}
            {booking.doctor?.specialization}
          </p>

          <p>
            <span className="font-semibold">Mode:</span>{" "}
            {booking.mode}
          </p>

          <p>
            <span className="font-semibold">Date:</span>{" "}
            {booking.date}
          </p>

          <p>
            <span className="font-semibold">Time:</span>{" "}
            {booking.time}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 rounded-full bg-gray-200 hover:bg-gray-300 font-medium"
          >
            Back to Home
          </button>

          <button
            onClick={() => router.push("/services/doctor-consultation")}
            className="px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-medium"
          >
            Book Another Consultation
          </button>
        </div>
      </div>
    </section>
  );
}