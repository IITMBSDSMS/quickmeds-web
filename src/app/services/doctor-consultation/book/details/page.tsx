"use client";

import { useRouter } from "next/navigation";
import { useDoctorBooking } from "@/app/context/DoctorBookingContext";
import { useEffect, useState } from "react";

export default function BookingDetailsPage() {
  const router = useRouter();
  const { booking } = useDoctorBooking();

  const [bookingId, setBookingId] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (!booking || Object.keys(booking).length === 0) {
      return;
    }

    if (!booking?.doctor || !booking?.date || !booking?.time) {
      router.replace("/services/doctor-consultation/book");
      return;
    }

    setBookingId(
      "QM-" + Math.floor(100000 + Math.random() * 900000)
    );
  }, [booking, router]);

  if (!mounted) return null;

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 px-6 py-24">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-10">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Booking Summary
        </h1>

        <div className="mt-8 space-y-4 text-lg">
          <div>
            <span className="font-semibold">Doctor:</span>{" "}
            {booking.doctor?.name}
          </div>

          <div>
            <span className="font-semibold">Specialization:</span>{" "}
            {booking.doctor?.specialization}
          </div>

          <div>
            <span className="font-semibold">Mode:</span>{" "}
            {booking.mode}
          </div>

          <div>
            <span className="font-semibold">Date:</span>{" "}
            {booking.date}
          </div>

          <div>
            <span className="font-semibold">Time:</span>{" "}
            {booking.time}
          </div>
        </div>

        <div className="mt-10 p-6 bg-blue-50 rounded-xl">
          <p className="text-lg font-medium text-blue-700">
            Booking ID: {bookingId}
          </p>
        </div>

        <button
          onClick={() =>
            router.push(
              "/services/doctor-consultation/book/success"
            )
          }
          className="mt-10 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-full text-lg font-semibold"
        >
          Confirm Booking
        </button>
      </div>
    </section>
  );
}