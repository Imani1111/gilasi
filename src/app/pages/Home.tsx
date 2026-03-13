import React from "react";
import { Link } from "react-router";
import { Recycle, Leaf, Award, ArrowRight } from "lucide-react";
import { Footer } from "../components/Footer";
import { useApp } from "../context/AppContext";
import { products } from "../data/products";

export function Home() {
  const { user } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block bg-emerald-100 text-emerald-700 text-sm rounded-full px-4 py-1 mb-4 font-medium">♻️ 100% Recycled Glass Products</span>
            <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 leading-tight mb-5">
              Beautiful Art from<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">Recycled Glass</span>
            </h1>
            <p className="text-emerald-700 text-lg mb-8 max-w-lg">
              Discover handcrafted home décor, jewellery, and kitchenware lovingly made from salvaged glass. Each purchase saves glass from landfill and supports Kenyan artisans.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <Link to="/shop" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-2xl transition-all shadow-lg shadow-emerald-200 flex items-center gap-2">
                Shop Now <ArrowRight size={18} />
              </Link>
              <Link to="/shop" className="border border-emerald-300 text-emerald-700 hover:bg-emerald-50 font-semibold px-6 py-3 rounded-2xl transition-all">
                Learn More
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <img
                src={products[0].image}
                alt="Recycled Glass Art"
                className="w-full h-full object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-3 flex items-center gap-2">
                <span className="text-2xl">♻️</span>
                <div>
                  <p className="text-xs text-gray-500">Saved from landfill</p>
                  <p className="text-emerald-700 font-bold text-sm">2,400+ kg of glass</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-emerald-900 text-center mb-10">Why GilasiShop?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Recycle className="text-emerald-600" size={32} />, title: "100% Recycled", desc: "Every product is crafted entirely from salvaged and recycled glass, reducing waste one piece at a time." },
            { icon: <Leaf className="text-emerald-600" size={32} />, title: "Eco-Friendly", desc: "We use natural dyes and sustainable packaging so our footprint stays as small as possible." },
            { icon: <Award className="text-emerald-600" size={32} />, title: "Artisan Made", desc: "Each item is handmade by skilled Kenyan artisans, ensuring unique quality you can't find anywhere else." },
          ].map((f) => (
            <div key={f.title} className="bg-white rounded-3xl shadow-md p-6 flex flex-col items-center text-center border border-emerald-50 hover:shadow-lg transition-shadow">
              <div className="bg-emerald-50 rounded-2xl p-4 mb-4">{f.icon}</div>
              <h3 className="font-bold text-emerald-900 mb-2">{f.title}</h3>
              <p className="text-emerald-700 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Impact */}
      <section className="bg-emerald-900 text-white py-16 my-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-800 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Environmental Impact</h2>
              <p className="text-emerald-100 text-lg mb-6 leading-relaxed">
                By choosing GilasiShop, you are directly contributing to a cleaner Kenya. Every piece we sell represents glass diverted from our streets and landfills, transformed into something beautiful by local artisans.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-emerald-800/50 backdrop-blur rounded-2xl p-6 border border-emerald-700">
                  <p className="text-4xl font-bold text-emerald-400 mb-1">2,400+</p>
                  <p className="text-sm font-medium text-emerald-100">Kg of Glass Saved</p>
                </div>
                <div className="bg-emerald-800/50 backdrop-blur rounded-2xl p-6 border border-emerald-700">
                  <p className="text-4xl font-bold text-emerald-400 mb-1">50+</p>
                  <p className="text-sm font-medium text-emerald-100">Artisans Supported</p>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full flex justify-center">
              <div className="relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden border-4 border-emerald-800/50 shadow-2xl">
                <img src={products[16].image} alt="Sustainable art" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 to-transparent flex items-end p-6">
                  <p className="text-emerald-100 font-medium">Empowering communities through sustainable art.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-emerald-900">Featured Products</h2>
          <Link to="/shop" className="text-emerald-600 hover:text-emerald-800 font-medium flex items-center gap-1">View all <ArrowRight size={16} /></Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 3).map((product) => (
            <div 
              key={product.id} 
              onClick={() => window.location.href = `/product/${product.id}`}
              className="bg-white rounded-3xl shadow-md overflow-hidden border border-emerald-50 hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="h-48 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <span className="text-xs text-emerald-500 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">{product.category}</span>
                <h3 className="font-bold text-emerald-900 mt-1 mb-1">{product.name}</h3>
                <p className="text-emerald-700 font-semibold">KSh {product.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      {!user && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Join GilasiShop Today</h2>
            <p className="mb-6 text-emerald-100">Create an account to save your favourites, track orders, and get exclusive eco-deals.</p>
            <Link to="/signup" className="bg-white text-emerald-700 font-bold px-6 py-3 rounded-2xl hover:bg-emerald-50 transition-colors shadow">
              Sign Up Free
            </Link>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
