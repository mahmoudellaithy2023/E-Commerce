import { Minus, Plus, Trash } from "lucide-react";
import React, { useContext } from "react";
import { CartContext } from "../../Context/Cart.context";

export default function Cartitem({ item }) {
  console.log(item);
  const { count, price, product } = item;
  const { imageCover, title, id, category } = product;
  const { removeCart, updateCart } = useContext(CartContext);
  return (
    <div className="py-10">
      <div className="flex  justify-between items-center">
        <div className="flex m-4 gap-3">
          <img className="w-24" src={imageCover} alt="" />
          <div className="flex  flex-col justify-center space-y-2">
            <h2 className="text-lg font-semibold">{title}</h2>
            <h2 className="text-md">{category.name}</h2>
            <h2 className="text-md text-mainColor">{price} Egp</h2>
            <button
              onClick={() => {
                removeCart(id);
              }}
              className="w-28 flex items-center justify-center gap-1 bg-red-600 rounded-md py-1 px-3 text-white"
            >
              Remove <Trash size={28} />
            </button>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              updateCart({ productId: id, count: count + 1 });
            }}
            className="bg-mainColor text-white px-2 py-1 rounded-md"
          >
            <Plus />
          </button>
          <span className="text-lg">{count}</span>
          <button
            onClick={() => {
              if (count > 1) {
                updateCart({ productId: id, count: count - 1 });
              } else {
                removeCart(id);
              }
            }}
            className="bg-mainColor text-white px-2 py-1 rounded-md"
          >
            {" "}
            <Minus />
          </button>
        </div>
      </div>
    </div>
  );
}
