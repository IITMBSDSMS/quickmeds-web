"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Order {
  id: number;
  order_id: string;
  name: string;
  phone: string;
  city: string;
  pincode: string;
  status: string;
  prescription_url?: string | null;
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(orderId: string, status: string) {
    try {
      await fetch("/api/order/update-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_id: orderId,
          status: status,
        }),
      });

      fetchOrders(); // refresh after update
    } catch (err) {
      console.error(err);
    }
  }

  const total = orders.length;
  const pending = orders.filter(o => o.status === "Pending").length;
  const preparing = orders.filter(o => o.status === "Preparing").length;
  const delivered = orders.filter(o => o.status === "Delivered").length;

  return (
    <section className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <Card title="Total Orders" value={total} />
        <Card title="Pending" value={pending} />
        <Card title="Preparing" value={preparing} />
        <Card title="Delivered" value={delivered} />
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-6">All Orders</h2>

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div
                key={order.order_id}
                className="border rounded-xl p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{order.name}</p>
                  <p className="text-sm text-gray-500">
                    {order.city} • {order.pincode}
                  </p>
                  <p className="text-xs text-gray-400">
                    Order ID: {order.order_id}
                  </p>

              {/* Prescription View (Secure Signed URL) */}
              {order.prescription_url && (
                <button
                  onClick={async () => {
                    const { data, error } = await supabase.storage
                      .from("prescriptions")
                      .createSignedUrl(order.prescription_url, 60);

                    if (!error && data?.signedUrl) {
                      window.open(data.signedUrl, "_blank");
                    } else {
                      console.error("Signed URL error:", error);
                    }
                  }}
                  className="mt-3 inline-block text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  View Uploaded Prescription
                </button>
              )}
                </div>

                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(order.order_id, e.target.value)
                  }
                  className="border rounded-lg px-3 py-1 text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Out for Delivery">
                    Out for Delivery
                  </option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 text-center">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}