import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="w-24 h-24 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-6">
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-brand-navy mb-4">Page Not Found</h2>
      <p className="text-textSecondary max-w-md mx-auto mb-8">
        We couldn't locate the medical route you were looking for. It might have been moved or doesn't exist.
      </p>
      <div className="flex gap-4">
        <Link href="/" className="bg-brand-navy text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-navy/90 transition">
          Return Home
        </Link>
        <Link href="/emergency" className="bg-emergency text-white px-6 py-3 rounded-lg font-medium hover:bg-emergency/90 transition shadow-lg shadow-emergency/20">
          Emergency Help
        </Link>
      </div>
    </div>
  );
}
