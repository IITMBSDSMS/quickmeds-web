"use client";

import { createContext, useContext, useState } from "react";

type BookingData = {
  specialization?: string;
  mode?: string;
  doctor?: {
    name: string;
    specialization: string;
  };
  date?: string;
  time?: string;
};

type BookingContextType = {
  booking: BookingData;
  setBooking: React.Dispatch<React.SetStateAction<BookingData>>;
};

const BookingContext = createContext<BookingContextType | null>(null);

export function DoctorBookingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [booking, setBooking] = useState<BookingData>({});

  return (
    <BookingContext.Provider value={{ booking, setBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useDoctorBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error(
      "useDoctorBooking must be used inside DoctorBookingProvider"
    );
  }
  return context;
}