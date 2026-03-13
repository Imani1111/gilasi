import React, { useState } from "react";
import { Send } from "lucide-react";

export function Footer() {
  const [feedback, setFeedback] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!feedback.trim()) return;
    setSent(true);
    setFeedback("");
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <footer className="bg-emerald-900 text-emerald-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">G</span>
              </div>
              <span className="font-bold text-lg text-white">GilasiShop</span>
            </div>
            <p className="text-emerald-300 text-sm leading-relaxed">
              Turning waste glass into beautiful, sustainable products. Every purchase helps reduce landfill waste and supports local artisans.
            </p>
          </div>

          {/* Feedback */}
          <div>
            <h3 className="font-semibold text-white mb-3">Share Your Feedback</h3>
            {sent ? (
              <p className="text-emerald-400 text-sm">Thank you for your feedback! 🎉</p>
            ) : (
              <div className="flex gap-2">
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us what you think..."
                  rows={3}
                  className="flex-1 bg-emerald-800 text-emerald-100 placeholder-emerald-500 rounded-xl px-3 py-2 text-sm resize-none border border-emerald-700 focus:outline-none focus:border-emerald-400 transition-colors"
                />
                <button
                  onClick={handleSend}
                  className="self-end bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl p-2 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-white mb-3">Follow Us</h3>
            <div className="flex gap-4">
              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-emerald-800 hover:bg-blue-600 flex items-center justify-center transition-colors" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-emerald-800 hover:bg-pink-600 flex items-center justify-center transition-colors" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              {/* Twitter/X */}
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-emerald-800 hover:bg-sky-500 flex items-center justify-center transition-colors" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* YouTube */}
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-emerald-800 hover:bg-red-600 flex items-center justify-center transition-colors" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
                  <polygon fill="#1a3c34" points="9.75,15.02 15.5,12 9.75,8.98" />
                </svg>
              </a>
              {/* WhatsApp */}
              <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-emerald-800 hover:bg-green-500 flex items-center justify-center transition-colors" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
            <p className="text-emerald-400 text-xs mt-4">📍 Nairobi, Kenya &nbsp;|&nbsp; 📞 +254 700 000 000</p>
          </div>
        </div>

        <div className="border-t border-emerald-800 mt-8 pt-6 text-center text-emerald-500 text-xs">
          © {new Date().getFullYear()} GilasiShop. All rights reserved. Made with ♻️ and ❤️.
        </div>
      </div>
    </footer>
  );
}
