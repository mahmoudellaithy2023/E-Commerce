import { createContext, useContext, useState } from "react";
import { TokenContext } from "./Token.context";
import axios from "axios";
import toast from "react-hot-toast";

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const { token } = useContext(TokenContext);
  const [cartInfo, setCartInfo] = useState(null);
  async function addToCart(productId) {
    const loading = toast.loading("Loading...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "POST",
        data: {
          productId,
        },
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
      if (data.status == "success") {
        toast.success(data.message);
        getAllCart();
      }
    } catch (error) {
      toast.error("error...");
    } finally {
      toast.dismiss(loading);
    }
  }

  async function getAllCart() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/cart",
      method: "GET",
      headers: {
        token,
      },
    };
    const { data } = await axios.request(options);
    setCartInfo(data);
  }

  async function removeCart(productId) {
    let loading = toast.loading("loading...");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);

      setCartInfo(data);
      toast.success("item removed successfuly");
    } catch (error) {
      toast.error("error");
    } finally {
      toast.dismiss(loading);
    }
  }

  async function clearCart() {
    let loading = toast.loading("Loading...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "DELETE",
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);

      setCartInfo({
        numOfCartItems: 0,
      });
      toast.success("Clear Cart Successfuly");
    } catch (error) {
      toast.error("error");
    } finally {
      toast.dismiss(loading);
    }
  }

  async function updateCart({ productId, count }) {
    let loading = toast.loading("Loading...");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "PUT",
        data: {
          count,
        },
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);

      setCartInfo(data);
      toast.success("success for add another one ");
    } catch (error) {
      toast.error("error");
    } finally {
      toast.dismiss(loading);
    }
  }
  return (
    <CartContext.Provider
      value={{
        addToCart,
        getAllCart,
        cartInfo,
        removeCart,
        clearCart,
        updateCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
