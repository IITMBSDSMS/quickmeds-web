export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* BRAND */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-white">
            Quick<span className="text-green-500">Meds</span>
          </h3>
          <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
            QuickMeds is an emergency healthcare platform focused on saving lives
            by reducing delays in critical situations.
          </p>
          <p className="mt-4 text-sm text-red-400 font-semibold">
            🚨 Emergency Support: 24/7
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Services</a></li>
            <li><a href="/emergency" className="hover:text-white">Emergency</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
            Contact
          </h4>
          <p className="flex items-center gap-2 text-sm text-gray-400">📞 Ambulance: <a href="tel:108" className="text-white">108</a></p>
          <p className="flex items-center gap-2 text-sm text-gray-400 mt-2">🏥 Hospital: <a href="tel:112" className="text-white">112</a></p>
          <p className="flex items-center gap-2 text-sm text-gray-400 mt-2">
            ✉️ <a href="mailto:india@quickmedsofficial.com" className="text-white hover:underline">
              india@quickmedsofficial.com
            </a>
          </p>
          <div className="mt-6 max-w-xs">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Follow us
            </p>
            <div className="flex gap-4 mt-3 items-center">
              <a href="https://www.linkedin.com/company/quickmedsofficial/?viewAsMember=true" aria-label="LinkedIn" className="hover:text-green-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8.5h4V24h-4zM8.5 8.5h3.8v2.1h.05c.53-1 1.83-2.1 3.77-2.1 4.03 0 4.78 2.65 4.78 6.1V24h-4v-7.2c0-1.72-.03-3.93-2.4-3.93-2.4 0-2.77 1.87-2.77 3.8V24h-4z"/>
                </svg>
              </a>

              <a href="https://www.youtube.com/@QuickMedss" aria-label="YouTube" className="hover:text-green-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.5 6.2s-.23-1.6-.94-2.3c-.9-.94-1.9-.95-2.36-1C16.86 2.5 12 2.5 12 2.5h-.01s-4.86 0-8.2.4c-.46.05-1.46.06-2.36 1C.73 4.6.5 6.2.5 6.2S0 8.07 0 9.93v1.74c0 1.87.5 3.73.5 3.73s.23 1.6.94 2.3c.9.94 2.08.91 2.6 1 1.88.18 7.96.24 7.96.24s4.87-.01 8.2-.41c.46-.05 1.46-.06 2.36-1 .71-.7.94-2.3.94-2.3s.5-1.86.5-3.73V9.93c0-1.86-.5-3.73-.5-3.73zM9.75 14.56V7.44l6.25 3.56-6.25 3.56z"/>
                </svg>
              </a>

              <a href="#" aria-label="Twitter" className="hover:text-green-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.95 4.57a10 10 0 01-2.83.78 4.93 4.93 0 002.17-2.72 9.86 9.86 0 01-3.13 1.2 4.92 4.92 0 00-8.38 4.48A13.98 13.98 0 011.64 3.16a4.92 4.92 0 001.52 6.57 4.9 4.9 0 01-2.23-.62v.06a4.93 4.93 0 003.95 4.83 4.9 4.9 0 01-2.22.08 4.93 4.93 0 004.6 3.42A9.88 9.88 0 010 19.54a13.94 13.94 0 007.55 2.21c9.05 0 14-7.5 14-14v-.64a9.94 9.94 0 002.45-2.54z"/>
                </svg>
              </a>

              <a href="https://www.instagram.com/quickmeds_official/" aria-label="Instagram" className="hover:text-green-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3h10zm-5 3.2A4.8 4.8 0 1016.8 12 4.81 4.81 0 0012 7.2zm0 7.9A3.1 3.1 0 1115.1 12 3.1 3.1 0 0112 15.1zm4.95-8.55a1.15 1.15 0 11-1.15-1.15 1.15 1.15 0 011.15 1.15z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-slate-800 py-4 text-center text-xs text-gray-500">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          <span>© {new Date().getFullYear()} QuickMeds. All rights reserved.</span>
          <span className="hidden sm:inline">•</span>
          <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
          <span className="hidden sm:inline">•</span>
          <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
      {/* MOBILE STICKY EMERGENCY BAR */}
      <div className="fixed bottom-0 inset-x-0 z-50 sm:hidden">
        <a
          href="/emergency"
          className="flex items-center justify-center gap-2 bg-red-600 text-white py-4 text-lg font-semibold shadow-lg"
        >
          🚨 Emergency Help
        </a>
      </div>
    </footer>
  );
}