"use client";

import { useRouter } from "next/navigation";

const doctors = [
  {
    id: 1,
    name: "Dr. Ananya Sharma",
    specialization: "General Physician",
    experience: "8 years",
    rating: "4.8",
  },
  {
    id: 2,
    name: "Dr. Rohit Mehta",
    specialization: "Dermatologist",
    experience: "6 years",
    rating: "4.6",
  },
  {
    id: 3,
    name: "Dr. Neha Kapoor",
    specialization: "Cardiologist",
    experience: "10 years",
    rating: "4.9",
  },
];

export default function SelectDoctorPage() {
  const router = useRouter();

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Select a Doctor
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          Choose a doctor for your consultation.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="rounded-2xl border bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-gray-900">
                {doctor.name}
              </h3>

              <p className="mt-1 text-sm text-gray-600">
                {doctor.specialization}
              </p>

              <div className="mt-3 flex justify-between text-sm text-gray-500">
                <span>{doctor.experience} experience</span>
                <span>⭐ {doctor.rating}</span>
              </div>

              <button
                onClick={() =>
                  router.push(
                    "/services/doctor-consultation/book/slots"
                  )
                }
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-semibold"
              >
                Select Doctor
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}