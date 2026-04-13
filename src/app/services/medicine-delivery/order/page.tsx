"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OrderForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [cart, setCart] = useState<any[]>([]);

  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("medical_cart");
    if (stored) {
      try {
        setCart(JSON.parse(stored));
      } catch {
        setCart([]);
      }
    }
  }, []);

  const isFormValid =
    formValues.name &&
    formValues.phone &&
    formValues.address &&
    formValues.city &&
    formValues.pincode;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("name", String(formData.get("name")));
      formDataToSend.append("phone", String(formData.get("phone")));
      formDataToSend.append("address", String(formData.get("address")));
      formDataToSend.append("city", String(formData.get("city")));
      formDataToSend.append("pincode", String(formData.get("pincode")));
      formDataToSend.append("medicines", JSON.stringify(cart));

      if (file) {
        formDataToSend.append("prescription", file);
      }

      const res = await fetch("/api/order", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Order failed");
        setLoading(false);
        return;
      }

      // Success
      if (result.success && result.data) {
        router.push(
          `/services/medicine-delivery/order/success?orderId=${result.data.order_id}`
        );
      } else {
        alert("Order created but ID not returned");
        setLoading(false);
      }
    } catch (err) {
      alert("Something went wrong");
      setLoading(false);
    }
  }

 return (
  <section className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-20 px-4">
    <div className="max-w-6xl mx-auto space-y-10">

      {/* PAGE TITLE */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Order Medicines
        </h1>
        <p className="text-gray-600 mt-2">
          Upload your prescription and get medicines delivered quickly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-8">

          {/* SHOP MEDICAL ESSENTIALS */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Shop Medical Essentials
              </h2>
              <p className="text-sm text-gray-600">
                Browse common medicines and healthcare items without prescription.
              </p>
            </div>

            <button
              type="button"
              onClick={() => router.push("/services/medicine-delivery/shop")}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium"
            >
              Open Store
            </button>
          </div>

          {/* STEP 1 */}
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">
              Step 1: Upload Prescription
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
              Upload a clear photo or PDF of your doctor's prescription.
            </p>

            <div className="border-2 border-dashed rounded-xl p-10 text-center text-gray-500">
              {!file ? (
                <>
                  <p>Drag & drop prescription here</p>
                  <p className="my-2 text-sm">or</p>
                  <label className="cursor-pointer inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full text-sm font-medium">
                    Upload File
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setFile(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                </>
              ) : (
                <div className="space-y-2">
                  <p className="text-green-600 font-medium">
                    ✓ {file.name}
                  </p>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="text-sm text-red-500 underline"
                  >
                    Remove file
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* STEP 2 */}
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">
              Step 2: Delivery Address
            </h2>

            <form id="orderForm" onSubmit={handleSubmit} className="space-y-5">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="name"
                  placeholder="Full Name"
                  required
                  value={formValues.name}
                  onChange={(e) =>
                    setFormValues({ ...formValues, name: e.target.value })
                  }
                  className="border rounded-lg px-4 py-3"
                />
                <input
                  name="phone"
                  placeholder="Phone Number"
                  required
                  value={formValues.phone}
                  onChange={(e) =>
                    setFormValues({ ...formValues, phone: e.target.value })
                  }
                  className="border rounded-lg px-4 py-3"
                />
              </div>

              <input
                name="address"
                placeholder="Address"
                required
                value={formValues.address}
                onChange={(e) =>
                  setFormValues({ ...formValues, address: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-3"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="city"
                  placeholder="City"
                  required
                  value={formValues.city}
                  onChange={(e) =>
                    setFormValues({ ...formValues, city: e.target.value })
                  }
                  className="border rounded-lg px-4 py-3"
                />
                <input
                  name="pincode"
                  placeholder="Pincode"
                  required
                  value={formValues.pincode}
                  onChange={(e) =>
                    setFormValues({ ...formValues, pincode: e.target.value })
                  }
                  className="border rounded-lg px-4 py-3"
                />
              </div>

              <label className="flex items-center gap-3 text-sm">
                <input type="checkbox" name="hasPrescription" />
                I have prescription
              </label>

              {/* STEP 3 */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">
                  Step 3: Payment Method
                </h3>

                <div className="space-y-2 text-sm">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="payment" defaultChecked />
                    Cash on Delivery (Recommended)
                  </label>

                  <label className="flex items-center gap-2 text-gray-400">
                    <input type="radio" disabled />
                    Online Payment (Coming Soon)
                  </label>

                  <label className="flex items-center gap-2">
                    <input type="radio" name="payment" />
                    Pay Later / Insurance
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !isFormValid}
                className={`mt-6 w-full py-3 rounded-lg font-semibold transition ${
                  isFormValid && !loading
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {loading ? "Placing Order..." : "Confirm & Place Order"}
              </button>

            </form>
          </div>
        </div>

        {/* RIGHT SUMMARY */}
        <div className="rounded-2xl border bg-white p-6 h-fit sticky top-28 shadow-sm">
          <h3 className="font-semibold text-lg mb-4">
            Order Summary
          </h3>

          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Prescription</span>
              <span>
                {file ? file.name : "Not uploaded"}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Delivery City</span>
              <span>{formValues.city || "—"}</span>
            </div>

            <div className="flex justify-between">
              <span>Pincode</span>
              <span>{formValues.pincode || "—"}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Time</span>
              <span>~30 mins</span>
            </div>

            {cart.length > 0 && (
              <div className="pt-4 border-t mt-4">
                <p className="font-medium text-gray-800 mb-2">Selected Items</p>
                {cart.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span>{item.name}</span>
                    <span>₹{item.price ?? ""}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            form="orderForm"
            disabled={!isFormValid}
            className={`mt-6 w-full py-3 rounded-lg font-semibold transition ${
              isFormValid
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            Confirm & Place Order
          </button>

          <p className="text-xs text-gray-400 mt-3 text-center">
            Order will be confirmed after pharmacist verification.
          </p>
        </div>

      </div>
    </div>
  </section>
);
}