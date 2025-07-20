import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./componants/Layout/Layout";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import toast, { Toaster } from "react-hot-toast";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ForgetPassword from "./componants/ForgetPassword/ForgetPassword";
import ResetCode from "./componants/ResetCode/ResetCode";
import ResetPassword from "./componants/ResetPassword/ResetPassword";
import ProtectedRoute from "./componants/ProtectedRoute/ProtectedRoute";
import GuardRoute from "./componants/GuardRoute/GuardRoute";
import TokenProvider from "./Context/Token.context";
import CartProvider from "./Context/Cart.context";
import Cart from "./Pages/Cart/Cart";
import Details from "./Pages/Details/Details";
import Checkout from "./Pages/Checkout/Checkout";
import Orders from "./Pages/Orders/Orders";
import Brands from "./Pages/Brand/Brand";
import { BrandProvider } from "./Context/Brand.context";
import Products from "./Pages/Products/Products";
import Categories from "./Pages/Categories/Categories";
import WishProvider from "./Context/Wish.context";
import WishList from "./componants/Wishlist/Wishlist";
import SubCategories from "./componants/SubCategories/SubCategories";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: (
        <ProtectedRoute>
          <Layout></Layout>
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "Home", element: <Home /> },
        { path: "Cart", element: <Cart /> },
        { path: "product/:id", element: <Details /> },
        { path: "Checkout", element: <Checkout /> },
        { path: "allorders", element: <Orders /> },
        { path: "Brands", element: <Brands /> },
        { path: "Products", element: <Products /> },
        { path: "Categories", element: <Categories /> },
        { path: "WishList", element: <WishList /> },
        { path: "SubCategories/:id", element: <SubCategories /> },
      ],
    },

    {
      path: "",
      element: (
        <GuardRoute>
          {" "}
          <Layout />{" "}
        </GuardRoute>
      ),
      children: [
        { path: "Login", element: <Login /> },
        { path: "Register", element: <Register /> },
        { path: "ForgetPassword", element: <ForgetPassword /> },
        { path: "ResetCode", element: <ResetCode /> },
        { path: "ResetPassword", element: <ResetPassword /> },
      ],
    },
  ]);

  return (
    <>
      <TokenProvider>
        <CartProvider>
          <BrandProvider>
            <WishProvider>
              <RouterProvider router={routes} />
              <Toaster />
            </WishProvider>
          </BrandProvider>
        </CartProvider>
      </TokenProvider>
    </>
  );
}

export default App;
