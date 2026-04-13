"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const products = [
  {
    id: 1,
    name: "Paracetamol",
    price: 40,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400"
  },
  {
    id: 2,
    name: "Crocin",
    price: 50,
    image: "https://images.unsplash.com/photo-1626716493137-b67fe9501e76?w=400"
  },
  {
    id: 3,
    name: "Bandage",
    price: 25,
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400"
  },
  {
    id: 4,
    name: "Antiseptic Liquid",
    price: 90,
    image: "https://images.unsplash.com/photo-1580281657527-47d5c5a0c8e3?w=400"
  },
  {
    id: 5,
    name: "Digital Thermometer",
    price: 199,
    image: "https://images.unsplash.com/photo-1588776814546-ec7e2b9a6f0c?w=400"
  },
  {
    id: 6,
    name: "BP Monitor",
    price: 899,
    image: "https://images.unsplash.com/photo-1580281780460-82d277c0c5c3?w=400"
  }
];

const banners = [
  {
    id: 1,
    title: "Pain Relief Sale",
    text: "Up to 40% OFF on Fever & Pain Medicines",
    discount: "40% OFF",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600"
  },
  {
    id: 2,
    title: "First Aid Essentials",
    text: "Bandages, Antiseptic & First Aid Kits",
    discount: "30% OFF",
    image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600"
  },
  {
    id: 3,
    title: "Health Devices",
    text: "Thermometers & BP Monitors Special Price",
    discount: "25% OFF",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600"
  },
  {
    id: 4,
    title: "Daily Care",
    text: "Masks, Sanitizers & Hygiene Products",
    discount: "30% OFF",
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600"
  },
  {
    id: 5,
    title: "QuickMeds Fast Delivery",
    text: "Medicines delivered within 30 minutes",
    discount: "FAST",
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=600"
  }
];

export default function ShopPage() {

  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);

  const [bannerIndex, setBannerIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  function handleTouchStart(e: React.TouchEvent) {
    setTouchStart(e.targetTouches[0].clientX);
  }

  function handleTouchMove(e: React.TouchEvent) {
    setTouchEnd(e.targetTouches[0].clientX);
  }

  function handleTouchEnd() {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;

    if (distance > 50) {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }

    if (distance < -50) {
      setBannerIndex((prev) => (prev - 1 + banners.length) % banners.length);
    }
  }

  function addToCart(product:any) {
    let updatedCart = [...cart];

    const existingIndex = updatedCart.findIndex((p:any)=>p.id === product.id);

    if(existingIndex !== -1){
      updatedCart[existingIndex].qty += 1;
    } else {
      updatedCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: 1
      });
    }

    setCart(updatedCart);
    localStorage.setItem("medical_cart", JSON.stringify(updatedCart));
  }

  function goToOrder() {
    router.push("/services/medicine-delivery/order");
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <h1 className="text-3xl font-bold mb-8">
        Shop Medical Essentials
      </h1>

      {/* Promotional Banner Slider */}
      <div
        className="mb-10 relative overflow-hidden rounded-2xl bg-green-600 text-white shadow-lg"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >

        <div className="flex items-center justify-between p-8 gap-6 transition-all duration-500">

          <div className="max-w-md">
            <span className="inline-block bg-white text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
              {banners[bannerIndex].discount}
            </span>

            <h2 className="text-2xl font-bold">
              {banners[bannerIndex].title}
            </h2>

            <p className="mt-2 text-sm opacity-90">
              {banners[bannerIndex].text}
            </p>
          </div>

          <img
            src={banners[bannerIndex].image}
            alt="promo"
            className="w-40 h-28 object-cover rounded-xl shadow-md hidden md:block"
          />

        </div>

        <div className="absolute bottom-3 right-4 flex gap-2">
          {banners.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full ${
                i === bannerIndex ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>

      </div>

      {/* Trust Section */}
      <div className="mb-10 grid md:grid-cols-2 gap-6">

        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Trusted by Thousands of Customers
          </h3>

          <p className="text-gray-600 text-sm">
            QuickMeds is trusted by families across the city for fast,
            reliable medicine delivery. Our platform ensures genuine
            medicines and verified pharmacies.
          </p>

          <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
            <span>⭐ 4.8 Rating</span>
            <span>•</span>
            <span>10,000+ Orders Delivered</span>
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Partnered with Licensed Pharmacies
          </h3>

          <p className="text-gray-600 text-sm">
            We work only with verified and licensed pharmacies to
            ensure authentic medicines and safe delivery.
          </p>

          <div className="flex gap-4 mt-4 text-sm text-green-700 font-medium">
            <span>✔ Govt. Licensed Stores</span>
            <span>✔ Verified Pharmacists</span>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

        {products.map((product)=>(
          <div
            key={product.id}
            className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-lg transition duration-300"
          >

            <div className="flex justify-center mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="h-24 object-contain"
              />
            </div>

            <h2 className="font-semibold text-lg text-gray-800">
              {product.name}
            </h2>

            <p className="text-green-700 font-bold mt-2">
              ₹{product.price}
            </p>

            <button
              onClick={()=>addToCart(product)}
              className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium"
            >
              Add to Cart
            </button>

          </div>
        ))}

      </div>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="mt-10 bg-white border rounded-2xl p-6 shadow-sm">

          <h2 className="text-xl font-semibold mb-4">
            Cart Summary
          </h2>

          {cart.map((item:any)=>(
            <div key={item.id} className="flex justify-between mb-2 text-sm">
              <span>{item.name} x {item.qty}</span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}

          <div className="border-t mt-4 pt-3 flex justify-between font-semibold">
            <span>Total</span>
            <span>
              ₹{cart.reduce((sum:number,item:any)=>sum + item.price*item.qty,0)}
            </span>
          </div>

        </div>
      )}

      <button
        onClick={goToOrder}
        className="mt-10 bg-black text-white px-6 py-3 rounded-lg"
      >
        Continue to Order
      </button>

    </div>
  );
}