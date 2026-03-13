import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { Cart } from "./pages/Cart";
import { Payment } from "./pages/Payment";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Profile } from "./pages/Profile";
import { ProductDetails } from "./pages/ProductDetails";

export const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "shop", Component: Shop },
      { path: "cart", Component: Cart },
      { path: "payment", Component: Payment },
      { path: "login", Component: Login },
      { path: "signup", Component: Signup },
      { path: "profile", Component: Profile },
      { path: "product/:id", Component: ProductDetails },
    ],
  },
]);
