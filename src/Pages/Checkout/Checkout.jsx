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
    initialValues: { city: "", phone: "", details: "" },
    onSubmit: (values) =>
      payment === "cash" ? cashOrder(values) : onlineOrder(values),
  });

  async function onlineOrder(values) {
    const loadingToast = toast.loading("Processing online payment...");
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=http://localhost:5173`,
        { shippingAddress: values },
        { headers: { token } }
      );
      toast.success("Redirecting to payment...");
      setTimeout(() => location.replace(data.session.url), 1500);
    } catch (err) {
      toast.error(err.message);
    } finally {
      toast.dismiss(loadingToast);
    }
  }

  async function cashOrder(values) {
    const loadingToast = toast.loading("Processing cash order...");
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
        { shippingAddress: values },
        { headers: { token } }
      );
      toast.success("Order placed successfully!");
      setTimeout(() => navigate("/allorders"), 1500);
    } catch (err) {
      toast.error("Error placing order");
    } finally {
      toast.dismiss(loadingToast);
    }
  }

  return (
    <div className="container mx-auto py-10 space-y-6">
      <h2 className="text-2xl text-mainColor font-semibold">
        Fill Your Details:
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <input
          type="text"
          name="city"
          placeholder="City"
          className="input w-full"
          value={formik.values.city}
          onChange={formik.handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="input w-full"
          value={formik.values.phone}
          onChange={formik.handleChange}
        />
        <input
          type="text"
          name="details"
          placeholder="Address Details"
          className="input w-full"
          value={formik.values.details}
          onChange={formik.handleChange}
        />

        <div className="flex gap-4">
          <button
            type="submit"
            onClick={() => setPayment("cash")}
            className="btn hover:scale-105 transition-transform"
          >
            Cash Order
          </button>
          <button
            type="submit"
            onClick={() => setPayment("online")}
            className="btn hover:scale-105 transition-transform"
          >
            Online Order
          </button>
        </div>
      </form>
    </div>
  );
}
