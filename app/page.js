import Link from "next/link";
import { products } from "./data/products";
import { ShoppingCart, Star, Zap } from "lucide-react"; // Icons

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* --- NAVBAR --- */}
      <nav className="flex justify-between items-center p-6 border-b border-gray-800 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-50">
        <h1 className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          CRAFTEDPIXL CLONE
        </h1>
        <div className="flex gap-4">
          <button className="hidden md:block text-gray-400 hover:text-white">Home</button>
          <button className="hidden md:block text-gray-400 hover:text-white">Shop</button>
          <ShoppingCart className="w-6 h-6 text-white cursor-pointer hover:text-purple-500" />
        </div>
      </nav>

      {/* --- HERO SECTION (Banner) --- */}
      <div className="relative overflow-hidden py-20 text-center">
        {/* Background Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[100px] -z-10"></div>
        
        <span className="bg-gray-800 text-purple-300 text-xs font-bold px-3 py-1 rounded-full border border-purple-500/30 uppercase tracking-wider">
          Premium AI Assets
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold mt-6 tracking-tight">
          Unlock Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Creative Potential
          </span>
        </h1>
        <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
          Get access to the highest quality AI Reels, Shorts, and Editing assets. 
          Instant download. Lifetime access.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a href="#shop" className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition">
            Explore Bundles
          </a>
          <button className="border border-gray-700 px-8 py-3 rounded-full font-bold hover:bg-gray-900 transition flex items-center gap-2">
            <Zap size={18} /> All Access
          </button>
        </div>
      </div>

      {/* --- PRODUCT GRID (Shop) --- */}
      <div id="shop" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-10 flex items-center gap-2">
          <span className="w-2 h-8 bg-purple-600 rounded-full"></span>
          Trending Bundles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group bg-[#111] border border-gray-800 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]">
              
              {/* Image Area */}
              <div className="relative overflow-hidden h-64">
                <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">
                  SALE
                </span>
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>

              {/* Content Area */}
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-gray-100 group-hover:text-purple-400 transition">
                    {product.title}
                  </h3>
                </div>
                
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-3 text-yellow-500">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <span className="text-gray-600 text-xs ml-2">(120 Reviews)</span>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-xs line-through">₹{product.originalPrice}</span>
                    <span className="text-2xl font-bold text-white">₹{product.price}</span>
                  </div>
                  
                  <Link href={`/product/${product.id}`}>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg font-medium transition shadow-lg shadow-purple-900/20">
                      Buy Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="border-t border-gray-900 bg-black py-10 text-center text-gray-500">
        <p>&copy; 2025 CraftedPixl Clone. All rights reserved.</p>
      </footer>
    </div>
  );
}