import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useApp } from "../context/AppContext";
import { supabase } from "../lib/supabase";

export function Signup() {
  const { setUser } = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password || !confirm) { setError("Please fill in all fields."); return; }
    if (!/\S+@\S+\.\S/.test(email)) { setError("Enter a valid email address."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setUser({ id: email.trim().toLowerCase(), name, email, provider: "email" });
    setLoading(false);
    navigate("/");
  };

  const handleGoogleAuth = async () => {
    setGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) throw error;
      // Redirect happens automatically through the provider
    } catch (error: any) {
      console.error("Google Auth Error:", error);
      alert(error.message || "Failed to authenticate with Google.");
    } finally {
      setGoogleLoading(false);
    }
  };

  const getStrength = (p: string) => {
    if (p.length === 0) return 0;
    let s = 0;
    if (p.length >= 6) s++;
    if (p.length >= 10) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  };

  const strength = getStrength(password);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"][strength];
  const strengthColor = ["", "bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-emerald-400", "bg-emerald-600"][strength];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-6">
          <button onClick={() => navigate("/login")} className="text-emerald-600 hover:text-emerald-800 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <Link to="/" className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">G</span>
            </div>
            <span className="text-emerald-800 font-bold">GilasiShop</span>
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-emerald-50 p-8">
          <h1 className="text-2xl font-bold text-emerald-900 mb-1">Create your account</h1>
          <p className="text-gray-500 text-sm mb-6">Join GilasiShop and shop sustainably</p>

          {/* Google Sign Up */}
          <button
            onClick={handleGoogleAuth}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-2xl py-3 hover:bg-gray-50 transition-colors mb-5 disabled:opacity-60"
          >
            {googleLoading ? (
              <div className="w-5 h-5 border-2 border-gray-300 border-t-emerald-600 rounded-full animate-spin" />
            ) : (
              <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            )}
            <span className="text-gray-700 font-medium text-sm">
              {googleLoading ? "Connecting to Google..." : "Continue with Google"}
            </span>
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-gray-400 text-xs">or sign up with email</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Wanjiku"
                  className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-gray-800 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-gray-800 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="w-full border border-gray-200 rounded-xl pl-9 pr-10 py-2.5 text-gray-800 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all text-sm"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1,2,3,4,5].map((i) => (
                      <div key={i} className={`flex-1 h-1 rounded-full transition-all ${i <= strength ? strengthColor : "bg-gray-100"}`} />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400">Strength: <span className="font-medium text-gray-600">{strengthLabel}</span></p>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="w-full border border-gray-200 rounded-xl pl-9 pr-10 py-2.5 text-gray-800 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all text-sm"
                />
                {confirm && password === confirm && (
                  <CheckCircle size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500" />
                )}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-2 text-red-600 text-sm flex items-center gap-2">
                <AlertCircle size={15} /> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-2xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-emerald-600 hover:text-emerald-800 font-semibold">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
