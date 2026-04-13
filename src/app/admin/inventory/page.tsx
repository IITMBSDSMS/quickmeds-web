"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function InventoryDashboard() {
  const [pharmacyId, setPharmacyId] = useState("");
  const [medicineId, setMedicineId] = useState("");
  const [qty, setQty] = useState("");
  const [status, setStatus] = useState({ loading: false, message: "" });

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, message: "" });

    try {
      const res = await fetch("http://localhost:5000/api/inventory/updateStock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pharmacyId, medicineId, qty: Number(qty) }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus({ loading: false, message: "Success: Stock updated successfully!" });
      } else {
        setStatus({ loading: false, message: `Error: ${data.error}` });
      }
    } catch (err: any) {
      setStatus({ loading: false, message: `Error: Connection error. Make sure Express is running on port 5000` });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 text-black">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-white">
          <h1 className="text-2xl font-bold">Inventory Management</h1>
          <p className="text-blue-100 text-sm mt-2">Adjust pharmacy stock levels in real-time.</p>
        </div>
        
        <form onSubmit={handleUpdate} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pharmacy ID (MongoDB ObjectId)</label>
            <input 
              type="text" 
              required
              value={pharmacyId} 
              onChange={e => setPharmacyId(e.target.value)} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-black"
              placeholder="e.g. 64c9..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Medicine ID</label>
            <input 
              type="text" 
              required
              value={medicineId} 
              onChange={e => setMedicineId(e.target.value)} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-black"
              placeholder="e.g. aspirin"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Quantity</label>
            <input 
              type="number" 
              required
              value={qty} 
              onChange={e => setQty(e.target.value)} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-black"
              placeholder="0"
            />
          </div>

          <button 
            type="submit" 
            disabled={status.loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status.loading ? "Updating..." : "Update Stock"}
          </button>

          {status.message && (
            <div className={`p-4 rounded-lg text-sm ${status.message.startsWith('Success:') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {status.message}
            </div>
          )}
        </form>
      </motion.div>
    </div>
  );
}
