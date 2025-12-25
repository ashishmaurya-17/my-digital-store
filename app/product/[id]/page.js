"use client";
import { products } from "../../data/products"; // Path check karlena (app/data/products)
import Script from "next/script";
import { use, useState } from "react";
import { CheckCircle, ShieldCheck } from "lucide-react"; // Icons import

export default function ProductPage({ params }) {
  const unwrappedParams = use(params);
  const product = products.find((p) => p.id === unwrappedParams.id);
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        body: JSON.stringify({ amount: product.price }),
      });
      const data = await res.json();

      if (!data.id) {
         alert("Error creating order");
         setLoading(false);
         return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "CraftedPixl Store",
        description: product.title,
        order_id: data.id,
        handler: function (response) {
          window.location.href = product.downloadLink; 
        },
        theme: { color: "#9333ea" } // Purple theme for razorpay
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <div className="text-white text-center mt-20">Product not found</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white flex justify-center items-center p-4">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: Image */}
        <div className="relative">
          <div className="absolute inset-0 bg-purple-600 blur-[50px] opacity-20"></div>
          <img src={product.image} className="relative w-full rounded-2xl border border-gray-800 shadow-2xl z-10" />
        </div>
        
        {/* Right: Details */}
        <div className="flex flex-col justify-center">
          <span className="text-purple-400 font-bold tracking-wide uppercase text-sm mb-2">Instant Download</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{product.title}</h1>
          <p className="text-gray-400 text-lg mb-6">{product.description}</p>
          
          <div className="flex items-center gap-4 mb-8">
            <span className="text-4xl font-bold text-white">₹{product.price}</span>
            <span className="text-xl text-gray-600 line-through">₹{product.originalPrice}</span>
            <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm font-bold">
              80% OFF
            </span>
          </div>

          <button 
            onClick={handlePayment}
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xl font-bold py-4 px-8 rounded-xl shadow-lg shadow-purple-900/30 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Get Instant Access Now"}
          </button>

          <div className="mt-8 space-y-3 text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-purple-500" />
              <span>Lifetime access to files</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-purple-500" />
              <span>No watermark & High Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={20} className="text-purple-500" />
              <span>Secure Payment via Razorpay</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}