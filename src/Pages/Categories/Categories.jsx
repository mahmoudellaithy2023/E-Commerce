import axios from "axios";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import Loading from "../../componants/Loading/Loading";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getCategories() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/categories",
        method: "GET",
      };
      const { data } = await axios.request(options);
      setCategories(data.data);
    } catch (error) {
      setError("Failed to load categories.");
      toast.error("Error loading categories");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 my-6 px-4">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="border rounded-md overflow-hidden shadow p-2 text-center cursor-pointer hover:shadow-mainColor hover:shadow-lg transition-all"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-48 object-cover mb-2"
              />
              <h1 className="text-mainColor font-semibold">{cat.name}</h1>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
