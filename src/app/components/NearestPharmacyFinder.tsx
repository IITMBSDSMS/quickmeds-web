"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export default function NearestPharmacyFinder() {
  const [medicineId, setMedicineId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (!medicineId) {
      setError("Please enter a medicine ID");
      return;
    }

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch("http://localhost:5000/api/inventory/getNearestAvailable", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lat: latitude, lng: longitude, medicineId }),
          });

          const data = await res.json();
          if (data.success && data.data) {
            setResult({ ...data.data, cached: data.cached });
          } else if (data.message) {
            setError(data.message);
          } else {
            setError(data.error || "Failed to find nearby pharmacies");
          }
        } catch (err: any) {
          setError(`Connection error: Make sure Express is running on port 5000`);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError(`Location access denied: ${err.message}`);
        setLoading(false);
      }
    );
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-xl overflow-hidden my-8 text-black border border-gray-100">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Find Nearest Pharmacy</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={medicineId}
            onChange={(e) => setMedicineId(e.target.value)}
            placeholder="Search medicine (e.g. aspirin)"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow font-medium transition disabled:opacity-70 flex items-center justify-center min-w-[120px]"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : "Search nearby"}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mt-4 font-medium">{error}</p>}

        {result && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-6 border border-green-200 bg-green-50 rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-green-900 text-lg">{result.name}</h3>
              {result.cached && (
                <span className="text-xs bg-indigo-100 text-indigo-700 flex items-center gap-1 px-2 py-1 rounded-full font-bold">
                  <Zap className="w-3 h-3 text-yellow-500" /> Redis Cached
                </span>
              )}
            </div>
            <p className="text-sm text-green-800">{result.address}</p>
            <div className="mt-4 flex flex-col gap-2">
              {result.inventory?.map((inv: any) => (
                inv.medicineId === medicineId && (
                  <div key={inv.medicineId} className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                     <span className="font-semibold text-gray-800 capitalize">{inv.name || inv.medicineId}</span>
                     <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">{inv.qty} in stock</span>
                  </div>
                )
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
