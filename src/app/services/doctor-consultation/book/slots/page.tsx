"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const dates = [
  "Today",
  "Tomorrow",
  "Day After Tomorrow",
];

const timeSlots = [
  "09:00 AM",
  "10:30 AM",
  "12:00 PM",
  "02:00 PM",
  "04:30 PM",
  "06:00 PM",
];

export default function SelectSlotPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const isValid = selectedDate && selectedTime;

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Select Date & Time
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          Choose a convenient slot for your consultation.
        </p>

        {/* Date selection */}
        <div className="mt-10 rounded-2xl border bg-white p-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Step 1: Select Date
          </h2>

          <div className="mt-6 flex flex-wrap gap-4">
            {dates.map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`border rounded-xl px-6 py-3 font-medium ${
                  selectedDate === date
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "hover:border-gray-400"
                }`}
              >
                {date}
              </button>
            ))}
          </div>
        </div>

        {/* Time slot selection */}
        <div className="mt-10 rounded-2xl border bg-white p-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Step 2: Select Time Slot
          </h2>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedTime(slot)}
                className={`border rounded-xl px-4 py-3 font-medium ${
                  selectedTime === slot
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "hover:border-gray-400"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Continue */}
        <button
          disabled={!isValid}
          onClick={() =>
            router.push(
              "/services/doctor-consultation/book/details"
            )
          }
          className={`mt-12 w-full py-4 rounded-full text-lg font-semibold ${
            isValid
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </section>
  );
}