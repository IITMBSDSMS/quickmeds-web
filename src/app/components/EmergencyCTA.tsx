export default function EmergencyCTA() {
  return (
    <section className="relative bg-gradient-to-br from-green-100 via-green-50 to-white py-28 px-6 overflow-hidden">
      
      {/* Subtle floating medical illustration */}
      <div className="pointer-events-none absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block opacity-20 animate-pulse">
        <svg width="360" height="360" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="70" stroke="#22c55e" strokeWidth="4" />
          <path d="M100 60V140M60 100H140" stroke="#22c55e" strokeWidth="6" strokeLinecap="round" />
          <path
            d="M10 100 Q40 70 70 100 T130 100 T190 100"
            stroke="#22c55e"
            strokeWidth="4"
            fill="none"
          />
        </svg>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto text-center text-gray-900 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight animate-fade-in">
          In an Emergency, Don’t Panic
        </h2>

        <p className="mt-6 text-lg md:text-xl text-gray-600">
          QuickMeds is available 24/7 to coordinate ambulances and hospitals instantly.
        </p>

        <a
          href="/emergency"
          className="inline-flex items-center gap-3 mt-12 bg-red-600 hover:bg-red-700 text-white px-12 py-5 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105"
        >
          🚨 Get Emergency Help Now
        </a>

        <p className="mt-6 text-sm text-gray-500">
          One tap connects you to nearby emergency responders.
        </p>
      </div>
    </section>
  );
}