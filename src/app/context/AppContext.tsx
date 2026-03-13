import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from "react";
import { supabase } from "../lib/supabase";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
  provider?: "email" | "google";
}

interface AppContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  user: User | null;
  setUser: (user: User | null) => void;
  buyProduct: Product | null;
  setBuyProduct: (product: Product | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("gilasishop_user");
    if (!saved) return null;
    try {
      const parsed = JSON.parse(saved);
      if (parsed && !parsed.id && parsed.email) {
        return { ...parsed, id: String(parsed.email).toLowerCase() };
      }
      return parsed;
    } catch {
      return null;
    }
  });
  const [buyProduct, setBuyProduct] = useState<Product | null>(null);
  const [cartLoaded, setCartLoaded] = useState(false);
  const [buyLoaded, setBuyLoaded] = useState(false);
  const cartOwnerRef = useRef<string | null>(null);
  const buyOwnerRef = useRef<string | null>(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem("gilasishop_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("gilasishop_user");
    }
  }, [user]);

  useEffect(() => {
    const loadCartForUser = () => {
      setCartLoaded(false);

      if (!user) {
        cartOwnerRef.current = null;
        setCart([]);
        setCartLoaded(true);
        return;
      }

      cartOwnerRef.current = user.id;
      const savedCart = localStorage.getItem(`gilasishop_cart_${user.id}`);
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch {
          setCart([]);
        }
      } else {
        setCart([]);
      }
      setCartLoaded(true);
    };

    loadCartForUser();
  }, [user]);

  useEffect(() => {
    const loadBuyForUser = () => {
      setBuyLoaded(false);

      if (!user) {
        buyOwnerRef.current = null;
        setBuyProduct(null);
        setBuyLoaded(true);
        return;
      }

      buyOwnerRef.current = user.id;
      const savedBuy = localStorage.getItem(`gilasishop_buy_${user.id}`);
      if (savedBuy) {
        try {
          setBuyProduct(JSON.parse(savedBuy));
        } catch {
          setBuyProduct(null);
        }
      } else {
        setBuyProduct(null);
      }
      setBuyLoaded(true);
    };

    loadBuyForUser();
  }, [user]);

  useEffect(() => {
    if (!user || !cartLoaded) return;
    if (cartOwnerRef.current !== user.id) return;
    localStorage.setItem(`gilasishop_cart_${user.id}`, JSON.stringify(cart));
  }, [cart, user, cartLoaded]);

  useEffect(() => {
    if (!user || !buyLoaded) return;
    if (buyOwnerRef.current !== user.id) return;
    if (!buyProduct) {
      localStorage.removeItem(`gilasishop_buy_${user.id}`);
      return;
    }
    localStorage.setItem(`gilasishop_buy_${user.id}`, JSON.stringify(buyProduct));
  }, [buyProduct, user, buyLoaded]);

  // Supabase Auth Listener
  useEffect(() => {
    // Check initial active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.user_metadata?.full_name || "Google User",
          email: session.user.email || "",
          photo: session.user.user_metadata?.avatar_url,
          provider: "google",
        });
      }
      
      // Clean up the URL hash if it contains Supabase auth tokens or errors
      if (window.location.hash.includes('access_token=') || window.location.hash.includes('error_description=')) {
        // Replace the current URL with just the path and search params, removing the hash
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    });

    // Listen for auth changes (like returning from Google OAuth)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.user_metadata?.full_name || "Google User",
          email: session.user.email || "",
          photo: session.user.user_metadata?.avatar_url,
          provider: "google",
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, user, setUser, buyProduct, setBuyProduct }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
