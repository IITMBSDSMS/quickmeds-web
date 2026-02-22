import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { DoctorBookingProvider } from "./context/DoctorBookingContext";
import { error } from "console";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">
        <DoctorBookingProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </DoctorBookingProvider>
      </body>
    </html>
  );
}

