import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../../componants/Loading/Loading";
import toast from "react-hot-toast";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getCategories() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategories(data.data);
    } catch (err) {
      toast.error("Error loading categories");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 my-6 px-4 container mx-auto">
      {categories.map((cat) => (
        <div
          key={cat._id}
          className="card cursor-pointer hover:shadow-main transition-all duration-300"
        >
          <img
            src={cat.image}
            alt={cat.name}
            className="w-full h-48 object-cover mb-2"
          />
          <h2 className="text-mainColor font-semibold">{cat.name}</h2>
        </div>
      ))}
    </div>
  );
}
