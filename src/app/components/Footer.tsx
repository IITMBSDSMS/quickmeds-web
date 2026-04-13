import Link from "next/link";
import { Phone, Hospital, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white mt-0">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-12 gap-10">

        {/* Brand */}
        <div className="md:col-span-4 space-y-4">
          <Link href="/" className="flex items-center gap-0 w-fit">
            <span className="text-2xl font-bold text-white tracking-tight">Quick</span>
            <span className="text-2xl font-bold text-brand-green tracking-tight">Meds</span>
          </Link>
          <p className="text-sm text-gray-300 leading-relaxed max-w-xs">
            India&apos;s trusted healthcare platform for emergency hospital routing,
            fast medicine delivery, and online doctor consultations.
          </p>
          <div className="flex items-center gap-2 bg-emergency/20 border border-emergency/30 text-red-300 px-4 py-2.5 rounded-xl text-sm font-medium w-fit">
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse flex-shrink-0" />
            Emergency: Call <a href="tel:108" className="font-bold underline ml-1">108</a>
          </div>
        </div>

        {/* Services */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">Services</h4>
          <ul className="space-y-3 text-sm text-gray-300">
            <li><Link href="/services/emergency-hospitals" className="hover:text-white transition-colors">Emergency Routing</Link></li>
            <li><Link href="/services/medicine-delivery" className="hover:text-white transition-colors">Medicine Delivery</Link></li>
            <li><Link href="/services/doctor-consultation" className="hover:text-white transition-colors">Doctor Consultation</Link></li>
            <li><Link href="/services/medicine-delivery/shop" className="hover:text-white transition-colors">Online Pharmacy</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">Company</h4>
          <ul className="space-y-3 text-sm text-gray-300">
            <li><Link href="/" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/waitlist" className="hover:text-white transition-colors">Join Waitlist</Link></li>
            <li><Link href="/admin/login" className="hover:text-white transition-colors">Partner Login</Link></li>
            <li><Link href="/admin/inventory" className="hover:text-white transition-colors">Pharmacy Portal</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">Contact</h4>
          <div className="space-y-3 text-sm text-gray-300">
            <p className="flex items-center gap-3">
              <Phone className="w-5 h-5 flex-shrink-0" />
              <span>Ambulance: <a href="tel:108" className="text-white font-semibold hover:underline">108</a></span>
            </p>
            <p className="flex items-center gap-3">
              <Hospital className="w-5 h-5 flex-shrink-0" />
              <span>Hospitals: <a href="tel:112" className="text-white font-semibold hover:underline">112</a></span>
            </p>
            <p className="flex items-center gap-3">
              <Mail className="w-5 h-5 flex-shrink-0" />
              <a href="mailto:india@quickmedsofficial.com" className="text-white hover:underline break-all">
                india@quickmedsofficial.com
              </a>
            </p>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} QuickMeds. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
