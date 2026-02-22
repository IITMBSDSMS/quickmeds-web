"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { name: "Home", href: "/" },
    { name: "Services", href: "#services" },
    { name: "Emergency", href: "/emergency" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-shadow ${
        scrolled ? "shadow-md border-b border-gray-200" : "border-b"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* LEFT: Logo */}
        <Link href="/" className="text-xl font-bold">
          Quick<span className="text-green-600">Meds</span>
        </Link>

        {/* CENTER: Location Selector */}
        <div className="hidden md:flex items-center gap-2 border rounded-full px-5 py-2 bg-gray-50">
          <svg
            className="h-5 w-5 text-green-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>

          <input
            type="text"
            placeholder="City"
            className="w-28 bg-transparent outline-none text-sm"
          />

          <span className="text-gray-300">|</span>

          <input
            type="text"
            placeholder="Pincode"
            className="w-24 bg-transparent outline-none text-sm"
          />
        </div>

        {/* RIGHT: Navigation Links */}
        <ul className="flex items-center gap-8 text-lg">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`transition-colors hover:text-green-600 ${
                  pathname === link.href
                    ? "text-green-600 font-semibold"
                    : "text-gray-800"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}