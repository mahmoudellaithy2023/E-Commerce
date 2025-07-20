import React, { useContext, useEffect, useState } from "react";
import logoNav from "../../assets/images/favicon.png";
import { NavLink, Link } from "react-router-dom";
import { LogOut, ShoppingCart, Menu } from "lucide-react";
import { TokenContext } from "../../Context/Token.context";
import { CartContext } from "../../Context/Cart.context";

export default function Navbar() {
  const { token, exit } = useContext(TokenContext);
  const { cartInfo, getAllCart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (token) {
      getAllCart();
    }
  }, [token]);

  return (
    <>
      <nav className="bg-slate-200 h-20 flex items-center shadow-md relative">
        <div className="container flex justify-between items-center py-5">
          <div className="flex space-x-1 items-center">
            <img className="w-[30px]" src={logoNav} alt="logo" />
            <h1 className="font-semibold text-2xl">
              <Link to={"Home"}>Fresh Cart</Link>
            </h1>
          </div>

          {/* icon mobile */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              <Menu size={28} />
            </button>
          </div>

          {/*  desktop */}
          <div className="hidden md:flex gap-4">
            {token ? (
              <ul className="flex gap-3">
                <li className="hover:font-semibold cursor-pointer">
                  <NavLink to={"Home"}>Home</NavLink>
                </li>
                <li className="hover:font-semibold cursor-pointer">
                  <NavLink to={"Products"}>Products</NavLink>
                </li>
                <li className="hover:font-semibold cursor-pointer">
                  <NavLink to={"Categories"}>Categories</NavLink>
                </li>
                <li className="hover:font-semibold cursor-pointer">
                  <NavLink to={"Brands"}>Brands</NavLink>
                </li>
                <li className="hover:font-semibold cursor-pointer">
                  <NavLink to={"allorders"}>Orders</NavLink>
                </li>
                <li className="hover:font-semibold cursor-pointer">
                  <NavLink to={"Wishlist"}>Wishlist</NavLink>
                </li>
              </ul>
            ) : null}
          </div>

          <div className="hidden md:flex">
            <ul className="flex items-center space-x-3 text-md">
              {token ? (
                <li>
                  <NavLink className="relative" to={"Cart"}>
                    <ShoppingCart />
                    <h2 className="absolute top-[-10px] right-[-10px] rounded-full w-5 h-5 p-2 bg-mainColor text-white flex items-center justify-center">
                      {cartInfo == null ? (
                        <i className="fa-solid fa-spinner fa-spin "></i>
                      ) : (
                        cartInfo.numOfCartItems
                      )}
                    </h2>
                  </NavLink>
                </li>
              ) : null}
              <li>
                <i className="fa-brands fa-facebook"></i>
              </li>
              <li>
                <i className="fa-brands fa-instagram"></i>
              </li>
              <li>
                <i className="fa-brands fa-linkedin"></i>
              </li>
              <li>
                <i className="fa-brands fa-twitter"></i>
              </li>
              <li>
                <i className="fa-brands fa-tiktok"></i>
              </li>
              <li>
                <i className="fa-brands fa-youtube"></i>
              </li>
              {token ? null : (
                <>
                  <li className="hover:font-semibold cursor-pointer">
                    <NavLink to={"Login"}>Login</NavLink>
                  </li>
                  <li className="hover:font-semibold cursor-pointer">
                    <NavLink to={"Register"}>Register</NavLink>
                  </li>
                </>
              )}
              {token ? (
                <li
                  className="hover:font-semibold cursor-pointer"
                  onClick={exit}
                >
                  <LogOut />
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        {/* mobile menu */}
        {isOpen && (
          <div
            className={`md:hidden absolute top-20 left-0 w-full bg-slate-100 shadow-md z-50 p-4 origin-top transform transition-all duration-3000 ease-in delay-1000 ${
              isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 "
            }`}
          >
            {token ? (
              <ul className="flex flex-col gap-3 text-lg">
                <li className="hover:font-semibold cursor-pointer">
                  <NavLink to={"Home"}>Home</NavLink>
                </li>
                <li className="hover:font-semibold cursor-pointer">
                  <NavLink to={"Products"}>Products</NavLink>
                </li>
                <li className="hover:font-semibold cursor-pointer">
                  <NavLink to={"Categories"}>Categories</NavLink>
                </li>
                <li className="hover:font-semibold cursor-pointer">
                  <NavLink to={"Brands"}>Brands</NavLink>
                </li>
                <li className="hover:font-semibold cursor-pointer">
                  <NavLink to={"allorders"}>Orders</NavLink>
                </li>
                <li className="hover:font-semibold cursor-pointer">
                  <NavLink to={"Wishlist"}>Wishlist</NavLink>
                </li>
                <li className="hover:font-semibold cursor-pointer">
                  <NavLink to={"Cart"}>
                    <div className="relative inline-block">
                      <ShoppingCart size={24} />
                      <span className="absolute -top-2 -right-2 w-5 h-5 text-sm bg-mainColor text-white rounded-full flex items-center justify-center">
                        {cartInfo == null ? (
                          <i className="fa-solid fa-spinner fa-spin text-xs"></i>
                        ) : (
                          cartInfo.numOfCartItems
                        )}
                      </span>
                    </div>
                  </NavLink>
                </li>
                <li className="cursor-pointer" onClick={exit}>
                  <LogOut />
                </li>
              </ul>
            ) : (
              <ul className="flex flex-col gap-3 text-lg">
                <l iclassName="hover:font-semibold cursor-pointer">
                  <NavLink to={"Login"}>Login</NavLink>
                </l>
                <l iclassName="hover:font-semibold cursor-pointer">
                  <NavLink to={"Register"}>Register</NavLink>
                </l>
              </ul>
            )}
            {/* social icons */}
            <ul className="flex justify-center mt-4 space-x-4 text-xl">
              <li>
                <i className="fa-brands fa-facebook"></i>
              </li>

              <li>
                <i className="fa-brands fa-instagram"></i>
              </li>
              <li>
                <i className="fa-brands fa-linkedin"></i>
              </li>
              <li>
                <i className="fa-brands fa-twitter"></i>
              </li>
              <li>
                <i className="fa-brands fa-tiktok"></i>
              </li>
              <li>
                <i className="fa-brands fa-youtube"></i>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}
