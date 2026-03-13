import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, ShoppingCart, Zap, Check, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { useApp } from "../context/AppContext";
import { products } from "../data/products";
import { Footer } from "../components/Footer";

const shopOwner = "Gilasi Originals";

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, setBuyProduct } = useApp();
  const [added, setAdded] = useState(false);

  // Scroll to top whenever ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Find the product based on ID from URL
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-emerald-50 text-emerald-900 px-4">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6 text-emerald-700">The product you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate("/shop")}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-all flex items-center gap-2"
        >
          <ArrowLeft size={18} /> Back to Shop
        </button>
      </div>
    );
  }

  // Find related products in the same category (excluding current product)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuy = () => {
    setBuyProduct(product);
    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Back Button */}
        <button
          onClick={() => navigate("/shop")}
          className="text-emerald-700 hover:text-emerald-900 font-medium mb-8 flex items-center gap-2 transition-colors"
        >
          <ArrowLeft size={18} /> Back to Shop
        </button>

        <div className="bg-white rounded-[2rem] shadow-sm border border-emerald-100 overflow-hidden mb-16">
          <div className="flex flex-col md:flex-row">
            {/* Product Image Section */}
            <div className="w-full md:w-1/2 p-4 md:p-8 bg-emerald-50/30 flex items-center justify-center">
              <div className="relative w-full aspect-square rounded-[1.5rem] overflow-hidden shadow-lg border border-emerald-100 group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-emerald-800 text-sm font-semibold rounded-full px-3 py-1 shadow-sm">
                  {product.category}
                </span>
                <span className="absolute bottom-4 right-4 bg-emerald-700/90 text-white text-xs font-semibold rounded-full px-3 py-1.5 shadow-md flex items-center gap-1.5">
                  <ShieldCheck size={14} /> 100% Recycled
                </span>
              </div>
            </div>

            {/* Product Info Section */}
            <div className="w-full md:w-1/2 p-6 md:p-10 lg:p-12 flex flex-col justify-center">
              <div className="mb-2">
                <span className="text-sm font-bold text-emerald-600 uppercase tracking-wider">{shopOwner}</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-emerald-950 mb-4 leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <p className="text-3xl font-bold text-emerald-700">KSh {product.price.toLocaleString()}</p>
                <div className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-md border border-green-200">
                  In Stock
                </div>
              </div>

              <div className="h-px w-full bg-emerald-100 mb-6"></div>

              <div className="prose prose-emerald mb-8">
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-10 w-full mt-auto">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-base border-2 ${
                    added
                      ? "bg-emerald-50 text-emerald-700 border-emerald-500 shadow-inner"
                      : "bg-white border-emerald-600 text-emerald-700 hover:bg-emerald-50 hover:shadow-md"
                  }`}
                >
                  {added ? <><Check size={20} /> Added to Cart</> : <><ShoppingCart size={20} /> Add to Cart</>}
                </button>
                <button
                  onClick={handleBuy}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 hover:-translate-y-0.5 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 text-base"
                >
                  <Zap size={20} /> Buy It Now
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-emerald-100">
                <div className="flex items-center gap-3 text-emerald-800">
                  <div className="bg-emerald-50 p-2 rounded-lg"><Truck size={20} className="text-emerald-600" /></div>
                  <div>
                    <p className="text-sm font-semibold">Fast Delivery</p>
                    <p className="text-xs text-gray-500">2-3 business days</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-emerald-800">
                  <div className="bg-emerald-50 p-2 rounded-lg"><RotateCcw size={20} className="text-emerald-600" /></div>
                  <div>
                    <p className="text-sm font-semibold">Easy Returns</p>
                    <p className="text-xs text-gray-500">14-day policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-emerald-950 mb-6">You might also like from {product.category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <div 
                  key={p.id} 
                  onClick={() => {
                    navigate(`/product/${p.id}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white rounded-2xl shadow-sm border border-emerald-100 hover:shadow-lg transition-all cursor-pointer group flex flex-col overflow-hidden"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-emerald-900 mb-1">{p.name}</h3>
                    <p className="text-emerald-700 font-semibold mb-3">KSh {p.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
