"use client";
import { products } from "../../data/products";
import Script from "next/script";
import { use, useState } from "react";

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
        name: "My Digital Store",
        description: product.title,
        order_id: data.id,
        handler: function (response) {
          alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
          // REPLACE THIS LINK with your Google Drive Link later
          window.location.href = "https://drive.google.com/"; 
        },
        theme: { color: "#3399cc" }
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

  if (!product) return <div>Product not found</div>;

  return (
    <div className="min-h-screen bg-white p-10 flex justify-center items-center">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 border p-6 rounded-lg shadow-lg">
        <img src={product.image} className="w-full rounded-lg" />

        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-black">{product.title}</h1>
          <p className="text-gray-600 mt-4">{product.description}</p>
          <div className="text-3xl font-bold text-green-600 mt-6">₹{product.price}</div>

          <button 
            onClick={handlePayment}
            disabled={loading}
            className="mt-8 bg-black text-white text-xl px-10 py-4 rounded-lg hover:bg-gray-800 w-full disabled:bg-gray-400"
          >
            {loading ? "Processing..." : "Buy Now"}
          </button>
        </div>
      </div>
    </div>
  );
}