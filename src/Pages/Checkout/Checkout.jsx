import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/Cart.context";
import { TokenContext } from "../../Context/Token.context";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Checkout() {
  const [payment, setPayment] = useState(null);
  const { cartInfo } = useContext(CartContext);
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      city: "",
      phone: "",
      details: "",
    },
    onSubmit: (values) => {
      if (payment == "cash") {
        cashOrder(values);
      } else {
        onlineOrder(values);
      }
    },
  });

  async function onlineOrder(values) {
    let loading = toast.loading("loading....");
    try {
      const test = {
        shippingAddress: values,
      };
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=http://localhost:5173`,
        method: "POST",
        data: test,
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
      console.log(data);
      toast.success("success");
      setTimeout(() => {
        location.replace(data.session.url);
      }, 2000);
    } catch (error) {
      toast.error("error");
    } finally {
      toast.dismiss(loading);
    }
  }
  async function cashOrder(values) {
    let loading = toast.loading("loading....");
    try {
      const test = {
        shippingAddress: values,
      };
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
        method: "POST",
        data: test,
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
      console.log(data);
      toast.success("success");
      setTimeout(() => {
        navigate("/allorders");
      }, 2000);
    } catch (error) {
      toast.error("error");
    } finally {
      toast.dismiss(loading);
    }
  }

  return (
    <>
      <div className="py-8">
        <h2 className="text-2xl text-mainColor font-semibold mt-5">
          Fill Your Details:
        </h2>

        <form onSubmit={formik.handleSubmit} className="pt-5">
          <div className="my-1">
            <label htmlFor="">City:</label>
            <input
              type="text"
              className="input w-full bg-gray-200 my-3"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
            />
          </div>
          <div className="my-1">
            <label htmlFor="">Phone:</label>
            <input
              type="text"
              className="input w-full bg-gray-200 my-3"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
          </div>
          <div className="my-1">
            <label htmlFor="">Details:</label>
            <input
              type="text"
              className="input w-full bg-gray-200 my-3"
              name="details"
              value={formik.values.details}
              onChange={formik.handleChange}
            />
          </div>
          <button
            onClick={() => {
              setPayment("cash");
            }}
            type="submit"
            className="btn bg-blue-700 py-2 my-1 px-3"
          >
            Cash Order
          </button>
          <button
            onClick={() => {
              setPayment("online");
            }}
            type="submit"
            className="btn ms-4 py-2 my-1 px-3"
          >
            Online Order
          </button>
        </form>
      </div>
    </>
  );
}
