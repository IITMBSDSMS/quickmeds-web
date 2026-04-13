"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Suspense } from "react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50 px-6">
        <div className="max-w-xl w-full bg-white rounded-3xl p-10 text-center shadow-lg">
          <h1 className="text-2xl font-bold text-gray-900">
            Invalid Order Access
          </h1>
          <p className="mt-4 text-gray-600">
            No order ID was provided. Please place a new order.
          </p>
          <div className="mt-6">
            <Link
              href="/services/medicine-delivery"
              className="inline-flex justify-center rounded-full bg-green-600 hover:bg-green-700 text-white px-8 py-3 font-semibold"
            >
              Place Order
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50 px-6">
      <div className="max-w-xl w-full bg-white rounded-3xl p-10 text-center shadow-lg">
        
        {/* Success Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 text-4xl">
          ✓
        </div>

        {/* Title */}
        <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
          Order Placed Successfully
        </h1>

        <p className="mt-3 text-gray-600">
          Your prescription has been received. Our pharmacist is verifying it.
        </p>

        {/* Order ID */}
        <div className="mt-6 rounded-xl bg-gray-50 p-4">
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {orderId ?? "Not Available"}
          </p>
        </div>

        {/* Tracking */}
        <div className="mt-8 text-left">
          <h2 className="text-lg font-semibold text-gray-900">
            Order Status
          </h2>

          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-3 text-green-600">
              ✔ Prescription received
            </li>
            <li className="flex items-center gap-3 text-green-600">
              ✔ Pharmacist verification in progress
            </li>
            <li className="flex items-center gap-3 text-gray-500">
              ⏳ Preparing medicines
            </li>
            <li className="flex items-center gap-3 text-gray-500">
              🚚 Out for delivery
            </li>
          </ul>
        </div>

        {/* ETA */}
        <p className="mt-6 text-sm text-gray-500">
          Estimated delivery time: <strong>~30 minutes</strong>
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex justify-center rounded-full bg-green-600 hover:bg-green-700 text-white px-8 py-3 font-semibold"
          >
            Go to Home
          </Link>

          <Link
            href="/services/medicine-delivery"
            className="inline-flex justify-center rounded-full border border-gray-300 px-8 py-3 font-semibold text-gray-700 hover:bg-gray-50"
          >
            Order More Medicines
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Order Details...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}