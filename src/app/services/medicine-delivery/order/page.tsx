"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OrderMedicinePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedCity = localStorage.getItem("quickmeds_city");
    const savedPincode = localStorage.getItem("quickmeds_pincode");

    if (savedCity || savedPincode) {
      setFormData((prev) => ({
        ...prev,
        city: savedCity || prev.city,
        pincode: savedPincode || prev.pincode,
      }));
    }
  }, []);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isFormValid =
    !!file &&
    formData.name.trim() &&
    formData.phone.trim() &&
    formData.address.trim() &&
    formData.city.trim() &&
    formData.pincode.trim();

  const handleSubmit = async () => {
    if (!isFormValid) return;

    try {
      setLoading(true);

      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          pincode: formData.pincode,
          hasPrescription: !!file,
        }),
      });

      const data = await response.json();

      if (data.success) {
        router.push("/services/medicine-delivery/order/success");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 px-6 py-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Order Medicines
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Upload your prescription and get medicines delivered quickly.
          </p>

          {/* Step 1 */}
          <div className="mt-12 rounded-2xl border bg-white p-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Step 1: Upload Prescription
            </h2>
            <p className="mt-2 text-gray-600">
              Upload a clear photo or PDF of your doctor’s prescription.
            </p>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="mt-6 border-2 border-dashed rounded-xl p-8 text-center text-gray-500 bg-gray-50"
            >
              <p>Drag & drop prescription here</p>
              <p className="mt-2">or</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileSelect(e.target.files[0]);
                  }
                }}
              />

              {file && (
                <div className="mt-4 space-y-3 text-sm">
                  <div className="text-green-700 font-medium">
                    Selected file: {file.name}
                  </div>

                  {file.type.startsWith("image/") && (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Prescription preview"
                      className="mx-auto max-h-48 rounded-lg border"
                    />
                  )}

                  <button
                    onClick={removeFile}
                    className="text-red-600 underline text-sm"
                  >
                    Remove file
                  </button>
                </div>
              )}

              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-4 inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full"
              >
                Upload File
              </button>
            </div>
          </div>

          {/* Step 2 */}
          <div className="mt-10 rounded-2xl border bg-white p-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Step 2: Delivery Address
            </h2>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="border rounded-lg px-4 py-3"
              />
              <input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="border rounded-lg px-4 py-3"
              />
              <input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address"
                className="border rounded-lg px-4 py-3 sm:col-span-2"
              />
              <input
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                className="border rounded-lg px-4 py-3"
              />
              <input
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                placeholder="Pincode"
                className="border rounded-lg px-4 py-3"
              />
            </div>
          </div>
{/* Step 3 */}
<div className="mt-10 rounded-2xl border bg-white p-8">
  <h2 className="text-2xl font-semibold text-gray-900">
    Step 3: Payment Method
  </h2>
  <p className="mt-2 text-gray-600">
    Choose how you want to pay after pharmacist verification.
  </p>

  <div className="mt-6 space-y-4">
    <label className="flex items-center gap-3 cursor-pointer">
      <input type="radio" name="payment" defaultChecked />
      <span className="font-medium">
        Cash on Delivery (Recommended)
      </span>
    </label>

    <label className="flex items-center gap-3 text-gray-400 cursor-not-allowed">
      <input type="radio" name="payment" disabled />
      <span>Online Payment (Coming Soon)</span>
    </label>

    <label className="flex items-center gap-3">
      <input type="radio" name="payment" />
      <span>Pay Later / Insurance</span>
    </label>
  </div>

  <button
    disabled={!isFormValid || loading}
    onClick={handleSubmit}
    className={`mt-6 inline-flex items-center px-8 py-3 rounded-full text-lg font-semibold ${
      isFormValid && !loading
        ? "bg-green-600 hover:bg-green-700 text-white"
        : "bg-gray-300 text-gray-600 cursor-not-allowed"
    }`}
  >
    {loading ? "Processing..." : "Confirm Order"}
  </button>
</div>
        </div>

        {/* Order Summary */}
        <div className="rounded-2xl border bg-white p-6 h-fit sticky top-28">
          <h3 className="text-xl font-semibold text-gray-900">
            Order Summary
          </h3>

          <div className="mt-4 space-y-3 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Prescription</span>
              <span>{file ? "Uploaded" : "Not uploaded"}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery City</span>
              <span>{formData.city || "—"}</span>
            </div>

            <div className="flex justify-between">
              <span>Pincode</span>
              <span>{formData.pincode || "—"}</span>
            </div>

            <div className="border-t pt-3 flex justify-between font-semibold">
              <span>Delivery Time</span>
              <span>~30 mins</span>
            </div>
          </div>

          <button
            disabled={!isFormValid || loading}
            onClick={handleSubmit}
            className={`mt-6 w-full py-3 rounded-full font-semibold ${
              isFormValid && !loading
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            {loading ? "Processing..." : "Confirm & Place Order"}
          </button>

          <p className="mt-3 text-xs text-gray-500 text-center">
            Order will be confirmed after pharmacist verification.
          </p>
        </div>
      </div>
    </section>
  );
}