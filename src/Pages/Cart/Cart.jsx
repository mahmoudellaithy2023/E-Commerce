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

  if (cartInfo?.numOfCartItems === 0) {
    return (
      <section className="bg-slate-200 p-5 space-y-6 my-12 rounded-md mx-2">
        <h2 className="flex items-center gap-2 font-semibold text-2xl sm:text-3xl text-center justify-center">
          Shop Cart <ShoppingCart />
        </h2>

        <div className="flex justify-center items-center flex-col gap-4 text-center">
          <h2 className="text-xl sm:text-2xl">Your Cart is Empty</h2>
          <Link
            to={"/Home"}
            className="bg-mainColor rounded-md py-2 px-5 text-white text-sm sm:text-base"
          >
            Return to Product Page
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      {cartInfo ? (
        <section className="bg-slate-200 p-5 space-y-6 my-10 rounded-md mx-2">
          <h2 className="flex items-center gap-2 font-semibold text-2xl sm:text-3xl">
            Shop Cart <ShoppingCart />
          </h2>

          <h3 className="text-xl sm:text-2xl text-mainColor">
            Total: {cartInfo.data.totalCartPrice} EGP
          </h3>

          <div className="space-y-4">
            {cartInfo.data.products.map((cart) => (
              <Cartitem item={cart} key={cart._id} />
            ))}
          </div>

          <div className="w-full flex justify-end">
            <button
              onClick={clearCart}
              className="bg-red-600 rounded-md py-2 px-4 text-white text-sm sm:text-base"
            >
              Clear Cart
            </button>
          </div>
        </section>
      ) : (
        <Loading />
      )}

      <div className="w-full flex justify-end px-5 mt-4">
        <Link to={"/Checkout"}>
          <button className="btn bg-mainColor text-white py-2 px-5 rounded-md">
            Checkout Payment
          </button>
        </Link>
      </div>
    </>
  );
}
