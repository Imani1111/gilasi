import React from "react";
import { Link, useNavigate } from "react-router";
import { Trash2, ShoppingBag, ArrowLeft, Zap } from "lucide-react";
import { useApp } from "../context/AppContext";

export function Cart() {
  const { cart, removeFromCart, setBuyProduct } = useApp();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleBuyItem = (item: typeof cart[0]) => {
    setBuyProduct(item);
    navigate("/payment");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex flex-col items-center justify-center px-4">
        <ShoppingBag size={64} className="text-emerald-200 mb-6" />
        <h2 className="text-2xl font-bold text-emerald-900 mb-2">Your cart is empty</h2>
        <p className="text-emerald-600 mb-6">Add some beautiful recycled glass products!</p>
        <Link to="/shop" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-2xl transition-colors flex items-center gap-2">
          <ArrowLeft size={18} /> Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => navigate("/shop")} className="text-emerald-600 hover:text-emerald-800 transition-colors">
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-3xl font-bold text-emerald-900">Your Cart</h1>
          <span className="bg-emerald-100 text-emerald-700 text-sm rounded-full px-3 py-0.5 font-medium">{cart.length} item{cart.length !== 1 ? "s" : ""}</span>
        </div>

        <div className="space-y-4 mb-8">
          {cart.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl shadow-md border border-emerald-50 overflow-hidden flex flex-col sm:flex-row gap-0">
              <div className="sm:w-36 h-36 flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs text-emerald-500 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">{item.category}</span>
                      <h3 className="font-bold text-emerald-900 mt-1">{item.name}</h3>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-xl transition-colors flex-shrink-0"
                      title="Remove from cart"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">{item.description}</p>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div>
                    <p className="text-emerald-700 font-bold">KSh {item.price.toLocaleString()} <span className="text-gray-400 font-normal text-sm">× {item.quantity}</span></p>
                    <p className="text-emerald-900 font-bold text-lg">= KSh {(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => handleBuyItem(item)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-xl transition-colors flex items-center gap-1 text-sm"
                  >
                    <Zap size={15} /> Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="bg-white rounded-3xl shadow-md border border-emerald-50 p-6">
          <h2 className="font-bold text-emerald-900 text-lg mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm text-gray-600">
                <span>{item.name} × {item.quantity}</span>
                <span>KSh {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-emerald-100 pt-4 flex justify-between items-center">
            <span className="font-bold text-emerald-900 text-lg">Total</span>
            <span className="font-bold text-emerald-700 text-xl">KSh {total.toLocaleString()}</span>
          </div>
          <button
            onClick={() => {
              if (cart.length > 0) {
                setBuyProduct(cart[0]);
                navigate("/payment");
              }
            }}
            className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-2xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-200"
          >
            <Zap size={18} /> Proceed to Payment
          </button>
          <Link to="/shop" className="block text-center text-emerald-600 hover:text-emerald-800 mt-3 text-sm font-medium">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
