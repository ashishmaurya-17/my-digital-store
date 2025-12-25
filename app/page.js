import Link from "next/link";
import { products } from "./data/products";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-black">
        My Digital Store
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition">
            <img src={product.image} alt={product.title} className="w-full h-64 object-cover rounded-md" />

            <h2 className="text-xl font-bold mt-4 text-black">{product.title}</h2>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-green-600 font-bold text-lg">₹{product.price}</span>
              <span className="text-gray-400 line-through text-sm">₹{product.originalPrice}</span>
            </div>

            <Link href={`/product/${product.id}`}>
              <button className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800">
                Buy Now
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}