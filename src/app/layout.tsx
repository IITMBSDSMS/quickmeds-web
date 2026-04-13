import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { DoctorBookingProvider } from "./context/DoctorBookingContext";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "QuickMeds | Emergency Medical Help, Medicine Delivery & Doctor Consultation",
  description: "QuickMeds connects you to nearby hospitals with available beds, delivers medicines in 30 minutes, and offers online doctor consultations. Available 24/7.",
  manifest: "/manifest.json",
  themeColor: "#0B1120",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "QuickMeds",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DoctorBookingProvider>
          <div className="flex flex-col min-h-screen bg-white">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </DoctorBookingProvider>
      </body>
    </html>
  );
}
