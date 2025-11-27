import React, { useContext, useEffect } from "react";
import { CartContext } from "../../Context/Cart.context";
import Loading from "../../componants/Loading/Loading";
import { ShoppingCart } from "lucide-react";
import Cartitem from "../../componants/Cartitem/Cartitem";
import { Link } from "react-router-dom";

export default function Cart() {
  const { getAllCart, cartInfo, clearCart } = useContext(CartContext);

  useEffect(() => {
    getAllCart();
  }, []);

  if (!cartInfo) return <Loading />;

  if (cartInfo?.numOfCartItems === 0) {
    return (
      <section className="bg-white p-6 rounded-lg shadow-md container mx-auto mt-12 flex flex-col items-center gap-4">
        <h2 className="flex items-center gap-2 text-3xl font-bold text-mainColor">
          Shop Cart <ShoppingCart />
        </h2>
        <p className="text-xl text-gray-500">Your Cart is Empty</p>
        <Link
          to="/Home"
          className="btn hover:scale-105 transition-transform duration-300"
        >
          Return to Products
        </Link>
      </section>
    );
  }

  return (
    <div className="container mx-auto py-10 space-y-6">
      <h2 className="flex items-center gap-2 text-3xl font-bold text-mainColor">
        Shop Cart <ShoppingCart />
      </h2>

      <h3 className="text-xl font-semibold text-mainColor">
        Total: {cartInfo.data.totalCartPrice} EGP
      </h3>

      <div className="space-y-4">
        {cartInfo.data.products.map((cart) => (
          <Cartitem key={cart._id} item={cart} />
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={clearCart}
          className="btn bg-red-600 hover:bg-red-500 transition-colors"
        >
          Clear Cart
        </button>
        <Link
          to="/Checkout"
          className="btn hover:scale-105 transition-transform"
        >
          Checkout Payment
        </Link>
      </div>
    </div>
  );
}
