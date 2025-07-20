import { Eye, Heart, Link, ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "../../Context/Cart.context";
import { NavLink } from "react-router-dom";
import { WishContext } from "../../Context/Wish.context";

export default function Card({ productInfo }) {
  const {
    id,
    imageCover,
    price,
    ratingsAverage,
    title,
    description,
    category,
  } = productInfo;
  const { addToCart } = useContext(CartContext);
  const { wishList, addToWishList, removeFromWishList } =
    useContext(WishContext);
  const isInWishList = wishList.some((item) => item.id === id);

  function toggleWishList() {
    if (isInWishList) {
      removeFromWishList(id);
    } else {
      addToWishList(id);
    }
  }

  return (
    <div className="card bg-white shadow-xl group">
      <div className="relative ">
        <img src={imageCover} alt="" />
        <div className="opacity-0 absolute inset-0 layer bg-gray-500/40 flex justify-center items-center gap-3 group-hover:opacity-100 transition-all">
          <Heart
            onClick={toggleWishList}
            fill={isInWishList ? "currentColor" : "none"}
            className={`w-8 h-8 cursor-pointer rounded-full p-1 ${
              isInWishList
                ? "text-red-600 bg-white"
                : "bg-mainColor text-white hover:bg-white hover:text-mainColor"
            } transition-colors duration-300`}
          />

          <ShoppingCart
            onClick={() => {
              addToCart(id);
            }}
            className="bg-mainColor p-1 text-white w-8 h-8 rounded-full hover:bg-white hover:text-mainColor transition-all cursor-pointer"
          />

          <NavLink to={`/product/${id}`}>
            <Eye className="bg-mainColor p-1 text-white w-8 h-8 rounded-full hover:bg-white hover:text-mainColor transition-all cursor-pointer" />
          </NavLink>
        </div>
      </div>
      <div className="cardBody space-y-5 p-4">
        <div>
          <h2 className="line-clamp-1 text-mainColor">{title}</h2>
          <h3 className="font-semibold text-xl ">{category.name}</h3>
        </div>
        <p className=" line-clamp-2 text-sm text-slate-500">{description}</p>
        <div className="flex justify-between items-center">
          <p className="font-semibold">{price}EGB</p>
          <p>
            <i className="fa-solid fa-star text-amber-400">{ratingsAverage}</i>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
