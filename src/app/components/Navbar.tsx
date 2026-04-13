"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { name: "Home", href: "/" },
    { name: "Services", href: "#services" },
    { name: "Pharmacy", href: "/services/medicine-delivery" },
    { name: "Doctors", href: "/services/doctor-consultation" },
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100"
          : "bg-white"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
        {/* Logo — matches the image exactly */}
        <Link href="/" className="flex items-center gap-0">
          <span className="text-2xl font-bold text-brand-navy tracking-tight">Quick</span>
          <span className="text-2xl font-bold text-brand-green tracking-tight">Meds</span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`transition-colors pb-0.5 ${
                    isActive
                      ? "text-brand-green border-b-2 border-brand-green"
                      : "text-textSecondary hover:text-brand-navy"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right: Emergency + CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="tel:108"
            className="hidden md:flex items-center gap-2 text-emergency text-sm font-semibold hover:underline"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            108 Emergency
          </Link>
          <Link
            href="/emergency"
            className="btn-emergency text-sm px-5 py-2.5 rounded-lg"
          >
            Get Help Now
          </Link>
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-textSecondary hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 shadow-lg">
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-base font-medium text-textSecondary hover:text-brand-navy py-1"
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="tel:108" className="flex items-center gap-2 text-emergency font-semibold py-1">
                <Phone className="w-4 h-4" /> Call 108 Emergency
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}