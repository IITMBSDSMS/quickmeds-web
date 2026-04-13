'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Graceful error logging
    console.error("Runtime Application Error Caught:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="w-24 h-24 bg-gray-100 text-gray-800 rounded-full flex items-center justify-center mb-6">
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-brand-navy mb-4">Something went wrong!</h2>
      <p className="text-textSecondary max-w-md mx-auto mb-8">
        We experienced an unexpected systemic error. Don't worry, your health logic is safe. Let's get you back on track.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="bg-brand-navy text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-navy/90 transition"
        >
          Try again
        </button>
        <Link href="/" className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition">
          Go Home
        </Link>
      </div>
    </div>
  );
}
