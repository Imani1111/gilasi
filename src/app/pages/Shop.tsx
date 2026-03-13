import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ShoppingCart, Zap, Check, Leaf, Search } from "lucide-react";
import { useApp } from "../context/AppContext";
import { products } from "../data/products";
import { Footer } from "../components/Footer";
import { ProductSkeleton } from "../components/ProductSkeleton";

const categories = ["All", "Blues", "Walkers", "Tankards", "Browns", "Hexagons", "Lady Likes", "Nedenburgs", "Classics", "Greens", "Vases", "Mpesa testing"];
const shopOwner = "Gilasi Originals";

export function Shop() {
  const { addToCart, setBuyProduct } = useApp();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [addedIds, setAddedIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filtered = products.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (e: React.MouseEvent, product: typeof products[0]) => {
    e.stopPropagation();
    addToCart(product);
    setAddedIds((prev) => [...prev, product.id]);
    setTimeout(() => setAddedIds((prev) => prev.filter((id) => id !== product.id)), 1500);
    navigate("/cart");
  };

  const handleBuy = (e: React.MouseEvent, product: typeof products[0]) => {
    e.stopPropagation();
    setBuyProduct(product);
    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-emerald-900 mb-2">Your Shop Collection</h1>
          <p className="text-emerald-600">Handcrafted recycled glass pieces by {shopOwner} - beautiful, sustainable, and uniquely yours.</p>
        </div>

        {/* Search and Category filter */}
        <div className="flex flex-col md:flex-row gap-5 justify-between items-center mb-10">
          <div className="relative w-full md:w-80">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-emerald-200 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
            />
          </div>
          <div className="flex flex-wrap gap-2 justify-center md:justify-end flex-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-white text-emerald-700 border border-emerald-200 hover:border-emerald-400"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product grid */}
        {filtered.length === 0 && !isLoading ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold text-emerald-800 mb-2">No products found</h3>
            <p className="text-emerald-600">Try adjusting your search or category filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
              : filtered.map((product) => {
                const added = addedIds.includes(product.id);
                return (
                  <div
                    key={product.id}
                    onClick={() => {
                      navigate(`/product/${product.id}`);
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    }}
                    className="bg-white rounded-3xl shadow-md overflow-hidden border border-emerald-100 hover:shadow-xl transition-all flex flex-col cursor-pointer group"
                  >
                    {/* Image */}
                    <div className="h-52 overflow-hidden relative">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <span className="absolute top-3 left-3 bg-white/85 backdrop-blur text-emerald-700 text-xs font-semibold rounded-full px-2.5 py-1 border border-emerald-200">
                        {product.category}
                      </span>
                      <span className="absolute top-3 right-3 bg-emerald-600 text-white text-[11px] font-semibold rounded-full px-2.5 py-1">
                        {shopOwner}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-bold text-emerald-900 mb-1">{product.name}</h3>
                      <p className="text-gray-500 text-sm flex-1 mb-3 leading-relaxed">{product.description}</p>
                      <div className="flex items-center justify-between text-xs text-emerald-700 mb-3 bg-emerald-50 rounded-lg px-2.5 py-2">
                        <span className="font-medium">Made by {shopOwner}</span>
                        <span className="inline-flex items-center gap-1 font-semibold">
                          <Leaf size={12} />
                          Eco Crafted
                        </span>
                      </div>
                      <p className="text-emerald-700 font-bold mb-4">KSh {product.price.toLocaleString()}</p>

                      {/* Buttons */}
                      <div className="flex gap-2 mt-auto">
                        <button
                          onClick={(e) => handleBuy(e, product)}
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 md:py-2 rounded-xl transition-colors flex items-center justify-center gap-1 text-sm min-h-[44px]"
                        >
                          <Zap size={15} /> Buy Now
                        </button>
                        <button
                          onClick={(e) => handleAddToCart(e, product)}
                          className={`flex-1 font-semibold py-3 md:py-2 rounded-xl transition-colors flex items-center justify-center gap-1 text-sm border min-h-[44px] ${added
                              ? "bg-emerald-100 text-emerald-700 border-emerald-300"
                              : "border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                            }`}
                        >
                          {added ? <><Check size={15} /> Added!</> : <><ShoppingCart size={15} /> Add</>}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
