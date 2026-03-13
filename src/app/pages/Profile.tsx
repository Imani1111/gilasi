import React from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, ShoppingBag, Mail, LogOut, User } from "lucide-react";
import { useApp } from "../context/AppContext";
import { supabase } from "../lib/supabase";

export function Profile() {
  const { user, setUser, cart } = useApp();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } finally {
      setUser(null);
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => navigate("/")} className="text-emerald-600 hover:text-emerald-800 transition-colors">
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-2xl font-bold text-emerald-900">My Profile</h1>
        </div>

        {/* Profile card */}
        <div className="bg-white rounded-3xl shadow-md border border-emerald-50 p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {user.photo ? (
              <img src={user.photo} alt={user.name} className="w-24 h-24 rounded-full object-cover border-4 border-emerald-200 shadow" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center border-4 border-emerald-200 shadow">
                <span className="text-white font-bold text-3xl">{user.name.charAt(0).toUpperCase()}</span>
              </div>
            )}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="font-bold text-emerald-900 text-2xl mb-1">{user.name}</h2>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-500 text-sm mb-3">
                <Mail size={14} />
                {user.email}
              </div>
              <span className={`inline-block text-xs font-medium rounded-full px-3 py-0.5 ${user.provider === "google" ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600"}`}>
                {user.provider === "google" ? "🔵 Signed in with Google" : "📧 Email Account"}
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-md border border-emerald-50 p-5 text-center">
            <ShoppingBag size={24} className="text-emerald-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-emerald-900">{cart.length}</p>
            <p className="text-gray-500 text-sm">Items in Cart</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md border border-emerald-50 p-5 text-center">
            <User size={24} className="text-emerald-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-emerald-900">1</p>
            <p className="text-gray-500 text-sm">Account Active</p>
          </div>
        </div>

        {/* Account info */}
        <div className="bg-white rounded-3xl shadow-md border border-emerald-50 p-6 mb-6">
          <h3 className="font-bold text-emerald-900 mb-4">Account Details</h3>
          <div className="space-y-3">
            {[
              { label: "Full Name", value: user.name },
              { label: "Email", value: user.email },
              { label: "Account Type", value: user.provider === "google" ? "Google Account" : "Email & Password" },
              { label: "Member Since", value: new Date().toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" }) },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                <span className="text-gray-500 text-sm">{item.label}</span>
                <span className="text-gray-800 font-medium text-sm">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => navigate("/cart")}
            className="w-full border border-emerald-200 text-emerald-700 hover:bg-emerald-50 font-semibold py-3 rounded-2xl transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag size={18} /> View My Cart
          </button>
          <button
            onClick={handleLogout}
            className="w-full border border-red-200 text-red-600 hover:bg-red-50 font-semibold py-3 rounded-2xl transition-colors flex items-center justify-center gap-2"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
