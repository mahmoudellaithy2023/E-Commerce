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
  if (cartInfo?.numOfCartItems == 0) {
    return (
      <section className="bg-slate-200 p-5 space-y-6 my-12">
        <h2 className="flex items-center gap-2 font-semibold text-3xl">
          Shop Cart <ShoppingCart />
        </h2>

        <div className="flex justify-center items-center flex-col gap-3">
          <h2 className="text-2xl">Your Cart is Empty</h2>
          <button className="bg-mainColor rounded-md py-2 px-4 text-white">
            <Link to={"/Home"}>Return to Product Page</Link>
          </button>
        </div>
      </section>
    );
  }
  return (
    <>
      {cartInfo ? (
        <section className="bg-slate-200 p-5 space-y-6 my-10">
          <h2 className="flex items-center gap-2 font-semibold text-3xl">
            Shop Cart <ShoppingCart />
          </h2>
          <h3 className="text-2xl text-mainColor">
            Total : {cartInfo.data.totalCartPrice} Egp
          </h3>
          <div>
            {cartInfo.data.products.map((cart) => (
              <Cartitem item={cart} key={cart._id} />
            ))}
          </div>
          <div className="w-fit ms-auto">
            <button
              onClick={clearCart}
              className="bg-red-600 rounded-md py-2 px-4 text-white"
            >
              Clear Cart
            </button>
          </div>
        </section>
      ) : (
        <Loading />
      )}
      <div className=" w-fit ms-auto">
        <Link to={"/Checkout"}>
          <button className="btn mb-5">Checkout Payment</button>
        </Link>
      </div>
    </>
  );
}
