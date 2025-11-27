import React, { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../Context/Token.context";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Loading from "../../componants/Loading/Loading";
import toast from "react-hot-toast";

export default function Orders() {
  const { token } = useContext(TokenContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getAllOrders() {
    if (!token) return;
    setLoading(true);
    try {
      const decoded = jwtDecode(token);
      const userId = decoded.id; // جلب الـ userId

      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
        method: "GET",
        headers: { token },
      };

      const { data } = await axios.request(options);
      setOrders(data);
    } catch (error) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllOrders();
  }, [token]);

  if (loading) return <Loading />;

  if (!orders || orders.length === 0)
    return (
      <div className="py-20 text-center text-xl text-gray-500">
        You have no orders yet.
      </div>
    );

  return (
    <div className="space-y-10 px-4 py-6">
      {orders.map((order) => (
        <div
          key={order.id}
          className="border-2 border-gray-200 rounded-lg p-5 shadow-md hover:shadow-xl transition-all duration-300"
        >
          {/* Order Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <div>
              <h3 className="text-gray-500 text-sm">Order ID</h3>
              <h3 className="text-lg font-semibold">#{order.id}</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                className={`text-white rounded-md px-4 py-2 text-sm ${
                  order.isDelivered ? "bg-blue-700" : "bg-gray-400"
                }`}
              >
                {order.isDelivered ? "Delivered" : "Not Delivered"}
              </button>
              <button
                className={`text-white rounded-md px-4 py-2 text-sm ${
                  order.isPaid ? "bg-green-600" : "bg-red-600"
                }`}
              >
                {order.isPaid ? "PAID" : "NOT PAID"}
              </button>
            </div>
          </div>

          {/* Order Items */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {order.cartItems.map((item) => (
              <div
                key={item.product.id}
                className="card hover:shadow-main transition-all duration-300"
              >
                <img
                  className="w-full h-40 object-cover"
                  src={item.product.imageCover}
                  alt={item.product.title}
                />
                <div className="p-4 space-y-2">
                  <h2 className="text-base font-semibold line-clamp-1">
                    {item.product.title}
                  </h2>
                  <h3 className="text-mainColor text-sm font-semibold">
                    {item.product.category.name}
                  </h3>
                  <div className="flex justify-between text-sm">
                    <h3>{item.price} EGP</h3>
                    <h3>{item.count} pcs</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
