import axios from "axios";

import toast from "react-hot-toast";

import { createContext, useContext, useState } from "react";
import { TokenContext } from "./Token.context";

export const WishContext = createContext(null);

export default function WishProvider({ children }) {
  const { token } = useContext(TokenContext);
  const [wishList, setWishList] = useState([]);

  // Add to wishlist
  async function addToWishList(id) {
    const loading = toast.loading("Adding to WishList...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "POST",
        data: {
          productId: id,
        },
        headers: {
          token: token,
        },
      };
      const { data } = await axios.request(options);
      toast.success("Added to WishList");
      getWishList();
      return data;
    } catch (error) {
      console.log(error);
      toast.error("Error adding to WishList");
    } finally {
      toast.dismiss(loading);
    }
  }

  // Get all wishlist
  async function getWishList() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "GET",
        headers: {
          token: token,
        },
      };
      const { data } = await axios.request(options);
      setWishList(data.data);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }

  // Remove from wishlist
  async function removeFromWishList(id) {
    const loading = toast.loading("Removing...");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        method: "DELETE",
        headers: {
          token: token,
        },
      };
      const { data } = await axios.request(options);
      toast.success("Removed from WishList");
      getWishList();
      return data;
    } catch (error) {
      console.log(error);
      toast.error("Error removing");
    } finally {
      toast.dismiss(loading);
    }
  }

  return (
    <WishContext.Provider
      value={{ wishList, addToWishList, getWishList, removeFromWishList }}
    >
      {children}
    </WishContext.Provider>
  );
}
