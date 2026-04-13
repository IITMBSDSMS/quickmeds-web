"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";


export default function PharmacyDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("All");
  const [shopId, setShopId] = useState<string | null>(null);

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    preparing: 0,
    outForDelivery: 0,
    delivered: 0,
  });

  const [previousCount, setPreviousCount] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [showNewOrderAlert, setShowNewOrderAlert] = useState(false);
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    const initialize = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/admin/login");
        return;
      }

      fetchOrders(session.user.id);
    };

    initialize();
  }, [router]);

  async function fetchOrders(userId: string) {
    // 1️⃣ Get shop for this user
    const { data: shop, error: shopError } = await supabase
      .from("shops")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle();

    if (shopError) {
      console.error("Shop lookup error:", shopError);
    }

    if (!shop) {
      setLoading(false);
      return;
    }

    setShopId(shop.id);

    const { data: shopStatus } = await supabase
      .from("shops")
      .select("is_online")
      .eq("id", shop.id)
      .single();

    if (shopStatus) {
      setIsOnline(shopStatus.is_online ?? true);
    }

    // 2️⃣ Fetch only this shop's orders
    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("shop_id", shop.id)
      .order("created_at", { ascending: false });

    setOrders(data || []);

    const ordersData = data || [];

    setStats({
      total: ordersData.length,
      pending: ordersData.filter(o => o.status === "Pending").length,
      preparing: ordersData.filter(o => o.status === "Preparing").length,
      outForDelivery: ordersData.filter(o => o.status === "Out for Delivery").length,
      delivered: ordersData.filter(o => o.status === "Delivered").length,
    });

    // 🔔 Play sound if new order arrives (after user interaction) and show alert
    if (ordersData.length > previousCount) {
      setShowNewOrderAlert(true);

      if (audioEnabled) {
        try {
          const audio = new Audio(
            "https://actions.google.com/sounds/v1/alarms/notification_alert.ogg"
          );
          audio.play().catch(() => {});
        } catch {}
      }

      // hide alert automatically after 5 seconds
      setTimeout(() => setShowNewOrderAlert(false), 5000);
    }

    setPreviousCount(ordersData.length);

    setLoading(false);
  }

  async function updateStatus(orderId: string, newStatus: string) {
    try {
      const res = await fetch("/api/order/update-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_id: orderId,
          status: newStatus,
        }),
      });

      let responseData: any = null;
      try {
        responseData = await res.json();
      } catch (e) {
        console.error("Invalid JSON response");
      }

      if (!res.ok) {
        console.error("API ERROR RESPONSE:", responseData);
        return;
      }

      console.log("API SUCCESS:", responseData);

      // Update local UI state
      setOrders((prev) =>
        prev.map((o) =>
          o.order_id === orderId ? { ...o, status: newStatus } : o
        )
      );
    } catch (err) {
      console.error("Status update failed", err);
    }
  }

  async function toggleOnlineStatus() {
    if (!shopId) return;

    const newStatus = !isOnline;

    const { error } = await supabase
      .from("shops")
      .update({ is_online: newStatus })
      .eq("id", shopId);

    if (!error) {
      setIsOnline(newStatus);
    }
  }

  useEffect(() => {
    if (!shopId) return;

    const channel = supabase
      .channel("realtime-orders")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "orders",
          filter: `shop_id=eq.${shopId}`,
        },
        () => {
          // refetch orders when anything changes
          fetchOrders(shopId);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [shopId]);

  if (loading) return <div className="p-8">Loading orders...</div>;

  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter((o) => o.status === filter);

  return (
    <div
      className="p-10 bg-gray-50 min-h-screen"
      onClick={() => setAudioEnabled(true)}
    >
      {showNewOrderAlert && (
        <div className="mb-6 bg-green-600 text-white px-6 py-4 rounded-xl shadow-lg flex justify-between items-center">
          <div>
            <p className="font-semibold">🔔 New Order Received</p>
            <p className="text-sm opacity-90">A new medicine order just arrived.</p>
          </div>
          <button
            onClick={() => setShowNewOrderAlert(false)}
            className="text-white text-sm underline"
          >
            Dismiss
          </button>
        </div>
      )}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Pharmacy Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage assigned medicine orders
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full ${
                isOnline ? "bg-green-500" : "bg-red-500"
              }`}
            ></span>
            <span className="text-sm font-medium">
              {isOnline ? "Online" : "Offline"}
            </span>

            <button
              onClick={toggleOnlineStatus}
              className={`ml-3 px-3 py-1 rounded-lg text-xs font-medium ${
                isOnline
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {isOnline ? "Go Offline" : "Go Online"}
            </button>
          </div>

          <button
            onClick={async () => {
              await supabase.auth.signOut();
              router.replace("/admin/login");
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-6">
        {["All", "Pending", "Preparing", "Out for Delivery", "Delivered"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filter === status
                ? "bg-green-600 text-white"
                : "bg-white border"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-gray-500 text-sm">Total Orders</p>
          <p className="text-2xl font-bold mt-2">{stats.total}</p>
        </div>

        <div className="bg-yellow-50 shadow rounded-xl p-6 text-center">
          <p className="text-yellow-600 text-sm">Pending</p>
          <p className="text-2xl font-bold mt-2 text-yellow-700">{stats.pending}</p>
        </div>

        <div className="bg-blue-50 shadow rounded-xl p-6 text-center">
          <p className="text-blue-600 text-sm">Preparing</p>
          <p className="text-2xl font-bold mt-2 text-blue-700">{stats.preparing}</p>
        </div>

        <div className="bg-purple-50 shadow rounded-xl p-6 text-center">
          <p className="text-purple-600 text-sm">Out for Delivery</p>
          <p className="text-2xl font-bold mt-2 text-purple-700">{stats.outForDelivery}</p>
        </div>

        <div className="bg-green-50 shadow rounded-xl p-6 text-center">
          <p className="text-green-600 text-sm">Delivered</p>
          <p className="text-2xl font-bold mt-2 text-green-700">{stats.delivered}</p>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <p className="text-gray-500">No orders available.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredOrders.map((order) => (
            <div
              key={order.order_id}
              className="bg-white rounded-xl shadow-md p-6 border"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-semibold text-lg">{order.name}</h2>
                  <p className="text-xs text-gray-400 mt-1">
                    Placed: {new Date(order.created_at).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.city} • {order.pincode}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Order ID: {order.order_id}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-1">
                  {Date.now() - new Date(order.created_at).getTime() < 120000 && (
                    <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                      NEW
                    </span>
                  )}

                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "Preparing"
                        ? "bg-blue-100 text-blue-700"
                        : order.status === "Out for Delivery"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>


              <p className="text-sm mt-4 text-gray-600">
                Phone: {order.phone}
              </p>

              {/* Medicines List */}
              {order.medicines && order.medicines.length > 0 && (
                <div className="mt-4 bg-gray-50 p-4 rounded-lg border">
                  <h4 className="font-semibold text-sm mb-2">Medicines to Pack:</h4>

                  <ul className="space-y-1 text-sm text-gray-700">
                    {order.medicines.map((med: any, index: number) => (
                      <li key={index} className="flex justify-between">
                        <span>{med.name}</span>
                        <span className="font-medium">x{med.qty}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t mt-3 pt-2 flex justify-between text-sm font-semibold">
                    <span>Total</span>
                    <span>
                      ₹{order.medicines.reduce((sum:any, m:any) => sum + (m.price || 0) * (m.qty || 1), 0)}
                    </span>
                  </div>
                </div>
              )}

              {/* Prescription View */}
              {order.prescription_url && (
                <div className="mt-3">
                  <button
                    onClick={async () => {
                      const { data, error } = await supabase.storage
                        .from("prescriptions")
                        .createSignedUrl(order.prescription_url, 60);

                      if (!error && data?.signedUrl) {
                        window.open(data.signedUrl, "_blank");
                      } else {
                        alert("Failed to open prescription");
                        console.error("Signed URL error:", error);
                      }
                    }}
                    className="inline-block text-sm text-blue-600 hover:text-blue-800 underline"
                  >
                    View Uploaded Prescription
                  </button>
                </div>
              )}

              <div className="mt-4">
                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(order.order_id, e.target.value)
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}