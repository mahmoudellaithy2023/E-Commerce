import React, { useContext, useEffect, useState } from "react";

import { WishContext } from "../../Context/Wish.context";
import { TokenContext } from "../../Context/Token.context";
import Loading from "../Loading/Loading";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/Cart.context";

export default function WishList() {
  const { getWishList, removeFromWishList } = useContext(WishContext);
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();
  const [wishList, setWishList] = useState(null);
  const { addToCart } = useContext(CartContext);

  async function BringWishList() {
    try {
      const data = await getWishList(token);
      setWishList(data);
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
    }
  }

  useEffect(() => {
    if (token) {
      BringWishList();
    }
  }, [token]);

  if (wishList === null) {
    return <Loading />;
  }
  if (wishList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-100 space-y-5">
        <h2 className="text-2xl font-semibold text-gray-600">
          Wishlist is empty
        </h2>
        <p className="text-gray-500">Add products to see them here</p>
        <Link to={"/Home"}>
          <button className="btn py-2 px-3">Return To Home</button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {wishList ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 space-y-3 gap-4 my-5 p-4">
          {wishList.map((item) => (
            <div key={item.id} className="border p-4 space-y-2">
              <img
                src={item.imageCover}
                alt={item.title}
                className="w-full object-cover"
              />
              <h2 className="text-mainColor font-bold line-clamp-1">
                {item.title}
              </h2>
              <h3>{item.price} EGP</h3>

              <div className="flex justify-between">
                <button
                  onClick={async () => {
                    await removeFromWishList(item.id);
                    BringWishList();
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Remove
                </button>
                <button
                  onClick={() => {
                    addToCart(item.id);
                  }}
                  className="btn py-2 px-3 "
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
