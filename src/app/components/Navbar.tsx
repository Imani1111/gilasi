import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ShoppingCart, Menu, X, LogOut } from "lucide-react";
import { useApp } from "../context/AppContext";
import { supabase } from "../lib/supabase";

export function Navbar() {
  const { cart, user, setUser } = useApp();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } finally {
      setUser(null);
      navigate("/login");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/gilasi-logo.png"
              alt="GilasiShop logo"
              className="w-9 h-9 object-contain"
            />
            <span className="text-emerald-800 font-bold text-xl tracking-tight">GilasiShop</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-emerald-700 hover:text-emerald-500 transition-colors font-medium">Home</Link>
            <Link to="/shop" className="text-emerald-700 hover:text-emerald-500 transition-colors font-medium">Shop</Link>

            {/* Cart */}
            <Link to="/cart" className="relative text-emerald-700 hover:text-emerald-500 transition-colors">
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Logout button if logged in */}
            {user && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 font-medium transition-colors border border-red-200 rounded-full px-3 py-1 hover:bg-red-50"
              >
                <LogOut size={15} />
                Logout
              </button>
            )}

            {/* Profile icon */}
            <button onClick={() => navigate(user ? "/profile" : "/login")} className="focus:outline-none">
              {user?.photo ? (
                <img src={user.photo} alt={user.name} className="w-9 h-9 rounded-full object-cover border-2 border-emerald-400 shadow" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center hover:border-emerald-500 transition-colors">
                  {user ? (
                    <span className="text-emerald-700 font-bold text-sm">{user.name.charAt(0).toUpperCase()}</span>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-emerald-600" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  )}
                </div>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-emerald-700" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-3 border-t border-emerald-100 pt-3">
            <Link to="/" onClick={() => setMenuOpen(false)} className="text-emerald-700 font-medium px-2 py-1">Home</Link>
            <Link to="/shop" onClick={() => setMenuOpen(false)} className="text-emerald-700 font-medium px-2 py-1">Shop</Link>
            <Link to="/cart" onClick={() => setMenuOpen(false)} className="text-emerald-700 font-medium px-2 py-1 flex items-center gap-2">
              <ShoppingCart size={18} /> Cart {cartCount > 0 && <span className="bg-emerald-500 text-white text-xs rounded-full px-1.5">{cartCount}</span>}
            </Link>
            <button onClick={() => { navigate(user ? "/profile" : "/login"); setMenuOpen(false); }} className="text-left text-emerald-700 font-medium px-2 py-1">
              {user ? `Profile (${user.name})` : "Login"}
            </button>
            {user && (
              <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="text-left text-red-500 font-medium px-2 py-1 flex items-center gap-2">
                <LogOut size={16} /> Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
